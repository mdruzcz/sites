"use client";

import Link from "next/link";
import { useState, useRef } from "react";

interface MenuColumn {
  title: string;
  href: string;
  emoji: string;
  links: { label: string; href: string }[];
}

const COLUMNS: MenuColumn[] = [
  {
    title: "By Size",
    href: "/shop",
    emoji: "🪣",
    links: [
      { label: "1 Gallon Pails", href: "/shop?size=1-gallon" },
      { label: "5 Gallon Pails", href: "/shop?size=5-gallon" },
      { label: "Staining Accessories", href: "/product-category/staining-accessories" }
    ]
  },
  {
    title: "Light Colors",
    href: "/shop",
    emoji: "🟡",
    links: [
      { label: "Natural Cedar", href: "/product/natural-cedar" },
      { label: "Light Oak", href: "/product/light-oak" },
      { label: "Golden Pine", href: "/product/golden-pine" },
      { label: "Pecan", href: "/product/pecan" }
    ]
  },
  {
    title: "Dark Colors",
    href: "/shop",
    emoji: "🟤",
    links: [
      { label: "Mission Brown", href: "/product/mission-brown" },
      { label: "Mahogany", href: "/product/mahogany" },
      { label: "Dark Walnut", href: "/product/dark-walnut" },
      { label: "Burnt Hickory", href: "/product/burnt-hickory" },
      { label: "Redwood", href: "/product/redwood" }
    ]
  },
  {
    title: "Resources",
    href: "/calculator",
    emoji: "📐",
    links: [
      { label: "Stain Calculator", href: "/calculator" },
      { label: "Contractor Pricing", href: "/contractor-program" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "FAQ", href: "/faq" }
    ]
  }
];

export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function closeSoon() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={closeSoon}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-1 hover:text-[var(--color-brand)]"
      >
        Shop
        <span aria-hidden className={`transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-40 mt-3 w-screen max-w-4xl -translate-x-1/2 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-xl"
        >
          <div className="grid grid-cols-4 gap-6">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <Link
                  href={col.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:underline"
                >
                  <span aria-hidden className="text-base">{col.emoji}</span>
                  {col.title}
                </Link>
                <ul className="mt-3 space-y-2 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-slate-600 hover:text-[var(--color-brand)]">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-4 rounded-lg bg-[var(--color-brand-soft)] px-4 py-3 text-sm">
            <p className="font-medium text-[var(--color-brand-dark)]">
              🪵 First order? Use code <span className="font-bold">SAVE15</span> for $15 off.
            </p>
            <Link href="/shop" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
              Browse all products →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
