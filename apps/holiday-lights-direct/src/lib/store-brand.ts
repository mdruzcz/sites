// What the shared order module (src/lib/orders) needs to know about this store.
// Client-safe: no server-only imports.
import { SITE_URL, STORE_SLUG } from "@/lib/utils";
import type { StoreEmailBrand } from "@/lib/orders/emails";
import { taxFor, type OrderTotals, type ShippingQuote } from "@/lib/orders/policy";

export const STORE_NAME = "Holiday Lights Direct";
export const ORDER_PREFIX = "HLD";

/** Master Decker Inc.'s order line, printed on invoices and order emails. */
export const BILLER_PHONE = "(519) 266-6796";

export const EMAIL_BRAND: StoreEmailBrand = {
  name: STORE_NAME,
  siteUrl: SITE_URL,
  // --color-gold-text in globals.css: the brass gold that passes AA under white text.
  accent: "#86601a",
  phone: BILLER_PHONE,
  // Set STORE_REPLY_TO_EMAIL once this store's own address forwards to the shop
  // inbox; until then customer replies go to CONTACT_TO_EMAIL.
  replyTo: process.env.STORE_REPLY_TO_EMAIL || undefined,
  // Each line restates the shipping-returns or warranty page. Change them together.
  assurances: [
    "Secure card payment through Stripe. We never see your card number.",
    "Free shipping anywhere in Canada on orders over $500.",
    "Most orders leave our London, Ontario warehouse the same or next business day. October to December can add a day.",
    "Full refund on returns in their original packaging with nothing missing. Return shipping is at your cost.",
    "Five-year warranty against manufacturing defects on every LED system we sell."
  ]
};

export function storeConfig(id: string) {
  return { id, slug: STORE_SLUG, name: STORE_NAME, prefix: ORDER_PREFIX, siteUrl: SITE_URL };
}

/**
 * This store's own shipping rule for card checkout: an order that reaches the
 * free-shipping threshold ships free anywhere in Canada. (The shared module's
 * default, free within 200 km and a flat rate elsewhere, is not used here.)
 * Smaller orders never reach card checkout; their shipping is quoted by email.
 */
export function freeOrderShipping(postal: string): ShippingQuote {
  return { postal, fsa: postal.slice(0, 3), km: null, free: true, amountCad: 0, code: "FREE_ORDER", label: "Free shipping" };
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Totals as the card checkout page shows them: free shipping, GST/HST by
 * province. Stripe computes the final tax per line, so the charged figure can
 * differ from this by a cent; the webhook stores Stripe's.
 */
export function estimateFreeOrderTotals(subtotal: number, province: string, postal: string | null): OrderTotals {
  const tax = taxFor(province);
  const taxCad = tax ? round2((subtotal * tax.rate) / 100) : 0;
  return {
    subtotal: round2(subtotal),
    shipping: postal ? freeOrderShipping(postal) : null,
    tax,
    taxCad,
    total: round2(subtotal + taxCad)
  };
}
