import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "HVAC Services | Furnace, AC, Heat Pumps & More",
  description: `Complete HVAC services in Oxford County from ${site.name}. Furnace repair, AC installation, heat pump conversions, mini-splits, IAQ, tankless water heaters, and maintenance plans.`,
};

export const revalidate = 3600;

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Services", url: `${site.url}/services` },
            ])
          ),
        }}
      />
      <section className="bg-[var(--navy)] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow-cool">What We Do</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Complete Heating & Cooling Services
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            TSSA G2 certified service for everything from emergency furnace repair to full heat pump installations with rebate applications.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card p-6 sm:p-8 hover:shadow-md hover:border-[var(--cool)] transition-all group flex gap-5"
              >
                <div className="text-4xl flex-shrink-0">{service.icon}</div>
                <div>
                  <h2 className="font-bold text-xl text-[var(--navy)] mb-2 group-hover:text-[var(--heat)] transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-[var(--slate)] text-sm leading-relaxed mb-3">
                    {service.shortDescription}
                  </p>
                  {"rebateHighlight" in service && service.rebateHighlight && (
                    <span className="inline-block text-xs font-bold text-[var(--cool)] bg-[var(--cool)]/10 px-2 py-1 rounded">
                      {service.rebateHighlight}
                    </span>
                  )}
                  <p className="text-[var(--heat)] font-bold text-sm mt-2 group-hover:underline">
                    Learn more →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy)] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            Need a Free Estimate?
          </h2>
          <p className="text-white/70 mb-6">
            Tell us what you need — we&apos;ll provide a no-obligation quote within {site.responseTime}.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
