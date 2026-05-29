import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getFaqs } from "@/lib/content";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { faqSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "FAQ — Decks & Fences",
  description: "Honest answers about deck building and fence installation in Woodstock and Oxford County — costs, materials, permits, lifespan, and what to expect.",
  openGraph: {
    title: `FAQ | ${site.name}`,
    description: "Honest answers about deck and fence construction in Woodstock and Oxford County.",
  },
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
      <section className="py-12 sm:py-16 bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eyebrow">FAQ</p>
            <h1 className="h-display text-4xl sm:text-5xl text-[var(--charcoal)] mb-4">
              Honest Answers
            </h1>
            <p className="text-lg text-[var(--concrete)] max-w-2xl mx-auto normal-case font-normal">
              Common questions about deck building and fence installation in Woodstock, Ingersoll, Tillsonburg, and surrounding Oxford County communities.
            </p>
          </div>
          <FaqAccordion faqs={faqs} />
          <div className="mt-12 text-center">
            <p className="text-[var(--concrete)] mb-4 normal-case font-normal">Have a question not answered here?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn btn-primary">Ask Us Directly</Link>
              <a href={site.phoneHref} className="btn btn-outline">Call {site.phone}</a>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
