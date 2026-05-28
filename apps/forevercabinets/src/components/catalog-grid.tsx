"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CabinetCard } from "./cabinet-card";
import type { Cabinet, CabinetType } from "@/lib/catalog";

type Props = {
  cabinets: Cabinet[];
  lockedType?: CabinetType;
};

export function CatalogGrid({ cabinets, lockedType }: Props) {
  const params = useSearchParams();
  const type = lockedType ?? (params.get("type") as CabinetType | null);
  const feature = params.get("feature");
  const q = params.get("q")?.toLowerCase().trim() ?? "";
  const minw = Number(params.get("minw") ?? "");
  const maxw = Number(params.get("maxw") ?? "");
  const sort = params.get("sort") ?? "width-asc";

  const filtered = useMemo(() => {
    let list = cabinets.slice();
    if (type) list = list.filter((c) => c.type === type);
    if (feature) list = list.filter((c) => c.features.includes(feature));
    if (q) {
      list = list.filter(
        (c) =>
          c.sku.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          (c.description?.toLowerCase().includes(q) ?? false),
      );
    }
    if (!isNaN(minw) && minw > 0) {
      list = list.filter((c) => (c.width_in ?? 0) >= minw);
    }
    if (!isNaN(maxw) && maxw > 0) {
      list = list.filter((c) => (c.width_in ?? 999) <= maxw);
    }
    switch (sort) {
      case "width-desc":
        list.sort((a, b) => (b.width_in ?? 0) - (a.width_in ?? 0));
        break;
      case "price-asc":
        list.sort((a, b) => a.price_cad - b.price_cad);
        break;
      case "price-desc":
        list.sort((a, b) => b.price_cad - a.price_cad);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort((a, b) => (a.width_in ?? 999) - (b.width_in ?? 999));
    }
    return list;
  }, [cabinets, type, feature, q, minw, maxw, sort]);

  if (filtered.length === 0) {
    return (
      <div className="border border-dashed border-[var(--color-line)] bg-[var(--color-sandstone-soft)] p-12 text-center">
        <p className="text-lg font-medium">No cabinets match those filters.</p>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          Try widening the width range or clearing filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-[var(--color-ink-soft)]">
        {filtered.length} {filtered.length === 1 ? "cabinet" : "cabinets"}
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <CabinetCard key={c.sku} cabinet={c} />
        ))}
      </div>
    </>
  );
}
