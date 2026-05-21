import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us | Brantford's Trusted Concrete Contractor",
  description: "Learn about Total Brantford Concrete — a locally owned concrete company delivering expert driveways, patios, and repairs across Brantford and Brant County with honest pricing and written warranties.",
  openGraph: {
    title: "About Total Brantford Concrete | Brantford's Trusted Concrete Contractor",
    description: "Locally owned, locally expert. We combine technical expertise with personal care to deliver concrete solutions built for Ontario winters.",
    url: `${site.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "About", url: `${site.url}/about` },
          ])),
        }}
      />

      {/* Hero */}
      <section className="bg-[var(--charcoal)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="eyebrow">About Us</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl max-w-3xl">
            Building Brantford&apos;s Future,{" "}
            <span className="text-[var(--accent)]">One Pour at a Time</span>
          </h1>
          <p className="text-[var(--concrete-200)] text-lg mt-4 max-w-2xl normal-case font-normal">
            We are a locally owned and operated concrete company dedicated to superior craftsmanship, honest pricing, and durable results.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                eyebrow="More Than Just Contractors"
                title="We're Your Neighbours"
              />
              <div className="space-y-4 text-[var(--concrete)] leading-relaxed">
                <p>
                  At Total Brantford Concrete, we believe that a driveway or patio is more than just a hard surface — it&apos;s the foundation of your home&apos;s curb appeal and functionality. Founded right here in Brantford, we saw a need for a concrete service that combines the technical expertise of large commercial firms with the personal care of a local neighbour.
                </p>
                <p>
                  Living and working in Brant County, we understand the specific challenges our climate poses. From freezing winters to humid summers, our concrete mixes and installation techniques are specifically tailored to withstand Ontario&apos;s freeze-thaw cycles, ensuring your investment lasts for decades, not just seasons.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="btn btn-primary">Get a Free Estimate</Link>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
              <Image
                src="/images/Concrete-Driveways-scaled.png"
                alt="Total Brantford Concrete team completing a driveway project in Brantford, ON"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Commitment to Quality */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Commitment"
            title="We Don't Cut Corners"
            subtitle="Whether it's a simple walkway repair or a massive stamped concrete driveway, we apply the same rigorous standards to every project."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {[
              { title: "Integrity First", desc: "We provide clear, written estimates. No hidden fees, no surprise upcharges." },
              { title: "Material Excellence", desc: "We use only high-PSI concrete mixes and premium sealers, reinforced with proper rebar or wire mesh." },
              { title: "Clean Job Sites", desc: "We treat your property with respect. When we leave, the only thing we leave behind is beautiful concrete." },
              { title: "Timely Completion", desc: "We know construction can be disruptive. We stick to our schedules and communicate every step of the way." },
            ].map((item) => (
              <div key={item.title} className="card p-6 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wide text-[var(--charcoal)] mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--concrete)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What Sets Us Apart"
            title="Concrete Is All We Do"
            subtitle="While many general contractors offer concrete as a side service, our team is trained in the latest finishing techniques."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { title: "Decorative Stamping", desc: "Replicating the look of slate, flagstone, and timber.", image: "/images/Stamped-Decorative-Concrete-1-scaled.png" },
              { title: "Exposed Aggregate", desc: "Durable, non-slip surfaces perfect for Canadian winters.", image: "/images/Patios-Walkways-scaled.png" },
              { title: "Broom & Smooth Finishes", desc: "Classic, clean looks for utility and modern aesthetics.", image: "/images/Concrete-Driveways-scaled.png" },
              { title: "Restoration", desc: "Expertly diagnosing and fixing cracks, spalling, and heaving.", image: "/images/Concrete-Repair-Resurfacing-scaled.png" },
            ].map((item) => (
              <div key={item.title} className="card overflow-hidden">
                <div className="relative h-36 overflow-hidden">
                  <Image src={item.image} alt={`${item.title} by Total Brantford Concrete`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xs uppercase tracking-wide text-[var(--charcoal)] mb-1.5">{item.title}</h3>
                  <p className="text-xs text-[var(--concrete)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteForm />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
