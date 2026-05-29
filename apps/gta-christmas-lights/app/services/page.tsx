import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { getServices } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Services | Professional Christmas Lighting Across the GTA",
  description:
    "Christmas light installation, custom design, wreaths & garlands, tree & shrub lighting, interior decorating, commercial displays, maintenance & storage — full-service holiday lighting across the GTA.",
  openGraph: {
    title: "Our Services — Professional Christmas Lighting Across the GTA",
    description:
      "Design, install, maintain, take down, store. Full-service holiday lighting from award-winning GTA Christmas Lights.",
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
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Services", url: `${site.url}/services` },
            ])
          ),
        }}
      />

      <section className="bg-[var(--dark-bg)] py-20 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Services
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Full-Service Holiday Lighting
          </h1>
          <p className="text-white/75 text-lg leading-relaxed">
            From a single roofline to a fully transformed estate property, we
            handle design, install, maintenance, takedown, and storage. The
            only thing you provide is power.
          </p>
        </div>
      </section>

      <section className="bg-[var(--background)] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10">
            {services.map((service, i) => (
              <article
                key={service.slug}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
                    Service · 0{i + 1}
                  </p>
                  <h2
                    className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                  >
                    {service.title}
                  </h2>
                  <p className="text-[var(--muted)] leading-relaxed mb-5">
                    {service.longDescription}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="btn btn-primary"
                    >
                      Learn More
                    </Link>
                    <Link href="/contact" className="btn btn-ghost-dark">
                      Get a Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--dark-surface)] py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Every Service Includes:
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 text-left mt-8">
            {[
              "Custom on-site design visit",
              "Commercial-grade LED lights",
              "Custom-cut to fit your home",
              "Programmable dusk/dawn timer",
              "Season-long maintenance",
              "Perfect-Until-Christmas-Eve Guarantee",
              "End-of-season takedown",
              "Climate-controlled storage",
            ].map((f) => (
              <div
                key={f}
                className="flex items-center gap-3 text-sm text-white/80 bg-white/5 rounded-lg px-4 py-3 border border-[var(--border-dark)]"
              >
                <CheckCircle className="h-4 w-4 text-[var(--accent-gold)] shrink-0" />
                {f}
              </div>
            ))}
          </div>
          <Link href="/contact" className="btn btn-primary mt-10">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
