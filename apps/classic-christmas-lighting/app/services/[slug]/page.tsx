import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Phone } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { getServices, getServiceBySlug } from "@/lib/content";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Classic Christmas Lighting — Kitchener-Waterloo`,
    description: `${service.shortDescription} Serving Kitchener-Waterloo, Guelph, Cambridge, Hamilton & Southern Ontario. Get a free quote from Classic Christmas Lighting.`,
    openGraph: {
      title: `${service.title} — Classic Christmas Lighting`,
      description: service.shortDescription,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
  };
}

const serviceDetails: Record<string, { benefits: string[]; process: string[] }> = {
  "christmas-lighting-installation": {
    benefits: [
      "Commercial-grade LED lights that are 3x brighter than DIY strands",
      "Custom design consultation included — no extra cost",
      "Precise installation that perfectly complements your architecture",
      "Fully insured team — no risk to your property",
      "Season-long maintenance support at no extra charge",
      "Careful post-season takedown and removal",
    ],
    process: [
      "Contact us for a free quote — we assess your property virtually or in-person",
      "We design a custom lighting plan tailored to your style and property",
      "Our crew arrives on your scheduled date and handles the full installation",
      "We check every light, set your timer, and leave everything perfect",
      "We stay on-call throughout the season for any maintenance",
      "After the holidays, we return to remove everything neatly",
    ],
  },
  "christmas-lighting-for-homes": {
    benefits: [
      "Make your home the most stunning on your street",
      "Custom colour choices — warm white, multi-colour, or themed",
      "Roofline, gutters, windows, doors, and trees all covered",
      "Energy-efficient LEDs keep electricity costs low",
      "No ladders, no risk — our team handles everything safely",
      "Organized takedown and storage so your lights last for years",
    ],
    process: [
      "You describe your vision — colours, coverage areas, style",
      "We review your property and create a custom design",
      "Our team arrives and professionally installs every strand",
      "We verify every light works, set the timer, and do a final walkthrough",
      "On-call maintenance throughout the full holiday season",
      "January takedown — we remove everything and leave zero trace",
    ],
  },
  "christmas-lighting-for-businesses": {
    benefits: [
      "Draw holiday foot traffic and increase customer visibility",
      "Designs that complement your brand colours and style",
      "Installation scheduled around your business hours",
      "Handles storefronts, buildings, parking lots, and more",
      "Commercial-grade lights built for 24/7 outdoor use",
      "BIA and multi-location pricing available",
    ],
    process: [
      "We assess your commercial property and discuss your brand vision",
      "Custom commercial lighting design is created for your approval",
      "Installation is scheduled to minimize business disruption",
      "Full quality check and timer setup before we leave",
      "On-call support throughout the entire holiday season",
      "Post-season takedown on a schedule that works for your business",
    ],
  },
  "tree-lighting-services": {
    benefits: [
      "Beautiful 360° coverage that wraps every branch",
      "Works for indoor and outdoor trees of any size",
      "Warm white, cool white, or multicolour options",
      "Commercial-grade lights designed for outdoor weather",
      "Paired perfectly with roofline lights for a cohesive display",
      "Safe installation with no damage to bark or branches",
    ],
    process: [
      "We assess your trees and recommend the best lighting approach",
      "You choose your colour and style preferences",
      "Our crew carefully wraps every branch for maximum impact",
      "Full quality check to ensure every light is secure and shining",
      "On-call maintenance if any lights need adjustment",
      "Careful removal in January that leaves branches undamaged",
    ],
  },
  "christmas-light-rental": {
    benefits: [
      "Perfect for BIAs, municipalities, and community organizations",
      "Full installation and takedown included in rental",
      "Commercial-grade lights designed for high-traffic public spaces",
      "Customizable displays for any public space or event",
      "Multi-season rental options available for recurring events",
      "Seasonal maintenance and emergency support included",
    ],
    process: [
      "Contact us to discuss your space, timeline, and budget",
      "We design a display tailored to your public space or event",
      "Lights are delivered, installed, and fully tested on time",
      "We maintain the display throughout the season",
      "Takedown and pickup at the end of the rental period",
      "Optional multi-year contracts available for recurring events",
    ],
  },
  "christmas-decoration-services": {
    benefits: [
      "Lush, full wreaths with berries, pinecones, and custom accents",
      "Professionally draped garlands for banisters, doors, and railings",
      "Professionally secured to prevent wind damage",
      "Complements your lighting display perfectly",
      "Sourced from quality suppliers — not the thin grocery store versions",
      "Careful removal with no damage to your home",
    ],
    process: [
      "We discuss your decoration preferences — style, colours, placement",
      "We source high-quality wreaths, garlands, and accent pieces",
      "Professional installation with weather-resistant mounting",
      "Coordination with your lighting installation for a cohesive look",
      "Adjustment service if anything shifts during the season",
      "Full removal and cleanup after the holiday season",
    ],
  },
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const details = serviceDetails[slug] || {
    benefits: [
      "Professional-grade equipment and materials",
      "Experienced, fully insured crew",
      "Custom design tailored to your property",
      "Season-long maintenance included",
      "Hassle-free takedown and cleanup",
      "Free consultation and quote",
    ],
    process: [
      "Contact us for a free consultation",
      "We design a custom plan for your property",
      "Professional installation on your scheduled date",
      "Quality check and timer setup",
      "On-call maintenance throughout the season",
      "Post-season removal and cleanup",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service.title, service.description)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Services", url: `${site.url}/services` },
              { name: service.title, url: `${site.url}/services/${service.slug}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[var(--dark-bg)]">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/60 via-[var(--dark-bg)]/30 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <nav className="text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">{service.title}</span>
          </nav>
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase mb-4 font-medium">Classic Christmas Lighting</p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-[1.1] max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            {service.title}
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            {service.shortDescription}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary min-h-[52px] px-10">
              Get a Free Quote
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost min-h-[52px] px-10 flex items-center gap-2 justify-center">
              <Phone className="h-5 w-5" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Content + form */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* About the service */}
              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-5"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  About Our {service.title}
                </h2>
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  We serve Kitchener-Waterloo, Guelph, Cambridge, Hamilton, Woodstock, Stratford, and surrounding Southern Ontario communities. We never charge for travel within our service area.
                </p>
              </div>

              {/* Benefits */}
              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-6"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  What&apos;s Included
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {details.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--foreground)] leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-6"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  How It Works
                </h2>
                <div className="space-y-4">
                  {details.process.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white font-bold text-sm">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="text-sm text-[var(--muted)] leading-relaxed pt-1.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2
                  className="text-2xl font-bold text-[var(--foreground)] mb-5"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  See Our Work
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { src: service.image, alt: service.imageAlt },
                    { src: "/images/Classic-Christmas-Lighting-Residential-Light-Installation.jpg", alt: "Professional Christmas light installation by Classic Christmas Lighting in Southern Ontario" },
                    { src: "/images/Christmas-Lighting-Guelph.jpg", alt: "Christmas lights in Guelph Ontario by Classic Christmas Lighting" },
                    { src: "/images/Classic-Christmas-Lighting.webp", alt: "Stunning Christmas light display by Classic Christmas Lighting" },
                  ].map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky form */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="card p-6">
                <QuoteForm heading={`Get a Quote for ${service.title}`} showPromise dark={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-[var(--dark-surface)] py-16">
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl font-bold text-white mb-8 text-center"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Explore Other Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {getServices()
              .filter((s) => s.slug !== slug)
              .slice(0, 3)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-lg overflow-hidden group relative aspect-[4/3]"
                >
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold leading-tight" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                    {s.title}
                  </span>
                </Link>
              ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="btn btn-ghost min-h-[44px] px-8">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
