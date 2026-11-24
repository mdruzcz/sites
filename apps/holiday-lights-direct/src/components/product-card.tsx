import { type CatalogProduct, primaryImage, primaryImageUrl, priceRange } from "@/lib/catalog";
import { formatCad } from "@/lib/utils";
import { ProductTile, type ProductTileData } from "@/components/product-tile";

/** Flatten a catalogue row into the plain props the tile (and client rail) need. */
export function toTileData(product: CatalogProduct): ProductTileData {
  const img = primaryImage(product);
  const range = priceRange(product);
  const image = primaryImageUrl(product);
  const kitFeet = /^led-housing-package-(\d+)/.exec(product.slug)?.[1];
  return {
    slug: product.slug,
    name: product.name,
    description: product.short_description,
    // Falls back to the branded placeholder so a product without photography
    // still reads as a finished card rather than an empty box.
    image,
    // Kits and tracks are photographed installed on a house, not cut out on white.
    cover: /\/permanent-led-|\/permanent-lighting-kit-|\/professional-permanent-/.test(image),
    badge: kitFeet ? `${kitFeet} ft` : undefined,
    alt: img?.alt_text || product.name,
    price: range
      ? range.min === range.max
        ? formatCad(range.min)
        : `${formatCad(range.min)} – ${formatCad(range.max)}`
      : "—"
  };
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  return <ProductTile product={toTileData(product)} />;
}
