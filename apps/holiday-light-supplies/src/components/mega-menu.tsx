"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { AUDIENCES, audienceHref } from "@/lib/site";

interface MenuColumn {
  title: string;
  href: string;
  links: { label: string; href: string }[];
}

const COLUMNS: MenuColumn[] = [
  {
    title: "String lights & bulbs",
    href: "/product-category/large-strawberry-lights-c9",
    links: [
      { label: "C9 LED bulbs (25-packs)", href: "/product-category/large-strawberry-lights-c9" },
      { label: "C7/C9 socket spools & wire", href: "/product-category/extension-cords-and-wire" },
      { label: "5mm mini lights", href: "/product-category/mini-lights" },
      { label: "G20 globe lights", href: "/product-category/super-bright-globe-lights-g20" },
      { label: "Snowfall tubes", href: "/product-category/snowfall-lights" },
      { label: "Plugs, timers & clips", href: "/product-category/accessories" }
    ]
  },
  {
    title: "Light displays",
    href: "/product-category/3d",
    links: [
      { label: "3D light sculptures", href: "/product-category/3d" },
      { label: "2D motifs", href: "/product-category/2d" },
      { label: "Photo-op & walk-through", href: "/product-category/photo-op-displays" },
      { label: "Animals", href: "/product-category/animals" },
      { label: "Pole-mount décor", href: "/product-category/pole-mount-decor" },
      { label: "Overhead & skyline spans", href: "/product-category/overhead-skyline-decor" }
    ]
  },
  {
    title: "Trees, greenery & décor",
    href: "/product-category/trees",
    links: [
      { label: "Commercial trees", href: "/product-category/trees" },
      { label: "Wreaths & garland", href: "/product-category/garlands-and-wreathes" },
      { label: "Commercial bows", href: "/product-category/commercial-bows" },
      { label: "Giant ornaments & props", href: "/product-category/ornaments" },
      { label: "New this season", href: "/product-category/new-products" },
      { label: "Last chance", href: "/product-category/last-chance" }
    ]
  }
];

export function MegaMenu({ label = "Shop", variant = "shop" }: { label?: string; variant?: "shop" | "commercial" }) {
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
    <div onMouseEnter={openNow} onMouseLeave={closeSoon} onFocus={openNow} onBlur={closeSoon}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`inline-flex min-h-[44px] items-center gap-1 text-[15px] font-medium transition hover:text-[var(--color-accent)] ${
          variant === "commercial" ? "font-semibold text-[var(--color-brand)]" : ""
        }`}
      >
        {label}
        <Icon.chevron size={14} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="pop-in absolute inset-x-0 top-full z-40 mt-2 rounded-2xl border border-[var(--color-border)] bg-white p-7 shadow-[var(--shadow-lift)]"
        >
          {variant === "shop" ? (
            <div className="grid grid-cols-[1fr_1fr_1fr_1.1fr] gap-8">
              {COLUMNS.map((col) => (
                <div key={col.title}>
                  <Link href={col.href} className="eyebrow text-[var(--color-brand)] hover:text-[var(--color-accent)]">
                    {col.title}
                  </Link>
                  <ul className="mt-4 space-y-2.5 text-[15px]">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link href={l.href} className="text-[var(--color-text-soft)] transition hover:text-[var(--color-accent)]">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link
                href="/product-category/permanent-lighting-kits"
                className="group relative isolate flex min-h-[260px] flex-col justify-end overflow-hidden rounded-xl bg-[var(--color-night)] p-5 text-white"
              >
                <Image
                  src="/images/kits/permanent-led-roofline-lights-warm-white-night.webp"
                  alt="Warm white permanent LED roofline lighting on a two-storey home at night"
                  fill
                  sizes="300px"
                  className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
                />
                <div className="scrim-strong absolute inset-0" aria-hidden />
                <p className="eyebrow relative text-[var(--color-gold-bright)]">Year-round</p>
                <p className="font-display relative mt-2 text-xl leading-tight">Permanent LED lighting kits</p>
                <p className="relative mt-1 text-sm text-white/80">50–250 ft RGBW kits by Forever Lights. Install once.</p>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-[1.2fr_1fr] gap-8">
              <div>
                <p className="eyebrow text-[var(--color-brand)]">Who we supply</p>
                <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
                  {AUDIENCES.map((a) => (
                    <li key={a.slug}>
                      <Link href={audienceHref(a)} className="group block">
                        <span className="font-semibold text-[var(--color-text)] transition group-hover:text-[var(--color-accent)]">{a.name}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-[var(--color-muted)]">{a.blurb}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/municipalities" className="group block">
                      <span className="font-semibold text-[var(--color-text)] transition group-hover:text-[var(--color-accent)]">Open a municipal / BIA account</span>
                      <span className="mt-0.5 block text-xs leading-snug text-[var(--color-muted)]">Net-30 PO invoicing, tax-exempt handling and tender-ready quotes.</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl bg-[var(--color-brand-soft)] p-6">
                <p className="eyebrow text-[var(--color-brand)]">Need a quote for a whole site?</p>
                <p className="font-display mt-3 text-2xl leading-tight text-[var(--color-brand-dark)]">
                  Send us your property, pole count or tree list. We quote line by line within one business day.
                </p>
                <Link href="/request-a-quote" className="btn-accent mt-5">
                  Request a commercial quote <Icon.arrow size={16} />
                </Link>
                <Link href="/commercial" className="mt-3 block text-sm font-semibold text-[var(--color-brand)] hover:underline">
                  See the commercial overview →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
