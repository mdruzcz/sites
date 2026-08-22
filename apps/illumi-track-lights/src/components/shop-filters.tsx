"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  categories: { slug: string; name: string; count: number }[];
  activeCategory?: string;
  activePrice?: string;
  activeSort?: string;
}

const PRICE_BUCKETS = [
  { label: "Under $25", value: "0-25" },
  { label: "$25 – $100", value: "25-100" },
  { label: "$100 – $500", value: "100-500" },
  { label: "$500 +", value: "500-99999" }
];

/**
 * Catalog facets. The free-text search box was removed by request — browsing is
 * driven by category and price only.
 */
export function ShopFilters({ categories, activeCategory, activePrice, activeSort }: Props) {
  // On phones the facet stack pushed every product below the fold, so it
  // collapses by default and is always open from `lg` up.
  const [open, setOpen] = useState(false);
  const activeCount = [activeCategory, activePrice, activeSort].filter(Boolean).length;
  const router = useRouter();
  const params = useSearchParams();

  function update(patch: Record<string, string | undefined>) {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === undefined || v === "" || v === "all") next.delete(k);
      else next.set(k, v);
    }
    const qs = next.toString();
    router.push(qs ? `/shop?${qs}` : "/shop");
  }

  return (
    <aside>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mb-6 flex min-h-11 w-full items-center justify-between rounded-full border border-[var(--color-border-strong)] bg-white px-5 text-sm font-semibold lg:hidden"
      >
        <span>
          Filter &amp; sort
          {activeCount > 0 && (
            <span className="ml-2 rounded-full bg-[var(--color-amber-soft)] px-2 py-0.5 text-xs text-[var(--color-amber-text)]">
              {activeCount}
            </span>
          )}
        </span>
        <span aria-hidden className={`transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      <div className={`space-y-8 ${open ? "block" : "hidden"} lg:block`}>
      <div>
        <p className="eyebrow text-[var(--color-muted)]">Sort by</p>
        <select
          value={activeSort ?? "default"}
          onChange={(e) => update({ sort: e.target.value === "default" ? undefined : e.target.value })}
          className="mt-3 min-h-11 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm"
        >
          <option value="default">Featured</option>
          <option value="name">Name (A–Z)</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>

      <div>
        <p className="eyebrow text-[var(--color-muted)]">Category</p>
        <ul className="mt-3 space-y-1 text-sm">
          <li>
            <Filter
              label="All categories"
              count={categories.reduce((s, c) => s + c.count, 0)}
              active={!activeCategory}
              onClick={() => update({ category: undefined })}
            />
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Filter
                label={c.name}
                count={c.count}
                active={activeCategory === c.slug}
                onClick={() => update({ category: c.slug })}
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="eyebrow text-[var(--color-muted)]">Price (CAD)</p>
        <ul className="mt-3 space-y-1 text-sm">
          <li>
            <Filter label="Any price" active={!activePrice} onClick={() => update({ price: undefined })} />
          </li>
          {PRICE_BUCKETS.map((b) => (
            <li key={b.value}>
              <Filter
                label={b.label}
                active={activePrice === b.value}
                onClick={() => update({ price: b.value })}
              />
            </li>
          ))}
        </ul>
      </div>

      {(activeCategory || activePrice || activeSort) && (
        <Link
          href="/shop"
          className="flex min-h-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white px-4 text-sm font-semibold text-[var(--color-amber-text)] transition hover:bg-[var(--color-amber-soft)]"
        >
          Clear all filters
        </Link>
      )}

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-amber-soft)] p-5 text-sm text-[var(--color-text-soft)]">
        <p className="font-semibold text-[var(--color-text)]">First order?</p>
        <p className="mt-1.5 leading-relaxed">
          Use code <span className="font-bold text-[var(--color-amber-text)]">ILLUMI10</span> at checkout for
          10% off.
        </p>
      </div>
      </div>
    </aside>
  );
}

function Filter({
  label,
  count,
  active,
  onClick
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition ${
        active
          ? "bg-[var(--color-amber-soft)] font-semibold text-[var(--color-amber-text)]"
          : "hover:bg-[var(--color-bg-warm)]"
      }`}
    >
      <span>{label}</span>
      {count !== undefined && <span className="text-xs text-[var(--color-muted)]">{count}</span>}
    </button>
  );
}
