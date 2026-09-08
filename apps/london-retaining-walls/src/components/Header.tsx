"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const NAV = [
  { label: "Service Areas", href: "/service-areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-paper/95">
      <div className="courses h-1.5 w-full bg-accent" aria-hidden />
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="London Retaining Walls home">
          <Image src="/images/logo-transparent.png" alt="London Retaining Walls" width={170} height={68} priority className="h-11 w-auto md:h-12" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          <div className="group relative">
            <Link href="/services" className="flex items-center gap-1 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-ink hover:text-accent-2">
              Services
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-4 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="grid grid-cols-2 gap-1 border border-[var(--line)] bg-paper p-3 shadow-xl">
                {site.services.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}`} className="flex items-center gap-3 px-3 py-2.5 text-[15px] font-semibold text-ink hover:bg-accent-soft">
                    <span className="h-2 w-2 bg-accent" aria-hidden />
                    {s.name}
                  </Link>
                ))}
                <Link href="/services" className="col-span-2 mt-1 border-t border-[var(--line)] px-3 pt-3 font-display text-[12px] font-bold uppercase tracking-[0.14em] text-accent-2">All services</Link>
              </div>
            </div>
          </div>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="font-display text-[13px] font-bold uppercase tracking-[0.14em] text-ink hover:text-accent-2">{n.label}</Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.phoneHref} className="font-display text-[15px] font-extrabold tracking-wide text-ink hover:text-accent-2">{site.phone}</a>
          <Link href="/contact-us" className="btn btn-accent">Free quote</Link>
        </div>

        <button type="button" onClick={() => setOpen(true)} className="flex min-h-[44px] min-w-[44px] items-center justify-center lg:hidden" aria-label="Open menu" aria-expanded={open}>
          <span className="flex w-6 flex-col gap-[5px]"><span className="h-[2px] bg-ink" /><span className="h-[2px] bg-ink" /><span className="h-[2px] bg-ink" /></span>
        </button>
      </div>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[100] bg-ink text-paper" role="dialog" aria-modal="true">
          <div className="courses-dark h-1.5 w-full bg-accent" aria-hidden />
          <div className="flex h-[72px] items-center justify-between px-4">
            <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-stone-2">Menu</span>
            <button type="button" onClick={() => setOpen(false)} className="flex min-h-[44px] min-w-[44px] items-center justify-center" aria-label="Close menu">
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden><path d="M3 3l16 16M19 3L3 19" stroke="currentColor" strokeWidth="2" /></svg>
            </button>
          </div>
          <nav className="h-[calc(100vh-78px)] overflow-y-auto px-4 pb-10" aria-label="Mobile">
            <p className="mt-2 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-accent">Services</p>
            <ul className="mt-2 divide-y divide-white/10 border-y border-white/10">
              {site.services.map((s) => (
                <li key={s.slug}><Link href={`/${s.slug}`} className="block py-3 text-lg font-semibold">{s.name}</Link></li>
              ))}
            </ul>
            <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {[{ label: "All services", href: "/services" }, ...NAV].map((n) => (
                <li key={n.href}><Link href={n.href} className="block py-3 font-display text-lg font-bold uppercase tracking-wide">{n.label}</Link></li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <a href={site.phoneHref} className="btn btn-accent w-full">Call {site.phone}</a>
              <Link href="/contact-us" className="btn btn-paper w-full">Request a free quote</Link>
            </div>
            <p className="mt-6 text-sm text-stone-2">{site.hours}</p>
          </nav>
        </div>,
        document.body
      )}
    </header>
  );
}
