"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/faq", label: "FAQ" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/Deck-Medic-Logo-Updated-2-1-rkeqandwm6nvjvcu7jpw9wbck6ynkxq32rbqwqiczk.png"
              alt="Deck Medic logo"
              width={44}
              height={44}
              className="rounded-lg"
            />
            <span
              className="font-display font-bold text-xl leading-none"
              style={{ color: "var(--slate)" }}
            >
              Deck <span style={{ color: "var(--blue)" }}>Medic</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-colors hover:text-[var(--blue)]"
                style={{ color: "var(--slate-light)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="text-sm font-semibold transition-colors hover:text-[var(--blue-dark)]"
              style={{ color: "var(--blue)" }}
            >
              {site.phone}
            </a>
            <a
              href="/contact"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.02] min-h-11 flex items-center"
              style={{ background: "var(--blue)" }}
            >
              Free Estimate
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg min-h-11 min-w-11 flex items-center justify-center"
            style={{ color: "var(--slate)" }}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t bg-white shadow-xl" style={{ borderColor: "var(--light-grey)" }}>
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--blue-pale)] hover:text-[var(--blue)]"
                style={{ color: "var(--slate)" }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="/contact"
              className="mt-3 mx-4 py-3 rounded-full text-center text-sm font-semibold text-white min-h-11 flex items-center justify-center"
              style={{ background: "var(--blue)" }}
              onClick={() => setOpen(false)}
            >
              Get a Free Estimate
            </a>
            <a
              href={site.phoneHref}
              className="mx-4 py-3 text-center text-sm font-semibold border rounded-full min-h-11 flex items-center justify-center transition-colors hover:bg-[var(--blue-pale)]"
              style={{ color: "var(--blue)", borderColor: "var(--blue)" }}
            >
              Call {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
