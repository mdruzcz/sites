import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About — A Contractor-Built Cabinet Shop in Belmont",
  description: "Ready Kitchens is the in-stock kit line from Forever Cabinets — a contractor-owned cabinet shop in Belmont, Ontario specializing in plywood-box White Shaker kitchens.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <header>
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">About</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Cabinets built by people who actually install them.</h1>
      </header>

      <div className="prose mt-8 max-w-none text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
        <p>
          {SITE.name} is the in-stock cabinet line from <a href="https://forevercabinets.ca" target="_blank" rel="noopener" className="text-[var(--color-ink)] underline-offset-2 hover:underline">Forever Cabinets</a> — a contractor-owned cabinet shop in Belmont, Ontario. Our parent business builds custom kitchens for homeowners and contractors across Southwestern Ontario; we open the same warehouse to retail customers who don&rsquo;t need the custom-design song-and-dance and just want a great kitchen, now.
        </p>
        <p>
          Every kit we sell is built from the same boxes we install in custom jobs. Solid plywood, soft-close hardware, factory-finished doors. Because we already stock these layouts, you skip the six-to-ten-week custom lead time and the design retainer that comes with most kitchen-company quotes.
        </p>
        <p>
          We&rsquo;re small enough to answer the phone. Call <a className="text-[var(--color-ink)] underline-offset-2 hover:underline" href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>{SITE.phoneDisplay}</a> and you&rsquo;ll get one of us — not a call centre, not an upsell.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/kits" className="btn-primary">Shop kitchen kits</Link>
        <Link href="/contact" className="btn-secondary">Contact us</Link>
      </div>
    </div>
  );
}
