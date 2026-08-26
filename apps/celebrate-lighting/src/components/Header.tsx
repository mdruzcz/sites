"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

/* The two lines lead the nav — they're the top of the funnel now, and
   "Christmas Lights" is the label people actually scan for. */
const nav = [
  { label: "Permanent Lighting", href: "/permanent-lighting" },
  { label: "Christmas Lights", href: "/seasonal-lighting" },
  { label: "Commercial", href: "/commercial" },
  { label: "Gallery", href: "/gallery" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "FAQ", href: "/faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(5, 8, 15, 0.88)",
        backdropFilter: "blur(14px)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-[72px]">
          {/* Logo — inverted to sit on the dark bar */}
          <Link href="/" className="flex items-center shrink-0" aria-label="Celebrate Lighting home">
            <Image
              src="/images/logo.png"
              alt="Celebrate Lighting logo"
              width={220}
              height={60}
              className="h-11 w-auto object-contain brightness-0 invert"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#c3cddc] hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs — phone always visible, demo button is the primary */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 text-sm font-semibold text-white hover:text-[var(--accent)] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {site.phone}
            </a>
            <Link href="/contact" className="btn btn-primary text-sm px-5 py-2.5 min-h-0 h-11">
              {site.demo.cta}
            </Link>
          </div>

          {/* Mobile: tap-to-call + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.name} at ${site.phone}`}
              className="h-11 w-11 flex items-center justify-center rounded-full text-[var(--accent)] hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </a>
            <button
              className="h-11 w-11 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="lg:hidden border-t px-4 py-4"
          style={{ background: "var(--deep)", borderColor: "var(--border)" }}
        >
          <nav aria-label="Mobile navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center min-h-[48px] text-sm font-medium text-[#c3cddc] hover:text-white border-b border-white/5 last:border-0 transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 flex flex-col gap-2">
            <Link
              href="/contact"
              className="btn btn-primary w-full justify-center"
              onClick={() => setOpen(false)}
            >
              {site.demo.ctaLong}
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost-white w-full justify-center">
              Call {site.phone}
            </a>
          </div>
          <p className="mt-3 text-center text-xs text-[var(--muted)]">{site.demo.promise}</p>
        </div>
      )}
    </header>
  );
}
