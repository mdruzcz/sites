import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getFaqs } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "RTA Cabinet FAQ — Shipping, Assembly & Quotes",
  description:
    "Answers to common questions about White Shaker RTA cabinets: what ready-to-assemble means, materials, shipping across Canada, the quote process, and warranty.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "RTA Cabinet FAQ",
    description:
      "Common questions about White Shaker RTA cabinets, shipping, assembly and quotes.",
  },
};

export default function FaqPage() {
  const faqs = getFaqs();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <div className="container py-12 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((f) => (
          <details key={f.q} className="bg-white border border-border rounded-lg p-5 group">
            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
              {f.q}
              <span className="text-accent group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-ink-soft mt-3 text-sm leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-ink-soft mb-4">Still have a question?</p>
        <Link href="/contact" className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-md font-medium inline-flex min-h-[48px] items-center">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
