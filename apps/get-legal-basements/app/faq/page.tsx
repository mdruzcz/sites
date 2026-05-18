import type { Metadata } from "next";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { CtaBand } from "@/components/CtaBand";
import faqData from "@/content/faq.json";

export const metadata: Metadata = {
  title: "FAQ — Basement Renovation Questions Answered",
  description: `Common questions about legal basement apartments, underpinning, waterproofing, and basement renovations in London, Ontario. Get answers from ${site.name}.`,
};

export const revalidate = 3600;

export default function FaqPage() {
  const allQuestions = faqData.flatMap((cat) => cat.questions);
  const schema = faqSchema(allQuestions);
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "FAQ", url: `${site.url}/faq` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Answers to common questions about legal basement apartments, underpinning,
            waterproofing, and renovation projects in London, Ontario.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.map((category) => (
            <div key={category.category} className="mb-12 last:mb-0">
              <h2 className="h-display text-2xl text-slate-900 mb-6 pb-2 border-b border-[var(--border)]">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((q) => (
                  <div key={q.question}>
                    <h3 className="font-bold text-lg text-[var(--charcoal)] mb-2">
                      {q.question}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {q.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
