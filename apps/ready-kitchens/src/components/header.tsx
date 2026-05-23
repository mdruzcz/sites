"use client";

import Link from "next/link";
import { useUI } from "./ui-context";
import { Wordmark } from "./wordmark";
import { SITE } from "@/lib/utils";

export function Header() {
  const { openDrawer, itemCount, hydrated } = useUI();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Wordmark />

        <nav className="hidden items-center gap-7 text-sm lg:flex">
          <Link href="/kits" className="hover:text-[var(--color-accent)]">Kitchen Kits</Link>
          <Link href="/how-it-works" className="hover:text-[var(--color-accent)]">How It Works</Link>
          <Link href="/pickup" className="hover:text-[var(--color-accent)]">Pickup &amp; Delivery</Link>
          <Link href="/faq" className="hover:text-[var(--color-accent)]">FAQ</Link>
          <Link href="/contact" className="hover:text-[var(--color-accent)]">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
            className="hidden text-sm font-medium hover:text-[var(--color-accent)] md:inline-block"
          >
            {SITE.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open cart"
            className="relative inline-flex h-11 items-center gap-2 rounded-sm border border-[var(--color-line)] bg-white px-3 text-sm font-medium hover:border-[var(--color-ink)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {hydrated && itemCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="border-t border-[var(--color-line)] bg-[var(--color-ink)] px-4 py-2 text-center text-[12px] text-white/90 lg:hidden">
        <Link href="/kits">Shop kits</Link>
        <span className="mx-3 opacity-50">·</span>
        <Link href="/how-it-works">How it works</Link>
        <span className="mx-3 opacity-50">·</span>
        <Link href="/contact">Contact</Link>
      </div>
    </header>
  );
}
