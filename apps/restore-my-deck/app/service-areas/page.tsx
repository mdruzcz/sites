import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { MapPinIcon, ArrowRightIcon } from "@/components/icons";
import { getCities, cityPhoto } from "@/lib/content";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas: Kitchener, Waterloo, Cambridge, Guelph & More",
  description: "Restore My Deck restores and stains decks and fences across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, Stratford, Woodstock, Fergus, Paris and nearby towns. Pick your city.",
  alternates: { canonical: `${site.url}/service-areas` },
};

export default function ServiceAreasPage() {
  const cities = getCities();
  return (
    <>
      <PageHero photo={PICKS.heroAreas} eyebrow="Service areas" title="Kitchener-Waterloo and the towns around it." intro="Based in Kitchener, working across Waterloo Region, Wellington, Brant, Perth and Oxford counties. Pick your city for local details and a quote form." crumbs={[{ label: "Service areas" }]} compact />
      <section className="bg-[var(--paper)]">
        <div className="shell section grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className="card card-lift group flex flex-col overflow-hidden">
              <Photo name={cityPhoto(c.slug)} ratio="aspect-[16/10]" sizes="(max-width: 640px) 100vw, 380px" />
              <div className="flex flex-1 flex-col p-6">
                <span className="flex items-center gap-2 text-[var(--accent)]"><MapPinIcon className="w-4 h-4" /><span className="eyebrow">{c.region}</span></span>
                <h2 className="font-display mt-2 text-2xl group-hover:text-[var(--accent-deep)]">{c.city}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{c.intro}</p>
                <p className="mt-3 text-xs text-[var(--muted)]">{c.neighbourhoods.slice(0, 4).join(" · ")}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent-deep)]">Deck staining in {c.city} <ArrowRightIcon className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="shell pb-16"><p className="text-sm text-[var(--muted)]">Also serving {site.extraAreas.join(", ")} and surrounding communities. Outside these areas? Ask anyway.</p></div>
      </section>
      <CtaBand heading="Not on the list? Ask anyway." sub="We regularly travel further for larger decks, fences and multi-property jobs." />
      <Contact />
    </>
  );
}
