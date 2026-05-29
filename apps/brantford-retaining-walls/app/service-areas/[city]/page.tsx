import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getServices, getServiceAreas, getCityBySlug } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";
import { CtaBand } from "@/components/CtaBand";

export const revalidate = 3600;

export function generateStaticParams() {
  return getServiceAreas().cities.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = getCityBySlug(params.city);
  if (!city) return {};
  return {
    title: `Retaining Walls ${city.name}, ON | ${site.name}`,
    description: `Professional retaining wall services in ${city.name}, Ontario. Armour stone, interlocking block, erosion control & more. Free quotes — call ${site.phone}.`,
    alternates: { canonical: `/service-areas/${city.slug}` },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();
  const services = getServices();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Service Areas", url: `${site.url}/service-areas` },
        { name: city.name, url: `${site.url}/service-areas/${city.slug}` },
      ])) }} />
      <section className="bg-[var(--charcoal)] py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow !text-[var(--accent)]">Service Area</p>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Retaining Walls in {city.name}, ON</h1>
          <p className="text-lg text-[var(--stone-200)] max-w-2xl mx-auto">{city.description} Call {site.phone} for a free assessment.</p>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--charcoal)] mb-6 text-center">Our Services in {city.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/${city.slug}`} className="card p-5 hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all group flex flex-col">
                <h3 className="font-bold text-[var(--charcoal)] mb-2 group-hover:text-[var(--accent)] transition-colors text-sm sm:text-base">{s.title}</h3>
                <p className="text-[var(--stone)] text-xs sm:text-sm leading-relaxed flex-1">{s.shortDescription}</p>
                <p className="mt-3 text-xs font-semibold text-[var(--accent)] flex items-center gap-1">Learn more<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></p>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact" className="btn btn-primary text-base px-8 py-4">Get a Free Quote in {city.name}</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
