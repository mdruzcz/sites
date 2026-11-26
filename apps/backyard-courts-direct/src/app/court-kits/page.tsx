import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { KitShelf, QuoteBand, SectionHead } from "@/components/sections";
import { kits } from "@/lib/content";
import { JsonLd, itemListLd } from "@/lib/jsonld";
import { ogBase, twitterImages } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 3600;

const title = "All Court Kit Sizes and Sports";
const description = `Browse ${kits.length} modular tile court kits for basketball, pickleball, tennis, shuffleboard and multi-sport play. Sized for Canadian backyards, shipped Canada-wide.`;

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
        photoAlt={`Fenced outdoor sport court with a blue playing surface, court kits from ${site.name} shipped across Canada`}
        eyebrow={`${kits.length} kits`}
        title={site.kitsPage.title}
        intro={site.kitsPage.intro}
        crumb="Court kits"
        path="/court-kits"
      />
      <section className="shell section">
        <SectionHead title="Choose a sport, then a size" intro="Sizes are the tile footprint in feet. Not sure what fits your yard? Send us your space and we will match it." />
        <KitShelf />
      </section>
      <QuoteBand />
      <JsonLd data={itemListLd(kits)} />
    </>
  );
}
