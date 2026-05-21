import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import {
  SERVICES,
  CITIES,
  TESTIMONIALS,
  PHONE,
  PHONE_HREF,
  COMPANY_NAME,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Deck Heroes | Deck Staining, Building & Restoration in Ontario",
  description:
    "Transform your outdoor living space with Deck Heroes. Professional deck staining, refinishing, resurfacing, building, and cleaning across Southwestern Ontario. Free estimates, 5-star rated, fully insured.",
  openGraph: {
    title: "Deck Heroes | Deck Staining, Building & Restoration in Ontario",
    description:
      "Transform your outdoor living space with professional deck staining, building, refinishing, resurfacing, and cleaning across Southwestern Ontario.",
    url: "https://deckheroes.ca",
    siteName: "Deck Heroes",
    locale: "en_CA",
    type: "website",
  },
};

/* ---------- service images ---------- */
const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  "deck-staining": { src: "/images/staining-sealing.png", alt: "Professional deck staining service in Ontario — rich wood stain applied to cedar deck" },
  "deck-refinishing": { src: "/images/stripping-sanding.png", alt: "Deck refinishing — sanding and stripping weathered wood to restore original beauty" },
  "deck-resurfacing": { src: "/images/structural-repairs.png", alt: "Deck resurfacing — replacing worn boards to give your deck a fresh surface" },
  "deck-building": { src: "/images/modern-house-deck.jpg", alt: "Custom deck building — expertly designed and built deck for Ontario homes" },
  "deck-cleaning": { src: "/images/deep-cleaning.png", alt: "Professional deck cleaning — power washing removes dirt, mould and grey weathering" },
};

/* ---------- gallery images ---------- */
const GALLERY_IMAGES = [
  { src: "/images/backyard-deck-furniture.jpg", alt: "Refinished backyard deck with outdoor furniture in London, Ontario" },
  { src: "/images/beautiful-home-deck.jpg", alt: "Beautiful home deck staining project by Deck Heroes" },
  { src: "/images/luxury-home-exterior.jpg", alt: "Luxury home with custom-built deck in Southwestern Ontario" },
  { src: "/images/deck-outdoor-living.jpg", alt: "Outdoor living space with professionally stained deck" },
  { src: "/images/poolside-deck.jpeg", alt: "Poolside deck resurfacing project by Deck Heroes" },
  { src: "/images/deck-furniture.jpeg", alt: "Deck with furniture after professional refinishing treatment" },
];

/* ---------- process steps ---------- */
const PROCESS_STEPS = [
  {
    number: "01",
    title: "Free Consultation",
    description: "We visit your property, assess the condition of your deck, and discuss your vision. You get an honest, transparent quote — no pressure.",
  },
  {
    number: "02",
    title: "Surface Preparation",
    description: "Thorough cleaning, sanding, and stripping removes old finish, dirt, and grey weathering. Proper prep is the foundation of a lasting result.",
  },
  {
    number: "03",
    title: "Expert Application",
    description: "Our team applies premium stains, sealants, or finishes with precision — every board, every edge, every detail done right.",
  },
  {
    number: "04",
    title: "Final Walkthrough",
    description: "We walk you through the finished deck, ensure you love the result, and provide care tips to keep your deck looking its best for years.",
  },
];

/* ---------- article teasers ---------- */
const ARTICLE_TEASERS = [
  {
    slug: "how-often-should-you-stain-your-deck",
    title: "How Often Should You Stain Your Deck?",
    excerpt:
      "Discover the ideal staining schedule based on your wood type, climate, and foot traffic to keep your deck looking its best year-round.",
  },
  {
    slug: "oil-vs-water-based-stains",
    title: "Oil vs. Water-Based Deck Stains: Which Is Right for You?",
    excerpt:
      "We break down the pros and cons of oil-based and water-based stains so you can make an informed choice for your deck.",
  },
  {
    slug: "preparing-your-deck-for-winter",
    title: "Preparing Your Deck for Ontario Winters",
    excerpt:
      "Ontario winters are tough on outdoor wood. Learn the steps to protect your deck from freeze-thaw cycles, ice, and snow damage.",
  },
];

export default function HomePage() {
  const featuredTestimonials = TESTIMONIALS.slice(0, 3);

  return (
    <>
      {/* ===== HERO — full-bleed background image ===== */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
        <Image
          src="/images/hero-deck.png"
          alt="Professional deck staining and restoration by Deck Heroes in Ontario"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/90 via-forest-dark/75 to-forest-dark/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-terracotta/20 border border-terracotta/30 px-4 py-1.5 text-sm font-medium text-terra-light tracking-wide uppercase mb-6">
              Southwestern Ontario&apos;s Deck Experts
            </span>
            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Transform Your
              <span className="block text-terracotta">Outdoor Living Space</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
              Professional deck staining, refinishing, resurfacing, building, and
              cleaning. Trusted by hundreds of homeowners across Ontario.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg bg-terracotta px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-terra-dark focus:outline-none focus:ring-2 focus:ring-terra-light"
              >
                Get Your Free Quote
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS COUNTER BAR ===== */}
      <section className="bg-forest-dark py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: "500+", label: "Happy Homeowners" },
              { value: "10+", label: "Years Experience" },
              { value: "5★", label: "Average Rating" },
              { value: "100%", label: "Satisfaction Guarantee" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl font-bold text-terracotta sm:text-4xl lg:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium uppercase tracking-wider text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES — image-based cards ===== */}
      <section className="bg-bg py-20 px-4 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-forest-light">
              What We Do
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-wood-dark sm:text-4xl lg:text-5xl">
              Our Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-wood-light">
              From fresh staining to custom builds, we offer comprehensive deck
              services for every outdoor wood surface.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const img = SERVICE_IMAGES[service.slug];
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={img?.src ?? "/images/hero-deck.png"}
                      alt={img?.alt ?? `${service.title} service by Deck Heroes`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-xl font-bold text-white sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80 line-clamp-2">
                      {service.shortDescription}
                    </p>
                    <span className="mt-3 inline-flex items-center text-sm font-semibold text-terracotta group-hover:text-terra-light transition-colors">
                      Learn More
                      <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-bg-alt py-20 px-4 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/choose-deck-heroes.png"
                  alt="Why homeowners choose Deck Heroes for professional deck care in Ontario"
                  width={683}
                  height={1024}
                  className="h-auto w-full object-cover"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -right-4 rounded-xl bg-forest-dark p-5 shadow-lg sm:-right-6">
                <div className="font-serif text-3xl font-bold text-terracotta">10+</div>
                <div className="text-sm font-medium text-white/80">Years of<br />Experience</div>
              </div>
            </div>
            <div>
              <span className="inline-block text-sm font-semibold uppercase tracking-widest text-forest-light">
                Why Deck Heroes
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-wood-dark sm:text-4xl">
                Quality Craftsmanship,<br />Lasting Results
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-wood-light">
                We combine years of hands-on experience with premium products and
                meticulous attention to detail. Every deck we touch gets the care
                it deserves — no shortcuts, no missed spots.
              </p>
              <div className="mt-8 space-y-5">
                {[
                  {
                    title: "Premium Products Only",
                    description: "Top-tier stains and sealants from trusted brands for superior UV protection and colour retention.",
                    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
                  },
                  {
                    title: "Meticulous Attention to Detail",
                    description: "From thorough surface prep to careful masking and even application — we treat every board with care.",
                    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
                  },
                  {
                    title: "5-Star Customer Satisfaction",
                    description: "We are not done until you love the result. Every project includes a final walkthrough with the homeowner.",
                    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
                  },
                  {
                    title: "Fully Insured & Licensed",
                    description: "Complete peace of mind with full liability insurance and WSIB coverage on every project.",
                    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-wood-dark">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-wood-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-forest-dark py-20 px-4 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-terracotta">
              Our Process
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              A simple, transparent process from your first call to the final walkthrough.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 text-center hover:bg-white/10 transition-colors"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta/20 border-2 border-terracotta">
                  <span className="font-serif text-2xl font-bold text-terracotta">{step.number}</span>
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY / PORTFOLIO ===== */}
      <section className="bg-bg py-20 px-4 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-forest-light">
              Our Work
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-wood-dark sm:text-4xl lg:text-5xl">
              Recent Projects
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-wood-light">
              See the transformations we deliver for homeowners across Ontario.
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-forest-dark/0 group-hover:bg-forest-dark/40 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICE AREAS ===== */}
      <section className="bg-bg-alt py-20 px-4 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-forest-light">
              Where We Work
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-wood-dark sm:text-4xl lg:text-5xl">
              Service Areas
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-wood-light">
              We proudly serve homeowners in these Southwestern Ontario communities
              and surrounding areas.
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="group flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm border border-transparent hover:border-forest-light/30 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest group-hover:bg-forest group-hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-wood-dark group-hover:text-forest transition-colors">
                    {city.name}, {city.province}
                  </h3>
                  <p className="text-sm text-wood-light">
                    Deck services &amp; free estimates
                  </p>
                </div>
                <svg className="ml-auto h-5 w-5 text-wood-light/40 group-hover:text-forest transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-forest-dark py-20 px-4 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-terracotta">
              Testimonials
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              What Our Customers Say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Real reviews from real homeowners across Ontario.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTestimonials.map((t, i) => (
              <blockquote
                key={i}
                className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <svg key={s} className="h-5 w-5 text-terracotta" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-white/80">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta/20 text-terracotta font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/60">{t.city}, Ontario</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center rounded-lg border-2 border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Read All Reviews
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ARTICLES PREVIEW ===== */}
      <section className="bg-bg py-20 px-4 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-forest-light">
              Resources
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-wood-dark sm:text-4xl lg:text-5xl">
              Tips &amp; Resources
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-wood-light">
              Expert advice on deck care, stain selection, and seasonal maintenance.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLE_TEASERS.map((a) => (
              <article
                key={a.slug}
                className="group rounded-2xl bg-white border border-transparent p-8 shadow-sm hover:shadow-md hover:border-forest-light/20 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-forest mb-5">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold text-wood-dark group-hover:text-forest transition-colors">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-wood-light">
                  {a.excerpt}
                </p>
                <Link
                  href={`/articles/${a.slug}`}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-forest hover:text-forest-light transition-colors"
                >
                  Read Article
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <ContactCTA />
    </>
  );
}
