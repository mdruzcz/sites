import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getServices,
  getServiceBySlug,
  getServiceAreas,
  getCityBySlug,
} from "@/lib/content";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getServices();
  const cities = getServiceAreas().cities;
  return services.flatMap((s) => cities.map((c) => ({ slug: s.slug, city: c.slug })));
}

type Params = { params: Promise<{ slug: string; city: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return { title: "Not Found" };
  return {
    title: `${service.title} in ${city.name}, Ontario | ${site.name}`,
    description: `${service.shortDescription.slice(0, 100)}... Serving ${city.name} and surrounding areas with professional addressable LED installations.`,
    alternates: { canonical: `${site.url}/services/${service.slug}/${city.slug}` },
    openGraph: {
      title: `${service.title} in ${city.name}, ON`,
      description: `Professional ${service.title.toLowerCase()} in ${city.name} by ${site.name}.`,
      url: `${site.url}/services/${service.slug}/${city.slug}`,
      images: [{ url: service.image, width: 1600, height: 1000, alt: `${service.title} in ${city.name}, Ontario` }],
    },
  };
}

export default async function ServiceCityPage({ params }: Params) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service, city.name)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Services", url: `${site.url}/services` },
              { name: service.title, url: `${site.url}/services/${service.slug}` },
              { name: city.name, url: `${site.url}/services/${service.slug}/${city.slug}` },
            ])
          ),
        }}
      />

      <section className="relative overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} in ${city.name}, Ontario`}
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <p className="eyebrow">{city.name}, Ontario</p>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
                {service.title} in <span className="gradient-text">{city.name}</span>
              </h1>
              <p className="text-lg text-muted-strong leading-relaxed max-w-2xl mb-6">
                {city.description}
              </p>
              <div className="prose-ols max-w-2xl">
                <p>
                  {service.shortDescription} Our {city.name} crew handles the full install, programming, and (where applicable) live operation — using the same IP67/IP68 rated addressable LED hardware we run on every project.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <QuoteForm defaultService={service.title} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose-ols">
            <h2>About this service in {city.name}</h2>
            <p>{service.fullDescription}</p>
            <h2>Why {city.name} clients choose us</h2>
            <ul>
              {service.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p>
              Ready to book? Call {site.phone} or{" "}
              <Link href="/contact">request a quote</Link> — we respond within {site.responseTime} on every inquiry from {city.name} and the surrounding region.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
