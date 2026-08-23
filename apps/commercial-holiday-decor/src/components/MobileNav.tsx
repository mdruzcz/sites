"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BrandMark } from "@/components/BrandMark";
import { site } from "@/lib/site";
import { products } from "@/lib/content";

const PAGES: { label: string; href: string; note?: string }[] = [
  { label: "All products", href: "/products" },
  { label: "Installation & service", href: "/installation" },
  { label: "Service areas", href: "/service-areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

/**
 * Mobile navigation, portalled to <body>.
 *
 * The header uses backdrop-blur, and backdrop-filter makes an element a
 * containing block for position:fixed descendants — rendering the drawer inside
 * the header would size it to the header instead of the viewport.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="grid size-11 place-items-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)] transition hover:border-[var(--color-gold)] lg:hidden"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
          <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>

      {open && mounted && createPortal(
        <div className="lg:hidden">
          <div className="drawer-overlay" onClick={() => setOpen(false)} aria-hidden />
          <div className="drawer-panel left-0 right-auto" role="dialog" aria-modal="true" aria-label="Site menu">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
              <span className="flex items-center gap-2">
                <BrandMark className="size-7" />
                <span className="font-display text-lg">Menu</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-bg-warm)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Mobile">
              <p className="px-4 pb-2 pt-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Products
              </p>
              <ul className="space-y-0.5">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3.5 transition hover:bg-[var(--color-green-soft)]"
                    >
                      <span className="text-[15px] font-semibold">{p.name}</span>
                      <span className="mt-0.5 block text-xs text-[var(--color-muted)]">{p.eyebrow}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="px-4 pb-2 pt-5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                More
              </p>
              <ul className="space-y-0.5">
                {PAGES.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3.5 transition hover:bg-[var(--color-green-soft)]"
                    >
                      <span className="text-[15px] font-semibold">{l.label}</span>
                      {l.note && <span className="mt-0.5 block text-xs text-[var(--color-muted)]">{l.note}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-3 border-t border-[var(--color-border)] p-4 pb-safe">
              <Link href="/quote" onClick={() => setOpen(false)} className="btn-ember w-full">
                {site.quote.cta}
              </Link>
              <a href={site.phoneHref} className="btn-secondary w-full">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
