import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceAreas } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Deck Staining Service Areas | Toronto & GTA",
  description: "Toronto Deck Stainers serves all of the Greater Toronto Area — Richmond Hill, Vaughan, Markham, Mississauga, Brampton, Oakville, Scarborough, and more.",
  openGraph: { title: "GTA Deck Staining Service Areas", description: "Deck staining and restoration across Toronto and all GTA communities.", url: `${site.url}/service-areas` },
};

export default function ServiceAreasPage() {
  const areas = getServiceAreas();

  return (
    <>
      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Where We Serve</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-5 max-w-3xl">
            Deck Staining Across Toronto &amp; the GTA
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Local crews, local knowledge. We serve homeowners across the entire Greater Toronto Area
            — from Pickering in the east to Oakville in the west, and all points north and south.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-7 hover:border-[var(--accent)] hover:-translate-y-1 transition-all group"
              >
                <h2 className="font-bold text-lg text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors mb-2">
                  {city.name}, ON
                </h2>
                <p className="text-sm text-[var(--concrete)] leading-relaxed">{city.description}</p>
                <p className="mt-4 text-[var(--accent)] text-sm font-bold group-hover:underline">
                  View deck staining in {city.name} →
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
