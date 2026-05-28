import type { Metadata } from "next";
import Image from "next/image";
import { getFaqs } from "@/lib/content";
import { faqSchema } from "@/lib/jsonld";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import SectionHeader from "@/components/SectionHeader";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Deck Staining FAQs | DeckStain.ca Ontario",
  description:
    "Common questions about deck staining, sealing, and restoration in Ontario. How often to stain, best stain types, process details, and more.",
  openGraph: {
    title: "Deck Staining FAQs | DeckStain.ca Ontario",
    description:
      "Common questions about deck staining, sealing, and restoration in Ontario. READY Seal oil-based stains.",
    images: ["/images/after-staining.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deck Staining FAQs | DeckStain.ca",
    description: "Common questions about deck staining and sealing in Ontario.",
  },
};

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

export default function FaqPage() {
  const faqs = getFaqs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      {/* ─── HERO ─── */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center">
        <Image
          src="/images/after-staining.jpg"
          alt="Professionally stained deck - DeckStain.ca FAQ page"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10">
          <p className="eyebrow text-[var(--accent)] mb-3">Got Questions?</p>
          <h1 className="h-display text-4xl md:text-5xl text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed normal-case font-normal">
            Everything you need to know about deck staining, sealing, and restoration.
          </p>
        </div>
      </section>

      {/* ─── FAQS ─── */}
      <section className="section bg-white">
        <div className="container max-w-3xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Common Questions"
            description="Can't find what you're looking for? Reach out directly — we're happy to help."
          />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
