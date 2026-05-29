"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* TOP ROW — orange, hides on scroll */}
      <div
        className={`hidden lg:block bg-[var(--accent)] text-white text-sm transition-[max-height,opacity] duration-300 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-16 opacity-100"
        }`}
      >
        <div className="container flex items-center justify-between h-11 gap-8">
          <nav className="flex items-center gap-7">
            <div className="relative group">
              <button className="text-sm font-semibold uppercase tracking-wider hover:text-[var(--ink)] transition-colors flex items-center gap-1 py-3">
                About Us
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5.5 7.5L10 12l4.5-4.5z" /></svg>
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block z-50">
                <div className="bg-white border border-[var(--border)] shadow-xl py-2 min-w-[260px]">
                  {aboutLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="block px-4 py-2.5 text-sm text-[var(--ink)] hover:bg-[var(--surface)] hover:text-[var(--accent)] transition-colors">{l.label}</Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/project-examples" className="text-sm font-semibold uppercase tracking-wider hover:text-[var(--ink)] transition-colors">Projects</Link>
            <Link href="/blog" className="text-sm font-semibold uppercase tracking-wider hover:text-[var(--ink)] transition-colors">Blog</Link>
            <Link href="/contact" className="text-sm font-semibold uppercase tracking-wider hover:text-[var(--ink)] transition-colors">Contact Us</Link>
          </nav>
          <div className="flex items-center gap-5">
            <a href={`mailto:${site.email}`} className="text-xs hover:text-[var(--ink)] transition-colors">{site.email}</a>
            <a href={site.phoneHref} className="text-base font-bold hover:text-[var(--ink)] transition-colors">{site.phone}</a>
          </div>
        </div>
      </div>

      {/* MAIN ROW — always sticky */}
      <div className="container flex items-center justify-between gap-4 h-20 lg:h-[88px]">
        <Link href="/" className="flex items-center" aria-label="Master Decker home">
          <Image src="/images/logo.png" alt="Master Decker Inc. - Outdoor living experts in London Ontario" width={180} height={56} priority className="h-12 lg:h-14 w-auto" />
        </Link>

        {/* Category dropdowns */}
        <nav className="hidden lg:flex items-center gap-8">
          {services.categories.map((cat) => (
            <div key={cat.id} className="relative group">
              <button className="text-sm font-bold uppercase tracking-wider text-[var(--ink)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 py-7">
                {cat.name}
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5.5 7.5L10 12l4.5-4.5z" /></svg>
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block z-50">
                <div className="bg-white border border-[var(--border)] shadow-xl py-2 min-w-[260px]">
                  {cat.services.map((s) => (
                    <Link key={s.slug} href={`/${s.slug}`} className="block px-4 py-2 text-sm text-[var(--ink)] hover:bg-[var(--surface)] hover:text-[var(--accent)] transition-colors">{s.title}</Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <Link href="/contact" className="btn-primary text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Free Estimate
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded text-[var(--ink)]" aria-label="Toggle menu">
          {open ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
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
            {services.categories.map((cat) => (
              <details key={cat.id}>
                <summary className="py-3 text-sm font-bold uppercase tracking-wider border-b border-[var(--border)] cursor-pointer">{cat.name}</summary>
                <div className="pl-4 py-2">
                  {cat.services.map((s) => (
                    <Link key={s.slug} href={`/${s.slug}`} onClick={() => setOpen(false)} className="block py-2 text-sm">{s.title}</Link>
                  ))}
                </div>
              </details>
            ))}
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
