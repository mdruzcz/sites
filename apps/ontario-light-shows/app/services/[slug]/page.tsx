import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getServices,
  getServiceBySlug,
  getServiceAreas,
} from "@/lib/content";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceIcon } from "@/components/ServiceIcon";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | ${site.name}`,
    description: service.shortDescription,
    alternates: { canonical: `${site.url}/services/${service.slug}` },
    openGraph: {
      title: `${service.title} — ${site.name}`,
      description: service.shortDescription,
      url: `${site.url}/services/${service.slug}`,
      images: [{ url: service.image, width: 1600, height: 1000, alt: `${service.title} by ${site.name}` }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const areas = getServiceAreas();
  const otherServices = getServices().filter((s) => s.slug !== service.slug);

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
      <section className="relative overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} by ${site.name}`}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <Link href="/services" className="text-sm text-accent hover:underline mb-4 inline-block">
                ← All services
              </Link>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                  <ServiceIcon icon={service.icon} className="w-6 h-6" />
                </div>
                <p className="eyebrow !mb-0">Service</p>
              </div>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
                {service.title}
              </h1>
              <p className="text-lg text-muted-strong leading-relaxed max-w-2xl">
                {service.shortDescription}
              </p>
            </div>
            <div className="lg:col-span-2">
              <QuoteForm defaultService={service.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Long-form description */}
      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose-ols">
            <h2>What's involved</h2>
            <p>{service.fullDescription}</p>

            <h2>What you get</h2>
            <ul>
              {service.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <h2>Where we install</h2>
            <p>
              Ontario Light Shows installs {service.title.toLowerCase()} across all major Ontario service zones — from the GTA to the National Capital Region to Southwestern Ontario. If you'd like a service-area-specific overview, every city has a dedicated page below.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/services/${service.slug}/${city.slug}`}
                className="card p-4 text-center text-sm font-semibold text-white hover:border-accent hover:text-accent transition-all"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 sm:py-24 bg-midnight-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Explore More" title="The rest of our lineup." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card p-5 hover:border-accent transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mb-3">
                  <ServiceIcon icon={s.icon} className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white group-hover:text-accent transition-colors mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-muted">View →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
