import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { MapPinIcon, ArrowRightIcon } from "@/components/icons";
import { cities } from "@/lib/cities";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas: Kitchener, Waterloo, Cambridge, Guelph & More",
  description: "Classic Christmas Lighting installs Christmas lights across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, Woodstock and Stratford with no travel charges. Pick your city for local details.",
  alternates: { canonical: `${site.url}/service-areas` },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero photo={PICKS.heroAreas} eyebrow="Service areas" title="Kitchener-Waterloo and the towns around it." intro="Based in Kitchener, covering Waterloo Region, Guelph, Hamilton, Woodstock and Stratford with no travel charges. Pick your city for local details." crumbs={[{ label: "Service areas" }]} compact />
      <section className="bg-[var(--snow)]">
        <div className="shell section grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
            <Link key={c.slug} href={`/service-areas/${c.slug}`} className="card card-lift group flex flex-col p-6">
              <span className="flex items-center gap-2 text-[var(--candy)]"><MapPinIcon className="w-4 h-4" /><span className="eyebrow">{c.region} · pop. {c.population}</span></span>
              <h2 className="font-display mt-2 text-2xl group-hover:text-[var(--candy)]">{c.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{c.description}</p>
              <p className="mt-3 text-xs text-[var(--muted)]">{c.neighbourhoods.slice(0, 4).join(" · ")}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--candy-deep)]">Christmas lights in {c.name} <ArrowRightIcon className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand heading="Not on the list? Ask anyway." sub="We regularly travel beyond these cities for larger residential and commercial projects." />
      <Contact />
    </>
  );
}
