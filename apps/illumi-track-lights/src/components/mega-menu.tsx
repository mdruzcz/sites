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
    title: "Soffit Track Kits",
    href: "/diy-kits",
    emoji: "⚡",
    links: [
      { label: "Complete kits — 50 to 200 ft", href: "/diy-kits" },
      { label: "What's in the box", href: "/diy-kits#whats-included" },
      { label: "Smart-app control", href: "/diy-kits#smart-control" }
    ]
  },
  {
    title: "Lights",
    href: "/product-category/lights",
    emoji: "💡",
    links: [
      { label: "24V RGBW Puck Lights", href: "/product/24v-led-puck-lights-10-qty" },
      { label: "24V ShowCone Lights", href: "/product/24v-showcone-lights-10-qty" },
      { label: "24V LED Strip", href: "/product/24v-led-strip" },
      { label: "Outdoor String Lights 20ft", href: "/product/outdoor-string-lights-20ft" }
    ]
  },
  {
    title: "Controllers & Power",
    href: "/product-category/controllers",
    emoji: "🎛️",
    links: [
      { label: "4-Channel WLED Controller", href: "/product/4-channel-wled-controller-board" },
      { label: "ShowHome Mini Controller", href: "/product/showhome-mini-2-channel-wled-controller" },
      { label: "Amplifier for 12V LEDs", href: "/product/amplifier-for-12v-led-lights" },
      { label: "Power supplies — 12V & 24V", href: "/product-category/power-supplies" }
    ]
  },
  {
    title: "Tracks & Connectors",
    href: "/product-category/connectors",
    emoji: "🔌",
    links: [
      { label: "Aluminum tracks", href: "/product/aluminum-track-for-12-24v-led-lights-2-qty" },
      { label: "Extension cables (1/5/10/20 ft)", href: "/product-category/connectors" },
      { label: "T-connectors", href: "/product-category/connectors" },
      { label: "Soffit screws — 4 colors", href: "/product-category/hardware" }
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
              ⚡ First order? Use code <span className="font-bold">ILLUMI10</span> for 10% off.
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
