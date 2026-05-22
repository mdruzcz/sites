import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceAreas, getCityBySlug, getServices } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getServiceAreas().cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: `Retaining Walls in ${city.name}, ON`,
    description: `Professional retaining wall contractors in ${city.name}, Ontario. Armour stone, interlocking blocks, erosion control, and wall repair. Free estimates.`,
  };
}

export const revalidate = 3600;

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const services = getServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Service Areas", url: `${site.url}/service-areas` },
            { name: city.name, url: `${site.url}/service-areas/${city.slug}` },
          ])),
        }}
      />

      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="eyebrow !text-[var(--accent)]">Service Area</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Retaining Walls in {city.name}
          </h1>
          <p className="text-[var(--concrete-200)] max-w-2xl leading-relaxed">
            {city.description}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="font-bold text-lg uppercase tracking-wide text-[var(--charcoal)] mb-4">
                Our Services in {city.name}
              </h2>
              <p className="text-[var(--concrete)] leading-relaxed mb-8">
                We provide full-service retaining wall solutions to homeowners and businesses in {city.name} (population {city.population}). Whether you need a new residential wall, armour stone installation, or repair for an existing structure, our team delivers engineered results built for Ontario&apos;s climate.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}/${city.slug}`}
                    className="card p-4 hover:shadow-md transition-shadow group"
                  >
                    <h3 className="font-bold text-sm uppercase tracking-wide text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[var(--concrete)] mt-1 line-clamp-2">{service.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28">
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
