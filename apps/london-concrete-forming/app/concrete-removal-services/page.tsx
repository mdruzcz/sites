import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Removal Services in London, St. Thomas & Woodstock",
  description: "Professional concrete demolition and removal in London, Ontario. Old driveways, patios, slabs, steps removed fast & cleanly. Free quotes — 519-914-1901.",
  openGraph: {
    title: "Concrete Removal Services in London, St. Thomas & Woodstock",
    description: "Fast, clean concrete demolition and removal in London, Ontario. Old driveways, patios, and slabs removed with same-day cleanup.",
  },
};

const faqItems = [
  { question: "How much does concrete removal cost in London, Ontario?", answer: "Concrete removal typically costs $3–$6 per square foot depending on thickness, reinforcement, and site access. A typical driveway (400 sq.ft.) runs $1,200–$2,400 for demolition, removal, and disposal. We provide free on-site estimates." },
  { question: "Do you haul away the old concrete?", answer: "Yes — full removal and disposal is included in every quote. We bring a bin or truck, break out the concrete, load it, and leave your site clean and graded ready for the new pour." },
  { question: "How long does concrete removal take?", answer: "Most residential concrete removal projects (driveways, patios, walkways) are completed in a single day. Larger projects or those with heavy reinforcement may take 2 days. We will give you a timeline during your free estimate." },
  { question: "Can you remove concrete next to my house without damaging it?", answer: "Yes. We use hydraulic breakers and hand tools when working near foundations, walls, or landscaping to protect adjacent structures. Our crews are experienced at precision demolition in tight spaces." },
  { question: "Do I need a permit for concrete removal?", answer: "In most cases, no permit is required for removing a driveway, patio, or walkway. If you are replacing a driveway that was installed before current setback requirements, a permit may be needed for the new installation. We will advise you during your consultation." },
];

export default function ConcreteRemovalPage() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Removal Services in London, ON", description: "Professional concrete demolition and removal services in London, St. Thomas, and Woodstock, Ontario.", url: site.url + "/concrete-removal-services" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Concrete Removal Services", url: site.url + "/concrete-removal-services" }]),
    faqSchema(faqItems),
  ];

  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}

      {/* Hero */}
      <section className="bg-[#333333] relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image
            src="https://londonconcreteforming.ca/wp-content/uploads/2025/02/drive.jpg"
            alt="Concrete removal and demolition service in London, Ontario"
            fill className="object-cover opacity-20" priority unoptimized
          />
        </div>
        <div className="relative container-custom text-center max-w-4xl mx-auto">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Concrete Removal</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Concrete Removal Services in London, St. Thomas &amp; Woodstock</h1>
          <p className="text-slate-300 text-xl mb-6">Old driveway, cracked patio, deteriorating walkway — we demolish it, haul it away, and leave your site clean.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Removal Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-base text-[#333333]">Call {site.phone}</a>
          </div>
        </div>
      </section>

      {/* What We Remove */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">What We Remove</h2>
            <p className="text-slate-600 max-w-xl mx-auto">From cracked driveways to old basement slabs — if it is concrete, we can remove it.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Concrete Driveways",
              "Concrete Patios",
              "Walkways & Sidewalks",
              "Garage & Basement Slabs",
              "Concrete Steps & Stoops",
              "Retaining Walls",
              "Shed Pads & Pool Decks",
              "Commercial Slabs",
              "Rebar-Reinforced Concrete",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#F7931E] flex-shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg>
                <span className="text-sm font-medium text-[#333333]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] mb-6">Our Removal Process</h2>
              <div className="space-y-5">
                {[
                  { step: "1", title: "Free On-Site Assessment", desc: "We visit your property to measure, assess the thickness and reinforcement of the existing concrete, and identify any site challenges. You receive a detailed written quote with no hidden fees." },
                  { step: "2", title: "Equipment Setup", desc: "We bring the right equipment for your project — from mini skid steers for large areas to hand tools for tight spaces near foundations or landscaping." },
                  { step: "3", title: "Demolition", desc: "Hydraulic breakers or jackhammers break the concrete into manageable pieces. We work carefully near structures, utilities, and landscaping to avoid damage." },
                  { step: "4", title: "Load & Haul", desc: "All broken concrete is loaded into our truck or bin and hauled to a recycling facility. Concrete is 100% recyclable — it is crushed and reused as road base." },
                  { step: "5", title: "Cleanup & Grade", desc: "The excavation area is cleaned of remaining debris, and the ground is roughly graded and levelled, ready for your new concrete installation." },
                ].map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#F7931E] text-white font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">{step.step}</div>
                    <div>
                      <h3 className="font-bold text-[#333333] mb-1">{step.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://londonconcreteforming.ca/wp-content/uploads/2025/02/drive.jpg"
                alt="Concrete demolition and removal equipment in action in London, Ontario"
                fill className="object-cover" unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Signs You Need Removal */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Signs It&apos;s Time to Replace Your Concrete</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Extensive Cracking", desc: "Hairline cracks are normal, but large or spreading cracks indicate structural failure. Patching only delays the inevitable — full replacement is more cost-effective." },
              { title: "Sunken or Heaved Sections", desc: "Frost heave and soil settlement cause sections to rise or sink. Tripping hazards and drainage problems result. Replacement with proper base prep solves the root cause." },
              { title: "Surface Scaling & Spalling", desc: "Repeated freeze-thaw cycles cause the surface to flake and pit. Once scaling starts, it accelerates. Resurfacing only lasts a few years — removal and replacement is the permanent fix." },
              { title: "Age Over 30 Years", desc: "Concrete has a lifespan. Concrete installed more than 30 years ago is likely at or past its structural service life and should be evaluated for replacement." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 bg-[#f8fafc] rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500" aria-hidden="true"><path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.998-.302 4.5-2.599 4.5H4.645c-2.297 0-3.752-2.502-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#333333] mb-1">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost + Combo Offer */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="bg-[#333333] rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-white mb-4">Removal Cost Guide</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-300 border-b border-slate-600 pb-2">
                    <span>Standard residential removal</span><span className="text-[#F7931E] font-bold">$3–$5/sqft</span>
                  </div>
                  <div className="flex justify-between text-slate-300 border-b border-slate-600 pb-2">
                    <span>Heavy reinforced concrete</span><span className="text-[#F7931E] font-bold">$5–$8/sqft</span>
                  </div>
                  <div className="flex justify-between text-slate-300 border-b border-slate-600 pb-2">
                    <span>Removal + new installation</span><span className="text-[#F7931E] font-bold">Best value bundle</span>
                  </div>
                </div>
                <p className="text-slate-400 text-xs mt-4">All prices include demolition, loading, hauling, and site cleanup. Free detailed quote provided before any work begins.</p>
              </div>
              <div className="text-center">
                <p className="text-white font-semibold mb-2">Bundle &amp; Save</p>
                <p className="text-slate-300 text-sm mb-5">Book removal and new concrete installation together for the best overall price. We handle everything from demolition to finishing in one project.</p>
                <Link href="/contact-us" className="btn btn-primary text-base">Get a Combined Quote</Link>
              </div>
            </div>
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
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Get a Free Concrete Removal Quote</h2>
            <p className="text-slate-600">Serving London, St. Thomas, Woodstock, and surrounding area.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"><QuoteForm /></div>
        </div>
      </section>
    </>
  );
}
