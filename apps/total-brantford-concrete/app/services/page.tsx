import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Services | Driveways, Patios & Repairs in Brantford",
  description: "Expert concrete services in Brantford, ON — driveways, patios, walkways, stamped concrete, sealing, and repair. Get a free estimate from Total Brantford Concrete.",
  openGraph: {
    title: "Concrete Services in Brantford | Total Brantford Concrete",
    description: "From decorative stamped patios to heavy-duty driveways, Total Brantford Concrete delivers precision, durability, and style.",
    url: `${site.url}/services`,
  },
};

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

      <section className="bg-[var(--charcoal)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="eyebrow">What We Do</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl max-w-3xl">
            Expert Concrete Services for <span className="text-[var(--accent)]">Every Project</span>
          </h1>
          <p className="text-[var(--concrete-200)] text-lg mt-4 max-w-2xl normal-case font-normal">
            From decorative stamped patios to heavy-duty driveways, Total Brantford Concrete delivers precision, durability, and style.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="All Services" title="Our Concrete Services" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
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
