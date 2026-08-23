import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { QuoteForm } from "@/components/QuoteForm";
import { services, serviceAreas } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

const TITLE = "Commercial Christmas Light Installation — Southwestern Ontario";
const DESCRIPTION =
  "Insured commercial Christmas decor installation across Southwestern Ontario. Design, install, in-season maintenance, January takedown and off-season storage on one contract.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/installation` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${site.url}/installation` }
};

const CLIENTS = [
  ["Retail plazas & malls", "Entrance wreaths, roofline runs and a centrepiece tree that pulls traffic off the road."],
  ["Municipalities & BIAs", "Downtown streetscapes, civic squares and pole motifs, quoted to suit a purchase order."],
  ["Office & industrial parks", "Clean architectural lighting that reads professional rather than seasonal."],
  ["Hotels & restaurants", "Entrances, patios and photo-op pieces that guests actually post."],
  ["Property management", "Multi-site programs on one contract, one schedule and one invoice."],
  ["Dealerships & showrooms", "High-visibility frontage lighting sized for highway sightlines."]
];

export default function InstallationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Commercial Christmas decor installation",
    provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone, url: site.url },
    areaServed: site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
    description: DESCRIPTION
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        photo="tree-lighting-row"
        photoAlt="Row of large illuminated commercial Christmas trees lighting a property at night"
        eyebrow="Installation & service"
        title="We install it, service it and take it down."
        intro="Design, installation, in-season maintenance, January takedown and off-season storage — on one contract with one contractor."
        crumbs={[{ name: "Installation", href: "/installation" }]}
      />

      {/* Services */}
      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="grid gap-6 md:grid-cols-2 md:gap-7">
            {services.map((s, i) => (
              <div key={s.slug} className="reveal-sm card p-8">
                <span className="font-display text-sm font-bold tracking-[0.2em] text-[var(--color-gold-text)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display mt-3 text-xl">{s.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-soft)]">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work for */}
      <section className="bg-[var(--color-surface)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <Photo name="wreath-building-front" ratio="aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 480px" rounded="rounded-3xl" className="shadow-[var(--shadow-lg)]" />
            <div className="reveal">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Who we work for</p>
              <h2 className="font-display h2-fluid mt-6">Commercial and municipal only.</h2>
              <p className="lead mt-6 text-[var(--color-text-soft)]">
                We do not do houses. Everything here is built and priced for properties where the decor has
                to survive a season of weather, meet insurance requirements and go up without disrupting
                trading hours.
              </p>
              <dl className="mt-10 space-y-6">
                {CLIENTS.map(([t, d]) => (
                  <div key={t} className="reveal-sm border-l-2 border-[var(--color-gold)] pl-5">
                    <dt className="font-semibold">{t}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-soft)]">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Season timeline */}
      <section className="bg-[var(--color-ink-deep)]">
        <div className="shell section">
          <div className="reveal max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-bright)]">The season</p>
            <h2 className="font-display h2-fluid mt-6 text-white">Book early, or wait a year.</h2>
            <p className="lead mt-6 text-white/70">
              Commercial install calendars fill from the top down. Mega trees and custom fabrication get
              locked first because they have the longest lead times.
            </p>
          </div>
          <ol className="mt-14 grid gap-7 md:grid-cols-4">
            {[
              ["June", "Booking opens", "Site walks, drawings and quotes. Custom fabrication is scheduled."],
              ["Sept – Nov", "Installation", "Crews on site, scheduled around your operating hours."],
              ["Dec", "In season", "One call and we are back out for outages or storm damage."],
              ["January", "Takedown", "Removed, inspected, repaired, labelled and stored for next year."]
            ].map(([when, what, detail]) => (
              <li key={what} className="reveal-sm rounded-2xl border border-white/12 bg-white/5 p-7">
                <p className="eyebrow text-[var(--color-gold-bright)]">{when}</p>
                <h3 className="font-display mt-3 text-lg text-white">{what}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Areas + quote */}
      <section className="bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="reveal">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Coverage</p>
              <h2 className="font-display h2-fluid mt-6">Across Southwestern Ontario.</h2>
              <ul className="mt-9 flex flex-wrap gap-2.5">
                {serviceAreas.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/service-areas/${a.slug}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-border)] bg-white px-4 text-sm text-[var(--color-text-soft)] transition hover:border-[var(--color-green)] hover:text-[var(--color-green)]"
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-9 text-sm text-[var(--color-text-soft)]">
                Certificates of insurance and WSIB clearance available on request for your vendor file.
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--color-border)] bg-white p-7 md:p-10">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
