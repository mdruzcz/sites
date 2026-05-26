"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/heat-pump-rebates", label: "Rebates ★", highlight: true },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/maintenance-plans", label: "Maintenance Plans" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--navy)] shadow-lg">
      {/* Top bar */}
      <div className="bg-[var(--navy-900)] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          <span className="hidden sm:flex items-center gap-1.5 text-white/70">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            Oxford County · Brantford · London
          </span>
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-[var(--cool)] font-semibold hidden sm:block">
              {site.hoursEmergency}
            </span>
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 text-white font-bold hover:text-[var(--heat)] transition-colors"
            >
              <PhoneIcon />
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Logo + Nav row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-[var(--heat)] flex items-center justify-center flex-shrink-0">
              <FlameSnowIcon />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[var(--heat)] transition-colors leading-none block">
                Optimum HVAC
              </span>
              <span className="text-[10px] text-[var(--cool)] font-semibold tracking-widest uppercase leading-none block">
                TSSA G2 Certified
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] rounded transition-colors ${
                  link.highlight
                    ? "text-[var(--heat)] hover:bg-[var(--heat)] hover:text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="btn btn-outline-white text-xs py-2 px-4"
            >
              <PhoneIcon />
              {site.phone}
            </a>
            <Link href="/contact" className="btn btn-primary text-xs py-2 px-4">
              Free Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[var(--navy-700)]">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-colors ${
                  link.highlight
                    ? "text-[var(--heat)]"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="btn btn-outline-white mt-2 w-full">
              <PhoneIcon />
              Call {site.phone}
            </a>
            <Link href="/contact" className="btn btn-primary mt-2 w-full" onClick={() => setMobileOpen(false)}>
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
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function FlameSnowIcon() {
  return (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  );
}
