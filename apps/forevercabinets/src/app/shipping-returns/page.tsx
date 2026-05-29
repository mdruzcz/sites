import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shipping & Returns — Cross-Canada Freight, 30-Day Returns",
  description:
    "How we ship: LTL freight across Canada in 2–3 weeks. 30-day returns on unopened cabinets. Damage policy. Freight options. Pre-assembled shipping available.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
        Shipping &amp; returns
      </p>
      <h1 className="mt-2 font-display text-4xl text-[var(--color-navy)] sm:text-5xl">
        Cross-Canada freight, easy returns
      </h1>

      <h2 className="mt-12 font-display text-2xl text-[var(--color-navy)]">Shipping</h2>
      <ul className="mt-4 space-y-3 text-[var(--color-ink-soft)]">
        <li><strong className="text-[var(--color-navy)]">Lead time:</strong> {SITE.leadTime} from order confirmation to your door.</li>
        <li><strong className="text-[var(--color-navy)]">Method:</strong> LTL freight (less-than-truckload) on a wooden pallet.</li>
        <li><strong className="text-[var(--color-navy)]">Where we ship:</strong> Every province in Canada. Remote/northern locations may carry a small fuel surcharge — we&rsquo;ll quote it in your confirmation email.</li>
        <li><strong className="text-[var(--color-navy)]">Cost:</strong> Quoted per order based on weight + postal code. Most single-cabinet orders are $80–$180; full-kitchen orders cost less per cabinet.</li>
        <li><strong className="text-[var(--color-navy)]">Delivery:</strong> Curbside, by appointment. The driver will lower the pallet from the lift gate — moving it inside is on you. Most cabinets weigh 50–80 lb in their box.</li>
        <li><strong className="text-[var(--color-navy)]">Pre-assembled option:</strong> Add 25% to ship pre-assembled. Faster setup but pricier freight (less stacking efficiency on the truck).</li>
      </ul>

      <h2 className="mt-12 font-display text-2xl text-[var(--color-navy)]">Damage policy</h2>
      <ul className="mt-4 space-y-3 text-[var(--color-ink-soft)]">
        <li>Inspect the pallet <em>before</em> signing the freight bill. If you see crushing, holes, or missing pieces, take photos.</li>
        <li>Note &ldquo;possible concealed damage&rdquo; on the bill of lading even for minor exterior dings.</li>
        <li>Email photos and the BOL number to <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a> within 48 hours — we replace damaged cabinets at our cost, no questions asked.</li>
      </ul>

      <h2 className="mt-12 font-display text-2xl text-[var(--color-navy)]">Returns</h2>
      <ul className="mt-4 space-y-3 text-[var(--color-ink-soft)]">
        <li><strong className="text-[var(--color-navy)]">Window:</strong> 30 days from delivery.</li>
        <li><strong className="text-[var(--color-navy)]">Condition:</strong> Unopened, in original packaging.</li>
        <li><strong className="text-[var(--color-navy)]">Refund:</strong> Full refund minus original freight cost (we don&rsquo;t refund the carrier&rsquo;s charge).</li>
        <li><strong className="text-[var(--color-navy)]">Restocking:</strong> No restocking fee on sealed product. 15% restocking fee on opened-but-not-assembled cabinets.</li>
        <li><strong className="text-[var(--color-navy)]">Assembled cabinets:</strong> Not returnable. (This is why we offer the sample door — you can verify the match before any cabinet is opened.)</li>
      </ul>

      <h2 className="mt-12 font-display text-2xl text-[var(--color-navy)]">Sample doors</h2>
      <p className="mt-3 text-[var(--color-ink-soft)]">
        Sample doors are shipped via Canada Post Expedited Parcel and arrive in 5–10 business days. Refundable in full on your first cabinet order — we&rsquo;ll credit you {`automatically`} when you place the order.
      </p>

      <div className="mt-16 border-t border-[var(--color-line)] pt-10">
        <p className="text-[var(--color-ink-soft)]">
          Questions about shipping to your address? <Link href="/contact" className="underline">Contact us</Link> — we&rsquo;ll get back to you the same business day.
        </p>
      </div>
    </div>
  );
}
