import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getFaq } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ | Christmas Light Installation Questions",
  description:
    "Frequently asked questions about professional Christmas light installation in the GTA — pricing, timelines, what's included, guarantees, and more.",
  openGraph: {
    title: "Christmas Lights FAQ — GTA Christmas Lights",
    description:
      "Pricing, timelines, what's included, and more — answers to the most common Christmas light installation questions in the GTA.",
    url: `${site.url}/faq`,
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

      <section className="bg-[var(--dark-bg)] py-20 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            FAQ
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-white/75 text-lg leading-relaxed">
            Everything you need to know about professional Christmas light
            installation in the GTA.
          </p>
        </div>
      </section>

      <section className="bg-[var(--background)] py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <section className="bg-[var(--dark-surface)] py-16">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Still Have Questions?
          </h2>
          <p className="text-white/70 mb-7">
            Call us or send a quick message — a designer will get back to you
            within 1 business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn btn-primary">
              Get a Free Quote
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost">
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
