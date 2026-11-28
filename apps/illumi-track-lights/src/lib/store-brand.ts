// What the order module (src/lib/orders) needs to know about this store.
// Client-safe: no server-only imports.
import { BRAND, SITE_URL, STORE_SLUG } from "@/lib/utils";
import type { StoreEmailBrand } from "@/lib/orders/emails";

export const ORDER_PREFIX = "ITL";

/** Master Decker Inc.'s order line, printed on invoices and order emails. */
export const BILLER_PHONE = "(519) 266-6796";

export const EMAIL_BRAND: StoreEmailBrand = {
  name: BRAND.name,
  siteUrl: SITE_URL,
  accent: "#283270",
  phone: BILLER_PHONE,
  // Set STORE_REPLY_TO_EMAIL once this store's own address forwards to the shop
  // inbox; until then customer replies go to CONTACT_TO_EMAIL.
  replyTo: process.env.STORE_REPLY_TO_EMAIL || undefined,
  assurances: [
    "Secure card payment through Stripe. We never see your card number.",
    "Free shipping on every order in Canada, or free pickup in Woodstock.",
    `${BRAND.warrantyYears}-year warranty on LED products.`
  ]
};

export function storeConfig(id: string) {
  return { id, slug: STORE_SLUG, name: BRAND.name, prefix: ORDER_PREFIX, siteUrl: SITE_URL };
}
