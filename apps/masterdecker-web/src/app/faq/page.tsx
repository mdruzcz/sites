import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { Hero } from "@/components/hero";
import { site } from "@/lib/site";
import faq from "@/content/faq.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/faq` },
  title: "Frequently Asked Questions | Master Decker",
  description:
    "Answers to common questions about decks, fences, concrete, staining, permits, and Master Decker's services in London Ontario and Southwestern Ontario.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.groups.flatMap((g) => g.items.map((q) => ({
    "@type": "Question",
    name: q.q,
    acceptedAnswer: { "@type": "Answer", text: q.a },
  }))),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <Hero
          eyebrow="Have Questions?"
          title="Frequently Asked Questions"
          subtitle="Here you can find answers to some of the most commonly asked questions about our services. If you don't find the answer you're looking for, please contact us."
          background="/images/wp-project-1.jpg"
          primaryCta={{ label: "Request Quote", href: "/contact" }}
        />

        {faq.groups.map((group, idx) => (
          <section key={group.heading} className={`section ${idx % 2 === 0 ? "bg-white" : "bg-[var(--surface)] border-y border-[var(--border)]"}`}>
            <div className="container max-w-4xl">
              <h2 className="h-display text-2xl md:text-3xl mb-8 text-[var(--accent)]">{group.heading}</h2>
              <div className="space-y-3">
                {group.items.map((q) => (
                  <details key={q.q} className="group bg-white border border-[var(--border)] p-5">
                    <summary className="cursor-pointer flex justify-between items-start gap-4 font-bold list-none">
                      <span>Q: {q.q}</span>
                      <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <p className="mt-3 text-sm text-[var(--ink-soft)] leading-relaxed">A: {q.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="relative section text-white text-center overflow-hidden bg-[var(--ink)]">
          <div className="absolute inset-0" style={{ backgroundImage: "url(/images/pergola.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
          <div className="container relative max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Get a FREE Quote</h2>
            <p className="text-white/85 mb-8 text-lg">
              If you have more questions or need specific details about our services, contact us today!
            </p>
            <Link href="/contact" className="btn-primary">Request Quote</Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFab />
    </>
  );
}
