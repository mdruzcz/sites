"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons";

/** Sticky mobile action: there is no public phone line, so the fastest path to a human is the quote form. */
export function QuoteFab() {
  const pathname = usePathname();
  if (pathname.startsWith("/request-a-quote") || pathname.startsWith("/checkout") || pathname.startsWith("/product/")) return null;
  return (
    <Link
      href="/request-a-quote"
      className="fixed bottom-4 right-4 z-50 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(199,71,26,0.9)] transition hover:bg-[var(--color-accent-dark)] md:hidden"
      aria-label="Request a commercial quote"
    >
      <Icon.quote size={18} /> Get a quote
    </Link>
  );
}
