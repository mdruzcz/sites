import Link from "next/link";
import Image from "next/image";
import { type CatalogProduct, type StockStatus, primaryImage, secondaryImage, priceRange, compareAtFor, productStock } from "@/lib/catalog";
import { formatCadRound, imageSrc } from "@/lib/utils";

/** Badge logic: stock comes first, then sale beats quote-only beats best seller beats new (last 60 days). */
function badges(product: CatalogProduct, quoteOnly: boolean, savePct: number | null, stock: StockStatus) {
  const out: { label: string; tone: string }[] = [];
  if (stock === "special") out.push({ label: "Special order", tone: "bg-[var(--color-gold)] text-[var(--color-text)]" });
  else if (stock === "out") out.push({ label: "Sold out this season", tone: "bg-[var(--color-muted)] text-white" });
  if (savePct) out.push({ label: `Save ${savePct}%`, tone: "bg-[var(--color-berry)] text-white" });
  else if (quoteOnly) out.push({ label: "Quote only", tone: "bg-[var(--color-night)] text-white" });
  else if (product.featured) out.push({ label: "Best seller", tone: "bg-[var(--color-accent)] text-white" });
  const isNew = product.created_at && Date.now() - new Date(product.created_at).getTime() < 60 * 86400000;
  if (isNew && !quoteOnly) out.push({ label: "New", tone: "bg-[var(--color-gold)] text-[var(--color-text)]" });
  return out.slice(0, 2);
}

export function ProductCard({ product, priority = false }: { product: CatalogProduct; priority?: boolean }) {
  const img = primaryImage(product);
  const alt = secondaryImage(product);
  const range = priceRange(product);
  const quoteOnly = !!range?.quoteOnly;
  const compare = compareAtFor(product);
  const savePct = compare && range && !quoteOnly && compare > range.min ? Math.round((1 - range.min / compare) * 100) : null;
  const b = badges(product, quoteOnly, savePct, productStock(product));
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
        {b.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {b.map((x) => (
              <span key={x.label} className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${x.tone}`}>
                {x.label}
              </span>
            ))}
          </div>
        )}
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
                {savePct ? <span className="text-[var(--color-berry)]">{formatCadRound(range.min)}</span> : formatCadRound(range.min)}
                {savePct && compare && <span className="ml-2 text-xs font-medium text-[var(--color-muted)] line-through">{formatCadRound(compare)}</span>}
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
