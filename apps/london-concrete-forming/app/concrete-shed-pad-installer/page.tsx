import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Shed Pad & Garage Pad Installer â€” London, Ontario",
  description: "Professional concrete shed pads, garage pads, and hot tub pads in London, Ontario. Properly graded, reinforced, and built to last. Free quotes â€” 519-914-1901.",
  openGraph: {
    title: "Concrete Shed Pad & Garage Pad Installation in London, ON",
    description: "Expert concrete pad installation for sheds, garages, hot tubs, and more in London, Ontario. Free quotes from London Concrete Forming.",
    images: [{ url: "/images/concrete-garage-pad.jpg", alt: "Concrete shed pad installation by London Concrete Forming" }],
  },
};

const faqItems = [
  { question: "How much does a concrete shed pad cost in London, Ontario?", answer: "A standard 10Ã—12 concrete shed pad typically costs $1,200â€“$1,800 installed, including excavation, gravel base, forming, pour, and broom finish. Larger pads and those in difficult access areas cost more. We provide free exact quotes." },
  { question: "How thick should a concrete shed pad be?", answer: "For a garden shed or small outbuilding, 4 inches (100mm) of concrete is standard. For larger structures, heavy equipment storage, or hot tubs, we recommend 5â€“6 inches (125â€“150mm) with rebar reinforcement. We will advise the right thickness for your project." },
  { question: "Do I need a permit for a shed pad in London, Ontario?", answer: "A permit is generally not required for a shed pad alone, but may be required for the shed structure itself if it exceeds 10 square metres. If you are pouring a garage pad, a permit is typically required. We can advise you on the permit requirements during your consultation." },
  { question: "How long does a concrete shed pad installation take?", answer: "Most shed pads are completed in 1 day: excavation and forming in the morning, pour and finish in the afternoon. The concrete needs 7 days to cure before placing the shed on it, and 28 days for full strength." },
  { question: "Can you pour a concrete pad in winter in Ontario?", answer: "Yes, with proper cold-weather concrete practices including heated enclosures and insulating blankets, we can pour concrete in colder temperatures. We schedule winter pours during mild spells and use winter-grade concrete mixes. Contact us for seasonal availability." },
];

export default function ConcreteShedPadPage() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Shed Pad Installation", description: "Professional concrete shed pad, garage pad, and hot tub pad installation in London, Ontario.", url: site.url + "/concrete-shed-pad-installer" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Concrete Shed Pad Installer", url: site.url + "/concrete-shed-pad-installer" }]),
    faqSchema(faqItems),
  ];

  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}

      {/* Hero */}
      <section className="bg-[#333333] relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/concrete-garage-pad.jpg"
            alt="Concrete shed pad and garage pad installation by London Concrete Forming in London, Ontario"
            fill className="object-cover opacity-20" priority
          />
        </div>
        <div className="relative container-custom text-center max-w-4xl mx-auto">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Concrete Pads</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Expert Concrete Shed Pad &amp; Garage Pad Installation</h1>
          <p className="text-slate-300 text-xl mb-6">Properly graded, reinforced concrete pads for sheds, garages, hot tubs, and outbuildings across London and surrounding area.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Pad Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-base text-[#333333]">Call {site.phone}</a>
          </div>
        </div>
      </section>

      {/* Pad Types */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Concrete Pads We Install</h2>
            <p className="text-slate-600 max-w-xl mx-auto">From small garden shed pads to large detached garage floors â€” every pad is built to last 30+ years.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Garden Shed Pads", desc: "Small to mid-size pads (8Ã—8 to 12Ã—16) for garden sheds, wood storage, and backyard workshops. Standard 4\" thickness.", price: "From $900" },
              { name: "Large Outbuilding Pads", desc: "Heavy-duty pads for larger structures. 5â€“6\" thickness with rebar for extra load capacity.", price: "From $1,800" },
              { name: "Detached Garage Pads", desc: "Full garage floors with perimeter footings, rebar grid, and smooth trowel finish. Permits advised.", price: "From $3,500" },
              { name: "Hot Tub Pads", desc: "Reinforced pads designed to support 2,000â€“5,000 lbs of water-filled hot tubs. Sized to your tub's footprint.", price: "From $1,200" },
              { name: "Equipment Pads", desc: "Heavy-duty concrete pads for generators, HVAC units, commercial equipment, and agricultural outbuildings.", price: "Custom quote" },
              { name: "Pool Equipment Pads", desc: "Small pads for pool pumps, filter systems, and pool houses. Smooth and easy to clean.", price: "From $600" },
            ].map((pad) => (
              <div key={pad.name} className="card p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-[#333333] text-lg">{pad.name}</h3>
                  <span className="text-[#F7931E] font-bold text-sm whitespace-nowrap ml-2">{pad.price}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{pad.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Proper Installation Matters */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/concrete-garage-pad.jpg"
                alt="Properly installed concrete shed pad with gravel base in London, Ontario"
                fill className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] mb-5">Why Proper Installation Matters</h2>
              <p className="text-slate-600 leading-relaxed mb-5">Many homeowners try to install concrete pads on bare ground or skip the gravel base to save money â€” this leads to cracking, heaving, and a sunken structure within a few years. We do it right the first time.</p>
              <div className="space-y-4">
                {[
                  { title: "Proper Excavation", desc: "We excavate to the correct depth â€” removing organic material that would decompose and cause settling." },
                  { title: "Compacted Gravel Base", desc: "4â€“6 inches of compacted gravel provides drainage and a stable, frost-resistant foundation." },
                  { title: "Correct Grade & Drainage", desc: "Every pad is formed with a slight slope away from structures to prevent water pooling." },
                  { title: "Rebar Where Required", desc: "Rebar or wire mesh reinforcement prevents cracking under heavy loads and during freeze-thaw cycles." },
                  { title: "Proper Cure Time", desc: "Concrete reaches 70% strength in 7 days and full strength at 28 days. We advise you on when the pad is ready to use." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#F7931E] flex-shrink-0 mt-0.5" aria-hidden="true"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg>
                    <div>
                      <span className="font-semibold text-[#333333]">{item.title}</span>
                      <span className="text-slate-600 text-sm"> â€” {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Step Process */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Our 7-Step Installation Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { step: "1", title: "Free On-Site Estimate", desc: "We visit your property, take measurements, assess the site, and provide a detailed written quote at no charge." },
              { step: "2", title: "Excavation", desc: "Topsoil, grass, and any organic material are removed to the correct depth (typically 8â€“10 inches below finished surface)." },
              { step: "3", title: "Granular Base Installation", desc: "4â€“6 inches of compacted crusher run gravel provides drainage and a stable frost-resistant base." },
              { step: "4", title: "Forming", desc: "Pressure-treated lumber or steel forms are set to your pad's exact dimensions with the correct grade and slope for drainage." },
              { step: "5", title: "Reinforcement", desc: "Wire mesh or rebar grid is placed inside the form, elevated off the base to sit in the middle third of the concrete pour." },
              { step: "6", title: "Concrete Pour & Finish", desc: "32 MPa concrete is poured, screeded, and trowelled to a smooth or broom finish. Control joints are cut to manage cracking." },
              { step: "7", title: "Cure & Cleanup", desc: "The surface is treated with a curing compound to retain moisture during the 7-day initial cure. Forms are removed and the site is cleaned up." },
            ].map((step) => (
              <div key={step.step} className="flex gap-4 p-4 bg-[#f8fafc] rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[#F7931E] text-white font-bold text-sm flex items-center justify-center flex-shrink-0">{step.step}</div>
                <div>
                  <h3 className="font-bold text-[#333333] text-sm mb-1">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Guide */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="bg-[#333333] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">Shed Pad Cost Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-slate-300 mb-1">8Ã—10 to 10Ã—12</p>
                <p className="text-[#F7931E] font-extrabold text-2xl">$900â€“$1,400</p>
                <p className="text-slate-400">Small shed pad</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border-2 border-[#F7931E]">
                <p className="text-slate-300 mb-1">12Ã—16 to 16Ã—20</p>
                <p className="text-[#F7931E] font-extrabold text-2xl">$1,400â€“$2,400</p>
                <p className="text-slate-400">Mid-size pad</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-slate-300 mb-1">20Ã—20 to 24Ã—24</p>
                <p className="text-[#F7931E] font-extrabold text-2xl">$2,400â€“$4,200</p>
                <p className="text-slate-400">Large pad / garage</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-6">All prices include excavation, gravel base, forming, pour, broom finish, and cleanup.</p>
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
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Get a Free Concrete Pad Quote</h2>
            <p className="text-slate-600">Tell us the size and purpose of your pad and we will provide a fast, detailed quote.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"><QuoteForm /></div>
        </div>
      </section>
    </>
  );
}
