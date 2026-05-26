"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const nav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Row 1: centered logo */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between lg:justify-center py-3">
          <Link href="/" className="flex items-center" aria-label="Celebrate Lighting home">
            <Image
              src="/images/logo.png"
              alt="Celebrate Lighting logo"
              width={240}
              height={66}
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Row 2: nav bar (desktop only) */}
      <div className="hidden lg:block" style={{ background: "var(--foreground)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">
            <nav className="flex items-center gap-7" aria-label="Main navigation">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <a
                href={site.phoneHref}
                className="text-sm font-semibold text-white hover:text-[var(--accent)] transition-colors"
              >
                {site.phone}
              </a>
              <Link
                href="/contact"
                className="btn btn-primary text-xs h-8 min-h-0 py-0 px-4"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2.5 text-sm font-medium text-gray-700 hover:text-[var(--accent)] border-b border-gray-50 last:border-0"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <a href={site.phoneHref} className="btn btn-outline w-full justify-center">
              {site.phone}
            </a>
            <Link
              href="/contact"
              className="btn btn-primary w-full justify-center"
              onClick={() => setOpen(false)}
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
