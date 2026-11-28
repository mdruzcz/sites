'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site, phoneHref } from '@/lib/site-config';
import { Icon } from './icons';

// Mobile-only floating actions: a Call Now FAB (required) plus a quote pill.
//
// On the store pages (kits, cart, checkout) the quote pill is dropped: a shopper
// there is buying a kit, and "Free Quote" is the installer path. While a kit
// page shows its pinned add-to-cart bar (AddToCart sets data-buybar on <html>),
// the Call button moves up so the two never overlap.
export function FloatingCTA() {
  const pathname = usePathname();
  if (pathname === '/contact') return null;
  const inStore = pathname === '/kits' || pathname.startsWith('/kits/') || pathname === '/cart' || pathname.startsWith('/checkout');
  return (
    <div className="fixed right-4 bottom-4 z-50 flex items-center gap-2 transition-[bottom] duration-200 lg:hidden [[data-buybar]_&]:bottom-[calc(5.75rem+env(safe-area-inset-bottom))]">
      {!inStore && (
        <Link
          href="/contact"
          className="btn btn-dark btn-sm shadow-lg shadow-black/25"
        >
          Free Quote
        </Link>
      )}
      <a
        href={phoneHref}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-accent text-ink shadow-lg shadow-black/25 hover:bg-accent-hover transition-colors"
        aria-label={`Call ${site.name} at ${site.phone}`}
      >
        <Icon.phone size={26} />
      </a>
    </div>
  );
}
