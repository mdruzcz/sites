import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getServices, getServiceBySlug, getServiceAreas } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";
import { QuoteForm } from "@/components/QuoteForm";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

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
  return {
    title: `${service.title} in Ontario — Wheelchair Ramp Experts`,
    description: `${service.shortDescription} Serving London, Hamilton, Kitchener-Waterloo, Toronto, and all of Ontario. Free consultations, AODA compliant.`,
    alternates: { canonical: `${site.url}/services/${slug}` },
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
  const breadcrumbs = [
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: service.title, url: `${site.url}/services/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />

      {/* Hero with background image */}
      <section className="relative isolate text-white py-20 sm:py-28 overflow-hidden bg-[#0057A8]">
        <Image
          src={service.image}
          alt={`${service.title} by Ontario Ramp Solutions - Wheelchair accessibility in Ontario`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0057A8]/95 via-[#0057A8]/85 to-[#0057A8]/55" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span>{service.title}</span>
          </nav>
          <p className="eyebrow text-blue-200">Service</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4 max-w-3xl drop-shadow-lg">
            {service.title}
          </h1>
          <p className="text-blue-50 text-lg max-w-3xl leading-relaxed drop-shadow">{service.shortDescription}</p>
        </div>
      </section>

      {/* Content + form */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="prose-ors">
                {service.fullDescription.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-10">
                <h2 className="h-display text-2xl sm:text-3xl text-gray-900 mb-6">
                  What&apos;s included
                </h2>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-muted-strong">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service-area links */}
              <div className="mt-12 p-6 card bg-surface">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  {service.title} — Serving all of Ontario
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {areas.cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/service-areas/${city.slug}`}
                      className="text-sm text-accent hover:underline font-medium"
                    >
                      {city.name}, ON →
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote form sidebar */}
            <div className="lg:col-span-1">
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
