import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Driveways in Woodstock, ON",
  description: "Professional concrete driveway installation in Woodstock, Ontario. Natural, stamped & coloured options. 0–6/sq.ft. Free quotes — 519-914-1901.",
  openGraph: { title: "Concrete Driveways in Woodstock, ON", description: "Expert concrete driveway installation in Woodstock, Ontario." },
};

export default function Page() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Driveways in Woodstock, ON", description: "Professional concrete driveway installation in Woodstock, Ontario.", url: site.url + "/concrete-driveways-woodstock", city: "Woodstock" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Concrete Driveways in Woodstock", url: site.url + "/concrete-driveways-woodstock" }]),
  ];
  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <section className="bg-[#333333] py-20">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Woodstock, Ontario</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Concrete Driveways in Woodstock, ON</h1>
          <p className="text-slate-300 text-xl mb-8">Professional Driveway Installation &amp; Replacement</p>
          <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] mb-5">Expert Concrete Driveway Installation in Woodstock</h2>
              <p className="text-slate-600 leading-relaxed mb-4">London Concrete Forming installs high-quality concrete driveways in Woodstock, Ontario. We specialize in residential driveway installation and replacement, offering natural concrete, stamped patterns, and coloured finishes.</p>
              <p className="text-slate-600 leading-relaxed mb-4">Our typical driveway installation cost in Woodstock ranges from 0–6 per square foot for standard finishes. Stamped and decorative options are also available. We provide free, detailed quotes with no hidden fees.</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#f8fafc] rounded-xl p-4 text-center"><p className="font-bold text-[#F7931E] text-xl">0–6</p><p className="text-slate-600 text-xs mt-1">Per sq.ft.</p></div>
                <div className="bg-[#f8fafc] rounded-xl p-4 text-center"><p className="font-bold text-[#F7931E] text-xl">20+</p><p className="text-slate-600 text-xs mt-1">Years experience</p></div>
              </div>
              <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Woodstock Quote</Link>
            </div>
            <div className="bg-[#f8fafc] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#333333] mb-4">Get Your Free Driveway Quote</h3>
              <QuoteForm compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
