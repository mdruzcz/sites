import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { FAQ, homeFaqs } from "@/components/FAQ";
import type { FAQItem } from "@/components/FAQ";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Holiday Lighting FAQ | Festive Holiday Lighting Southern Ontario",
  description:
    "Answers to common questions about Christmas light installation, permanent LED systems, pricing, service areas, and more. Festive Holiday Lighting — Southern Ontario.",
  alternates: { canonical: "https://festiveholidaylighting.ca/faq" },
};

const extraFaqs: FAQItem[] = [
  {
    q: "How does pricing work for holiday lighting?",
    a: "Pricing varies based on the size of your property, the type of lighting (seasonal vs. permanent), and the complexity of the design. We believe in fair, transparent pricing with no hidden fees. We'll provide a detailed written quote before any work begins. Most seasonal residential installations range from $400–$2,000; permanent systems range from $2,500–$8,000 depending on home size.",
  },
  {
    q: "What makes your lights better than what I can buy at the hardware store?",
    a: "We use commercial-grade LED products that are significantly brighter, more energy-efficient, and more durable than consumer-grade lights from hardware stores. Our lights are rated for Canadian winters, are colour-consistent across every bulb, and won't fade or fail mid-season. When you hire Festive, you're getting display-quality lights, not the box from Canadian Tire.",
  },
  {
    q: "Can you install lights on a very tall home?",
    a: "Absolutely. Cameron operates JLG and Genie boom trucks and boom lifts certified for elevated work. We handle projects up to commercial building height safely and professionally. This is a key advantage of professional installation — no sketchy ladders.",
  },
  {
    q: "Do you handle commercial holiday lighting programs?",
    a: "Yes — commercial is a significant part of our business. We design and manage lighting programs for storefronts, plazas, office buildings, municipalities, BIAs, hotels, and restaurants across Southern Ontario. Commercial projects receive a full season-long management plan with scheduled maintenance visits.",
  },
  {
    q: "Is permanent lighting the same as Trimlight or Jellyfish Lighting?",
    a: "Permanent holiday lighting (also called trim lighting or roofline lighting) works similarly to Trimlight, Jellyfish, and similar products. Our installations use high-quality RGBW LED nodes built into discreet roofline channels. We're not franchise-bound, which means we can offer competitive pricing and more flexibility in design. The result is the same — app-controlled, year-round colour-changing lights built into your home.",
  },
];

const allFaqs = [...homeFaqs, ...extraFaqs];

export default function FAQPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <NavBar />

      <section className="pt-32 pb-10" style={{ backgroundColor: "var(--night-deep)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60">Home</Link>
            <span>/</span>
            <span className="text-white/60">FAQ</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold-bright)" }}>FAQ</p>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Holiday Lighting{" "}
            <span className="text-gradient-gold">Questions & Answers</span>
          </h1>
          <p className="text-lg text-white/60">
            Everything you need to know about our seasonal Christmas lighting, permanent LED systems, pricing, and service areas.
          </p>
        </div>
      </section>

      <FAQ faqs={allFaqs} title="" />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
