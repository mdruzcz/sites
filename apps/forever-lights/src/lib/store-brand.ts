// What the shared order module (src/lib/orders) needs to know about this store.
// Client-safe: no server-only imports.
import { site } from '@/lib/site-config';
import type { StoreEmailBrand } from '@/lib/orders/emails';

export const ORDER_PREFIX = 'FL';
export const STORE_SLUG = 'forever-lights';

/** NEXT_PUBLIC_SITE_URL is only set for local review, so Stripe returns to localhost. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || `https://${site.domain}`;

export const EMAIL_BRAND: StoreEmailBrand = {
  name: site.name,
  siteUrl: `${SITE_URL}/kits`,
  accent: '#201e1d',
  phone: site.phone,
  // Set STORE_REPLY_TO_EMAIL once this store's own address forwards to the shop
  // inbox; until then customer replies go to CONTACT_TO_EMAIL.
  replyTo: process.env.STORE_REPLY_TO_EMAIL || undefined,
  assurances: [
    'Secure card payment through Stripe. We never see your card number.',
    'Ships within one to two business days.',
    '5-year parts warranty on every kit.',
    'Phone support while you install.',
  ],
};

export function storeConfig(id: string) {
  return { id, slug: STORE_SLUG, name: site.name, prefix: ORDER_PREFIX, siteUrl: SITE_URL };
}
