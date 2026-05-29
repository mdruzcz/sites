import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/site";
import { getCityBySlug, getServiceAreas, getServices } from "@/lib/content";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const areas = getServiceAreas();
  return areas.cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: `Deck Builders & Fence Installers in ${city.name}, ON`,
    description: `Expert custom decks and fence installation in ${city.name}, Ontario. Cedar, composite, vinyl, steel, and chain-link by ${site.name} — free on-site quote, 5-year workmanship warranty.`,
    openGraph: {
      title: `Deck and Fence Contractor in ${city.name} | ${site.name}`,
      description: `Deck builders and fence installers serving ${city.name}, ON. Free quote, 5-year workmanship warranty.`,
    },
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Service Areas", url: `${site.url}/service-areas` },
              { name: city.name, url: `${site.url}/service-areas/${city.slug}` },
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
              <Link href="/service-areas" className="hover:text-white">Service Areas</Link>
              {" / "}
              <span>{city.name}</span>
            </nav>
            <p className="eyebrow !text-[var(--accent)]">Serving {city.name}</p>
            <h1 className="h-display text-4xl sm:text-5xl mb-4">
              Deck Builders & Fence Installers in {city.name}, Ontario
            </h1>
            <p className="text-lg text-[var(--concrete-200)] normal-case font-normal leading-relaxed">
              {city.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-6">
              {/* Services in this city */}
              <div className="card p-8">
                <h2 className="h-display text-2xl text-[var(--charcoal)] mb-5">
                  Services in {city.name}
                </h2>
                <div className="space-y-4">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}/${city.slug}`}
                      className="flex items-start gap-4 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] hover:bg-white transition-all group"
                    >
                      <div className="w-10 h-10 rounded bg-[var(--charcoal)] flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold uppercase tracking-wide text-sm text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors">
                          {s.title} in {city.name}
                        </h3>
                        <p className="text-xs text-[var(--concrete)] normal-case mt-1">{s.shortDescription}</p>
                      </div>
                      <svg className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Why choose for this city */}
              <div className="card p-8">
                <h2 className="h-display text-xl text-[var(--charcoal)] mb-4">
                  Why Choose Us in {city.name}
                </h2>
                <ul className="space-y-3">
                  {site.features.map((f) => (
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

              {/* Other cities */}
              <div className="card p-6">
                <h3 className="font-bold uppercase tracking-wide text-xs text-[var(--concrete)] mb-3">Other Areas We Serve</h3>
                <div className="flex flex-wrap gap-2">
                  {areas.cities
                    .filter((c) => c.slug !== citySlug)
                    .map((c) => (
                      <Link
                        key={c.slug}
                        href={`/service-areas/${c.slug}`}
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
