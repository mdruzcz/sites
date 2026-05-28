import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Professional Concrete Retaining Wall Company | London Concrete Forming",
  description: "Expert concrete retaining wall installation in London, Ontario. Garden terracing, erosion control & functional landscaping. Free quotes — 519-914-1901.",
  openGraph: { title: "Expert Concrete Retaining Wall Installation | London Concrete Forming", description: "Professional concrete retaining walls in London, Ontario for gardens, erosion control, and landscaping." },
};

const faqItems = [
  { question: "How much do concrete retaining walls cost?", answer: "Concrete retaining walls typically cost 0–0 per linear foot depending on height, length, and site conditions. We provide free detailed quotes." },
  { question: "What are concrete retaining walls used for?", answer: "Retaining walls hold back soil to create level areas in sloped yards. They are commonly used for garden terracing, erosion control, creating level driveways, and adding functional seating areas." },
  { question: "Do you build retaining walls in other materials?", answer: "We specialize in concrete retaining walls only. Concrete provides the strongest, most durable solution for residential applications. For decorative block or stone options, we recommend contacting a landscape contractor." },
  { question: "How long does a concrete retaining wall last?", answer: "A properly built concrete retaining wall can last 50+ years. Concrete is highly resistant to moisture, frost, and structural stress when installed with proper drainage and reinforcement." },
];

export default function RetainingWallsPage() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Retaining Wall Installation", description: "Professional concrete retaining wall installation in London, Ontario.", url: site.url + "/concrete-retaining-walls" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Concrete Retaining Walls", url: site.url + "/concrete-retaining-walls" }]),
    faqSchema(faqItems),
  ];
  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <section className="bg-[#1a2332] py-20">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Expert Concrete Retaining Wall Installation</h1>
          <p className="text-slate-300 text-xl mb-8">Garden terracing, erosion control, and functional outdoor spaces.</p>
          <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-10"><h2 className="text-3xl font-extrabold text-[#1a2332] mb-3">Why Build a Concrete Retaining Wall?</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center"><div className="text-3xl mb-3">🌿</div><h3 className="font-bold text-[#1a2332] mb-2">Garden Terracing</h3><p className="text-slate-600 text-sm leading-relaxed">Convert sloped land into beautiful terraced garden beds and usable outdoor space.</p></div>
            <div className="card p-6 text-center"><div className="text-3xl mb-3">🏔️</div><h3 className="font-bold text-[#1a2332] mb-2">Erosion Control</h3><p className="text-slate-600 text-sm leading-relaxed">Prevent soil erosion and protect your property from slope failure and washout.</p></div>
            <div className="card p-6 text-center"><div className="text-3xl mb-3">🪑</div><h3 className="font-bold text-[#1a2332] mb-2">Functional Seating</h3><p className="text-slate-600 text-sm leading-relaxed">Low retaining walls double as beautiful seating areas in your outdoor living space.</p></div>
          </div>
        </div>
      </section>
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-10"><h2 className="text-3xl font-extrabold text-[#1a2332] mb-3">Frequently Asked Questions</h2></div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-8"><h2 className="text-3xl font-extrabold text-[#1a2332] mb-3">Get a Free Retaining Wall Quote</h2></div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"><QuoteForm /></div>
        </div>
      </section>
    </>
  );
}
