import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { getServiceAreas } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "SW Ontario Service Areas",
  description:
    "Professional wedding and event lighting in London, Kitchener-Waterloo, Guelph, Stratford, St. Thomas, and Woodstock, Ontario. Travel included in all packages.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: "Service Areas | Bright Event Lighting",
    description: "We bring professional lighting to venues across Southwestern Ontario.",
    url: `${site.url}/service-areas`,
  },
};

export const revalidate = 3600;

export default function ServiceAreasPage() {
  const areas = getServiceAreas();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Service Areas", url: `${site.url}/service-areas` },
            ])
          ),
        }}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            as="h1"
            eyebrow="Where We Work"
            headline="Lighting Every Corner of SW Ontario"
            description="Travel is included in all packages — no hidden fees. We know these venues inside and out."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-6 hover:border-[var(--accent)]/40 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-[var(--accent)]" />
                  <h2 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {city.name}
                  </h2>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
                  {city.focus}
                </p>
                <div className="flex flex-wrap gap-1">
                  {city.venues.slice(0, 3).map((venue) => (
                    <span
                      key={venue}
                      className="text-xs px-2 py-1 rounded bg-[var(--accent)]/5 text-[var(--muted)]/60"
                    >
                      {venue}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
