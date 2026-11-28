// Opens the Stripe Checkout Session for an order that is already saved in
// ecom_orders. Used twice: when the customer first checks out, and when they come
// back through the link in the abandoned-checkout email (recovery.ts).
//
// SAME FILE in every store that uses src/lib/orders — keep the copies identical.

import type Stripe from "stripe";
import { provinceName, type TaxRule } from "./policy";

export interface SessionStore {
  slug: string;
  name: string;
  siteUrl: string;
}

export interface SessionLine {
  productName: string;
  variantName: string;
  sku: string;
  quantity: number;
  unitPriceCad: number;
}

export interface SessionShipTo {
  recipient: string;
  phone: string | null;
  line1: string;
  line2: string | null;
  city: string;
  province: string;
  postal: string;
}

/** How long a first checkout page stays open. When it lapses Stripe sends
 *  checkout.session.expired and the webhook emails the customer a link to pick
 *  the order back up, so this is also the delay before that reminder goes out.
 *  Stripe allows 30 minutes to 24 hours. */
export const CHECKOUT_HOLD_MINUTES = 120;
/** A checkout reopened from the reminder email gets most of a day. */
export const RESUMED_HOLD_MINUTES = 23 * 60;

const cents = (n: number) => Math.round(n * 100);

// One reusable Stripe tax rate per province/rate, found by metadata key.
const taxRateCache = new Map<string, string>();

export async function taxRateId(stripe: Stripe, tax: TaxRule): Promise<string> {
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

export async function openStripeSession(o: {
  stripe: Stripe;
  store: SessionStore;
  orderId: string;
  orderNumber: string;
  email: string;
  lines: SessionLine[];
  shipTo: SessionShipTo;
  shipping: { amountCad: number; label: string; free: boolean };
  tax: TaxRule;
  /** Path the Stripe "back" link returns to, e.g. "/cart". */
  cancelPath: string;
  /** Extra session metadata (e.g. cart_id). Must not include order_id. */
  metadata?: Record<string, string>;
  holdMinutes: number;
  /** Discount already recorded on the order (discount_cad). Applied as a one-time coupon. */
  discountCad?: number;
}): Promise<Stripe.Checkout.Session> {
  const { stripe, store, lines, shipping, shipTo } = o;
  // Prices are re-sent from our records, never the browser.
  const rate = await taxRateId(stripe, o.tax);
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = lines.map((l) => ({
    quantity: l.quantity,
    tax_rates: [rate],
    price_data: {
      currency: "cad",
      unit_amount: cents(l.unitPriceCad),
      product_data: {
        name: !l.variantName || /^default$/i.test(l.variantName) ? l.productName : `${l.productName} (${l.variantName})`,
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

  // An order that carries a discount is charged net of it: Stripe spreads a
  // one-time coupon across the lines before tax, which matches discount_cad.
  let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
  if (o.discountCad && o.discountCad > 0) {
    const coupon = await stripe.coupons.create({
      amount_off: cents(o.discountCad),
      currency: "cad",
      duration: "once",
      max_redemptions: 1,
      name: `Discount on ${o.orderNumber}`.slice(0, 40)
    });
    discounts = [{ coupon: coupon.id }];
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ...(discounts ? { discounts } : {}),
    payment_method_types: ["card"],
    customer_email: o.email,
    client_reference_id: o.orderId,
    line_items: lineItems,
    expires_at: Math.floor(Date.now() / 1000) + Math.min(Math.max(o.holdMinutes, 31), 24 * 60 - 5) * 60,
    metadata: { ...(o.metadata ?? {}), store: store.slug, order_number: o.orderNumber },
    payment_intent_data: {
      description: `${o.orderNumber} - ${store.name}`,
      metadata: { store: store.slug, order_number: o.orderNumber, ecom_order: o.orderId },
      shipping: {
        name: shipTo.recipient,
        phone: shipTo.phone ?? undefined,
        address: {
          line1: shipTo.line1,
          line2: shipTo.line2 || undefined,
          city: shipTo.city,
          state: shipTo.province,
          postal_code: shipTo.postal,
          country: "CA"
        }
      }
    },
    custom_text: {
      submit: {
        message: `${shipping.free ? "Free shipping to " : "Ships to "}${shipTo.postal}. ${store.name} orders are invoiced by Master Decker Inc.; your card statement shows MASTER DECKER.`
      }
    },
    success_url: `${store.siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${store.siteUrl}${o.cancelPath}`
  });
  if (!session.url) throw new Error("Stripe returned no checkout URL");
  return session;
}
