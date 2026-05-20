import type { Metadata } from "next";
import Link from "next/link";
import { getServiceAreas, getServices } from "@/lib/content";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas — London, St. Thomas & Southwestern Ontario",
  description: `Professional concrete driveways and patios across London, St. Thomas, Strathroy, Woodstock, Ingersoll, Dorchester, Aylmer, and Tillsonburg, ON.`,
};

export default function ServiceAreasPage() {
  const areas = getServiceAreas();
  const services = getServices();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Service Areas", url: `${site.url}/service-areas` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="bg-charcoal text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow !text-[var(--accent)]">Where We Pour</p>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-4">
            Serving London & Southwestern Ontario
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-3xl">
            Local crews working across {areas.cities.length} communities. Same standard, same warranty, same engineered base — whether you&apos;re in downtown London or rural Aylmer.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-6 hover:-translate-y-1 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="eyebrow !mb-2">{city.name}, Ontario</p>
                    <h2 className="font-bold text-2xl text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors mb-2">
                      Concrete Driveways in {city.name}
                    </h2>
                    <p className="text-[var(--concrete)] text-sm leading-relaxed">
                      {city.description}
                    </p>
                  </div>
                  <svg className="w-6 h-6 text-[var(--accent)] shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {services.slice(0, 4).map((s) => (
                    <span key={s.slug} className="text-xs bg-[var(--surface)] text-[var(--charcoal)] px-2.5 py-1 rounded-full">
                      {s.title}
                    </span>
                  ))}
                  <span className="text-xs text-[var(--concrete)] px-2.5 py-1">+ {services.length - 4} more</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
