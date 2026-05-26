import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceBySlug, getServices, getCityBySlug, getServiceAreas } from "@/lib/content";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getServices();
  const areas = getServiceAreas();
  return services.flatMap((s) =>
    areas.cities.map((c) => ({ slug: s.slug, city: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};
  return {
    title: `${service.title} in ${city.name}, ON`,
    description: `Expert ${service.title.toLowerCase()} in ${city.name}, Ontario. Built by ${site.name} with 4-ft frost-line footings and a 5-year workmanship warranty. Free on-site quote.`,
    openGraph: {
      title: `${service.title} in ${city.name} | ${site.name}`,
      description: `Expert ${service.title.toLowerCase()} in ${city.name}, ON. Free quote, 5-year workmanship warranty.`,
    },
  };
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  const areas = getServiceAreas();

  const cityContent: Record<string, { headline: string; intro: string }> = {
    woodstock: {
      headline: `${service.title} in Woodstock, Ontario`,
      intro: `Woodstock homeowners trust us for ${service.title.toLowerCase()} built to last. Oxford County's freeze-thaw winters demand 4-ft frost-line footings, premium lumber, and galvanized fasteners — and that's exactly what every project gets.`,
    },
    ingersoll: {
      headline: `${service.title} in Ingersoll, Ontario`,
      intro: `Ingersoll homeowners choose us for ${service.title.toLowerCase()} that holds up to Ontario weather. Same engineered footings, same premium materials, same 5-year workmanship warranty we deliver across Oxford County.`,
    },
    tillsonburg: {
      headline: `${service.title} in Tillsonburg, Ontario`,
      intro: `Tillsonburg's go-to crew for ${service.title.toLowerCase()}. We serve Tillsonburg, Brownsville, and Glen Meyer with custom builds engineered for Ontario winters and backed by a 5-year workmanship warranty.`,
    },
    norwich: {
      headline: `${service.title} in Norwich, Ontario`,
      intro: `Norwich Township homeowners rely on us for rural and acreage ${service.title.toLowerCase()} — from cedar wraparound decks on country properties to long runs of perimeter fencing. Fully insured and fully equipped for rural service calls.`,
    },
    embro: {
      headline: `${service.title} in Embro, Ontario`,
      intro: `Local ${service.title.toLowerCase()} specialists serving Embro, Thamesford, and Zorra Township. Premium materials, deep frost-line footings, and a 5-year workmanship warranty on every build.`,
    },
  };

  const content = cityContent[citySlug] || {
    headline: `${service.title} in ${city.name}, ON`,
    intro: `Expert ${service.title.toLowerCase()} in ${city.name}, Ontario. Engineered footings, premium materials, and a 5-year workmanship warranty.`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service, city.name)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Services", url: `${site.url}/services` },
              { name: service.title, url: `${site.url}/services/${service.slug}` },
              { name: city.name, url: `${site.url}/services/${service.slug}/${city.slug}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="py-12 sm:py-16 bg-[var(--charcoal)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <nav className="text-xs text-[var(--concrete-200)] mb-4 normal-case">
              <Link href="/" className="hover:text-white">Home</Link>
              {" / "}
              <Link href="/services" className="hover:text-white">Services</Link>
              {" / "}
              <Link href={`/services/${service.slug}`} className="hover:text-white">{service.title}</Link>
              {" / "}
              <span>{city.name}</span>
            </nav>
            <p className="eyebrow !text-[var(--accent)]">{city.name}, Ontario</p>
            <h1 className="h-display text-4xl sm:text-5xl mb-4">{content.headline}</h1>
            <p className="text-lg text-[var(--concrete-200)] normal-case font-normal leading-relaxed">{content.intro}</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-6">
              <div className="card p-8">
                <h2 className="h-display text-2xl text-[var(--charcoal)] mb-4">
                  {service.title} in {city.name}
                </h2>
                <p className="text-[var(--concrete)] leading-relaxed normal-case font-normal mb-4">
                  {city.description}
                </p>
                <p className="text-[var(--concrete)] leading-relaxed normal-case font-normal">
                  {service.fullDescription}
                </p>
              </div>

              <div className="card p-8">
                <h2 className="h-display text-xl text-[var(--charcoal)] mb-5">What&apos;s Included</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm text-[var(--charcoal)] normal-case">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other cities for this service */}
              <div className="card p-6">
                <h3 className="font-bold uppercase tracking-wide text-xs text-[var(--concrete)] mb-3">
                  {service.title} — Other Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {areas.cities
                    .filter((c) => c.slug !== citySlug)
                    .map((c) => (
                      <Link
                        key={c.slug}
                        href={`/services/${service.slug}/${c.slug}`}
                        className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded border border-[var(--border)] text-[var(--charcoal)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                      >
                        {c.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
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
