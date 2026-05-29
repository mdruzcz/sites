import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Contractor in Stratford, ON â€” Driveways & Patios",
  description: "Expert concrete contractor serving Stratford, Ontario. Driveways, patios, stamped concrete, retaining walls & more. 20+ years experience. Free quotes â€” 519-914-1901.",
  openGraph: {
    title: "Concrete Contractor in Stratford, ON",
    description: "Professional concrete services in Stratford, Ontario. Driveways, patios, retaining walls & stamped concrete from London Concrete Forming.",
  },
};

const services = [
  { name: "Concrete Driveways", href: "/concrete-driveways", desc: "New driveway installation, replacement, and widening. Standard and stamped options available.", icon: "ðŸš—" },
  { name: "Concrete Patios", href: "/concrete-patios", desc: "Custom patio slabs â€” plain, exposed aggregate, stamped, or coloured to match your home.", icon: "â˜€ï¸" },
  { name: "Retaining Walls", href: "/concrete-retaining-walls", desc: "Poured concrete retaining walls for erosion control, terracing, and usable yard space.", icon: "ðŸ§±" },
  { name: "Stamped Concrete", href: "/stamped-concrete-driveway", desc: "Cobblestone, slate, brick, and 50+ more patterns for driveways and patios.", icon: "ðŸŽ¨" },
  { name: "Concrete Removal", href: "/concrete-removal-services", desc: "Old concrete broken out, hauled away, and site left clean and ready for the new pour.", icon: "ðŸ”¨" },
  { name: "Shed & Equipment Pads", href: "/concrete-shed-pad-installer", desc: "Properly graded and reinforced pads for sheds, garages, hot tubs, and equipment.", icon: "ðŸ—ï¸" },
];

const faqItems = [
  { question: "Do you serve Stratford, Ontario?", answer: "Yes â€” Stratford is within our regular service area. London Concrete Forming serves Perth County homeowners with no additional travel fees for most projects." },
  { question: "What concrete services do you offer in Stratford?", answer: "We offer the full range: new driveways, patio installation, retaining walls, concrete removal, shed pads, and stamped concrete patterns in 50+ designs." },
  { question: "How long does it take to get a quote in Stratford?", answer: "We typically schedule free on-site estimates within 2â€“5 business days of your inquiry. Call 519-914-1901 or fill out the form below and we will be in touch quickly." },
  { question: "What is the best concrete finish for a Stratford home?", answer: "Broom finish is the most popular and practical for Ontario driveways. For patios and feature areas, stamped concrete in ashlar slate or cobblestone patterns is very popular in Stratford. We bring sample boards to every consultation." },
];

export default function StratfordPage() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Contractor in Stratford, ON", description: "Professional concrete services in Stratford, Ontario â€” driveways, patios, retaining walls, and more.", url: site.url + "/stratford-concrete-contractor", city: "Stratford" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Service Areas", url: site.url + "/service-areas" }, { name: "Stratford", url: site.url + "/stratford-concrete-contractor" }]),
    faqSchema(faqItems),
  ];

  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}

      {/* Hero */}
      <section className="bg-[#333333] relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image src="/images/PXL_20230718_125644595.jpg" alt="Concrete driveway installation in Stratford, Ontario" fill className="object-cover opacity-25" priority />
        </div>
        <div className="relative container-custom max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Stratford, Ontario</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Your Concrete Contractor in Stratford, ON</h1>
          <p className="text-slate-300 text-xl mb-8">Driveways, patios, retaining walls &amp; stamped concrete â€” 20+ years of experience serving Stratford and Perth County.</p>
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
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Concrete Services in Stratford</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Full-service concrete installation for Stratford and Perth County homeowners.</p>
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
              <h2 className="text-3xl font-extrabold text-[#333333] mb-5">Why Choose London Concrete Forming for Your Stratford Project</h2>
              <div className="space-y-4">
                {[
                  { title: "Perth County Experience", desc: "We have completed dozens of projects in Stratford and surrounding Perth County. We know the local soil types and building practices." },
                  { title: "No Travel Fees", desc: "Stratford falls within our standard service radius. You receive the same transparent pricing and no added travel costs." },
                  { title: "32 MPa Concrete Standard", desc: "We always use minimum 32 MPa concrete â€” engineered for Ontario's freeze-thaw cycle and heavy vehicle traffic." },
                  { title: "Start-to-Finish Coordination", desc: "One crew handles excavation, forming, pouring, and finishing. No subcontractors, no handoffs, no missed communications." },
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
              <Image src="/images/PXL_20230718_125644595.jpg" alt="Concrete driveway project completed by London Concrete Forming near Stratford, Ontario" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-[#333333] mb-4">Also Serving Stratford&apos;s Surrounding Communities</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["St. Marys", "Mitchell", "Listowel", "Seaforth", "Exeter", "Tavistock", "New Hamburg"].map((city) => (
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
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] mb-4">Get a Free Quote for Your Stratford Project</h2>
              <p className="text-slate-600 leading-relaxed mb-4">Fill out the form and we will respond within 1 business day to schedule your free on-site estimate.</p>
              <p className="text-slate-600 mb-4">Or call <a href={site.phoneHref} className="text-[#F7931E] font-semibold hover:underline">{site.phone}</a></p>
              <div className="bg-[#f8fafc] rounded-xl p-5">
                <ul className="space-y-2 text-sm text-slate-600">
                  {["Free on-site estimate within 2â€“5 business days", "Detailed written quote with itemized breakdown", "No travel fees for Stratford projects", "No obligation after the estimate"].map((i) => (
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
