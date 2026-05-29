import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/content";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Services | Permanent Outdoor Lighting — Celebrate Lighting",
  description:
    "Explore Celebrate Lighting's full range of services: new installations, repairs, consultations, maintenance, and system replacements across Southwestern Ontario.",
  openGraph: {
    title: "Services | Permanent Outdoor Lighting — Celebrate Lighting",
    description: "New installs, repairs, maintenance, and consultation for permanent outdoor LED lighting in SW Ontario.",
    url: "https://celebratelighting.ca/services",
  },
};

export default function ServicesPage() {
  const services = getServices();
  const areas = getServiceAreas();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Services", url: `${site.url}/services` },
      ])) }} />

      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <span>Services</span>
          </nav>
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">What We Do</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight mb-4">
              Our Services
            </h1>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              From brand-new permanent LED installations to repairs and maintenance, Celebrate Lighting handles every aspect of your outdoor lighting needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.slug} className="card p-8">
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">{service.title}</h2>
                <p className="text-[var(--muted)] leading-relaxed mb-4">{service.fullDescription}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                      <svg className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Link href={`/services/${service.slug}`} className="btn btn-primary text-sm">Learn More</Link>
                  <Link href="/contact" className="btn btn-outline text-sm">Get Quote</Link>
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--border)]">
                  <p className="text-xs text-[var(--muted)]">
                    Available in:{" "}
                    {areas.cities.map((c, i) => (
                      <span key={c.slug}>
                        <Link href={`/services/${service.slug}/${c.slug}`} className="text-[var(--accent)] hover:underline">{c.name}</Link>
                        {i < areas.cities.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--foreground)" }} className="py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8">Contact us today for a free consultation and transparent quote for your home or business.</p>
          <Link href="/contact" className="btn btn-primary px-8 text-base">Book Your Free Consultation</Link>
        </div>
      </section>
    </>
  );
}
