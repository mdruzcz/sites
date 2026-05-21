import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/content";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Concrete Services",
  description: `Concrete driveways and patios in Woodstock, Brantford, and Cambridge. Natural broom finish and coloured stamped concrete by ${site.name}.`,
  openGraph: {
    title: `Concrete Services | ${site.name}`,
    description: "Concrete driveways and patios in Woodstock, Brantford, and Cambridge. Natural broom and stamped finishes.",
  },
};

export const revalidate = 3600;

export default function ServicesPage() {
  const services = getServices();
  const areas = getServiceAreas();

  return (
    <>
      <section className="py-12 sm:py-16 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="eyebrow">Our Services</p>
            <h1 className="h-display text-4xl sm:text-5xl text-[var(--charcoal)] mb-4">
              Concrete Driveways & Patios
            </h1>
            <p className="text-lg text-[var(--concrete)] max-w-2xl mx-auto normal-case font-normal">
              Two services, done exceptionally well. Every project uses the same engineered reinforced base — the difference is finish style.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          {/* City+service cross-links */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-8">
            <h2 className="h-display text-2xl text-[var(--charcoal)] mb-6 text-center">Service by City</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {services.flatMap((s) =>
                areas.cities.map((c) => (
                  <Link
                    key={`${s.slug}-${c.slug}`}
                    href={`/services/${s.slug}/${c.slug}`}
                    className="text-center p-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all text-xs font-bold uppercase tracking-wide text-[var(--concrete)]"
                  >
                    {s.slug === "concrete-driveways" ? "Driveways" : "Patios"}<br />
                    <span className="font-normal normal-case">{c.name}</span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
