// Server side of online checkout, shared by the web stores billed through
// Master Decker Inc.'s Stripe account.
//
// SAME FILE in apps/permanent-lighting-direct and apps/forever-lights.
//
// Flow: the checkout page posts the customer + address → createOrderAndSession
// prices it (policy.ts), writes a pending_payment order with its items and
// shipping address, and opens a Stripe Checkout Session → Stripe redirects back
// → the webhook (handleStripeEvent) flips the order to paid exactly once,
// emails the customer the order summary + invoice PDF, and the central
// notify-order trigger on ecom_orders emails/texts the shop.
//
// Every event on the Stripe account reaches every registered endpoint (Ready
// Seal Direct's included). Sessions here therefore carry the order id in
// client_reference_id — never metadata.order_id, which RSD's webhook acts on —
// and metadata.store, so each store only touches its own orders.

import type Stripe from "stripe";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  estimateTotals,
  isProvince,
  normalizePostal,
  postalMatchesProvince,
  provinceName,
  quoteShipping,
  taxFor,
  type TaxRule
} from "./policy";
import { renderInvoicePdf, type OrderDoc } from "./documents";
import { loadOrderDoc } from "./order-doc";
import { sendOrderConfirmation, type StoreEmailBrand } from "./emails";

export interface CheckoutLine {
  variantId: string | null;
  productName: string;
  variantName: string;
  sku: string;
  quantity: number;
  unitPriceCad: number;
}

export interface CheckoutCustomer {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  company: string;
  line1: string;
  line2: string;
  city: string;
  province: string;
  postal: string;
  note: string;
}

export interface StoreConfig {
  id: string;
  slug: string;
  name: string;
  /** Order-number prefix, e.g. "PLD" → PLD-10031. */
  prefix: string;
  siteUrl: string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;
const cents = (n: number) => Math.round(n * 100);

export function parseCustomer(raw: unknown): { ok: true; customer: CheckoutCustomer } | { ok: false; error: string } {
  const r = (raw ?? {}) as Record<string, unknown>;
  const s = (k: string, max = 200) => String(r[k] ?? "").trim().slice(0, max);
  const customer: CheckoutCustomer = {
    email: s("email").toLowerCase(),
    phone: s("phone", 40),
    firstName: s("firstName", 80),
    lastName: s("lastName", 80),
    company: s("company", 120),
    line1: s("line1"),
    line2: s("line2"),
    city: s("city", 100),
    province: s("province", 2).toUpperCase(),
    postal: normalizePostal(s("postal", 10)) ?? "",
    note: s("note", 1000)
  };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customer.email)) return { ok: false, error: "Please enter a valid email address." };
  if (customer.phone.replace(/\D/g, "").length < 10) return { ok: false, error: "Please enter a phone number we can reach you at about delivery." };
  if (!customer.firstName || !customer.lastName) return { ok: false, error: "Please enter your first and last name." };
  if (!customer.line1 || !customer.city) return { ok: false, error: "Please enter your street address and city." };
  if (!isProvince(customer.province)) return { ok: false, error: "Please choose your province." };
  if (!customer.postal) return { ok: false, error: "Please enter a valid Canadian postal code." };
  if (!postalMatchesProvince(customer.postal, customer.province)) {
    return { ok: false, error: `Postal code ${customer.postal} isn't in ${provinceName(customer.province)}. Please check both.` };
  }
  return { ok: true, customer };
}

// One reusable Stripe tax rate per province/rate, found by metadata key.
const taxRateCache = new Map<string, string>();

async function taxRateId(stripe: Stripe, tax: TaxRule): Promise<string> {
  const key = `md_${tax.label.toLowerCase()}_${tax.province}_${tax.rate}`;
  const cached = taxRateCache.get(key);
  if (cached) return cached;
  for await (const r of stripe.taxRates.list({ active: true, limit: 100 })) {
    if (r.metadata?.key === key) {
      taxRateCache.set(key, r.id);
      return r.id;
    }
  }
  const created = await stripe.taxRates.create({
    display_name: tax.label,
    description: `${tax.label} ${tax.rate}% ${provinceName(tax.province)} (Master Decker Inc. web orders)`,
    percentage: tax.rate,
    inclusive: false,
    country: "CA",
    state: tax.province,
    jurisdiction: provinceName(tax.province),
    tax_type: tax.label === "HST" ? "hst" : "gst",
    metadata: { key }
  });
  taxRateCache.set(key, created.id);
  return created.id;
}

export async function createOrderAndSession(opts: {
  service: SupabaseClient;
  stripe: Stripe;
  store: StoreConfig;
  lines: CheckoutLine[];
  customer: CheckoutCustomer;
  /** Path the Stripe "back" link returns to, e.g. "/cart". */
  cancelPath: string;
  /** Extra session metadata (e.g. cart_id). Must not include order_id. */
  metadata?: Record<string, string>;
}): Promise<{ ok: true; url: string; orderNumber: string } | { ok: false; error: string; status: number }> {
  const { service, stripe, store, lines, customer } = opts;
  if (!lines.length) return { ok: false, error: "Your cart is empty.", status: 400 };

  const subtotal = round2(lines.reduce((n, l) => n + l.unitPriceCad * l.quantity, 0));
  const shipping = quoteShipping(customer.postal);
  const tax = taxFor(customer.province);
  if (!shipping || !tax) return { ok: false, error: "Please check your postal code and province.", status: 400 };
  const totals = estimateTotals(subtotal, customer.postal, customer.province);

  // 1) Pending order. The table default numbers it from a shared sequence with
  //    an HLD- prefix; swap in this store's prefix, keeping the unique number.
  const { data: order, error: orderErr } = await service
    .from("ecom_orders")
    .insert({
      store_id: store.id,
      email: customer.email,
      phone: customer.phone,
      status: "pending_payment",
      payment_method: "card",
      currency: "CAD",
      subtotal_cad: subtotal,
      shipping_cad: shipping.amountCad,
      tax_cad: totals.taxCad,
      discount_cad: 0,
      total_cad: totals.total,
      shipping_service_code: shipping.code,
      customer_note: customer.note || null
    })
    .select("id, order_number")
    .single();
  if (orderErr || !order) {
    console.error("[checkout] order insert failed", orderErr);
    return { ok: false, error: "We couldn't start your order. Please try again or call us.", status: 500 };
  }
  const digits = String(order.order_number).replace(/^\D+-?/, "");
  const orderNumber = `${store.prefix}-${digits}`;
  await service.from("ecom_orders").update({ order_number: orderNumber }).eq("id", order.id);

  const { error: itemsErr } = await service.from("ecom_order_items").insert(
    lines.map((l) => ({
      order_id: order.id,
      variant_id: l.variantId,
      product_name_snapshot: l.productName,
      variant_name_snapshot: l.variantName,
      sku_snapshot: l.sku,
      quantity: l.quantity,
      unit_price_cad: l.unitPriceCad,
      line_subtotal_cad: round2(l.unitPriceCad * l.quantity),
      line_tax_cad: round2((l.unitPriceCad * l.quantity * tax.rate) / 100)
    }))
  );
  const recipient = `${customer.firstName} ${customer.lastName}`.trim();
  const { error: addrErr } = await service.from("ecom_order_addresses").insert({
    order_id: order.id,
    type: "shipping",
    recipient,
    company: customer.company || null,
    line1: customer.line1,
    line2: customer.line2 || null,
    city: customer.city,
    province: customer.province,
    postal_code: customer.postal,
    country: "CA",
    phone: customer.phone
  });
  if (itemsErr || addrErr) {
    console.error("[checkout] item/address insert failed", itemsErr ?? addrErr);
    await service.from("ecom_orders").update({ status: "cancelled", cancelled_at: new Date().toISOString(), internal_note: "Checkout aborted: could not save items/address" }).eq("id", order.id);
    return { ok: false, error: "We couldn't save your order. Please try again or call us.", status: 500 };
  }

  // 2) Stripe Checkout. Prices are re-sent from our records, never the browser.
  try {
    const rate = await taxRateId(stripe, tax);
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = lines.map((l) => ({
      quantity: l.quantity,
      tax_rates: [rate],
      price_data: {
        currency: "cad",
        unit_amount: cents(l.unitPriceCad),
        product_data: {
          name: /^default$/i.test(l.variantName) ? l.productName : `${l.productName} (${l.variantName})`,
          metadata: { sku: l.sku }
        }
      }
    }));
    // Freight is taxable at the same rate, so paid shipping rides as a taxed line.
    if (shipping.amountCad > 0) {
      lineItems.push({
        quantity: 1,
        tax_rates: [rate],
        price_data: { currency: "cad", unit_amount: cents(shipping.amountCad), product_data: { name: shipping.label } }
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customer.email,
      client_reference_id: order.id,
      line_items: lineItems,
      metadata: { ...(opts.metadata ?? {}), store: store.slug, order_number: orderNumber },
      payment_intent_data: {
        description: `${orderNumber} - ${store.name}`,
        metadata: { store: store.slug, order_number: orderNumber, ecom_order: order.id },
        shipping: {
          name: recipient,
          phone: customer.phone,
          address: {
            line1: customer.line1,
            line2: customer.line2 || undefined,
            city: customer.city,
            state: customer.province,
            postal_code: customer.postal,
            country: "CA"
          }
        }
      },
      custom_text: {
        submit: {
          message: `${shipping.free ? "Free shipping to " : "Ships to "}${customer.postal}. ${store.name} orders are invoiced by Master Decker Inc.; your card statement shows MASTER DECKER.`
        }
      },
      success_url: `${store.siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${store.siteUrl}${opts.cancelPath}`
    });

    await service.from("ecom_orders").update({ stripe_checkout_session_id: session.id }).eq("id", order.id);
    if (!session.url) throw new Error("Stripe returned no checkout URL");
    return { ok: true, url: session.url, orderNumber };
  } catch (e) {
    const msg = (e as Error).message;
    console.error("[checkout] stripe session failed", msg);
    await service
      .from("ecom_orders")
      .update({ status: "cancelled", cancelled_at: new Date().toISOString(), internal_note: `Stripe session failed: ${msg}`.slice(0, 500) })
      .eq("id", order.id);
    return { ok: false, error: "Card payment is unavailable right now. Please call us to order.", status: 502 };
  }
}

// ---------------------------------------------------------------------------
// Webhook

export interface WebhookOptions {
  service: SupabaseClient;
  stripe: Stripe;
  event: Stripe.Event;
  store: StoreConfig;
  brand: StoreEmailBrand;
  /** Decrement ecom_inventory for lines that point at a variant. */
  trackInventory: boolean;
}

export type WebhookOutcome =
  | { handled: false; reason: string }
  | { handled: true; orderNumber: string; emailed: boolean; duplicate?: boolean };

/** QuickQuote polls qq_leads every minute and files each row under the customer
 *  in its CRM inbox; the order itself shows in QuickQuote's Web Orders bar. */
async function pushToQuickQuote(service: SupabaseClient, doc: OrderDoc, store: StoreConfig) {
  const a = doc.shipTo;
  const items = doc.lines.map((l) => `${l.qty} x ${l.name}${l.variant && !/^default$/i.test(l.variant) ? ` (${l.variant})` : ""}`);
  const money = (n: number) => `$${n.toFixed(2)}`;
  const message = [
    `WEB ORDER ${doc.number} - PAID ${money(doc.total)} on ${store.name}`,
    "",
    ...items,
    "",
    `Subtotal ${money(doc.subtotal)} | ${doc.shippingLabel} ${doc.shipping > 0 ? money(doc.shipping) : "free"} | ${doc.taxLabel} ${money(doc.tax)}`,
    a ? `Ship to: ${[a.recipient, a.company, a.line1, a.line2, `${a.city}, ${a.province} ${a.postal}`].filter(Boolean).join(", ")}` : "",
    doc.customerNote ? `Customer note: ${doc.customerNote}` : "",
    "Pick list + invoice: QuickQuote > Web orders bar."
  ].filter((l, i, arr) => l !== "" || arr[i - 1] !== "");
  const { error } = await service.from("qq_leads").insert({
    site: store.siteUrl.replace(/^https?:\/\//, ""),
    name: a?.recipient ?? null,
    email: doc.email,
    phone: doc.phone ?? a?.phone ?? null,
    address: a ? [a.line1, a.line2].filter(Boolean).join(", ") : null,
    city: a ? `${a.city}, ${a.province} ${a.postal}` : null,
    service: `Web order (paid) - ${store.name}`,
    message: message.join("\n"),
    source_url: `${store.siteUrl}/checkout/success`,
    raw: { kind: "web_order", order_id: doc.id, order_number: doc.number, store: store.slug, total: doc.total }
  });
  if (error) console.error("[webhook] qq_leads insert failed", error.message);
}

function splitName(full: string | null | undefined) {
  const parts = String(full ?? "").trim().split(/\s+/).filter(Boolean);
  return { first: parts[0] ?? null, last: parts.length > 1 ? parts.slice(1).join(" ") : null };
}

export async function handleStripeEvent(o: WebhookOptions): Promise<WebhookOutcome> {
  const { service, stripe, event, store } = o;
  const isPaidEvent = event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded";
  const isExpired = event.type === "checkout.session.expired";
  if (!isPaidEvent && !isExpired) return { handled: false, reason: `ignored ${event.type}` };

  const evtSession = event.data.object as Stripe.Checkout.Session;
  if (evtSession.metadata?.store !== store.slug || !evtSession.client_reference_id) {
    return { handled: false, reason: "not this store's session" };
  }
  const orderId = evtSession.client_reference_id;

  const { data: order } = await service
    .from("ecom_orders")
    .select("id, order_number, store_id, status, internal_note")
    .eq("id", orderId)
    .maybeSingle();
  if (!order || order.store_id !== store.id) return { handled: false, reason: "order not found for this store" };

  if (isExpired) {
    await service
      .from("ecom_orders")
      .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
      .eq("id", orderId)
      .eq("status", "pending_payment");
    return { handled: false, reason: "session expired; pending order cancelled" };
  }

  // Re-fetch: the event body is a snapshot and can lag the session.
  const session = await stripe.checkout.sessions.retrieve(evtSession.id);
  if (session.payment_status !== "paid") return { handled: false, reason: `payment_status ${session.payment_status}` };

  const now = new Date().toISOString();
  const email = session.customer_details?.email ?? null;

  // Compare-and-set: only the first delivery moves pending_payment → paid, so the
  // customer email goes out once even when Stripe retries. (A session that
  // expired first is still accepted if Stripe later reports it paid.)
  const { data: claimed, error: claimErr } = await service
    .from("ecom_orders")
    .update({
      status: "paid",
      paid_at: now,
      placed_at: now,
      ...(email ? { email } : {}),
      stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null,
      tax_cad: (session.total_details?.amount_tax ?? 0) / 100,
      total_cad: (session.amount_total ?? 0) / 100,
      cancelled_at: null
    })
    .eq("id", orderId)
    .in("status", ["pending_payment", "cancelled"])
    .select("id");
  if (claimErr) throw new Error(`order update failed: ${claimErr.message}`);
  if (!claimed?.length) return { handled: true, orderNumber: order.order_number, emailed: false, duplicate: true };

  // Customer record (keyed by email; never blank out existing fields).
  const { data: addr } = await service
    .from("ecom_order_addresses")
    .select("recipient, phone")
    .eq("order_id", orderId)
    .eq("type", "shipping")
    .maybeSingle();
  const { first, last } = splitName(addr?.recipient ?? session.customer_details?.name);
  const custEmail = email ?? (await service.from("ecom_orders").select("email").eq("id", orderId).single()).data?.email;
  if (custEmail) {
    const payload: Record<string, unknown> = {};
    if (first) payload.first_name = first;
    if (last) payload.last_name = last;
    if (addr?.phone) payload.phone = addr.phone;
    if (typeof session.customer === "string") payload.stripe_customer_id = session.customer;
    // Existing customers keep their pricing tier; new ones start on "public".
    const { data: existing } = await service.from("ecom_customers").select("id").eq("email", custEmail).maybeSingle();
    let customerId: string | null = existing?.id ?? null;
    if (customerId) {
      if (Object.keys(payload).length) await service.from("ecom_customers").update(payload).eq("id", customerId);
    } else {
      const { data: tier } = await service.from("ecom_pricing_tiers").select("id").eq("slug", "public").maybeSingle();
      const { data: cust, error: custErr } = await service
        .from("ecom_customers")
        .insert({ ...payload, email: custEmail, tier_id: tier?.id })
        .select("id")
        .single();
      if (custErr) console.error("[webhook] customer insert failed", custErr.message);
      customerId = cust?.id ?? null;
    }
    if (customerId) await service.from("ecom_orders").update({ customer_id: customerId }).eq("id", orderId);
  }

  // Stock + cart housekeeping.
  if (o.trackInventory) {
    const { data: items } = await service.from("ecom_order_items").select("variant_id, quantity").eq("order_id", orderId);
    for (const it of items ?? []) {
      if (!it.variant_id) continue;
      const { data: inv } = await service.from("ecom_inventory").select("on_hand, track_inventory").eq("variant_id", it.variant_id).maybeSingle();
      if (inv && inv.track_inventory !== false) {
        await service
          .from("ecom_inventory")
          .update({ on_hand: Number(inv.on_hand ?? 0) - Number(it.quantity ?? 0), updated_at: now })
          .eq("variant_id", it.variant_id);
      }
    }
  }
  const cartId = session.metadata?.cart_id;
  if (cartId) await service.from("ecom_cart_items").delete().eq("cart_id", cartId);

  // Order summary + invoice to the customer; the buyer into QuickQuote's CRM inbox.
  let emailed = false;
  let note = "";
  try {
    const doc = await loadOrderDoc(service, orderId);
    if (!doc) throw new Error("order not loadable");
    const pdf = await renderInvoicePdf(doc);
    const sent = await sendOrderConfirmation(doc, o.brand, pdf);
    emailed = sent.ok;
    note = sent.ok ? `Confirmation + invoice emailed to ${doc.email} (${sent.id ?? "resend"})` : `Confirmation email FAILED: ${sent.error}`;
    await pushToQuickQuote(service, doc, store).catch((err) => console.error("[webhook] qq_leads", err));
  } catch (e) {
    note = `Confirmation email FAILED: ${(e as Error).message}`;
  }
  if (!emailed) console.error("[webhook]", note);
  const prior = order.internal_note ? `${order.internal_note}\n` : "";
  await service.from("ecom_orders").update({ internal_note: `${prior}${now.slice(0, 16)} ${note}`.slice(-2000) }).eq("id", orderId);

  return { handled: true, orderNumber: order.order_number, emailed };
}
