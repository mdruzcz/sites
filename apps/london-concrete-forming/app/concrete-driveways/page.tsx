import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Professional Concrete Driveway Installation",
  description: "Expert concrete driveway installation in London, ON. Natural, coloured, stamped & broomed options. $10–$16/sq.ft. Free estimates — call 519-914-1901.",
  openGraph: {
    title: "Professional Concrete Driveway Installation",
    description: "Expert concrete driveway contractor in London, Ontario. Natural, coloured, stamped & broomed options.",
    images: [{ url: "https://londonconcreteforming.ca/wp-content/uploads/2025/02/drive.jpg", alt: "Concrete driveway installation in London, Ontario" }],
  },
};

const faqItems = [
  { question: "What is the cost of a stamped concrete driveway?", answer: "Stamped concrete driveways typically cost $15–$25 per square foot depending on the pattern complexity and colour options chosen. Standard concrete runs $10–$16 per square foot." },
  { question: "Can I customize my concrete driveway colour and pattern?", answer: "Absolutely! We offer a wide range of colours, stains, and stamped patterns including cobblestone, slate, brick, and more. During your consultation we will show you samples and help you choose the perfect look." },
  { question: "How long does concrete driveway installation take?", answer: "Most residential driveways take 2–3 days: Day 1 for excavation and forming, Day 2 for pouring and finishing, followed by a 7-day cure period before vehicle traffic." },
];

export default function ConcreteDrivewaysPage() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Driveway Installation", description: "Professional concrete driveway installation in London, Ontario. Natural, coloured, stamped, and broomed options.", url: `${site.url}/concrete-driveways` }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Concrete Driveways", url: `${site.url}/concrete-driveways` }]),
    faqSchema(faqItems),
  ];

  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}

      <section className="bg-[#333333] relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image src="https://londonconcreteforming.ca/wp-content/uploads/2025/02/drive.jpg" alt="Concrete driveway installation in London, Ontario" fill className="object-cover opacity-25" priority unoptimized />
        </div>
        <div className="relative container-custom text-center max-w-4xl mx-auto">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Concrete Driveways</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Professional Concrete Driveway Installation</h1>
          <p className="text-slate-300 text-xl mb-6">Natural, Coloured, Stamped, and Broomed Driveway Options</p>
          <p className="text-slate-400 mb-8">We specialize in residential concrete driveway installation, stamped concrete driveways, and driveway replacement in London, Ontario.</p>
          <Link href="/contact-us" className="btn btn-primary text-base">Schedule a Free Estimate</Link>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] mb-5">Why Choose Concrete Over Asphalt or Gravel?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#F7931E] flex items-center justify-center flex-shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg></div>
                  <div><h3 className="font-bold text-[#333333] mb-1">Resistance to Cracking</h3><p className="text-slate-600 text-sm leading-relaxed">Properly installed concrete driveways resist cracking far better than asphalt, especially in Ontario freeze-thaw conditions.</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#F7931E] flex items-center justify-center flex-shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg></div>
                  <div><h3 className="font-bold text-[#333333] mb-1">Strength in Structure</h3><p className="text-slate-600 text-sm leading-relaxed">Concrete can bear heavier loads and lasts 30–50 years with minimal maintenance versus 15–20 years for asphalt.</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#F7931E] flex items-center justify-center flex-shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg></div>
                  <div><h3 className="font-bold text-[#333333] mb-1">Low Maintenance</h3><p className="text-slate-600 text-sm leading-relaxed">No annual sealing required. Just occasional cleaning keeps your concrete driveway looking great for decades.</p></div>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src="https://londonconcreteforming.ca/wp-content/uploads/2025/02/drive.jpg" alt="Beautiful concrete driveway by London Concrete Forming in London, Ontario" fill className="object-cover" unoptimized />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#f8fafc]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Design Options: Endless Possibilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#F7931E]/10 flex items-center justify-center mx-auto mb-4 text-[#F7931E]">🎨</div>
              <h3 className="font-bold text-[#333333] mb-2">Endless Possibilities</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Broom finish, exposed aggregate, stamped patterns, or smooth — we offer every style to match your home.</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#F7931E]/10 flex items-center justify-center mx-auto mb-4 text-[#F7931E]">🛡️</div>
              <h3 className="font-bold text-[#333333] mb-2">Non-Slip Surface</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Broom-finished concrete provides excellent traction in all weather conditions — important for Ontario winters.</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#F7931E]/10 flex items-center justify-center mx-auto mb-4 text-[#F7931E]">🌈</div>
              <h3 className="font-bold text-[#333333] mb-2">Colour Options</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Integral colour, acid staining, and colour hardeners allow you to match or complement any exterior palette.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="bg-[#333333] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">Driveway Cost Guide</h2>
            <p className="text-slate-300 text-lg mb-2">Standard Concrete Driveway: <span className="text-[#F7931E] font-bold">$10–$16 per sq.ft.</span></p>
            <p className="text-slate-300 mb-6">Includes excavation, grading, reinforcement, pour, and standard broom finish. Stamped and coloured options priced separately.</p>
            <Link href="/contact-us" className="btn btn-primary text-base">Get Your Free Quote</Link>
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
          <div className="text-center mb-10"><h2 className="text-3xl font-extrabold text-[#333333] mb-3">Get a Free Driveway Quote</h2><p className="text-slate-600">We serve London, St. Thomas, Woodstock, and surrounding area.</p></div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"><QuoteForm /></div>
        </div>
      </section>
    </>
  );
}
