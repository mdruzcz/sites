import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Concrete Sealing Services | Driveways, Patios, Stamped & More",
  description:
    "Explore TriCity Concrete Sealing's full range of services — driveway sealing, patio sealing, stamped concrete, walkways, exposed aggregate, and commercial sealing across SW Ontario.",
};

export const revalidate = 3600;

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <section className="bg-[var(--navy)] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow justify-center">What We Do</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Concrete Sealing Services
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Premium sealing for every concrete surface — residential and commercial, across all of
            Southwestern Ontario. Backed by a {site.warrantyYears}-year written warranty.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10">
            {services.map((service, i) => (
              <div
                key={service.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  i % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg ${i % 2 === 1 ? "lg:order-last" : ""}`}>
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="eyebrow">{service.icon} Concrete Sealing</p>
                  <h2 className="h-display text-2xl sm:text-3xl text-[var(--navy)] mb-4">
                    {service.title}
                  </h2>
                  <p className="text-[var(--concrete)] leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-[var(--navy)]">
                        <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${service.slug}`} className="btn btn-primary px-6 py-3">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
