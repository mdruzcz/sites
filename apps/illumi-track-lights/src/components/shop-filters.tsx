"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  categories: { slug: string; name: string; count: number }[];
  activeCategory?: string;
  activePrice?: string;
  activeSort?: string;
  activeQ?: string;
}

const PRICE_BUCKETS = [
  { label: "Under $25", value: "0-25" },
  { label: "$25 – $100", value: "25-100" },
  { label: "$100 – $500", value: "100-500" },
  { label: "$500 +", value: "500-99999" }
];

export function ShopFilters({ categories, activeCategory, activePrice, activeSort, activeQ }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(activeQ ?? "");

  function update(patch: Record<string, string | undefined>) {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === undefined || v === "" || v === "all") next.delete(k);
      else next.set(k, v);
    }
    router.push(`/shop?${next.toString()}`);
  }

  return (
    <aside className="space-y-6">
      {/* Search within filters */}
      <div>
        <label className="eyebrow text-slate-500" htmlFor="filter-q">
          Search in catalog
        </label>
        <input
          id="filter-q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onBlur={() => update({ q })}
          onKeyDown={(e) => {
            if (e.key === "Enter") update({ q });
          }}
          placeholder="e.g. C9 bulb"
          className="mt-2 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm shadow-sm"
        />
      </div>

      {/* Sort */}
      <div>
        <p className="eyebrow text-slate-500">Sort by</p>
        <select
          value={activeSort ?? "default"}
          onChange={(e) => update({ sort: e.target.value === "default" ? undefined : e.target.value })}
          className="mt-2 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm shadow-sm"
        >
          <option value="default">Featured</option>
          <option value="name">Name (A–Z)</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <p className="eyebrow text-slate-500">Category</p>
        <ul className="mt-2 space-y-1 text-sm">
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

      {/* Price */}
      <div>
        <p className="eyebrow text-slate-500">Price (CAD)</p>
        <ul className="mt-2 space-y-1 text-sm">
          <li>
            <Filter
              label="Any price"
              active={!activePrice}
              onClick={() => update({ price: undefined })}
            />
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

      {(activeCategory || activePrice || activeSort || activeQ) && (
        <Link
          href="/shop"
          className="block rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-center text-sm text-[var(--color-brand)] hover:bg-[var(--color-brand-soft)]"
        >
          Clear all filters
        </Link>
      )}

      <div className="rounded-lg bg-[var(--color-brand-soft)] p-3 text-xs text-[var(--color-brand-dark)]">
        🎁 First order? Use code <span className="font-bold">ILLUMI10</span> at checkout for 10% off.
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
      className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left transition ${
        active
          ? "bg-[var(--color-brand-soft)] font-semibold text-[var(--color-brand)]"
          : "hover:bg-slate-50"
      }`}
    >
      <span>{label}</span>
      {count !== undefined && <span className="text-xs text-slate-400">{count}</span>}
    </button>
  );
}
