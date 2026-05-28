import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServices, getServiceBySlug, getServiceAreas } from "@/lib/content";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | TriCity Concrete Sealing`,
    description: `Professional ${service.title.toLowerCase()} across London, Woodstock, Brantford and all of SW Ontario. ${service.shortDescription} ${site.warrantyYears}-year warranty.`,
    openGraph: { images: [service.image] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const areas = getServiceAreas();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: service.title, url: `${site.url}/services/${service.slug}` },
          ])),
        }}
      />

      {/* Hero */}
      <section className="relative bg-[var(--navy-900)] py-0 overflow-hidden">
        <div className="relative h-[420px] sm:h-[500px]">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="hero-gradient absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-0 flex items-end pb-12 sm:pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-2 text-white/50 text-xs">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li aria-hidden="true">›</li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li aria-hidden="true">›</li>
                  <li className="text-white">{service.title}</li>
                </ol>
              </nav>
              <p className="eyebrow">{service.icon} Concrete Sealing</p>
              <h1 className="h-display text-4xl sm:text-5xl text-white">{service.title}</h1>
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
                  About Our {service.title} Service
                </h2>
                <p className="text-[var(--concrete)] leading-relaxed text-base">
                  {service.description}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[var(--navy)] text-lg mb-4">Key Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[var(--border)]">
                      <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-[var(--navy)] text-sm">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[var(--navy)] text-lg mb-4">Available in These Areas</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {areas.cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/services/${service.slug}/${city.slug}`}
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--navy)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                    >
                      <svg className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {city.name}, ON
                    </Link>
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
