/**
 * A trimmed-down kit shape, safe to ship to client components for cart UI.
 * Excludes per-cabinet item data (clients don't need cost/retail per item).
 */
export type KitSnapshot = {
  slug: string;
  name: string;
  tagline: string | null;
  shape: string | null;
  pieces: number;
  price_cad: number;
  layout_fits: string | null;
};

import type { Kit } from "./kits";

export function toSnapshot(k: Kit): KitSnapshot {
  return {
    slug: k.slug,
    name: k.name,
    tagline: k.tagline,
    shape: k.shape,
    pieces: k.pieces,
    price_cad: k.price_cad,
    layout_fits: k.layout_fits,
  };
}
