import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Expert Concrete Patio Contractor",
  description: "Professional concrete patio installation in London, Ontario. Stamped, coloured, and custom finishes. Call 519-914-1901 for a free quote.",
  openGraph: { title: "Expert Concrete Patio Contractor", description: "Professional concrete patio installation in London, Ontario. Stamped, coloured, and custom finishes." },
};

const faqItems = [
  { question: "How much does a concrete patio cost?", answer: "A basic broom-finished concrete patio costs $10–$14 per square foot. Stamped concrete patios range from $15–$25 per square foot depending on pattern and colour choices." },
  { question: "Can I bundle my patio and driveway installation?", answer: "Yes! We offer bundle pricing for customers who want both a new driveway and patio installed at the same time. This can result in significant savings on mobilization and material costs." },
  { question: "What stamped patterns do you offer for patios?", answer: "We offer a wide variety of stamped patterns including Ashlar slate, cobblestone, brick, flagstone, wood plank, and more. We can also combine patterns for a custom look." },
];

export default function ConcretePatiosPage() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Patio Installation", description: "Professional concrete patio installation in London, Ontario.", url: `${site.url}/concrete-patios` }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Concrete Patios", url: `${site.url}/concrete-patios` }]),
    faqSchema(faqItems),
  ];

  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}

      <section className="bg-[#333333] relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image src="/images/concrete-Patio.jpg" alt="Stamped concrete patio in London, Ontario" fill className="object-cover opacity-25" priority />
        </div>
        <div className="relative container-custom text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Professional Concrete Patio Contractor</h1>
          <p className="text-slate-300 text-xl mb-8">Transform your outdoor living space with a beautiful, long-lasting concrete patio.</p>
          <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] mb-5">Create Your Perfect Outdoor Space</h2>
              <p className="text-slate-600 leading-relaxed mb-4">A concrete patio is one of the best investments you can make in your home. It extends your living space outdoors, adds property value, and provides a durable surface that handles Ontario weather beautifully.</p>
              <p className="text-slate-600 leading-relaxed mb-4">Whether you want a simple broom-finished pad for a barbecue area or an intricate stamped concrete design, our team has the skills and experience to bring your vision to life.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="text-center bg-[#f8fafc] rounded-xl p-4"><p className="font-bold text-[#F7931E] text-xl">Stamped Patterns</p><p className="text-slate-600 text-xs mt-1">Cobblestone, Slate, Brick & more</p></div>
                <div className="text-center bg-[#f8fafc] rounded-xl p-4"><p className="font-bold text-[#F7931E] text-xl">Custom Finishes</p><p className="text-slate-600 text-xs mt-1">Broom, Exposed Aggregate, Smooth</p></div>
                <div className="text-center bg-[#f8fafc] rounded-xl p-4"><p className="font-bold text-[#F7931E] text-xl">Color Options</p><p className="text-slate-600 text-xs mt-1">Integral colour & staining</p></div>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src="/images/concrete-Patio.jpg" alt="Beautiful stamped concrete patio installed by London Concrete Forming in London, Ontario" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-10"><h2 className="text-3xl font-extrabold text-[#333333] mb-3">Frequently Asked Questions</h2></div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-8"><h2 className="text-3xl font-extrabold text-[#333333] mb-3">Get a Free Patio Quote</h2></div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"><QuoteForm /></div>
        </div>
      </section>
    </>
  );
}
