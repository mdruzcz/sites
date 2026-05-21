import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getServices,
  getServiceAreas,
  getCityBySlug,
} from "@/lib/content";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getServiceAreas().cities.map((c) => ({ city: c.slug }));
}

type Params = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return { title: "City Not Found" };
  return {
    title: `LED Light Shows & Architectural Lighting in ${city.name}, ON`,
    description: `${site.name} installs music-synced LED shows, RGB architectural lighting, and permanent holiday lighting throughout ${city.name} and the surrounding region.`,
    alternates: { canonical: `${site.url}/service-areas/${city.slug}` },
  };
}

export default async function CityPage({ params }: Params) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  const services = getServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Service Areas", url: `${site.url}/service-areas` },
              { name: city.name, url: `${site.url}/service-areas/${city.slug}` },
            ])
          ),
        }}
      />

      <section className="relative bg-midnight-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <p className="eyebrow">{city.name}, Ontario</p>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
                Light shows for <span className="gradient-text">{city.name}</span>.
              </h1>
              <p className="text-lg text-muted-strong leading-relaxed">
                {city.description}
              </p>
            </div>
            <div className="lg:col-span-2">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Do in"
            title={`${city.name} Services`}
            description={`Every service we offer is available in ${city.name} and surrounding areas. Click into any service for a deeper look — or jump straight to a quote.`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/${city.slug}`}
                className="card p-4 text-sm font-semibold text-white hover:border-accent hover:text-accent transition-all"
              >
                {s.title} in {city.name} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
