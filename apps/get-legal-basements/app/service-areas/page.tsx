import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceAreas } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Service Areas — London & Southwestern Ontario",
  description: `${site.name} serves London, St. Thomas, Woodstock, Strathroy, Tillsonburg, Ingersoll, and surrounding communities with legal basement apartments and renovations.`,
};

export const revalidate = 3600;

export default function ServiceAreasPage() {
  const areas = getServiceAreas();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Service Areas", url: `${site.url}/service-areas` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Service Areas
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            We provide basement renovation and legal apartment services across London
            and Southwestern Ontario.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Coverage"
            title="Communities We Serve"
            description="Click on a city to learn more about our basement services in your area."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-6 hover:shadow-md transition-shadow group"
              >
                <h2 className="font-bold text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {city.name}, {areas.region}
                </h2>
                <p className="text-[var(--concrete)] text-sm leading-relaxed line-clamp-3">
                  {city.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[var(--accent)] text-sm font-semibold mt-3">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
