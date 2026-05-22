import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServices, getServiceBySlug, getServiceAreas, getCityBySlug } from "@/lib/content";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";

type Props = { params: Promise<{ slug: string; city: string }> };

export async function generateStaticParams() {
  const services = getServices();
  const areas = getServiceAreas();
  const params: { slug: string; city: string }[] = [];
  for (const service of services) {
    for (const city of areas.cities) {
      params.push({ slug: service.slug, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};
  return {
    title: `${service.title} in ${city.name}, ON`,
    description: `Professional ${service.title.toLowerCase()} in ${city.name}, Ontario. Expert retaining wall contractors serving ${city.name} and surrounding areas. Free on-site estimates.`,
  };
}

export const revalidate = 3600;

export default async function ServiceCityPage({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service, city.name)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: service.title, url: `${site.url}/services/${service.slug}` },
            { name: city.name, url: `${site.url}/services/${service.slug}/${city.slug}` },
          ])),
        }}
      />

      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="eyebrow !text-[var(--accent)]">{city.name}, Ontario</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {service.title} in {city.name}
          </h1>
          <p className="text-[var(--concrete-200)] max-w-2xl leading-relaxed">
            Professional {service.title.toLowerCase()} serving {city.name} and surrounding areas. Engineered for Ontario&apos;s climate with proper drainage and structural integrity.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="font-bold text-xl uppercase tracking-wide text-[var(--charcoal)] mb-4">
                Expert {service.title} in {city.name}
              </h2>
              <p className="text-[var(--concrete)] leading-relaxed mb-6">
                {service.description}
              </p>
              <p className="text-[var(--concrete)] leading-relaxed mb-6">
                Our team proudly serves {city.name} (population {city.population}) and the surrounding communities. We understand the unique soil conditions and terrain challenges in this area and design every wall to withstand decades of Ontario weather.
              </p>

              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--charcoal)] mb-3">What&apos;s Included</h3>
              <ul className="space-y-3 mb-8">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[var(--concrete)]">
                    <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--charcoal)] mb-3">Why {city.name} Homeowners Choose Us</h3>
              <ul className="space-y-3">
                {[
                  `Local expertise — we understand ${city.name}'s soil and climate`,
                  "Proper drainage to prevent hydrostatic pressure",
                  "Engineered base preparation for zero shifting",
                  "Written workmanship warranty included",
                  "Clean site promise — we respect your property",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[var(--concrete)]">
                    <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28">
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
