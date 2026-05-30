import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceAreas, getServices } from "@/lib/content";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Service Areas in SW Ontario",
  description:
    "Permanent outdoor LED lighting installation across Southwestern Ontario — London, Waterloo, Guelph, Brantford, St. Thomas, Stratford, Tillsonburg & Woodstock.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: "Service Areas | Celebrate Lighting — SW Ontario LED Lighting",
    description: "Professional permanent outdoor LED lighting installation across Southwestern Ontario. Find your city.",
    url: "https://celebratelighting.ca/service-areas",
    images: [{ url: "/images/hero-main.jpg", alt: "Celebrate Lighting service areas across Southwestern Ontario" }],
  },
};

export default function ServiceAreasPage() {
  const areas = getServiceAreas();
  const services = getServices();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Service Areas", url: `${site.url}/service-areas` },
      ])) }} />

      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <span>Service Areas</span>
          </nav>
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Where We Work</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight mb-4">
              Our Service Areas
            </h1>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Celebrate Lighting serves homes and businesses across Southwestern Ontario. Click your city to see local pricing, project examples, and availability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-6 hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                  <svg className="w-5 h-5" style={{ color: "var(--accent)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="font-bold text-[var(--foreground)] mb-1 group-hover:text-[var(--accent)] transition-colors">{city.name}</h2>
                <p className="text-xs text-[var(--muted)]">Population ~{city.population}</p>
                <span className="mt-3 text-xs font-semibold text-[var(--accent)] flex items-center gap-1">
                  View services
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-[var(--muted)] mb-2">Don&apos;t see your city?</p>
            <p className="text-sm text-[var(--muted)] mb-6">We serve many communities beyond those listed. Contact us and we&apos;ll confirm service availability in your area.</p>
            <Link href="/contact" className="btn btn-primary px-8">Contact Us to Check Your Area</Link>
          </div>
        </div>
      </section>

      {/* Cross-link table */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8 text-center">Services by Location</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--surface-2)" }}>
                  <th className="text-left p-3 font-semibold text-[var(--foreground)]">Service</th>
                  {areas.cities.slice(0, 5).map((c) => (
                    <th key={c.slug} className="text-center p-3 font-semibold text-[var(--foreground)]">
                      <Link href={`/service-areas/${c.slug}`} className="hover:text-[var(--accent)]">{c.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((s, i) => (
                  <tr key={s.slug} style={{ background: i % 2 === 0 ? "#fff" : "var(--surface)" }}>
                    <td className="p-3 font-medium text-[var(--foreground)]">
                      <Link href={`/services/${s.slug}`} className="hover:text-[var(--accent)]">{s.title}</Link>
                    </td>
                    {areas.cities.slice(0, 5).map((c) => (
                      <td key={c.slug} className="p-3 text-center">
                        <Link href={`/services/${s.slug}/${c.slug}`} className="text-[var(--accent)] hover:underline text-xs">✓</Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
