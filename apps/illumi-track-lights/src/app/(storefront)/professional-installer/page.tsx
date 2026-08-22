import Link from "next/link";
import { InstallerApplicationForm } from "@/components/installer-application-form";
import { Photo } from "@/components/photo";
import { SITE_URL } from "@/lib/utils";

export const metadata = {
  title: "Installer Program — Trade Pricing on LED Soffit Track",
  description:
    "Bulk pricing, free shipping and priority peak-season fulfillment on aluminum-tracked LED soffit lighting for installers and lighting companies across Canada.",
  alternates: { canonical: `${SITE_URL}/professional-installer` },
  openGraph: {
    title: "Installer Program — Trade Pricing on LED Soffit Track",
    description:
      "Bulk pricing, free shipping and priority fulfillment for lighting installers across Canada.",
    url: `${SITE_URL}/professional-installer`
  }
};

const BENEFITS = [
  {
    title: "Exclusive bulk discounts",
    body: "Lower per-unit pricing on aluminum track, RGBW pucks, controllers, power supplies and complete soffit kits."
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
      {/* Photo hero with a scrim. This heading previously sat on
          bg-[var(--color-accent)] — a variable that was never defined — so it
          rendered as white text on a white page. */}
      <section className="relative isolate">
        <Photo
          name="banner-install"
          alt="Completed permanent LED soffit track lighting install running the full width of a home"
          ratio="aspect-[16/10] md:aspect-[21/7]"
          sizes="100vw"
          priority
          scrim="strong"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="shell pb-12 md:pb-16">
            <p className="eyebrow text-[var(--color-amber-bright)]">Trade program</p>
            <h1 className="font-display mt-4 max-w-3xl text-[2.2rem] leading-tight text-white md:text-[3.5rem]">
              Professional Installer Program
            </h1>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/80">
              Bulk pricing, faster fulfillment and dedicated support — built for permanent lighting
              installers, event lighting companies and landscaping crews working across Canada.
            </p>
          </div>
        </div>
      </section>

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

      <section className="bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
            <div>
              <p className="eyebrow eyebrow-rule text-[var(--color-amber-text)]">Apply now</p>
              <h2 className="font-display mt-6 text-[2rem] md:text-[2.75rem]">
                Get your installer pricing.
              </h2>
              <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                Fill out the form and we will review your application and reach out within one business day
                to confirm your installer tier.
              </p>
              <Photo
                name="detail-track-install"
                alt="Installer fastening aluminum LED track into a soffit"
                ratio="aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 460px"
                rounded="rounded-3xl"
                className="mt-10 hidden lg:block"
              />
              <p className="mt-8 text-sm text-[var(--color-text-soft)]">
                Looking to hire an installer instead?{" "}
                <Link href="/installers" className="font-semibold text-[var(--color-amber-text)] hover:underline">
                  Find one near you
                </Link>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-[var(--color-border)] bg-white p-7 md:p-10">
              <InstallerApplicationForm tierSlug="installer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
