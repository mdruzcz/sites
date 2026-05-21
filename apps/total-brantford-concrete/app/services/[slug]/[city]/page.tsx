import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getServices, getServiceBySlug, getServiceAreas, getCityBySlug } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getServices();
  const areas = getServiceAreas();
  return services.flatMap((s) =>
    areas.cities.map((c) => ({ slug: s.slug, city: c.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; city: string }> }): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};
  return {
    title: `${service.title} in ${city.name}, ON`,
    description: `Looking for ${service.title.toLowerCase()} in ${city.name}, ON? Total Brantford Concrete delivers expert concrete work across ${city.name} and surrounding areas. Free on-site estimate.`,
    openGraph: {
      title: `${service.title} in ${city.name}, ON | ${site.name}`,
      description: `Expert ${service.title.toLowerCase()} in ${city.name}, Ontario. ${service.shortDescription}`,
      url: `${site.url}/services/${slug}/${citySlug}`,
    },
  };
}

export default async function ServiceCityPage({ params }: { params: Promise<{ slug: string; city: string }> }) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(service, city.name)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: service.title, url: `${site.url}/services/${service.slug}` },
            { name: city.name, url: `${site.url}/services/${service.slug}/${city.slug}` },
          ])),
        }}
      />

      {/* Hero */}
      <section className="bg-[var(--charcoal)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-[var(--concrete-200)] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="mx-2">/</span>
            <Link href={`/services/${service.slug}`} className="hover:text-white transition-colors">{service.title}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <span className="eyebrow">{city.name}, {city.province}</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl max-w-3xl">
            {service.title} in{" "}
            <span className="text-[var(--accent)]">{city.name}</span>, Ontario
          </h1>
          <p className="text-[var(--concrete-200)] text-lg mt-4 max-w-2xl normal-case font-normal">
            {city.description} {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
                <Image
                  src={service.image}
                  alt={`${service.title} in ${city.name}, ON by Total Brantford Concrete`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>

              <SectionHeader
                eyebrow={`${city.name}, ON`}
                title={`${service.title} in ${city.name}`}
              />
              <p className="text-[var(--concrete)] leading-relaxed mb-4">{city.description}</p>
              <p className="text-[var(--concrete)] leading-relaxed mb-8">{service.fullDescription}</p>

              <h2 className="font-bold text-sm uppercase tracking-wider text-[var(--charcoal)] mb-4">What&apos;s Included</h2>
              <ul className="space-y-3">
                {service.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-[var(--concrete)]">
                    <svg className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <QuoteForm defaultService={service.title} />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title={`Ready for ${service.title} in ${city.name}?`}
        subtitle={`Get a free on-site estimate for your ${city.name} property. We serve all of ${city.name} and surrounding communities.`}
      />
    </>
  );
}
