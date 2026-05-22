import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getFaqs } from "@/lib/content";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { faqSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Deck Staining FAQ | Toronto & GTA | Toronto Deck Stainers",
  description: "Answers to the most common questions about deck staining in Toronto — cost, timing, products, process, and more. Get the facts before you book.",
  openGraph: { title: "Deck Staining FAQ — Toronto Deck Stainers", description: "Common questions about deck staining, sealing, and restoration in Toronto and the GTA.", url: `${site.url}/faq` },
};

export const revalidate = 3600;

export default function FaqPage() {
  const faqs = getFaqs();
  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">FAQ</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-5 max-w-3xl">
            Deck Staining Questions Answered
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Straight answers to what Toronto homeowners ask us most — pricing, products,
            process, and what to expect.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="font-bold text-[var(--charcoal)] text-sm uppercase tracking-widest mb-5 flex items-center gap-3">
                <span className="w-6 h-0.5 bg-[var(--accent)]" aria-hidden="true" />
                {cat}
              </h2>
              <FaqAccordion faqs={faqs.filter((f) => f.category === cat)} />
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-bold text-2xl text-[var(--charcoal)] mb-3">Still have questions?</h2>
          <p className="text-[var(--concrete)] mb-6">Call us directly or request a free estimate — we&apos;ll be in touch within {site.responseTime}.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={site.phoneHref} className="btn btn-primary">{site.phone}</a>
            <a href="/contact" className="btn btn-outline">Get Free Estimate</a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
