"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/drclogo.png"
              alt={`${site.name} logo`}
              width={180}
              height={48}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-[var(--accent)] transition-colors uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary text-sm">
              Get a Free Quote
            </Link>
          </nav>

          <button
            className="lg:hidden p-2"
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

        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-[var(--border)]">
            <nav className="flex flex-col gap-2 pt-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 rounded-lg uppercase tracking-wide"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn btn-primary mt-2 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Get a Free Quote
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
