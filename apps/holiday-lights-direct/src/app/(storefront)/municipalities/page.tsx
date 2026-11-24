import Link from "next/link";
import { InstallerApplicationForm } from "@/components/installer-application-form";
import { Photo } from "@/components/photo";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/utils";

export const metadata = {
  title: "Municipal & BIA Lighting Supplier",
  description:
    "Net-30 PO invoicing, tax-exempt pricing and RFP-ready quotes on permanent LED lighting for Ontario municipalities, BIAs and parks.",
  alternates: { canonical: `${SITE_URL}/municipalities` },
  openGraph: {
    title: "Municipal & BIA Lighting Supplier",
    description:
      "Net-30 invoicing, tax-exempt pricing and RFP-ready quotes on permanent LED lighting for Ontario municipalities and BIAs.",
    url: `${SITE_URL}/municipalities`
  }
};

const PILLARS = [
  {
    title: "Net-30 invoicing",
    body: "Issue a PO and receive an invoice with 30-day terms. No credit card required for municipal orders."
  },
  {
    title: "Tax-exempt pricing",
    body: "Upload your tax-exemption certificate once and your account is flagged for the right tax handling on every order after that."
  },
  {
    title: "RFP-ready quotes",
    body: "Need a formal quote for tender? Send us the linear footage and we respond with line-item pricing within 24 hours."
  }
];

export default function MunicipalitiesPage() {
  return (
    <div>
      <PageHero
        size="lg"
        photo="commercial-gable-install"
        photoAlt="Commercial building at night with lit wreaths, wrapped posts and roofline lighting"
        position="center 40%"
        crumb="Municipalities"
        eyebrow="Public sector"
        title={<>For Ontario municipalities &amp; BIAs</>}
        intro="Net-30 invoicing, tax-exempt pricing, RFP-friendly quotes and Canadian-stocked permanent LED lighting for parks departments, downtown BIAs and public works."
      >
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#register" className="btn-hero group sm:min-w-[18rem]">
            Register your organization
            <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <Link href="/contact-us" className="btn-ghost-light min-h-[54px]">
            Ask for a quote
          </Link>
        </div>
      </PageHero>

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="grid gap-6 md:grid-cols-3 md:gap-7">
            {PILLARS.map((p) => (
              <div key={p.title} className="card p-8">
                <h2 className="font-display text-xl">{p.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-soft)]">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-7">
            <Photo
              name="commercial-gable-wreaths"
              alt="Shingled commercial gable at night outlined in warm white LED lights with two lit wreaths"
              ratio="aspect-[3/2]"
              sizes="(max-width: 768px) 100vw, 560px"
              rounded="rounded-[14px]"
            />
            <Photo
              name="home-side-elevation"
              alt="Long building elevation lit end to end with permanent LED track lighting"
              ratio="aspect-[3/2]"
              sizes="(max-width: 768px) 100vw, 560px"
              rounded="rounded-[14px]"
            />
          </div>
        </div>
      </section>

      <section id="register" className="bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
            <div>
              <p className="eyebrow-plain">Get set up</p>
              <h2 className="font-display mt-3 text-[2rem] md:text-[2.75rem]">
                Register your municipality.
              </h2>
              <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                Tell us about your organization and we will set up your account and email you the next steps,
                including tax-exemption handling and PO terms.
              </p>
              <p className="mt-8 text-sm text-[var(--color-text-soft)]">
                Installing for private clients instead?{" "}
                <Link
                  href="/professional-installer"
                  className="font-semibold text-[var(--color-gold-text)] hover:underline"
                >
                  See the installer program
                </Link>
                .
              </p>
            </div>

            <div className="rounded-[14px] border border-[var(--color-border)] bg-white p-7 md:p-10">
              <InstallerApplicationForm tierSlug="municipality" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
