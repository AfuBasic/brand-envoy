import { Router, type IRouter } from "express";
import { db, contactsTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import {
  SubmitContactBody,
  SubmitContactResponse,
  ListContactsQueryParams,
  ListContactsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [contact] = await db
    .insert(contactsTable)
    .values({
      name: data.name,
      email: data.email,
      company: data.company ?? null,
      phone: data.phone ?? null,
      tier: data.tier,
      message: data.message,
      budget: data.budget ?? null,
      market: data.market ?? null,
      officeLevel: data.officeLevel ?? null,
      services: data.services ?? null,
    })
    .returning();

  res.status(201).json(SubmitContactResponse.parse(contact));
});

router.get("/contact", async (req, res): Promise<void> => {
  const params = ListContactsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { tier, limit = 50, offset = 0 } = params.data;

  let query = db
    .select()
    .from(contactsTable)
    .orderBy(desc(contactsTable.createdAt))
    .limit(limit)
    .offset(offset);

  // Apply tier filter if provided
  const contacts = tier
    ? await db
        .select()
        .from(contactsTable)
        .where(eq(contactsTable.tier, tier))
        .orderBy(desc(contactsTable.createdAt))
        .limit(limit)
        .offset(offset)
    : await query;

  res.json(ListContactsResponse.parse(contacts));
});

export default router;
