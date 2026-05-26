import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceAreas, getCitiesByTier } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "HVAC Service Areas | Oxford County & Southwestern Ontario",
  description: `${site.name} serves Woodstock, Ingersoll, Tillsonburg, Norwich, Brantford, and 12+ communities across Oxford County and southwestern Ontario. TSSA-certified HVAC service.`,
};

export const revalidate = 3600;

const tiers = [
  { tier: 1, label: "Oxford County — Primary Service Area", desc: "Same-day service, fastest response" },
  { tier: 2, label: "Brant & Norfolk Counties", desc: "Full service, scheduled same-week" },
  { tier: 3, label: "Greater Region", desc: "Available for installations and major projects" },
];

export default function ServiceAreasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Service Areas", url: `${site.url}/service-areas` },
            ])
          ),
        }}
      />
      <section className="bg-[var(--navy)] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow-cool">Where We Work</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            HVAC Service Areas
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Based in Burgessville, Oxford County. We serve communities across Oxford, Brant, Norfolk, Elgin, and Middlesex counties.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {tiers.map(({ tier, label, desc }) => {
            const cities = getCitiesByTier(tier);
            return (
              <div key={tier}>
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-[var(--navy)]">{label}</h2>
                  <p className="text-[var(--slate)] text-sm mt-1">{desc}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cities.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/service-areas/${area.slug}`}
                      className="card p-5 hover:shadow-md hover:border-[var(--cool)] transition-all group"
                    >
                      <h3 className="font-bold text-[var(--navy)] group-hover:text-[var(--heat)] transition-colors mb-1">
                        {area.city}
                      </h3>
                      <p className="text-xs text-[var(--slate)] mb-2">{area.county}</p>
                      <p className="text-sm text-[var(--slate)] leading-relaxed">{area.description.slice(0, 100)}…</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--navy)] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            Don&apos;t See Your City?
          </h2>
          <p className="text-white/70 mb-6">
            Call us — we may still be able to serve your area, especially for larger projects or heat pump installations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={site.phoneHref} className="btn btn-primary">{site.phone}</a>
            <Link href="/contact" className="btn btn-outline-white">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
