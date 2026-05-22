"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const serviceLinks = [
    { href: "/services/deck-staining", label: "Deck Staining" },
    { href: "/services/deck-sealing", label: "Deck Sealing" },
    { href: "/services/deck-refinishing", label: "Deck Refinishing" },
    { href: "/services/deck-restoration", label: "Deck Restoration" },
    { href: "/services/fence-staining", label: "Fence Staining" },
    { href: "/services/power-washing", label: "Power Washing" },
  ];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
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
              Serving Toronto &amp; All GTA — Free Estimates
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[var(--concrete-200)]">
              <ClockIcon className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
              <span>Mon–Fri 8–5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b border-[var(--border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Toronto Deck Stainers logo"
                width={160}
                height={71}
                className="h-10 sm:h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-5">
              <Link href="/" className="text-[13px] font-semibold text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors uppercase tracking-wide">
                Home
              </Link>

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 text-[13px] font-semibold text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors uppercase tracking-wide">
                  Services
                  <svg className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-[var(--border)] py-2 z-50">
                    <Link
                      href="/services"
                      className="block px-4 py-2 text-xs font-bold text-[var(--accent)] uppercase tracking-wider border-b border-[var(--border)] mb-1"
                    >
                      All Services →
                    </Link>
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 text-sm font-medium text-[var(--charcoal)] hover:bg-[var(--surface)] hover:text-[var(--accent)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.slice(1).map((link) => (
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
              <Link href="/" className="px-4 py-3 text-sm font-semibold text-[var(--charcoal)] hover:bg-[var(--surface)] rounded-lg uppercase tracking-wide transition-colors" onClick={() => setMobileOpen(false)}>Home</Link>
              <div className="px-4 py-2 text-xs font-bold text-[var(--accent)] uppercase tracking-wider">Services</div>
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-6 py-2.5 text-sm font-medium text-[var(--charcoal)] hover:bg-[var(--surface)] rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {navLinks.slice(1).map((link) => (
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
