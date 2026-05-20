import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import {
  getServices,
  getServiceAreas,
  getCityBySlug,
} from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { ServiceCard } from "@/components/ServiceCard";

export const revalidate = 3600;

export function generateStaticParams() {
  return getServiceAreas().cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  const title = `Concrete Driveways in ${city.name}, ON`;
  const description = `Custom concrete driveways, patios, and walkways in ${city.name}, Ontario. ${site.yearsExperience}+ years experience. Free quote — call ${site.phone}.`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const services = getServices();
  const areas = getServiceAreas();
  const otherCities = areas.cities.filter((c) => c.slug !== city.slug);

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Service Areas", url: `${site.url}/service-areas` },
    { name: city.name, url: `${site.url}/service-areas/${city.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="bg-charcoal text-white relative overflow-hidden">
        <Image
          src="/images/migrated/5kconcrete-5k-concrete-featured-project-2.jpg"
          alt={`Concrete driveways in ${city.name}, Ontario`}
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-sm text-[var(--concrete-200)] mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/service-areas" className="hover:text-white">Service Areas</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <p className="eyebrow !text-[var(--accent)] !mb-3">{city.name}, Ontario</p>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-4">
            Concrete Driveways in {city.name}, ON
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-3xl">
            {city.description}
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="btn btn-primary text-base">Get Free Quote</Link>
            <a href={site.phoneHref} className="btn btn-ghost text-base">Call {site.phone}</a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="h-display text-2xl sm:text-3xl text-[var(--charcoal)] mb-4">
                Full-Service Concrete Contractor in {city.name}
              </h2>
              <p className="text-lg text-[var(--concrete)] leading-relaxed mb-4">
                We pour a full range of residential concrete in {city.name} — from standard 4&quot; reinforced driveways to high-end stamped patios and pool decks. Every job uses the same engineered base, the same air-entrained mix, and the same written workmanship warranty.
              </p>
              <p className="text-lg text-[var(--concrete)] leading-relaxed">
                Below are the concrete services we offer in {city.name}, ON. Click any service for full details — or call us directly at <a href={site.phoneHref} className="text-[var(--accent)] font-semibold">{site.phone}</a> for a free on-site quote.
              </p>

              <div className="mt-10">
                <h3 className="font-bold text-xl text-[var(--charcoal)] mb-4">
                  Concrete Services in {city.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}/${city.slug}`}
                      className="card p-4 hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all group"
                    >
                      <h4 className="font-bold text-[var(--charcoal)] group-hover:text-[var(--accent)] mb-1">
                        {s.title} in {city.name}
                      </h4>
                      <p className="text-sm text-[var(--concrete)]">{s.shortDescription.slice(0, 100)}...</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-12 p-6 bg-[var(--surface)]/50 rounded-xl border-l-4 border-[var(--accent)]">
                <h3 className="font-bold text-lg text-[var(--charcoal)] mb-2">Local to {city.name}</h3>
                <p className="text-[var(--concrete)]">
                  Our crews drive past your neighbourhood every week. That means lower travel mark-up, faster site visits, and a team that already knows what concrete needs to do in {city.name}&apos;s soil and weather.
                </p>
              </div>

              <div className="mt-10">
                <h3 className="font-bold text-xl text-[var(--charcoal)] mb-3">
                  Other Communities We Serve
                </h3>
                <div className="flex flex-wrap gap-2">
                  {otherCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/service-areas/${c.slug}`}
                      className="text-sm bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1.5 rounded-full hover:bg-[var(--accent)] hover:text-white transition-colors font-medium"
                    >
                      {c.name}, ON
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="lg:sticky lg:top-24">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
