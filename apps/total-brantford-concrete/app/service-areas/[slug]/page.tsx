import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getServices, getServiceAreas, getCityBySlug } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const areas = getServiceAreas();
  return areas.cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: `Concrete Contractor in ${city.name}, ON | Driveways, Patios & Repairs`,
    description: `Total Brantford Concrete serves ${city.name}, ON with expert concrete driveways, patios, walkways, and repairs. Free on-site estimate. Call (833) 244-3124.`,
    openGraph: {
      title: `Concrete Contractor in ${city.name}, ON | ${site.name}`,
      description: `Expert concrete driveways, patios, and repairs in ${city.name}, Ontario. Free estimate.`,
      url: `${site.url}/service-areas/${slug}`,
    },
  };
}

export default async function ServiceAreaCityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();
  const services = getServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Service Areas", url: `${site.url}/service-areas` },
            { name: city.name, url: `${site.url}/service-areas/${city.slug}` },
          ])),
        }}
      />

      {/* Hero */}
      <section className="bg-[var(--charcoal)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="eyebrow">{city.name}, {city.province}</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl max-w-3xl">
            Concrete Contractor in{" "}
            <span className="text-[var(--accent)]">{city.name}</span>, Ontario
          </h1>
          <p className="text-[var(--concrete-200)] text-lg mt-4 max-w-2xl normal-case font-normal">
            {city.description}
          </p>
        </div>
      </section>

      {/* Services in this city */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <SectionHeader
                eyebrow={`Services in ${city.name}`}
                title={`Concrete Services We Offer in ${city.name}`}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}/${city.slug}`}
                    className="card p-5 hover:shadow-md transition-shadow group"
                  >
                    <h3 className="font-bold text-sm uppercase tracking-wide text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[var(--concrete)] leading-relaxed">{service.shortDescription}</p>
                    <span className="text-xs font-bold text-[var(--accent)] flex items-center gap-1 mt-3">
                      Learn More
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title={`Need Concrete Work in ${city.name}?`}
        subtitle={`Total Brantford Concrete proudly serves ${city.name} and surrounding areas. Get a free on-site estimate today.`}
      />
    </>
  );
}
