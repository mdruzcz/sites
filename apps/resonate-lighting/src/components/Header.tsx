"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

const links = [
  { href: "/kits", label: "Kits" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/services", label: "Installation" },
  { href: "/locations", label: "Locations" },
];
const clients = [
  { href: "/commercial", label: "Commercial" },
  { href: "/bia", label: "BIAs & main streets" },
  { href: "/municipal", label: "Municipal" },
];
const more = [
  { href: "/care", label: "Care" },
  { href: "/quick-start", label: "Quick-start" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clientsOpen, setClientsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!clientsOpen) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !menuRef.current?.contains(e.target as Node)) setClientsOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [clientsOpen]);

  const navClass = "text-[13px] font-semibold text-white/85 hover:text-resonant transition-colors uppercase tracking-wide min-h-[44px] inline-flex items-center";

  return (
    <header className="sticky top-0 z-50 bg-[rgba(11,15,26,0.85)] backdrop-blur-xl border-b border-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Logo />

          <nav className="hidden lg:flex items-center gap-5 xl:gap-6" aria-label="Primary">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={navClass}>
                {link.label}
              </Link>
            ))}
            <div ref={menuRef} className="relative">
              <button type="button" className={`${navClass} gap-1`} aria-expanded={clientsOpen} aria-haspopup="true" onClick={() => setClientsOpen((v) => !v)}>
                More
                <svg className={`w-3.5 h-3.5 transition-transform ${clientsOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {clientsOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 card p-2 shadow-2xl">
                  <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-widest text-muted font-semibold">Who we serve</p>
                  {clients.map((c) => (
                    <Link key={c.href} href={c.href} onClick={() => setClientsOpen(false)} className="block px-3 py-3 rounded-lg text-sm text-white/85 hover:bg-white/5 hover:text-resonant">
                      {c.label}
                    </Link>
                  ))}
                  <div className="border-t border-soft my-1" />
                  {more.map((c) => (
                    <Link key={c.href} href={c.href} onClick={() => setClientsOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm text-muted-strong hover:bg-white/5 hover:text-resonant">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/contact#quote" className="btn btn-primary text-sm py-2.5 px-4">
              Request a Quote
            </Link>
          </nav>

          <div className="lg:hidden flex items-center gap-2">
            <a href={site.phoneHref} className="btn btn-primary text-sm py-2 px-3 min-h-[44px]">
              <PhoneIcon />
              Call
            </a>
            <button className="p-2 min-w-[44px] min-h-[44px] text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-soft max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="grid grid-cols-2 gap-1 pt-4" aria-label="Mobile">
              {[...links, ...clients, ...more].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-3 text-sm font-semibold text-white/85 hover:bg-white/5 hover:text-resonant rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact#quote" className="btn btn-primary mt-2 col-span-2" onClick={() => setMobileOpen(false)}>
                Request a Quote
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
