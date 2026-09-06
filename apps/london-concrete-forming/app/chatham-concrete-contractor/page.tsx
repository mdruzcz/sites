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
  alternates: { canonical: "https://londonconcreteforming.ca/chatham-concrete-contractor" },
  title: "Concrete Contractor in Chatham-Kent, ON",
  description: "Concrete driveways and patios for Chatham-Kent's flat farmland lots and older homes near the Thames River. Free estimates, written quotes within 1 business day.",
  openGraph: {
    title: "Concrete Contractor in Chatham-Kent, ON",
    description: "Concrete driveways and patios for Chatham-Kent's flat farmland lots and older homes near the Thames River. Free estimates, written quotes within 1 business day.",
  },
};

const services = [
  { name: "Concrete Driveways", href: "/concrete-driveways", desc: "New driveway installation, replacement, and widening. Standard and stamped options available.", icon: "🚗" },
  { name: "Concrete Patios", href: "/concrete-patios", desc: "Custom patio slabs — plain, exposed aggregate, stamped, or coloured to match your home.", icon: "â˜€ï¸" },
  { name: "Retaining Walls", href: "/concrete-retaining-walls", desc: "Poured concrete retaining walls for erosion control, terracing, and usable yard space.", icon: "🧱" },
  { name: "Stamped Concrete", href: "/stamped-concrete-driveway", desc: "Cobblestone, slate, brick, and 50+ more patterns for driveways and patios.", icon: "🎨" },
  { name: "Concrete Removal", href: "/concrete-removal-services", desc: "Old concrete broken out, hauled away, and site left clean and ready for the new pour.", icon: "🔨" },
  { name: "Shed & Equipment Pads", href: "/concrete-shed-pad-installer", desc: "Properly graded and reinforced pads for sheds, garages, hot tubs, and equipment.", icon: "🏗️" },
];

const faqItems = [
  { question: "Do you serve Chatham, Ontario?", answer: "Yes — London Concrete Forming serves Chatham-Kent homeowners with the full range of concrete services. Chatham is within our regular service territory." },
  { question: "What concrete services do you offer in Chatham?", answer: "We offer driveway installation, patio construction, retaining walls, concrete removal, shed and equipment pads, and stamped concrete in 50+ patterns throughout Chatham-Kent." },
  { question: "Are there travel fees for Chatham projects?", answer: "For most projects in Chatham proper, we do not charge travel fees. For projects in more remote Chatham-Kent areas, we may add a small travel supplement — we will disclose this clearly in your written quote." },
  { question: "How do I get started with a concrete project in Chatham?", answer: "Simply call 519-914-1901 or fill out the form below. We will schedule a free on-site estimate, provide a detailed written quote, and walk you through your options at no charge." },
];

export default function ChathamPage() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Contractor in Chatham, ON", description: "Professional concrete services in Chatham, Ontario — driveways, patios, retaining walls, and more.", url: site.url + "/chatham-concrete-contractor", city: "Chatham" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Service Areas", url: site.url + "/service-areas" }, { name: "Chatham", url: site.url + "/chatham-concrete-contractor" }]),
    faqSchema(faqItems),
  ];

  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}

      {/* Hero */}
      <section className="bg-[#333333] relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image src="/images/IMG-20231218-WA0003.jpg" alt="Concrete driveway installation in Chatham, Ontario" fill className="object-cover opacity-25" priority />
        </div>
        <div className="relative container-custom max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Chatham, Ontario</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Your Concrete Contractor in Chatham, ON</h1>
          <p className="text-slate-300 text-xl mb-8">Driveways, patios, retaining walls &amp; stamped concrete — 20+ years of experience serving Chatham and Chatham-Kent.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-base text-[#333333]">Call {site.phone}</a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#F7931E] py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[{ v: "20+", l: "Years Experience" }, { v: "500+", l: "Projects Completed" }, { v: "Free", l: "On-Site Estimates" }, { v: "1 Day", l: "Response Time" }].map((s) => (
              <div key={s.l}><p className="text-3xl font-extrabold">{s.v}</p><p className="text-sm font-medium opacity-90">{s.l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Concrete Services in Chatham</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Everything from new driveway installation to stamped concrete patios — fully serviced in Chatham-Kent.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="card p-6 hover:border-[#F7931E] hover:shadow-md transition-all group">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-[#333333] mb-2 group-hover:text-[#F7931E] transition-colors">{s.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] mb-5">Why Chatham Homeowners Choose Us</h2>
              <div className="space-y-4">
                {[
                  { title: "Honest Pricing", desc: "No bait-and-switch. We provide detailed written quotes before any work starts, and our final invoice matches what we quoted." },
                  { title: "Quality Materials", desc: "We use only 32 MPa concrete — the minimum grade required for residential driveways in Ontario. No watered-down mixes." },
                  { title: "Experienced Crew", desc: "Our team has been placing and finishing concrete for 20+ years. Every crew member understands Ontario's freeze-thaw demands." },
                  { title: "Satisfaction Guaranteed", desc: "We stand behind our workmanship. Any issues related to our installation are addressed promptly and at no cost to you." },
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
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/IMG-20231218-WA0003.jpg" alt="Concrete patio project completed by London Concrete Forming near Chatham, Ontario" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-[#333333] mb-4">Also Serving Chatham-Kent Communities</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Blenheim", "Ridgetown", "Tilbury", "Dresden", "Wallaceburg", "Bothwell", "Thamesville"].map((city) => (
              <span key={city} className="bg-[#f8fafc] text-slate-700 px-4 py-2 rounded-full text-sm font-medium border border-slate-200">{city}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-10"><h2 className="text-3xl font-extrabold text-[#333333] mb-3">Frequently Asked Questions</h2></div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* Form */}
      <Expansion slug="chatham-concrete-contractor" />
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] mb-4">Get a Free Quote for Your Chatham Project</h2>
              <p className="text-slate-600 leading-relaxed mb-4">Fill out the form and we will respond within 1 business day to schedule your free on-site estimate.</p>
              <p className="text-slate-600 mb-4">Or call <a href={site.phoneHref} className="text-[#F7931E] font-semibold hover:underline">{site.phone}</a></p>
              <div className="bg-[#f8fafc] rounded-xl p-5">
                <ul className="space-y-2 text-sm text-slate-600">
                  {["Free on-site estimate within 2–5 business days", "Detailed written quote with itemized breakdown", "Transparent pricing — no hidden fees", "No obligation after the estimate"].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#F7931E] flex-shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"><QuoteForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}
