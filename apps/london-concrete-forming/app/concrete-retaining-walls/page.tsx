import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Professional Concrete Retaining Wall Company",
  description: "Expert concrete retaining wall installation in London, Ontario. Garden terracing, erosion control & functional landscaping. Free quotes — 519-914-1901.",
  openGraph: {
    title: "Expert Concrete Retaining Wall Installation in London, ON",
    description: "Professional concrete retaining walls in London, Ontario for gardens, erosion control, and landscaping.",
    images: [{ url: "https://londonconcreteforming.ca/wp-content/uploads/2025/09/Concrete-Contractor-in-St.-Thomas.png", alt: "Concrete retaining wall by London Concrete Forming" }],
  },
};

const faqItems = [
  { question: "How much do concrete retaining walls cost?", answer: "Concrete retaining walls typically cost $150–$400 per linear foot depending on height, length, and site conditions. We provide free detailed quotes after assessing your site." },
  { question: "What are concrete retaining walls used for?", answer: "Retaining walls hold back soil to create level areas in sloped yards. They are commonly used for garden terracing, erosion control, creating level driveways, and adding functional seating areas." },
  { question: "Do you build retaining walls in other materials?", answer: "We specialize in concrete retaining walls only. Concrete provides the strongest, most durable solution for residential applications with the best value over time." },
  { question: "How long does a concrete retaining wall last?", answer: "A properly built concrete retaining wall can last 50+ years. Concrete is highly resistant to moisture, frost, and structural stress when installed with proper drainage and reinforcement." },
  { question: "Do retaining walls require permits in London, Ontario?", answer: "Retaining walls over 600mm (about 2 feet) typically require a building permit in London, Ontario. We can advise you on the permit requirements for your specific project during your free consultation." },
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

      {/* Hero with background image */}
      <section className="bg-[#333333] relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image
            src="https://londonconcreteforming.ca/wp-content/uploads/2025/09/Concrete-Contractor-in-St.-Thomas.png"
            alt="Concrete retaining wall installation by London Concrete Forming in London, Ontario"
            fill className="object-cover opacity-25" priority unoptimized
          />
        </div>
        <div className="relative container-custom text-center max-w-4xl mx-auto">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Concrete Retaining Walls</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Expert Concrete Retaining Wall Installation</h1>
          <p className="text-slate-300 text-xl mb-6">Garden terracing, erosion control, and functional outdoor spaces — built to last 50+ years.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-base text-[#333333]">Call {site.phone}</a>
          </div>
        </div>
      </section>

      {/* Why Retaining Walls */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Why Build a Concrete Retaining Wall?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Whether your yard slopes gently or steeply, a concrete retaining wall turns problem areas into usable, attractive outdoor space.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-[#F7931E]/10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#F7931E]" aria-hidden="true"><path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" /><path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="font-bold text-[#333333] mb-2 text-lg">Garden Terracing</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Convert sloped land into beautiful terraced garden beds and usable outdoor space. Maximize every square foot of your property.</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-[#F7931E]/10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#F7931E]" aria-hidden="true"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="font-bold text-[#333333] mb-2 text-lg">Erosion Control</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Prevent soil erosion and protect your property from slope failure and washout during heavy Ontario rain events. Essential for properties near water or with steep grades.</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-[#F7931E]/10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#F7931E]" aria-hidden="true"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="font-bold text-[#333333] mb-2 text-lg">Functional Seating</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Low retaining walls double as beautiful seating areas in your outdoor living space. The smooth concrete cap provides a comfortable, durable edge.</p>
            </div>
          </div>

          {/* Details section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://londonconcreteforming.ca/wp-content/uploads/2025/09/Concrete-Contractor-in-St.-Thomas.png"
                alt="Completed concrete retaining wall with terraced garden beds in London, Ontario"
                fill className="object-cover" unoptimized
              />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] mb-5">Why Concrete — Not Block or Stone?</h2>
              <div className="space-y-4">
                {[
                  { title: "Monolithic Strength", desc: "Poured concrete walls form a single solid unit, eliminating the weak points between individual blocks or stones." },
                  { title: "No Frost Heaving", desc: "Properly designed poured concrete walls with drainage resist frost heaving — a major issue for stacked stone and interlocking block walls in Ontario." },
                  { title: "Custom Heights & Curves", desc: "Unlike block, poured concrete can be formed to any height and curved to follow your yard's contours precisely." },
                  { title: "50+ Year Lifespan", desc: "Reinforced concrete retaining walls outlast block walls significantly. No individual blocks to shift, crack, or fall out." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#F7931E] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#333333] mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost CTA */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="bg-[#333333] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">Retaining Wall Cost Guide</h2>
            <p className="text-slate-300 text-lg mb-2">Typical Range: <span className="text-[#F7931E] font-bold">$150–$400 per linear foot</span></p>
            <p className="text-slate-400 mb-6">Cost depends on wall height, length, drainage requirements, and site access. We provide a detailed, itemized quote for every project.</p>
            <Link href="/contact-us" className="btn btn-primary text-base">Get Your Free Quote</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-10"><h2 className="text-3xl font-extrabold text-[#333333] mb-3">Frequently Asked Questions</h2></div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* Form */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Get a Free Retaining Wall Quote</h2>
            <p className="text-slate-600">We serve London, St. Thomas, Woodstock, and surrounding area.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"><QuoteForm /></div>
        </div>
      </section>
    </>
  );
}
