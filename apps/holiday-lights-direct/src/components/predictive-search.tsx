"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUI } from "@/components/ui-context";
import { getBrowserSupabase } from "@/lib/supabase/client";

interface SearchHit {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  image_url: string | null;
  min_price: number;
}

export function PredictiveSearch() {
  const { searchOpen, closeSearch } = useUI();
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
    else {
      setQ("");
      setHits([]);
    }
  }, [searchOpen]);

  const debounced = useDebounced(q, 220);

  useEffect(() => {
    if (!debounced || debounced.length < 2) {
      setHits([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      const supabase = getBrowserSupabase();
      const { data } = await supabase
        .from("ecom_products")
        .select(
          "id, slug, name, short_description, ecom_variants(price_cad, is_active), ecom_product_images(public_url, is_primary, sort_order)"
        )
        .eq("status", "active")
        .ilike("name", `%${debounced}%`)
        .limit(8);
      if (cancelled) return;
      const mapped: SearchHit[] = (data ?? []).map((p) => {
        const variants = (p.ecom_variants as { price_cad: number; is_active: boolean }[]) ?? [];
        const prices = variants.filter((v) => v.is_active).map((v) => Number(v.price_cad));
        const min = prices.length ? Math.min(...prices) : 0;
        const imgs = (p.ecom_product_images as { public_url: string | null; is_primary: boolean; sort_order: number }[]) ?? [];
        const primary = imgs.find((i) => i.is_primary) ?? imgs.sort((a, b) => a.sort_order - b.sort_order)[0];
        return {
          id: p.id,
          slug: p.slug,
          name: p.name,
          short_description: p.short_description,
          image_url: primary?.public_url ?? null,
          min_price: min
        };
      });
      setHits(mapped);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  if (!searchOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search the catalog"
      className="drawer-overlay !items-start !justify-center !bg-black/60 pt-20"
      onClick={closeSearch}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl border border-[var(--color-border)] bg-white shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
          <span aria-hidden className="text-slate-500">🔍</span>
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search bulbs, kits, clips, wires…"
            className="flex-1 bg-transparent text-base outline-none"
          />
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Close search"
            className="rounded-md border border-[var(--color-border)] px-2 py-1 text-xs text-slate-500 hover:bg-slate-50"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!q && (
            <div className="px-4 py-6 text-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">Popular searches</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {["Permanent lights", "C9 red bulbs", "100ft kit", "Shingle tab clip", "T-connector"].map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => setQ(s)}
                      className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs hover:border-[var(--color-brand)]"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {q.length > 0 && q.length < 2 && (
            <p className="px-4 py-4 text-sm text-slate-500">Keep typing…</p>
          )}

          {loading && (
            <p className="px-4 py-4 text-sm text-slate-500">Searching…</p>
          )}

          {!loading && q.length >= 2 && hits.length === 0 && (
            <div className="px-4 py-6 text-sm">
              <p className="font-medium">No matches for &ldquo;{q}&rdquo;</p>
              <p className="text-slate-500">
                Try a broader term — like <em>bulb</em>, <em>clip</em>, or <em>kit</em>.
              </p>
            </div>
          )}

          {hits.length > 0 && (
            <ul className="divide-y divide-[var(--color-border)]">
              {hits.map((h) => (
                <li key={h.id}>
                  <Link
                    href={`/product/${h.slug}`}
                    onClick={closeSearch}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-brand-soft)]"
                  >
                    <div className="size-12 shrink-0 overflow-hidden rounded-md bg-slate-50">
                      {h.image_url && (
                        <Image
                          src={h.image_url}
                          alt={h.name}
                          width={60}
                          height={60}
                          className="h-full w-full object-contain"
                        />
                      )}
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium leading-tight">{h.name}</p>
                      {h.short_description && (
                        <p className="line-clamp-1 text-xs text-slate-500">{h.short_description}</p>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-[var(--color-brand)]">
                      from ${h.min_price.toFixed(2)}
                    </p>
                  </Link>
                </li>
              ))}
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
