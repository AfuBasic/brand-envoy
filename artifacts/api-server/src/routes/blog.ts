import { Router, type IRouter } from "express";
import {
  ListBlogPostsQueryParams,
  ListBlogPostsResponse,
  GetBlogPostParams,
  GetBlogPostResponse,
  ListBlogCategoriesResponse,
} from "@workspace/api-zod";

const WP_API_BASE = "https://brandsenvoy.com/wp-json/wp/v2";

interface WpPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
    author?: Array<{ name: string }>;
    "wp:term"?: Array<Array<{ name: string }>>;
  };
}

interface WpCategory {
  id: number;
  name: string;
  count: number;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function mapWpPost(post: WpPost): {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  categories: string[];
  featuredImageUrl: string | null;
  author: string | null;
} {
  const categories =
    post._embedded?.["wp:term"]?.[0]?.map((t) => t.name) ?? [];
  const featuredImageUrl =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
  const author = post._embedded?.author?.[0]?.name ?? null;

  return {
    id: post.id,
    title: stripHtml(post.title.rendered),
    slug: post.slug,
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    date: post.date,
    categories,
    featuredImageUrl,
    author,
  };
}

// ─── Generic TTL cache ────────────────────────────────────────────────────────
interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class TtlCache<T> {
  private store = new Map<string, CacheEntry<T>>();

  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    // expired but don't delete — caller may want stale value
    return entry.value;
  }

  getFresh(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) return undefined;
    return entry.value;
  }

  set(key: string, value: T, ttlMs: number): void {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
  }

  isExpired(key: string): boolean {
    const entry = this.store.get(key);
    if (!entry) return true;
    return Date.now() > entry.expiresAt;
  }
}

const TTL_POSTS_MS = 2 * 60 * 1000;       // 2 minutes
const TTL_SLUG_MS  = 2 * 60 * 1000;       // 2 minutes
const TTL_CATS_MS  = 10 * 60 * 1000;      // 10 minutes

const postsCache      = new TtlCache<{ posts: ReturnType<typeof mapWpPost>[]; total: number }>();
const slugCache       = new TtlCache<ReturnType<typeof mapWpPost>>();
const categoriesCache = new TtlCache<{ id: number; name: string; count: number }[]>();

// ─── Category-ID lookup cache (internal, used by /blog/posts filter) ─────────
const categoryCache: Map<string, number> = new Map();
let categoryCacheExpiry = 0;

async function lookupCategoryId(categoryName: string): Promise<number | null> {
  const now = Date.now();
  if (now > categoryCacheExpiry) {
    categoryCache.clear();
    categoryCacheExpiry = now + 10 * 60 * 1000; // 10-minute TTL
  }

  const key = categoryName.toLowerCase();
  if (categoryCache.has(key)) {
    return categoryCache.get(key)!;
  }

  try {
    const url = new URL(`${WP_API_BASE}/categories`);
    url.searchParams.set("search", categoryName);
    url.searchParams.set("per_page", "10");
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const cats: WpCategory[] = (await res.json()) as WpCategory[];
    // Find exact or best match
    const match = cats.find(
      (c) => c.name.toLowerCase() === key,
    ) ?? cats.find(
      (c) => c.name.toLowerCase().includes(key),
    );
    if (match) {
      categoryCache.set(key, match.id);
      return match.id;
    }
    return null;
  } catch {
    return null;
  }
}

const router: IRouter = Router();

router.get("/blog/categories", async (_req, res): Promise<void> => {
  const CACHE_KEY = "all";

  // Serve fresh cache immediately
  const fresh = categoriesCache.getFresh(CACHE_KEY);
  if (fresh) {
    res.json(ListBlogCategoriesResponse.parse(fresh));
    return;
  }

  try {
    const url = new URL(`${WP_API_BASE}/categories`);
    url.searchParams.set("per_page", "50");
    url.searchParams.set("orderby", "count");
    url.searchParams.set("order", "desc");
    url.searchParams.set("hide_empty", "true");

    const wpRes = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!wpRes.ok) {
      // Return stale if available, otherwise empty
      const stale = categoriesCache.get(CACHE_KEY);
      res.json(ListBlogCategoriesResponse.parse(stale ?? []));
      return;
    }

    const data: WpCategory[] = (await wpRes.json()) as WpCategory[];
    const categories = data.map((c) => ({
      id: c.id,
      name: c.name.replace(/&amp;/g, "&"),
      count: c.count,
    }));

    categoriesCache.set(CACHE_KEY, categories, TTL_CATS_MS);
    res.json(ListBlogCategoriesResponse.parse(categories));
  } catch {
    // Return stale if available, otherwise empty
    const stale = categoriesCache.get(CACHE_KEY);
    res.json(ListBlogCategoriesResponse.parse(stale ?? []));
  }
});

router.get("/blog/posts", async (req, res): Promise<void> => {
  const params = ListBlogPostsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { page = 1, perPage = 10, category, search } = params.data;

  // Build a stable cache key from all query dimensions
  const cacheKey = JSON.stringify({ page, perPage, category: category ?? null, search: search ?? null });

  // Serve fresh cache immediately
  const fresh = postsCache.getFresh(cacheKey);
  if (fresh) {
    res.json(ListBlogPostsResponse.parse({ ...fresh, page, perPage }));
    return;
  }

  const url = new URL(`${WP_API_BASE}/posts`);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("page", String(page));
  url.searchParams.set("_embed", "1");
  if (search) url.searchParams.set("search", search);

  // Server-side category filtering via WP category ID
  if (category) {
    const categoryId = await lookupCategoryId(category);
    if (categoryId !== null) {
      url.searchParams.set("categories", String(categoryId));
    }
  }

  try {
    const wpRes = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!wpRes.ok) {
      // Return stale if available, otherwise empty
      const stale = postsCache.get(cacheKey);
      res.status(200).json(
        ListBlogPostsResponse.parse(
          stale ? { ...stale, page, perPage } : { posts: [], total: 0, page, perPage },
        ),
      );
      return;
    }

    const total = parseInt(wpRes.headers.get("x-wp-total") ?? "0", 10);
    const data: WpPost[] = (await wpRes.json()) as WpPost[];
    const posts = data.map(mapWpPost);

    postsCache.set(cacheKey, { posts, total }, TTL_POSTS_MS);
    res.json(ListBlogPostsResponse.parse({ posts, total, page, perPage }));
  } catch {
    // Return stale if available, otherwise empty
    const stale = postsCache.get(cacheKey);
    res.json(
      ListBlogPostsResponse.parse(
        stale ? { ...stale, page, perPage } : { posts: [], total: 0, page, perPage },
      ),
    );
  }
});

router.get("/blog/posts/:slug", async (req, res): Promise<void> => {
  const params = GetBlogPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { slug } = params.data;

  // Serve fresh cache immediately
  const fresh = slugCache.getFresh(slug);
  if (fresh) {
    res.json(GetBlogPostResponse.parse(fresh));
    return;
  }

  const url = new URL(`${WP_API_BASE}/posts`);
  url.searchParams.set("slug", slug);
  url.searchParams.set("_embed", "1");

  try {
    const wpRes = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!wpRes.ok) {
      // Return stale if available, otherwise 404
      const stale = slugCache.get(slug);
      if (stale) {
        res.json(GetBlogPostResponse.parse(stale));
      } else {
        res.status(404).json({ error: "Post not found" });
      }
      return;
    }

    const data: WpPost[] = (await wpRes.json()) as WpPost[];

    if (!data.length) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    const post = mapWpPost(data[0]);
    slugCache.set(slug, post, TTL_SLUG_MS);
    res.json(GetBlogPostResponse.parse(post));
  } catch {
    // Return stale if available, otherwise 404
    const stale = slugCache.get(slug);
    if (stale) {
      res.json(GetBlogPostResponse.parse(stale));
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  }
});

export default router;
