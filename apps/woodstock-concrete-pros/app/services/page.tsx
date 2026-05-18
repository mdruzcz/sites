import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Concrete Services in Woodstock, ON",
  description: `Professional concrete services: driveways, stamped patios, walkways, repairs, exposed aggregate, and garage floors. Serving ${site.serviceAreas.join(", ")}.`,
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

      <section className="relative overflow-hidden">
        <Image
          src="/images/concrete-driveway-exposed-aggregate.jpg"
          alt="Clean concrete driveway with exposed aggregate border in Southwestern Ontario"
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-[var(--charcoal)]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Our Concrete Services
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Expert concrete services tailored to Southwestern Ontario&apos;s harsh climate.
            From new installations to repairs, every project uses premium, winter-resistant materials.
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
                  <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center shrink-0 group-hover:bg-yellow-100 transition-colors">
                    <svg className="w-6 h-6 text-[var(--accent-700)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-xl mb-2 group-hover:text-[var(--accent-700)] transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-slate-600 mb-4">{service.shortDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((f) => (
                        <span key={f} className="text-xs bg-yellow-50 text-yellow-800 px-2 py-1 rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-[var(--accent-700)] transition-colors shrink-0 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Proudly Serving"
            title="Our Service Areas"
            description="Professional concrete services across Oxford County and Southwestern Ontario."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {site.serviceAreas.map((area) => (
              <div key={area} className="card p-4 text-center">
                <p className="font-semibold text-slate-900">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
