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
    <aside className="space-y-7 lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] lg:self-start">
      <div>
        <label className="label" htmlFor="filter-q">Search the catalogue</label>
        <input id="filter-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} onBlur={() => update({ q })} onKeyDown={(e) => { if (e.key === "Enter") update({ q }); }} placeholder="e.g. controller" className="input" />
      </div>
      <div>
        <label className="label" htmlFor="filter-sort">Sort by</label>
        <select id="filter-sort" value={activeSort ?? "default"} onChange={(e) => update({ sort: e.target.value === "default" ? undefined : e.target.value })} className="input">
          <option value="default">Featured</option>
          <option value="name">Name (A–Z)</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>
      <div>
        <p className="label">Category</p>
        <ul className="space-y-1 text-sm">
          <li><Filter label="All categories" count={categories.reduce((s, c) => s + c.count, 0)} active={!activeCategory} onClick={() => update({ category: undefined })} /></li>
          {categories.map((c) => (
            <li key={c.slug}><Filter label={c.name} count={c.count} active={activeCategory === c.slug} onClick={() => update({ category: c.slug })} /></li>
          ))}
        </ul>
      </div>
      <div>
        <p className="label">Price (CAD)</p>
        <ul className="space-y-1 text-sm">
          <li><Filter label="Any price" active={!activePrice} onClick={() => update({ price: undefined })} /></li>
          {PRICE_BUCKETS.map((b) => (
            <li key={b.value}><Filter label={b.label} active={activePrice === b.value} onClick={() => update({ price: b.value })} /></li>
          ))}
        </ul>
      </div>
      {(activeCategory || activePrice || activeSort || activeQ) && (
        <Link href="/shop" className="btn-secondary btn-sm w-full">Clear all filters</Link>
      )}
      <div className="rounded-xl bg-[var(--color-accent-soft)] p-4 text-xs leading-relaxed text-[var(--color-text-soft)]">
        Every part here is 12V and works with every kit. Need help choosing? <Link href="/contact-us" className="font-semibold text-[var(--color-accent-dark)] hover:underline">Ask us</Link>.
      </div>
    </aside>
  );
}

function Filter({ label, count, active, onClick }: { label: string; count?: number; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`flex min-h-[40px] w-full items-center justify-between rounded-lg px-2.5 text-left transition ${active ? "bg-[var(--color-ink)] font-semibold text-white" : "hover:bg-[var(--color-bg-warm)]"}`}>
      <span>{label}</span>
      {count !== undefined && <span className={`text-xs ${active ? "text-white/70" : "text-[var(--color-muted)]"}`}>{count}</span>}
    </button>
  );
}
