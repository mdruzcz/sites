"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/97 backdrop-blur-sm border-b border-[var(--border)] shadow-sm">
      {/* Top bar: phone right, empty left for balance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-8 sm:h-9 border-b border-[var(--border)]">
          <p className="text-xs text-[var(--concrete)] uppercase tracking-wider hidden sm:block">
            Woodstock · Ingersoll · Tillsonburg
          </p>
          <a
            href={site.phoneHref}
            className="text-xs font-bold text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 ml-auto"
          >
            <PhoneIcon />
            {site.phone}
          </a>
        </div>

        {/* Logo centered row */}
        <div className="flex items-center justify-center py-3 sm:py-4 relative">
          <Link href="/" className="flex flex-col items-center gap-0.5 group">
            <span className="font-extrabold text-xl sm:text-2xl tracking-widest uppercase text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors leading-none">
              Woodstock
            </span>
            <span className="font-bold text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[var(--accent)] leading-none">
              Deck and Fence
            </span>
          </Link>

          {/* Mobile: hamburger on right, call on left */}
          <div className="lg:hidden absolute right-0 flex items-center gap-2">
            <button
              className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Nav centered below logo — desktop */}
        <nav className="hidden lg:flex items-center justify-center gap-8 py-2.5 border-t border-[var(--border)]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[var(--accent)]"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary text-xs py-2 px-4 ml-2">
            Free Quote
          </Link>
        </nav>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-3 text-sm font-bold uppercase tracking-wider text-[var(--charcoal)] hover:bg-[var(--surface)] hover:text-[var(--accent)] rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn btn-primary mt-2 w-full"
              onClick={() => setMobileOpen(false)}
            >
              Get a Free Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
