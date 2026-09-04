'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site, phoneHref } from '@/lib/site-config';
import { Logo } from './Logo';
import { Icon } from './icons';

const links = [
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/cost-estimator', label: 'Cost Estimator' },
  { href: '/resources', label: 'Guides' },
  { href: '/support', label: 'Owner Support' },
  { href: '/locations', label: 'Service Areas' },
  { href: '/about', label: 'About' },
  { href: '/become-a-dealer', label: 'Dealers' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close the drawer on route change and lock body scroll while it is open.
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`sticky top-0 inset-x-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-[0_1px_0_0_var(--line),0_8px_24px_-16px_rgba(0,0,0,0.25)]' : 'shadow-[0_1px_0_0_var(--line)]'}`}
    >
      <div className="wrap flex items-center justify-between h-[72px] md:h-20">
        <Link href="/" className="flex items-center shrink-0 min-h-[44px]" aria-label="Forever Lights home">
          <Logo priority height={40} className="md:hidden" />
          <Logo priority height={46} className="hidden md:block" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-7" aria-label="Primary">
          {links.map(l => {
            const active = pathname === l.href || pathname.startsWith(l.href + '/');
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[15px] font-medium transition-colors min-h-[44px] inline-flex items-center border-b-2 ${active ? 'border-accent text-ink' : 'border-transparent text-ink-soft hover:text-ink'}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={phoneHref} className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-ink-soft min-h-[44px] px-2">
            <Icon.phone size={18} />
            {site.phone}
          </a>
          <Link href="/contact" className="btn btn-primary btn-sm">Free Quote</Link>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-1">
          <a href={phoneHref} className="w-11 h-11 inline-flex items-center justify-center rounded-full text-ink hover:bg-soft" aria-label={`Call ${site.phone}`}>
            <Icon.phone size={22} />
          </a>
          <button
            type="button"
            className="w-11 h-11 inline-flex items-center justify-center rounded-full text-ink hover:bg-soft xl:hidden"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <Icon.close size={24} /> : <Icon.menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet sheet */}
      <div
        id="mobile-menu"
        className={`xl:hidden fixed inset-x-0 top-[72px] md:top-20 bottom-0 bg-white overflow-y-auto transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!open}
      >
        <nav className="wrap py-4 flex flex-col" aria-label="Mobile">
          {[{ href: '/', label: 'Home' }, ...links].map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-4 text-lg font-semibold text-ink border-b border-line"
            >
              {l.label}
              <Icon.arrow size={18} className="text-muted" />
            </Link>
          ))}
          <div className="grid gap-3 pt-6">
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary btn-lg w-full">Get a Free Quote</Link>
            <a href={phoneHref} className="btn btn-outline btn-lg w-full"><Icon.phone size={20} /> {site.phone}</a>
            <p className="text-center text-sm text-muted pt-2">{site.hours}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
