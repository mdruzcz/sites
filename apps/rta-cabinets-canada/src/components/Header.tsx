"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { useCart } from "@/lib/ui-context";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/kitchen-packages", label: "Kitchen Packages" },
  { href: "/how-to-measure", label: "How to Measure" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { count, hydrated } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border">
      <div className="container flex items-center justify-between h-16 gap-4">
        <Link href="/" className="font-bold text-lg leading-tight tracking-tight">
          RTA Cabinets <span className="text-accent">Canada</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-accent">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/request"
            className="relative inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md text-sm font-medium min-h-[44px]"
          >
            <span className="hidden sm:inline">Request Quote</span>
            <span className="sm:hidden">Quote</span>
            {hydrated && count > 0 && (
              <span className="bg-white text-accent rounded-full text-xs font-bold w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-white">
          <div className="container py-2 flex flex-col">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-border last:border-0 font-medium hover:text-accent"
              >
                {n.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="py-3 font-medium text-accent">
              Call {site.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
