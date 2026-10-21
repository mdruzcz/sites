"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

const links = [
  { href: "/kits", label: "Kits" },
  { href: "/services", label: "Installation & Services" },
  { href: "/commercial", label: "Commercial" },
  { href: "/bia", label: "BIA" },
  { href: "/municipal", label: "Municipal" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(11,15,26,0.85)] backdrop-blur-xl border-b border-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Logo />

          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-semibold text-white/85 hover:text-resonant transition-colors uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary text-sm py-2.5 px-4">
              Request a Quote
            </Link>
          </nav>

          <div className="lg:hidden flex items-center gap-2">
            <a href={site.phoneHref} className="btn btn-primary text-sm py-2 px-3 min-h-[44px]">
              <PhoneIcon />
              Call
            </a>
            <button
              className="p-2 min-w-[44px] min-h-[44px] text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="lg:hidden pb-4 border-t border-soft">
            <nav className="flex flex-col gap-1 pt-4" aria-label="Mobile">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-3 text-sm font-semibold text-white/85 hover:bg-white/5 hover:text-resonant rounded-lg uppercase tracking-wide"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="btn btn-primary mt-2" onClick={() => setMobileOpen(false)}>
                Request a Quote
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
