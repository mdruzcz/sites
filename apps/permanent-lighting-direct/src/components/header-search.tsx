"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { formatCad } from "@/lib/utils";

interface Hit {
  id: string;
  slug: string;
  name: string;
  image_url: string | null;
  min_price: number;
}

function useDebounced<T>(value: T, ms: number) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

/**
 * Fixed-size search bar. The input never grows on focus; results render in a
 * dropdown underneath. Submitting goes to /shop?q=. On mobile the same bar is
 * shown inside a panel toggled by the header icon (see `variant="panel"`).
 */
export function HeaderSearch({ variant = "bar", autoFocus = false, onNavigate, storeId }: { variant?: "bar" | "panel"; autoFocus?: boolean; onNavigate?: () => void; storeId: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrap = useRef<HTMLDivElement | null>(null);
  const debounced = useDebounced(q, 200);

  useEffect(() => {
    if (debounced.trim().length < 2) {
      setHits([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      const supabase = getBrowserSupabase();
      const { data } = await supabase
        .from("ecom_products")
        .select("id, slug, name, ecom_variants(price_cad, is_active), ecom_product_images(public_url, is_primary, sort_order)")
        .eq("store_id", storeId)
        .eq("status", "active")
        .or(`name.ilike.%${debounced}%,slug.ilike.%${debounced.replace(/\s+/g, "-")}%`)
        .limit(7);
      if (cancelled) return;
      const mapped: Hit[] = (data ?? []).map((p) => {
        const variants = (p.ecom_variants as { price_cad: number; is_active: boolean }[]) ?? [];
        const prices = variants.filter((v) => v.is_active).map((v) => Number(v.price_cad));
        const imgs = (p.ecom_product_images as { public_url: string | null; is_primary: boolean; sort_order: number }[]) ?? [];
        const primary = imgs.find((i) => i.is_primary) ?? [...imgs].sort((a, b) => a.sort_order - b.sort_order)[0];
        return { id: p.id, slug: p.slug, name: p.name, image_url: primary?.public_url ?? null, min_price: prices.length ? Math.min(...prices) : 0 };
      });
      setHits(mapped);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [debounced, storeId]);

  // Close the dropdown on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    setOpen(false);
    onNavigate?.();
    router.push(term ? `/shop?q=${encodeURIComponent(term)}` : "/shop");
  }

  const showDrop = open && (hits.length > 0 || loading || q.trim().length >= 2);

  return (
    <div ref={wrap} className={variant === "bar" ? "relative w-full" : "relative w-full"}>
      <form onSubmit={submit} role="search" className="relative">
        <label htmlFor={`site-search-${variant}`} className="sr-only">Search products</label>
        <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        </span>
        <input
          id={`site-search-${variant}`}
          type="search"
          value={q}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search products…"
          autoComplete="off"
          className="h-11 w-full rounded-full border border-white/15 bg-white/10 pl-11 pr-24 text-sm text-white placeholder:text-white/55 transition focus:border-[var(--color-accent-bright)] focus:bg-white/15 focus:outline-none"
        />
        <button type="submit" className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 rounded-full bg-[var(--color-accent)] px-4 text-xs font-semibold text-white transition hover:bg-[var(--color-accent-dark)]">
          Search
        </button>
      </form>

      {showDrop && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white text-[var(--color-text)] shadow-[var(--shadow-lg)]">
          {loading && hits.length === 0 && <p className="px-4 py-3 text-sm text-[var(--color-muted)]">Searching…</p>}
          {!loading && hits.length === 0 && q.trim().length >= 2 && (
            <p className="px-4 py-3 text-sm text-[var(--color-muted)]">No matches yet. Press Enter to search the whole catalogue.</p>
          )}
          {hits.length > 0 && (
            <ul className="max-h-[60vh] divide-y divide-[var(--color-border)] overflow-auto">
              {hits.map((h) => (
                <li key={h.id}>
                  <Link
                    href={`/product/${h.slug}`}
                    onClick={() => {
                      setOpen(false);
                      onNavigate?.();
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 transition hover:bg-[var(--color-bg)]"
                  >
                    <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-[var(--color-border)] bg-white">
                      {h.image_url ? <Image src={h.image_url} alt="" width={48} height={48} className="size-12 object-contain" /> : <span className="text-xs text-[var(--color-muted)]">—</span>}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{h.name}</span>
                      <span className="block text-xs text-[var(--color-muted)]">from {formatCad(h.min_price)}</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <button type="button" onClick={submit as unknown as () => void} className="w-full px-4 py-2.5 text-left text-sm font-semibold text-[var(--color-accent-dark)] hover:bg-[var(--color-bg)]">
                  See all results for “{q.trim()}” →
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
