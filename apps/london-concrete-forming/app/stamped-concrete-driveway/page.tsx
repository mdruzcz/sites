import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { Expansion } from "@/components/Expansion";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "https://londonconcreteforming.ca/stamped-concrete-driveway" },
  title: "Stamped Concrete Driveway London Ontario | Patterns & Cost",
  description: "Stamped concrete driveways in London, Ontario: patterns, colour hardener, sealing schedule, and how the finish holds up to freeze-thaw winters. Free quotes.",
  openGraph: {
    title: "Stamped Concrete Driveway London Ontario | Patterns & Cost",
    description: "Stamped concrete driveways in London, Ontario: patterns, colour hardener, sealing schedule, and how the finish holds up to freeze-thaw winters. Free quotes.",
    images: [{ url: "/images/stamped-cobblestone-driveway.jpg", alt: "Stamped concrete driveway installation in London, Ontario" }],
  },
};

const faqItems = [
  { question: "How much does a stamped concrete driveway cost in London, Ontario?", answer: "Stamped concrete driveways in London typically cost $15–$25 per square foot installed, depending on the pattern complexity, colour choices, and size. A typical two-car driveway (500–700 sq.ft.) runs $8,000–$17,000 installed." },
  { question: "How long does a stamped concrete driveway last?", answer: "With proper installation and regular resealing every 2–3 years, a stamped concrete driveway lasts 25–35+ years in Ontario's climate. The concrete itself is highly durable — it is primarily the sealer that needs maintenance." },
  { question: "What is the best stamped pattern for a driveway?", answer: "Cobblestone and ashlar slate are the most popular driveway patterns because they provide a natural, premium look that complements most home styles. We bring sample boards to your consultation to help you decide." },
  { question: "Is stamped concrete slippery in the winter?", answer: "We always apply a non-slip additive to the sealer on driveways. The texture from the stamp pattern provides more grip than a smooth surface. We recommend sand over road salt to preserve the sealer." },
  { question: "Can I add stamped concrete beside my existing concrete?", answer: "Yes, in many cases we can add stamped concrete to complement existing concrete. We will assess your existing slab during the free consultation and advise on the best approach." },
];

export default function StampedConcreteDrivewayPage() {
  const jsonLd = [
    serviceSchema({ name: "Stamped Concrete Driveway Installation", description: "Professional stamped concrete driveway installation in London, Ontario. Patterns, colours, and custom designs.", url: site.url + "/stamped-concrete-driveway" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Stamped Concrete Driveway", url: site.url + "/stamped-concrete-driveway" }]),
    faqSchema(faqItems),
  ];

  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}

      {/* Hero */}
      <section className="bg-[#333333] relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/stamped-cobblestone-driveway.jpg"
            alt="Stamped concrete driveway with cobblestone pattern installed in London, Ontario"
            fill className="object-cover opacity-30" priority
          />
        </div>
        <div className="relative container-custom text-center max-w-4xl mx-auto">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Stamped Concrete Driveways</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Stamped Concrete Driveway Installation in London, ON</h1>
          <p className="text-slate-300 text-xl mb-6">Transform your home&apos;s curb appeal with a beautiful, durable stamped concrete driveway. 50+ patterns. Custom colours.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-base text-[#333333]">Call {site.phone}</a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] mb-5">Why Choose Stamped Concrete for Your Driveway?</h2>
              <p className="text-slate-600 leading-relaxed mb-6">Stamped concrete gives you the premium look of cobblestone, slate, or brick at roughly half the cost of natural materials — without the joint maintenance and weed problems that come with pavers. It is poured as one continuous slab, so there are no shifting stones, no sinking sections, and no weeds growing through the cracks.</p>
              <div className="space-y-4">
                {[
                  { title: "Half the Cost of Natural Pavers", desc: "Get the cobblestone or slate look at $15–$25/sqft versus $30–$60+ for natural stone installation." },
                  { title: "No Weeds or Shifting", desc: "One continuous concrete slab — no joints for weeds, no individual pavers to sink or shift." },
                  { title: "50+ Patterns Available", desc: "From cobblestone and slate to brick and wood grain — a pattern for every home style." },
                  { title: "Holds Value for Decades", desc: "With regular resealing, stamped concrete maintains its beauty for 25–35 years with minimal upkeep." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-[#F7931E] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#333333] mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/stamped-cobblestone-driveway.jpg"
                alt="Beautiful stamped concrete driveway by London Concrete Forming"
                fill className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Patterns */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Most Popular Driveway Patterns</h2>
            <p className="text-slate-600 max-w-xl mx-auto">We bring full-size sample boards to your free consultation so you can see and feel each pattern in person.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Cobblestone", desc: "Old-world European charm. The #1 most requested driveway pattern.", popular: true },
              { name: "Ashlar Slate", desc: "Irregular stone shapes for a sophisticated, premium look.", popular: false },
              { name: "Running Bond Brick", desc: "Classic offset brick rows that complement traditional homes.", popular: false },
              { name: "Herringbone Brick", desc: "V-shaped zigzag brick for a dramatic, high-end statement.", popular: false },
              { name: "Flagstone", desc: "Large irregular shapes that resemble natural flat stone.", popular: false },
              { name: "Fan / Basket Weave", desc: "Circular or interlocking patterns for unique feature driveways.", popular: false },
            ].map((p) => (
              <div key={p.name} className={`card p-5 ${p.popular ? "border-2 border-[#F7931E]" : ""}`}>
                {p.popular && <span className="inline-block text-xs font-bold text-[#F7931E] uppercase tracking-wider mb-2">Most Popular</span>}
                <h3 className="font-bold text-[#333333] mb-2">{p.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/concrete-stamps" className="btn btn-outline text-sm">View Full Pattern Gallery →</Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="text-center mb-10"><h2 className="text-3xl font-extrabold text-[#333333] mb-3">Our Installation Process</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { step: "1", title: "Free On-Site Estimate", desc: "We visit, measure, assess drainage and grade, and walk you through pattern and colour options. No charge, no obligation." },
              { step: "2", title: "Excavation & Base Prep", desc: "Old material is removed, the area is excavated, a compacted gravel base is installed, and rebar is placed for strength." },
              { step: "3", title: "Forming & Pour", desc: "Forms are set at the correct height and slope. 32 MPa concrete is poured and levelled to a consistent thickness." },
              { step: "4", title: "Colour, Stamp & Seal", desc: "Colour hardener is broadcast and worked in. Rubber stamps are pressed in your chosen pattern. A penetrating sealer protects the finished surface." },
            ].map((step) => (
              <div key={step.step} className="bg-[#f8fafc] rounded-xl p-6 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F7931E] text-white font-extrabold flex items-center justify-center flex-shrink-0 text-lg">{step.step}</div>
                <div>
                  <h3 className="font-bold text-[#333333] mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost CTA */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="bg-[#333333] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-6">Stamped Concrete Driveway Cost Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="bg-white/10 rounded-xl p-4"><p className="text-slate-300 mb-1">Simple Pattern</p><p className="text-[#F7931E] font-extrabold text-2xl">$15–$18</p><p className="text-slate-400">per sq.ft.</p></div>
              <div className="bg-white/10 rounded-xl p-4 border-2 border-[#F7931E]"><p className="text-slate-300 mb-1">Popular Choice</p><p className="text-[#F7931E] font-extrabold text-2xl">$18–$22</p><p className="text-slate-400">per sq.ft.</p></div>
              <div className="bg-white/10 rounded-xl p-4"><p className="text-slate-300 mb-1">Custom w/ Borders</p><p className="text-[#F7931E] font-extrabold text-2xl">$22–$25</p><p className="text-slate-400">per sq.ft.</p></div>
            </div>
            <Link href="/contact-us" className="btn btn-primary text-base">Get Your Free Estimate</Link>
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
      <Expansion slug="stamped-concrete-driveway" />
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Get a Free Stamped Driveway Quote</h2>
            <p className="text-slate-600">Serving London, St. Thomas, Woodstock, and surrounding area.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"><QuoteForm /></div>
        </div>
      </section>
    </>
  );
}
