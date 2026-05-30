import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceAreas, getServices } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas — Oxford County",
  description:
    "Concrete Tilsonburg serves Tillsonburg, Woodstock, Delhi, Ingersoll, Simcoe, and surrounding Oxford County communities. Free on-site estimates across Southwestern Ontario.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: "Service Areas — Oxford County | Concrete Tilsonburg",
    description:
      "Concrete Tilsonburg serves Tillsonburg, Woodstock, Delhi, Ingersoll, Simcoe, and surrounding Oxford County communities.",
    url: `${site.url}/service-areas`,
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Concrete service areas in Oxford County, ON" }],
  },
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

      <section className="bg-charcoal text-white relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--concrete-200)] mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Service Areas</span>
          </nav>
          <p className="eyebrow !text-[var(--accent)] !mb-3">Oxford County & Area</p>
          <h1 className="h-display text-4xl sm:text-5xl mb-4 max-w-3xl">
            Concrete Services Across Tillsonburg &amp; Oxford County
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-2xl leading-relaxed">
            Local crews serving {areas.cities.length} communities across Oxford County and surrounding Southwestern Ontario. Same written warranty, same engineered process, every city.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Where We Pour"
            title="Communities We Serve"
            description="Click any city to see which concrete services are available in your area."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-6 hover:border-[var(--accent)] hover:-translate-y-1 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="font-bold text-xl text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors">
                      {city.name}
                    </h2>
                    <p className="text-sm text-[var(--concrete)]">Ontario</p>
                  </div>
                  <svg className="w-5 h-5 text-[var(--accent)] group-hover:translate-x-1 transition-transform mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-sm text-[var(--concrete)] leading-relaxed mb-4">
                  {city.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {services.map((s) => (
                    <span
                      key={s.slug}
                      className="text-xs bg-[var(--surface)] text-[var(--charcoal)] px-2 py-1 rounded-md"
                    >
                      {s.title}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="All Services"
            title="What We Offer Across Every City"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card p-5 hover:border-[var(--accent)] transition-all group"
              >
                <h3 className="font-bold text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--concrete)] leading-relaxed">
                  {service.shortDescription.slice(0, 80)}...
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
