import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shipping & Returns: Free Within 200 km, $200 Flat Canada",
  description: "Permanent Lighting Direct ships within two business days. Free shipping within 200 km of our Belmont, Ontario shop, $200 flat rate across Canada, 30-day returns.",
  alternates: { canonical: `${SITE_URL}/shipping-returns` }
};

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHero photo="soffit-lights-installed" eyebrow="Shipping & returns" title="Out the door in two business days." crumbs={[{ label: "Shipping & returns" }]} compact />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="prose-clean max-w-[72ch] text-[var(--color-text-soft)]">
            <h2>Shipping</h2>
            <p>Every order ships from our shop in Belmont, just south of London, Ontario. Orders placed before noon Eastern usually leave the same or next business day; everything else within two business days. You receive a tracking number by email.</p>
            <ul>
              <li><strong>Free shipping within 200 km</strong> of our Belmont shop: London, Windsor, Sarnia, Kitchener-Waterloo, Hamilton, Niagara and most of the GTA. Distance is measured straight-line to your postal code, and checkout tells you before you pay.</li>
              <li><strong>$200 flat rate</strong> anywhere else in Canada, whatever the order size.</li>
              <li>GST or HST for your province is added at checkout. Orders are invoiced by our billing company, Master Decker Inc.</li>
              <li>Ontario and Quebec: typically 2 to 4 business days.</li>
              <li>Atlantic, Prairies and BC: typically 4 to 8 business days.</li>
              <li>Territories and remote postal codes: 1 to 3 weeks.</li>
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
                <li>Ships from Belmont, ON</li>
                <li>Free within 200 km, $200 flat elsewhere</li>
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
