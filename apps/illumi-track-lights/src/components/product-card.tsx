import Link from "next/link";
import Image from "next/image";
import { type CatalogProduct, primaryImage, priceRange } from "@/lib/catalog";
import { formatCad } from "@/lib/utils";

/**
 * Catalogue tile: square photo, the full product name, one plain price, a
 * hairline and a text link. No badges, no stars.
 */
export function ProductCard({ product, priority = false }: { product: CatalogProduct; priority?: boolean }) {
  const img = primaryImage(product);
  const range = priceRange(product);
  const isKit = product.slug.startsWith("led-housing-package");
  return (
    <Link href={`/product/${product.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden border border-[var(--color-border)] bg-white transition group-hover:border-[var(--color-accent)]">
        {img?.public_url ? (
          <Image
            src={img.public_url}
            alt={img.alt_text || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            priority={priority}
            className={isKit ? "object-cover" : "object-contain p-4"}
          />
        ) : (
          <div className="grid h-full place-items-center bg-[var(--color-bg-warm)] p-6 text-center text-xs text-[var(--color-muted)]">
            Photo coming soon
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col pt-3">
        <h3 className="text-[0.95rem] leading-snug text-[var(--color-text)] group-hover:text-[var(--color-accent)] group-hover:underline">{product.name}</h3>
        <p className="price mt-1.5 text-[0.95rem]">
          {range ? (range.min === range.max ? formatCad(range.min, 2) : `${formatCad(range.min, 2)} to ${formatCad(range.max, 2)}`) : "—"}
        </p>
        <p className="mt-auto border-t border-[var(--color-border)] pt-2 text-[0.8rem] font-semibold text-[var(--color-accent)]">View details</p>
      </div>
    </Link>
  );
}
