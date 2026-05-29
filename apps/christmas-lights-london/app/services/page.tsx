import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Christmas Lighting Services — Residential, Commercial & More",
  description:
    "Full-service Christmas lighting: residential installation, commercial displays, custom design, wreaths, garland, takedown & storage. Serving London, ON and Southwestern Ontario.",
  openGraph: {
    title: "Christmas Lighting Services | Christmas Lights London",
    description: "Residential, commercial, custom design, wreaths, garland, takedown & storage. Professional Christmas light installation across Southwestern Ontario.",
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
            serviceSchema(
              "Professional Christmas Light Installation",
              "Full-service Christmas light installation including residential, commercial, custom design, wreaths, garland, and takedown & storage across Southwestern Ontario.",
            )
          ),
        }}
      />
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

      {/* Hero */}
      <section className="relative bg-[var(--dark-bg)] py-24 md:py-28 overflow-hidden">
        <Image
          src="/images/IMG_8724-scaled-1.jpg"
          alt="Professional Christmas light installation services in London Ontario"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/60 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            What We Offer
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Full-Service Holiday Lighting
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            From installation to takedown, we handle every aspect of your Christmas lighting.
            Residential homes, commercial properties, custom designs — we do it all.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, i) => (
              <div
                key={service.slug}
                className={`grid gap-10 lg:grid-cols-2 items-center max-w-5xl mx-auto ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
                  style={{ direction: "ltr" }}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div style={{ direction: "ltr" }}>
                  <h2
                    className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-4"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                  >
                    {service.title}
                  </h2>
                  <p className="text-[var(--muted)] text-base leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {[
                      "Professional-grade LED lights",
                      "Custom fit to your property",
                      "Fully insured team",
                    ].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                        <CheckCircle className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn btn-primary min-h-[48px] px-8">
                    Get a Free Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Row */}
      <section className="bg-[var(--dark-bg)] py-4">
        <div className="grid grid-cols-3">
          {[
            { src: "/images/WhatsApp-Image-2025-10-19-at-6.06.07-AM-7.jpeg", alt: "Christmas Lights London team on aerial lift installing roofline lights" },
            { src: "/images/6881674796838220017.jpg", alt: "Professional Christmas light display on home in Southwestern Ontario" },
            { src: "/images/WhatsApp-Image-2025-10-19-at-6.09.04-AM-7.jpeg", alt: "Custom Christmas lighting installation in London Ontario by professionals" },
          ].map((img, i) => (
            <div key={i} className="relative aspect-video overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Not Sure Which Service You Need?
          </h2>
          <p className="text-[var(--muted)] text-lg mb-8 leading-relaxed">
            Contact us and we&apos;ll help you put together the perfect holiday lighting package for
            your home or business. Free consultations, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary min-h-[48px] px-8">
              Get a Free Quote
            </Link>
            <a
              href={site.phoneHref}
              className="btn btn-ghost-dark min-h-[48px] px-8 flex items-center gap-2 justify-center"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
