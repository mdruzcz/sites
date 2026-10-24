"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { PRICE_BUCKETS } from "@/lib/utils";


interface Props {
  categories: { slug: string; name: string; count: number }[];
  /** Products left after search and price, before the category is applied. */
  total: number;
  activeCategory?: string;
  activePrice?: string;
  activeSort?: string;
  activeQ?: string;
}

export function ShopFilters({ categories, total, activeCategory, activePrice, activeSort, activeQ }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(activeQ ?? "");
  const [open, setOpen] = useState(false);

  // Keep the box in step with the URL (chips, Clear all, back button).
  useEffect(() => setQ(activeQ ?? ""), [activeQ]);

  function update(patch: Record<string, string | undefined>) {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === undefined || v === "" || v === "all") next.delete(k);
      else next.set(k, v);
    }
    router.push(`/shop?${next.toString()}`);
    setOpen(false);
  }

  const hasFilters = !!(activeCategory || activePrice || activeSort || activeQ);

  return (
    <aside>
      <button type="button" onClick={() => setOpen((o) => !o)} className="btn-secondary mb-4 w-full lg:hidden" aria-expanded={open}>
        <Icon.menu size={16} /> {open ? "Hide filters" : "Filter & sort"}
        {hasFilters && <span className="ml-1 rounded-full bg-[var(--color-accent)] px-2 text-xs text-white">on</span>}
      </button>

      <div className={`space-y-7 ${open ? "block" : "hidden"} lg:block`}>
        <div>
          <label className="label" htmlFor="filter-q">Search the catalog</label>
          <div className="relative">
            <input
              id="filter-q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") update({ q: q.trim() });
              }}
              placeholder="e.g. C9 warm white, reindeer"
              className="input pr-10"
            />
            <button type="button" onClick={() => update({ q: q.trim() })} aria-label="Search" className="absolute right-1 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-[var(--color-muted)] hover:bg-[var(--color-bg-warm)]">
              <Icon.search size={16} />
            </button>
          </div>
        </div>

        <div>
          <label className="label" htmlFor="filter-sort">Sort by</label>
          <select id="filter-sort" value={activeSort ?? "default"} onChange={(e) => update({ sort: e.target.value === "default" ? undefined : e.target.value })} className="input">
            <option value="default">Featured</option>
            <option value="newest">Newest</option>
            <option value="name">Name (A–Z)</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        <div>
          <p className="label">{activeQ ? "Category (in your results)" : "Category"}</p>
          <ul className="space-y-0.5 text-sm">
            <li>
              <Filter label="All categories" count={total} active={!activeCategory} onClick={() => update({ category: undefined })} />
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Filter label={c.name} count={c.count} active={activeCategory === c.slug} disabled={c.count === 0 && activeCategory !== c.slug} onClick={() => update({ category: c.slug })} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label">Price (CAD)</p>
          <ul className="space-y-0.5 text-sm">
            <li>
              <Filter label="Any price" active={!activePrice} onClick={() => update({ price: undefined })} />
            </li>
            {PRICE_BUCKETS.map((b) => (
              <li key={b.value}>
                <Filter label={b.label} active={activePrice === b.value} onClick={() => update({ price: b.value })} />
              </li>
            ))}
          </ul>
        </div>

        {hasFilters && (
          <Link href="/shop" className="btn-secondary w-full">
            Clear all filters
          </Link>
        )}

        <div className="rounded-2xl bg-[var(--color-night)] p-5 text-white">
          <p className="eyebrow text-[var(--color-gold-bright)]">Buying in volume?</p>
          <p className="mt-2 text-sm text-white/80">Case, installer and public-sector pricing is applied on your quote. Send the whole list at once.</p>
          <Link href="/request-a-quote" className="btn-gold mt-4 w-full">Request a quote</Link>
        </div>
      </div>
    </aside>
  );
}

function Filter({ label, count, active, disabled, onClick }: { label: string; count?: number; active: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex min-h-[38px] w-full items-center justify-between rounded-lg px-2.5 text-left transition ${
        active
          ? "bg-[var(--color-brand-soft)] font-semibold text-[var(--color-brand)]"
          : disabled
            ? "cursor-default text-[var(--color-muted)] opacity-50"
            : "hover:bg-[var(--color-bg-warm)]"
      }`}
    >
      <span>{label}</span>
      {count !== undefined && <span className="text-xs text-[var(--color-muted)]">{count}</span>}
    </button>
  );
}
