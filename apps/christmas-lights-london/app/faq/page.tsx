import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { FaqAccordion } from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { getFaq } from "@/lib/content";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Christmas Light Installation",
  description:
    "Answers to common questions about our professional Christmas light installation service in London, ON — installation time, LED lights, warranties, booking, and more.",
  openGraph: {
    title: "FAQ | Christmas Lights London",
    description: "Everything you need to know about professional Christmas light installation in London, Ontario. Installation time, LED efficiency, warranties, booking, and more.",
    url: `${site.url}/faq`,
  },
};

export default function FaqPage() {
  const faqs = getFaq();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "FAQ", url: `${site.url}/faq` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-[var(--dark-bg)] py-20 md:py-24 border-b border-[var(--border-dark)]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Got Questions?
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Everything you need to know about our professional Christmas light installation service.
            Can&apos;t find your answer? Give us a call.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-[var(--dark-surface)] py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Still Have Questions?
          </h2>
          <p className="text-white/60 text-base mb-8">
            Our team is happy to answer any questions about your specific property or situation.
            Reach out — we&apos;re friendly and knowledgeable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary min-h-[48px] px-8">
              Send Us a Message
            </Link>
            <a
              href={site.phoneHref}
              className="btn btn-ghost min-h-[48px] px-8 flex items-center gap-2 justify-center"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
