'use client';
import Link from 'next/link';
import { site } from '@/lib/site';

export function FloatingCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 md:hidden">
      <a
        href={`tel:${site.phone.replace(/\D/g, '')}`}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F5A623] text-black shadow-lg shadow-amber-900/40 glow-pulse"
        aria-label="Call Forever Lights"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
        </svg>
      </a>
    </div>
  );
}
