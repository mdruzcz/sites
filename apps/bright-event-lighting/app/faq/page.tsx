import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getFaq } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "FAQ - Wedding Lighting Questions Answered",
  description:
    "Common questions about wedding and event lighting answered. Setup, power, rain plans, cold sparks, pricing, deposits, and more. Bright Event Lighting, London, ON.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Bright Event Lighting",
    description: "Your wedding lighting questions answered.",
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

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              as="h1"
              eyebrow="Questions"
              headline="Frequently Asked Questions"
              description="Everything you need to know about working with us."
            />

            <div className="space-y-4 text-[var(--muted)] leading-relaxed mb-10">
              <p>
                Planning the lighting for your wedding or event raises a lot of practical
                questions — how far ahead to book, what happens if it rains, whether you need
                to supply power, how pricing works, and whether those cold spark fountains you
                saw on Instagram are actually safe indoors. We&apos;ve answered the questions
                we hear most often below, drawn from more than 200 events lit across London
                and Southwestern Ontario.
              </p>
              <p>
                Every package we offer is DMX-controlled and includes a dedicated on-site
                technician, complete setup, and a 30-minute teardown at the end of the night.
                If your question isn&apos;t covered here, just{" "}
                <Link href="/contact" className="text-[var(--accent)] hover:underline">
                  reach out
                </Link>{" "}
                — we respond within {site.responseTime}.
              </p>
            </div>

            <FaqAccordion faqs={faqs} />

            <div className="mt-12 card p-6 text-center">
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">
                Still Have Questions?
              </h2>
              <p className="text-[var(--muted)] text-sm mb-4">
                Tell us about your event and we&apos;ll answer everything — and send a firm
                quote within {site.responseTime}, no site visit needed.
              </p>
              <Link href="/contact" className="btn btn-primary min-h-[44px]">
                Check Your Date
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
