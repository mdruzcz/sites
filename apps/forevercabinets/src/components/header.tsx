"use client";

import Link from "next/link";
import { useState } from "react";
import { useUI } from "./ui-context";
import { Wordmark } from "./wordmark";
import { TYPE_PATH } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const NAV = [
  { href: TYPE_PATH.base, label: "Base" },
  { href: TYPE_PATH.drawer, label: "Drawer" },
  { href: TYPE_PATH.wall, label: "Wall" },
  { href: TYPE_PATH.accessory, label: "Accessories" },
  { href: "/visualizer", label: "Visualizer" },
  { href: "/our-cabinets", label: "Our Cabinets" },
];

export function Header() {
  const { openDrawer, itemCount, hydrated } = useUI();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-cream)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:py-4">
        <Link href="/" aria-label="Forever Cabinets home" className="flex-shrink-0">
          <Wordmark size="sm" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide uppercase text-[var(--color-ink-soft)]">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="transition-colors hover:text-[var(--color-navy)] hover:underline underline-offset-8 decoration-[var(--color-brass)] decoration-[1.5px]"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openDrawer}
            className="relative inline-flex h-11 min-w-11 items-center gap-2 rounded-sm border border-[var(--color-navy)] px-3 text-[13px] font-medium uppercase tracking-wider text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-[var(--color-cream)] transition-colors"
            aria-label="Open request list"
          >
            <span className="hidden sm:inline">Request List</span>
            <span className="sm:hidden">List</span>
            {hydrated && itemCount > 0 && (
              <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--color-brass)] px-1.5 text-[11px] font-semibold text-[var(--color-navy)]">
                {itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span aria-hidden="true" className="text-2xl">
              {mobileOpen ? "×" : "≡"}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-[var(--color-line)] bg-[var(--color-cream)] lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block py-3 text-[15px] tracking-wide uppercase text-[var(--color-navy)]",
                    "border-b border-[var(--color-line)] last:border-b-0",
                  )}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
