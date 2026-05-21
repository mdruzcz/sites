import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getFaqs } from "@/lib/content";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete FAQ — Common Questions Answered",
  description:
    "Answers to the most common concrete questions from Tillsonburg homeowners — permits, curing time, stamped concrete, warranties, and why Ontario winters crack concrete.",
  openGraph: {
    title: "Concrete FAQ — Common Questions Answered",
    description:
      "Answers to common concrete questions: permits, curing time, stamped concrete, warranties, and Ontario freeze-thaw.",
    url: `${site.url}/faq`,
  },
};

export default function FaqPage() {
  const faqs = getFaqs();

  const schema = faqSchema(faqs);
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "FAQ", url: `${site.url}/faq` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="bg-charcoal text-white relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--concrete-200)] mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">FAQ</span>
          </nav>
          <p className="eyebrow !text-[var(--accent)] !mb-3">Common Questions</p>
          <h1 className="h-display text-4xl sm:text-5xl mb-4 max-w-3xl">
            Concrete FAQ — Honest Answers
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-2xl leading-relaxed">
            The questions Tillsonburg and Oxford County homeowners ask us most — answered straight, with no jargon.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <section className="py-12 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="h-display text-2xl sm:text-3xl text-[var(--charcoal)] mb-3">
            Still Have Questions?
          </h2>
          <p className="text-[var(--concrete)] mb-6">
            We&apos;re happy to answer anything specific to your project — just give us a call or submit an estimate request.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href={site.phoneHref} className="btn btn-primary text-base">
              Call {site.phone}
            </a>
            <Link href="/contact" className="btn btn-outline text-base">
              Request a Free Estimate
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
