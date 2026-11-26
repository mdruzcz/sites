import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { QuoteBand } from "@/components/sections";
import { faqGroups } from "@/lib/content";
import { JsonLd, faqLd } from "@/lib/jsonld";
import { ogBase, twitterImages } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 3600;

const title = "Court Kit FAQ: Sizes, Bases, Assembly, Shipping";
const description = "Court kit FAQ covering how to choose a size, what base you need, how long assembly takes, winter care, and how quotes and freight delivery work in Canada.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/faq" },
  openGraph: { ...ogBase, title: `${title} | ${site.name}`, description, url: "/faq" },
  twitter: { card: "summary_large_image", title, description, images: twitterImages },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        photo={site.photos.faq}
        photoAlt="Pickleball net post and balls on an outdoor court surface"
        eyebrow="Questions"
        title="Court kit FAQ"
        intro="Choosing a kit, preparing the base, building it and getting it delivered."
        crumb="FAQ"
        path="/faq"
      />
      <section className="shell section space-y-12">
        {faqGroups.map((g) => (
          <div key={g.group} className="grid gap-4 lg:grid-cols-[14rem_1fr]">
            <h2 className="h2 !text-2xl">{g.group}</h2>
            <FaqList items={g.items} />
          </div>
        ))}
      </section>
      <QuoteBand title="Did not find your answer?" text="Ask us anything about sizing, bases or colours. We reply with a straight answer and no sales pressure." />
      <JsonLd data={faqLd(faqGroups.flatMap((g) => g.items))} />
    </>
  );
}
