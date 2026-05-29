"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Cabinet, CabinetType } from "@/lib/catalog";
import { TYPE_SHORT } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type Props = {
  cabinets: Cabinet[];
  lockedType?: CabinetType;
};

const FEATURE_LABELS: Record<string, string> = {
  sink: "Sink base",
  "lazy-susan": "Lazy Susan",
  corner: "Corner",
  "waste-basket": "Waste basket",
  "wine-rack": "Wine rack",
  "glass-door": "Glass door",
  microwave: "Microwave",
  tall: "Tall pantry",
  drawer: "Drawer",
};

export function ShopFilters({ cabinets, lockedType }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const types = useMemo(() => {
    const set = new Set<CabinetType>();
    cabinets.forEach((c) => set.add(c.type));
    return Array.from(set);
  }, [cabinets]);

  const features = useMemo(() => {
    const set = new Set<string>();
    cabinets.forEach((c) => c.features.forEach((f) => set.add(f)));
    return Array.from(set).filter((f) => FEATURE_LABELS[f]);
  }, [cabinets]);

  const widthBounds = useMemo(() => {
    const ws = cabinets.map((c) => c.width_in).filter((w): w is number => w != null);
    return { min: Math.floor(Math.min(...ws)), max: Math.ceil(Math.max(...ws)) };
  }, [cabinets]);

  const activeType = (params.get("type") as CabinetType | null) ?? null;
  const activeFeature = params.get("feature");
  const activeMin = params.get("minw");
  const activeMax = params.get("maxw");
  const activeSort = params.get("sort") ?? "width-asc";
  const activeSearch = params.get("q") ?? "";

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params.toString());
      if (value == null || value === "") next.delete(key);
      else next.set(key, value);
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, router, pathname],
  );

  const clearAll = () => router.replace(pathname, { scroll: false });

  const [searchDraft, setSearchDraft] = useState(activeSearch);
  useEffect(() => setSearchDraft(activeSearch), [activeSearch]);
  useEffect(() => {
    const t = setTimeout(() => {
      if (searchDraft !== activeSearch) updateParam("q", searchDraft || null);
    }, 250);
    return () => clearTimeout(t);
  }, [searchDraft, activeSearch, updateParam]);

  const FilterBody = (
    <div className="space-y-7 text-sm">
      <div>
        <label className="block text-[11px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
          Search
        </label>
        <input
          type="search"
          value={searchDraft}
          onChange={(e) => setSearchDraft(e.target.value)}
          placeholder="SKU or name"
          className="mt-2 h-10 w-full rounded-sm border border-[var(--color-line)] bg-white px-3 text-sm focus:border-[var(--color-navy)] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-[11px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
          Sort
        </label>
        <select
          value={activeSort}
          onChange={(e) => updateParam("sort", e.target.value === "width-asc" ? null : e.target.value)}
          className="mt-2 h-10 w-full rounded-sm border border-[var(--color-line)] bg-white px-3 text-sm focus:border-[var(--color-navy)] focus:outline-none"
        >
          <option value="width-asc">Width: small → large</option>
          <option value="width-desc">Width: large → small</option>
          <option value="price-asc">Price: low → high</option>
          <option value="price-desc">Price: high → low</option>
          <option value="name">Name (A–Z)</option>
        </select>
      </div>

      {!lockedType && types.length > 1 && (
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
            Type
          </p>
          <div className="mt-2 space-y-1.5">
            <button
              type="button"
              onClick={() => updateParam("type", null)}
              className={cn(
                "block w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-[var(--color-sandstone-soft)]",
                !activeType && "bg-[var(--color-sandstone-soft)] font-medium",
              )}
            >
              All cabinets
            </button>
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => updateParam("type", t === activeType ? null : t)}
                className={cn(
                  "block w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-[var(--color-sandstone-soft)]",
                  activeType === t && "bg-[var(--color-sandstone-soft)] font-medium",
                )}
              >
                {TYPE_SHORT[t]}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
          Width range
        </p>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            min={widthBounds.min}
            max={widthBounds.max}
            value={activeMin ?? ""}
            placeholder={`${widthBounds.min}″`}
            onChange={(e) => updateParam("minw", e.target.value || null)}
            className="h-10 w-full rounded-sm border border-[var(--color-line)] bg-white px-2 text-sm"
            aria-label="Minimum width"
          />
          <span className="text-[var(--color-ink-soft)]">–</span>
          <input
            type="number"
            min={widthBounds.min}
            max={widthBounds.max}
            value={activeMax ?? ""}
            placeholder={`${widthBounds.max}″`}
            onChange={(e) => updateParam("maxw", e.target.value || null)}
            className="h-10 w-full rounded-sm border border-[var(--color-line)] bg-white px-2 text-sm"
            aria-label="Maximum width"
          />
        </div>
        <p className="mt-1.5 text-xs text-[var(--color-ink-soft)]">
          Available {widthBounds.min}″ – {widthBounds.max}″
        </p>
      </div>

      {features.length > 0 && (
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
            Features
          </p>
          <div className="mt-2 space-y-1.5">
            <button
              type="button"
              onClick={() => updateParam("feature", null)}
              className={cn(
                "block w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-[var(--color-sandstone-soft)]",
                !activeFeature && "bg-[var(--color-sandstone-soft)] font-medium",
              )}
            >
              Any
            </button>
            {features.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => updateParam("feature", f === activeFeature ? null : f)}
                className={cn(
                  "block w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-[var(--color-sandstone-soft)]",
                  activeFeature === f && "bg-[var(--color-sandstone-soft)] font-medium",
                )}
              >
                {FEATURE_LABELS[f] ?? f}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={clearAll}
        className="text-xs uppercase tracking-widest text-[var(--color-brass-dark)] hover:text-[var(--color-navy)] underline underline-offset-4"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">{FilterBody}</div>
      </aside>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex h-11 items-center gap-2 rounded-sm border border-[var(--color-navy)] px-4 text-sm font-medium uppercase tracking-wider"
          aria-label="Open filters"
        >
          Filters
        </button>
        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setMobileOpen(false)}
            role="presentation"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              className="fixed inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-lg bg-[var(--color-cream)] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl leading-none"
                  aria-label="Close filters"
                >
                  ×
                </button>
              </div>
              {FilterBody}
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-6 w-full"
              >
                Show results
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
