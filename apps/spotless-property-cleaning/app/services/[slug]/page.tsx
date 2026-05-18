import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getServices, getServiceBySlug, getServiceAreas } from "@/lib/content";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";

const serviceImages: Record<string, { src: string; alt: string }> = {
  "house-washing": { src: "/images/concrete-washing.jpg", alt: "Professional house washing service in London, Ontario" },
  "driveway-cleaning": { src: "/images/driveway-washing.jpg", alt: "Driveway pressure washing and cleaning in Southwestern Ontario" },
  "deck-fence-restoration": { src: "/images/deck-cleaning.jpg", alt: "Deck and fence restoration pressure washing service" },
  "roof-gutter-cleaning": { src: "/images/patio-cleaning.jpg", alt: "Roof and gutter soft wash cleaning service" },
  "commercial-washing": { src: "/images/commercial-washing.jpg", alt: "Commercial building pressure washing service" },
  "parking-lot-cleaning": { src: "/images/driveway-washing.jpg", alt: "Parking lot and garage pressure washing" },
  "fleet-washing": { src: "/images/commercial-washing.jpg", alt: "Fleet and equipment washing service" },
  "graffiti-removal": { src: "/images/before-after.jpg", alt: "Professional graffiti removal and surface restoration" },
};

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
    title: `${service.title} in ${site.address.city}, ON`,
    description: `${service.shortDescription} Call ${site.phone} for a free estimate.`,
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
  const schema = serviceSchema(service);
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: service.title, url: `${site.url}/services/${service.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {service.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">{service.shortDescription}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {serviceImages[service.slug] && (
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg mb-8">
                  <Image
                    src={serviceImages[service.slug].src}
                    alt={serviceImages[service.slug].alt}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="prose prose-lg text-slate-600">
                <p>{service.fullDescription}</p>
              </div>
              <div className="mt-8">
                <h2 className="font-display font-bold text-xl mb-4">Key Benefits</h2>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12">
                <h2 className="font-display font-bold text-xl mb-4">{service.title} in Your Area</h2>
                <div className="flex flex-wrap gap-2">
                  {areas.cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/services/${service.slug}/${city.slug}`}
                      className="text-sm bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full hover:bg-amber-100 transition-colors"
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
