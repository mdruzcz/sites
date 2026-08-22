import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/utils";

export const metadata = {
  title: "5-Year LED Warranty — Holiday Lights Direct",
  description:
    "Every LED system we sell carries a five-year warranty against manufacturing defects. See what is covered, what is not, and how to start a claim from London, Ontario.",
  alternates: { canonical: `${SITE_URL}/warranty` },
  openGraph: {
    title: "5-Year LED Warranty — Holiday Lights Direct",
    description: "Five years of coverage against manufacturing defects on every LED system we sell.",
    url: `${SITE_URL}/warranty`
  }
};

export default function WarrantyPage() {
  return (
    <>
      <PageHero
        photo="home-example-3"
        photoAlt="Modern home with warm permanent LED accent lighting along the roof and garage"
        eyebrow="Coverage"
        title="5-year warranty"
        intro="If a component fails from a manufacturing defect within five years of purchase, we repair or replace it at no cost to you."
        crumb="Warranty"
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="card p-8">
                <h2 className="font-display text-xl text-[var(--color-green)]">What is covered</h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--color-text-soft)]">
                  <li>LED pucks, tracks and housings that fail from a manufacturing defect</li>
                  <li>Controllers and power supplies that fail in normal use</li>
                  <li>Connectors, cables and injection leads supplied in the kit</li>
                  <li>Repair or replacement, at no cost, for five years from purchase</li>
                </ul>
              </div>
              <div className="card p-8">
                <h2 className="font-display text-xl text-[var(--color-red)]">What is not covered</h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--color-text-soft)]">
                  <li>Damage from improper installation</li>
                  <li>Electrical surges and lightning strikes</li>
                  <li>Normal wear, discolouration and cosmetic marks</li>
                  <li>Physical damage from ladders, ice removal or roof work</li>
                </ul>
              </div>
            </div>

            <div className="prose-clean mt-14">
              <h2 className="font-display text-2xl">Starting a claim</h2>
              <p className="mt-4">
                Email{" "}
                <a href="mailto:service@masterdecker.com">service@masterdecker.com</a> with your order
                number and a short description of the fault. A photo or short video of the failure speeds
                things up considerably. We will confirm the claim and arrange the repair or replacement from
                our London, Ontario warehouse.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/contact-us" className="btn-primary">
                Contact us
              </Link>
              <Link href="/shipping-returns" className="btn-secondary">
                Shipping &amp; returns
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
