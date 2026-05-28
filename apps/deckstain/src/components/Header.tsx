"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const navServices = [
  { title: "Deck Staining", slug: "deck-staining" },
  { title: "Deck Cleaning", slug: "deck-cleaning" },
  { title: "Deck Sealing", slug: "deck-sealing" },
  { title: "Deck Restoration", slug: "deck-restoration" },
  { title: "Deck Refinishing", slug: "deck-refinishing" },
  { title: "Fence Staining", slug: "fence-staining" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-[var(--charcoal)] shadow-lg"
          : "bg-[var(--charcoal)]/95"
      }`}
    >
      {/* Top bar */}
      <div className="bg-[var(--accent)] text-white">
        <div className="container flex items-center justify-between py-1.5 gap-4">
          <span className="text-xs font-semibold tracking-wide hidden sm:block">
            Ontario&apos;s Expert Deck &amp; Fence Staining Specialists
          </span>
          <div className="flex items-center gap-4 ml-auto">
            <a
              href={site.phoneHref}
              className="text-xs font-bold tracking-wide hover:text-white/80 transition-colors flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {site.phone}
            </a>
            <Link href="/contact" className="text-xs font-bold bg-white text-[var(--accent)] px-3 py-1 rounded hover:bg-white/90 transition-colors hidden sm:block">
              Free Photo Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo.png"
            alt="DeckStain.ca - Professional Deck Staining Ontario"
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link href="/" className="text-white/80 hover:text-white text-sm font-semibold px-3 py-2 rounded transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-white/80 hover:text-white text-sm font-semibold px-3 py-2 rounded transition-colors">
            About
          </Link>

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="text-white/80 hover:text-white text-sm font-semibold px-3 py-2 rounded transition-colors flex items-center gap-1">
              Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 bg-white rounded-lg shadow-xl border border-[var(--border)] py-2 min-w-[220px] z-50">
                {navServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="block px-4 py-2.5 text-sm text-[var(--charcoal)] hover:bg-[var(--surface)] hover:text-[var(--accent)] transition-colors font-medium"
                  >
                    {s.title}
                  </Link>
                ))}
                <div className="border-t border-[var(--border)] mt-2 pt-2">
                  <Link
                    href="/services"
                    className="block px-4 py-2.5 text-sm text-[var(--accent)] font-bold hover:bg-[var(--surface)] transition-colors"
                  >
                    View All Services →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/projects" className="text-white/80 hover:text-white text-sm font-semibold px-3 py-2 rounded transition-colors">
            Projects
          </Link>
          <Link href="/stain-choices" className="text-white/80 hover:text-white text-sm font-semibold px-3 py-2 rounded transition-colors">
            Stain Choices
          </Link>
          <Link href="/faq" className="text-white/80 hover:text-white text-sm font-semibold px-3 py-2 rounded transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="btn btn-primary ml-2 text-xs py-2">
            Get Free Quote
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2 rounded"
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[var(--charcoal-700)] border-t border-white/10 pb-4">
          <nav className="container flex flex-col">
            <Link href="/" className="text-white/80 hover:text-white py-3 border-b border-white/10 font-medium text-sm" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white py-3 border-b border-white/10 font-medium text-sm" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <div className="py-3 border-b border-white/10">
              <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Services</p>
              {navServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="block text-white/80 hover:text-white py-2 pl-3 text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.title}
                </Link>
              ))}
            </div>
            <Link href="/projects" className="text-white/80 hover:text-white py-3 border-b border-white/10 font-medium text-sm" onClick={() => setMobileOpen(false)}>
              Projects
            </Link>
            <Link href="/stain-choices" className="text-white/80 hover:text-white py-3 border-b border-white/10 font-medium text-sm" onClick={() => setMobileOpen(false)}>
              Stain Choices
            </Link>
            <Link href="/faq" className="text-white/80 hover:text-white py-3 border-b border-white/10 font-medium text-sm" onClick={() => setMobileOpen(false)}>
              FAQ
            </Link>
            <Link href="/contact" className="btn btn-primary mt-4 text-center" onClick={() => setMobileOpen(false)}>
              Get Free Photo Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
