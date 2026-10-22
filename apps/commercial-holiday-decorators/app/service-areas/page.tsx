import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getAbout, getCities, getImage } from "@/lib/content";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, Photo } from "@/components/ui";
import { PageHero, ClosingForm } from "@/components/sections";

export const revalidate = 3600;

const title = "Commercial Holiday Decorating Service Areas in Ontario";
const description = "Commercial Christmas light installation and holiday decor for hotels, lobbies, plazas and offices in Toronto, Mississauga, Hamilton, Kitchener-Waterloo, London, Niagara, Windsor, Barrie and across Ontario.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/service-areas" },
  openGraph: { title, description, url: `${site.url}/service-areas` },
};

export default function ServiceAreasPage() {
  const cities = getCities();
  const about = getAbout();
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, description, url: `${site.url}/service-areas` }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Service areas", url: `${site.url}/service-areas` }])]} />
      <PageHero image="downtown-street-trees-wrapped-warm-white-christmas-lights" eyebrow="Service areas" title="Crews across Southwestern Ontario, the GTA and Niagara" sub={about.serviceAreaBlurb} align="narrow" crumbs={<Breadcrumbs items={[{ name: "Service areas" }]} />} />
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
            <Link key={c.slug} href={`/service-areas/${c.slug}`} className="card card-lift overflow-hidden flex flex-col group">
              <Photo img={getImage(c.heroImage)} ratio="aspect-[16/10]" className="!rounded-none" />
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-ink)]">{c.region}</p>
                <h2 className="mt-1 font-bold text-xl text-ink">{c.name}</h2>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed flex-1">{c.metaDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-ink)]">{c.logistics.driveFromLondon} from London <Icon.Arrow width={14} height={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ClosingForm title="Not on the list? We travel for the right program." body="Multi-site portfolios, giant trees and municipal programs take us well beyond these cities. Tell us where the property is and we’ll confirm whether we can be there this season." />
    </>
  );
}
