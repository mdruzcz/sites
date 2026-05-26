import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices, getServiceBySlug, getServiceAreas, getCityBySlug } from "@/lib/content";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getServices();
  const areas = getServiceAreas();
  return services.flatMap((s) => areas.map((a) => ({ slug: s.slug, city: a.slug })));
}

type Props = { params: Promise<{ slug: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city } = await params;
  const service = getServiceBySlug(slug);
  const area = getCityBySlug(city);
  if (!service || !area) return {};
  return {
    title: `${service.title} in ${area.city}, ${area.county}`,
    description: `Looking for ${service.title.toLowerCase()} in ${area.city}? ${site.name} provides TSSA-certified HVAC service in ${area.city} and ${area.county}. Free quotes, same-day service available.`,
  };
}

export default async function ServiceCityPage({ params }: Props) {
  const { slug, city } = await params;
  const service = getServiceBySlug(slug);
  const area = getCityBySlug(city);
  if (!service || !area) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service, area.city)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Services", url: `${site.url}/services` },
              { name: service.title, url: `${site.url}/services/${service.slug}` },
              { name: area.city, url: `${site.url}/services/${service.slug}/${area.slug}` },
            ])
          ),
        }}
      />

      <section className="bg-[var(--navy)] text-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow-cool">{area.city}, {area.county}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              {service.title} in {area.city}
            </h1>
            <p className="text-white/70 text-lg">
              {site.name} provides expert {service.title.toLowerCase()} in {area.city} and {area.county}. TSSA G2 certified. Same-day service available.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-[var(--navy)] mb-4">
                  {service.title} for {area.city} Homeowners
                </h2>
                <p className="text-[var(--slate)] leading-relaxed mb-4">
                  {area.description}
                </p>
                <p className="text-[var(--slate)] leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[var(--navy)] mb-4">Our {area.city} Service Includes</h2>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[var(--slate)]">
                      <svg className="w-5 h-5 text-[var(--cool)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6 bg-[var(--surface)]">
                <h3 className="font-bold text-[var(--navy)] mb-2">
                  Why Choose {site.name} for {service.title} in {area.city}?
                </h3>
                <p className="text-[var(--slate)] text-sm leading-relaxed">
                  We&apos;re local to Oxford County and serve {area.city} with the same TSSA-certified expertise we bring to every job. No call centres, no franchises — you deal with our technicians directly.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {site.certifications.map((cert) => (
                    <span key={cert} className="text-xs px-2 py-1 bg-white rounded font-semibold text-[var(--slate)] border border-[var(--border)]">
                      ✓ {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href={`/services/${service.slug}`} className="btn btn-outline text-sm py-2 px-4">
                  ← All {service.title} Info
                </Link>
                <Link href={`/service-areas/${area.slug}`} className="btn btn-outline text-sm py-2 px-4">
                  All Services in {area.city} →
                </Link>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <QuoteForm defaultService={service.title} formType="quote" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
