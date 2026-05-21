import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Wheelchair Ramp Services — Installation, Rental & Events",
  description:
    "Permanent ramp installation, temporary ramp rental, event accessibility, and handrail installation across Ontario. AODA compliant, aluminum, free consultations.",
  alternates: { canonical: `${site.url}/services` },
};

export default function ServicesPage() {
  const services = getServices();
  const breadcrumbs = [
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />

      <section className="hero-gradient text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span>Services</span>
          </nav>
          <p className="eyebrow text-blue-200">Our Services</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Every accessibility need covered.
          </h1>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            From permanent aluminum ramp installations to flexible rentals, event accessibility, and handrail installation — we do one thing and we do it right.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card p-8 group hover:-translate-y-1 transition-all duration-200 card-accented"
              >
                <h2 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h2>
                <p className="text-muted-strong text-sm sm:text-base leading-relaxed mb-5">
                  {service.shortDescription}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-strong">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                      >
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-1.5 text-accent text-sm font-bold">
                  Learn more
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
