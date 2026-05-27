"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { label: "Services", href: "/services" },
  { label: "Our Network", href: "/our-network" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--border)] shadow-sm">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[var(--accent-dark)] tracking-tight">
          <span className="text-[var(--accent)]">⬡</span> Master Decker
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={site.phoneHref} className="text-sm font-semibold text-[var(--accent)]">{site.phone}</a>
          <Link href="/contact" className="btn-primary text-sm py-2 px-4">Free Estimate</Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded text-[var(--ink)]" aria-label="Toggle menu">
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-white px-4 pb-4">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-3 text-sm font-medium border-b border-[var(--border)] last:border-0">
              {n.label}
            </Link>
          ))}
          <a href={site.phoneHref} className="mt-4 btn-primary w-full justify-center">{site.phone}</a>
        </div>
      )}
    </header>
  );
}
