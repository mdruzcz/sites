import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Finishes",
  description: "Explore all available concrete finish options including broom, exposed aggregate, stamped, polished, and coloured concrete.",
  openGraph: { title: "Concrete Finishes", description: "Explore all available concrete finish options including broom, exposed aggregate, stamped, polished, and coloured concrete." },
};

export default function Page() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Finishes", description: "Explore all available concrete finish options including broom, exposed aggregate, stamped, polished, and coloured concrete.", url: site.url + "/concrete-finishes" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Concrete Finishes", url: site.url + "/concrete-finishes" }]),
  ];
  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <section className="bg-[#1a2332] py-20">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Concrete Finishes</h1>
          <p className="text-slate-300 text-xl mb-8">Professional concrete services serving London, Ontario and surrounding area.</p>
          <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <p className="text-slate-600 leading-relaxed text-lg mb-6">Explore all available concrete finish options including broom, exposed aggregate, stamped, polished, and coloured concrete.</p>
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
