import { Router, type IRouter } from "express";
import { db, affiliatesTable } from "@workspace/db";
import { desc, eq, and, sql } from "drizzle-orm";
import {
  ListAffiliatesQueryParams,
  ListAffiliatesResponse,
  CreateAffiliateBody,
  CreateAffiliateResponse,
  GetAffiliateStatsResponse,
  GetAffiliateParams,
  GetAffiliateResponse,
  UpdateAffiliateParams,
  UpdateAffiliateBody,
  UpdateAffiliateResponse,
  DeleteAffiliateParams,
  PublishAffiliateParams,
  PublishAffiliateBody,
  PublishAffiliateResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

// Generate brand-voice copy for an affiliate product
function generateAffiliateCopy(productName: string, productInfo: string): string {
  return `Discover ${productName} — ${productInfo.slice(0, 200)}${productInfo.length > 200 ? "..." : ""} We've vetted this product and believe it delivers real value. As an affiliate partner, we earn a commission at no extra cost to you.`;
}

router.get("/affiliates", async (req, res): Promise<void> => {
  const params = ListAffiliatesQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { publishedOnly = true, category, limit = 20, offset = 0 } = params.data;

  const conditions = [];
  if (publishedOnly) {
    conditions.push(eq(affiliatesTable.published, true));
  }
  if (category) {
    conditions.push(eq(affiliatesTable.category, category));
  }

  const affiliates =
    conditions.length > 0
      ? await db
          .select()
          .from(affiliatesTable)
          .where(and(...conditions))
          .orderBy(desc(affiliatesTable.createdAt))
          .limit(limit)
          .offset(offset)
      : await db
          .select()
          .from(affiliatesTable)
          .orderBy(desc(affiliatesTable.createdAt))
          .limit(limit)
          .offset(offset);

  res.json(ListAffiliatesResponse.parse(affiliates));
});

router.post("/affiliates", async (req, res): Promise<void> => {
  const parsed = CreateAffiliateBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  // Auto-generate copy if not provided
  const generatedCopy = generateAffiliateCopy(data.productName, data.productInfo);

  const [affiliate] = await db
    .insert(affiliatesTable)
    .values({
      productName: data.productName,
      affiliateUrl: data.affiliateUrl,
      productInfo: data.productInfo,
      generatedCopy,
      imageUrl: data.imageUrl ?? null,
      category: data.category ?? null,
      published: data.published ?? false,
    })
    .returning();

  res.status(201).json(CreateAffiliateResponse.parse(affiliate));
});

router.get("/affiliates/stats", async (_req, res): Promise<void> => {
  const [stats] = await db
    .select({
      total: sql<number>`count(*)::int`,
      published: sql<number>`count(*) filter (where published = true)::int`,
      unpublished: sql<number>`count(*) filter (where published = false)::int`,
    })
    .from(affiliatesTable);

  const categoryRows = await db
    .select({
      category: affiliatesTable.category,
      count: sql<number>`count(*)::int`,
    })
    .from(affiliatesTable)
    .groupBy(affiliatesTable.category);

  const categories = categoryRows
    .filter((r) => r.category != null)
    .map((r) => ({ category: r.category as string, count: r.count }));

  res.json(
    GetAffiliateStatsResponse.parse({
      total: stats?.total ?? 0,
      published: stats?.published ?? 0,
      unpublished: stats?.unpublished ?? 0,
      categories,
    }),
  );
});

router.get("/affiliates/:id", async (req, res): Promise<void> => {
  const params = GetAffiliateParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [affiliate] = await db
    .select()
    .from(affiliatesTable)
    .where(eq(affiliatesTable.id, params.data.id));

  if (!affiliate) {
    res.status(404).json({ error: "Affiliate not found" });
    return;
  }

  res.json(GetAffiliateResponse.parse(affiliate));
});

router.put("/affiliates/:id", async (req, res): Promise<void> => {
  const params = UpdateAffiliateParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateAffiliateBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updateData: Record<string, unknown> = { ...parsed.data };

  // If productInfo changed and no generatedCopy provided, regenerate copy
  if (parsed.data.productInfo && parsed.data.generatedCopy === undefined) {
    const [existing] = await db
      .select()
      .from(affiliatesTable)
      .where(eq(affiliatesTable.id, params.data.id));
    if (existing) {
      updateData.generatedCopy = generateAffiliateCopy(
        parsed.data.productName ?? existing.productName,
        parsed.data.productInfo,
      );
    }
  }

  const [affiliate] = await db
    .update(affiliatesTable)
    .set(updateData)
    .where(eq(affiliatesTable.id, params.data.id))
    .returning();

  if (!affiliate) {
    res.status(404).json({ error: "Affiliate not found" });
    return;
  }

  res.json(UpdateAffiliateResponse.parse(affiliate));
});

router.delete("/affiliates/:id", async (req, res): Promise<void> => {
  const params = DeleteAffiliateParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(affiliatesTable)
    .where(eq(affiliatesTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Affiliate not found" });
    return;
  }

  res.sendStatus(204);
});

router.post("/affiliates/:id/publish", async (req, res): Promise<void> => {
  const params = PublishAffiliateParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = PublishAffiliateBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [affiliate] = await db
    .update(affiliatesTable)
    .set({ published: parsed.data.published })
    .where(eq(affiliatesTable.id, params.data.id))
    .returning();

  if (!affiliate) {
    res.status(404).json({ error: "Affiliate not found" });
    return;
  }

  res.json(PublishAffiliateResponse.parse(affiliate));
});

export default router;
