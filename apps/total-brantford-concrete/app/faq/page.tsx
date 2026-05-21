import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getFaqs } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ | Concrete Driveways & Patios in Brantford, ON",
  description: "Answers to common questions about concrete driveways, patios, stamped concrete, permits, costs, and warranties in Brantford, Ontario.",
  openGraph: {
    title: "Frequently Asked Questions | Total Brantford Concrete",
    description: "Everything you need to know about concrete driveways, patios, and repairs in Brantford, ON.",
    url: `${site.url}/faq`,
  },
};

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

      <section className="bg-[var(--charcoal)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow">Got Questions?</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl">
            We Have <span className="text-[var(--accent)]">Answers</span>
          </h1>
          <p className="text-[var(--concrete-200)] text-lg mt-4 max-w-2xl mx-auto normal-case font-normal">
            Everything you need to know about concrete driveways, patios, and repairs in Brantford, Ontario.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Common Questions" title="FAQ" />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
