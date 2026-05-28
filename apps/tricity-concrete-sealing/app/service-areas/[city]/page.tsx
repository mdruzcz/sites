import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceAreas, getCityBySlug, getServices } from "@/lib/content";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return getServiceAreas().cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);
  if (!cityData) return {};
  return {
    title: `Concrete Sealing in ${cityData.name}, ON | TriCity Concrete Sealing`,
    description: `Professional concrete sealing in ${cityData.name}, ${cityData.region}, Ontario. Driveways, patios, stamped concrete, and walkways — backed by a ${site.warrantyYears}-year warranty. Free quote available.`,
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = getCityBySlug(city);
  if (!cityData) notFound();

  const services = getServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Service Areas", url: `${site.url}/service-areas` },
            { name: cityData.name, url: `${site.url}/service-areas/${city}` },
          ])),
        }}
      />

      {/* Hero */}
      <section className="relative bg-[var(--navy-900)] overflow-hidden">
        <div className="relative h-[380px] sm:h-[460px]">
          <Image
            src="/images/result_Patio-Sealing-TriCity-Concrete-Sealing-1.jpg"
            alt={`Concrete sealing services in ${cityData.name}, Ontario`}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="hero-gradient absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-0 flex items-end pb-10 sm:pb-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <nav aria-label="Breadcrumb" className="mb-3">
                <ol className="flex items-center gap-2 text-white/50 text-xs">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li aria-hidden="true">›</li>
                  <li><Link href="/service-areas" className="hover:text-white transition-colors">Service Areas</Link></li>
                  <li aria-hidden="true">›</li>
                  <li className="text-white">{cityData.name}</li>
                </ol>
              </nav>
              <p className="eyebrow">{cityData.region}</p>
              <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white">
                Concrete Sealing in {cityData.name}, ON
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content + Form */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="h-display text-2xl sm:text-3xl text-[var(--navy)] mb-4">
                  Professional Concrete Sealing in {cityData.name}
                </h2>
                <p className="text-[var(--concrete)] leading-relaxed mb-4">
                  TriCity Concrete Sealing serves homeowners and businesses throughout {cityData.name}{" "}
                  and the wider {cityData.region} area. Our team brings professional-grade sealers and
                  proven application expertise to every project — whether it&apos;s a residential driveway,
                  backyard patio, stamped concrete feature, or commercial surface.
                </p>
                <p className="text-[var(--concrete)] leading-relaxed">
                  We understand the specific challenges that Ontario weather poses for concrete — freeze-thaw
                  cycles, road salt, summer UV, and humidity all work to degrade unsealed surfaces. Our{" "}
                  {site.warrantyYears}-year written warranty means you can trust the results will last.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[var(--navy)] text-lg mb-4">
                  Services Available in {cityData.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}/${city}`}
                      className="card p-4 group hover:border-[var(--accent)] transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={service.image}
                            alt={`${service.title} in ${cityData.name}`}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--navy)] text-sm group-hover:text-[var(--accent)] transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-[var(--concrete)] text-xs leading-snug mt-1 line-clamp-2">
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <QuoteForm variant="card" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
