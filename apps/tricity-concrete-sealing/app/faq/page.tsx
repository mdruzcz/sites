import type { Metadata } from "next";
import Script from "next/script";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { PageHero } from "@/components/PageHero";
import { homeFaqs } from "@/lib/faqs";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Sealing FAQ: Finishes, Timing, Cure Times, Warranty",
  description: "Answers on matte vs semi-gloss vs gloss, why we use solvent-based sealers, how often to reseal, cure times, slip resistance and the TriCity 5-year warranty across SW Ontario.",
  alternates: { canonical: `${site.url}/faq` },
};

export default function FaqPage() {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={PICKS.heroFaq} eyebrow="FAQ" title="What people ask before they book." crumbs={[{ label: "FAQ" }]} compact form={false} />
      <FAQ faqs={homeFaqs} title="Everything, in one place" />
      <Contact />
    </>
  );
}
