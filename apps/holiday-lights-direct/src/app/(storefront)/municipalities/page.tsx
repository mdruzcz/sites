import Link from "next/link";
import { InstallerApplicationForm } from "@/components/installer-application-form";
import { Photo } from "@/components/photo";
import { SITE_URL } from "@/lib/utils";

export const metadata = {
  title: "Municipal & BIA LED Lighting Supplier in Ontario",
  description:
    "Net-30 PO invoicing, tax-exempt pricing and RFP-ready quotes on permanent LED lighting for Ontario municipalities, BIAs, parks departments and downtown improvement areas.",
  alternates: { canonical: `${SITE_URL}/municipalities` },
  openGraph: {
    title: "Municipal & BIA LED Lighting Supplier in Ontario",
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
      {/* Photo hero with a scrim — this heading used to sit on an undefined
          background colour, which rendered white text on a white page. */}
      <section className="relative isolate">
        <Photo
          name="home-wide-elevation"
          alt="Wide building elevation lit end to end with permanent LED track lighting at night"
          ratio="aspect-[16/10] md:aspect-[21/7]"
          sizes="100vw"
          priority
          scrim="strong"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="shell pb-12 md:pb-16">
            <p className="eyebrow text-[var(--color-gold-bright)]">Public sector</p>
            <h1 className="font-display mt-4 max-w-3xl text-[2.2rem] leading-tight text-white md:text-[3.5rem]">
              For Ontario municipalities &amp; BIAs
            </h1>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/80">
              Net-30 invoicing, tax-exempt pricing, RFP-friendly quotes and Canadian-stocked permanent LED
              lighting for parks departments, downtown BIAs and public works.
            </p>
          </div>
        </div>
      </section>

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
              name="install-banner"
              alt="Permanent LED lighting running the full width of a building facade"
              ratio="aspect-[3/2]"
              sizes="(max-width: 768px) 100vw, 560px"
              rounded="rounded-3xl"
            />
            <Photo
              name="home-side-elevation"
              alt="Long building elevation lit end to end with permanent LED track lighting"
              ratio="aspect-[3/2]"
              sizes="(max-width: 768px) 100vw, 560px"
              rounded="rounded-3xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
            <div>
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Get set up</p>
              <h2 className="font-display mt-6 text-[2rem] md:text-[2.75rem]">
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

            <div className="rounded-3xl border border-[var(--color-border)] bg-white p-7 md:p-10">
              <InstallerApplicationForm tierSlug="municipality" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
