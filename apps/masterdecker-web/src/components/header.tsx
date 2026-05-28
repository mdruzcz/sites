"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";
import services from "@/content/services.json";

const aboutLinks = [
  { label: "About Us", href: "/about" },
  { label: "Why Us", href: "/why-us" },
  { label: "Composite Decking Colours", href: "/composite-decking-colours" },
  { label: "Deck Stain Colour Choices", href: "/stain-choices" },
  { label: "Concrete Sealer Choices", href: "/concrete-sealer-choices" },
  { label: "FAQ", href: "/faq" },
  { label: "Service Locations", href: "/service-locations" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top phone bar */}
      <div className="hidden md:block bg-[var(--accent-dark)] text-white text-xs">
        <div className="container flex justify-end items-center h-9 gap-6">
          <a href={`mailto:${site.email}`} className="hover:text-[var(--accent-light)] transition-colors">{site.email}</a>
          <a href={site.phoneHref} className="font-bold hover:text-[var(--accent-light)] transition-colors">{site.phone}</a>
        </div>
      </div>

      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Master Decker home">
          <Image src="/images/logo.png" alt="Master Decker Inc. - Outdoor living experts in London Ontario" width={160} height={50} priority className="h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          <div className="relative group">
            <button className="text-sm font-semibold uppercase tracking-wider text-[var(--ink)] hover:text-[var(--accent)] transition-colors flex items-center gap-1">
              About Us
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5.5 7.5L10 12l4.5-4.5z" /></svg>
            </button>
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
              <div className="bg-white border border-[var(--border)] rounded shadow-lg py-2 min-w-[240px]">
                {aboutLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="block px-4 py-2 text-sm text-[var(--ink)] hover:bg-[var(--surface)] hover:text-[var(--accent)] transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link href="/services" className="text-sm font-semibold uppercase tracking-wider text-[var(--ink)] hover:text-[var(--accent)] transition-colors flex items-center gap-1">
              Services
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5.5 7.5L10 12l4.5-4.5z" /></svg>
            </Link>
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
              <div className="bg-white border border-[var(--border)] rounded shadow-lg py-3 grid grid-cols-2 gap-x-2 min-w-[520px]">
                {services.categories.map((cat) => (
                  <div key={cat.id} className="px-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] py-2">{cat.name}</div>
                    {cat.services.map((s) => (
                      <Link key={s.slug} href={`/${s.slug}`} className="block py-1.5 text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors">{s.title}</Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href="/project-examples" className="text-sm font-semibold uppercase tracking-wider text-[var(--ink)] hover:text-[var(--accent)] transition-colors">Projects</Link>
          <Link href="/blog" className="text-sm font-semibold uppercase tracking-wider text-[var(--ink)] hover:text-[var(--accent)] transition-colors">Blog</Link>
          <Link href="/contact" className="text-sm font-semibold uppercase tracking-wider text-[var(--ink)] hover:text-[var(--accent)] transition-colors">Contact Us</Link>
        </nav>

        <div className="hidden lg:flex items-center">
          <Link href="/contact" className="btn-primary text-xs">Free Estimate</Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded text-[var(--ink)]" aria-label="Toggle menu">
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[var(--border)] bg-white max-h-[80vh] overflow-y-auto">
          <div className="container py-4 space-y-1">
            <details>
              <summary className="py-3 text-sm font-bold uppercase tracking-wider border-b border-[var(--border)] cursor-pointer">About Us</summary>
              <div className="pl-4 py-2">
                {aboutLinks.map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm">{l.label}</Link>
                ))}
              </div>
            </details>
            <details>
              <summary className="py-3 text-sm font-bold uppercase tracking-wider border-b border-[var(--border)] cursor-pointer">Services</summary>
              <div className="pl-4 py-2">
                <Link href="/services" onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold text-[var(--accent)]">All Services →</Link>
                {services.categories.map((cat) => (
                  <details key={cat.id} className="my-1">
                    <summary className="py-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)] cursor-pointer">{cat.name}</summary>
                    <div className="pl-3">
                      {cat.services.map((s) => (
                        <Link key={s.slug} href={`/${s.slug}`} onClick={() => setOpen(false)} className="block py-1.5 text-sm">{s.title}</Link>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </details>
            <Link href="/project-examples" onClick={() => setOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-wider border-b border-[var(--border)]">Projects</Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-wider border-b border-[var(--border)]">Blog</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-wider border-b border-[var(--border)]">Contact Us</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-full justify-center mt-3">Free Estimate</Link>
            <a href={site.phoneHref} className="btn-outline w-full justify-center mt-2">{site.phone}</a>
          </div>
        </div>
      )}
    </header>
  );
}
