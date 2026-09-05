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
  title: "Christmas Light Installation FAQ: Booking, Costs, Takedown",
  description: "Answers on booking timing, what a Classic Christmas Lighting install includes, insurance, maintenance, takedown and storage for homes and businesses in Kitchener-Waterloo.",
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
