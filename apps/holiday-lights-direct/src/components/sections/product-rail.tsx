"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ProductTile, type ProductTileData } from "@/components/product-tile";

export interface RailGroup {
  key: string;
  label: string;
  href: string;
  products: ProductTileData[];
}

/**
 * Tabbed, horizontally scrolling product rail: chips pick the group, the row
 * scroll-snaps, and the round buttons page it on desktop.
 */
export function ProductRail({ groups }: { groups: RailGroup[] }) {
  const [active, setActive] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  const group = groups[active];

  function page(dir: 1 | -1) {
    const el = rail.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  function pick(i: number) {
    setActive(i);
    rail.current?.scrollTo({ left: 0 });
  }

  if (!group) return null;

  return (
    <section className="bg-[var(--color-bg-warm)]">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div>
            <p className="eyebrow-plain">Shop the catalog</p>
            <h2 className="font-display h2-fluid mt-3">
              <Link href={group.href} className="group inline-flex items-baseline gap-3">
                {group.label}
                <svg className="arrow-ne" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </h2>
          </div>

          <div className="hidden gap-2 md:flex">
            <button type="button" className="round-btn" aria-label="Scroll products back" onClick={() => page(-1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="round-btn" aria-label="Scroll products forward" onClick={() => page(1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div role="tablist" aria-label="Product groups" className="-mx-5 mt-7 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:px-0">
          {groups.map((g, i) => (
            <button
              key={g.key}
              type="button"
              role="tab"
              aria-selected={i === active}
              className="chip"
              onClick={() => pick(i)}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div ref={rail} role="tabpanel" aria-label={group.label} className="rail -mx-5 mt-7 px-5 md:mx-0 md:px-0">
          {group.products.map((p) => (
            <div key={p.slug} className="w-[62vw] max-w-[260px] sm:w-[240px]">
              <ProductTile product={p} />
            </div>
          ))}
          <Link
            href={group.href}
            className="tile group flex w-[62vw] max-w-[260px] flex-col items-start justify-end bg-[var(--color-ink)] p-6 text-white sm:w-[240px]"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold-bright)]">See them all</span>
            <span className="font-display mt-2 text-2xl">All {group.label.toLowerCase()}</span>
            <svg className="arrow-ne mt-4" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
