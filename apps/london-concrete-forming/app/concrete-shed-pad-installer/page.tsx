import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Professional Concrete Shed Pad Installer | London Concrete Forming",
  description: "Professional concrete shed pad installation in London, Ontario. Garage pads, hot tub pads, and more. ,800–,600.",
  openGraph: { title: "Expert Concrete Shed Pad Installation | London Concrete Forming", description: "Professional concrete shed pad installation in London, Ontario. Garage pads, hot tub pads, and more. ,800–,600." },
};

export default function Page() {
  const jsonLd = [
    serviceSchema({ name: "Expert Concrete Shed Pad Installation", description: "Professional concrete shed pad installation in London, Ontario. Garage pads, hot tub pads, and more. ,800–,600.", url: site.url + "/concrete-shed-pad-installer" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Expert Concrete Shed Pad Installation", url: site.url + "/concrete-shed-pad-installer" }]),
  ];
  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <section className="bg-[#1a2332] py-20">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Expert Concrete Shed Pad Installation</h1>
          <p className="text-slate-300 text-xl mb-8">Professional concrete services serving London, Ontario and surrounding area.</p>
          <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <p className="text-slate-600 leading-relaxed text-lg mb-6">Professional concrete shed pad installation in London, Ontario. Garage pads, hot tub pads, and more. ,800–,600.</p>
          <p className="text-slate-600 leading-relaxed mb-6">At London Concrete Forming, we bring over 20 years of experience to every project. Our team is committed to quality workmanship, transparent pricing, and customer satisfaction on every job we complete.</p>
          <p className="text-slate-600 leading-relaxed mb-8">We serve London, St. Thomas, Woodstock, Stratford, Sarnia, Chatham, Port Stanley, and surrounding communities. Contact us today for a free, no-obligation quote.</p>
          <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
        </div>
      </section>
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-8"><h2 className="text-3xl font-extrabold text-[#1a2332] mb-3">Request a Free Quote</h2></div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"><QuoteForm /></div>
        </div>
      </section>
    </>
  );
}
