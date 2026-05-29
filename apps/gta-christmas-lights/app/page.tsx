import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle,
  Phone,
  Award,
  ShieldCheck,
  Sparkles,
  Calendar,
  Snowflake,
  Lightbulb,
} from "lucide-react";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import {
  getServices,
  getFeaturedTestimonials,
  getFeaturedFaqs,
  getServiceAreas,
} from "@/lib/content";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title:
    "Award-Winning Christmas Light Installation in the GTA | GTA Christmas Lights",
  description:
    "Professional Christmas light installation across the Greater Toronto Area. 35+ years experience, 3× Landscape Ontario Award of Excellence, commercial-grade LED lights, full design–install–takedown–storage. Free quote.",
  openGraph: {
    title: "Award-Winning Christmas Light Installation in the GTA",
    description:
      "35+ years, 3× Landscape Ontario Award of Excellence. Commercial-grade LED lights, custom design, full-service install. Book before slots fill.",
    url: site.url,
    images: [
      {
        url: "/images/gallery-1.png",
        alt: "Award-winning Christmas light installation on a luxury Toronto home by GTA Christmas Lights",
      },
    ],
  },
};

const trustStats = [
  { value: "35+", label: "Years in Business" },
  { value: "3×", label: "Award of Excellence" },
  { value: "20", label: "GTA Cities Served" },
  { value: "97%", label: "Lower Energy Use" },
];

const pricingTiers = [
  {
    name: "Classic",
    tagline: "Refined roofline + entrance",
    startingAt: "From $1,500",
    features: [
      "Custom-cut LED roofline lights",
      "Programmable dusk-to-dawn timer",
      "Front-door wreath",
      "Perfect-Until-Christmas-Eve Guarantee",
      "End-of-season takedown & storage",
    ],
    cta: "Request a Quote",
  },
  {
    name: "Signature",
    tagline: "Our most popular package",
    featured: true,
    startingAt: "From $2,900",
    features: [
      "Everything in Classic",
      "Garlands on pillars & railings",
      "Lit shrubs across the front",
      "Two oversized custom wreaths",
      "Priority maintenance all season",
    ],
    cta: "Request a Quote",
  },
  {
    name: "Estate",
    tagline: "Full property transformation",
    startingAt: "From $4,500",
    features: [
      "Everything in Signature",
      "Wrapped trees & spiral-wrapped trunks",
      "Window candles & accents",
      "Custom design rendered for your home",
      "Dedicated design consultant",
    ],
    cta: "Request a Quote",
  },
];

const processSteps = [
  {
    icon: Phone,
    title: "Reach Out",
    description:
      "Tell us your address. We'll review your property and book a design visit at a time that suits you.",
  },
  {
    icon: Sparkles,
    title: "Custom Design",
    description:
      "An award-winning designer plans every detail — bulb colour, layout, accents — to compliment your home.",
  },
  {
    icon: Lightbulb,
    title: "Professional Install",
    description:
      "Our certified team arrives with aerial lifts, custom-cut LED lights, and finishes every detail before they leave.",
  },
  {
    icon: ShieldCheck,
    title: "All-Season Care",
    description:
      "Hassle-Free Christmas Guarantee. We monitor your display and fix anything that misbehaves — fast.",
  },
  {
    icon: Snowflake,
    title: "Takedown & Storage",
    description:
      "After the season we remove everything, inventory it, and store it labelled for next year's install.",
  },
];

export default function HomePage() {
  const services = getServices();
  const testimonials = getFeaturedTestimonials();
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
          __html: JSON.stringify(
            breadcrumbSchema([{ name: "Home", url: site.url }])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(featuredFaqs)),
        }}
      />

      {/* HERO */}
      <section className="relative min-h-[94vh] flex items-center justify-center overflow-hidden bg-[var(--dark-bg)]">
        <Image
          src="/images/hero-burton-rd.jpg"
          alt="Award-winning Christmas light installation on a Toronto luxury home at twilight by GTA Christmas Lights"
          fill
          className="object-cover opacity-45"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/55 via-[var(--dark-bg)]/35 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-[var(--accent-gold)] text-xs sm:text-sm tracking-[0.32em] uppercase mb-5 font-medium">
            Greater Toronto Area · 35+ Years · 3× Award of Excellence
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Christmas Lights{" "}
            <span className="text-[var(--accent-gold)]">Done Right</span>{" "}
            Across the GTA
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Award-winning design. Commercial-grade LED lights. Full-service from
            install to takedown. The Greater Toronto Area&apos;s most-trusted holiday
            lighting team since 1989.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn btn-primary text-base px-10 text-lg"
            >
              Get My Free Quote
            </Link>
            <a
              href={site.phoneHref}
              className="btn btn-ghost text-base px-10 text-lg flex items-center gap-2"
            >
              <Phone className="h-5 w-5" />
              {site.phone}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-white/65">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[var(--accent-gold)]" />
              Custom-cut LED lights
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[var(--accent-gold)]" />
              Fully insured · WSIB
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[var(--accent-gold)]" />
              Perfect-Until-Christmas-Eve Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-[var(--dark-surface)] border-y border-[var(--border-dark)]">
        <div className="container mx-auto px-4 py-9">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustStats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-3xl md:text-4xl font-bold text-[var(--accent-gold)]"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-white/65 mt-1 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US — Split with image */}
      <section className="bg-[var(--background)]">
        <div className="grid lg:grid-cols-2 min-h-[560px]">
          <div className="relative min-h-[400px] lg:min-h-full">
            <Image
              src="/images/gallery-12.png"
              alt="Landscape Ontario Award of Excellence for Christmas lighting won by GTA Christmas Lights"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="bg-[var(--background)] px-8 py-14 lg:px-14 flex flex-col justify-center">
            <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
              Why Choose Us
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-8"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              The GTA&apos;s Most-Awarded Christmas Lighting Team
            </h2>
            <div className="space-y-6">
              {[
                {
                  icon: Award,
                  title: "Three Awards of Excellence",
                  desc: "Three Landscape Ontario Awards of Excellence for Christmas Holiday Lighting Design and Installation — recognised by our industry, year after year.",
                },
                {
                  icon: Lightbulb,
                  title: "Commercial-Grade LED",
                  desc: "Bulbs that shine 5–6× brighter than retail, use up to 97% less electricity, and look the same on year five as they do on day one.",
                },
                {
                  icon: ShieldCheck,
                  title: "Fully Insured · WSIB · Heights-Certified",
                  desc: "Aerial-lift equipment, working-at-heights certification, and full insurance mean you and our crew are protected on every install.",
                },
              ].map((f) => (
                <div key={f.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10">
                    <f.icon className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-[var(--foreground)] mb-1"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {f.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn btn-ghost-dark mt-10 self-start">
              Our Story →
            </Link>
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY STRIP */}
      <section className="bg-[var(--dark-bg)] py-14">
        <div className="container mx-auto px-4">
          <p className="text-center text-white/55 text-xs tracking-[0.3em] uppercase mb-3">
            Real GTA Installs
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-white mb-10"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            See Our Work
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                src: "/images/gallery-1.png",
                alt: "Christmas lights on Wellesley Street luxury Toronto home by GTA Christmas Lights",
              },
              {
                src: "/images/gallery-2.png",
                alt: "Custom Christmas lighting on a Glenwood Etobicoke home by GTA Christmas Lights",
              },
              {
                src: "/images/gallery-9.png",
                alt: "Christmas light installation in Vellore Park Vaughan by GTA Christmas Lights",
              },
              {
                src: "/images/gallery-7.png",
                alt: "Front-door Christmas decorating in Hoggs Hollow Toronto by GTA Christmas Lights",
              },
            ].map((img) => (
              <div
                key={img.src}
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
            <Link href="/gallery" className="btn btn-ghost">
              View Full Design Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            What We Do
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-3 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Full-Service Holiday Lighting for Homes &amp; Businesses
          </h2>
          <p className="text-center text-[var(--muted)] max-w-2xl mx-auto mb-12">
            From a refined warm-white roofline to a fully transformed estate
            property, we design, install, maintain, take down, and store.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.slug}
                className="card overflow-hidden group hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <h3
                    className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                  >
                    {service.title}
                  </h3>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">
                    {service.shortDescription}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn btn-primary px-8">
              See All Services
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
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
                Simple, Stress-Free, From Start to Finish
              </h2>
              <div className="space-y-6">
                {processSteps.map((step) => (
                  <div key={step.title} className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1 text-base">
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/65 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden order-first lg:order-last">
              <Image
                src="/images/gallery-11.png"
                alt="Spiral-wrapped tree Christmas lighting installation by GTA Christmas Lights"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Reviews From Real GTA Homeowners
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-12"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            What Our Clients Say
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 6).map((t, i) => (
              <div key={i} className="card p-6 flex flex-col">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]"
                    />
                  ))}
                </div>
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-5 flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-[var(--foreground)] text-sm">
                    {t.author}
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    {t.location} · {t.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT SECTION — Pro vs DIY */}
      <section className="bg-[var(--dark-surface)]">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="relative min-h-[400px] lg:min-h-full">
            <Image
              src="/images/rooftop-warm.jpg"
              alt="Professional Christmas lights installation on Burton Road Toronto by GTA Christmas Lights"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="px-8 py-14 lg:px-14 flex flex-col justify-center">
            <p className="text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
              The Professional Difference
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              Skip the Ladders. Skip the Stress.
            </h2>
            <div className="space-y-4 text-white/72 text-sm leading-relaxed">
              <p>
                Standing on a ladder in November, untangling last year&apos;s
                lights, chasing a single dead bulb — that&apos;s the DIY
                Christmas experience. Our clients haven&apos;t done it in years.
              </p>
              <p>
                We arrive with a full crew, aerial-lift equipment, and
                commercial-grade LED lights cut to fit your home. The lights
                look like they were made for your house. The power runs
                discreetly. Everything turns on at dusk automatically.
              </p>
              <p>
                When the season ends, we take everything down, store it
                labelled, and bring it back next November ready to install. You
                own the lights — we own the work.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-primary">
                Get a Free Quote
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost">
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO BANNER */}
      <section className="relative h-72 md:h-80 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-burton-rd-2.jpg"
          alt="Award-winning Christmas lighting on a Toronto street by GTA Christmas Lights"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--dark-bg)]/72" />
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase mb-3">
            <Calendar className="inline h-4 w-4 mr-1.5" />
            Book Early
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            October &amp; November Slots Fill Fast
          </h2>
          <p className="text-white/75 text-base mb-7">
            We design, build, and install all year — but October and November
            are when calendars fill. Reserve your install date now.
          </p>
          <Link href="/contact" className="btn btn-gold text-base px-10">
            Reserve My Spot
          </Link>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Packages
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Transparent, Custom-Quoted Packages
          </h2>
          <p className="text-center text-[var(--muted)] mb-12 max-w-2xl mx-auto text-sm">
            Every package includes design, custom-cut LED lights, professional
            install, timer programming, season-long maintenance, takedown, and
            storage. Year-two pricing drops 45–55% because the lights are
            already yours.
          </p>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
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
                <p className="text-sm text-[var(--muted)] mb-3">{tier.tagline}</p>
                <p className="text-[var(--accent)] font-bold mb-6">
                  {tier.startingAt}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-[var(--foreground)]"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0 text-[var(--accent)] mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`btn w-full justify-center ${
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

      {/* FAQ */}
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
            <Link
              href="/faq"
              className="text-sm text-[var(--accent-gold)] hover:underline"
            >
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="bg-[var(--dark-surface)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Where We Work
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Serving 20 Cities Across the Greater Toronto Area
          </h2>
          <p className="text-center text-white/65 mb-12 max-w-2xl mx-auto text-sm">
            From Toronto&apos;s heritage neighbourhoods to the executive estates
            of Caledon and Kleinburg — we light the GTA.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/services/christmas-light-installation/${area.slug}`}
                className="px-4 py-2 rounded-full text-sm border border-[var(--border-dark)] text-white/75 hover:border-[var(--accent-gold)] hover:text-white hover:bg-white/5 transition-colors"
              >
                {area.city}
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/service-areas" className="btn btn-primary">
              View All Service Areas
            </Link>
          </div>
        </div>
      </section>

      {/* QUOTE FORM SECTION */}
      <section className="bg-[var(--background)] py-20 md:py-24" id="quote">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 items-start max-w-6xl mx-auto">
            <div>
              <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
                Free Quote
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-5"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Ready to See Your Home in Lights?
              </h2>
              <p className="text-[var(--muted)] mb-7 leading-relaxed">
                Send us your address and a few details. A designer will review
                your property and respond within 1 business day with a free,
                no-obligation quote.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Free property review and quote",
                  "Award-winning custom design",
                  "Insured · WSIB · Heights-certified",
                  "Hassle-Free Christmas Guarantee",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-[var(--foreground)]"
                  >
                    <CheckCircle className="h-5 w-5 text-[var(--accent)]" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 items-center text-sm text-[var(--muted)]">
                Prefer to chat?
                <a
                  href={site.phoneHref}
                  className="text-[var(--accent)] font-semibold hover:underline"
                >
                  {site.phone}
                </a>
              </div>
            </div>
            <div className="card p-7 md:p-9">
              <QuoteForm heading="Tell Us About Your Home" />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 md:py-32 flex items-center overflow-hidden">
        <Image
          src="/images/gallery-1.png"
          alt="Award-winning luxury Christmas light display on a Toronto home by GTA Christmas Lights"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--dark-bg)]/82" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <p className="text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
              Ready to Get Started?
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              Make This the Best-Looking Year Yet.
            </h2>
            <p className="text-white/72 text-lg leading-relaxed mb-8">
              Join thousands of GTA homes that don&apos;t worry about Christmas
              lights anymore. We design it. We install it. We maintain it. We
              take it down. You enjoy it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="btn btn-primary text-base px-10"
              >
                Get My Free Quote
              </Link>
              <a
                href={site.phoneHref}
                className="btn btn-ghost text-base px-10"
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
