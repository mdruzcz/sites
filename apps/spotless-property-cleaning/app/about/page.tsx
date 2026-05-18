import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us | Trusted Pressure Washing in London, ON",
  description: `Learn about ${site.name} — a professional exterior cleaning company with ${site.yearsExperience}+ years serving London, St. Thomas, Woodstock, Brantford, and Cambridge.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Image
          src="/images/hero-pressure-washing.jpg"
          alt="Spotless Property Cleaning team performing professional pressure washing in London, Ontario"
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            About {site.name}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Your local exterior cleaning experts — {site.yearsExperience}+ years restoring
            homes and businesses to spotless condition across Southwestern Ontario.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="h-display text-2xl sm:text-3xl mb-6">Who We Are</h2>
            <div className="prose prose-lg text-slate-600 space-y-4">
              <p>
                Welcome to Spotless Property Cleaning, your trusted pressure washing and
                exterior cleaning professionals in London, Ontario. We specialize in restoring
                residential and commercial properties to their original condition using
                commercial-grade equipment and eco-friendly cleaning solutions.
              </p>
              <p>
                Founded with a commitment to quality and customer satisfaction, we&apos;ve built
                our reputation one property at a time — earning the trust of homeowners, property
                managers, and business owners across London, St. Thomas, Woodstock, Brantford,
                and Cambridge. Our team brings {site.yearsExperience}+ years of hands-on
                experience in pressure washing, soft washing, and specialized cleaning services.
              </p>
              <p>
                We understand that every surface is different. That&apos;s why we don&apos;t take
                a one-size-fits-all approach. Vinyl siding needs gentle soft washing, while a
                grease-stained parking lot requires hot water and industrial degreasers. We match
                our equipment, pressure, and cleaning agents to each surface for safe, effective
                results every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Values"
            title="What Drives Us"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Surface-Safe Cleaning",
                description: "We match our pressure, temperature, and detergents to each surface type — no damage, no shortcuts.",
              },
              {
                title: "Eco-Friendly Solutions",
                description: "All our cleaning agents are biodegradable and safe for your landscaping, pets, and the environment.",
              },
              {
                title: "Transparent Pricing",
                description: "Free on-site estimates with no hidden fees. You know exactly what you're paying before we start.",
              },
              {
                title: "Satisfaction Guaranteed",
                description: "We don't consider a job done until you're 100% happy with the results. We stand behind every clean.",
              },
              {
                title: "Fully Insured",
                description: "Full commercial liability insurance and WSIB compliance protect you and your property on every job.",
              },
              {
                title: "Local Knowledge",
                description: "We know Southwestern Ontario's climate challenges — mould season, salt damage, and UV exposure — and how to address them.",
              },
            ].map((value) => (
              <div key={value.title} className="card p-6">
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How It Works"
            title="Our Proven 5-Step Process"
            description="Designed for consistent, professional results on every job — residential or commercial."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {site.process.map((p) => (
              <div key={p.step} className="card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {p.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-slate-600 text-sm">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Coverage"
            title="Service Areas"
            description="We proudly serve communities across Southwestern Ontario."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {site.serviceAreas.map((area) => (
              <div key={area} className="card p-4 text-center">
                <p className="font-semibold text-slate-900">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
