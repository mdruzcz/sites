"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Finishes", href: "/finishes" },
  { label: "Before & After", href: "/gallery" },
  { label: "Areas", href: "/service-areas" },
  { label: "Guides", href: "/resources" },
  { label: "About", href: "/about" },
];
const mobileExtra = [
  { label: "Driveway Sealing", href: "/services/driveway-sealing" },
  { label: "Patio & Deck Sealing", href: "/services/patio-sealing" },
  { label: "Stamped Concrete Sealing", href: "/services/stamped-concrete-sealing" },
  { label: "Garage Floor Sealing", href: "/services/garage-floor-sealing" },
  { label: "Pool Deck Sealing", href: "/services/pool-deck-sealing" },
  { label: "Contact", href: "/contact" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const h = () => setScrolled(window.scrollY > 24);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || open ? "border-[var(--line-dark)] bg-[rgba(21,24,28,0.96)]" : "border-transparent bg-[rgba(21,24,28,0.6)]"}`}>
      <nav className="shell">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0 rounded bg-white px-2.5 py-1.5" aria-label="All-Seal Concrete Sealing home">
            <Image src="/images/logo.svg" alt="All-Seal Concrete Sealing" width={280} height={60} priority className="h-9 w-auto" />
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="font-display whitespace-nowrap text-[1.02rem] font-semibold uppercase tracking-[0.08em] text-white/80 transition hover:text-[var(--orange)]">{l.label}</Link>
            ))}
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <a href={site.phoneHref} className="btn-ghost btn-sm whitespace-nowrap"><PhoneIcon className="w-4 h-4" /><span className="hidden xl:inline">{site.phone}</span></a>
            <a href="#quote" className="btn-orange btn-sm whitespace-nowrap">Free Quote</a>
          </div>
          <button onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded border border-[var(--line-dark)] text-white lg:hidden" aria-label="Toggle menu" aria-expanded={open}>
            {open ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
          </button>
        </div>
      </nav>
      {mounted && open && createPortal(
        <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-[var(--graphite)] text-white lg:hidden">
          <div className="shell flex flex-col py-6">
            {[...navLinks, ...mobileExtra].map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display flex min-h-[54px] items-center border-b border-[var(--line-dark)] text-xl font-semibold uppercase tracking-wider">{l.label}</Link>
            ))}
            <a href="#quote" onClick={() => setOpen(false)} className="btn-orange mt-6">Get a free quote</a>
            <a href={site.phoneHref} className="btn-ghost mt-2"><PhoneIcon className="w-4 h-4" />{site.phone}</a>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
