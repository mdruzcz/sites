import type { Metadata } from "next";
import Script from "next/script";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { PageHero } from "@/components/PageHero";
import { homeFaqs } from "@/lib/faqs";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Holiday Lighting FAQ: Booking, Costs, Permanent vs Classic",
  description: "Answers on booking timing, what a Festive install includes, classic vs permanent lighting, insurance, maintenance, takedown and storage for Southern Ontario homes and businesses.",
  alternates: { canonical: `${site.url}/faq` },
};

export default function FaqPage() {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <NavBar />
      <PageHero photo={PICKS.heroFaq} eyebrow="FAQ" title="What people ask before they book." crumbs={[{ label: "FAQ" }]} compact form={false} />
      <FAQ faqs={homeFaqs} title="Everything, in one place" />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
