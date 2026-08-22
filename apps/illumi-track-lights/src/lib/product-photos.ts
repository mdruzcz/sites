import manifest from "./product-photos.json";

export interface ProductPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const photos = manifest as Record<string, ProductPhoto>;

/**
 * Locally hosted product photography, keyed by product slug.
 *
 * The catalog rows in Supabase still point at `illumitracklights.ca/wp-content/...`,
 * which died when the domain moved to Vercel — every product image on the site was
 * a broken box. These files were recovered from the supplier (ShowHome Lighting,
 * whose catalog this store resells) and are served locally, so nothing depends on
 * the old WordPress host any more.
 *
 * Returns null when a product has no recovered photo; callers fall back to the
 * branded placeholder.
 */
export function productPhoto(slug: string): ProductPhoto | null {
  return photos[slug] ?? null;
}

export const PRODUCT_PLACEHOLDER = "/images/products/placeholder.webp";

/** Photo src for a product, always safe to render. */
export function productPhotoSrc(slug: string): string {
  return photos[slug]?.src ?? PRODUCT_PLACEHOLDER;
}

export const RECOVERED_COUNT = Object.keys(photos).length;
