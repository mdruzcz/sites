import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us | Pressure Washing Experts in London, ON",
  description: `Learn about ${site.name} — ${site.yearsExperience}+ years of professional pressure washing experience serving London and Southwestern Ontario.`,
};

export default function AboutPage() {
  const steps = [
    { step: "1", title: "Assessment", description: "We inspect your surfaces, identify problem areas, and recommend the right cleaning approach for each material." },
    { step: "2", title: "Preparation", description: "We protect landscaping, mask sensitive areas, and pre-treat heavy stains or organic growth before cleaning." },
    { step: "3", title: "Cleaning", description: "Using the right pressure, temperature, and solution for each surface — from gentle soft wash to hot water degreasing." },
    { step: "4", title: "Inspection", description: "We walk the property with you to ensure every surface meets our standards and your expectations." },
    { step: "5", title: "Protection", description: "Optional post-clean treatments like anti-graffiti coatings, surface sealers, or scheduled maintenance plans." },
  ];

  return (
    <>
      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            About {site.name}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            {site.yearsExperience}+ years restoring homes and businesses across Southwestern Ontario
            with commercial-grade equipment and eco-friendly solutions.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="h-display text-2xl sm:text-3xl mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
              <p>
                Spotless Property Cleaning started with a simple idea: every property deserves to
                look its best. With over {site.yearsExperience} years of hands-on experience in
                exterior cleaning, we&apos;ve built a reputation across Southwestern Ontario for
                honest work, fair pricing, and results that speak for themselves.
              </p>
              <p>
                We invested in commercial-grade hot and cold water pressure washing equipment,
                soft wash systems, and eco-friendly cleaning solutions because we believe the right
                tools make all the difference. Whether it&apos;s a homeowner&apos;s vinyl siding or a
                commercial fleet of trucks, we bring the same professional standards to every job.
              </p>
              <p>
                Our team serves {site.serviceAreas.join(", ")} and surrounding communities. We&apos;re
                fully insured, WSIB compliant, and committed to protecting both your property and the
                environment. That means biodegradable cleaning agents, proper water management, and
                techniques that clean thoroughly without causing damage.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/commercial-washing.jpg"
              alt="Commercial pressure washing services by Spotless Property Cleaning"
              fill
              className="object-cover"
            />
          </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Proven 5-Step Process"
            title="How we deliver spotless results — every time."
            accentWord="spotless"
            description="A structured, transparent process designed to protect your property and deliver consistent, professional results."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((p) => (
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

      <section className="py-16 sm:py-20">
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
