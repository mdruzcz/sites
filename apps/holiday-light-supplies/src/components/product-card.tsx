import Link from "next/link";
import Image from "next/image";
import { type CatalogProduct, primaryImage, secondaryImage, priceRange } from "@/lib/catalog";
import { formatCadRound, imageSrc } from "@/lib/utils";

/** Badge logic: quote-only pieces, featured best sellers, and anything added in the last 60 days. */
function badge(product: CatalogProduct, quoteOnly: boolean) {
  if (quoteOnly) return { label: "Quote only", tone: "bg-[var(--color-night)] text-white" };
  if (product.featured) return { label: "Best seller", tone: "bg-[var(--color-accent)] text-white" };
  if (product.created_at && Date.now() - new Date(product.created_at).getTime() < 60 * 86400000) {
    return { label: "New", tone: "bg-[var(--color-gold)] text-[var(--color-text)]" };
  }
  return null;
}

export function ProductCard({ product, priority = false }: { product: CatalogProduct; priority?: boolean }) {
  const img = primaryImage(product);
  const alt = secondaryImage(product);
  const range = priceRange(product);
  const quoteOnly = !!range?.quoteOnly;
  const b = badge(product, quoteOnly);
  const variants = (product.ecom_variants ?? []).filter((v) => v.is_active).length;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--color-bg-warm)]">
        <Image
          src={imageSrc(img?.public_url)}
          alt={img?.alt_text ?? product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
          priority={priority}
          className={`object-contain p-4 transition duration-500 ${alt ? "group-hover:opacity-0" : "group-hover:scale-[1.03]"}`}
        />
        {alt && (
          <Image
            src={imageSrc(alt.public_url)}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
          />
        )}
        {b && <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${b.tone}`}>{b.label}</span>}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[15px] font-semibold leading-snug text-[var(--color-text)] group-hover:text-[var(--color-brand)]">{product.name}</h3>
        {product.short_description && !/quantity$/i.test(product.short_description) && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--color-muted)]">{product.short_description}</p>
        )}
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <p className="text-[15px] font-bold text-[var(--color-text)]">
            {quoteOnly ? (
              <span className="text-[var(--color-brand)]">Request a quote</span>
            ) : range ? (
              <>
                {range.min !== range.max && <span className="text-xs font-medium text-[var(--color-muted)]">from </span>}
                {formatCadRound(range.min)}
              </>
            ) : (
              "—"
            )}
          </p>
          {variants > 1 && !quoteOnly && <span className="text-[11px] text-[var(--color-muted)]">{variants} options</span>}
        </div>
      </div>
    </Link>
  );
}
