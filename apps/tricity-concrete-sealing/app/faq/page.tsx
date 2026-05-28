import type { Metadata } from "next";
import Link from "next/link";
import { getFaqs } from "@/lib/content";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { faqSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Concrete Sealing FAQ | Common Questions Answered",
  description:
    "Find answers to the most common questions about concrete sealing — process, timing, warranty, finishes, and more. TriCity Concrete Sealing serves all of SW Ontario.",
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

      <section className="bg-[var(--navy)] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow justify-center">Knowledge Base</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about concrete sealing — from preparation and process to
            warranty and maintenance.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={faqs} />

          <div className="mt-12 card p-8 text-center">
            <h2 className="font-bold text-xl text-[var(--navy)] mb-2">
              Still have questions?
            </h2>
            <p className="text-[var(--concrete)] mb-6">
              Email us anytime at{" "}
              <a href={site.emailHref} className="text-[var(--accent)] font-semibold hover:underline">
                {site.email}
              </a>{" "}
              and we&apos;ll get back to you within {site.responseTime}.
            </p>
            <Link href="/contact" className="btn btn-primary px-7 py-3">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
