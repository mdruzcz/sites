import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopFilters } from "@/components/shop-filters";
import { CatalogGrid } from "@/components/catalog-grid";
import { getAllCabinets } from "@/lib/catalog";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Cabinets",
  description: `Browse every White Shaker cabinet in our catalog — base, drawer, wall and accessories. Priced in CAD, shipped Canada-wide in ${SITE.leadTime}.`,
  alternates: { canonical: "/cabinets" },
};

export default function CabinetsPage() {
  const cabinets = getAllCabinets();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
          Catalog
        </p>
        <h1 className="mt-2 font-display text-4xl text-[var(--color-navy)] sm:text-5xl">
          All Cabinets
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)]">
          {cabinets.length} pieces of premium White Shaker cabinetry. Use the filters to narrow by type, width, or feature.
        </p>
      </header>
      <Suspense fallback={null}>
        <div className="flex flex-col gap-8 lg:flex-row">
          <ShopFilters cabinets={cabinets} />
          <div className="flex-1">
            <CatalogGrid cabinets={cabinets} />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
