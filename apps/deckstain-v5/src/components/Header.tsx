"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/data";

const links = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our Work" },
  { href: "/finishes", label: "Finishes" },
  { href: "/areas", label: "Areas" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--hair)]">
      {/* top strip */}
      <div className="bg-[var(--bg-deep)] text-white/85 text-[12.5px]">
        <div className="wrap flex items-center justify-between h-9">
          <span className="hidden sm:flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[var(--gold)]" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l2.39 4.84 5.34.78-3.86 3.76.91 5.31L10 14.27 5.22 16.69l.91-5.31L2.27 7.62l5.34-.78L10 2z" /></svg>
            {SITE.stats.rating}★ rated · {SITE.stats.decks} Ontario decks · {SITE.stainBrand} applicators
          </span>
          <div className="flex items-center gap-4 ml-auto">
            <a href={SITE.phoneHref} className="font-semibold hover:text-white transition-colors">{SITE.phone}</a>
            <span className="hidden md:inline text-white/55">{SITE.hours}</span>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div className="wrap flex items-center justify-between h-[64px]">
        <Link href="/" onClick={() => setOpen(false)}><Logo /></Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          <div className="relative" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
            <Link href="/services" className="px-3 py-2 rounded-md text-[0.93rem] font-semibold text-[var(--ink-2)] hover:text-[var(--green)] hover:bg-[var(--bg-alt)] transition-colors flex items-center gap-1" style={{ fontFamily: "var(--font-head)" }}>
              Services
              <svg className={`w-3.5 h-3.5 transition-transform ${menu ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </Link>
            {menu && (
              <div className="absolute left-0 top-full pt-2 w-[290px]">
                <div className="bg-white rounded-xl border border-[var(--hair)] shadow-[var(--shadow-lg)] p-1.5">
                  {SERVICES.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="block px-3 py-2 rounded-lg hover:bg-[var(--bg-alt)] transition-colors">
                      <span className="block text-sm font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-head)" }}>{s.name}</span>
                      <span className="block text-xs text-[var(--ink-3)]">{s.tagline}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {links.slice(1).map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-2 rounded-md text-[0.93rem] font-semibold text-[var(--ink-2)] hover:text-[var(--green)] hover:bg-[var(--bg-alt)] transition-colors" style={{ fontFamily: "var(--font-head)" }}>{l.label}</Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5">
          <a href={SITE.phoneHref} className="btn btn-out btn-lg !min-h-0 !py-2.5">
            <svg className="w-4 h-4 text-[var(--green)]" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
            Call
          </a>
          <Link href="/contact" className="btn btn-green !min-h-0 !py-2.5">Free Quote</Link>
        </div>

        <button className="lg:hidden p-2 -mr-2 text-[var(--ink)]" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[var(--hair)]">
          <nav className="wrap py-3 flex flex-col">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2.5 border-b border-[var(--hair)] font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-head)" }}>{l.label}</Link>
            ))}
            <Link href="/faq" onClick={() => setOpen(false)} className="py-2.5 border-b border-[var(--hair)] font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-head)" }}>FAQ</Link>
            <div className="flex gap-2.5 pt-3">
              <a href={SITE.phoneHref} className="btn btn-out flex-1">Call</a>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-green flex-1">Free Quote</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
