import type { Metadata } from "next";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "FAQ | Pressure Washing Questions Answered",
  description: `Common questions about pressure washing services from ${site.name}. Learn about our process, pricing, and what to expect.`,
};

const faqs = [
  {
    q: "What is the difference between pressure washing and soft washing?",
    a: "Pressure washing uses high-pressure water to clean hard surfaces like concrete, interlock, and brick. Soft washing uses low-pressure water combined with specialized cleaning solutions — ideal for delicate surfaces like vinyl siding, roofs, and painted wood. We use the right technique for each surface to ensure a thorough clean without damage.",
  },
  {
    q: "Will pressure washing damage my surfaces?",
    a: "Not when done professionally. We adjust pressure, temperature, and nozzle tips for every surface type. Concrete and interlock can handle higher pressure, while siding, roofs, and wood require gentle soft washing. Our team has 10+ years of experience knowing exactly what each surface needs.",
  },
  {
    q: "How often should I have my property pressure washed?",
    a: "Most homes benefit from an annual exterior cleaning. Driveways and walkways in high-traffic areas may need cleaning every 6–12 months. Commercial properties often benefit from quarterly maintenance. We can recommend a schedule based on your property's specific needs and exposure.",
  },
  {
    q: "Do you use eco-friendly cleaning solutions?",
    a: "Yes. We use biodegradable, eco-friendly cleaning agents that are safe for your landscaping, pets, and the environment. Our solutions are effective at killing mould, algae, and bacteria without harsh chemicals that could damage plants or contaminate water runoff.",
  },
  {
    q: "How much does pressure washing cost?",
    a: "Pricing depends on the surface type, size of the area, and level of staining. We provide free on-site estimates with transparent pricing — no hidden fees. Most residential driveway or house wash jobs are very affordable, and we offer package discounts when you combine multiple services.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "Not necessarily. As long as we have access to an outdoor water source and the areas to be cleaned, we can work while you're away. We'll send before-and-after photos and walk you through the results when you're available.",
  },
  {
    q: "Are you insured?",
    a: "Absolutely. We are fully insured and WSIB compliant. This protects both our team and your property. We're happy to provide proof of insurance upon request.",
  },
  {
    q: "What areas do you serve?",
    a: `We serve ${site.serviceAreas.join(", ")} and surrounding communities across Southwestern Ontario. If you're not sure whether we cover your area, give us a call — we're happy to discuss.`,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Everything you need to know about our pressure washing and exterior cleaning services.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-[var(--border)] pb-8">
                <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 mb-3">
                  {faq.q}
                </h2>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
