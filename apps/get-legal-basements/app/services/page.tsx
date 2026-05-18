import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Services — Basement Renovation & Legal Apartments",
  description: `Complete basement renovation services in London, ON: legal apartments, underpinning, waterproofing, finishing, egress windows, bathrooms, and foundation repair. Call ${site.phone}.`,
};

export const revalidate = 3600;

export default function ServicesPage() {
  const services = getServices();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Comprehensive basement renovation services from legal second suites to foundation
            repair. Every project is fully permitted, code-compliant, and backed by our 2-year
            workmanship warranty.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card p-6 sm:p-8 block hover:shadow-md transition-shadow group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                    <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-slate-600 mb-4">{service.shortDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((f) => (
                        <span key={f} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-[var(--accent)] transition-colors shrink-0 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
