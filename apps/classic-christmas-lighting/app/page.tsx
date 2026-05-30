import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle, Phone, MapPin } from "lucide-react";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { getServices, getTestimonials, getFeaturedFaqs, getServiceAreas } from "@/lib/content";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Professional Christmas Light Installation Kitchener-Waterloo | Classic Christmas Lighting",
  description:
    "Classic Christmas Lighting — professional Christmas light installation in Kitchener-Waterloo, Guelph, Cambridge, Hamilton & Southern Ontario. Family-owned, 15 years experience. Get a free quote today.",
  openGraph: {
    title: "Professional Christmas Light Installation in Kitchener-Waterloo",
    description:
      "Family-owned Christmas lighting specialists serving Kitchener-Waterloo and Southern Ontario. Custom LED displays, full installation & takedown. Get your free quote.",
    url: site.url,
    images: [{ url: "/images/Classic-Christmas-Lighting.webp", alt: "Professional Christmas light installation in Kitchener-Waterloo Ontario" }],
  },
};

const trustStats = [
  { value: "15+", label: "Years Experience" },
  { value: "250+", label: "Homes & Businesses" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "7", label: "Cities Served" },
];

const processSteps = [
  {
    number: "01",
    title: "Free Design Consultation",
    description: "We discuss your vision, review your property, and design a custom lighting plan that fits your home or business perfectly.",
  },
  {
    number: "02",
    title: "Professional Installation",
    description: "Our experienced team arrives on your scheduled date and professionally installs every light, ensuring a flawless, bright display.",
  },
  {
    number: "03",
    title: "Season-Long Maintenance",
    description: "We stay on-call throughout the holiday season. If anything needs attention, we come back at no extra charge.",
  },
  {
    number: "04",
    title: "Hassle-Free Takedown",
    description: "After the holidays, we carefully remove every component, leaving your property exactly as we found it.",
  },
];

const whyChooseUs = [
  {
    title: "Energy-Efficient LED Lights",
    desc: "We use only commercial-grade LED lights — up to 75% less energy than traditional bulbs while delivering brighter, more vibrant colour.",
  },
  {
    title: "Fully Insured & Professional",
    desc: "Classic Christmas Lighting is fully insured. Our trained crew treats your property with complete respect from start to finish.",
  },
  {
    title: "No-Stress Service",
    desc: "We handle everything — design, installation, maintenance, and takedown. You just enjoy the holidays without climbing a single ladder.",
  },
  {
    title: "Family-Owned Since 2023",
    desc: "We're a local, family-operated business that genuinely cares about every client. Your holiday display matters to us as much as it does to you.",
  },
];

export default function HomePage() {
  const services = getServices();
  const testimonials = getTestimonials();
  const featuredFaqs = getFeaturedFaqs();
  const serviceAreas = getServiceAreas();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.url }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(featuredFaqs)) }} />

      {/* 1. HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[var(--dark-bg)]">
        <Image
          src="/images/Classic-Christmas-Lighting.webp"
          alt="Stunning professional Christmas light installation on a home in Kitchener-Waterloo Ontario"
          fill
          className="object-cover opacity-45"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/60 via-[var(--dark-bg)]/20 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-[var(--accent-gold)] text-sm tracking-[0.3em] uppercase mb-5 font-medium">
            Kitchener-Waterloo &amp; Southern Ontario
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Professional Christmas Light Installation in{" "}
            <span className="text-[var(--accent)]">Kitchener-Waterloo</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
            Family-owned &amp; operated. 15 years of experience. We design, install, maintain, and take down your holiday lights — completely hands-free for you.
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
              Family-owned &amp; operated
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[var(--accent-gold)]" />
              Fully insured
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[var(--accent-gold)]" />
              No travel charges
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
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          <div className="relative min-h-[400px] lg:min-h-full">
            <Image
              src="/images/Classic-Christmas-Lighting-Residential-Light-Installation.jpg"
              alt="Classic Christmas Lighting team professionally installing Christmas lights on a residential home in Kitchener-Waterloo"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)]/30 to-transparent" />
          </div>
          <div className="bg-[var(--background)] px-8 py-14 lg:px-14 flex flex-col justify-center">
            <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
              Why Choose Classic Christmas Lighting
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-8"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              Kitchener-Waterloo&apos;s Trusted Holiday Lighting Specialists
            </h2>
            <div className="space-y-6">
              {whyChooseUs.map((f) => (
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
              Our Story →
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
            Stunning Holiday Displays We&apos;ve Created
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { src: "/images/Christmas-LIghting-For-Homes-Kitchener-Waterloo.jpg", alt: "Beautiful residential Christmas lights on a Kitchener-Waterloo home by Classic Christmas Lighting" },
              { src: "/images/Christmas-LIght-Installation-For-Businesses-Guelph.jpg", alt: "Professional commercial Christmas lighting on a Guelph business by Classic Christmas Lighting" },
              { src: "/images/Christmas-Lighting-Guelph.jpg", alt: "Stunning Christmas lights in Guelph Ontario installed by Classic Christmas Lighting" },
              { src: "/images/Home-About-Sec_2.jpg", alt: "Classic Christmas Lighting team installing professional holiday lights" },
              { src: "/images/new-pic-2.png", alt: "Professional Christmas lighting installation by Classic Christmas Lighting in Southern Ontario" },
              { src: "/images/new-pic-services-3.jpg", alt: "Holiday lighting installation services by Classic Christmas Lighting" },
            ].map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
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
            Full-Service Holiday Lighting for Homes &amp; Businesses
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3
                    className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg leading-tight"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                  >
                    {service.title}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{service.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors">
                    Learn More →
                  </span>
                </div>
              </Link>
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
                Simple &amp; Stress-Free From Start to Finish
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
                      <h3 className="font-bold text-white mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/images/new-pic-services-1.jpg"
                  alt="Classic Christmas Lighting team installing commercial Christmas lights in Southern Ontario"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-col gap-3 mt-8">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="/images/new-pic-services-2.jpg"
                    alt="Professional Christmas decoration installation by Classic Christmas Lighting"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="/images/Home-About-Sec_2.jpg"
                    alt="Christmas lights installation process - Classic Christmas Lighting team at work"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SPLIT SECTION — residential vs commercial */}
      <section className="bg-[var(--background)]">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[480px]">
            <Image
              src="/images/Christmas-LIghting-For-Homes-Kitchener-Waterloo.jpg"
              alt="Beautiful residential Christmas lights on a home in Kitchener-Waterloo Ontario"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)]/80 to-[var(--dark-bg)]/10" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-xs text-[var(--accent-gold)] tracking-[0.2em] uppercase font-semibold">For Homeowners</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-3" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                Make Your Home Shine
              </h3>
              <p className="text-white/70 text-sm mb-5">Custom LED roofline lights, tree wrapping, and full decorations. The best-looking home on your street — guaranteed.</p>
              <Link href="/services/christmas-lighting-for-homes" className="btn btn-primary min-h-[44px]">
                Residential Services
              </Link>
            </div>
          </div>
          <div className="relative min-h-[480px]">
            <Image
              src="/images/Christmas-LIght-Installation-For-Businesses-Guelph.jpg"
              alt="Professional commercial Christmas lighting on a business in Guelph Ontario"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)]/80 to-[var(--dark-bg)]/10" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-xs text-[var(--accent-gold)] tracking-[0.2em] uppercase font-semibold">For Businesses</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-3" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                Attract Holiday Customers
              </h3>
              <p className="text-white/70 text-sm mb-5">Transform your storefront or building into a festive destination. Professional commercial lighting that drives foot traffic.</p>
              <Link href="/services/christmas-lighting-for-businesses" className="btn btn-primary min-h-[44px]">
                Commercial Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="bg-[var(--dark-surface)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Client Reviews
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            What Our Clients Say
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials
              .filter((t) => t.featured)
              .map((t, i) => (
                <div key={i} className="bg-[var(--dark-bg)] rounded-xl p-6 flex flex-col border border-[var(--border-dark)]">
                  <div className="flex mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-5 flex-1 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.author}</p>
                    <p className="text-xs text-[var(--accent-gold)]">{t.location}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 9. CTA BANNER with large image */}
      <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/Classic-Christmas-Lighting-Residential-Light-Installation.jpg"
          alt="Classic Christmas Lighting professional holiday display on a Kitchener-Waterloo home"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--dark-bg)]/70" />
        <div className="relative z-10 text-center px-4">
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Book Early — Slots Fill Fast
          </h2>
          <p className="text-white/75 text-base mb-7 max-w-xl mx-auto">
            We recommend booking in September or October. Don&apos;t miss your preferred installation date.
          </p>
          <Link href="/contact" className="btn btn-primary min-h-[52px] text-base px-10">
            Reserve My Spot
          </Link>
        </div>
      </section>

      {/* 10. FAQ */}
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

      {/* 11. SERVICE AREAS */}
      <section className="bg-[var(--dark-surface)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
                Where We Work
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Serving Kitchener-Waterloo &amp; Beyond
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                We travel to customers throughout the Kitchener-Waterloo region and Southern Ontario. We never charge for travel within our service area.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {serviceAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/service-areas/${area.slug}`}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--border-dark)] text-white/70 hover:text-white hover:border-[var(--accent-gold)] transition-colors text-sm"
                  >
                    <MapPin className="h-3.5 w-3.5 text-[var(--accent-gold)] shrink-0" />
                    {area.city}
                  </Link>
                ))}
              </div>
              <Link href="/service-areas" className="btn btn-ghost mt-8 min-h-[44px]">
                View All Service Areas
              </Link>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/Christmas-Lighting-Guelph.jpg"
                alt="Classic Christmas Lighting serving homes and businesses across Kitchener-Waterloo and Southern Ontario"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)]/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA with form */}
      <section className="bg-[var(--background)] py-20 md:py-24" id="quote">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div>
              <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
                Get Started Today
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-6"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Ready to Light Up Your Home This Christmas?
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-8">
                Fill out the form and we&apos;ll get back to you within one business day with a free, no-obligation quote tailored to your property.
              </p>
              <div className="space-y-4">
                {[
                  "Free consultation &amp; design",
                  "Professional-grade LED lights included",
                  "Full installation, maintenance &amp; takedown",
                  "Fully insured — no risk to you",
                  "No travel charges within our service area",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-4 w-4 text-[var(--accent)]" />
                    </div>
                    <span
                      className="text-sm text-[var(--foreground)]"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-[var(--border)]">
                <a href={site.phoneHref} className="flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent-dark)] font-semibold transition-colors">
                  <Phone className="h-5 w-5" />
                  {site.phone}
                </a>
              </div>
            </div>
            <div className="card p-7">
              <QuoteForm heading="Request Your Free Quote" showPromise />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
