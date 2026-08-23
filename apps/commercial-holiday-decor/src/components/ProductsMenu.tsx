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
        <span aria-hidden className={`text-[0.6rem] transition ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-40 w-[min(46rem,90vw)] -translate-x-1/2 pt-3">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-3 shadow-[0_24px_60px_rgba(22,32,26,0.16)]">
            <ul className="grid gap-1 sm:grid-cols-2">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 transition hover:bg-[var(--color-green-soft)]"
                  >
                    <span className="text-sm font-semibold">{p.name}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-[var(--color-muted)]">
                      {p.eyebrow}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-[var(--color-bg-warm)] px-4 py-3 text-sm font-semibold text-[var(--color-green-text)] transition hover:bg-[var(--color-green-soft)]"
            >
              See the full catalogue →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
