import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import {
  getServices,
  getServiceBySlug,
  getServiceAreas,
  getCityBySlug,
} from "@/lib/content";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";

export const revalidate = 3600;

export function generateStaticParams() {
  const services = getServices();
  const areas = getServiceAreas();
  return services.flatMap((service) =>
    areas.cities.map((city) => ({
      slug: service.slug,
      city: city.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};

  const title = `${service.title} in ${city.name}, ON`;
  const description = `Professional ${service.title.toLowerCase()} in ${city.name}, Ontario. Reinforced construction, written warranty, free on-site estimate. Call ${site.phone}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: service.image, alt: `${service.title} in ${city.name}` }],
      url: `${site.url}/services/${service.slug}/${city.slug}`,
    },
  };
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  const areas = getServiceAreas();
  const schema = serviceSchema(service, city.name);
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: service.title, url: `${site.url}/services/${service.slug}` },
    { name: city.name, url: `${site.url}/services/${service.slug}/${city.slug}` },
  ]);

  const otherCities = areas.cities.filter((c) => c.slug !== city.slug);
  const otherServices = getServices().filter((s) => s.slug !== service.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="bg-charcoal text-white relative overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} in ${city.name}, Ontario by Concrete Tilsonburg`}
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="hero-gradient absolute inset-0" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-sm text-[var(--concrete-200)] mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <Link href={`/services/${service.slug}`} className="hover:text-white">{service.title}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <p className="eyebrow !text-[var(--accent)] !mb-3">{city.name}, Ontario</p>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl mb-4 max-w-3xl">
            {service.title} in {city.name}, ON
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-3xl">
            Local crews, written warranty, free on-site estimate. Professional {service.title.toLowerCase()} for {city.name} homeowners — engineered for Ontario winters.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 prose-cd">
              <h2 className="h-display text-2xl sm:text-3xl text-[var(--charcoal)] mb-4">
                Trusted {service.title} Contractor in {city.name}
              </h2>
              <p>{city.description}</p>
              <p>{service.fullDescription}</p>

              <h3 className="font-bold text-xl text-[var(--charcoal)] mt-8 mb-4">
                Why {city.name} Homeowners Choose {site.shortName}
              </h3>
              <ul className="not-prose space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[var(--charcoal)]">{feature}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[var(--charcoal)]">
                    Local crews familiar with {city.name} soil conditions and weather patterns
                  </span>
                </li>
              </ul>

              <div className="mt-12">
                <h3 className="font-bold text-xl text-[var(--charcoal)] mb-3">
                  Also Available in Nearby Cities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {otherCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/services/${service.slug}/${c.slug}`}
                      className="text-sm bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1.5 rounded-full hover:bg-[var(--accent)] hover:text-white transition-colors font-medium"
                    >
                      {service.title} in {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-bold text-xl text-[var(--charcoal)] mb-3">
                  Other Concrete Services in {city.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {otherServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}/${city.slug}`}
                      className="text-sm bg-[var(--surface)] text-[var(--charcoal)] px-3 py-1.5 rounded-full hover:bg-[var(--charcoal)] hover:text-white transition-colors font-medium"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-10 p-6 bg-[var(--surface)]/50 rounded-xl border-l-4 border-[var(--accent)]">
                <h3 className="font-bold text-lg text-[var(--charcoal)] mb-2">
                  Ready to start your {city.name} project?
                </h3>
                <p className="text-[var(--concrete)] mb-4">
                  Call now for a free on-site estimate on {service.title.toLowerCase()} in {city.name}, ON. We respond within {site.responseTime}.
                </p>
                <a href={site.phoneHref} className="btn btn-primary">
                  Call {site.phone}
                </a>
              </div>
            </div>

            <div>
              <div className="lg:sticky lg:top-24">
                <QuoteForm defaultService={service.title} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
