import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServices, getServiceBySlug, getServiceAreas, getCityBySlug } from "@/lib/content";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  const services = getServices();
  const areas = getServiceAreas();
  return services.flatMap((s) =>
    areas.cities.map((c) => ({ slug: s.slug, city: c.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; city: string }> }): Promise<Metadata> {
  const { slug, city } = await params;
  const service = getServiceBySlug(slug);
  const cityData = getCityBySlug(city);
  if (!service || !cityData) return {};
  return {
    title: `${service.title} in ${cityData.name}, ON | TriCity Concrete Sealing`,
    description: `Professional ${service.title.toLowerCase()} in ${cityData.name}, ${cityData.region}, Ontario. ${service.shortDescription} ${site.warrantyYears}-year written warranty. Free quote available.`,
    openGraph: { images: [service.image] },
  };
}

export default async function ServiceCityPage({ params }: { params: Promise<{ slug: string; city: string }> }) {
  const { slug, city } = await params;
  const service = getServiceBySlug(slug);
  const cityData = getCityBySlug(city);
  if (!service || !cityData) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service, cityData.name)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: service.title, url: `${site.url}/services/${service.slug}` },
            { name: cityData.name, url: `${site.url}/services/${service.slug}/${city}` },
          ])),
        }}
      />

      {/* Hero */}
      <section className="relative bg-[var(--navy-900)] overflow-hidden">
        <div className="relative h-[380px] sm:h-[460px]">
          <Image
            src={service.image}
            alt={`${service.title} in ${cityData.name}, Ontario by TriCity Concrete Sealing`}
            fill
            className="object-cover opacity-45"
            priority
          />
          <div className="hero-gradient absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-0 flex items-end pb-10 sm:pb-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <nav aria-label="Breadcrumb" className="mb-3">
                <ol className="flex items-center gap-2 text-white/50 text-xs flex-wrap">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li aria-hidden="true">›</li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li aria-hidden="true">›</li>
                  <li><Link href={`/services/${service.slug}`} className="hover:text-white transition-colors">{service.title}</Link></li>
                  <li aria-hidden="true">›</li>
                  <li className="text-white">{cityData.name}</li>
                </ol>
              </nav>
              <p className="eyebrow">{cityData.name}, {cityData.region}</p>
              <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white">
                {service.title} in {cityData.name}, ON
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content + Form */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="h-display text-2xl sm:text-3xl text-[var(--navy)] mb-4">
                  Expert {service.title} in {cityData.name}
                </h2>
                <p className="text-[var(--concrete)] leading-relaxed mb-4">
                  TriCity Concrete Sealing provides professional {service.title.toLowerCase()} throughout{" "}
                  {cityData.name} and the surrounding {cityData.region} area. Our team uses premium-grade
                  sealers and proven application techniques to deliver lasting protection and a beautiful finish
                  — every time.
                </p>
                <p className="text-[var(--concrete)] leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-[var(--navy)] mb-4">Why {cityData.name} Homeowners Choose TriCity</h3>
                <ul className="space-y-3">
                  {[
                    `Local crews familiar with ${cityData.name} and ${cityData.region} conditions`,
                    `${site.warrantyYears}-year written warranty on every project`,
                    "Premium UV-resistant, weatherproof sealers",
                    `Free on-site assessment in ${cityData.name} — no obligation`,
                    "Fully insured and licensed",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[var(--concrete)]">
                      <svg className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-[var(--navy)] mb-3">Service Benefits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {service.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-sm text-[var(--navy)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <QuoteForm defaultService={service.title} variant="card" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
