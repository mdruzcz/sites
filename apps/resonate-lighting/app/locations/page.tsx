import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getCities } from "@/lib/content";
import { formatCad, pricing, zoneForProvince, type ZoneId } from "@/lib/pricing";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const title = "Locations: Pixel Lighting Across Canada";
const description =
  "Resonate Lighting installs music-reactive pixel lighting in any Canadian city. Climate, district and travel notes for 20 cities from Vancouver to St. John's.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/locations` },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/locations` },
  twitter: { title: `${title} | ${site.name}`, description },
};

const ZONE_ORDER: ZoneId[] = ["home", "prairies", "national", "east", "north"];

export default function LocationsPage() {
  const cities = getCities();
  const byZone = ZONE_ORDER.map((z) => ({ id: z, zone: pricing.travel.zones[z], cities: cities.filter((c) => zoneForProvince(c.province) === z) })).filter(
    (g) => g.cities.length || g.id === "north",
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Resonate Lighting service locations",
          itemListElement: cities.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: `${site.url}/locations/${c.slug}` })),
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Locations", url: `${site.url}/locations` }])} />

      <section className="bg-ink-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">Locations</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Installed anywhere in <span className="gradient-text">Canada</span>.
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            We are based in {pricing.travel.homeRegion} and our crews install in any city in Canada, with applicable travel charges by zone. Each city page covers the local winter, how we install for it, the commercial districts and BIAs we work with, and what travel costs.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {byZone.map((g) => (
            <div key={g.id}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
                <div>
                  <h2 className="h-display text-2xl text-white">{g.zone.name}</h2>
                  <p className="text-sm text-muted">{g.zone.summary}</p>
                </div>
                <p className="text-sm text-muted-strong">
                  {g.zone.tripFee ? `${formatCad(g.zone.tripFee)} per crew trip` : "No trip fee"}
                  {g.zone.accommodationPerNight ? ` · ${formatCad(g.zone.accommodationPerNight)} per crew-night on multi-day jobs` : ""}
                </p>
              </div>
              {g.cities.length ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {g.cities.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/locations/${c.slug}`} className="card card-glow p-5 flex flex-col h-full">
                        <span className="text-[11px] uppercase tracking-widest text-muted font-semibold">{c.provinceName}</span>
                        <span className="text-lg font-bold text-white">{c.name}</span>
                        <span className="text-sm text-muted-strong mt-1 line-clamp-2">{c.climate}</span>
                        <span className="text-resonant text-sm font-semibold mt-3">Lighting in {c.name} →</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-strong">Yukon, Northwest Territories and Nunavut projects are quoted individually.</p>
              )}
            </div>
          ))}
          <div className="card p-7 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Not on the list?</h2>
            <p className="text-muted-strong mb-5">Installation is available in any city or town in Canada with applicable travel charges. Tell us where the site is and we will include travel in your quote.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact#quote" className="btn btn-primary">Request a quote</Link>
              <Link href="/pricing#installation" className="btn btn-ghost">Installation &amp; travel rates</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-ink-800 border-y border-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Who we serve" title="Commercial, BIA and municipal." description="Every city page links to the kits and to the client types we work with most." />
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/commercial" className="seg">Commercial spaces</Link>
            <Link href="/bia" className="seg">BIAs and main streets</Link>
            <Link href="/municipal" className="seg">Municipalities</Link>
            <Link href="/kits" className="seg">Kits</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
