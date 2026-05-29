import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle, Phone } from "lucide-react";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { getServices, getTestimonials, getFeaturedFaqs, getServiceAreas } from "@/lib/content";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Professional Christmas Light Installation in London, ON | Christmas Lights London",
  description:
    "Professional Christmas light installation in London, Ontario. Custom-cut LED lights, no ladders, 7-person team with 30-ft aerial lifts. Installation, maintenance & takedown. Book now — slots fill fast!",
  openGraph: {
    title: "Professional Christmas Light Installation in London, ON",
    description: "Custom-cut LED lights, no ladders, 7-person team. Full installation, maintenance & takedown. Serving London, ON and all of Southwestern Ontario.",
    url: site.url,
    images: [{ url: "/images/Christmaslights.jpg", alt: "Professional Christmas light installation on London Ontario home" }],
  },
};

const trustStats = [
  { value: "7-Person", label: "Expert Team" },
  { value: "5+ Years", label: "Experience" },
  { value: "30-ft", label: "Aerial Lifts" },
  { value: "Season", label: "Guarantee" },
];

const pricingTiers = [
  {
    name: "Basic",
    tagline: "Perfect for smaller homes",
    features: [
      "Custom-cut roofline lights",
      "Professional-grade LED bulbs",
      "Timer installation & setup",
      "Season-long guarantee",
      "End-of-season takedown",
    ],
    cta: "Request Free Estimate",
  },
  {
    name: "Standard",
    tagline: "Our most popular package",
    featured: true,
    features: [
      "Everything in Basic",
      "Garage, windows & doors",
      "Wreath installation (1)",
      "Priority support all season",
      "Organized labelled storage",
    ],
    cta: "Request Free Estimate",
  },
  {
    name: "Premium",
    tagline: "Full exterior transformation",
    features: [
      "Everything in Standard",
      "Full garland installation",
      "Wreaths on all windows",
      "Custom design consultation",
      "Commercial-grade fixtures",
    ],
    cta: "Request Free Estimate",
  },
];

const processSteps = [
  {
    number: "01",
    title: "We Review Your House on Google Maps",
    description: "Contact us for a quote and we'll study your property virtually to plan the perfect display.",
  },
  {
    number: "02",
    title: "We Arrive & Custom Cut Your Lights",
    description: "Our team arrives on installation day and precision-cuts every strand to fit your roofline perfectly.",
  },
  {
    number: "03",
    title: "We Set Your Timer",
    description: "We do a full quality check and program your lights to turn on at dusk and off automatically.",
  },
  {
    number: "04",
    title: "We Maintain Your Lights",
    description: "Our team is on standby all season for any adjustments or repairs — we have you covered.",
  },
  {
    number: "05",
    title: "We Takedown, Label & Store",
    description: "After the season, we carefully remove and store your lights, organized for a perfect install next year.",
  },
];

export default function HomePage() {
  const services = getServices();
  const testimonials = getTestimonials();
  const featuredFaqs = getFeaturedFaqs();
  const serviceAreas = getServiceAreas();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.url }])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(featuredFaqs)),
        }}
      />

      {/* 1. HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[var(--dark-bg)]">
        <Image
          src="/images/Christmaslights.jpg"
          alt="Stunning professional Christmas light installation on a home in London, Ontario"
          fill
          className="object-cover opacity-40"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/60 via-[var(--dark-bg)]/30 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-[var(--accent-gold)] text-sm tracking-[0.3em] uppercase mb-5 font-medium">
            London, Ontario&apos;s Trusted Christmas Light Installers
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Professional Christmas Light Installation in{" "}
            <span className="text-[var(--accent)]">London, ON</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
            Make Your Holidays Brighter — No Ladders, No Stress, No Worries.
            Custom-cut lights, aerial lift equipment, season-long guarantee.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary text-base min-h-[52px] px-10 text-lg">
              Get a Free Quote
            </Link>
            <a
              href={site.phoneHref}
              className="btn btn-ghost text-base min-h-[52px] px-10 text-lg flex items-center gap-2 justify-center"
            >
              <Phone className="h-5 w-5" />
              {site.phone}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[var(--accent-gold)]" />
              No ladders required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[var(--accent-gold)]" />
              Custom-cut LED lights
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[var(--accent-gold)]" />
              Season-long guarantee
            </span>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="bg-[var(--dark-surface)] border-y border-[var(--border-dark)]">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustStats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-3xl md:text-4xl font-bold text-[var(--accent-gold)]"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US — split with large image */}
      <section className="bg-[var(--background)]">
        <div className="grid lg:grid-cols-2 min-h-[560px]">
          {/* Left: full-bleed image */}
          <div className="relative min-h-[400px] lg:min-h-full">
            <Image
              src="/images/IMG_8253-scaled-1.jpg"
              alt="Christmas Lights London team installing lights on a home roofline in London Ontario"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Right: features */}
          <div className="bg-[var(--background)] px-8 py-14 lg:px-14 flex flex-col justify-center">
            <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
              Why Choose Us
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-8"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              We Make Christmas Lights Completely Hands-Free
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Custom Cut Lights",
                  desc: "Every strand is cut to the exact length of your roofline — no unsightly bunching or mismatched segments.",
                },
                {
                  title: "Energy Efficient LEDs",
                  desc: "Professional-grade LED lights use up to 75% less energy than traditional bulbs, saving you money all season.",
                },
                {
                  title: "No Ladders — Ever",
                  desc: "Our aerial lift vehicles with 30-ft platforms mean you never climb a ladder. We handle everything safely.",
                },
              ].map((f) => (
                <div key={f.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10">
                    <CheckCircle className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--foreground)] mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                      {f.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn btn-ghost-dark mt-10 self-start min-h-[44px]">
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PHOTO GALLERY STRIP */}
      <section className="bg-[var(--dark-bg)] py-14">
        <div className="container mx-auto px-4">
          <p className="text-center text-white/50 text-xs tracking-[0.3em] uppercase mb-3">Our Work</p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-white mb-10"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            See Our Work
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: "/images/IMG_7749-scaled-1.jpg", alt: "Professional Christmas lights on residential home by Christmas Lights London" },
              { src: "/images/IMG_7792-scaled-2.jpg", alt: "Custom-cut Christmas lights on roofline in London Ontario" },
              { src: "/images/IMG_8241-scaled-1.jpg", alt: "Holiday lighting installation on London Ontario home" },
              { src: "/images/IMG_8346-scaled-1.jpg", alt: "Professional Christmas light display on home by Christmas Lights London team" },
            ].map((img, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="btn btn-ghost min-h-[44px]">
              View All Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SERVICES */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            What We Do
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-12 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Full-Service Holiday Lighting for Homes & Businesses
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.slug}
                className="card overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <h3
                    className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                  >
                    {service.title}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
                  >
                    Get a Quote →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn btn-primary min-h-[44px] px-8">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="bg-[var(--dark-bg)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
                Our Process
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-10"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Simple, Stress-Free From Start to Finish
              </h2>
              <div className="space-y-6">
                {processSteps.map((step) => (
                  <div key={step.number} className="flex gap-5">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white font-bold text-sm"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {step.number}
                    </div>
                    <div>
                      <h3
                        className="font-bold text-white mb-1"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/IMG_8724-scaled-1.jpg"
                alt="Christmas Lights London team member installing lights with aerial lift equipment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Client Reviews
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-12"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            What Our Clients Say
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6 flex flex-col">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]" />
                  ))}
                </div>
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-5 flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-[var(--foreground)] text-sm">{t.author}</p>
                  <p className="text-xs text-[var(--muted)]">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SPLIT SECTION — Transform Your Home */}
      <section className="bg-[var(--dark-surface)]">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="relative min-h-[400px] lg:min-h-full">
            <Image
              src="/images/Transform-Your-Home-This-Holiday-Season-with-Professional-Christmas-Light-Installation-in-London-Ontario.jpeg"
              alt="Beautiful home transformed with professional Christmas light installation in London Ontario"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="px-8 py-14 lg:px-14 flex flex-col justify-center">
            <p className="text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
              Professional Difference
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              Why Thousands Choose Professional Installation
            </h2>
            <div className="space-y-4 text-white/70 text-sm leading-relaxed">
              <p>
                Climbing ladders in December, untangling last year&apos;s lights, replacing blown fuses —
                that&apos;s the DIY Christmas experience. Our clients never deal with any of it.
              </p>
              <p>
                With Christmas Lights London, you get a full team arriving at your property with
                professional-grade equipment, custom-cutting lights to fit your home perfectly, and
                leaving only when everything looks spectacular.
              </p>
              <p>
                And when the season ends? We come back, take everything down, and store it organized
                and labeled so next year&apos;s install is just as easy.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-primary min-h-[48px]">
                Get a Free Quote
              </Link>
              <a
                href={site.phoneHref}
                className="btn btn-ghost min-h-[48px] flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PHOTO BANNER */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/Classic-Christmas-Lighting-Professional-Christmas-Lighting-2-1.jpeg"
          alt="Classic professional Christmas lighting display on residential street"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--dark-bg)]/65" />
        <div className="relative z-10 text-center px-4">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Book Early — Slots Fill Fast
          </h2>
          <p className="text-white/70 text-base mb-7">
            We recommend booking 4–6 weeks in advance. Don&apos;t miss out on your preferred date.
          </p>
          <Link href="/contact" className="btn btn-primary min-h-[48px] text-base px-10">
            Reserve My Spot
          </Link>
        </div>
      </section>

      {/* 10. PRICING TIERS */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Packages
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Simple, Transparent Packages
          </h2>
          <p className="text-center text-[var(--muted)] mb-12 max-w-xl mx-auto text-sm">
            Every package includes professional installation, custom-cut LED lights, timer setup, and end-of-season takedown. Contact us for a free estimate tailored to your property.
          </p>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`card p-7 flex flex-col ${
                  tier.featured
                    ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/20 relative"
                    : ""
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <h3
                  className="text-xl font-bold text-[var(--foreground)] mb-1"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  {tier.name}
                </h3>
                <p className="text-sm text-[var(--muted)] mb-6">{tier.tagline}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                      <CheckCircle className="h-4 w-4 shrink-0 text-[var(--accent)] mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`btn w-full justify-center min-h-[44px] ${
                    tier.featured ? "btn-primary" : "btn-ghost-dark"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section className="bg-[var(--dark-bg)] py-20 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Questions
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Frequently Asked Questions
          </h2>
          <FaqAccordion faqs={featuredFaqs} dark />
          <div className="text-center mt-8">
            <Link href="/faq" className="text-sm text-[var(--accent-gold)] hover:underline">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* 12. SERVICE AREAS */}
      <section className="bg-[var(--dark-surface)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Where We Work
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Serving All of Southwestern Ontario
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              ...serviceAreas.map((a) => a.city),
              "London Surrounding Areas",
              "And More",
            ].map((city) => (
              <span
                key={city}
                className="px-4 py-2 rounded-full text-sm border border-[var(--border-dark)] text-white/70 hover:border-[var(--accent-gold)] hover:text-white transition-colors"
              >
                {city}
              </span>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/contact" className="btn btn-primary min-h-[44px]">
              Check If We Serve Your Area
            </Link>
          </div>
        </div>
      </section>

      {/* 13. FINAL CTA */}
      <section className="relative py-24 md:py-32 flex items-center overflow-hidden">
        <Image
          src="/images/WhatsApp-Image-2025-10-19-at-6.06.07-AM-7.jpeg"
          alt="Professional Christmas lights installation team at work in London Ontario"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--dark-bg)]/80" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <p className="text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
              Ready to Get Started?
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              Ready to Light Up Your Home This Christmas?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Contact us today for your free, no-obligation quote. Our 7-person team is ready to
              transform your property into a stunning holiday display — no ladders, no stress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-primary min-h-[52px] text-base px-10">
                Get a Free Quote
              </Link>
              <a
                href={site.phoneHref}
                className="btn btn-ghost min-h-[52px] text-base px-10 flex items-center gap-2 justify-center"
              >
                <Phone className="h-5 w-5" />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
