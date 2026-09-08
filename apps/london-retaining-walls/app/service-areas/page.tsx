import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { WallTypes } from "@/components/Sections";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { PICKS, cityPhoto } from "@/lib/photos";
import { getCities } from "@/lib/content";

export const revalidate = 3600;
const TITLE = "Retaining Wall Contractor Service Areas | SW Ontario";
const DESC = "Retaining wall installation and repair in London, St. Thomas, Woodstock, Strathroy, Brantford and nine more Southwestern Ontario communities. Free site visits.";
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: `${site.url}/service-areas` }, openGraph: { title: TITLE, description: DESC, url: `${site.url}/service-areas`, images: [{ url: PICKS.areas.image, alt: PICKS.areas.alt }] }, twitter: { card: "summary_large_image", title: TITLE, description: DESC } };

export default function ServiceAreasPage() {
  const cities = getCities();
  const ordered = site.cities.map((c) => ({ c, page: cities.find((p) => p.slug === c.route)!, idx: cities.findIndex((p) => p.slug === c.route) })).filter((x) => x.page);
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Service areas", href: "/service-areas" }])} />
      <PageHero photo={PICKS.areas} kicker="Service areas" title="Where we build retaining walls" intro="Based in London and working within about 40 minutes in every direction, from Lucan down to Aylmer and Strathroy across to Woodstock and Brantford." crumbs={[{ name: "Home", href: "/" }, { name: "Service areas", href: "/service-areas" }]} />
      <section className="section bg-paper">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map(({ c, page, idx }) => {
            const p = cityPhoto(idx);
            return (
              <Link key={c.slug} href={`/${c.route}`} className="group card flex flex-col overflow-hidden">
                <div className="relative aspect-[16/9]"><Image src={p.image} alt={`Retaining wall work near ${c.name}, Ontario`} fill sizes="(max-width:640px) 100vw, 33vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover transition duration-500 group-hover:scale-[1.03]" /></div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="kicker">{page.county}</p>
                  <h2 className="mt-2 font-display text-2xl font-extrabold uppercase tracking-tight group-hover:text-accent-2">{c.name}</h2>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-2">{page.terrainNote}</p>
                  <p className="mt-3 text-[13px] text-stone">{page.areas.slice(0, 4).join(" · ")}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <WallTypes />
      <CtaBand />
    </>
  );
}
