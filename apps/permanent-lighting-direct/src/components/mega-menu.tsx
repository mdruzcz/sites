"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";

interface MenuColumn {
  title: string;
  href: string;
  links: { label: string; href: string }[];
}

export const SHOP_COLUMNS: MenuColumn[] = [
  {
    title: "Permanent lighting kits",
    href: "/diy-kits",
    links: [
      { label: "All kits, 50 to 250 ft", href: "/diy-kits" },
      { label: "50 ft kit", href: "/product/led-housing-package-50" },
      { label: "100 ft kit", href: "/product/led-housing-package-100" },
      { label: "150 ft kit", href: "/product/led-housing-package-150" },
      { label: "200 ft kit", href: "/product/led-housing-package-200" },
      { label: "What's in the box", href: "/diy-kits#whats-included" }
    ]
  },
  {
    title: "Lights",
    href: "/product-category/lights",
    links: [
      { label: "12V RGBW puck lights", href: "/product/12v-led-puck-lights-10-pack" },
      { label: "12V soffit light kit", href: "/product/12v-led-soffit-light-kit" },
      { label: "Outdoor string lights 20 ft", href: "/product/outdoor-string-lights-20ft" },
      { label: "All lights", href: "/product-category/lights" }
    ]
  },
  {
    title: "Controllers & power",
    href: "/product-category/controllers",
    links: [
      { label: "2-channel WiFi controller", href: "/product/2-channel-12v-led-controller" },
      { label: "4-channel controller", href: "/product/4-channel-12v-controller" },
      { label: "Data amplifier", href: "/product/amplifier-for-12v-led-lights" },
      { label: "12V power supplies", href: "/product-category/power-supplies" },
      { label: "Power injection cables", href: "/product-category/connectors" }
    ]
  },
  {
    title: "Track, connectors & hardware",
    href: "/product-category/hardware",
    links: [
      { label: "Aluminum track (2 pack)", href: "/product/aluminum-track-12v-led-lights-2-pack" },
      { label: "Extension connectors 1 to 20 ft", href: "/product-category/connectors" },
      { label: "T-connectors", href: "/product/t-connector-for-12-24v-led-lights" },
      { label: "Colour-matched soffit screws", href: "/product-category/hardware" },
      { label: "Everything", href: "/shop" }
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
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  }

  return (
    <div onMouseEnter={openNow} onMouseLeave={closeSoon} className="static">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className="nav-link inline-flex items-center gap-1.5"
      >
        Shop
        <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition ${open ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
      </button>

      {open && (
        <div
          onMouseEnter={openNow}
          onMouseLeave={closeSoon}
          className="absolute inset-x-0 top-full z-40 border-t border-white/10 bg-[var(--color-ink)] text-white shadow-[var(--shadow-xl)]"
        >
          <div className="shell grid gap-8 py-8 lg:grid-cols-[1.15fr_1fr_1fr_1fr_1.1fr]">
            {SHOP_COLUMNS.map((col) => (
              <div key={col.title}>
                <Link href={col.href} onClick={() => setOpen(false)} className="eyebrow text-[var(--color-gold)] hover:text-white">
                  {col.title}
                </Link>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} onClick={() => setOpen(false)} className="text-sm text-white/80 transition hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link href="/diy-kits" onClick={() => setOpen(false)} className="group relative hidden overflow-hidden rounded-2xl lg:block">
              <Image src="/images/photos/home-warm-white-twilight.webp" alt="Warm white permanent lights on a bungalow at twilight" width={640} height={480} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
              <span className="photo-scrim-soft" aria-hidden />
              <span className="absolute inset-x-0 bottom-0 p-5">
                <span className="eyebrow text-[var(--color-gold)]">Most popular</span>
                <span className="font-display mt-1 block text-lg">100 ft kit, $1,729.20</span>
                <span className="mt-1 block text-xs text-white/75">Everything for a typical bungalow front, one box.</span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
