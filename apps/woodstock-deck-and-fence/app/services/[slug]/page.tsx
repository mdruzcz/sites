import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceBySlug, getServices, getServiceAreas } from "@/lib/content";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} in Woodstock & Oxford County`,
    description: `${service.shortDescription} Serving Woodstock, Ingersoll, Tillsonburg, and Oxford County. Free on-site quote from ${site.name}.`,
    openGraph: {
      title: `${service.title} | ${site.name}`,
      description: service.shortDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Services", url: `${site.url}/services` },
              { name: service.title, url: `${site.url}/services/${service.slug}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="py-12 sm:py-16 bg-[var(--charcoal)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <nav className="text-xs text-[var(--concrete-200)] mb-4 normal-case">
              <Link href="/" className="hover:text-white">Home</Link>
              {" / "}
              <Link href="/services" className="hover:text-white">Services</Link>
              {" / "}
              <span>{service.title}</span>
            </nav>
            <p className="eyebrow !text-[var(--accent)]">Woodstock · Ingersoll · Tillsonburg</p>
            <h1 className="h-display text-4xl sm:text-5xl mb-4">{service.title}</h1>
            <p className="text-lg text-[var(--concrete-200)] normal-case font-normal">{service.shortDescription}</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-8">
              {/* Full description */}
              <div className="card p-8">
                <h2 className="h-display text-2xl text-[var(--charcoal)] mb-4">About This Service</h2>
                <p className="text-[var(--concrete)] leading-relaxed normal-case font-normal">{service.fullDescription}</p>
              </div>

              {/* Features */}
              <div className="card p-8">
                <h2 className="h-display text-2xl text-[var(--charcoal)] mb-5">What&apos;s Included</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm text-[var(--charcoal)] normal-case">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Finish options */}
              {"finishes" in service && (
                <div className="card p-8">
                  <h2 className="h-display text-2xl text-[var(--charcoal)] mb-5">Finish Options</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(service as { finishes: { name: string; description: string }[] }).finishes.map((finish) => (
                      <div key={finish.name} className="bg-[var(--surface)] rounded-lg p-4 border border-[var(--border)]">
                        <h3 className="font-bold uppercase tracking-wide text-sm text-[var(--charcoal)] mb-1">{finish.name}</h3>
                        <p className="text-xs text-[var(--concrete)] leading-relaxed normal-case">{finish.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* City links */}
              <div className="card p-8">
                <h2 className="h-display text-xl text-[var(--charcoal)] mb-4">
                  {service.title} by City
                </h2>
                <div className="flex flex-wrap gap-2">
                  {areas.cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/services/${service.slug}/${city.slug}`}
                      className="px-3 py-2 text-xs font-bold uppercase tracking-wider border border-[var(--border)] rounded-lg text-[var(--charcoal)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      {service.title} — {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-24">
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
