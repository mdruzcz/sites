"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUI } from "@/components/ui-context";
import { Icon } from "@/components/icons";
import { searchCatalog } from "@/lib/search";
import type { SearchIndex, SearchIndexItem } from "@/app/api/search-index/route";
import { formatCadRound, imageSrc } from "@/lib/utils";

/** Loaded once per page view, the first time search opens. */
let indexPromise: Promise<SearchIndex> | null = null;
function loadIndex() {
  indexPromise ??= fetch("/api/search-index")
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .catch(() => {
      indexPromise = null;
      return { products: [], categories: [] };
    });
  return indexPromise;
}

const POPULAR = ["C9 warm white", "Socket spool", "Reindeer", "Snowflake pole mount", "Wreath", "Gift box", "Mini lights", "Permanent lighting kit"];

const QUICK_LINKS = [
  { label: "Request a commercial quote", href: "/request-a-quote" },
  { label: "Malls & shopping centres", href: "/commercial/malls-shopping-centres" },
  { label: "BIAs & downtowns", href: "/commercial/bias-downtowns" },
  { label: "Municipalities & parks", href: "/commercial/municipalities-parks" },
  { label: "Installer program", href: "/professional-installer" }
];

export function PredictiveSearch() {
  const { searchOpen, closeSearch } = useUI();
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
      loadIndex().then(setIndex);
    } else setQ("");
  }, [searchOpen]);

  const debounced = useDebounced(q, 80);
  const loading = debounced.trim().length >= 2 && !index;

  const { hits, total, loose, cats } = useMemo(() => {
    const term = debounced.trim();
    if (!index || term.length < 2) return { hits: [] as SearchIndexItem[], total: 0, loose: false, cats: [] as SearchIndex["categories"] };
    const result = searchCatalog(index.products, term, (p) => p);
    const catResult = searchCatalog(index.categories, term, (c) => ({ name: c.name, slug: c.slug }));
    const cats = catResult.loose ? [] : catResult.items.slice(0, 3);
    return { hits: result.items.slice(0, 8), total: result.items.length, loose: result.loose, cats };
  }, [index, debounced]);

  if (!searchOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Search the catalog" className="drawer-overlay !flex !items-start !justify-center px-3 pt-16 md:pt-24" onClick={closeSearch}>
      <div onClick={(e) => e.stopPropagation()} className="pop-in w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-3">
          <Icon.search size={20} className="text-[var(--color-muted)]" />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && q.trim()) {
                window.location.href = `/shop?q=${encodeURIComponent(q.trim())}`;
              }
            }}
            placeholder="Search bulbs, displays, wreaths, pole décor…"
            className="min-h-[44px] flex-1 bg-transparent text-base outline-none"
          />
          <button type="button" onClick={closeSearch} aria-label="Close search" className="rounded-lg border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-muted)] hover:bg-[var(--color-bg-warm)]">
            ESC
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto">
          {!q && (
            <div className="grid gap-6 px-5 py-6 text-sm md:grid-cols-2">
              <div>
                <p className="eyebrow text-[var(--color-muted)]">Popular searches</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {POPULAR.map((s) => (
                    <li key={s}>
                      <button type="button" onClick={() => setQ(s)} className="chip min-h-[36px] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">{s}</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-[var(--color-muted)]">Quick links</p>
                <ul className="mt-3 space-y-2">
                  {QUICK_LINKS.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={closeSearch} className="inline-flex items-center gap-1 font-medium text-[var(--color-text-soft)] hover:text-[var(--color-brand)]">
                        <Icon.arrow size={14} /> {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {q.length > 0 && q.length < 2 && <p className="px-5 py-4 text-sm text-[var(--color-muted)]">Keep typing…</p>}
          {loading && <p className="px-5 py-4 text-sm text-[var(--color-muted)]">Searching…</p>}

          {cats.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-border)] px-5 py-3 text-sm">
              <span className="text-xs text-[var(--color-muted)]">Browse</span>
              {cats.map((c) => (
                <Link key={c.slug} href={`/product-category/${c.slug}`} onClick={closeSearch} className="chip min-h-[34px] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">
                  {c.name} <span className="text-xs text-[var(--color-muted)]">{c.count}</span>
                </Link>
              ))}
            </div>
          )}
          {loose && hits.length > 0 && <p className="px-5 pt-3 text-xs text-[var(--color-muted)]">No product matches every word, so these are the closest.</p>}

          {!loading && index && debounced.trim().length >= 2 && q.trim().length >= 2 && hits.length === 0 && (
            <div className="px-5 py-6 text-sm">
              <p className="font-medium">No matches for &ldquo;{q}&rdquo;</p>
              <p className="mt-1 text-[var(--color-muted)]">Try a broader term, or <Link href="/request-a-quote" onClick={closeSearch} className="font-semibold text-[var(--color-brand)] hover:underline">ask us to source it</Link>.</p>
            </div>
          )}

          {hits.length > 0 && (
            <ul className="divide-y divide-[var(--color-border)]">
              {hits.map((h) => (
                <li key={h.slug}>
                  <Link href={`/product/${h.slug}`} onClick={closeSearch} className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--color-brand-soft)]">
                    <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-[var(--color-bg-warm)]">
                      <Image src={imageSrc(h.image_url)} alt={h.name} width={60} height={60} className="h-full w-full object-contain p-1" />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium leading-tight">{h.name}</p>
                      {h.short_description && !/quantity$/i.test(h.short_description) && <p className="line-clamp-1 text-xs text-[var(--color-muted)]">{h.short_description}</p>}
                    </div>
                    <p className="text-sm font-semibold text-[var(--color-brand)]">{h.min_price > 0 ? `from ${formatCadRound(h.min_price)}` : "Quote"}</p>
                  </Link>
                </li>
              ))}
              <li className="px-5 py-3 text-center text-xs">
                <Link href={`/shop?q=${encodeURIComponent(q.trim())}`} onClick={closeSearch} className="font-semibold text-[var(--color-brand)] hover:underline">
                  See all {total} results for &ldquo;{q.trim()}&rdquo; →
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}
