import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const affiliatesTable = pgTable("affiliates", {
  id: serial("id").primaryKey(),
  productName: text("product_name").notNull(),
  affiliateUrl: text("affiliate_url").notNull(),
  productInfo: text("product_info").notNull(),
  generatedCopy: text("generated_copy"),
  imageUrl: text("image_url"),
  category: text("category"),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertAffiliateSchema = createInsertSchema(affiliatesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertAffiliate = z.infer<typeof insertAffiliateSchema>;
export type Affiliate = typeof affiliatesTable.$inferSelect;
