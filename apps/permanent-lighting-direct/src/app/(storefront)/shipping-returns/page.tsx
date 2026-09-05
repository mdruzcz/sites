import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shipping & Returns: Free Canada-Wide Over $500",
  description: "Permanent Lighting Direct ships from London, Ontario within two business days. Free shipping across Canada on orders over $500, 30-day returns on unused items.",
  alternates: { canonical: `${SITE_URL}/shipping-returns` }
};

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHero photo="install-technician" eyebrow="Shipping & returns" title="Out the door in two business days." crumbs={[{ label: "Shipping & returns" }]} compact />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="prose-clean max-w-[72ch] text-[var(--color-text-soft)]">
            <h2>Shipping</h2>
            <p>Every order ships from our warehouse in London, Ontario. Orders placed before noon Eastern usually leave the same or next business day; everything else within two business days. You receive a tracking number by email.</p>
            <ul>
              <li><strong>Free shipping</strong> on orders over $500 CAD anywhere in Canada. Every complete kit qualifies.</li>
              <li>Ontario and Quebec: typically 2 to 4 business days.</li>
              <li>Atlantic, Prairies and BC: typically 4 to 8 business days.</li>
              <li>Territories and remote postal codes: quoted at checkout.</li>
            </ul>
            <p>Kits ship in one or two boxes depending on size. Track is packed in a rigid carton; pucks, controller and connectors ship inside the same shipment.</p>
            <h2>Returns</h2>
            <p>Unused items in their original packaging can be returned within 30 days of delivery for a full refund of the product price. Kits must be complete with every component. Return shipping is at the customer's expense and we recommend a tracked service.</p>
            <p>Opened electronics (controllers, power supplies) that have been powered up are exchanged under warranty rather than refunded.</p>
            <h2>Damaged or missing items</h2>
            <p>Inspect the shipment on arrival. If anything is damaged or missing, email a photo within seven days and we ship the replacement immediately.</p>
            <h2>Outside Canada</h2>
            <p>We do not ship to the United States at the moment. <Link href="/contact-us">Contact us</Link> about larger commercial orders.</p>
          </article>
          <aside className="space-y-4">
            <div className="card p-6">
              <p className="eyebrow text-[var(--color-accent-dark)]">At a glance</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-soft)]">
                <li>Ships from London, ON</li>
                <li>Free over $500, Canada-wide</li>
                <li>1–2 business days handling</li>
                <li>30-day returns, unused</li>
              </ul>
            </div>
            <Link href="/track-order" className="btn-primary w-full">Track an order</Link>
            <Link href="/warranty" className="btn-secondary w-full">Warranty</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
