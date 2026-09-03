'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site, phoneHref } from '@/lib/site-config';
import { Icon } from './icons';

// Mobile-only floating actions: a Call Now FAB (required) plus a quote pill.
export function FloatingCTA() {
  const pathname = usePathname();
  if (pathname === '/contact') return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 lg:hidden">
      <Link
        href="/contact"
        className="btn btn-dark btn-sm shadow-lg shadow-black/25"
      >
        Free Quote
      </Link>
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
