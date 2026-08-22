import Link from "next/link";
import Image from "next/image";
import { type CatalogProduct, priceRange } from "@/lib/catalog";
import { productPhoto, PRODUCT_PLACEHOLDER } from "@/lib/product-photos";
import { formatCad } from "@/lib/utils";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const range = priceRange(product);
  // Locally recovered photography, keyed by slug. The catalog rows still hold
  // dead wp-content URLs, so we deliberately do not read public_url here.
  const photo = productPhoto(product.slug);

  return (
    <Link href={`/product/${product.slug}`} className="card group flex flex-col overflow-hidden">
      <div className="aspect-square overflow-hidden bg-[var(--color-bg-warm)]">
        <Image
          src={photo?.src ?? PRODUCT_PLACEHOLDER}
          alt={photo?.alt ?? product.name}
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
        <p className="mt-4 text-[0.9375rem] font-bold text-[var(--color-amber-text)]">
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
