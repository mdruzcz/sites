"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/content";

/**
 * Desktop products mega-menu. Ten categories is too many for a flat nav bar,
 * so the header carries one trigger and the full list drops beneath it.
 */
export function ProductsMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div ref={wrap} className="relative" onMouseEnter={() => { cancelClose(); setOpen(true); }} onMouseLeave={scheduleClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 whitespace-nowrap py-2 font-medium transition hover:text-[var(--color-green-text)]"
      >
        Products
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden className={`transition ${open ? "rotate-180" : ""}`}>
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-40 w-[min(52rem,92vw)] -translate-x-1/2 pt-3">
          <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-xl)]">
            <div className="grid gap-4 p-4 sm:grid-cols-[1.6fr_1fr]">
              <ul className="grid gap-1 sm:grid-cols-2">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="group block rounded-xl px-4 py-2.5 transition hover:bg-[var(--color-green-soft)]"
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">{p.name}</span>
                        <span className="btn-arrow text-xs text-[var(--color-green-text)] opacity-0 transition group-hover:opacity-100">→</span>
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-[var(--color-muted)]">
                        {p.eyebrow}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col justify-between rounded-xl bg-[var(--color-ink-deep)] p-5 text-white">
                <div>
                  <p className="eyebrow eyebrow-star text-[var(--color-gold-bright)]">One contractor</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    Design, install, in-season service and January takedown — everything on one invoice.
                  </p>
                </div>
                <div className="mt-5 space-y-2">
                  <Link href="/products" onClick={() => setOpen(false)} className="btn-ember w-full text-[0.85rem]">
                    See the full catalogue
                  </Link>
                  <Link href="/quote" onClick={() => setOpen(false)} className="btn-ghost-light w-full text-[0.85rem]">
                    Request a quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
