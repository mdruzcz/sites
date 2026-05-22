import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceAreas, getCityBySlug, getFeaturedServices } from "@/lib/content";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";

export const revalidate = 3600;

export async function generateStaticParams() {
  const areas = getServiceAreas();
  return areas.map((a) => ({ city: a.slug }));
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = getCityBySlug(city);
  if (!area) return {};
  return {
    title: `HVAC Service in ${area.city}, ${area.county} | Furnace & AC`,
    description: `${site.name} provides furnace repair, AC installation, heat pump conversions, and HVAC service in ${area.city}, ${area.county}. TSSA G2 certified. Free quotes.`,
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const area = getCityBySlug(city);
  if (!area) notFound();
  const services = getFeaturedServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ title: "HVAC Service", fullDescription: area.description, slug: `service-areas/${area.slug}` }, area.city)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Service Areas", url: `${site.url}/service-areas` },
              { name: area.city, url: `${site.url}/service-areas/${area.slug}` },
            ])
          ),
        }}
      />

      <section className="bg-[var(--navy)] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow-cool">{area.county}</p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              HVAC Service in {area.city}
            </h1>
            <p className="text-white/70 text-lg">{area.headline}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-[var(--navy)] mb-4">
                  {site.name} in {area.city}
                </h2>
                <p className="text-[var(--slate)] leading-relaxed mb-4">{area.description}</p>
                <p className="text-[var(--slate)] leading-relaxed">
                  Our TSSA G2 certified technicians serve {area.city} homeowners with the same professional standard we bring to every job in Oxford County and southwestern Ontario. We&apos;re fully insured, WSIB covered, and committed to getting your heating and cooling system running at its best.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[var(--navy)] mb-4">
                  HVAC Services Available in {area.city}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}/${area.slug}`}
                      className="card px-4 py-3 hover:border-[var(--cool)] hover:shadow-sm transition-all group flex items-center gap-3"
                    >
                      <span className="text-xl">{service.icon}</span>
                      <span className="text-sm font-bold text-[var(--navy)] group-hover:text-[var(--heat)] transition-colors">
                        {service.title}
                      </span>
                    </Link>
                  ))}
                  <Link href="/services" className="card px-4 py-3 hover:border-[var(--cool)] transition-all flex items-center gap-3 text-[var(--cool)] font-bold text-sm">
                    View all services →
                  </Link>
                </div>
              </div>

              <div className="card p-6 bg-[var(--surface)]">
                <h3 className="font-bold text-[var(--navy)] mb-3">Why {area.city} Homeowners Choose Us</h3>
                <ul className="space-y-2">
                  {[
                    `Local TSSA G2 certified technicians serving ${area.county}`,
                    "Same-day and emergency service available",
                    "Up to $40,000 in heat pump rebates — we handle applications",
                    "All major brands serviced and installed",
                    "Free in-home estimates, no obligation",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[var(--slate)]">
                      <svg className="w-4 h-4 text-[var(--cool)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <QuoteForm formType="quote" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
