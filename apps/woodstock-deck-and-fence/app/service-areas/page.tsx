import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceAreas, getServices } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Service Areas",
  description: `${site.name} serves Woodstock, Ingersoll, Tillsonburg, Norwich, Embro, and Oxford County with custom decks and fence installation.`,
  openGraph: {
    title: `Service Areas | ${site.name}`,
    description: "Custom decks and fence installation across Woodstock and Oxford County.",
  },
};

export const revalidate = 3600;

export default function ServiceAreasPage() {
  const areas = getServiceAreas();
  const services = getServices();

  return (
    <>
      <section className="py-12 sm:py-16 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eyebrow">Where We Work</p>
            <h1 className="h-display text-4xl sm:text-5xl text-[var(--charcoal)] mb-4">
              Service Areas
            </h1>
            <p className="text-lg text-[var(--concrete)] max-w-2xl mx-auto normal-case font-normal">
              Serving Woodstock and all of Oxford County with custom decks and professional fence installation. Local crews, no travel surcharges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-6 hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all group"
              >
                <h2 className="font-bold uppercase tracking-wide text-base text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors mb-2">
                  {city.name}, ON
                </h2>
                <p className="text-sm text-[var(--concrete)] leading-relaxed normal-case mb-4">
                  {city.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {services.slice(0, 4).map((s) => (
                    <span
                      key={s.slug}
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--concrete)]"
                    >
                      {s.title}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="card p-6 text-center">
            <p className="text-sm text-[var(--concrete)] normal-case">
              Also serving: <strong>Thamesford</strong> · <strong>Innerkip</strong> · <strong>Brownsville</strong> · <strong>Plattsville</strong> · <strong>Otterville</strong> and surrounding Oxford County communities.
              Contact us to confirm availability in your area.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
