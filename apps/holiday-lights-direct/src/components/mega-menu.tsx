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
    title: "Permanent Lights",
    href: "/permanent-lights",
    emoji: "★",
    links: [
      { label: "All kits (50–250 ft)", href: "/permanent-lights" },
      { label: "Kits by size", href: "/product-category/permanent-lighting-kits" },
      { label: "Aluminum tracks", href: "/product-category/aluminum-tracks" },
      { label: "12V RGBW puck lights", href: "/product-category/led-puck-lights" },
      { label: "Connectors & power injection", href: "/product-category/led-connectors" },
      { label: "Everything permanent", href: "/product-category/permanent-lights" }
    ]
  },
  {
    title: "Christmas Bulbs",
    href: "/product-category/christmas-light-bulbs",
    emoji: "🎄",
    links: [
      { label: "C9 LED bulbs — all colors", href: "/product-category/christmas-light-bulbs" },
      { label: "Mini light strands (5mm)", href: "/product-category/mini-light-strands" },
      { label: "Faceted glass bulbs", href: "/product-category/christmas-light-bulbs" }
    ]
  },
  {
    title: "Wires & Connectors",
    href: "/product-category/wires-plugs",
    emoji: "🔌",
    links: [
      { label: "SPT-2 extension wire (250 & 500 ft)", href: "/product-category/wires-plugs" },
      { label: "C7 / C9 socket spools – 12″ spacing", href: "/product/c7-c9-christmas-light-wire" },
      { label: "Quick-plug adapters", href: "/product-category/wires-plugs" },
      { label: "LED extension cables", href: "/product-category/led-connectors" },
      { label: "T-connectors", href: "/product-category/led-connectors" }
    ]
  },
  {
    title: "Clips & Hardware",
    href: "/product-category/light-attachment-clips",
    emoji: "🔩",
    links: [
      { label: "Shingle tab clips", href: "/product-category/light-attachment-clips" },
      { label: "Parapet clips", href: "/product-category/light-attachment-clips" },
      { label: "Universal clips", href: "/product-category/light-attachment-clips" },
      { label: "Light stakes", href: "/product-category/light-attachment-clips" },
      { label: "Soffit screws", href: "/product-category/aluminum-tracks" }
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
            <span className="flex items-center gap-4">
              <Link href="/resources" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
                Guides &amp; how-tos
              </Link>
              <Link href="/shop" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
                Browse all products →
              </Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
