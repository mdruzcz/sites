import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Christmas Lighting Services | Classic Christmas Lighting — Kitchener-Waterloo",
  description:
    "Explore our full range of Christmas lighting services including residential installation, commercial lighting, tree lighting, light rental, and decoration services across Southern Ontario.",
  openGraph: {
    title: "Christmas Lighting Services — Classic Christmas Lighting",
    description: "Full-service holiday lighting for homes, businesses, and communities in Kitchener-Waterloo and Southern Ontario.",
    images: [{ url: "/images/Classic-Christmas-Lighting.webp", alt: "Classic Christmas Lighting services — professional holiday lighting" }],
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

      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-[var(--dark-bg)] overflow-hidden">
        <Image
          src="/images/new-pic-2.png"
          alt="Classic Christmas Lighting services — professional holiday lighting in Southern Ontario"
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/60 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Services</span>
          </nav>
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase mb-4 font-medium">Professional Christmas Services</p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-[1.1] max-w-3xl"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Everything You Need for a Magical Holiday Season
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">
            From roofline lighting to tree wrapping, wreaths to commercial displays — we handle every detail so you can enjoy the holidays.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.slug} className="card overflow-hidden group flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h2
                    className="absolute bottom-4 left-4 right-4 text-white font-bold text-xl leading-tight"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                  >
                    {service.title}
                  </h2>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-5 flex-1">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="btn btn-ghost-dark self-start min-h-[44px]"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-[var(--dark-bg)] py-20 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Every Service Includes
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            The Classic Christmas Lighting Guarantee
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              "Commercial-grade, energy-efficient LED lights",
              "Free custom design consultation",
              "Professional installation by trained crew",
              "Season-long maintenance &amp; support",
              "Hassle-free post-season takedown",
              "Fully insured — zero risk to your property",
              "No travel charges within service area",
              "Satisfaction guarantee on every project",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[var(--accent-gold)] shrink-0" />
                <span className="text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/contact" className="btn btn-primary min-h-[52px] px-10 text-base">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--background)] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-3xl font-bold text-[var(--foreground)] mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Not Sure Which Service You Need?
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-xl mx-auto">
            Give us a call and we&apos;ll help you figure out the perfect package for your property and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary min-h-[48px] px-8">
              Request a Free Quote
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost-dark min-h-[48px] px-8 flex items-center gap-2 justify-center">
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
