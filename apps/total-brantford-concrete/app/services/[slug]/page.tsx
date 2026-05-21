import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getServices, getServiceBySlug, getServiceAreas, getFeaturedTestimonials } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} in Brantford, ON`,
    description: `${service.shortDescription} Serving Brantford and Brant County. Free on-site estimate — call (833) 244-3124.`,
    openGraph: {
      title: `${service.title} in Brantford, ON | ${site.name}`,
      description: service.shortDescription,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const areas = getServiceAreas();
  const testimonials = getFeaturedTestimonials().slice(0, 3);

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
      <section className="bg-[var(--charcoal)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-[var(--concrete-200)] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <span className="eyebrow">Brantford, ON</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl max-w-3xl">
            {service.title} in{" "}
            <span className="text-[var(--accent)]">Brantford</span>
          </h1>
          <p className="text-[var(--concrete-200)] text-lg mt-4 max-w-2xl normal-case font-normal">
            {service.shortDescription}
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
                  alt={`${service.title} in Brantford, ON by Total Brantford Concrete`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>

              <SectionHeader eyebrow="Overview" title={service.title} />
              <p className="text-[var(--concrete)] leading-relaxed mb-8">{service.fullDescription}</p>

              <h2 className="font-bold text-sm uppercase tracking-wider text-[var(--charcoal)] mb-4">What&apos;s Included</h2>
              <ul className="space-y-3 mb-10">
                {service.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-[var(--concrete)]">
                    <svg className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* City service links */}
              <h2 className="font-bold text-sm uppercase tracking-wider text-[var(--charcoal)] mb-4">
                {service.title} by City
              </h2>
              <div className="flex flex-wrap gap-2">
                {areas.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/services/${service.slug}/${city.slug}`}
                    className="text-xs font-bold uppercase tracking-wide bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 rounded hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-colors"
                  >
                    {city.name}, ON
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <QuoteForm defaultService={service.title} />

              {/* Testimonials */}
              {testimonials.length > 0 && (
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--charcoal)] mb-4">What Clients Say</h3>
                  <div className="space-y-4">
                    {testimonials.slice(0, 2).map((t) => (
                      <div key={t.id} className="card p-4">
                        <p className="text-xs text-[var(--concrete)] italic mb-2 normal-case">&ldquo;{t.text.slice(0, 120)}...&rdquo;</p>
                        <p className="text-xs font-bold text-[var(--charcoal)]">{t.name}</p>
                        <p className="text-xs text-[var(--concrete)]">{t.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
