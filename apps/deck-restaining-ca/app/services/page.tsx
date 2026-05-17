import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Services | Deck & Fence Staining",
  description: `Professional deck restaining, stripping, sanding, restoration, and fence staining services in ${site.serviceAreas.join(", ")}. Oil-based stains only.`,
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

      <section className="bg-[var(--wood-dark)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl">
            From a simple restain to a complete multi-step restoration — we bring weathered
            wood back to life with premium oil-based products and professional technique.
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
                  <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                    <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-stone-600 mb-4">{service.shortDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((f) => (
                        <span key={f} className="text-xs bg-amber-50 text-amber-800 px-2 py-1 rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-stone-400 group-hover:text-[var(--accent)] transition-colors shrink-0 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
