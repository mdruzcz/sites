import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Calendar,
  Snowflake,
  Lightbulb,
  Camera,
  Wrench,
  Truck,
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
    "Professional Christmas Light Installation in the GTA | GTA Christmas Lighting",
  description:
    "GTA's top-rated Christmas light installers. All-inclusive holiday lighting: rental or purchase, custom design, install, maintain, takedown & storage. Serving Toronto, Mississauga, Burlington, Oakville & the rest of the GTA. Free quotes.",
  openGraph: {
    title: "Professional Christmas Light Installation in the GTA",
    description:
      "All-inclusive holiday lighting: rental or purchase, custom design, install, maintain, takedown & storage. Free quotes across the GTA.",
    url: site.url,
    images: [
      {
        url: "/images/hero.jpg",
        alt: "Professional Christmas light installation by GTA Christmas Lighting on a GTA home",
      },
    ],
  },
};

const trustStats = [
  { value: "$700+", label: "Full-Season Packages" },
  { value: "14", label: "GTA Cities Served" },
  { value: "Rental", label: "Or Purchase" },
  { value: "Oct 1", label: "Install Season Starts" },
];

const pricingTiers = [
  {
    name: "Rental",
    tagline: "Hassle-free full season",
    startingAt: "From $700",
    features: [
      "No upfront cost for lights",
      "Custom design for your home",
      "Professional install",
      "In-season maintenance",
      "Takedown & storage included",
    ],
    cta: "Get a Rental Quote",
  },
  {
    name: "Purchase + Install",
    tagline: "Most popular package",
    featured: true,
    startingAt: "From $1,200",
    features: [
      "Own custom-cut LED lights",
      "Lower install fees year two onward",
      "Professional installation",
      "In-season maintenance",
      "Takedown & storage included",
    ],
    cta: "Get a Purchase Quote",
  },
  {
    name: "Permanent LED",
    tagline: "Year-round programmable",
    startingAt: "Custom Quote",
    features: [
      "Year-round programmable lighting",
      "App-controlled scenes & colours",
      "Christmas mode at the tap of a button",
      "No annual install fees",
      "Holiday-ready presets",
    ],
    cta: "Learn More",
  },
];

const processSteps = [
  {
    icon: Camera,
    title: "Send a Photo",
    description:
      "Text or email a photo of your home or business. We'll send a quick, accurate quote — no on-site visit required to get started.",
  },
  {
    icon: Sparkles,
    title: "Custom Design",
    description:
      "Our designers create a lighting plan tailored to your property — roofline, trees, columns, walkways. We work to your style and budget.",
  },
  {
    icon: Lightbulb,
    title: "Professional Install",
    description:
      "Our skilled team installs your lights safely and efficiently. Custom-cut to your roofline, secure connections, programmed timers.",
  },
  {
    icon: Wrench,
    title: "Season Maintenance",
    description:
      "A bulb goes out — we replace it. Strand stops working — we're there. Your display looks perfect all season long.",
  },
  {
    icon: Truck,
    title: "Removal & Storage",
    description:
      "At the end of January, we take everything down and store it. No tangled wires in your attic. Just an effortless next year.",
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
          src="/images/hero.jpg"
          alt="Professional Christmas light installation on a GTA home at night by GTA Christmas Lighting"
          fill
          className="object-cover opacity-45"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/55 via-[var(--dark-bg)]/35 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-[var(--accent-gold)] text-xs sm:text-sm tracking-[0.32em] uppercase mb-5 font-medium">
            Greater Toronto Area · All-Inclusive Holiday Lighting
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Christmas Light Installation{" "}
            <span className="text-[var(--accent-gold)]">Done For You</span>{" "}
            Across the GTA
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Rental or purchase. Custom design. Professional install. In-season
            maintenance. Takedown and storage included. Send us a photo of your
            home for a free quote — that&apos;s all it takes.
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
              From $700 / full season
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[var(--accent-gold)]" />
              Free quote from a photo
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[var(--accent-gold)]" />
              All-holiday lighting
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

      {/* BENEFITS — three cards */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Why GTA Christmas Lighting
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-3 max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            All-Inclusive Holiday Lighting — Nothing Left On Your Plate
          </h2>
          <p className="text-center text-[var(--muted)] mb-12 max-w-2xl mx-auto">
            We provide the lights, install them, maintain them, take them down,
            and store them. You enjoy the holidays — that&apos;s it.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                img: "/images/project-night-2.jpg",
                title: "Easy, Full-Service",
                desc: "Free quote from a photo, custom design, install, in-season maintenance, takedown at end of January, and storage. All in one package.",
              },
              {
                img: "/images/service-permanent.jpg",
                title: "Professional LED Lights",
                desc: "Energy-efficient, weather-resistant, professional-grade LED bulbs. Custom-cut to your roofline so wires are never visible.",
              },
              {
                img: "/images/process-genie-lift.png",
                title: "Safety + Right Equipment",
                desc: "Decorating tall homes is risky. We bring aerial-lift equipment, working-at-heights training, and full insurance to every install.",
              },
            ].map((b) => (
              <div key={b.title} className="card p-7 flex flex-col">
                <div className="relative aspect-[4/3] mb-5 rounded-lg overflow-hidden bg-[var(--background)]">
                  <Image
                    src={b.img}
                    alt={b.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3
                  className="font-bold text-[var(--foreground)] text-xl mb-3"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  {b.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT — Residential vs Commercial */}
      <section className="bg-[var(--evergreen)] text-white">
        <div className="container mx-auto px-4 py-20">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Residential &amp; Commercial
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold mb-12"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Homes &amp; Businesses Across the GTA
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/service-christmas.png"
                  alt="Residential Christmas light installation by GTA Christmas Lighting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--evergreen)]/60 to-transparent" />
              </div>
              <div className="p-7">
                <h3
                  className="text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  Residential
                </h3>
                <p className="text-white/75 text-sm leading-relaxed mb-5">
                  Transform your home into a festive wonderland. Custom-cut
                  roofline lights, lit walkways, garden features, wrapped trees,
                  oversized wreaths, and more.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Custom displays for homes of all sizes",
                    "Elegant roofline lighting",
                    "Beautifully lit pathways &amp; garden features",
                    "Wrapped trees, columns, and entrances",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-white/75"
                    >
                      <CheckCircle className="h-4 w-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{ __html: f }} />
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn btn-gold">
                  Get a Residential Quote
                </Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/project-night-5.jpg"
                  alt="Commercial Christmas light installation for a business by GTA Christmas Lighting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--evergreen)]/60 to-transparent" />
              </div>
              <div className="p-7">
                <h3
                  className="text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  Commercial
                </h3>
                <p className="text-white/75 text-sm leading-relaxed mb-5">
                  Attract customers and create a festive atmosphere. We design,
                  install, and maintain large-scale displays that make
                  businesses stand out.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Eye-catching displays for storefronts",
                    "Festive lighting for hotels, restaurants &amp; condos",
                    "Municipal &amp; park installations",
                    "After-hours scheduling &amp; minimal disruption",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-white/75"
                    >
                      <CheckCircle className="h-4 w-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{ __html: f }} />
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn btn-gold">
                  Get a Commercial Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY STRIP */}
      <section className="bg-[var(--dark-bg)] py-14">
        <div className="container mx-auto px-4">
          <p className="text-center text-white/55 text-xs tracking-[0.3em] uppercase mb-3">
            Recent GTA Installs
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
                src: "/images/project-night-1.jpg",
                alt: "Custom Christmas light installation on a GTA home at night by GTA Christmas Lighting",
              },
              {
                src: "/images/project-night-2.jpg",
                alt: "Holiday lighting installation on a GTA property at night by GTA Christmas Lighting",
              },
              {
                src: "/images/project-night-3.jpg",
                alt: "Roofline Christmas lighting on a GTA home at night by GTA Christmas Lighting",
              },
              {
                src: "/images/project-night-4.jpg",
                alt: "Custom Christmas light display on a GTA home at night by GTA Christmas Lighting",
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
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            What We Offer
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-3 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Services for Every Festive Occasion
          </h2>
          <p className="text-center text-[var(--muted)] max-w-2xl mx-auto mb-12">
            From Christmas to Diwali to Hanukkah — we design and install
            festive lighting for every celebration.
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
                Five Simple Steps to a Stunning Display
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
                src="/images/process-installers.png"
                alt="GTA Christmas Lighting installers placing professional Christmas lights on a tree"
                fill
                className="object-contain bg-[var(--dark-surface)] p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
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

      {/* RENTAL VS PURCHASE */}
      <section className="bg-[var(--dark-surface)]">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="relative min-h-[400px] lg:min-h-full">
            <Image
              src="/images/service-permanent.jpg"
              alt="Permanent LED lighting installation on a GTA home by GTA Christmas Lighting"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="px-8 py-14 lg:px-14 flex flex-col justify-center">
            <p className="text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
              Rental, Purchase, or Permanent
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              Three Ways to Light Up Your Home
            </h2>
            <div className="space-y-4 text-white/72 text-sm leading-relaxed">
              <p>
                <strong className="text-white">Rental</strong> is hassle-free.
                We provide the lights, install, maintain, take down, and store —
                all for one seasonal fee. Perfect for trying out a display or
                for homeowners who don&apos;t want long-term commitment.
              </p>
              <p>
                <strong className="text-white">Purchase + Install</strong> is
                ideal if you want to invest. You own custom-cut, professional-grade
                LEDs. Year-two and beyond cost less since the lights are yours.
              </p>
              <p>
                <strong className="text-white">Permanent LED</strong> goes up
                once and stays year-round. Tasteful daytime profile, vibrant
                night-time scenes for every holiday and special occasion, all
                controlled from your phone.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-primary">
                Compare Options
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
          src="/images/project-night-3.jpg"
          alt="Stunning Christmas lights on a GTA home at night by GTA Christmas Lighting"
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
            Our installs run October 1 through late December. Earlier bookings
            get preferred install dates — reserve yours now.
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
            Choose Your Package
          </h2>
          <p className="text-center text-[var(--muted)] mb-12 max-w-2xl mx-auto text-sm">
            Most full-season residential packages run $700–$2,000 depending on
            home size and chosen features. Custom quote sent the same day for
            most properties.
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
            Serving the Greater Toronto Area
          </h2>
          <p className="text-center text-white/65 mb-12 max-w-2xl mx-auto text-sm">
            Toronto, Mississauga, Burlington, Oakville, Vaughan, Markham, and
            beyond — we light up the GTA every holiday season.
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
                Light Up Your GTA Home — Send Us a Photo
              </h2>
              <p className="text-[var(--muted)] mb-7 leading-relaxed">
                The fastest way to get a quote: send us a photo of your home or
                business with a few details. A designer will respond the same
                day with a custom-tailored quote.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Free, no-obligation quote",
                  "Custom design for your property",
                  "Rental or purchase options",
                  "All-inclusive: install · maintain · take down · store",
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
                Prefer to call?
                <a
                  href={site.phoneHref}
                  className="text-[var(--accent)] font-semibold hover:underline"
                >
                  {site.phone}
                </a>
              </div>
            </div>
            <div className="card p-7 md:p-9">
              <QuoteForm heading="Tell Us About Your Property" />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 md:py-32 flex items-center overflow-hidden">
        <Image
          src="/images/project-night-5.jpg"
          alt="Stunning Christmas light display on a GTA home at night by GTA Christmas Lighting"
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
              Make This Holiday Season Effortless.
            </h2>
            <p className="text-white/72 text-lg leading-relaxed mb-8">
              Send a photo. Get a quote. Pick your install date. That&apos;s
              it. Everything else — design, install, maintain, take down,
              store — is on us.
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
