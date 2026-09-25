"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export const TRUST_BADGES = [
  {
    href: "/financing",
    title: "0% APR Financing",
    d: "On approved credit for complete kitchens.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M6 15h4" />
      </svg>
    ),
  },
  {
    href: "/lowest-price-guarantee",
    title: "Lowest Price Guarantee",
    d: "Find it cheaper in Canada? We match it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2 3 6v6c0 5 3.8 9.4 9 10 5.2-.6 9-5 9-10V6l-9-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    href: "/shipping-and-delivery",
    title: "Fast Cabinet Shipping",
    d: "In-stock cabinets ship in about a week.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
  {
    href: "/shipping-and-delivery",
    title: `Free Delivery within ${site.freeDeliveryKm} km`,
    d: "London, Kitchener-Waterloo, Hamilton & more.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

/** Four-up badge grid (home, product pages) or a compact single row. */
export default function TrustStrip({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  if (compact) {
    return (
      <ul className={`grid grid-cols-2 gap-2 text-xs ${className}`}>
        {TRUST_BADGES.map((b) => (
          <li key={b.title}>
            <Link href={b.href} className="flex items-center gap-2 rounded-md border border-border bg-sand px-2.5 py-2 hover:border-accent">
              <span className="h-4 w-4 shrink-0 text-accent">{b.icon}</span>
              <span className="font-medium leading-tight">{b.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {TRUST_BADGES.map((b) => (
        <li key={b.title}>
          <Link href={b.href} className="flex h-full items-start gap-3 rounded-lg border border-border bg-white p-4 hover:shadow-md transition-shadow">
            <span className="h-8 w-8 shrink-0 text-accent">{b.icon}</span>
            <span>
              <span className="block font-semibold leading-tight">{b.title}</span>
              <span className="mt-1 block text-xs text-ink-soft">{b.d}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Slim site-wide bar under the header. */
export function TrustBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/planner")) return null;
  return (
    <div className="border-b border-border bg-ink text-white">
      <div className="container flex gap-6 overflow-x-auto whitespace-nowrap py-1.5 text-[12px] font-medium [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">
        {TRUST_BADGES.map((b) => (
          <Link key={b.title} href={b.href} className="inline-flex items-center gap-1.5 hover:text-accent">
            <span className="h-3.5 w-3.5 text-accent">{b.icon}</span>
            {b.title}
          </Link>
        ))}
        <Link href="/sale" className="inline-flex items-center gap-1.5 font-bold text-red-400 hover:text-red-300">
          ★ Kitchen sale: 8% off every complete kitchen
        </Link>
      </div>
    </div>
  );
}
