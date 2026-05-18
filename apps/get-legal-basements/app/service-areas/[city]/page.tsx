import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getServices, getServiceAreas, getCityBySlug } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";

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

  const title = `Basement Renovations in ${city.name}, ON`;
  const description = `Legal basement apartments, underpinning, waterproofing, and renovation services in ${city.name}, Ontario. Free consultations from ${site.name}. Call ${site.phone}.`;

  return { title, description, openGraph: { title, description } };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const areas = getServiceAreas();
  const services = getServices();
  const otherCities = areas.cities.filter((c) => c.slug !== city.slug);

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Service Areas", url: `${site.url}/service-areas` },
    { name: city.name, url: `${site.url}/service-areas/${city.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/service-areas" className="hover:text-white">Service Areas</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Basement Renovations in {city.name}, {areas.region}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Legal basement apartments, underpinning, waterproofing, and complete renovations
            in {city.name} and surrounding areas.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg text-slate-600 space-y-4">
                <p>{city.description}</p>
                <p>
                  Whether you&apos;re looking to create a legal basement apartment for rental income,
                  finish an unfinished basement for your family, or address foundation and waterproofing
                  issues, {site.name} provides professional, fully-permitted basement services
                  throughout {city.name} and the surrounding area.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="font-bold text-xl mb-4">Our Services in {city.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}/${city.slug}`}
                      className="card p-4 hover:shadow-md transition-shadow group"
                    >
                      <h3 className="font-semibold group-hover:text-[var(--accent)] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[var(--concrete)] mt-1 line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-bold text-xl mb-4">Other Service Areas</h2>
                <div className="flex flex-wrap gap-2">
                  {otherCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/service-areas/${c.slug}`}
                      className="text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
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
