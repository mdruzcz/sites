import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceAreas } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas | Concrete Contractor in Brantford & Brant County",
  description: "Total Brantford Concrete serves Brantford, Paris, Cambridge, Hamilton, Caledonia, and all of Brant County with expert concrete driveways, patios, and repairs.",
  openGraph: {
    title: "Service Areas | Total Brantford Concrete",
    description: "We serve Brantford, Paris, Cambridge, Hamilton, Caledonia, and surrounding communities.",
    url: `${site.url}/service-areas`,
  },
};

export default function ServiceAreasPage() {
  const areas = getServiceAreas();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Service Areas", url: `${site.url}/service-areas` },
          ])),
        }}
      />

      <section className="bg-[var(--charcoal)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="eyebrow">Where We Work</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl max-w-3xl">
            Serving <span className="text-[var(--accent)]">Brantford</span> & Brant County
          </h1>
          <p className="text-[var(--concrete-200)] text-lg mt-4 max-w-2xl normal-case font-normal">
            We provide expert concrete services throughout Brantford and the surrounding communities of Brant County and beyond.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="All Locations" title="Our Service Area" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-lg uppercase tracking-tight text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors">
                    {city.name}, {city.province}
                  </h2>
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <p className="text-sm text-[var(--concrete)] leading-relaxed">{city.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
