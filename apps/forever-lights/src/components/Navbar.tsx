'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/locations', label: 'Service Areas' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#07070f]/95 backdrop-blur-md shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-20 md:h-24">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {/* SVG logo — transparent bg, gold + white brand colours */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.svg"
            alt="Forever Lights — Permanent LED Lighting"
            style={{ height: '80px', width: 'auto' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-300 hover:text-[#F5A623] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${site.phone.replace(/\D/g, '')}`}
            className="text-sm text-slate-300 hover:text-[#F5A623] transition-colors"
          >
            {site.phone}
          </a>
          <Link
            href="/contact"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold bg-[#F5A623] text-black hover:bg-[#FFD47A] transition-colors glow-pulse"
          >
            Free Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#07070f]/98 backdrop-blur-md border-t border-white/10 px-4 py-6 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-[#F5A623] transition-colors py-1"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 min-h-[44px] inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold bg-[#F5A623] text-black"
          >
            Get a Free Quote
          </Link>
          <a href={`tel:${site.phone.replace(/\D/g, '')}`} className="text-center text-slate-300 text-sm py-1">
            {site.phone}
          </a>
        </div>
      )}
    </header>
  );
}
