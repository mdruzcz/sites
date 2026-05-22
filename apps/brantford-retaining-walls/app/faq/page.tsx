import type { Metadata } from "next";
import { getFaqs } from "@/lib/content";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ | Retaining Wall Questions Answered",
  description: "Frequently asked questions about retaining walls in Brantford — permits, costs, materials, installation timelines, and warranties explained.",
};

export const revalidate = 3600;

export default function FaqPage() {
  const faqs = getFaqs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "FAQ", url: `${site.url}/faq` },
          ])),
        }}
      />

      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow !text-[var(--accent)]">Got Questions?</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[var(--concrete-200)] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about retaining wall installation in Brantford and the surrounding area.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
