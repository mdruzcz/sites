import Link from "next/link";
import Image from "next/image";
import { type CatalogProduct, primaryImage, priceRange } from "@/lib/catalog";
import { formatCad } from "@/lib/utils";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const img = primaryImage(product);
  const range = priceRange(product);
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-[var(--color-accent)] hover:shadow-md"
    >
      <div className="aspect-square overflow-hidden bg-slate-50">
        {img?.public_url ? (
          <Image
            src={img.public_url}
            alt={img.alt_text}
            width={500}
            height={500}
            className="h-full w-full object-contain transition group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">No image</div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold leading-snug">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-slate-500">{product.short_description}</p>
        <p className="mt-2 text-sm font-semibold text-[var(--color-accent)]">
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
