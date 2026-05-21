import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Services — Music-Synced LED, RGB Architectural, Holiday Lighting",
  description: `${site.name} designs and installs experiential lighting, architectural accenting, RGB pixel installations, immersive light displays, and permanent holiday lighting with IP67/IP68 hardware across Ontario.`,
  alternates: { canonical: `${site.url}/services` },
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <section className="bg-midnight-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">Our Services</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Five disciplines.<br /><span className="gradient-text">One signature look.</span>
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            Every install we ship runs on professional-grade addressable LED hardware — the same fixtures used on parade-stage rigs, music festival shows, and major-brand activations. Built outdoor-rated, sequenced in studio, and engineered for Ontario.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Browse the Lineup"
            title="From a single accent line to a full parade."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
