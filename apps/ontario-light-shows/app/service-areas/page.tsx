import type { Metadata } from "next";
import Link from "next/link";
import { getServiceAreas } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas — Light Show & LED Installations Across Ontario",
  description: `${site.name} installs music-synchronized LED light shows and permanent holiday lighting across Toronto, Ottawa, Hamilton, London, Windsor, Chatham-Kent, Mississauga, and Kitchener-Waterloo.`,
  alternates: { canonical: `${site.url}/service-areas` },
};

export default function ServiceAreasPage() {
  const areas = getServiceAreas();
  return (
    <>
      <section className="bg-midnight-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">Where We Light Things Up</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Ontario, end to end.
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            Core service zones cover the GTA, Ottawa, Hamilton, London, Windsor, Chatham-Kent, Mississauga, and Kitchener-Waterloo. For larger events or commercial installs, we travel anywhere in Ontario.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Locations" title="Browse by city." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card card-glow p-7 group hover:-translate-y-1 transition-transform"
              >
                <p className="text-[11px] uppercase tracking-widest text-accent font-bold mb-2">{city.name}, ON</p>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  {city.name}
                </h3>
                <p className="text-muted-strong text-sm leading-relaxed line-clamp-4">
                  {city.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-accent inline-flex items-center">
                  Explore {city.name}
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
