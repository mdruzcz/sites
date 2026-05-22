import type { Metadata } from "next";
import Link from "next/link";
import { getServiceAreas } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas | Brantford, Paris, Cambridge & More",
  description: "We serve Brantford, Paris, Cambridge, Hamilton, St. George, and all of Brant County with professional retaining wall installation and repair services.",
};

export const revalidate = 3600;

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

      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow !text-[var(--accent)]">Where We Work</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Service Areas
          </h1>
          <p className="text-[var(--concrete-200)] max-w-2xl mx-auto leading-relaxed">
            Proudly serving {areas.region} with professional retaining wall installation, repair, and hardscaping services.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-6 hover:shadow-md transition-shadow group"
              >
                <h2 className="font-bold text-lg uppercase tracking-wide text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors mb-2">
                  {city.name}, ON
                </h2>
                <p className="text-xs text-[var(--concrete)] mb-2">Population: {city.population}</p>
                <p className="text-sm text-[var(--concrete)] leading-relaxed">{city.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--accent)] mt-3">
                  View Services
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
