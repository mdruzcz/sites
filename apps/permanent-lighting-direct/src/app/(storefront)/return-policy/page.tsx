import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/utils";

const RETURNS_EMAIL = "sales@permanentlightingdirect.ca";

export const metadata: Metadata = {
  title: "Return Policy: Defective Products Only",
  description:
    "Permanent Lighting Direct accepts returns of defective products only. Report a defect within 30 days of delivery for a free replacement or refund. After that, the 5-year warranty applies.",
  alternates: { canonical: `${SITE_URL}/return-policy` }
};

export default function ReturnPolicyPage() {
  return (
    <>
      <PageHero photo="soffit-lights-installed" eyebrow="Return policy" title="Returns for defective products only." crumbs={[{ label: "Return policy" }]} compact />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="prose-clean max-w-[72ch] text-[var(--color-text-soft)]">
            <p>
              Every kit is cut, counted and tested for your roofline before it ships, so we accept returns only for products that are
              defective. We do not accept returns of working products, including change-of-mind returns, wrong size ordered, or leftover
              parts after an install.
            </p>

            <h2>What counts as defective</h2>
            <ul>
              <li>A puck, controller, power supply, amplifier or connector that does not work when installed and powered as described in our instructions.</li>
              <li>Track or hardware that arrives with a manufacturing flaw that stops it being installed.</li>
              <li>Items damaged in shipping, or missing from your order (see below).</li>
            </ul>
            <p>
              Products are not defective because of installation damage, cutting, water entry from an unsealed connection, use with a
              non-12V power source, or wear and weathering after installation.
            </p>

            <h2>How long you have</h2>
            <p>
              Report a defect within <strong>30 days of delivery</strong>. Within that window we will, at your choice, ship a replacement
              part or refund the price of the defective item to your original payment method. After 30 days, defects are covered by our{" "}
              <Link href="/warranty">5-year parts warranty</Link>, which provides a replacement part.
            </p>

            <h2>How to start a return</h2>
            <ol>
              <li>
                Email <a href={`mailto:${RETURNS_EMAIL}`}>{RETURNS_EMAIL}</a> with your order number (PLD-…), which item is defective,
                and a photo or short video showing the problem.
              </li>
              <li>We reply within one business day. Many problems are a loose connector or a controller setting, and we will help you check those first.</li>
              <li>If the item is defective, we send a <strong>prepaid return label</strong>. You pay nothing to return a defective product.</li>
              <li>
                Replacements ship as soon as the defect is confirmed, often before the return arrives. Refunds are issued within 5
                business days of receiving the returned item.
              </li>
            </ol>
            <p>Return the defective item only, not the whole kit, unless we ask for it. Please keep the original packaging where you can.</p>

            <h2>Damaged or missing items</h2>
            <p>
              Inspect your shipment when it arrives. If anything is damaged in transit or missing, email a photo to{" "}
              <a href={`mailto:${RETURNS_EMAIL}`}>{RETURNS_EMAIL}</a> within seven days of delivery and we ship the replacement right away at no
              charge.
            </p>

            <h2>Exchanges</h2>
            <p>
              A defective item is exchanged for the same item. We do not exchange working products for a different size or colour; if you
              need extra track, pucks or connectors, they are available individually in the <Link href="/shop">shop</Link>.
            </p>

            <h2>Questions</h2>
            <p>
              Email <a href={`mailto:${RETURNS_EMAIL}`}>{RETURNS_EMAIL}</a> or use our <Link href="/contact-us">contact form</Link>. Orders are
              invoiced by Master Decker Inc., 50432 Yorke Line, Belmont, Ontario N0L 1B0.
            </p>
          </article>
          <aside className="space-y-4">
            <div className="card p-6">
              <p className="eyebrow text-[var(--color-accent-dark)]">At a glance</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-soft)]">
                <li>Defective products only</li>
                <li>Report within 30 days of delivery</li>
                <li>Free return shipping (prepaid label)</li>
                <li>Replacement or refund, your choice</li>
                <li>After 30 days: 5-year warranty</li>
              </ul>
            </div>
            <Link href="/warranty" className="btn-primary w-full">Warranty</Link>
            <Link href="/shipping-returns" className="btn-secondary w-full">Shipping</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
