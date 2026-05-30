import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import {
  getServices,
  getServiceBySlug,
  getServiceAreas,
  getProjectsByService,
  getTestimonials,
} from "@/lib/content";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";

export const revalidate = 3600;

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const title = service.title;
  const description = `${service.shortDescription} Free on-site estimate. Written warranty. Call ${site.phone}.`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | Concrete Tilsonburg`,
      description,
      images: [
        { url: service.image, alt: `${service.title} in Tillsonburg, ON` },
        { url: "/images/og-default.jpg", width: 1200, height: 630, alt: `${service.title} — Oxford County` },
      ],
      url: `${site.url}/services/${service.slug}`,
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
  const projects = getProjectsByService(service.slug);
  const testimonials = getTestimonials().filter((t) => t.service === service.slug);
  const otherServices = getServices().filter((s) => s.slug !== service.slug);

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: service.title, url: `${site.url}/services/${service.slug}` },
  ]);
  const schema = serviceSchema(service);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="bg-charcoal text-white relative overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} by Concrete Tilsonburg in Tillsonburg, ON`}
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="hero-gradient absolute inset-0" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-sm text-[var(--concrete-200)] mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-4 max-w-3xl">
            {service.title}
          </h1>
          <p className="text-lg sm:text-xl text-[var(--concrete-200)] max-w-3xl leading-relaxed">
            {service.shortDescription}
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="btn btn-primary text-base">Get Free Estimate</Link>
            <a href={site.phoneHref} className="btn btn-ghost text-base">Call {site.phone}</a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="h-display text-2xl sm:text-3xl text-[var(--charcoal)] mb-4">
                About Our {service.title}
              </h2>
              <p className="text-lg text-[var(--concrete)] leading-relaxed">{service.fullDescription}</p>

              <div className="mt-10">
                <h3 className="font-bold text-xl text-[var(--charcoal)] mb-4">What&apos;s Included</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-[var(--charcoal)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {projects.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-bold text-xl text-[var(--charcoal)] mb-4">
                    Recent {service.title} Projects
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {projects.slice(0, 4).map((p) => (
                      <div key={p.slug} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                        <Image
                          src={p.image}
                          alt={p.alt}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--charcoal)]/85 to-transparent p-3" aria-hidden="true" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-white font-semibold text-sm">{p.title}</p>
                          <p className="text-[var(--concrete-200)] text-xs">{p.city}, ON</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 p-6 bg-[var(--surface)]/40 rounded-xl border-l-4 border-[var(--accent)]">
                <h3 className="font-bold text-lg text-[var(--charcoal)] mb-2">
                  {service.title} Across Oxford County
                </h3>
                <p className="text-[var(--concrete)] mb-4">
                  We provide {service.title.toLowerCase()} across the following communities:
                </p>
                <div className="flex flex-wrap gap-2">
                  {areas.cities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/services/${service.slug}/${c.slug}`}
                      className="text-sm bg-white border border-[var(--border)] text-[var(--charcoal)] px-3 py-1.5 rounded-full hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              {testimonials.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-bold text-xl text-[var(--charcoal)] mb-4">
                    What Customers Say
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.slice(0, 2).map((t) => (
                      <div key={t.author} className="card p-5">
                        <div className="flex gap-1 mb-2" aria-label={`${t.rating} out of 5 stars`}>
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-[var(--charcoal)] text-sm mb-3">&ldquo;{t.quote}&rdquo;</p>
                        <p className="font-semibold text-sm">
                          {t.author} <span className="font-normal text-[var(--concrete)]">— {t.city}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="lg:sticky lg:top-24">
                <QuoteForm defaultService={service.title} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Other Services"
            title="Explore More Concrete Solutions"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card p-5 hover:border-[var(--accent)] transition-all">
                <h3 className="font-bold text-[var(--charcoal)] mb-1">{s.title}</h3>
                <p className="text-sm text-[var(--concrete)]">{s.shortDescription.slice(0, 90)}...</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
