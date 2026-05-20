import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Services — Driveways, Patios, Walkways, Pool Decks",
  description: `Professional concrete services in London, Ontario and across Southwestern Ontario. ${site.yearsExperience}+ years pouring driveways, stamped concrete, patios, walkways, pool decks, and garage floors.`,
};

export default function ServicesPage() {
  const services = getServices();
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="bg-charcoal text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow !text-[var(--accent)]">Our Services</p>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-4">
            Concrete Done Right
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-3xl leading-relaxed">
            Eight ways we pour concrete for Southwestern Ontario homeowners — every project gets the same engineered base, reinforced steel, and written warranty.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
