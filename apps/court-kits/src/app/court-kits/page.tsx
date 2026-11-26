import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { KitShelf, QuoteBand, SectionHead } from "@/components/sections";
import { kits } from "@/lib/content";
import { JsonLd, itemListLd } from "@/lib/jsonld";
import { ogBase, twitterImages } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 3600;

const title = "All DIY Court Kits by Sport and Size";
const description = `Compare ${kits.length} DIY sport court kits by sport, footprint and coverage. Basketball, pickleball, tennis, shuffleboard and multi-game layouts with freight quotes in Canada.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/court-kits" },
  openGraph: { ...ogBase, title: `${title} | ${site.name}`, description, url: "/court-kits" },
  twitter: { card: "summary_large_image", title, description, images: twitterImages },
};

export default function KitsPage() {
  return (
    <>
      <PageHero
        photo={site.photos.kits}
        photoAlt={`White game lines on a blue sport court surface, DIY court kits from ${site.name}`}
        eyebrow={`${kits.length} kits`}
        title={site.kitsPage.title}
        intro={site.kitsPage.intro}
        crumb="Court kits"
        path="/court-kits"
      />
      <section className="shell section">
        <SectionHead title="Filter by sport, compare by size" intro="Each card shows the footprint in feet and the square footage it covers. Tap a kit to try colours on a scale drawing." />
        <KitShelf />
      </section>
      <QuoteBand />
      <JsonLd data={itemListLd(kits)} />
    </>
  );
}
