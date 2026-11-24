import Link from "next/link";
import Image from "next/image";

export interface ProductTileData {
  slug: string;
  name: string;
  description?: string | null;
  image: string;
  alt: string;
  price: string;
  /** Lifestyle photo rather than a cut-out on white: fill the frame. */
  cover?: boolean;
  /** Short label pinned to the image, e.g. "100 ft". */
  badge?: string;
}

/**
 * Presentational product card with no server-only imports, so it can be used
 * from both server pages (via ProductCard) and the client-side product rail.
 */
export function ProductTile({ product, className = "" }: { product: ProductTileData; className?: string }) {
  return (
    <Link href={`/product/${product.slug}`} className={`tile group flex h-full flex-col ${className}`}>
      <div className="relative aspect-square overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.alt}
          width={600}
          height={600}
          sizes="(max-width: 768px) 60vw, 280px"
          className={`h-full w-full transition duration-500 group-hover:scale-[1.05] ${
            product.cover ? "object-cover" : "object-contain p-5"
          }`}
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[rgba(12,16,26,0.72)] px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        <span
          aria-hidden
          className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-[10px] bg-[var(--color-gold)] text-[#17130a] shadow-[var(--shadow-sm)] transition group-hover:bg-[var(--color-gold-bright)]"
        >
          <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="flex flex-1 flex-col border-t border-[var(--color-border)] p-4">
        <h3 className="text-sm font-bold leading-snug text-[var(--color-text)]">{product.name}</h3>
        {product.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[var(--color-muted)]">{product.description}</p>
        )}
        <p className="mt-auto pt-3 text-[0.9375rem] font-bold text-[var(--color-text)]">{product.price}</p>
      </div>
    </Link>
  );
}
