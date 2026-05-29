"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SITE, SERVICES } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[var(--border)]">
      {/* Top bar */}
      <div className="bg-navy text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-6xl">
          <span className="hidden md:block text-white/80">Serving London, St. Thomas, Woodstock &amp; surrounding areas</span>
          <div className="flex items-center gap-6">
            <a href={`tel:${SITE.phonePlain}`} className="flex items-center gap-1.5 font-semibold hover:text-[var(--gold)] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="hidden md:block hover:text-[var(--gold)] transition-colors">{SITE.email}</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.svg" alt="K&M Kitchen Renovations logo" width={180} height={55} className="h-11 w-auto object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          <Link href="/" className="px-3 py-2 text-sm font-semibold text-[var(--slate)] hover:text-[var(--navy)] transition-colors">Home</Link>
          <Link href="/about" className="px-3 py-2 text-sm font-semibold text-[var(--slate)] hover:text-[var(--navy)] transition-colors">About</Link>
          <Link href="/financing" className="px-3 py-2 text-sm font-semibold text-[var(--slate)] hover:text-[var(--navy)] transition-colors">Financing</Link>

          {/* Services dropdown */}
          <div className="relative group">
            <button className="px-3 py-2 text-sm font-semibold text-[var(--slate)] hover:text-[var(--navy)] flex items-center gap-1 transition-colors">
              Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute left-0 top-full pt-2 w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150">
              <div className="bg-white rounded-xl shadow-xl border border-[var(--border)] py-2 overflow-hidden">
                <Link href="/services" className="block px-4 py-2 text-sm font-bold text-[var(--navy)] hover:bg-[var(--surface)] border-b border-[var(--border)] mb-1">All Services</Link>
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="block px-4 py-2 text-sm text-[var(--slate)] hover:bg-[var(--surface)] hover:text-[var(--navy)] transition-colors">
                    {s.shortTitle}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Service Areas dropdown */}
          <div className="relative group">
            <button className="px-3 py-2 text-sm font-semibold text-[var(--slate)] hover:text-[var(--navy)] flex items-center gap-1 transition-colors">
              Service Areas
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute left-0 top-full pt-2 w-52 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150">
              <div className="bg-white rounded-xl shadow-xl border border-[var(--border)] py-2">
                <Link href="/service-areas" className="block px-4 py-2 text-sm font-bold text-[var(--navy)] hover:bg-[var(--surface)] border-b border-[var(--border)] mb-1">All Areas</Link>
                {[
                  { slug: "london", city: "London" },
                  { slug: "st-thomas", city: "St. Thomas" },
                  { slug: "woodstock", city: "Woodstock" },
                  { slug: "hamilton", city: "Hamilton" },
                  { slug: "kitchener-waterloo", city: "Kitchener-Waterloo" },
                  { slug: "stratford", city: "Stratford" },
                ].map((a) => (
                  <Link key={a.slug} href={`/service-areas/${a.slug}`} className="block px-4 py-2 text-sm text-[var(--slate)] hover:bg-[var(--surface)] hover:text-[var(--navy)] transition-colors">
                    {a.city}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <Link href="/contact" className="btn btn-primary text-sm">
            Get a Free Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-[var(--navy)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[var(--border)] bg-white max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-1">
            <Link href="/" onClick={() => setOpen(false)} className="block px-3 py-2.5 font-semibold text-[var(--navy)] hover:bg-[var(--surface)] rounded-lg">Home</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="block px-3 py-2.5 font-semibold text-[var(--navy)] hover:bg-[var(--surface)] rounded-lg">About Us</Link>
            <Link href="/financing" onClick={() => setOpen(false)} className="block px-3 py-2.5 font-semibold text-[var(--navy)] hover:bg-[var(--surface)] rounded-lg">Financing</Link>

            <button onClick={() => setServicesOpen(!servicesOpen)} className="w-full flex justify-between items-center px-3 py-2.5 font-semibold text-[var(--navy)] hover:bg-[var(--surface)] rounded-lg">
              Services
              <svg className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {servicesOpen && (
              <div className="pl-4 space-y-1">
                <Link href="/services" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-bold text-[var(--navy)] hover:bg-[var(--surface)] rounded-lg">All Services</Link>
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-[var(--slate)] hover:bg-[var(--surface)] rounded-lg">
                    {s.shortTitle}
                  </Link>
                ))}
              </div>
            )}

            <button onClick={() => setAreasOpen(!areasOpen)} className="w-full flex justify-between items-center px-3 py-2.5 font-semibold text-[var(--navy)] hover:bg-[var(--surface)] rounded-lg">
              Service Areas
              <svg className={`w-4 h-4 transition-transform ${areasOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {areasOpen && (
              <div className="pl-4 space-y-1">
                {[
                  { slug: "london", city: "London" },
                  { slug: "st-thomas", city: "St. Thomas" },
                  { slug: "woodstock", city: "Woodstock" },
                  { slug: "hamilton", city: "Hamilton" },
                  { slug: "kitchener-waterloo", city: "Kitchener-Waterloo" },
                  { slug: "stratford", city: "Stratford" },
                ].map((a) => (
                  <Link key={a.slug} href={`/service-areas/${a.slug}`} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-[var(--slate)] hover:bg-[var(--surface)] rounded-lg">
                    {a.city}
                  </Link>
                ))}
              </div>
            )}

            <div className="pt-2">
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full justify-center">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
