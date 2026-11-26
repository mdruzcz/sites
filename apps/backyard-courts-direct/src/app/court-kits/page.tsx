import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Finder, KitShelf, PriceTable, QuoteBand, SectionHead } from "@/components/sections";
import { kits, lowestPrice, money } from "@/lib/content";
import { JsonLd, aggregateOfferLd, itemListLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { fill, site } from "@/lib/site";

export const revalidate = 3600;

const p = site.pages.kits;

export const metadata: Metadata = pageMeta({
  title: p.title,
  description: fill(p.description, { count: kits.length, from: money(lowestPrice()) }),
  path: "/court-kits",
});

export default function KitsPage() {
  return (
    <>
      <PageHero photo={site.photos.kits} photoAlt={p.heroAlt} eyebrow={`${kits.length} kits from ${money(lowestPrice())}`} title={p.h1} intro={p.intro} crumb="Court kits" path="/court-kits" />
      <section className="shell section">
        <SectionHead title={p.sectionTitle} intro={p.sectionIntro} />
        <KitShelf />
      </section>
      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Size finder" title={site.home.finderHeading} intro={site.home.finderIntro} action={{ label: "Custom sizes", href: "/custom-court" }} />
        <Finder />
      </section>
      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Prices" title={p.tableTitle} intro={p.tableIntro} />
        <PriceTable />
        <p className="mt-3 text-sm text-[var(--muted)]">Prices are in Canadian dollars for the tile kit with game lines and edging. Freight and sales tax are added on your quote. Hoops, nets and the base pad are not included.</p>
      </section>
      <QuoteBand />
      <JsonLd data={itemListLd(kits)} />
      <JsonLd data={aggregateOfferLd("Backyard sport court kits", "/court-kits", kits)} />
    </>
  );
}
