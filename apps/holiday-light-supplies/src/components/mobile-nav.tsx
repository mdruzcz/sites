"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/icons";
import { AUDIENCES, audienceHref } from "@/lib/site";

const SHOP_LINKS: { label: string; href: string }[] = [
  { label: "All products", href: "/shop" },
  { label: "C9 LED bulbs & spools", href: "/product-category/large-strawberry-lights-c9" },
  { label: "Mini lights", href: "/product-category/mini-lights" },
  { label: "3D light displays", href: "/product-category/3d" },
  { label: "2D displays & photo-ops", href: "/product-category/photo-op-displays" },
  { label: "Pole-mount décor", href: "/product-category/pole-mount-decor" },
  { label: "Overhead & skyline", href: "/product-category/overhead-skyline-decor" },
  { label: "Wreaths & garland", href: "/product-category/garlands-and-wreathes" },
  { label: "Commercial bows", href: "/product-category/commercial-bows" },
  { label: "Trees", href: "/product-category/trees" },
  { label: "Ornaments & props", href: "/product-category/ornaments" },
  { label: "Wire, plugs & accessories", href: "/product-category/extension-cords-and-wire" },
  { label: "Permanent lighting kits", href: "/product-category/permanent-lighting-kits" }
];

const MORE_LINKS = [
  { label: "Request a quote", href: "/request-a-quote" },
  { label: "Gallery", href: "/gallery" },
  { label: "Guides", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Track your order", href: "/track-order" },
  { label: "Contact", href: "/contact-us" }
];

/** Full-height mobile drawer. Portalled to body: the sticky header's backdrop-blur would otherwise clip it. */
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

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="grid size-11 place-items-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)] lg:hidden"
      >
        <Icon.menu size={20} />
      </button>

      {open &&
        mounted &&
        createPortal(
          <div className="lg:hidden">
            <div className="drawer-overlay" onClick={close} aria-hidden />
            <div className="drawer-panel from-left" role="dialog" aria-modal="true" aria-label="Site menu">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
                <span className="font-display text-lg">Menu</span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="grid size-11 place-items-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-bg-warm)]"
                >
                  <Icon.close size={18} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Mobile">
                <p className="eyebrow px-4 pt-2 text-[var(--color-muted)]">Shop</p>
                <ul className="mt-1">
                  {SHOP_LINKS.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={close} className="block rounded-xl px-4 py-3 text-[15px] font-medium hover:bg-[var(--color-brand-soft)]">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="eyebrow mt-5 px-4 text-[var(--color-muted)]">Commercial & wholesale</p>
                <ul className="mt-1">
                  <li>
                    <Link href="/commercial" onClick={close} className="block rounded-xl px-4 py-3 text-[15px] font-semibold text-[var(--color-brand)] hover:bg-[var(--color-brand-soft)]">
                      Commercial overview
                    </Link>
                  </li>
                  {AUDIENCES.map((a) => (
                    <li key={a.slug}>
                      <Link href={audienceHref(a)} onClick={close} className="block rounded-xl px-4 py-3 text-[15px] font-medium hover:bg-[var(--color-brand-soft)]">
                        {a.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/municipalities" onClick={close} className="block rounded-xl px-4 py-3 text-[15px] font-medium hover:bg-[var(--color-brand-soft)]">
                      Municipal & BIA accounts
                    </Link>
                  </li>
                </ul>

                <p className="eyebrow mt-5 px-4 text-[var(--color-muted)]">More</p>
                <ul className="mt-1">
                  {MORE_LINKS.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={close} className="block rounded-xl px-4 py-3 text-[15px] font-medium hover:bg-[var(--color-brand-soft)]">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-[var(--color-border)] p-4 pb-safe">
                <Link href="/request-a-quote" onClick={close} className="btn-accent w-full">
                  Request a commercial quote
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
