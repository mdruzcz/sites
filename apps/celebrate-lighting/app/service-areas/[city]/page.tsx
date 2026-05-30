import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceAreas, getCityBySlug, getServices } from "@/lib/content";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getServiceAreas().cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: `Permanent Lighting in ${city.name}`,
    description: `Permanent outdoor LED lighting installation in ${city.name}, ON. App-controlled, weatherproof, lifetime warranty. Free quote — call ${site.phone}.`,
    alternates: { canonical: `/service-areas/${citySlug}` },
    openGraph: {
      title: `Permanent Lighting Installer in ${city.name}, ON | Celebrate Lighting`,
      description: `Professional permanent LED lighting in ${city.name}, Ontario. Lifetime warranty, app-controlled, built for Canadian winters.`,
      url: `${site.url}/service-areas/${citySlug}`,
      images: [{ url: "/images/hero-main.jpg", alt: `Permanent outdoor LED lighting in ${city.name}, Ontario by Celebrate Lighting` }],
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const services = getServices();
  const areas = getServiceAreas();
  const otherCities = areas.cities.filter((c) => c.slug !== citySlug).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(services[0], city.name)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Service Areas", url: `${site.url}/service-areas` },
        { name: city.name, url: `${site.url}/service-areas/${citySlug}` },
      ])) }} />

      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/service-areas" className="hover:text-[var(--accent)]">Service Areas</Link>
            <span className="mx-2">/</span>
            <span>{city.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-eyebrow mb-3">{city.name}, Ontario</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight mb-6">
                Permanent Light Installer in {city.name}
              </h1>
              <p className="text-lg text-[var(--muted)] leading-relaxed mb-4">{city.description}</p>
              <p className="text-[var(--muted)] leading-relaxed mb-4">{city.localContext}</p>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                We offer a full range of permanent lighting solutions in {city.name}, including{" "}
                {services.map((s, i) => (
                  <span key={s.slug}>
                    <Link href={`/services/${s.slug}/${citySlug}`} className="text-[var(--accent)] hover:underline font-medium">{s.title}</Link>
                    {i < services.length - 1 ? ", " : ""}
                  </span>
                ))}.
              </p>

              <div className="space-y-3 mb-8">
                {["Licensed & Insured — fully certified contractors", "Lifetime warranty on all installations", "Weather-resistant LEDs rated to −40°C", "App-controlled via WiFi — change colours anytime", "Local team with knowledge of " + city.name + " homes"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[var(--foreground)]">{item}</span>
                  </div>
                ))}
              </div>

              {/* Other cities */}
              <div className="p-4 rounded-xl text-sm" style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}>
                <strong className="text-[var(--foreground)]">Also serving:</strong>{" "}
                {otherCities.map((c, i) => (
                  <span key={c.slug}>
                    <Link href={`/service-areas/${c.slug}`} className="text-[var(--accent)] hover:underline">{c.name}</Link>
                    {i < otherCities.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-8">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Free Quote in {city.name}</h2>
              <p className="text-sm text-[var(--muted)] mb-6">We respond within 24 hours. No obligation.</p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Service links for this city */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Our Services in {city.name}
          </h2>
          <p className="text-sm text-[var(--muted)] mb-8">Everything you need for permanent outdoor lighting in {city.name}, Ontario.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/${citySlug}`} className="card p-6 hover:shadow-md transition-shadow group">
                <h3 className="font-bold text-[var(--foreground)] mb-1 group-hover:text-[var(--accent)] transition-colors">{s.title} in {city.name}</h3>
                <p className="text-sm text-[var(--muted)]">{s.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
