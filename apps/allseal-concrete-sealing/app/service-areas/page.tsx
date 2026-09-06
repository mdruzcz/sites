import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { QuoteDock } from "@/components/QuoteDock";
import { CtaBand } from "@/components/CtaBand";
import { MapPinIcon, ArrowRightIcon } from "@/components/icons";
import { getCities, cityPhoto } from "@/lib/content";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas: Woodstock, St. Thomas, Brantford, Hamilton, K-W",
  description: "All-Seal seals concrete across Woodstock, St. Thomas, Brantford, Hamilton, Kitchener-Waterloo and Cambridge with free on-site inspections. Pick your city for local details.",
  alternates: { canonical: `${site.url}/service-areas` },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero photo={PICKS.areas} kicker="Service areas" title={<>Woodstock and <span className="text-[var(--orange)]">an hour in every direction.</span></>} intro="Based in Oxford County, working across Elgin, Brant, Hamilton and Waterloo Region. Free inspections in every city listed." crumbs={[{ label: "Service areas" }]} />
      <section className="bg-white">
        <div className="shell section grid gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {getCities().map((c) => (
            <Link key={c.slug} href={`/service-areas/${c.slug}`} className="group flex flex-col bg-white">
              <Photo name={cityPhoto(c.slug)} ratio="aspect-[16/10]" sizes="(max-width: 640px) 100vw, 400px" />
              <div className="flex flex-1 flex-col p-6">
                <span className="kicker">{c.region}</span>
                <h2 className="font-display mt-2 text-3xl group-hover:text-[var(--orange-deep)]">{c.city}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{c.intro}</p>
                <p className="mt-3 flex flex-wrap gap-1.5 text-xs text-[var(--muted)]">{c.neighbourhoods.slice(0, 4).map((n) => <span key={n} className="inline-flex items-center gap-1"><MapPinIcon className="w-3 h-3 text-[var(--orange)]" />{n}</span>)}</p>
                <span className="font-display mt-4 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[var(--orange-deep)]">Sealing in {c.city} <ArrowRightIcon className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <QuoteDock />
      <CtaBand heading="Not on the list? Ask anyway." sub="We travel further for larger driveways, patios and commercial pads." />
    </>
  );
}
