"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/service-areas", label: "Service Areas" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-[var(--charcoal)] flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--accent)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 18h18v2H3v-2zm0-5h18v2H3v-2zm0-5h18v2H3V8zm0-5h18v2H3V3z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className="font-extrabold text-lg leading-none text-[var(--charcoal)]">
                  Concrete<span className="text-[var(--accent)]">Tilsonburg</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--concrete)] mt-1">
                  High-Strength Concrete · Oxford County
                </div>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="btn btn-primary text-sm">
              <PhoneIcon />
              {site.phone}
            </a>
          </nav>

          <div className="lg:hidden flex items-center gap-2">
            <a href={site.phoneHref} className="btn btn-primary text-sm py-2 px-3">
              <PhoneIcon />
              Call
            </a>
            <button
              className="p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-[var(--border)]">
            <nav className="flex flex-col gap-1 pt-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-3 text-sm font-semibold text-[var(--charcoal)] hover:bg-[var(--surface)] rounded-lg uppercase tracking-wide"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
