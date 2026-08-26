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
    title: "String Lights",
    href: "/shop",
    emoji: "💡",
    links: [
      { label: "Large Strawberry Lights — C9", href: "/product-category/large-strawberry-lights-c9" },
      { label: "Super Bright Globe Lights G20", href: "/product-category/super-bright-globe-lights-g20" },
      { label: "Mini Lights", href: "/product-category/mini-lights" },
      { label: "Snowfall Lights", href: "/product-category/snowfall-lights" }
    ]
  },
  {
    title: "Displays & Décor",
    href: "/product-category/3d",
    emoji: "✨",
    links: [
      { label: "3D Displays", href: "/product-category/3d" },
      { label: "2D Displays", href: "/product-category/2d" },
      { label: "Animals", href: "/product-category/animals" },
      { label: "Photo Op Displays", href: "/product-category/photo-op-displays" }
    ]
  },
  {
    title: "Trees & Greenery",
    href: "/product-category/trees",
    emoji: "🎄",
    links: [
      { label: "Pre-lit LED Trees", href: "/product-category/trees" },
      { label: "Garlands & Wreaths", href: "/product-category/garlands-and-wreathes" },
      { label: "Ornaments", href: "/product-category/ornaments" }
    ]
  },
  {
    title: "Wire & Accessories",
    href: "/product-category/extension-cords-and-wire",
    emoji: "🔌",
    links: [
      { label: "Extension Cords & Wire", href: "/product-category/extension-cords-and-wire" },
      { label: "Accessories", href: "/product-category/accessories" },
      { label: "New Products", href: "/product-category/new-products" },
      { label: "Last Chance Deals", href: "/product-category/last-chance" }
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
              🎁 First order? Use code <span className="font-bold">FIRST10</span> for 10% off.
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
