// Abandoned-checkout recovery.
//
// SAME FILE in every store that uses src/lib/orders — keep the copies identical.
//
// A customer who fills in checkout and never pays leaves a pending order with
// their email, phone, address and items. When the Stripe page lapses
// (CHECKOUT_HOLD_MINUTES after they left) the webhook calls
// handleAbandonedCheckout, which:
//   1. emails the customer ONE reminder with a signed link back to the same
//      order (/checkout/resume) — no discount, no second email;
//   2. emails the shop the customer's name, phone and cart, so a large order
//      can get a phone call.
// Nothing is sent when the customer has since paid for an order on any of our
// stores, has asked not to be reminded, or was reminded in the last few days.
//
// ecom_orders.recovery_emailed_at marks an order as reminded (the column
// already exists and is used the same way by Ready Seal Direct).
//
// CASL: the customer gave their email to place this order (an inquiry, which
// carries implied consent), the message names the sender with a postal address,
// and it carries a working "don't remind me" link. Keep all three.

import { createHmac, timingSafeEqual } from "node:crypto";
import type Stripe from "stripe";
import type { SupabaseClient } from "@supabase/supabase-js";
import { BILLER, money, type OrderDoc } from "./documents";
import { loadOrderDoc } from "./order-doc";
import { esc, replyAddress, sendStoreEmail, trackColourBlock, type StoreEmailBrand } from "./emails";
import { taxFor } from "./policy";
import { RESUMED_HOLD_MINUTES, openStripeSession } from "./stripe-session";
import { colourList, distinctTrackColours, trackColourItems } from "./track-colour";

/** How long the link in the reminder keeps working. */
export const RESUME_LINK_DAYS = 14;
/** One reminder per customer in this window, however many checkouts they start. */
const REMINDER_COOLDOWN_DAYS = 3;
const OPT_OUT_SOURCE = "recovery-optout";
const PAID_STATUSES = ["paid", "fulfilled", "shipped", "delivered"];
const DAY_MS = 24 * 60 * 60 * 1000;

export interface RecoveryStore {
  id: string;
  slug: string;
  name: string;
  siteUrl: string;
}

// ---------------------------------------------------------------------------
// Signed links

function linkSecret(): string {
  return process.env.RECOVERY_LINK_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

export function recoveryToken(orderId: string): string {
  return createHmac("sha256", linkSecret()).update(`resume:${orderId}`).digest("base64url").slice(0, 32);
}

export function validRecoveryToken(orderId: string, token: string | null | undefined): boolean {
  if (!linkSecret() || !token) return false;
  const a = Buffer.from(recoveryToken(orderId));
  const b = Buffer.from(String(token));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function resumeLinks(store: Pick<RecoveryStore, "siteUrl">, orderId: string) {
  const base = `${store.siteUrl}/checkout/resume?o=${orderId}&k=${recoveryToken(orderId)}`;
  return { resume: base, stop: `${base}&stop=1` };
}

// ---------------------------------------------------------------------------
// Emails

const firstName = (o: OrderDoc) => (o.shipTo?.recipient ?? "").trim().split(/\s+/)[0] || "there";

function heldUntil(o: OrderDoc): string {
  const d = new Date(new Date(o.createdAt).getTime() + RESUME_LINK_DAYS * DAY_MS);
  return d.toLocaleDateString("en-CA", { month: "long", day: "numeric", timeZone: "America/Toronto" });
}

function itemRows(o: OrderDoc): string {
  return o.lines
    .map((l) => {
      const variant = l.variant && !/^default$/i.test(l.variant) ? `<div style="color:#6b7280;font-size:13px">${esc(l.variant)}</div>` : "";
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee"><div style="font-weight:600">${esc(l.name)}</div>${variant}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center;white-space:nowrap">${l.qty}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;white-space:nowrap">${money(l.total)}</td>
      </tr>`;
    })
    .join("");
}

function totalsTable(o: OrderDoc, totalLabel: string): string {
  const row = (label: string, value: string, strong = false) =>
    `<tr><td style="padding:4px 0;color:${strong ? "#111" : "#4b5563"};${strong ? "font-weight:700;font-size:16px" : ""}">${esc(label)}</td><td style="padding:4px 0;text-align:right;${strong ? "font-weight:700;font-size:16px" : ""}">${value}</td></tr>`;
  return `<table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;margin-top:10px">
        ${row("Subtotal", money(o.subtotal))}
        ${o.discount > 0 ? row("Discount", `-${money(o.discount)}`) : ""}
        ${row(o.shippingLabel, o.shipping > 0 ? money(o.shipping) : "Free")}
        ${row(o.taxLabel, money(o.tax))}
        ${row(totalLabel, money(o.total), true)}
      </table>`;
}

export function abandonedCheckoutSubject(o: OrderDoc, brand: StoreEmailBrand): string {
  return `Your ${brand.name} order is saved - finish checkout when you're ready`;
}

/** The one reminder a customer gets. */
export function abandonedCheckoutHtml(o: OrderDoc, brand: StoreEmailBrand, links: { resume: string; stop: string }): string {
  const phone = brand.phone ?? BILLER.phone;
  const assurances = (brand.assurances ?? [])
    .map((a) => `<li style="margin:0 0 4px">${esc(a)}</li>`)
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#f4f4f5;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#111">
  <div style="display:none;max-height:0;overflow:hidden">Nothing was charged. Your order ${esc(o.number)} is saved until ${esc(heldUntil(o))}.</div>
  <div style="max-width:600px;margin:0 auto;padding:24px 12px">
    <div style="background:${brand.accent};color:#fff;border-radius:12px 12px 0 0;padding:22px 24px">
      <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.9">${esc(brand.name)}</div>
      <div style="font-size:22px;font-weight:700;margin-top:4px">Your order is saved</div>
    </div>
    <div style="background:#fff;border-radius:0 0 12px 12px;padding:24px">
      <p style="margin:0 0 12px">Hi ${esc(firstName(o))},</p>
      <p style="margin:0 0 12px">You started an order with ${esc(brand.name)} and stopped before the payment step. Nothing was charged.</p>
      <p style="margin:0 0 20px">We saved it exactly as you left it, with your shipping details, so finishing takes about a minute.</p>

      <p style="margin:0 0 22px">
        <a href="${esc(links.resume)}" style="display:inline-block;background:${brand.accent};color:#fff;text-decoration:none;font-weight:700;padding:14px 22px;border-radius:8px;font-size:16px">Finish my order</a>
      </p>

      <h2 style="font-size:15px;margin:0 0 6px">What's in it</h2>
      <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">
        <thead><tr>
          <th style="text-align:left;padding:6px 0;border-bottom:2px solid #111;font-size:12px;text-transform:uppercase;color:#6b7280">Item</th>
          <th style="padding:6px 8px;border-bottom:2px solid #111;font-size:12px;text-transform:uppercase;color:#6b7280">Qty</th>
          <th style="text-align:right;padding:6px 0;border-bottom:2px solid #111;font-size:12px;text-transform:uppercase;color:#6b7280">Amount</th>
        </tr></thead>
        <tbody>${itemRows(o)}</tbody>
      </table>
      ${totalsTable(o, "Total (CAD)")}
      ${trackColourBlock(o)}

      <h2 style="font-size:15px;margin:24px 0 6px">Stuck on something?</h2>
      <p style="margin:0 0 12px;font-size:14px;color:#374151">Most people who pause are deciding between two kit sizes, checking the track colour against their soffit, or want to ask about shipping. Reply to this email or call ${esc(phone)} and we will sort it out with you.</p>
      ${assurances ? `<ul style="margin:0 0 4px;padding-left:18px;font-size:14px;color:#374151">${assurances}</ul>` : ""}

      <p style="margin:22px 0 0;font-size:13px;color:#6b7280">Order ${esc(o.number)} is held until ${esc(heldUntil(o))}. If the button does not work, copy this link into your browser:<br><a href="${esc(links.resume)}" style="color:#6b7280;word-break:break-all">${esc(links.resume)}</a></p>
      <p style="margin:16px 0 0;font-size:12px;color:#9ca3af">This is the only reminder we send about this order. You are getting it because you entered ${esc(o.email)} at checkout on ${esc(brand.siteUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, ""))}. <a href="${esc(links.stop)}" style="color:#9ca3af">Don't send me checkout reminders</a>.</p>
      <p style="margin:8px 0 0;font-size:12px;color:#9ca3af">${esc(brand.name)} is sold and invoiced by ${esc(BILLER.name)}, ${esc(BILLER.lines.join(", "))}.</p>
    </div>
  </div></body></html>`;
}

export function abandonedCheckoutText(o: OrderDoc, brand: StoreEmailBrand, links: { resume: string; stop: string }): string {
  const items = o.lines.map((l) => `  ${l.qty} x ${l.name}${l.variant && !/^default$/i.test(l.variant) ? ` (${l.variant})` : ""}  ${money(l.total)}`);
  return [
    `Hi ${firstName(o)},`,
    "",
    `You started an order with ${brand.name} and stopped before the payment step. Nothing was charged.`,
    "We saved it exactly as you left it, so finishing takes about a minute:",
    "",
    links.resume,
    "",
    ...items,
    `  Total (CAD): ${money(o.total)}`,
    "",
    `Questions about kit size, track colour or shipping? Reply to this email or call ${brand.phone ?? BILLER.phone}.`,
    "",
    `Order ${o.number} is held until ${heldUntil(o)}. This is the only reminder we send about it.`,
    `Don't want checkout reminders? ${links.stop}`,
    "",
    `${brand.name} is sold and invoiced by ${BILLER.name}, ${BILLER.lines.join(", ")}.`
  ].join("\n");
}

/** Heads-up to the shop: who walked away, with what, and how to reach them. */
export function staffAbandonedHtml(o: OrderDoc, brand: StoreEmailBrand, info: { customer: string; resume: string }): string {
  const a = o.shipTo;
  const phone = o.phone ?? a?.phone ?? "";
  const tel = phone.replace(/[^\d+]/g, "");
  const colours = distinctTrackColours(trackColourItems(o.lines.map((l) => ({ productName: l.name, variantName: l.variant, quantity: l.qty }))));
  return `<!doctype html><html><body style="margin:0;background:#f4f4f5;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#111">
  <div style="max-width:600px;margin:0 auto;padding:24px 12px">
    <div style="background:#111;color:#fff;border-radius:12px 12px 0 0;padding:18px 24px">
      <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.8">${esc(brand.name)} - checkout not completed</div>
      <div style="font-size:22px;font-weight:700;margin-top:4px">${money(o.total)} left at the payment step</div>
    </div>
    <div style="background:#fff;border-radius:0 0 12px 12px;padding:24px;font-size:14px">
      <p style="margin:0 0 4px;font-size:18px;font-weight:700">${esc(a?.recipient || "Customer")}</p>
      <p style="margin:0 0 4px">${tel ? `<a href="tel:${esc(tel)}" style="color:#111;font-weight:700">${esc(phone)}</a>` : "No phone given"} &nbsp;&middot;&nbsp; <a href="mailto:${esc(o.email)}" style="color:#111">${esc(o.email)}</a></p>
      <p style="margin:0 0 16px;color:#4b5563">${a ? esc([a.line1, a.line2, `${a.city}, ${a.province} ${a.postal}`].filter(Boolean).join(", ")) : ""}</p>
      <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px"><tbody>${itemRows(o)}</tbody></table>
      ${totalsTable(o, "Total (CAD)")}
      ${colours.length ? `<p style="margin:14px 0 0"><strong>Track colour:</strong> ${esc(colourList(colours))}</p>` : ""}
      ${o.customerNote ? `<p style="margin:10px 0 0"><strong>Their note:</strong> ${esc(o.customerNote)}</p>` : ""}
      <p style="margin:18px 0 0;padding:12px 14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px"><strong>Reminder to the customer:</strong> ${esc(info.customer)}</p>
      <p style="margin:14px 0 0;color:#4b5563">Order ${esc(o.number)} (started ${esc(new Date(o.createdAt).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Toronto" }))}) is saved for them. On a large order a quick call usually does more than the email. Their pay link, if you want to text it to them:<br><a href="${esc(info.resume)}" style="color:#4b5563;word-break:break-all">${esc(info.resume)}</a></p>
    </div>
  </div></body></html>`;
}

// ---------------------------------------------------------------------------
// Sending

async function appendNote(service: SupabaseClient, orderId: string, note: string) {
  const { data } = await service.from("ecom_orders").select("internal_note").eq("id", orderId).maybeSingle();
  const prior = data?.internal_note ? `${data.internal_note}\n` : "";
  await service
    .from("ecom_orders")
    .update({ internal_note: `${prior}${new Date().toISOString().slice(0, 16)} ${note}`.slice(-2000) })
    .eq("id", orderId);
}

async function hasOptedOut(service: SupabaseClient, email: string): Promise<boolean> {
  const { data } = await service.from("ecom_contact_messages").select("id").eq("source", OPT_OUT_SOURCE).eq("email", email).limit(1);
  return !!data?.length;
}

/** Called by the webhook the first time an unpaid checkout lapses. Never throws
 *  past its caller in a way that matters: the order is already cancelled. */
export async function handleAbandonedCheckout(opts: {
  service: SupabaseClient;
  store: RecoveryStore;
  brand: StoreEmailBrand;
  orderId: string;
}): Promise<string> {
  const { service, store, brand, orderId } = opts;
  const doc = await loadOrderDoc(service, orderId);
  if (!doc) return "recovery skipped: order not loadable";
  const { data: row } = await service.from("ecom_orders").select("created_at, recovery_emailed_at").eq("id", orderId).maybeSingle();
  if (!row) return "recovery skipped: order not found";
  if (row.recovery_emailed_at) return "recovery skipped: already reminded";

  const email = doc.email.trim().toLowerCase();
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && !email.endsWith("@checkout");

  // Bought after all (here or on a sister store)? Then there is nothing to chase.
  if (validEmail) {
    const { data: paid } = await service
      .from("ecom_orders")
      .select("order_number")
      .eq("email", email)
      .in("status", PAID_STATUSES)
      .gte("created_at", row.created_at)
      .limit(1);
    if (paid?.length) {
      await appendNote(service, orderId, `No checkout reminder: customer paid ${paid[0].order_number}`);
      return `recovery skipped: customer paid ${paid[0].order_number}`;
    }
  }

  const links = resumeLinks(store, orderId);
  let customer: string;
  if (!validEmail) {
    customer = "not sent, no usable email on the order.";
  } else if (await hasOptedOut(service, email)) {
    customer = "not sent, this customer asked not to get checkout reminders.";
  } else {
    const since = new Date(Date.now() - REMINDER_COOLDOWN_DAYS * DAY_MS).toISOString();
    const { data: recent } = await service
      .from("ecom_orders")
      .select("order_number")
      .eq("email", email)
      .neq("id", orderId)
      .gte("recovery_emailed_at", since)
      .limit(1);
    if (recent?.length) {
      customer = `not sent, they were already reminded about ${recent[0].order_number} in the last ${REMINDER_COOLDOWN_DAYS} days.`;
    } else {
      // Claim first so two deliveries of the same event cannot both send.
      const { data: claimed } = await service
        .from("ecom_orders")
        .update({ recovery_emailed_at: new Date().toISOString() })
        .eq("id", orderId)
        .is("recovery_emailed_at", null)
        .select("id");
      if (!claimed?.length) return "recovery skipped: already reminded";
      const sent = await sendStoreEmail(brand, {
        to: doc.email,
        subject: abandonedCheckoutSubject(doc, brand),
        html: abandonedCheckoutHtml(doc, brand, links),
        text: abandonedCheckoutText(doc, brand, links)
      });
      if (sent.ok) {
        customer = `emailed to ${doc.email} with a link back to this order.`;
      } else {
        await service.from("ecom_orders").update({ recovery_emailed_at: null }).eq("id", orderId);
        customer = `FAILED to send (${sent.error}). Contact them directly.`;
      }
    }
  }

  const staffTo = process.env.CONTACT_TO_EMAIL || BILLER.email;
  const staff = await sendStoreEmail(brand, {
    to: staffTo,
    subject: `Checkout not completed: ${doc.number} ${money(doc.total)} - ${doc.shipTo?.recipient || doc.email}`,
    html: staffAbandonedHtml(doc, brand, { customer: `Checkout reminder ${customer}`, resume: links.resume }),
    replyTo: validEmail ? doc.email : replyAddress(brand)
  });
  await appendNote(service, orderId, `Checkout reminder ${customer}${staff.ok ? "" : ` Staff alert FAILED: ${staff.error}`}`);
  return `checkout reminder ${customer}`;
}

// ---------------------------------------------------------------------------
// Coming back through the link

export type ResumeState = { state: "ready"; doc: OrderDoc } | { state: "paid"; doc: OrderDoc } | { state: "invalid" } | { state: "expired" };

export async function loadResumableOrder(
  service: SupabaseClient,
  store: Pick<RecoveryStore, "id">,
  orderId: string | null | undefined,
  token: string | null | undefined
): Promise<ResumeState> {
  if (!orderId || !/^[0-9a-f-]{36}$/i.test(orderId) || !validRecoveryToken(orderId, token)) return { state: "invalid" };
  const { data: row } = await service.from("ecom_orders").select("id, store_id, status, created_at").eq("id", orderId).maybeSingle();
  if (!row || row.store_id !== store.id) return { state: "invalid" };
  const doc = await loadOrderDoc(service, orderId);
  if (!doc || !doc.shipTo || !doc.lines.length) return { state: "invalid" };
  if (PAID_STATUSES.includes(row.status)) return { state: "paid", doc };
  if (row.status !== "pending_payment" && row.status !== "cancelled") return { state: "expired" };
  if (Date.now() - new Date(row.created_at).getTime() > RESUME_LINK_DAYS * DAY_MS) return { state: "expired" };
  return { state: "ready", doc };
}

/** Reopens the saved order on a fresh Stripe page. Same order, same prices. */
export async function resumeCheckout(opts: {
  service: SupabaseClient;
  stripe: Stripe;
  store: RecoveryStore;
  orderId: string;
  token: string;
  trackColourConfirmed?: boolean;
}): Promise<{ ok: true; url: string } | { ok: false; error: string; status: number }> {
  const { service, stripe, store, orderId } = opts;
  const r = await loadResumableOrder(service, store, orderId, opts.token);
  if (r.state === "paid") return { ok: false, error: "This order is already paid. Thank you!", status: 409 };
  if (r.state === "expired") return { ok: false, error: "This saved order has expired. Please start a new order.", status: 410 };
  if (r.state !== "ready") return { ok: false, error: "We couldn't find that saved order. Please start a new order.", status: 404 };
  const doc = r.doc;
  const shipTo = doc.shipTo!;

  const colourItems = trackColourItems(doc.lines.map((l) => ({ productName: l.name, variantName: l.variant, quantity: l.qty })));
  if (colourItems.length && !opts.trackColourConfirmed) {
    return { ok: false, error: `Please confirm your track colour (${colourList(distinctTrackColours(colourItems))}) before paying.`, status: 400 };
  }
  const tax = taxFor(shipTo.province);
  if (!tax) return { ok: false, error: "Please call us to finish this order.", status: 400 };

  // Anything discontinued since they left?
  const { data: items } = await service.from("ecom_order_items").select("variant_id, product_name_snapshot").eq("order_id", orderId);
  const variantIds = (items ?? []).map((i) => i.variant_id).filter(Boolean) as string[];
  if (variantIds.length) {
    const { data: variants } = await service.from("ecom_variants").select("id, is_active").in("id", variantIds);
    const live = new Set((variants ?? []).filter((v) => v.is_active).map((v) => v.id as string));
    const gone = (items ?? []).find((i) => i.variant_id && !live.has(i.variant_id as string));
    if (gone) return { ok: false, error: `${gone.product_name_snapshot} is no longer available. Please start a new order or call us.`, status: 409 };
  }

  const { data: row } = await service.from("ecom_orders").select("stripe_checkout_session_id").eq("id", orderId).maybeSingle();
  let cartId: string | undefined;
  try {
    if (row?.stripe_checkout_session_id) {
      const prev = await stripe.checkout.sessions.retrieve(row.stripe_checkout_session_id);
      // Still open (they clicked the link twice): send them back to the same page.
      if (prev.status === "open" && prev.url) {
        await service.from("ecom_orders").update({ status: "pending_payment", cancelled_at: null }).eq("id", orderId).eq("status", "cancelled");
        return { ok: true, url: prev.url };
      }
      cartId = prev.metadata?.cart_id ?? undefined;
    }
  } catch {
    /* the old session is only a convenience */
  }

  try {
    const links = resumeLinks(store, orderId);
    const session = await openStripeSession({
      stripe,
      store,
      orderId,
      orderNumber: doc.number,
      email: doc.email,
      lines: doc.lines.map((l) => ({ productName: l.name, variantName: l.variant ?? "", sku: l.sku, quantity: l.qty, unitPriceCad: l.unit })),
      shipTo: {
        recipient: shipTo.recipient,
        phone: shipTo.phone ?? doc.phone ?? null,
        line1: shipTo.line1,
        line2: shipTo.line2 ?? null,
        city: shipTo.city,
        province: shipTo.province,
        postal: shipTo.postal
      },
      shipping: { amountCad: doc.shipping, label: doc.shippingLabel, free: doc.shipping <= 0 },
      tax,
      cancelPath: links.resume.slice(store.siteUrl.length),
      metadata: { recovery: "1", ...(cartId ? { cart_id: cartId } : {}) },
      holdMinutes: RESUMED_HOLD_MINUTES,
      discountCad: doc.discount
    });
    const { data: reopened } = await service
      .from("ecom_orders")
      .update({ status: "pending_payment", cancelled_at: null, stripe_checkout_session_id: session.id })
      .eq("id", orderId)
      .in("status", ["pending_payment", "cancelled"])
      .select("id");
    if (!reopened?.length) return { ok: false, error: "This order is already paid. Thank you!", status: 409 };
    await appendNote(
      service,
      orderId,
      `Customer reopened checkout from the reminder link${colourItems.length ? ` and re-confirmed track colour (${colourList(distinctTrackColours(colourItems))})` : ""}`
    );
    return { ok: true, url: session.url as string };
  } catch (e) {
    console.error("[recovery] stripe session failed", (e as Error).message);
    return { ok: false, error: "Card payment is unavailable right now. Please call us to finish your order.", status: 502 };
  }
}

/** Records "don't send me checkout reminders" for the email on this order. */
export async function stopReminders(service: SupabaseClient, store: Pick<RecoveryStore, "id">, orderId: string, token: string): Promise<boolean> {
  if (!/^[0-9a-f-]{36}$/i.test(orderId) || !validRecoveryToken(orderId, token)) return false;
  const { data: row } = await service.from("ecom_orders").select("email, order_number, store_id").eq("id", orderId).maybeSingle();
  if (!row?.email || row.store_id !== store.id) return false;
  const email = String(row.email).trim().toLowerCase();
  if (await hasOptedOut(service, email)) return true;
  const now = new Date().toISOString();
  const { error } = await service.from("ecom_contact_messages").insert({
    store_id: store.id,
    name: "Checkout reminder opt-out",
    email,
    message: `Asked not to receive checkout reminders (from the link in the reminder for ${row.order_number}).`,
    source: OPT_OUT_SOURCE,
    // Already handled: keeps the new-inquiry notifier from texting the shop about it.
    notified_at: now
  });
  if (error) {
    console.error("[recovery] opt-out insert failed", error.message);
    return false;
  }
  await appendNote(service, orderId, "Customer opted out of checkout reminders");
  return true;
}
