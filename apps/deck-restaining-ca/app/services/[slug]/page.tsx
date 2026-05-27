import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getServices, getServiceBySlug, getServiceAreas } from "@/lib/content";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
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

  // Trim shortDescription to keep meta description <=160 chars after suffix.
  const suffix = ` Serving Oakville, Burlington & Halton.`;
  const max = 160 - suffix.length;
  const short = service.shortDescription.length > max
    ? service.shortDescription.slice(0, max - 1).trimEnd() + "…"
    : service.shortDescription;
  const description = `${short}${suffix}`;

  return {
    title: `${service.title} in Oakville & Burlington`,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${site.name}`,
      description,
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
  const schema = serviceSchema(service);
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: service.title, url: `${site.url}/services/${service.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="bg-[var(--wood-dark)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-stone-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {service.title}
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl">
            {service.shortDescription}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg text-stone-600">
                <p>{service.fullDescription}</p>
              </div>

              <div className="mt-8">
                <h2 className="font-bold text-xl mb-4">Key Benefits</h2>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-stone-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12">
                <h2 className="font-bold text-xl mb-4">
                  {service.title} in Your Area
                </h2>
                <p className="text-stone-600 mb-4">
                  We provide {service.title.toLowerCase()} services across the Halton Region and GTA:
                </p>
                <div className="flex flex-wrap gap-2">
                  {areas.cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/services/${service.slug}/${city.slug}`}
                      className="text-sm bg-[#F5EDE4] text-[#6B4226] px-3 py-1.5 rounded-full hover:bg-[#ECDBC8] transition-colors"
                    >
                      {service.title} in {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
