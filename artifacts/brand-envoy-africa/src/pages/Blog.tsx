import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { useListBlogPosts, useListBlogCategories } from "@workspace/api-client-react";
import { organizationSchema } from "@/lib/seo";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen, ExternalLink, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const WP_BLOG_URL = "https://brandsenvoy.com/blog";

export function Blog() {
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input by 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data: categoriesData } = useListBlogCategories({
    query: { queryKey: ["/api/blog/categories"] },
  });

  const { data, isLoading } = useListBlogPosts(
    {
      page,
      perPage: 9,
      ...(activeCategory ? { category: activeCategory } : {}),
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
    },
    {
      query: {
        queryKey: ["/api/blog/posts", { page, perPage: 9, category: activeCategory, search: debouncedSearch }],
      },
    }
  );

  // Top categories by post count (show up to 8)
  const topCategories = (categoriesData ?? [])
    .filter((c) => c.count > 0)
    .slice(0, 8);

  function handleCategoryClick(name: string) {
    setActiveCategory((prev) => (prev === name ? undefined : name));
    setPage(1);
  }

  return (
    <Layout
      title="Blog: Marketing & Brand Insights for Africa | Brand Envoy Africa"
      description="Marketing, branding, and business growth insights from Brand Envoy Africa, covering Nigeria, Ghana, Kenya, and the wider African market."
      canonical="/blog"
      keywords={[
        "marketing blog Africa", "branding insights Nigeria", "African market trends",
        "marketing tips Nigeria", "brand strategy Africa blog", "advertising trends Nigeria",
        "PR insights Africa", "FMCG marketing Nigeria blog", "market research Africa articles",
        "digital marketing Nigeria tips", "brand development Africa",
        "marketing agency blog Lagos", "business growth Nigeria articles",
        "African branding insights", "consumer insights Nigeria",
        "Ghana marketing blog", "Kenya marketing insights", "creative advertising Africa",
        "media buying Africa tips", "political marketing Nigeria insights",
      ]}
      structuredData={[organizationSchema()]}
    >
      <section className="pt-24 pb-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">

          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Insights & Intelligence.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Thoughts, observations, and deep dives into the mechanics of marketing, distribution, and political campaigns in Africa.
            </p>
          </div>

          {/* Search input */}
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search articles…"
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category filter pills */}
          {topCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => { setActiveCategory(undefined); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                  !activeCategory
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                All
              </button>
              {topCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                    activeCategory === cat.name
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-video w-full rounded-xl" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : !data || data.posts.length === 0 ? (
            <div className="text-center py-24 bg-muted/30 rounded-2xl border border-dashed">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                {debouncedSearch
                  ? `No results for "${debouncedSearch}"`
                  : activeCategory
                  ? `No posts in "${activeCategory}"`
                  : "No posts yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {debouncedSearch
                  ? "Try a different keyword or clear the search."
                  : activeCategory
                  ? "Try a different category or browse all posts."
                  : "Check back soon for new insights, or visit our full archive."}
              </p>
              {debouncedSearch ? (
                <Button variant="outline" onClick={() => setSearchInput("")}>
                  Clear search
                </Button>
              ) : activeCategory ? (
                <Button variant="outline" onClick={() => { setActiveCategory(undefined); setPage(1); }}>
                  View all posts
                </Button>
              ) : (
                <a
                  href={WP_BLOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Visit brandsenvoy.com/blog <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {data.posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-muted border">
                      {post.featuredImageUrl ? (
                        <img
                          src={post.featuredImageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/5">
                          <BookOpen className="h-8 w-8 text-primary/30" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                      <time dateTime={post.date instanceof Date ? post.date.toISOString() : post.date}>
                        {format(new Date(post.date), "MMM d, yyyy")}
                      </time>
                      {post.categories && post.categories.length > 0 && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-primary" />
                          <span className="uppercase tracking-wider font-semibold text-primary/80">
                            {post.categories[0]}
                          </span>
                        </>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h2>

                    <div
                      className="text-muted-foreground line-clamp-3 mb-4 text-base"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />

                    <span className="inline-flex items-center text-primary font-semibold text-sm">
                      Read Article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>

              {data.total > data.perPage && (
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                  >
                    Previous Page
                  </Button>
                  <Button
                    variant="outline"
                    disabled={page * data.perPage >= data.total}
                    onClick={() => setPage(p => p + 1)}
                  >
                    Next Page
                  </Button>
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </Layout>
  );
}
