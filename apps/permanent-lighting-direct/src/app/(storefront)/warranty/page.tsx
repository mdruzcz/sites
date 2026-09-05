import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "5-Year Parts Warranty on Permanent Lighting Kits",
  description: "Every Permanent Lighting Direct kit and component carries a five-year parts warranty against manufacturing defects. What is covered, what is not, and how to make a claim.",
  alternates: { canonical: `${SITE_URL}/warranty` }
};

export default function WarrantyPage() {
  return (
    <>
      <PageHero photo="soffit-lights-perm2" eyebrow="Warranty" title="Five years on parts. No fine print games." crumbs={[{ label: "Warranty" }]} compact />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="prose-clean max-w-[72ch] text-[var(--color-text-soft)]">
            <h2>What is covered</h2>
            <p>If any kit component or individually purchased part fails because of a manufacturing defect within five years of the purchase date, we repair or replace it at no charge. That includes puck strands, aluminum track, controllers, power supplies, connectors, T-connectors, amplifiers and cables.</p>
            <h2>What is not covered</h2>
            <ul>
              <li>Damage from improper installation, including track mounted without the supplied screws or connectors left unsealed.</li>
              <li>Electrical surges, lightning, or connection to any supply other than a 12V constant-voltage LED driver.</li>
              <li>Physical damage from ladders, ice removal tools, roof work or animals.</li>
              <li>Normal cosmetic wear such as minor fading of track paint over many years.</li>
              <li>Firmware changes made outside the standard WLED app.</li>
            </ul>
            <h2>How to make a claim</h2>
            <p>Email <a href="mailto:service@masterdecker.com">service@masterdecker.com</a> with your order number, a description of the fault and a photo or short video. Most claims are resolved by shipping a replacement part within two business days; we may ask for the faulty part back at our expense.</p>
            <h2>Extending the system</h2>
            <p>Parts added later carry their own five-year term from their purchase date, so an extension does not shorten the coverage on the original kit.</p>
          </article>
          <aside className="space-y-4">
            <div className="card p-6 text-center">
              <p className="font-display text-7xl text-[var(--color-ink)]">5</p>
              <p className="eyebrow text-[var(--color-muted)]">years parts coverage</p>
              <hr className="hairline my-5" />
              <p className="text-sm text-[var(--color-text-soft)]">Support and shipping from London, Ontario. Real people, one business day.</p>
            </div>
            <Link href="/contact-us" className="btn-primary w-full">Start a claim</Link>
            <Link href="/shipping-returns" className="btn-secondary w-full">Shipping & returns</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
