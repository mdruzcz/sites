"use client";

import Link from "next/link";

export default function QuoteFab() {
  return (
    <Link
      href="/contact-us"
      aria-label="Get a free quote"
      className="fixed bottom-5 right-5 z-50 inline-flex min-h-14 min-w-14 items-center justify-center rounded-full bg-orange text-white shadow-lg transition-transform hover:scale-110 lg:hidden"
    >
      {/* Envelope / quote icon */}
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </Link>
  );
}
