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
  alternates: { canonical: "https://londonconcreteforming.ca/concrete-finishes" },
  title: "Concrete Finishes London Ontario | How Each One Is Done",
  description: "Compare broom, exposed aggregate, smooth trowel, stamped, and coloured concrete finishes in London, Ontario, and which one suits your driveway or patio.",
  openGraph: {
    title: "Concrete Finishes London Ontario | How Each One Is Done",
    description: "Compare broom, exposed aggregate, smooth trowel, stamped, and coloured concrete finishes in London, Ontario, and which one suits your driveway or patio.",
    images: [{ url: "/images/drive.jpg", alt: "Concrete finishes by London Concrete Forming" }],
  },
};

const finishes = [
  {
    name: "Broom Finish",
    description: "The most popular residential choice. A stiff broom is dragged across freshly poured concrete to create fine parallel grooves that provide excellent traction. Ideal for driveways, walkways, and patios where safety in wet or icy conditions is a priority. Durable, clean-looking, and easy to maintain.",
    benefits: ["Best traction for driveways & walkways", "Ontario winter-safe surface", "Most affordable finish option", "Ages beautifully over decades"],
    image: "/images/broomfinish.png",
    imageAlt: "Broom finish concrete driveway installed in London, Ontario by London Concrete Forming",
    priceNote: "$10–$14 / sq.ft. installed",
  },
  {
    name: "Exposed Aggregate",
    description: "Decorative stones, pebbles, or coloured glass are embedded in the concrete surface. The cement paste is washed away to reveal the aggregate underneath, creating a natural, textured look. Exposed aggregate is slip-resistant, visually striking, and uniquely customizable to complement any exterior.",
    benefits: ["Natural stone aesthetic", "Highly slip-resistant texture", "Hides dirt and staining well", "Wide colour & stone selection"],
    image: "/images/PXL_20230718_125644595.jpg",
    imageAlt: "Exposed aggregate concrete patio with river stone finish in London, Ontario",
    priceNote: "$13–$18 / sq.ft. installed",
  },
  {
    name: "Stamped Concrete",
    description: "Rubber stamps are pressed into freshly poured concrete to mimic the look of brick, slate, cobblestone, wood, or natural stone — at a fraction of the cost. Integral colour, colour hardeners, and release agents create realistic depth and texture. Perfect for patios, pool decks, and feature driveways.",
    benefits: ["Looks like stone or brick at lower cost", "Available in 50+ patterns", "Custom colour combinations", "Low long-term maintenance"],
    image: "/images/stampedfinish.jpg",
    imageAlt: "Stamped concrete patio with cobblestone pattern installed in London, Ontario",
    priceNote: "$15–$25 / sq.ft. installed",
  },
  {
    name: "Polished Concrete",
    description: "Industrial-grade diamond grinding and polishing creates a smooth, mirror-like surface. Most commonly used for garage floors and interior slabs. Polished concrete is extremely durable, easy to clean, and resistant to staining. A sealer is applied at the end for added protection and sheen.",
    benefits: ["High-gloss professional look", "Extremely durable surface", "Dust-resistant & easy to clean", "Ideal for garages & basements"],
    image: "/images/drive.jpg",
    imageAlt: "Polished concrete garage floor with high-gloss finish in London, Ontario",
    priceNote: "$5–$10 / sq.ft. (grind & seal)",
  },
  {
    name: "Coloured Concrete",
    description: "Integral colour pigments are mixed directly into the concrete before pouring, creating uniform colour throughout the slab. Unlike surface stains, the colour will not peel or fade from traffic. Available in dozens of shades — warm tones, cool greys, and custom mixes — to match your home perfectly.",
    benefits: ["Colour goes all the way through", "Won't peel, chip, or flake", "50+ colour choices available", "Works with any surface finish"],
    image: "/images/Colours2.jpg",
    imageAlt: "Coloured concrete driveway in warm charcoal tone in London, Ontario",
    priceNote: "+$2–$4 / sq.ft. added to any finish",
  },
  {
    name: "Smooth / Hand-Trowelled",
    description: "A steel hand trowel creates a dense, flat, smooth finish. The most common choice for interior floors, garage slabs, and basement pads. The tight surface is easy to clean and provides a clean, modern look. Often paired with a topical sealer for extra protection and a subtle sheen.",
    benefits: ["Clean modern aesthetic", "Dense, hard-wearing surface", "Easy to clean & maintain", "Great for interior slabs"],
    image: "/images/IMG-20231218-WA0005.jpg",
    imageAlt: "Smooth hand-trowelled concrete garage slab in London, Ontario",
    priceNote: "$10–$14 / sq.ft. installed",
  },
];

const faqItems = [
  { question: "Which concrete finish is best for a driveway in Ontario?", answer: "Broom finish is the most popular for driveways because of its natural traction in wet and icy conditions. Stamped concrete and exposed aggregate are great upgrades that look beautiful while still providing a slip-resistant surface." },
  { question: "How do I choose between broom finish and exposed aggregate?", answer: "Broom finish is the more economical option and provides excellent grip. Exposed aggregate adds a decorative stone texture that many homeowners prefer for curb appeal. Both are equally durable. Your choice usually comes down to budget and aesthetic preference." },
  { question: "Can I add colour to any concrete finish?", answer: "Yes — integral colour pigments can be added to any finish type. Colour hardeners and acid stains can also be applied after the pour. We will show you colour samples during your consultation." },
  { question: "What is the most durable concrete finish?", answer: "All properly installed concrete finishes are extremely durable. Polished and trowelled finishes are the densest and most abrasion-resistant. Stamped concrete requires periodic resealing every 2–3 years to maintain its appearance." },
];

export default function ConcreteFinishesPage() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Finishes", description: "All concrete finish options — broom, exposed aggregate, stamped, polished, coloured — in London, Ontario.", url: site.url + "/concrete-finishes" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Concrete Finishes", url: site.url + "/concrete-finishes" }]),
    faqSchema(faqItems),
  ];

  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}

      {/* Hero */}
      <section className="bg-[#333333] relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/drive.jpg"
            alt="Concrete finishing work by London Concrete Forming in London, Ontario"
            fill className="object-cover opacity-20" priority
          />
        </div>
        <div className="relative container-custom text-center max-w-4xl mx-auto">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Concrete Finishes</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Every Concrete Finish, Expertly Applied</h1>
          <p className="text-slate-300 text-xl mb-8">Broom, exposed aggregate, stamped, polished, and coloured — we do them all in London and surrounding area.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Finish Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-base text-[#333333]">Call {site.phone}</a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section bg-white">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-[#333333] mb-5">The Right Finish Makes All the Difference</h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">Concrete is one of the most versatile building materials available. The right surface finish dramatically affects curb appeal, safety, maintenance requirements, and longevity. London Concrete Forming has applied every finish type for over 20 years — we will help you choose the right one for your project and budget.</p>
          <p className="text-slate-600 leading-relaxed">Every finish listed below is available across London, St. Thomas, Woodstock, Stratford, Sarnia, Chatham, and Port Stanley.</p>
        </div>
      </section>

      {/* Finish Showcase */}
      <section className="bg-[#f8fafc] py-16">
        <div className="container-custom">
          <div className="space-y-16">
            {finishes.map((finish, i) => (
              <div key={finish.name} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="inline-block text-[#F7931E] text-xs font-bold uppercase tracking-wider mb-2">{finish.priceNote}</span>
                  <h2 className="text-3xl font-extrabold text-[#333333] mb-4">{finish.name}</h2>
                  <p className="text-slate-600 leading-relaxed mb-5">{finish.description}</p>
                  <ul className="space-y-2 mb-6">
                    {finish.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-sm text-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#F7931E] flex-shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact-us" className="btn btn-primary">Get a Quote for {finish.name}</Link>
                </div>
                <div className={`relative h-72 rounded-2xl overflow-hidden shadow-lg ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Image src={finish.image} alt={finish.imageAlt} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Quick Finish Comparison</h2>
            <p className="text-slate-600">At-a-glance guide to help you choose the right finish for your project.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-[#333333] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Finish</th>
                  <th className="px-4 py-3 text-left font-semibold">Best For</th>
                  <th className="px-4 py-3 text-left font-semibold">Traction</th>
                  <th className="px-4 py-3 text-left font-semibold">Maintenance</th>
                  <th className="px-4 py-3 text-left font-semibold">Price Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#333333]">Broom</td><td className="px-4 py-3 text-slate-600">Driveways, walkways</td><td className="px-4 py-3 text-green-600 font-medium">Excellent</td><td className="px-4 py-3 text-slate-600">Very Low</td><td className="px-4 py-3 text-slate-600">$10–$14/sqft</td></tr>
                <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#333333]">Exposed Aggregate</td><td className="px-4 py-3 text-slate-600">Patios, pool decks</td><td className="px-4 py-3 text-green-600 font-medium">Excellent</td><td className="px-4 py-3 text-slate-600">Low</td><td className="px-4 py-3 text-slate-600">$13–$18/sqft</td></tr>
                <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#333333]">Stamped</td><td className="px-4 py-3 text-slate-600">Patios, feature driveways</td><td className="px-4 py-3 text-yellow-600 font-medium">Good</td><td className="px-4 py-3 text-slate-600">Reseal every 2–3 yrs</td><td className="px-4 py-3 text-slate-600">$15–$25/sqft</td></tr>
                <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#333333]">Polished</td><td className="px-4 py-3 text-slate-600">Garages, interiors</td><td className="px-4 py-3 text-yellow-600 font-medium">Moderate</td><td className="px-4 py-3 text-slate-600">Very Low</td><td className="px-4 py-3 text-slate-600">$5–$10/sqft</td></tr>
                <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#333333]">Coloured</td><td className="px-4 py-3 text-slate-600">Add to any finish</td><td className="px-4 py-3 text-slate-600">Varies</td><td className="px-4 py-3 text-slate-600">Low</td><td className="px-4 py-3 text-slate-600">+$2–$4/sqft</td></tr>
                <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#333333]">Smooth / Trowelled</td><td className="px-4 py-3 text-slate-600">Slabs, interiors</td><td className="px-4 py-3 text-yellow-600 font-medium">Moderate</td><td className="px-4 py-3 text-slate-600">Very Low</td><td className="px-4 py-3 text-slate-600">$10–$14/sqft</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-10"><h2 className="text-3xl font-extrabold text-[#333333] mb-3">Finish Questions Answered</h2></div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* Form */}
      <Expansion slug="concrete-finishes" />
      <section className="section bg-white">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Not Sure Which Finish to Choose?</h2>
            <p className="text-slate-600">Fill out the form and we will walk you through your options and provide a free quote.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"><QuoteForm /></div>
        </div>
      </section>
    </>
  );
}
