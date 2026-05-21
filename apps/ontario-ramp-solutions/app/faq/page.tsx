import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getFaqs } from "@/lib/content";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ — Wheelchair Ramp Questions Answered",
  description:
    "Common questions about wheelchair ramp installation, temporary rental, event accessibility, AODA compliance, costs, and timelines. Answered by Ontario Ramp Solutions.",
  alternates: { canonical: `${site.url}/faq` },
};

export default function FaqPage() {
  const faqs = getFaqs();
  const breadcrumbs = [
    { name: "Home", url: site.url },
    { name: "FAQ", url: `${site.url}/faq` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />

      <section className="hero-gradient text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span>FAQ</span>
          </nav>
          <p className="eyebrow text-blue-200">FAQ</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Straight answers to common questions.
          </h1>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Everything you need to know about ramp installation, rental, event accessibility, and how we work.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={faqs} />

          <div className="mt-12 card p-8 text-center">
            <h2 className="font-bold text-xl text-gray-900 mb-3">Still have a question?</h2>
            <p className="text-muted-strong mb-6">
              Call us or send a message — we reply within {site.responseTime}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={site.phoneHref} className="btn btn-primary">{site.phone}</a>
              <Link href="/contact" className="btn btn-ghost">Send a Message</Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
