"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { site } from "@/lib/site";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-md"
          : "bg-white/90 backdrop-blur"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo — overlaps the header bar */}
          <Link href="/" className="relative flex items-center -my-4 sm:-my-6">
            <div
              className={`relative transition-all duration-300 ${
                scrolled ? "w-[72px] h-[72px] sm:w-[88px] sm:h-[88px]" : "w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
              }`}
            >
              <Image
                src="/images/drlogo1.png"
                alt={`${site.name} — professional deck and fence staining in Oakville and Burlington, Ontario`}
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
            <span className="ml-2 sm:ml-3 flex flex-col leading-tight">
              <span className="text-lg sm:text-xl font-extrabold text-[var(--wood-dark)] tracking-tight">
                DECK
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--accent)] uppercase tracking-[0.15em]">
                Restaining
              </span>
            </span>
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
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <nav className="flex flex-col gap-1 pt-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-[var(--accent)] rounded-lg uppercase tracking-wide transition-colors"
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
