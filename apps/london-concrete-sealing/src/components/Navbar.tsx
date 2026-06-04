'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { site, services } from '@/lib/content';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About' },
  { href: '/our-services', label: 'Services', hasMenu: true },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact-us', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="container-x flex items-center justify-between h-20 gap-4">
        <Link href="/" className="flex items-center shrink-0" aria-label="London Concrete Sealing home">
          <Image
            src="/images/logo.png"
            alt="London Concrete Sealing logo"
            width={220}
            height={66}
            priority
            className="h-11 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group">
              <Link
                href={link.href}
                className="text-[15px] font-medium text-ink hover:text-accent transition-colors py-2"
              >
                {link.label}
              </Link>
              {link.hasMenu && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                  <div className="w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={s.urlPath}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent-soft transition-colors"
                      >
                        <span className="text-xl">{s.icon}</span>
                        <span className="text-sm font-medium text-ink">{s.menuName}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-2 text-ink font-semibold hover:text-accent transition-colors"
          >
            <PhoneIcon />
            {site.phoneDisplay}
          </a>
          <Link
            href="/contact-us"
            className="accent-btn px-5 py-2.5 rounded-lg text-sm font-semibold"
          >
            Free Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 -mr-2 text-ink"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="container-x py-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-ink border-b border-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 mt-2 pl-3">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={s.urlPath}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm text-slate-muted"
                >
                  {s.menuName}
                </Link>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href={`tel:${site.phone}`}
                className="flex-1 text-center border border-accent text-accent font-semibold py-3 rounded-lg"
              >
                Call Now
              </a>
              <Link
                href="/contact-us"
                onClick={() => setOpen(false)}
                className="flex-1 text-center accent-btn py-3 rounded-lg font-semibold"
              >
                Free Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
