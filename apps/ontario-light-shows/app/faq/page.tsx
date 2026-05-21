import type { Metadata } from "next";
import { getFaqs } from "@/lib/content";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { faqSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ — Light Shows, RGB Lighting, Permanent Holiday LEDs",
  description: `Common questions about ${site.name}: how music sync works, IP67 vs IP68, warranty, control, electricity, install timelines, and Ontario coverage.`,
  alternates: { canonical: `${site.url}/faq` },
};

export default function FaqPage() {
  const faqs = getFaqs();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <section className="bg-midnight-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">Common Questions</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Frequently asked.
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            If something isn't covered here, call {site.phone} or send a note via the{" "}
            <a href="/contact" className="text-accent hover:underline">contact page</a>{" "}
            and we'll get you an answer.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
