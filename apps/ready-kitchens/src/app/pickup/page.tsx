import type { Metadata } from "next";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pickup & Delivery — 50432 Yorke Line, Belmont ON",
  description: "Pick up your Ready Kitchens cabinet package at our Belmont, Ontario warehouse, or ask for a delivery quote anywhere in Southwestern Ontario.",
};

export default function PickupPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <header>
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Pickup &amp; Delivery</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">50432 Yorke Line, Belmont, ON</h1>
        <p className="mt-4 text-lg text-[var(--color-ink-soft)]">
          Pickup is free. Delivery is available throughout Southwestern Ontario — quoted per postal code.
        </p>
      </header>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-[var(--color-line)] bg-white p-6 shadow-sm">
          <h2 className="font-display text-2xl">Warehouse pickup</h2>
          <p className="mt-2 text-[var(--color-ink-soft)]">By appointment so we have your kit loaded and ready when you arrive.</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 font-medium">Address</dt>
              <dd>50432 Yorke Line<br />Belmont, ON {SITE.postalCode}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 font-medium">Hours</dt>
              <dd>{SITE.pickupHours}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 font-medium">Phone</dt>
              <dd><a className="underline underline-offset-2 hover:text-[var(--color-accent)]" href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>{SITE.phoneDisplay}</a></dd>
            </div>
          </dl>
          <p className="mt-6 rounded-md bg-[var(--color-paper-warm)] p-4 text-xs text-[var(--color-ink-soft)]">
            Bring a trailer or covered truck — most kits load into a 12&apos; – 16&apos; trailer with the cabinets stacked and strapped.
          </p>
        </div>

        <div className="rounded-lg border border-[var(--color-line)] bg-white p-6 shadow-sm">
          <h2 className="font-display text-2xl">Delivery</h2>
          <p className="mt-2 text-[var(--color-ink-soft)]">
            We can quote freight to anywhere in Ontario. Local delivery within ~150 km of Belmont is usually flat-rate; further afield we use Day &amp; Ross, Fedex Freight, or Loomis.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex gap-2"><span className="text-[var(--color-accent)]">•</span> Curbside delivery (driver helps unload from truck)</li>
            <li className="flex gap-2"><span className="text-[var(--color-accent)]">•</span> Cabinets shipped on pallets, shrink-wrapped &amp; corner-protected</li>
            <li className="flex gap-2"><span className="text-[var(--color-accent)]">•</span> Quote provided after you submit your order</li>
          </ul>
          <p className="mt-6 text-xs text-[var(--color-ink-soft)]">For contractor accounts with regular orders, ask us about a freight account.</p>
        </div>
      </div>

      <section className="mt-10 rounded-lg border border-[var(--color-line)] bg-[var(--color-paper-warm)] p-6">
        <h2 className="font-display text-2xl">Driving directions</h2>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">We&rsquo;re 25 minutes south of London, just east of the village of Belmont off Belmont Road. Look for the Forever Cabinets sign at the laneway — Ready Kitchens loads from the same warehouse.</p>
      </section>
    </div>
  );
}
