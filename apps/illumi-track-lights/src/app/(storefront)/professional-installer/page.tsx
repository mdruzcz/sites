import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { InstallerApplicationForm } from "@/components/installer-application-form";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Installer Program: Tier Pricing on 12V Permanent Lighting",
  description: "Join the Illumi Track Lights installer program for tier pricing on 12V kits and parts, priority fulfilment in season, homeowner referrals and net terms for municipalities. Ships from London, Ontario.",
  alternates: { canonical: `${SITE_URL}/professional-installer` }
};

const BENEFITS: [string, string][] = [
  ["Tier pricing", "Lower per-unit pricing on kits, puck strands, track, controllers, power and connectors, locked to your tier for the season."],
  ["Stock that is actually in stock", "We hold track, strands and controllers in London, Ontario through the season, so a Tuesday order is on your truck by Thursday."],
  ["Homeowner referrals", "Homeowners who ask us for an installer are sent to program members in their area, in order of proximity."],
  ["Priority fulfilment", "Program orders jump the queue from September to December."],
  ["One system, every job", "All 12V, all compatible, same parts on every house. Your crew learns it once."],
  ["Net terms for municipalities", "Towns and BIAs can apply for net-30 invoicing and bulk quotes on multi-building projects."]
];

export default function ProfessionalInstallerPage() {
  return (
    <>
      <PageHero photo="track-residential" eyebrow="For pros & municipalities" title="Sell permanent lighting. Buy it at installer pricing." intro="Christmas-light crews, landscapers, electricians and property managers across Canada fit our 12V track-and-puck system. Apply for the program and we confirm your tier within one business day." crumbs={[{ label: "Installer program" }]} />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="grid gap-5 md:grid-cols-3">
            {BENEFITS.map(([t, b]) => (
              <div key={t} className="card p-6">
                <h2 className="font-display text-xl">{t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-soft)]">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[var(--color-surface)]">
        <div className="shell section grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Apply</p>
            <h2 className="font-display h2-fluid mt-5">Tell us about your business.</h2>
            <p className="mt-4 text-[var(--color-text-soft)]">We review every application by hand and email you within one business day to confirm your tier and set up your account.</p>
          </div>
          <div>
            <InstallerApplicationForm tierSlug="installer" />
          </div>
        </div>
      </section>
    </>
  );
}
