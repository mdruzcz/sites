"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Icon } from "./Icons";
import { useAiPreview } from "./AiPreviewProvider";

/**
 * Two-tier header with a CENTRED logo.
 *
 * Desktop: row 1 = phone/hours (left) · logo (centre) · CTAs (right);
 * row 2 = the full nav, centred, with a Services dropdown.
 * Mobile: hamburger (left) · logo (centre) · call button (right).
 *
 * Note the mobile drawer is a sibling of the blurred bar, not a child —
 * backdrop-filter turns the bar into a containing block for fixed
 * descendants and would clip the drawer.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const { open: openPreview } = useAiPreview();

  // Close menus on navigation without a setState-in-effect: key the
  // open state to the pathname it was opened on.
  const [openedOn, setOpenedOn] = useState(pathname);
  if (openedOn !== pathname) {
    setOpenedOn(pathname);
    setOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: "rgba(255, 255, 255, 0.92)", backdropFilter: "blur(14px)", borderColor: "var(--border)" }}
      >
        <div className="wrap">
          {/* Row 1 */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[64px] lg:h-[84px]">
            {/* Left: mobile menu / desktop phone + hours */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="lg:hidden inline-flex items-center justify-center w-11 h-11 -ml-2 rounded-xl text-ink hover:bg-[var(--surface-2)]"
                aria-label="Open menu"
                aria-expanded={open}
              >
                <Icon.Menu />
              </button>
              <div className="hidden lg:flex items-center gap-5 text-sm">
                <span className="inline-flex items-center gap-2 min-h-[44px] font-semibold text-ink">
                  <span className="icon-tile !w-9 !h-9"><Icon.Pin width={16} height={16} /></span>
                  Woodstock, ON
                </span>
                <span className="hidden xl:inline text-[var(--muted)]">Serving Southwestern Ontario</span>
              </div>
            </div>

            {/* Centre: logo */}
            <Link href="/" className="flex items-center justify-center" aria-label="Celebrate Lighting home">
              <Image
                src="/images/logo.png"
                alt="Celebrate Lighting logo"
                width={1881}
                height={522}
                className="h-10 lg:h-14 w-auto object-contain"
                priority
              />
            </Link>

            {/* Right: mobile call / desktop CTAs */}
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={openPreview}
                className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-xl text-[var(--accent-ink)] hover:bg-[var(--surface-2)]"
                aria-label={site.aiPreview.cta}
              >
                <Icon.Sparkle />
              </button>
              <button type="button" onClick={openPreview} className="hidden lg:inline-flex btn btn-outline btn-sm">
                <Icon.Sparkle width={16} height={16} />
                {site.aiPreview.ctaShort}
              </button>
              <Link href="/contact" className="hidden lg:inline-flex btn btn-primary btn-sm">
                {site.demo.cta}
              </Link>
            </div>
          </div>

          {/* Row 2: desktop nav */}
          <nav className="hidden lg:flex items-center justify-center gap-1 h-12 border-t" style={{ borderColor: "var(--border)" }} aria-label="Main navigation">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1 px-4 h-12 text-[0.9rem] font-semibold transition-colors ${
                  isActive("/permanent-lighting") || isActive("/seasonal-lighting") || isActive("/commercial") || isActive("/services")
                    ? "text-[var(--accent-ink)]"
                    : "text-body hover:text-ink"
                }`}
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((v) => !v)}
              >
                Services <Icon.Chevron width={14} height={14} />
              </button>
              {servicesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 w-[23rem] pop-in">
                  <div className="card card-static p-2 shadow-2xl">
                    {site.nav.services.map((s) => (
                      <Link key={s.href} href={s.href} className="flex flex-col gap-0.5 rounded-xl px-4 py-3 hover:bg-[var(--surface-2)]">
                        <span className="font-semibold text-ink">{s.label}</span>
                        <span className="text-xs text-[var(--muted)]">{s.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {site.nav.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center px-4 h-12 text-[0.9rem] font-semibold transition-colors ${
                  isActive(item.href) ? "text-[var(--accent-ink)]" : "text-body hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="inline-flex items-center px-4 h-12 text-[0.9rem] font-semibold text-body hover:text-ink">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile drawer (outside the blurred header on purpose) */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className="absolute inset-0 bg-black/70" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm overflow-y-auto pop-in" style={{ background: "var(--surface)" }}>
            <div className="flex items-center justify-between px-4 h-[68px] border-b" style={{ borderColor: "var(--border)" }}>
              <Image src="/images/logo.png" alt="Celebrate Lighting" width={1881} height={522} className="h-9 w-auto" />
              <button type="button" onClick={() => setOpen(false)} className="w-11 h-11 inline-flex items-center justify-center rounded-xl text-ink hover:bg-[var(--surface-2)]" aria-label="Close menu">
                <Icon.X />
              </button>
            </div>
            <div className="p-4 space-y-6">
              <div>
                <p className="pill mb-2">Services</p>
                <ul className="space-y-1">
                  {site.nav.services.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="flex flex-col rounded-xl px-3 py-3 hover:bg-[var(--surface-2)] min-h-[44px]">
                        <span className="font-semibold text-ink">{s.label}</span>
                        <span className="text-xs text-[var(--muted)]">{s.desc}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="pill mb-2">Explore</p>
                <ul className="space-y-1">
                  {[...site.nav.main, { label: "Reviews", href: "/reviews" }, { label: "Blog", href: "/blog" }, { label: "Contact", href: "/contact" }].map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="flex items-center rounded-xl px-3 min-h-[44px] font-semibold text-body hover:text-ink hover:bg-[var(--surface-2)]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2 pt-2">
                <button type="button" onClick={() => { setOpen(false); openPreview(); }} className="btn btn-outline w-full">
                  <Icon.Sparkle width={16} height={16} /> {site.aiPreview.cta}
                </button>
                <Link href="/contact" className="btn btn-primary w-full">{site.demo.ctaLong}</Link>
                <Link href="/ai-preview" className="btn btn-gold w-full"><Icon.Sparkle width={18} height={18} /> Free AI Preview</Link>
              </div>
              <p className="text-xs text-[var(--muted)] text-center">{site.hours}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
