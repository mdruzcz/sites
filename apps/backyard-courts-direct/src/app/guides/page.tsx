import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { GuideCards, QuoteBand } from "@/components/sections";
import { guides } from "@/lib/content";
import { JsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 3600;

const p = site.pages.guides;

export const metadata: Metadata = pageMeta({ title: p.title, description: p.description, path: "/guides" });

export default function GuidesPage() {
  return (
    <>
      <PageHero photo={site.photos.guides} photoAlt={p.heroAlt} eyebrow={`${guides.length} guides`} title={p.h1} intro={p.intro} crumb="Guides" path="/guides" />
      <section className="shell section">
        <GuideCards />
      </section>
      <QuoteBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: p.h1,
          url: `${site.url}/guides`,
          hasPart: guides.map((g) => ({ "@type": "Article", headline: g.h1, url: `${site.url}/guides/${g.slug}` })),
        }}
      />
    </>
  );
}
