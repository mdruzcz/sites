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
  title: "Service Areas: London, Woodstock, Brantford & SW Ontario",
  description: "TriCity Concrete Sealing serves London, Woodstock, Brantford, St. Thomas, Stratford, Ingersoll, Tillsonburg, St. Marys, Aylmer and Simcoe with free site assessments and no travel charges.",
  alternates: { canonical: `${site.url}/service-areas` },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero photo={PICKS.heroAreas} eyebrow="Service areas" title="London and 20+ communities across Southwestern Ontario." intro="Based in London, covering Middlesex, Oxford, Brant, Elgin, Perth and Norfolk counties. Pick your city for local details and a quote form." crumbs={[{ label: "Service areas" }]} compact />
      <section className="bg-[var(--stone)]">
        <div className="shell section grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
            <Link key={c.slug} href={`/service-areas/${c.slug}`} className="card card-lift group flex flex-col p-6">
              <span className="flex items-center gap-2 text-[var(--accent)]"><MapPinIcon className="w-4 h-4" /><span className="eyebrow">{c.region}</span></span>
              <h2 className="font-display mt-2 text-2xl group-hover:text-[var(--accent-deep)]">{c.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{c.heroIntro}</p>
              <p className="mt-3 text-xs text-[var(--muted)]">{c.neighbourhoods.slice(0, 4).join(" · ")}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent-deep)]">Concrete sealing in {c.name} <ArrowRightIcon className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand heading="Not on the list? Ask anyway." sub="We regularly travel further for larger residential and commercial projects." />
      <Contact />
    </>
  );
}
