import Link from "next/link";
import { InstallerApplicationForm } from "@/components/installer-application-form";
import { Photo } from "@/components/photo";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/utils";

export const metadata = {
  title: "Installer Program: Bulk LED Pricing",
  description:
    "Bulk pricing, free shipping and priority peak-season stock for Christmas light installers and landscapers across Canada.",
  alternates: { canonical: `${SITE_URL}/professional-installer` },
  openGraph: {
    title: "Installer Program: Bulk LED Pricing",
    description:
      "Bulk pricing, free shipping and priority peak-season fulfillment for lighting installers across Canada.",
    url: `${SITE_URL}/professional-installer`
  }
};

const BENEFITS = [
  {
    title: "Exclusive bulk discounts",
    body: "Lower per-unit pricing on C9 bulbs, light strands, clips, connectors and complete LED housing packages."
  },
  {
    title: "Free shipping on qualifying orders",
    body: "Free Canada-wide shipping over $500, plus tier-locked discounts on smaller restock orders."
  },
  {
    title: "Priority order processing",
    body: "Faster handling and dedicated support through peak install season from October to December."
  },
  {
    title: "Reliable, tested gear",
    body: "A five-year warranty against manufacturing defects on all LED systems, so your installs hold up."
  }
];

export default function ProfessionalInstallerPage() {
  return (
    <div>
      <PageHero
        size="lg"
        photo="commercial-install-lift"
        photoAlt="Boom lift installing roofline LED lighting on a timber and stone commercial building at night"
        position="center 45%"
        crumb="Pro installers"
        eyebrow="Trade program"
        title="Professional Installer Program"
        intro="Bulk pricing, faster fulfillment and dedicated support, built for Christmas light installers, event lighting companies and landscaping crews working across Canada."
      >
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#apply" className="btn-hero group sm:min-w-[18rem]">
            Apply for installer pricing
            <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <Link href="/shop" className="btn-ghost-light min-h-[54px]">
            Browse the catalog
          </Link>
        </div>
      </PageHero>

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="grid gap-6 md:grid-cols-2 md:gap-7">
            {BENEFITS.map((b) => (
              <div key={b.title} className="card p-8">
                <h2 className="font-display text-xl">{b.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-soft)]">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
            <div>
              <p className="eyebrow-plain">Apply now</p>
              <h2 className="font-display mt-3 text-[2rem] md:text-[2.75rem]">
                Get your installer pricing.
              </h2>
              <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                Fill out the form and we will review your application and reach out within one business day
                to confirm your installer tier.
              </p>
              <Photo
                name="farmhouse-install-day"
                alt="Permanent LED lighting kit being unpacked at a farmhouse with ladders set up along the porch"
                ratio="aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 460px"
                rounded="rounded-[14px]"
                className="mt-10 hidden lg:block"
              />
              <p className="mt-8 text-sm text-[var(--color-text-soft)]">
                Buying for a city, BIA or parks department instead?{" "}
                <Link href="/municipalities" className="font-semibold text-[var(--color-gold-text)] hover:underline">
                  See the municipal program
                </Link>
                .
              </p>
            </div>

            <div className="rounded-[14px] border border-[var(--color-border)] bg-white p-7 md:p-10">
              <InstallerApplicationForm tierSlug="installer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
