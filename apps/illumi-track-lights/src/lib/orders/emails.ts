// Customer order confirmation: the order summary in the body, the Master Decker
// Inc. invoice attached as a PDF. Sent once, from the Stripe webhook, when the
// payment lands. (Staff get their own email + SMS from the central notify-order
// trigger on ecom_orders, and the order shows in QuickQuote's Web Orders bar.)
//
// Illumi's copy: differs from permanent-lighting-direct / forever-lights only in
// the pickup wording (an order collected from the Woodstock shop).

import { BILLER, money, type OrderDoc } from "./documents";
import { PICKUP_LABEL, SHOP } from "./policy";
import { TRACK_COLOUR_HELP, colourList, distinctTrackColours, trackColourItems } from "./track-colour";

export const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export interface StoreEmailBrand {
  name: string;
  siteUrl: string;
  /** Accent colour for the header band and buttons. */
  accent: string;
  phone?: string;
  /** Where customer replies go. Defaults to CONTACT_TO_EMAIL, then the biller. */
  replyTo?: string;
  /** Short, true selling points for the reminder email, e.g. "30-day returns". */
  assurances?: string[];
}

export function replyAddress(brand: StoreEmailBrand): string {
  return brand.replyTo || process.env.CONTACT_TO_EMAIL || BILLER.email;
}

/** "Track colour: White" block for emails; empty when nothing on the order is colour-matched. */
export function trackColourBlock(o: OrderDoc): string {
  const items = trackColourItems(o.lines.map((l) => ({ productName: l.name, variantName: l.variant, quantity: l.qty })));
  if (!items.length) return "";
  const colours = distinctTrackColours(items);
  const chips = colours
    .map(
      (c) =>
        `<span style="display:inline-block;margin:0 10px 0 0;white-space:nowrap"><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${c.hex};border:1px solid #9ca3af;vertical-align:-2px;margin-right:6px"></span><strong>${esc(c.label)}</strong></span>`
    )
    .join("");
  return `<div style="margin:18px 0 0;padding:12px 14px;border:1px solid #e5e7eb;border-radius:8px;background:#fafafa;font-size:14px">
        <div style="font-size:12px;text-transform:uppercase;color:#6b7280;margin-bottom:6px">Track colour${colours.length > 1 ? "s" : ""} on this order</div>
        ${chips}
        <div style="margin-top:8px;font-size:13px;color:#6b7280">${esc(TRACK_COLOUR_HELP)}${colours.length > 1 ? ` This order has ${esc(colourList(colours))}.` : ""} If that is not right, reply or call before it ships.</div>
      </div>`;
}


export function orderConfirmationHtml(o: OrderDoc, brand: StoreEmailBrand): string {
  const first = (o.shipTo?.recipient ?? "").split(/\s+/)[0] || "there";
  const rows = o.lines
    .map((l) => {
      const variant = l.variant && !/^default$/i.test(l.variant) ? `<div style="color:#6b7280;font-size:13px">${esc(l.variant)}</div>` : "";
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee"><div style="font-weight:600">${esc(l.name)}</div>${variant}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center;white-space:nowrap">${l.qty}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;white-space:nowrap">${money(l.total)}</td>
      </tr>`;
    })
    .join("");
  const total = (label: string, value: string, strong = false) =>
    `<tr><td style="padding:4px 0;color:${strong ? "#111" : "#4b5563"};${strong ? "font-weight:700;font-size:16px" : ""}">${esc(label)}</td><td style="padding:4px 0;text-align:right;${strong ? "font-weight:700;font-size:16px" : ""}">${value}</td></tr>`;
  const a = o.shipTo;
  const pickup = o.shippingLabel === PICKUP_LABEL;
  const address = pickup
    ? [SHOP.name, SHOP.street, `${SHOP.town}, ${SHOP.province} ${SHOP.postal}`].map(esc).join("<br>")
    : a
      ? [a.recipient, a.company, a.line1, a.line2, `${a.city}, ${a.province} ${a.postal}`].filter(Boolean).map(esc).join("<br>")
      : "";
  const nextStep = pickup
    ? `Thanks for your order. Your payment went through and we're getting it ready. Please wait for our "ready for pickup" email before you come by, usually within one to two business days. Pickup is at ${esc(SHOP.address)}. Bring this email or your order number.`
    : "Thanks for your order. Your payment went through and we're getting it ready. It ships free. We pack orders within one to two business days and email you tracking as soon as it leaves.";

  return `<!doctype html><html><body style="margin:0;background:#f4f4f5;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#111">
  <div style="max-width:600px;margin:0 auto;padding:24px 12px">
    <div style="background:${brand.accent};color:#fff;border-radius:12px 12px 0 0;padding:22px 24px">
      <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.9">${esc(brand.name)}</div>
      <div style="font-size:22px;font-weight:700;margin-top:4px">Order ${esc(o.number)} is confirmed</div>
    </div>
    <div style="background:#fff;border-radius:0 0 12px 12px;padding:24px">
      <p style="margin:0 0 12px">Hi ${esc(first)},</p>
      <p style="margin:0 0 12px">${nextStep}</p>
      <p style="margin:0 0 20px">Your invoice from ${esc(BILLER.name)}, our billing company, is attached as a PDF for your records.</p>

      <h2 style="font-size:15px;margin:0 0 6px">Order summary</h2>
      <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">
        <thead><tr>
          <th style="text-align:left;padding:6px 0;border-bottom:2px solid #111;font-size:12px;text-transform:uppercase;color:#6b7280">Item</th>
          <th style="padding:6px 8px;border-bottom:2px solid #111;font-size:12px;text-transform:uppercase;color:#6b7280">Qty</th>
          <th style="text-align:right;padding:6px 0;border-bottom:2px solid #111;font-size:12px;text-transform:uppercase;color:#6b7280">Amount</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;margin-top:10px">
        ${total("Subtotal", money(o.subtotal))}
        ${o.discount > 0 ? total("Discount", `-${money(o.discount)}`) : ""}
        ${total(o.shippingLabel, o.shipping > 0 ? money(o.shipping) : pickup ? "No charge" : "$0.00")}
        ${total(o.taxLabel, money(o.tax))}
        ${total("Total paid (CAD)", money(o.total), true)}
      </table>
      ${trackColourBlock(o)}

      <table role="presentation" style="width:100%;margin-top:22px;font-size:14px"><tr>
        <td style="vertical-align:top;width:50%;padding-right:12px">
          <div style="font-size:12px;text-transform:uppercase;color:#6b7280;margin-bottom:4px">${pickup ? "Pick up at" : "Shipping to"}</div>${address}
        </td>
        <td style="vertical-align:top;width:50%">
          <div style="font-size:12px;text-transform:uppercase;color:#6b7280;margin-bottom:4px">Contact</div>${esc(o.email)}${o.phone ? `<br>${esc(o.phone)}` : ""}
        </td>
      </tr></table>

      <p style="margin:24px 0 0">
        <a href="${esc(brand.siteUrl)}" style="display:inline-block;background:${brand.accent};color:#fff;text-decoration:none;font-weight:600;padding:12px 18px;border-radius:8px">Visit ${esc(brand.name)}</a>
      </p>
      <p style="margin:20px 0 0;font-size:13px;color:#6b7280">Questions about your order? Reply to this email or call ${esc(brand.phone ?? BILLER.phone)}. Please quote ${esc(o.number)}.</p>
      <p style="margin:12px 0 0;font-size:12px;color:#9ca3af">${esc(brand.name)} is sold and invoiced by ${esc(BILLER.name)}, ${esc(BILLER.lines.join(", "))}. Your card statement shows MASTER DECKER.</p>
    </div>
  </div></body></html>`;
}

export interface SendResult {
  ok: boolean;
  id?: string;
  error?: string;
}

/** Sends through Resend's REST API. Only masterdecker.com is a verified sender
 *  domain, so the From is always noreply@masterdecker.com with the store's name. */
export async function sendStoreEmail(
  brand: StoreEmailBrand,
  mail: { to: string; subject: string; html: string; text?: string; replyTo?: string; attachments?: { filename: string; content: string }[] }
): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "RESEND_API_KEY not set" };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `${brand.name} <noreply@masterdecker.com>`,
      to: [mail.to],
      reply_to: mail.replyTo ?? replyAddress(brand),
      subject: mail.subject,
      html: mail.html,
      ...(mail.text ? { text: mail.text } : {}),
      ...(mail.attachments ? { attachments: mail.attachments } : {})
    })
  });
  const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
  if (!res.ok) return { ok: false, error: `${res.status} ${body.message ?? ""}`.trim() };
  return { ok: true, id: body.id };
}

export async function sendOrderConfirmation(o: OrderDoc, brand: StoreEmailBrand, invoicePdf: Uint8Array): Promise<SendResult> {
  return sendStoreEmail(brand, {
    to: o.email,
    subject: `Order ${o.number} confirmed - ${brand.name}`,
    html: orderConfirmationHtml(o, brand),
    attachments: [{ filename: `Invoice-${o.number}.pdf`, content: Buffer.from(invoicePdf).toString("base64") }]
  });
}
