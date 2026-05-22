import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services | Retaining Wall Installation & Repair",
  description: "Professional retaining wall services in Brantford: armour stone, interlocking blocks, erosion control, drainage, commercial walls, and wall repair. Free estimates.",
};

export const revalidate = 3600;

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
          ])),
        }}
      />

      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow !text-[var(--accent)]">What We Do</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Our Retaining Wall Services
          </h1>
          <p className="text-[var(--concrete-200)] max-w-2xl mx-auto leading-relaxed">
            We don&apos;t just stack blocks — we engineer long-term solutions for soil erosion, property grading, and outdoor aesthetics using the finest materials.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Materials We Master"
            title="The Right Material for Every Project"
            subtitle="We work with the industry's leading suppliers to provide options that fit your budget and style."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: "Interlocking Concrete Blocks", desc: "Perfect for modern, clean lines and tight spaces with a wide range of colors." },
              { title: "Natural Armour Stone", desc: "Rugged, timeless limestone for large grade changes and premium aesthetics." },
              { title: "Pressure-Treated Timber", desc: "A cost-effective solution for low-height garden borders and raised beds." },
            ].map((mat) => (
              <div key={mat.title} className="card p-6 text-center">
                <h3 className="font-bold text-sm uppercase tracking-wide text-[var(--charcoal)] mb-2">{mat.title}</h3>
                <p className="text-sm text-[var(--concrete)] leading-relaxed">{mat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
