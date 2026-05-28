import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Contractor in Woodstock, ON",
  description: "Top-rated concrete contractor serving Woodstock, Ontario. Driveways, patios, stamped concrete & more. 20+ years experience. Free quotes — 519-914-1901.",
  openGraph: { title: "Concrete Contractor in Woodstock, ON", description: "Expert concrete services in Woodstock, Ontario. Driveways, patios, retaining walls & stamped concrete." },
};

const faqItems = [
  { question: "Do you serve Woodstock, Ontario?", answer: "Yes! London Concrete Forming regularly serves Woodstock and the surrounding area. We handle all residential concrete projects including driveways, patios, retaining walls, and shed pads." },
  { question: "How far is Woodstock from your London base?", answer: "We travel throughout Southwestern Ontario to serve our customers. Woodstock is within our regular service area and we do not charge additional travel fees for most projects in the region." },
  { question: "What concrete services do you offer in Woodstock?", answer: "We provide the full range of concrete services in Woodstock: driveway installation, patio construction, retaining walls, concrete removal, shed pads, and stamped concrete." },
];

export default function CityPage() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Contractor in Woodstock, ON", description: "Professional concrete services in Woodstock, Ontario.", url: site.url + "/woodstock-concrete-contractor", city: "Woodstock" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Service Areas", url: site.url + "/service-areas" }, { name: "Woodstock", url: site.url + "/woodstock-concrete-contractor" }]),
    faqSchema(faqItems),
  ];
  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <section className="bg-[#1a2332] py-20">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Woodstock, Ontario</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Concrete Contractor in Woodstock, ON</h1>
          <p className="text-slate-300 text-xl mb-8">Top-Rated Driveway &amp; Stamped Concrete Services</p>
          <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-[#1a2332] mb-5">Expert Concrete Services in Woodstock</h2>
              <p className="text-slate-600 leading-relaxed mb-4">London Concrete Forming proudly serves Woodstock and the surrounding area with professional concrete installation services. Our experienced team brings the same high standards of quality and craftsmanship to every project in Woodstock as we do in London.</p>
              <p className="text-slate-600 leading-relaxed mb-4">Whether you need a new concrete driveway, a stamped patio, a retaining wall, or a shed pad, we have the skills and equipment to get the job done right. We serve Woodstock regularly and understand the local soil conditions and requirements.</p>
              <p className="text-slate-600 leading-relaxed mb-6">Nearby communities we also serve: Ingersoll, Tillsonburg, Brantford, Paris, Norwich.</p>
              <h3 className="font-bold text-[#1a2332] text-xl mb-4">Our Concrete Services in Woodstock</h3>
              <ul className="space-y-2 mb-8">
                <li><Link href="/concrete-driveways" className="text-[#F7931E] hover:underline font-medium">Concrete Driveway Installation</Link></li>
                <li><Link href="/concrete-patios" className="text-[#F7931E] hover:underline font-medium">Concrete Patio Construction</Link></li>
                <li><Link href="/concrete-retaining-walls" className="text-[#F7931E] hover:underline font-medium">Concrete Retaining Walls</Link></li>
                <li><Link href="/stamped-concrete-driveway" className="text-[#F7931E] hover:underline font-medium">Stamped Concrete Driveways</Link></li>
                <li><Link href="/concrete-removal-services" className="text-[#F7931E] hover:underline font-medium">Concrete Removal</Link></li>
              </ul>
            </div>
            <div className="bg-[#f8fafc] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#1a2332] mb-4">Get a Free Quote for Your Woodstock Project</h3>
              <QuoteForm compact />
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-10"><h2 className="text-3xl font-extrabold text-[#1a2332] mb-3">Frequently Asked Questions</h2></div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>
    </>
  );
}
