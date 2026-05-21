import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceAreas, getCityBySlug, getServices } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";
import { QuoteForm } from "@/components/QuoteForm";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export function generateStaticParams() {
  return getServiceAreas().cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: `Wheelchair Ramp Installation & Rental in ${city.name}, ON`,
    description: `Professional wheelchair ramp installation and rental in ${city.name}, Ontario. Permanent installs, flexible rental, event accessibility. AODA compliant. Free consultations.`,
    alternates: { canonical: `${site.url}/service-areas/${slug}` },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const services = getServices();
  const breadcrumbs = [
    { name: "Home", url: site.url },
    { name: "Service Areas", url: `${site.url}/service-areas` },
    { name: city.name, url: `${site.url}/service-areas/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(services[0], city.name)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />

      {/* Hero */}
      <section className="hero-gradient text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/service-areas" className="hover:text-white">Service Areas</Link>
            <span className="mx-2">/</span>
            <span>{city.name}</span>
          </nav>
          <p className="eyebrow text-blue-200">Service Area</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4 max-w-3xl">
            Wheelchair Ramp Installation & Rental in {city.name}, Ontario
          </h1>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">{city.description}</p>
        </div>
      </section>

      {/* Content + form */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* Services in this city */}
              <div>
                <h2 className="h-display text-2xl sm:text-3xl text-gray-900 mb-6">
                  Our services in {city.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="card p-6 group hover:border-accent transition-colors card-accented"
                    >
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-strong text-sm leading-relaxed line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Why us in this city */}
              <div className="card p-8 bg-surface">
                <h2 className="font-bold text-xl text-gray-900 mb-4">
                  Why {city.name} clients choose Ontario Ramp Solutions
                </h2>
                <ul className="space-y-3">
                  {[
                    `Fast service in ${city.name} — most installs booked within 48–72 hours`,
                    "AODA and Ontario Building Code compliant installations",
                    "Aluminum ramps engineered for Ontario winters",
                    "Free on-site consultation and written quote",
                    "Flexible rental terms — daily, weekly, or monthly",
                    "Event accessibility specialists for venues in and around " + city.name,
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-strong text-sm">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sticky quote form */}
            <div className="lg:col-span-1">
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
