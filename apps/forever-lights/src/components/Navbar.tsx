'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site, phoneHref } from '@/lib/site-config';
import { Logo } from './Logo';
import { Icon } from './icons';
import { useCart } from './CartProvider';

// Two ways to buy: have us install it (Free Quote) or buy a kit online (Shop
// DIY Kits). Both sit in the header as buttons; the links below are the rest.
const links = [
  { href: '/services', label: 'Services' },
  { href: '/kits', label: 'DIY Kits', shop: true },
  { href: '/visualizer', label: 'Visualizer' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/cost-estimator', label: 'Pricing' },
  { href: '/resources', label: 'Guides' },
  { href: '/support', label: 'Support' },
  { href: '/locations', label: 'Areas' },
  { href: '/about', label: 'About' },
  { href: '/become-a-dealer', label: 'Dealers' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  // Already in the store: no need to advertise it.
  const inStore = pathname === '/kits' || pathname.startsWith('/kits/') || pathname === '/cart' || pathname.startsWith('/checkout');

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

  const menuButton = (
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
  );

  return (
    <>
      {/* Store notice: scrolls away with the page, so it costs no sticky height. */}
      {!inStore && (
        <div className="no-print bg-dark text-white">
          <Link
            href="/kits"
            className="wrap flex min-h-[44px] items-center justify-center gap-x-2.5 gap-y-0.5 py-1.5 text-center text-[13px] leading-snug md:text-sm"
          >
            <Icon.truck size={18} className="hidden shrink-0 text-accent sm:block" />
            <span className="text-white/85">
              <span className="hidden md:inline">Not in the London area, or handy with a ladder? </span>
              DIY kits ship across Canada.
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-accent">
              Shop kits <Icon.arrow size={15} />
            </span>
          </Link>
        </div>
      )}

      <header
        className={`sticky top-0 inset-x-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-[0_1px_0_0_var(--line),0_8px_24px_-16px_rgba(0,0,0,0.25)]' : 'shadow-[0_1px_0_0_var(--line)]'}`}
      >
        <div className="wrap flex items-center justify-between h-[72px] md:h-20">
          <Link href="/" className="flex items-center shrink-0 min-h-[44px]" aria-label="Forever Lights home">
            <Logo priority height={40} className="md:hidden" />
            <Logo priority height={46} className="hidden md:block" />
          </Link>

          {/* Desktop nav (the kit store is the Shop button on the right) */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7" aria-label="Primary">
            {links.filter(l => !l.shop).map(l => {
              const active = pathname === l.href || pathname.startsWith(l.href + '/');
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-[15px] font-medium transition-colors min-h-[44px] inline-flex items-center border-b-2 whitespace-nowrap ${active ? 'border-accent text-ink' : 'border-transparent text-ink-soft hover:text-ink'}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            <CartLink count={count} />
            <a href={phoneHref} className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-ink-soft min-h-[44px] px-2 whitespace-nowrap">
              <Icon.phone size={18} />
              <span className="xl:hidden 2xl:inline">{site.phone}</span>
            </a>
            <Link href="/kits" className="btn btn-dark btn-sm" aria-current={pathname === '/kits' ? 'page' : undefined}>
              <span>Shop <span className="xl:hidden 2xl:inline">DIY </span>Kits</span>
            </Link>
            <Link href="/contact" className="btn btn-primary btn-sm">Free Quote</Link>
            {menuButton}
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-1">
            <Link href="/kits" className="btn btn-dark btn-sm hidden sm:inline-flex mr-1">Shop DIY Kits</Link>
            <CartLink count={count} />
            <a href={phoneHref} className="w-11 h-11 inline-flex items-center justify-center rounded-full text-ink hover:bg-soft" aria-label={`Call ${site.phone}`}>
              <Icon.phone size={22} />
            </a>
            {menuButton}
          </div>
        </div>

        {/* Mobile / tablet sheet. Hangs off the header, so it stays attached whether or not the store notice is on screen. */}
        <div
          id="mobile-menu"
          className={`xl:hidden absolute inset-x-0 top-full h-[calc(100dvh-72px)] md:h-[calc(100dvh-80px)] bg-white overflow-y-auto transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-hidden={!open}
        >
          <nav className="wrap pt-5 pb-24 flex flex-col" aria-label="Mobile">
            <div className="grid grid-cols-2 gap-3 pb-3">
              <Link href="/kits" onClick={() => setOpen(false)} className="btn btn-dark w-full px-3">Shop DIY Kits</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full px-3">Free Quote</Link>
            </div>
            <p className="pb-2 text-center text-xs text-muted">Kits ship across Canada. Installation in London and area.</p>
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
              <a href={phoneHref} className="btn btn-outline btn-lg w-full"><Icon.phone size={20} /> {site.phone}</a>
              <p className="text-center text-sm text-muted pt-2">{site.hours}</p>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

function CartLink({ count }: { count: number }) {
  return (
    <Link
      href="/cart"
      className="relative w-11 h-11 inline-flex items-center justify-center rounded-full text-ink hover:bg-soft"
      aria-label={count ? `Cart, ${count} item${count === 1 ? '' : 's'}` : 'Cart'}
    >
      <Icon.cart size={22} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-accent text-ink text-[11px] font-bold leading-5 text-center">
          {count}
        </span>
      )}
    </Link>
  );
}
