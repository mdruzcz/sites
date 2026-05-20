import type { Metadata } from "next";
import Link from "next/link";
import { getFaqs } from "@/lib/content";
import { site } from "@/lib/site";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import { CtaBand } from "@/components/CtaBand";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ — Concrete Driveway Questions Answered",
  description: `Common questions about concrete driveway installation, lifespan, cost, and care in London Ontario. Honest answers from a local contractor with ${site.yearsExperience}+ years experience.`,
};

export default function FaqPage() {
  const faqs = getFaqs();
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "FAQ", url: `${site.url}/faq` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="bg-charcoal text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow !text-[var(--accent)]">Questions</p>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-4">
            FAQ
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-3xl">
            Straight answers to the questions we hear most often about concrete driveways, patios, and decorative concrete in Southwestern Ontario.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={faqs} />
          <div className="text-center mt-12 p-6 card">
            <h3 className="font-bold text-xl text-[var(--charcoal)] mb-2">Still have a question?</h3>
            <p className="text-[var(--concrete)] mb-4">We&apos;d rather over-explain than under-deliver. Call us with any concrete question — no obligation.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={site.phoneHref} className="btn btn-primary">Call {site.phone}</a>
              <Link href="/contact" className="btn btn-outline">Send a Message</Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
