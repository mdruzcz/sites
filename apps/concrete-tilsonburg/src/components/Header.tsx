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
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="bg-[var(--charcoal)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 text-[var(--concrete-200)] hover:text-white transition-colors text-xs font-semibold"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
              {site.phone}
            </a>
            <span className="hidden sm:block text-xs text-[var(--concrete-200)]">
              Serving Tillsonburg, Woodstock &amp; Oxford County
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[var(--concrete-200)]">
              <ClockIcon className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
              <span className="hidden xs:inline">Mon – Fri · 8 AM – 5 PM</span>
              <span className="xs:hidden">Mon–Fri 8–5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b border-[var(--border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--charcoal)] flex items-center justify-center shrink-0">
                <ConcreteIcon />
              </div>
              <div className="hidden sm:block">
                <div className="font-extrabold text-[1.05rem] leading-none tracking-tight text-[var(--charcoal)]">
                  Concrete<span className="text-[var(--accent)]">Tilsonburg</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--concrete)] mt-0.5">
                  High-Strength Concrete · Oxford County
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-semibold text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <a href={site.phoneHref} className="btn btn-primary text-sm ml-2">
                <PhoneIcon className="w-4 h-4" />
                {site.phone}
              </a>
            </nav>

            {/* Mobile actions */}
            <div className="lg:hidden flex items-center gap-2">
              <a href={site.phoneHref} className="btn btn-primary text-sm py-2 px-3">
                <PhoneIcon className="w-4 h-4" />
                Call
              </a>
              <button
                className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
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
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[var(--border)] bg-white">
            <nav className="flex flex-col gap-1 p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm font-semibold text-[var(--charcoal)] hover:bg-[var(--surface)] rounded-lg uppercase tracking-wide transition-colors"
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

function PhoneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ClockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ConcreteIcon() {
  return (
    <svg className="w-6 h-6 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="2" y="14" width="20" height="6" rx="1" fill="currentColor" opacity="0.3" stroke="none" />
      <rect x="2" y="14" width="20" height="6" rx="1" />
      <path strokeLinecap="round" d="M5 14V9" />
      <path strokeLinecap="round" d="M12 14V7" />
      <path strokeLinecap="round" d="M19 14V10" />
      <path strokeLinecap="round" d="M2 9h20" />
    </svg>
  );
}
