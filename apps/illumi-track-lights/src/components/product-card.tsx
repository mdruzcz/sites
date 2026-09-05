import Link from "next/link";
import Image from "next/image";
import { type CatalogProduct, primaryImage, priceRange } from "@/lib/catalog";
import { formatCad } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: CatalogProduct; priority?: boolean }) {
  const img = primaryImage(product);
  const range = priceRange(product);
  const isKit = product.slug.startsWith("led-housing-package");
  return (
    <Link href={`/product/${product.slug}`} className="card card-lift group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-white">
        {img?.public_url ? (
          <Image
            src={img.public_url}
            alt={img.alt_text || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            priority={priority}
            className={`${isKit ? "object-cover" : "object-contain p-4"} transition duration-500 group-hover:scale-[1.03]`}
          />
        ) : (
          <div className="grid h-full place-items-center bg-[var(--color-bg-warm)] p-6 text-center text-xs text-[var(--color-muted)]">
            Photo coming soon
          </div>
        )}
        {isKit && <span className="absolute left-3 top-3 rounded-full bg-[var(--color-ink)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Complete kit</span>}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[0.95rem] font-semibold leading-snug transition group-hover:text-[var(--color-accent-dark)]">{product.name}</h3>
        {product.short_description && <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[var(--color-muted)]">{product.short_description}</p>}
        <p className="mt-auto pt-3 text-sm font-semibold text-[var(--color-text)]">
          {range ? (range.min === range.max ? formatCad(range.min) : `${formatCad(range.min)} – ${formatCad(range.max)}`) : "—"}
        </p>
      </div>
    </Link>
  );
}
