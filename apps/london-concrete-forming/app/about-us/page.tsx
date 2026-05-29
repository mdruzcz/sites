import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about London Concrete Forming — London, Ontario's trusted concrete contractor with 20+ years of experience in driveways, patios, and retaining walls.",
  openGraph: {
    title: "About Us",
    description: "Over 20 years of experience helping London homeowners with quality concrete driveways, patios, and more.",
  },
};

export default function AboutPage() {
  const jsonLd = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "About Us", url: `${site.url}/about-us` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero */}
      <section className="bg-[#333333] py-16 md:py-24">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">About LCF</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5">Who We Are</h1>
          <p className="text-slate-300 text-lg">London Concrete Forming is a locally owned concrete contractor serving London, Ontario and surrounding communities with over 20 years of experience.</p>
        </div>
      </section>

      {/* Main content */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] mb-5">Our Customer-Centric Approach</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                At London Concrete Forming, we believe that every homeowner deserves a contractor who listens, communicates, and delivers on their promises. That is why we have built our business around a customer-first philosophy that puts your needs at the centre of everything we do.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                From your initial consultation to the final walkthrough, we keep you informed every step of the way. We explain the process, answer your questions, and make sure you are completely satisfied before we consider a project complete.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Our team of experienced concrete contractors takes pride in every project, whether it is a simple driveway replacement or a complex stamped concrete installation. We treat every property as if it were our own.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
                <a href={site.phoneHref} className="btn btn-outline text-base">Call {site.phone}</a>
              </div>
            </div>
            <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="/images/PXL_20230718_125644595.jpg"
                alt="London Concrete Forming team completing a concrete project in London, Ontario"
                fill
                className="object-cover"
               
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quality section */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#333333] mb-5 text-center">Quality You Can Count On</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="font-bold text-[#333333] text-lg mb-3">Experienced Team</h3>
              <p className="text-slate-600 leading-relaxed">Our contractors bring over 20 years of combined experience to every project. We have seen every type of soil condition, drainage challenge, and design requirement that Southwestern Ontario can throw at us.</p>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-[#333333] text-lg mb-3">Quality Materials</h3>
              <p className="text-slate-600 leading-relaxed">We use premium concrete mixes and proper reinforcement on every project. Our concrete is designed to withstand Ontario freeze-thaw cycles and provide decades of trouble-free service.</p>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-[#333333] text-lg mb-3">Fair Pricing</h3>
              <p className="text-slate-600 leading-relaxed">We provide transparent, detailed quotes with no hidden fees. Our standard driveway installation ranges from $10–$16 per square foot, all-inclusive. What we quote is what you pay.</p>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-[#333333] text-lg mb-3">Local & Trusted</h3>
              <p className="text-slate-600 leading-relaxed">We are a London-based company serving our own community. We have built our reputation on word-of-mouth referrals and consistently 5-star reviews from satisfied customers across the region.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="section bg-white">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Ready to Get Started?</h2>
            <p className="text-slate-600">Fill out our quote form and we will be in touch within {site.responseTime}.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
