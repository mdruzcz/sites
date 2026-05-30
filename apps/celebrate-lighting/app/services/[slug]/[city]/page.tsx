import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServices, getServiceBySlug, getServiceAreas, getCityBySlug } from "@/lib/content";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getServices();
  const areas = getServiceAreas();
  return services.flatMap((s) =>
    areas.cities.map((c) => ({ slug: s.slug, city: c.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; city: string }> }): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};
  return {
    title: `${service.title} in ${city.name}`,
    description: `Professional ${service.title.toLowerCase()} in ${city.name}, ON. Permanent app-controlled outdoor LED lighting, weatherproof with a lifetime warranty. Call ${site.phone}.`,
    alternates: { canonical: `/services/${slug}/${citySlug}` },
    openGraph: {
      title: `${service.title} in ${city.name}, Ontario | Celebrate Lighting`,
      description: `Professional ${service.title.toLowerCase()} in ${city.name}, ON. App-controlled, weatherproof, lifetime warranty.`,
      url: `${site.url}/services/${slug}/${citySlug}`,
      images: [{ url: "/images/hero-main.jpg", alt: `${service.title} in ${city.name}, Ontario by Celebrate Lighting` }],
    },
  };
}

export default async function ServiceCityPage({ params }: { params: Promise<{ slug: string; city: string }> }) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  const areas = getServiceAreas();
  const otherCities = areas.cities.filter((c) => c.slug !== citySlug).slice(0, 4);
  const services = getServices();
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service, city.name)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Services", url: `${site.url}/services` },
        { name: service.title, url: `${site.url}/services/${slug}` },
        { name: city.name, url: `${site.url}/services/${slug}/${citySlug}` },
      ])) }} />

      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8 flex flex-wrap gap-1">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/services" className="hover:text-[var(--accent)]">Services</Link>
            <span className="mx-1">/</span>
            <Link href={`/services/${slug}`} className="hover:text-[var(--accent)]">{service.title}</Link>
            <span className="mx-1">/</span>
            <span>{city.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-eyebrow mb-3">{city.name}, Ontario</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight mb-6">
                {service.title} in {city.name}, Ontario
              </h1>
              <p className="text-lg text-[var(--muted)] leading-relaxed mb-4">
                Looking for professional {service.title.toLowerCase()} in {city.name}? Celebrate Lighting brings permanent outdoor LED lighting to {city.name} homes and businesses — app-controlled, weatherproof, and built for Ontario winters.
              </p>
              <p className="text-[var(--muted)] leading-relaxed mb-4">{city.description}</p>
              <p className="text-[var(--muted)] leading-relaxed mb-6">{city.localContext}</p>
              <ul className="space-y-3 mb-8">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 shrink-0" style={{ color: "var(--accent)" }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[var(--foreground)]">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Interlinking — other cities */}
              <div className="p-4 rounded-xl text-sm mb-6" style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}>
                <strong className="text-[var(--foreground)]">Also available in:</strong>{" "}
                {otherCities.map((c, i) => (
                  <span key={c.slug}>
                    <Link href={`/services/${slug}/${c.slug}`} className="text-[var(--accent)] hover:underline">{c.name}</Link>
                    {i < otherCities.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>

              {/* Interlinking — city landing page */}
              <p className="text-sm text-[var(--muted)]">
                See all services available in{" "}
                <Link href={`/service-areas/${citySlug}`} className="text-[var(--accent)] hover:underline font-medium">{city.name}</Link>.
              </p>
            </div>

            <div className="card p-8">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                Get a Free Quote in {city.name}
              </h2>
              <p className="text-sm text-[var(--muted)] mb-6">We respond within 24 hours. No obligation.</p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Other services in this city */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Other Services in {city.name}</h2>
          <p className="text-sm text-[var(--muted)] mb-6">Celebrate Lighting offers a full range of permanent lighting services in {city.name}, Ontario.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/${citySlug}`} className="card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-bold text-[var(--foreground)] mb-1 group-hover:text-[var(--accent)] transition-colors text-sm">{s.title} in {city.name}</h3>
                <p className="text-xs text-[var(--muted)]">{s.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
