import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { cities, site } from "@/lib/site";
import { PICKS } from "@/lib/photos";
import { MapPinIcon, ArrowRightIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas: Hamilton, Burlington, Oakville, Niagara & More",
  description: "Festive installs classic Christmas lights and permanent LED systems across Hamilton, Burlington, Oakville, Mississauga, Brampton, Milton, Ancaster, Grimsby, St. Catharines and Niagara Falls.",
  alternates: { canonical: `${site.url}/service-areas` },
};

export default function ServiceAreasPage() {
  return (
    <>
      <NavBar />
      <PageHero photo={PICKS.heroAreas} eyebrow="Service areas" title="Hamilton to Niagara, Oakville to Brampton." intro="Crews based in Hamilton, covering the lakeshore, Halton, Peel and the Niagara Region. Pick your city for local details." crumbs={[{ label: "Service areas" }]} compact />
      <section className="bg-[var(--snow)]">
        <div className="shell section grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
            <Link key={c.slug} href={`/service-areas/${c.slug}`} className="card card-lift group flex flex-col p-6">
              <span className="flex items-center gap-2 text-[var(--candy)]"><MapPinIcon className="w-4 h-4" /><span className="eyebrow">{c.region}</span></span>
              <h2 className="font-display mt-2 text-2xl group-hover:text-[var(--candy)]">{c.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{c.description}</p>
              <p className="mt-3 text-xs text-[var(--muted)]">{c.neighbourhoods.slice(0, 4).join(" · ")}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--candy-deep)]">Lighting in {c.name} <ArrowRightIcon className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand heading="Not on the list? Ask anyway." sub="We regularly travel beyond these cities for larger residential and commercial projects." />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
