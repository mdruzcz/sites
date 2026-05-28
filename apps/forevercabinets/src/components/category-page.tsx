import { Suspense } from "react";
import Link from "next/link";
import { ShopFilters } from "./shop-filters";
import { CatalogGrid } from "./catalog-grid";
import { getCabinetsByType, TYPE_LABEL, TYPE_BLURB, type CabinetType } from "@/lib/catalog";

type Props = {
  type: CabinetType;
};

export function CategoryPage({ type }: Props) {
  const cabinets = getCabinetsByType(type);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">
        <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/cabinets" className="hover:text-[var(--color-navy)]">Cabinets</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-navy)]">{TYPE_LABEL[type]}</span>
      </nav>

      <header className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
          Catalog
        </p>
        <h1 className="mt-2 font-display text-4xl text-[var(--color-navy)] sm:text-5xl">
          {TYPE_LABEL[type]}
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)]">
          {TYPE_BLURB[type]} {cabinets.length} {cabinets.length === 1 ? "option" : "options"} in White Shaker.
        </p>
      </header>

      <Suspense fallback={null}>
        <div className="flex flex-col gap-8 lg:flex-row">
          <ShopFilters cabinets={cabinets} lockedType={type} />
          <div className="flex-1">
            <CatalogGrid cabinets={cabinets} lockedType={type} />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
