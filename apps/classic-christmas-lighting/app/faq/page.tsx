import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { FaqAccordion } from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { getFaq } from "@/lib/content";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ | Christmas Light Installation Questions — Classic Christmas Lighting",
  description:
    "Answers to common questions about our Christmas light installation services. Learn about what's included, pricing, service areas, and how the process works.",
  openGraph: {
    title: "Christmas Lighting FAQ — Classic Christmas Lighting",
    description: "Answers to your most common questions about professional Christmas light installation in Kitchener-Waterloo.",
  },
};

export default function FaqPage() {
  const faqs = getFaq();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
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
      <section className="bg-[var(--dark-bg)] py-20">
        <div className="container mx-auto px-4">
          <nav className="text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">FAQ</span>
          </nav>
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase mb-4 font-medium">Questions &amp; Answers</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white leading-[1.1] max-w-2xl"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl">
            Everything you need to know about our professional Christmas light installation service.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[var(--background)] py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--dark-surface)] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Still Have Questions?
          </h2>
          <p className="text-white/60 mb-8">
            Give us a call or send us a message — we&apos;re happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary min-h-[48px] px-8">
              Contact Us
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost min-h-[48px] px-8 flex items-center gap-2 justify-center">
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
