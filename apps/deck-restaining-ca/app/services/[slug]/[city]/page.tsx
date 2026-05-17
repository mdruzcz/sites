import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getServices, getServiceBySlug, getServiceAreas, getCityBySlug } from "@/lib/content";
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
  const description = `Professional ${service.title.toLowerCase()} in ${city.name}. ${service.shortDescription} Contact ${site.name} for a free quote.`;

  return {
    title,
    description,
    openGraph: { title, description },
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="bg-[var(--wood-dark)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-stone-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <Link href={`/services/${service.slug}`} className="hover:text-white">{service.title}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {service.title} in {city.name}, {areas.region}
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl">
            Professional {service.title.toLowerCase()} services in {city.name} and surrounding areas.
            Premium oil-based stains from {site.name}.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg text-stone-600 space-y-4">
                <p>{city.description}</p>
                <p>{service.fullDescription}</p>
              </div>

              <div className="mt-8">
                <h2 className="font-bold text-xl mb-4">
                  Why Choose {site.name} in {city.name}?
                </h2>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-stone-700">{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-stone-700">Local team serving {city.name} and nearby communities</span>
                  </li>
                </ul>
              </div>

              <div className="mt-12">
                <h2 className="font-bold text-xl mb-4">
                  Also Serving Nearby Communities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {otherCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/services/${service.slug}/${c.slug}`}
                      className="text-sm bg-amber-50 text-amber-800 px-3 py-1.5 rounded-full hover:bg-amber-100 transition-colors"
                    >
                      {service.title} in {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-[var(--stone)] rounded-xl">
                <h3 className="font-bold text-lg mb-2">Ready to get started?</h3>
                <p className="text-stone-600 mb-4">
                  Contact us today for a free quote on {service.title.toLowerCase()} in {city.name}.
                </p>
                <a href={`mailto:${site.email}`} className="btn btn-primary">
                  Email for a Quote
                </a>
              </div>
            </div>

            <div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
