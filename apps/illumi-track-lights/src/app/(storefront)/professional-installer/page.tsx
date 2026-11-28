import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { InstallerApplicationForm } from "@/components/installer-application-form";
import { photo } from "@/lib/photos";
import { BRAND, SITE_URL } from "@/lib/utils";

const PAGE_URL = `${SITE_URL}/professional-installer`;
const TITLE = "Track Lighting Installer Program";
const DESCRIPTION =
  "The Illumi installer program: tier pricing on 12V track lighting kits and parts, priority fulfilment in season, homeowner referrals and net terms for towns.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", title: `${TITLE} | ${BRAND.name}`, description: DESCRIPTION, url: PAGE_URL, images: [photo("track-residential").src] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION }
};

const BENEFITS: [string, string][] = [
  ["Tier pricing", "A lower unit price on kits, light strands, track, controllers, power supplies and connectors. Your tier is held for the season."],
  ["Stock on the shelf", `We keep track, strands and controllers in ${BRAND.city} through the season. Orders are packed within one to two business days, and you can pick up by appointment.`],
  ["Homeowner referrals", "When a homeowner asks us for an installer, we send them to program members in their area, nearest first."],
  ["Priority fulfilment", "From September to December, program orders go to the front of the queue."],
  ["One system on every job", "Everything is 12V and every part works with every other. Your crew learns it once and uses it on every house."],
  ["Net terms for municipalities", "Towns and BIAs can apply for net-30 invoicing, and for bulk quotes on projects with several buildings."]
];

export default function ProfessionalInstallerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${TITLE} | ${BRAND.name}`,
    description: DESCRIPTION,
    url: PAGE_URL,
    about: { "@id": `${SITE_URL}/#organization` },
    audience: { "@type": "BusinessAudience", audienceType: "Lighting installers, landscapers, electricians, property managers and municipalities" }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        compact
        photo="track-residential"
        eyebrow="For crews and municipalities"
        title="Install permanent lighting, and buy it at installer pricing."
        intro="Christmas light crews, landscapers, electricians and property managers across Canada fit our 12V track system. Apply, and we confirm your tier within one business day."
        crumbs={[{ label: "Installer program" }]}
      />

      <section>
        <div className="shell section">
          <h2 className="font-display h2-fluid track-title">What the program gives you</h2>
          <div className="mx-auto mt-9 grid max-w-5xl gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map(([t, b]) => (
              <div key={t} className="border-t border-[var(--color-border)] pt-4">
                <h3 className="font-display text-[1.2rem]">{t}</h3>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-[var(--color-text-soft)]">{b}</p>
              </div>
            ))}
          </div>
          <p className="note mx-auto mt-10 max-w-3xl">
            <strong>Shipping and pickup.</strong> Program orders ship free anywhere in Canada like every other order, or you can collect them at {BRAND.address}. <Link href="/shipping-returns#pickup" className="text-link">How pickup works</Link>.
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell section grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
          <div>
            <p className="eyebrow text-[var(--color-gold-text)]">Apply</p>
            <h2 className="font-display h2-fluid mt-2">Tell us about your business.</h2>
            <div className="mt-4 space-y-4 text-[var(--color-text-soft)]">
              <p>
                We read every application ourselves. Within one business day you get an email that confirms your tier and sets up your account.
              </p>
              <p>
                New to the hardware? <Link href="/how-it-works" className="text-link">How it goes together</Link> and <Link href="/shop" className="text-link">the parts list</Link> show what your crew would be working with, and <Link href="/brands" className="text-link">the brand comparison</Link> shows where it sits beside the dealer systems.
              </p>
            </div>
          </div>
          <InstallerApplicationForm tierSlug="installer" />
        </div>
      </section>
    </>
  );
}
