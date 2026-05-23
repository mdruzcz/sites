import type { Metadata } from "next";
import { getAllKits } from "@/lib/kits";
import { KitCard } from "@/components/kit-card";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kitchen Kits — Complete White Shaker Packages",
  description: `Six complete ${SITE.name} packages — galley, L-shape, U-shape, single-wall, and island. Fully assembled and ready for pickup in Belmont, ON.`,
  openGraph: {
    title: `Kitchen Kits — ${SITE.name}`,
    description: "Complete pre-built White Shaker kitchen cabinet packages in stock now.",
  },
};

export default function KitsPage() {
  const kits = getAllKits();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <header className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">All Kits</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Complete White Shaker kitchens, ready today.</h1>
        <p className="mt-4 text-lg text-[var(--color-ink-soft)]">
          Six packages — each one is a complete kitchen of plywood-box cabinets, assembled and waiting at our Belmont, ON warehouse. Add to cart, submit your order, and we&rsquo;ll confirm pickup or delivery before any payment.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {kits.map((kit) => (
          <KitCard key={kit.slug} kit={kit} />
        ))}
      </div>

      <section className="mt-16 rounded-lg border border-[var(--color-line)] bg-[var(--color-paper-warm)] p-8 text-center">
        <h2 className="font-display text-2xl">Need something different?</h2>
        <p className="mx-auto mt-2 max-w-xl text-[var(--color-ink-soft)]">
          Additional individual cabinets may be ordered based on availability — talk to us about mixing and matching, or about a full custom Forever Cabinets kitchen.
        </p>
        <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="btn-secondary mt-5">
          Call {SITE.phoneDisplay}
        </a>
      </section>
    </div>
  );
}
