"use client";

import { site } from "@/lib/site";

export function FloatingCta() {
  return (
    <a
      href={site.phoneHref}
      className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 rounded-full bg-[var(--accent)] text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow"
      aria-label={`Call ${site.phone}`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    </a>
  );
}
