"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const LINKS: { label: string; href: string; note?: string }[] = [
  { label: "Soffit Track Kits", href: "/diy-kits", note: "Complete kits, 50–200 ft" },
  { label: "Shop all products", href: "/shop", note: "Tracks, lights, controllers, cable" },
  { label: "Lights", href: "/product-category/lights" },
  { label: "Controllers", href: "/product-category/controllers" },
  { label: "Connectors & cables", href: "/product-category/connectors" },
  { label: "Power supplies", href: "/product-category/power-supplies" },
  { label: "Hardware", href: "/product-category/hardware" },
  { label: "How they work", href: "/how-it-works" },
  { label: "Gallery", href: "/gallery" },
  { label: "Installers", href: "/installers", note: "Trade pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Track your order", href: "/track-order" },
  { label: "Contact us", href: "/contact-us" }
];

/**
 * Mobile navigation. The previous header hid the nav entirely below `md`,
 * leaving phones with no way to reach any page but the logo link.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
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
        className="grid size-11 place-items-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)] transition hover:border-[var(--color-amber)] md:hidden"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
          <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>

      {/* Portalled to <body>: the header uses backdrop-blur, and backdrop-filter
          makes an element a containing block for position:fixed descendants —
          rendering the drawer inside the header sized it to the header. */}
      {open && mounted && createPortal(
        <div className="md:hidden">
          <div className="drawer-overlay" onClick={() => setOpen(false)} aria-hidden />
          <div
            className="drawer-panel left-0 right-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
              <span className="font-display text-lg text-[var(--color-text)]">Menu</span>
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
              <ul className="space-y-0.5">
                {LINKS.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3.5 transition hover:bg-[var(--color-amber-soft)]"
                    >
                      <span className="text-[15px] font-semibold">{l.label}</span>
                      {l.note && <span className="mt-0.5 block text-xs text-[var(--color-muted)]">{l.note}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-[var(--color-border)] p-4 pb-safe">
              <Link href="/diy-kits" onClick={() => setOpen(false)} className="btn-amber w-full">
                Build your kit
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
