import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";
import nodemailer from "nodemailer";

const router: IRouter = Router();

function createTransporter() {
  const user = process.env.GMAIL_USER || "dsfbrandenvoy@gmail.com";
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

async function sendNotificationEmail(data: {
  name: string;
  email: string;
  phone?: string;
  items: string[];
  quantity?: string;
  notes?: string;
}) {
  const transporter = createTransporter();
  if (!transporter) {
    logger.warn("GMAIL_APP_PASSWORD not set — email notification skipped");
    return;
  }

  const itemList = data.items.map((i) => `• ${i}`).join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#222;">
      <div style="background:#FF5733;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h2 style="color:#fff;margin:0;font-size:20px;">New Quote Request — Brand Envoy Africa</h2>
      </div>
      <div style="border:1px solid #eee;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-weight:bold;width:140px;vertical-align:top;">Name</td><td style="padding:8px 0;">${data.name}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;vertical-align:top;">Email</td><td style="padding:8px;"><a href="mailto:${data.email}" style="color:#FF5733;">${data.email}</a></td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;vertical-align:top;">Phone</td><td style="padding:8px 0;">${data.phone || "—"}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;vertical-align:top;">Quantity</td><td style="padding:8px;">${data.quantity || "—"}</td></tr>
        </table>

        <div style="margin-top:20px;">
          <p style="font-weight:bold;margin-bottom:8px;">Items Requested</p>
          <div style="background:#f5f5f5;padding:14px;border-radius:6px;white-space:pre-line;font-size:14px;">${itemList}</div>
        </div>

        ${data.notes ? `
        <div style="margin-top:16px;">
          <p style="font-weight:bold;margin-bottom:8px;">Additional Details / Notes</p>
          <div style="background:#f5f5f5;padding:14px;border-radius:6px;font-size:14px;">${data.notes}</div>
        </div>` : ""}

        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;font-size:12px;color:#888;">
          Submitted via brandsenvoy.com · Brand Envoy Africa
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Brand Envoy Africa" <dsfbrandenvoy@gmail.com>`,
    to: "dsfbrandenvoy@gmail.com",
    subject: `New Quote Request from ${data.name} — Brand Envoy Africa`,
    html,
    text: [
      `New Quote Request — Brand Envoy Africa`,
      ``,
      `Name:     ${data.name}`,
      `Email:    ${data.email}`,
      `Phone:    ${data.phone || "—"}`,
      `Quantity: ${data.quantity || "—"}`,
      ``,
      `Items Requested:`,
      itemList,
      data.notes ? `\nNotes:\n${data.notes}` : "",
    ].join("\n"),
  });
}

router.post("/print-quote", async (req, res): Promise<void> => {
  const { name, email, phone, items, quantity, notes } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    res.status(400).json({ error: "Name is required." });
    return;
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "A valid email is required." });
    return;
  }
  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "Please select at least one product." });
    return;
  }

  const data = { name: name.trim(), email: email.trim(), phone, items, quantity, notes };

  logger.info(data, "Print quote request received");

  try {
    await sendNotificationEmail(data);
    logger.info({ to: "dsfbrandenvoy@gmail.com" }, "Quote notification email sent");
  } catch (err) {
    logger.error({ err }, "Failed to send quote notification email");
    // Don't fail the request — log the error and continue
  }

  res.status(201).json({
    success: true,
    message: "Quote request received. Our team will be in touch within 24 hours.",
  });
});

export default router;
