import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { ServiceIcon } from "@/components/ServiceIcon";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Services Tillsonburg ON",
  description:
    "Custom driveways, stamped patios, concrete repair, and garage floors in Tillsonburg and Oxford County. Written warranty. Free on-site estimate. Call (519) 878-6735.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Concrete Services Tillsonburg ON | Concrete Tilsonburg",
    description:
      "Custom driveways, stamped patios, concrete repair, and garage floors in Tillsonburg and Oxford County. Written warranty. Free on-site estimate.",
    url: `${site.url}/services`,
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Concrete services in Tillsonburg, ON" }],
  },
};

export default function ServicesPage() {
  const services = getServices();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="bg-charcoal text-white relative overflow-hidden">
        <Image
          src="/images/banner-3.jpg"
          alt="Concrete contractor at work in Tillsonburg, ON — Custom Concrete Tilsonburg services"
          fill
          priority
          className="object-cover opacity-20"
        />
        <div className="hero-gradient absolute inset-0" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-sm text-[var(--concrete-200)] mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Services</span>
          </nav>
          <p className="eyebrow !text-[var(--accent)] !mb-3">Tillsonburg, ON</p>
          <h1 className="h-display text-4xl sm:text-5xl mb-4 max-w-3xl">
            Concrete Services in Tillsonburg &amp; Oxford County
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-2xl leading-relaxed">
            High-strength concrete work engineered for Ontario winters — driveways, stamped patios, structural repairs, and garage floors with a written warranty on every project.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Do"
            title="Four Core Concrete Services"
            description={`${site.yearsExperience}+ years pouring high-strength concrete across Oxford County. Every service backed by a written warranty and free on-site estimate.`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.slug} className="card overflow-hidden flex flex-col sm:flex-row">
                <div className="relative sm:w-48 aspect-video sm:aspect-auto shrink-0 overflow-hidden bg-[var(--surface)]">
                  <Image
                    src={service.image}
                    alt={`${service.title} by Concrete Tilsonburg in Tillsonburg, ON`}
                    fill
                    sizes="(min-width: 640px) 192px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--charcoal)] flex items-center justify-center shrink-0">
                      <ServiceIcon name={service.icon} className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <h2 className="font-bold text-xl text-[var(--charcoal)]">{service.title}</h2>
                  </div>
                  <p className="text-[var(--concrete)] text-sm leading-relaxed mb-4 flex-1">
                    {service.shortDescription}
                  </p>
                  <ul className="space-y-1 mb-5">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <svg className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[var(--charcoal)]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${service.slug}`}
                    className="btn btn-primary self-start text-sm"
                  >
                    Get a Quote
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
