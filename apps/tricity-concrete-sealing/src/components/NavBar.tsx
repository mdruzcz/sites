"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { MailIcon } from "./icons";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Finishes", href: "/finishes" },
  { label: "Before & After", href: "/gallery" },
  { label: "Areas", href: "/service-areas" },
  { label: "Guides", href: "/resources" },
  { label: "Warranty", href: "/warranty" },
  { label: "About", href: "/about" },
];

const mobileExtra = [
  { label: "Driveway Sealing", href: "/services/driveway-sealing" },
  { label: "Patio Sealing", href: "/services/patio-sealing" },
  { label: "Stamped Concrete Sealing", href: "/services/stamped-concrete-sealing" },
  { label: "Exposed Aggregate Sealing", href: "/services/exposed-aggregate-sealing" },
  { label: "Commercial Sealing", href: "/services/commercial-sealing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "bg-white/95 shadow-[0_1px_0_var(--line),0_10px_30px_-18px_rgba(15,34,55,0.35)]" : "bg-white/85"}`}>
      <nav className="shell">
        <div className="flex h-[76px] items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0" aria-label="TriCity Concrete Sealing home">
            <Image src="/images/logo.png" alt="TriCity Concrete Sealing" width={365} height={101} priority className="h-11 w-auto md:h-12" />
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="whitespace-nowrap text-[0.88rem] font-semibold text-[var(--ink-soft)] transition hover:text-[var(--accent-deep)]">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={site.emailHref} className="btn-outline btn-sm whitespace-nowrap"><MailIcon className="w-4 h-4" /><span className="hidden xl:inline">Email us</span></a>
            <a href="#contact" className="btn-accent btn-sm whitespace-nowrap">Free Quote</a>
          </div>

          <button onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-xl border border-[var(--line)] bg-white text-[var(--ink)] lg:hidden" aria-label="Toggle menu" aria-expanded={open}>
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </nav>

      {mounted && open && createPortal(
        <div className="fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-white lg:hidden">
          <div className="shell flex flex-col py-6">
            {[...navLinks, ...mobileExtra].map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex min-h-[54px] items-center border-b border-[var(--line)] text-lg font-bold text-[var(--ink)]">
                {l.label}
              </Link>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-accent mt-6">Get a free quote</a>
            <a href={site.emailHref} className="btn-outline mt-2"><MailIcon className="w-4 h-4" />{site.email}</a>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
