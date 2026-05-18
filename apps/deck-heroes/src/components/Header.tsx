"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY_NAME, PHONE, PHONE_HREF, SERVICES, CITIES } from "@/lib/constants";

function DeckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="6" width="20" height="3" rx="0.5" />
      <line x1="4" y1="9" x2="4" y2="20" />
      <line x1="12" y1="9" x2="12" y2="20" />
      <line x1="20" y1="9" x2="20" y2="20" />
      <line x1="2" y1="6" x2="4" y2="3" />
      <line x1="22" y1="6" x2="20" y2="3" />
    </svg>
  );
}

interface DropdownProps {
  label: string;
  items: { href: string; label: string }[];
}

function DesktopDropdown({ label, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-wood-dark hover:text-terracotta transition-colors font-medium"
      >
        {label}
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-cream-dark py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-wood-dark hover:bg-cream hover:text-terracotta transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const NAV_SERVICES = SERVICES.map((s) => ({
  href: `/services/${s.slug}`,
  label: s.title,
}));

const NAV_AREAS = CITIES.map((c) => ({
  href: `/areas/${c.slug}`,
  label: c.name,
}));

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-md"
          : "bg-cream"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo.png"
              alt="Deck Heroes logo"
              width={160}
              height={48}
              className="h-10 w-auto lg:h-12"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <DesktopDropdown label="Services" items={NAV_SERVICES} />
            <DesktopDropdown label="Areas" items={NAV_AREAS} />
            <Link href="/stain-choices" className="text-wood-dark hover:text-terracotta transition-colors font-medium">
              Stain Choices
            </Link>
            <Link href="/articles" className="text-wood-dark hover:text-terracotta transition-colors font-medium">
              Articles
            </Link>
            <Link href="/testimonials" className="text-wood-dark hover:text-terracotta transition-colors font-medium">
              Testimonials
            </Link>
            <Link href="/faq" className="text-wood-dark hover:text-terracotta transition-colors font-medium">
              FAQ
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={PHONE_HREF}
              className="text-sm font-medium text-wood hover:text-terracotta transition-colors"
            >
              {PHONE}
            </a>
            <Link
              href="/contact"
              className="rounded-lg bg-terracotta px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-terra-dark transition-colors"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-wood-dark hover:text-terracotta transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-cream-dark bg-cream">
          <nav className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {/* Services accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex w-full items-center justify-between py-3 text-wood-dark font-medium"
              >
                Services
                <svg className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 pb-2 space-y-1">
                  {NAV_SERVICES.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-wood hover:text-terracotta transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Areas accordion */}
            <div>
              <button
                onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                className="flex w-full items-center justify-between py-3 text-wood-dark font-medium"
              >
                Areas
                <svg className={`w-4 h-4 transition-transform ${mobileAreasOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {mobileAreasOpen && (
                <div className="pl-4 pb-2 space-y-1">
                  {NAV_AREAS.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-wood hover:text-terracotta transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/stain-choices" onClick={() => setMobileOpen(false)} className="block py-3 text-wood-dark font-medium hover:text-terracotta transition-colors">
              Stain Choices
            </Link>
            <Link href="/articles" onClick={() => setMobileOpen(false)} className="block py-3 text-wood-dark font-medium hover:text-terracotta transition-colors">
              Articles
            </Link>
            <Link href="/testimonials" onClick={() => setMobileOpen(false)} className="block py-3 text-wood-dark font-medium hover:text-terracotta transition-colors">
              Testimonials
            </Link>
            <Link href="/faq" onClick={() => setMobileOpen(false)} className="block py-3 text-wood-dark font-medium hover:text-terracotta transition-colors">
              FAQ
            </Link>

            <div className="pt-4 border-t border-cream-dark space-y-3">
              <a
                href={PHONE_HREF}
                className="block text-center font-medium text-wood hover:text-terracotta transition-colors"
              >
                {PHONE}
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-lg bg-terracotta px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-terra-dark transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
