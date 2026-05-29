import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Contractor in Woodstock, ON â€” Driveways & Patios",
  description: "Top-rated concrete contractor serving Woodstock, Ontario. Driveways, patios, stamped concrete, retaining walls & more. 20+ years experience. Free quotes â€” 519-914-1901.",
  openGraph: {
    title: "Concrete Contractor in Woodstock, ON",
    description: "Expert concrete services in Woodstock, Ontario. Driveways, patios, retaining walls & stamped concrete from London Concrete Forming.",
    images: [{ url: "/images/Long-Concrete-Driveway.jpg", alt: "Concrete contractor services in Woodstock, Ontario" }],
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
  { question: "Do you serve Woodstock, Ontario?", answer: "Yes â€” London Concrete Forming regularly serves Woodstock and the surrounding Oxford County area. We do not charge additional travel fees for projects in Woodstock." },
  { question: "What concrete services do you offer in Woodstock?", answer: "We provide the full range: driveway installation, patio construction, retaining walls, concrete removal, shed pads, and stamped concrete. All the same services we offer in London." },
  { question: "How far is Woodstock from your London base?", answer: "Woodstock is approximately 45 minutes from London. We travel throughout Southwestern Ontario and serve Woodstock regularly as part of our Oxford County service area." },
  { question: "How quickly can you provide a quote in Woodstock?", answer: "We aim to schedule free on-site estimates within 2â€“5 business days in Woodstock. Call 519-914-1901 or fill out the form and we will be in touch quickly." },
];

export default function WoodstockPage() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Contractor in Woodstock, ON", description: "Professional concrete services in Woodstock, Ontario â€” driveways, patios, retaining walls, and more.", url: site.url + "/woodstock-concrete-contractor", city: "Woodstock" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Service Areas", url: site.url + "/service-areas" }, { name: "Woodstock", url: site.url + "/woodstock-concrete-contractor" }]),
    faqSchema(faqItems),
  ];

  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}

      {/* Hero */}
      <section className="bg-[#333333] relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image src="/images/Long-Concrete-Driveway.jpg" alt="Concrete contractor working on a driveway in Woodstock, Ontario" fill className="object-cover opacity-25" priority />
        </div>
        <div className="relative container-custom max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Woodstock, Ontario</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Your Concrete Contractor in Woodstock, ON</h1>
          <p className="text-slate-300 text-xl mb-8">Driveways, patios, retaining walls &amp; stamped concrete â€” 20+ years of experience serving Woodstock and Oxford County.</p>
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

      {/* Services Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Concrete Services in Woodstock</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Everything from new driveway installation to stamped concrete patios â€” fully serviced in Woodstock, ON.</p>
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
              <h2 className="text-3xl font-extrabold text-[#333333] mb-5">Why Woodstock Homeowners Choose London Concrete Forming</h2>
              <div className="space-y-4">
                {[
                  { title: "20+ Years of Experience", desc: "Our team has been pouring concrete across Southwestern Ontario since 2004. We understand Oxford County soil conditions, drainage requirements, and freeze-thaw patterns." },
                  { title: "No Travel Fees", desc: "Woodstock is within our regular service area. You get the same transparent pricing as our London customers." },
                  { title: "Detailed Written Quotes", desc: "Every estimate includes a full breakdown of materials, labour, and timeline. No hidden costs, no surprises on invoice day." },
                  { title: "We Show Up When We Say", desc: "Reliable scheduling and clear communication. We give you a project start date and stick to it." },
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
              <Image src="/images/Long-Concrete-Driveway.jpg" alt="London Concrete Forming team completing a concrete project near Woodstock, Ontario" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-[#333333] mb-4">Also Serving Woodstock&apos;s Surrounding Communities</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Ingersoll", "Tillsonburg", "Norwich", "Tavistock", "Thamesford", "Embro", "Sweaburg"].map((city) => (
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
              <h2 className="text-3xl font-extrabold text-[#333333] mb-4">Get a Free Quote for Your Woodstock Project</h2>
              <p className="text-slate-600 leading-relaxed mb-4">Fill out the form and we will get back to you within 1 business day to schedule your free on-site estimate.</p>
              <p className="text-slate-600 mb-4">Or call us directly at <a href={site.phoneHref} className="text-[#F7931E] font-semibold hover:underline">{site.phone}</a></p>
              <div className="bg-[#f8fafc] rounded-xl p-5">
                <p className="font-semibold text-[#333333] mb-2">What to expect:</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  {["Free on-site estimate within 2â€“5 business days", "Detailed written quote with itemized breakdown", "No travel fees for Woodstock projects", "No obligation to book after the estimate"].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#F7931E] flex-shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
