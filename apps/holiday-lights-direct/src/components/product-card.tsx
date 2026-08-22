import Link from "next/link";
import Image from "next/image";
import { type CatalogProduct, primaryImage, priceRange } from "@/lib/catalog";
import { formatCad } from "@/lib/utils";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const img = primaryImage(product);
  const range = priceRange(product);

  return (
    <Link href={`/product/${product.slug}`} className="card group flex flex-col overflow-hidden">
      {/* Fall back to the branded placeholder so a product without photography
          still reads as a finished card rather than an empty box. */}
      <div className="aspect-square overflow-hidden bg-[var(--color-bg-warm)]">
        <Image
          src={img?.public_url || "/images/products/placeholder.webp"}
          alt={img?.alt_text || product.name}
          width={600}
          height={600}
          sizes="(max-width: 768px) 50vw, 320px"
          className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-semibold leading-snug">{product.name}</h3>
        {product.short_description && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--color-muted)]">
            {product.short_description}
          </p>
        )}
        <p className="mt-4 text-[0.9375rem] font-bold text-[var(--color-gold-text)]">
          {range
            ? range.min === range.max
              ? formatCad(range.min)
              : `${formatCad(range.min)} – ${formatCad(range.max)}`
            : "—"}
        </p>
      </div>
    </Link>
  );
}
