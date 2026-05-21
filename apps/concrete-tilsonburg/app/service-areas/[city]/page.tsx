import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getServiceAreas, getCityBySlug, getServices } from "@/lib/content";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeader } from "@/components/SectionHeader";

export const revalidate = 3600;

export function generateStaticParams() {
  return getServiceAreas().cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const title = `Concrete Services in ${city.name}, ON`;
  const description = `Concrete Tilsonburg serves ${city.name}, Ontario with custom driveways, stamped patios, concrete repair, and garage floors. Written warranty. Free estimate. Call ${site.phone}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${site.url}/service-areas/${city.slug}`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const services = getServices();
  const areas = getServiceAreas();
  const otherCities = areas.cities.filter((c) => c.slug !== city.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Concrete Services in ${city.name}`,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phone,
    },
    areaServed: { "@type": "City", name: city.name },
    description: city.description,
  };

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Service Areas", url: `${site.url}/service-areas` },
    { name: city.name, url: `${site.url}/service-areas/${city.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="bg-charcoal text-white relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--concrete-200)] mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/service-areas" className="hover:text-white">Service Areas</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <p className="eyebrow !text-[var(--accent)] !mb-3">Southwestern Ontario</p>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl mb-4 max-w-3xl">
            Concrete Services in {city.name}, ON
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-3xl">
            {city.description}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <SectionHeader
                eyebrow={`${city.name}, ON`}
                title={`Available Concrete Services in ${city.name}`}
                center={false}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}/${city.slug}`}
                    className="card p-5 hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all group"
                  >
                    <h3 className="font-bold text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors mb-1">
                      {service.title} in {city.name}
                    </h3>
                    <p className="text-sm text-[var(--concrete)] leading-relaxed">
                      {service.shortDescription.slice(0, 80)}...
                    </p>
                    <p className="text-xs text-[var(--accent)] font-semibold mt-2">
                      Learn more →
                    </p>
                  </Link>
                ))}
              </div>

              <div className="p-6 bg-[var(--surface)]/40 rounded-xl border-l-4 border-[var(--accent)] mb-10">
                <h3 className="font-bold text-lg text-[var(--charcoal)] mb-2">
                  Why Choose {site.shortName} in {city.name}?
                </h3>
                <ul className="space-y-2">
                  {site.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-[var(--charcoal)] text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-[var(--charcoal)] mb-3">
                  Other Cities We Serve
                </h3>
                <div className="flex flex-wrap gap-2">
                  {otherCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/service-areas/${c.slug}`}
                      className="text-sm bg-[var(--surface)] text-[var(--charcoal)] px-3 py-1.5 rounded-full hover:bg-[var(--charcoal)] hover:text-white transition-colors font-medium"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="lg:sticky lg:top-24">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
