import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Contractor in Port Stanley, ON — Driveways & Patios",
  description: "Expert concrete contractor serving Port Stanley, Ontario. Driveways, patios, stamped concrete & more for cottage country and lakeside homes. Free quotes — 519-914-1901.",
  openGraph: {
    title: "Concrete Contractor in Port Stanley, ON",
    description: "Professional concrete services in Port Stanley and Elgin County. Driveways, patios & stamped concrete for Lake Erie cottages and homes.",
  },
};

const services = [
  { name: "Concrete Driveways", href: "/concrete-driveways", desc: "New driveway installation, replacement, and widening. Standard and stamped options available.", icon: "🚗" },
  { name: "Concrete Patios", href: "/concrete-patios", desc: "Custom patio slabs — plain, exposed aggregate, stamped, or coloured to match your home.", icon: "☀️" },
  { name: "Retaining Walls", href: "/concrete-retaining-walls", desc: "Poured concrete retaining walls for erosion control, terracing, and usable yard space.", icon: "🧱" },
  { name: "Stamped Concrete", href: "/stamped-concrete-driveway", desc: "Cobblestone, slate, brick, and 50+ more patterns for driveways and patios.", icon: "🎨" },
  { name: "Concrete Removal", href: "/concrete-removal-services", desc: "Old concrete broken out, hauled away, and site left clean and ready for the new pour.", icon: "🔨" },
  { name: "Shed & Equipment Pads", href: "/concrete-shed-pad-installer", desc: "Properly graded and reinforced pads for sheds, garages, hot tubs, and equipment.", icon: "🏗️" },
];

const faqItems = [
  { question: "Do you serve Port Stanley, Ontario?", answer: "Yes — Port Stanley and surrounding Elgin County beach communities are within our regular service area. We have completed many projects for both full-time residents and seasonal cottage owners in the area." },
  { question: "Can you work on cottage or seasonal properties in Port Stanley?", answer: "Absolutely. We are experienced with seasonal property scheduling and understand the unique considerations of lakeside properties — including drainage, sandy soils, and seasonal access." },
  { question: "What is the best concrete for a Lake Erie cottage driveway?", answer: "For cottage and lakeside driveways, we recommend standard broom finish concrete at 5 inches thick with rebar reinforcement, designed for vehicle traffic and Ontario freeze-thaw conditions. Exposed aggregate is also popular for the natural stone look it provides." },
  { question: "How far is Port Stanley from London?", answer: "Port Stanley is approximately 40 minutes south of London on Lake Erie. We travel there regularly and do not charge additional travel fees for most projects in the community." },
];

export default function PortStanleyPage() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Contractor in Port Stanley, ON", description: "Professional concrete services in Port Stanley, Ontario — driveways, patios, retaining walls, and more.", url: site.url + "/port-stanley-concrete-contractor", city: "Port Stanley" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Service Areas", url: site.url + "/service-areas" }, { name: "Port Stanley", url: site.url + "/port-stanley-concrete-contractor" }]),
    faqSchema(faqItems),
  ];

  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}

      {/* Hero */}
      <section className="bg-[#333333] relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image src="https://londonconcreteforming.ca/wp-content/uploads/2025/02/drive.jpg" alt="Concrete driveway and patio installation in Port Stanley, Ontario" fill className="object-cover opacity-25" priority unoptimized />
        </div>
        <div className="relative container-custom max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Port Stanley, Ontario</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Your Concrete Contractor in Port Stanley, ON</h1>
          <p className="text-slate-300 text-xl mb-8">Driveways, patios &amp; stamped concrete for Lake Erie cottages and homes — expert installation from London Concrete Forming.</p>
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
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Concrete Services in Port Stanley</h2>
            <p className="text-slate-600 max-w-xl mx-auto">From new driveways to stunning stamped patios for your Lake Erie cottage or home.</p>
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
              <h2 className="text-3xl font-extrabold text-[#333333] mb-5">Concrete That Handles Lake Erie Conditions</h2>
              <p className="text-slate-600 leading-relaxed mb-5">Port Stanley&apos;s proximity to Lake Erie means concrete needs to stand up to higher moisture exposure, lake-effect weather, and sandy or variable soil conditions. We design every project to handle these local factors.</p>
              <div className="space-y-4">
                {[
                  { title: "High-Strength Concrete Mix", desc: "We use minimum 32 MPa concrete to withstand Ontario freeze-thaw cycles and the moisture-heavy environment of Lake Erie shoreline communities." },
                  { title: "Proper Drainage Design", desc: "Every slab is formed with the correct slope and drainage to prevent water pooling — critical in higher-moisture environments." },
                  { title: "Seasonal Scheduling", desc: "We work around seasonal access and can schedule your project for your spring visit or fall close-up to fit your cottage schedule." },
                  { title: "No Travel Fees", desc: "Port Stanley is within our standard service radius from London. Your quote reflects the actual project cost only." },
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
              <Image src="https://londonconcreteforming.ca/wp-content/uploads/2025/02/drive.jpg" alt="Concrete patio installed at a Port Stanley Lake Erie cottage by London Concrete Forming" fill className="object-cover" unoptimized />
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
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] mb-4">Get a Free Quote for Your Port Stanley Project</h2>
              <p className="text-slate-600 leading-relaxed mb-4">Fill out the form and we will respond within 1 business day to schedule your free estimate.</p>
              <p className="text-slate-600 mb-4">Or call <a href={site.phoneHref} className="text-[#F7931E] font-semibold hover:underline">{site.phone}</a></p>
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <ul className="space-y-2 text-sm text-slate-600">
                  {["Free on-site estimate — no charge", "Seasonal cottage scheduling available", "No travel fees for Port Stanley", "No obligation after your estimate"].map((i) => (
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
