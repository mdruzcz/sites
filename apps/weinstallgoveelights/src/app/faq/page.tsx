import type { Metadata } from "next";
import Link from "next/link";
import faq from "@/content/faq.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ — Govee Permanent Outdoor Lighting Questions Answered",
  description:
    "Answers to the most common questions about Govee permanent outdoor lighting installation in Ontario — cost, warranty, installation time, app control, and more.",
  openGraph: {
    title: "FAQ — Govee Permanent Outdoor Lighting Questions Answered",
    description:
      "Common questions about Govee permanent outdoor lighting installation in Ontario.",
    url: "https://weinstallgoveelights.ca/faq",
  },
  twitter: {
    title: "FAQ — Govee Permanent Outdoor Lighting Questions Answered",
    description: "Common questions about Govee permanent outdoor lighting in Ontario.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-transparent to-[#06B6D4]/5 pointer-events-none" />
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
              Questions
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Everything you need to know about Govee permanent outdoor lighting installation.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="container mx-auto px-4 pb-20 max-w-3xl">
        <div className="space-y-4">
          {faq.map((item, i) => (
            <div
              key={item.question}
              className="bg-[#141430] border border-[#1E1E42] rounded-2xl p-6 hover:border-[#8B5CF6]/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-[#8B5CF6] font-black text-sm shrink-0 mt-0.5">
                  Q{String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-white font-bold mb-2 text-base">{item.question}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA after FAQ */}
        <div className="mt-12 bg-gradient-to-r from-[#8B5CF6]/20 to-[#06B6D4]/10 border border-[#8B5CF6]/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Still Have Questions?</h2>
          <p className="text-gray-300 mb-6 text-sm">
            Our team is happy to answer any specific questions about your property, budget, or goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold transition-colors"
            >
              Get a Free Quote
            </Link>
            <a
              href="mailto:info@weinstallgoveelights.ca"
              className="px-6 py-3 rounded-xl border border-[#8B5CF6]/50 hover:border-[#8B5CF6] text-[#A78BFA] hover:text-white font-semibold transition-colors"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
