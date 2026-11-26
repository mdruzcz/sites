import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { GuideCards, QuoteBand, SectionHead } from "@/components/sections";
import { faqGroups, kits, lowestPrice, money } from "@/lib/content";
import { JsonLd, faqLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 3600;

const p = site.pages.faq;

export const metadata: Metadata = pageMeta({ title: p.title, description: p.description, path: "/faq" });

export default function FaqPage() {
  const pricing = {
    group: "Prices",
    items: [
      { q: "How much does a backyard court kit cost?", a: `Kits start at ${money(lowestPrice())} CAD and go up to ${money(Math.max(...kits.map((k) => k.price)))} for a regulation tennis footprint. Every kit page lists its price and its price per square foot.` },
      { q: "What is included in the price?", a: "The tiles for the full footprint, edge pieces, game lines for your sport, your colour choices and a numbered layout plan. Freight and sales tax are added on your quote. The base, hoops, nets and lighting are not included." },
      { q: "Do I pay when I request a quote?", a: "No. A quote request costs nothing and does not commit you to buy. You see the delivered price and a drawing of your court first." },
    ],
  };
  const groups = [pricing, ...faqGroups];
  return (
    <>
      <PageHero photo={site.photos.faq} photoAlt={p.heroAlt} eyebrow="Questions" title={p.h1} intro={p.intro} crumb="FAQ" path="/faq" />
      <section className="shell section space-y-12">
        {groups.map((g) => (
          <div key={g.group} className="grid gap-4 lg:grid-cols-[14rem_1fr]">
            <h2 className="h2 !text-2xl">{g.group}</h2>
            <FaqList items={g.items} />
          </div>
        ))}
      </section>
      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Guides" title="Longer answers" action={{ label: "All guides", href: "/guides" }} />
        <GuideCards limit={3} />
      </section>
      <QuoteBand title="Did not find your answer?" text="Ask us anything about sizing, bases or colours. We reply with a straight answer and no sales pressure." />
      <JsonLd data={faqLd(groups.flatMap((g) => g.items))} />
    </>
  );
}
