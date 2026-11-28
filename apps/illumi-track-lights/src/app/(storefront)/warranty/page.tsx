import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { photo } from "@/lib/photos";
import { BRAND, SITE_URL } from "@/lib/utils";

const PAGE_URL = `${SITE_URL}/warranty`;
const TITLE = "5-Year Parts Warranty on Track Lights";
const DESCRIPTION =
  "Every Illumi track lighting kit and part carries a five-year parts warranty against manufacturing defects. What it covers, what it excludes and how to claim.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", title: `${TITLE} | ${BRAND.name}`, description: DESCRIPTION, url: PAGE_URL, images: [photo("soffit-lights-perm2").src] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION }
};

const COVERED_PARTS = ["Light strands", "Aluminum track", "Controllers", "Power supplies", "Connectors", "T-connectors", "Amplifiers", "Cables"];

const NOT_COVERED: string[] = [
  "Damage from improper installation. That includes track put up without the screws we supply, and connectors left unsealed.",
  "Electrical surges and lightning, and any part that has been connected to something other than a 12V constant-voltage LED driver.",
  "Physical damage from ladders, ice removal tools, roof work or animals.",
  "Ordinary cosmetic wear, such as slight fading of the track paint over many years.",
  "Firmware changes made outside the standard WLED app."
];

/** The same four answers feed the page and its FAQPage markup. */
const QA: { q: string; a: string }[] = [
  {
    q: "What does the warranty cover?",
    a: "If a part fails because of a manufacturing defect within five years of the date you bought it, we repair or replace it at no charge. That applies to every part in a kit and to every part bought singly: light strands, aluminum track, controllers, power supplies, connectors, T-connectors, amplifiers and cables."
  },
  {
    q: "What is not covered?",
    a: NOT_COVERED.join(" ")
  },
  {
    q: "How do I make a warranty claim?",
    a: `Email ${BRAND.email} with your order number, a description of the fault and a photo or short video. Most claims are settled by shipping a replacement part within two business days. We may ask for the faulty part back, and if we do, we pay for the return.`
  },
  {
    q: "If I add to the system later, what happens to the warranty?",
    a: "Parts you add later carry their own five-year term from the day you buy them. Extending the system does not shorten the coverage on the original kit."
  }
];

export default function WarrantyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QA.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        compact
        photo="soffit-lights-perm2"
        eyebrow="Warranty"
        title="Five years on parts, written out in full."
        intro="What we replace, what we do not, and how to make a claim. It fits on one page."
        crumbs={[{ label: "Warranty" }]}
      />

      <section>
        <div className="shell section grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-14">
          <article className="max-w-[72ch]">
            <div className="space-y-4 text-[1.0625rem] text-[var(--color-text-soft)]">
              <p>
                <strong className="text-[var(--color-text)]">Short answer:</strong> if a part fails from a manufacturing defect inside five years, we repair or replace it and you pay nothing.
              </p>
              <p>
                <strong className="text-[var(--color-text)]">Long answer:</strong> the terms below are the whole warranty. It covers defects in the parts. It does not cover damage from how the parts were installed or from what happened to them afterwards.
              </p>
            </div>

            <h2 className="font-display h3-fluid mt-10">{QA[0].q}</h2>
            <p className="mt-3 text-[var(--color-text-soft)]">
              If a part fails because of a manufacturing defect within five years of the date you bought it, we repair or replace it at no charge. That applies to every part in a kit and to every part bought singly.
            </p>
            <div className="mt-5 overflow-x-auto border border-[var(--color-border)]">
              <table className="table-clean min-w-[22rem]">
                <caption className="sr-only">Parts covered by the five-year warranty</caption>
                <thead>
                  <tr>
                    <th scope="col">Part</th>
                    <th scope="col">Covered for</th>
                  </tr>
                </thead>
                <tbody>
                  {COVERED_PARTS.map((p) => (
                    <tr key={p}>
                      <th scope="row" className="font-semibold">{p}</th>
                      <td>Five years from the purchase date</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-display h3-fluid mt-10">{QA[1].q}</h2>
            <ul className="mt-3 ml-5 list-disc space-y-2 text-[var(--color-text-soft)] marker:text-[var(--color-gold)]">
              {NOT_COVERED.map((n) => (
                <li key={n} className="pl-1">{n}</li>
              ))}
            </ul>

            <h2 id="claim" className="font-display h3-fluid mt-10 scroll-mt-28">{QA[2].q}</h2>
            <ol className="mt-3 ml-5 list-decimal space-y-2 text-[var(--color-text-soft)] marker:font-semibold marker:text-[var(--color-ink)]">
              <li className="pl-1">
                Email <a href={`mailto:${BRAND.email}`} className="text-link">{BRAND.email}</a>, or use the <Link href="/contact-us" className="text-link">contact form</Link> and choose &ldquo;Warranty claim&rdquo;.
              </li>
              <li className="pl-1">Include your order number, a description of the fault and a photo or short video.</li>
              <li className="pl-1">Most claims are settled by shipping a replacement part within two business days.</li>
            </ol>
            <p className="note mt-5">
              <strong>Returning the faulty part.</strong> We may ask for it back. If we do, we pay for the return.
            </p>

            <h2 className="font-display h3-fluid mt-10">{QA[3].q}</h2>
            <p className="mt-3 text-[var(--color-text-soft)]">{QA[3].a}</p>

            <h2 className="font-display h3-fluid mt-10">Had it installed by our crew?</h2>
            <p className="mt-3 text-[var(--color-text-soft)]">
              The parts carry this same five-year warranty, and our own installs are covered for workmanship as well. <Link href="/installation" className="text-link">More about installation</Link>.
            </p>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <div className="border border-[var(--color-border)] p-5 md:p-6">
              <h2 className="eyebrow text-[var(--color-gold-text)]">At a glance</h2>
              <dl className="mt-3 text-[0.95rem]">
                {[
                  ["Term", `${BRAND.warrantyYears} years from the purchase date`],
                  ["Covers", "Manufacturing defects in any kit part or single part"],
                  ["Remedy", "Repair or replacement, at no charge"],
                  ["To claim", "Order number, the fault, a photo or short video"]
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-[var(--color-border)] py-3 first:border-t-0 first:pt-0">
                    <dt className="eyebrow text-[var(--color-text-soft)]">{k}</dt>
                    <dd className="mt-0.5 text-[var(--color-text)]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="grid gap-3">
              <Link href="/contact-us" className="btn-primary w-full">Start a claim</Link>
              <Link href="/shipping-returns" className="btn-secondary w-full">Shipping and returns</Link>
            </div>
            <p className="text-sm text-[var(--color-text-soft)]">
              Comparing warranties across brands? <Link href="/brands" className="text-link">The brand comparison</Link> lists what each maker publishes.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
