import manifest from "./product-photos.json";

export interface ProductPhoto { src: string; alt: string; width: number; height: number }

const photos = manifest as Record<string, ProductPhoto>;

/** Product-style shot by key, or null when we have no photo for that item yet. */
export function productPhoto(key?: string | null): ProductPhoto | null {
  return key ? photos[key] ?? null : null;
}
