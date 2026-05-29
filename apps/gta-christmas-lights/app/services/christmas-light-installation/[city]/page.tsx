import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle,
  Phone,
  Star,
  MapPin,
  ShieldCheck,
  Sparkles,
  Calendar,
} from "lucide-react";
import { site } from "@/lib/site";
import {
  getServiceAreaBySlug,
  getServices,
  getFeaturedTestimonials,
  getServiceAreas,
  getFeaturedFaqs,
} from "@/lib/content";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";
import { FaqAccordion } from "@/components/FaqAccordion";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getServiceAreas().map((a) => ({ city: a.slug }));
}

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);
  if (!area) return {};

  const title = `Christmas Light Installation in ${area.city}, ON | GTA Christmas Lights`;
  const description = `Professional Christmas light installation in ${area.city}, Ontario. Rental or purchase, custom design, professional-grade LED lights, full-service from install to takedown. Free quote from a photo.`;

  return {
    title,
    description,
    openGraph: {
      title: `Professional Christmas Lights in ${area.city}, ON`,
      description,
      url: `${site.url}/services/christmas-light-installation/${city}`,
      images: [
        {
          url: area.heroImage,
          alt: `Professional Christmas light installation in ${area.city}, Ontario by GTA Christmas Lights`,
        },
      ],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);
  if (!area) notFound();

  const services = getServices();
  const testimonials = getFeaturedTestimonials().slice(0, 3);
  const faqs = getFeaturedFaqs().slice(0, 5);
  const otherCities = getServiceAreas()
    .filter((a) => a.slug !== city)
    .slice(0, 8);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              `Christmas Light Installation in ${area.city}, ON`,
              `Professional Christmas light installation in ${area.city}, Ontario. Rental or purchase, custom design, professional-grade LED lights, full-service from design through storage.`,
              area.city
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
              {
                name: "Christmas Light Installation",
                url: `${site.url}/services/christmas-light-installation`,
              },
              {
                name: area.city,
                url: `${site.url}/services/christmas-light-installation/${city}`,
              },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      {/* HERO with form inline — landing page style */}
      <section className="relative bg-[var(--dark-bg)] overflow-hidden">
        <Image
          src={area.heroImage}
          alt={`Professional Christmas light installation on home in ${area.city}, Ontario by GTA Christmas Lights`}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark-bg)]/85 via-[var(--dark-bg)]/65 to-[var(--dark-bg)]/85" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 mb-5">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent-gold)]" />
                <span className="text-[var(--accent-gold)] text-xs font-medium tracking-widest uppercase">
                  Serving {area.city}, Ontario
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05]"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Christmas Light Installation in{" "}
                <span className="text-[var(--accent-gold)]">{area.city}</span>
              </h1>
              <p className="mt-5 text-lg text-white/80 leading-relaxed">
                Custom design, professional-grade LED lights, full-service
                install to takedown. The {area.city} team that takes the
                worst part of the holidays off your plate.
              </p>
              <div className="mt-7 grid sm:grid-cols-2 gap-3 max-w-md">
                {[
                  "Free quote from a photo",
                  "Professional LED lights",
                  "Rental or purchase",
                  "Fully insured · WSIB",
                ].map((b) => (
                  <div
                    key={b}
                    className="flex items-center gap-2 text-sm text-white/85"
                  >
                    <CheckCircle className="h-4 w-4 text-[var(--accent-gold)]" />
                    {b}
                  </div>
                ))}
              </div>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <a
                  href="#quote"
                  className="btn btn-primary px-8 text-base"
                >
                  Get My Free Quote
                </a>
                <a
                  href={site.phoneHref}
                  className="btn btn-ghost px-8 text-base"
                >
                  <Phone className="h-4 w-4" />
                  {site.phone}
                </a>
              </div>
              <div className="mt-8 flex items-center gap-4 text-xs text-white/50">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-3.5 w-3.5 fill-[var(--accent-gold)] text-[var(--accent-gold)]"
                    />
                  ))}
                </div>
                <span>
                  Loved by {area.city} homeowners &amp; businesses
                </span>
              </div>
            </div>

            {/* Inline quote form */}
            <div
              id="quote"
              className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl scroll-mt-24"
            >
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                <span className="text-[var(--accent)] text-xs font-bold tracking-widest uppercase">
                  Free Quote · {area.city}
                </span>
              </div>
              <h2
                className="text-2xl font-bold text-[var(--foreground)] mb-1"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Light up your {area.city} home.
              </h2>
              <p className="text-sm text-[var(--muted)] mb-5">
                Tell us about your property — we&apos;ll respond within 1
                business day with a custom quote.
              </p>
              <QuoteForm defaultCity={area.city} showPromise />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-[var(--accent)] text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Free Quote From a Photo
            </span>
            <span className="opacity-50">·</span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Fully Insured &amp; WSIB
            </span>
            <span className="opacity-50">·</span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Oct 1 – Jan 31 Season
            </span>
          </div>
        </div>
      </section>

      {/* LOCAL INTRO */}
      <section className="bg-[var(--background)] py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
            <div>
              <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
                {area.city}, Ontario
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-5"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Why {area.city} Trusts GTA Christmas Lights
              </h2>
              <p className="text-[var(--muted)] text-base leading-relaxed mb-4">
                {area.intro}
              </p>
              <p className="text-[var(--muted)] text-base leading-relaxed">
                {area.extra}
              </p>
            </div>
            <div className="card p-6 bg-[var(--evergreen)] text-white border-none">
              <h3
                className="font-bold text-white text-lg mb-4"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                {area.city} Service Includes:
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Free on-site quote",
                  "Custom design by award-winning team",
                  "Commercial-grade LED lights",
                  "Custom-cut to fit your home",
                  "Programmable timer setup",
                  "Season-long maintenance",
                  "In-season maintenance included",
                  "End-of-season takedown",
                  "Climate-controlled storage",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-white/85"
                  >
                    <CheckCircle className="h-4 w-4 shrink-0 text-[var(--accent-gold)] mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#quote"
                className="btn btn-gold w-full mt-6 justify-center"
              >
                Get Free Quote
              </a>
            </div>
          </div>

          {area.neighborhoods && (
            <div className="mt-10 card p-6 bg-[var(--surface)]">
              <p className="text-sm text-[var(--muted)]">
                <span className="font-semibold text-[var(--foreground)]">
                  {area.city} neighbourhoods we serve:
                </span>{" "}
                {area.neighborhoods}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* GALLERY — local feel */}
      <section className="bg-[var(--dark-bg)] py-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Real GTA Installs
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-white mb-10"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Recent Work Near {area.city}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: "/images/project-night-1.jpg", alt: `Christmas lights installation at night near ${area.city}` },
              { src: "/images/project-night-2.jpg", alt: `Custom roofline Christmas lighting near ${area.city}` },
              { src: "/images/project-night-3.jpg", alt: `Warm-white Christmas lights near ${area.city}` },
              { src: "/images/project-night-4.jpg", alt: `Multi-colour Christmas display near ${area.city}` },
              { src: "/images/project-night-5.jpg", alt: `Estate Christmas display near ${area.city}` },
              { src: "/images/service-tree.jpg", alt: `Tree lighting installation near ${area.city}` },
              { src: "/images/service-holiday.jpg", alt: `Holiday lighting display near ${area.city}` },
              { src: "/images/service-permanent.jpg", alt: `Permanent LED lighting near ${area.city}` },
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

      {/* PRICING SNAPSHOT */}
      <section className="bg-[var(--background)] py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Investment
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-3"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            What Christmas Lights Cost in {area.city}
          </h2>
          <p className="text-center text-[var(--muted)] mb-10 max-w-2xl mx-auto">
            Most {area.city} installations land in these ranges. Year two costs
            45–55% less because you already own the lights.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                tier: "Classic",
                price: "From $1,500",
                desc: "Refined roofline + entrance wreath. Ideal for smaller homes and condos.",
              },
              {
                tier: "Signature",
                price: "From $2,900",
                desc: "Roofline + garlands + lit shrubs + multiple wreaths. Our most popular package.",
                featured: true,
              },
              {
                tier: "Estate",
                price: "From $4,500",
                desc: "Full property: wrapped trees, accent lighting, custom-designed display.",
              },
            ].map((p) => (
              <div
                key={p.tier}
                className={`card p-7 ${
                  p.featured
                    ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/20"
                    : ""
                }`}
              >
                {p.featured && (
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] block mb-2">
                    Most Popular
                  </span>
                )}
                <h3
                  className="text-xl font-bold text-[var(--foreground)] mb-1"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  {p.tier}
                </h3>
                <p className="text-[var(--accent)] font-bold mb-3">{p.price}</p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#quote" className="btn btn-primary px-8">
              Get a Custom Quote
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES IN THIS CITY */}
      <section className="bg-[var(--dark-bg)] py-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Available in {area.city}
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-white mb-10"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Every Service We Offer
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card-dark p-6 hover:border-[var(--accent-gold)]/50 transition-colors group block"
              >
                <h3
                  className="font-bold text-white mb-2 group-hover:text-[var(--accent-gold)] transition-colors"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm text-white/65 leading-relaxed">
                  {service.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[var(--background)] py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            How It Works
          </p>
          <h2
            className="text-center text-3xl font-bold text-[var(--foreground)] mb-10"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Our Process for {area.city} Properties
          </h2>
          <div className="space-y-4">
            {[
              {
                n: "01",
                title: "Contact Us",
                desc: `Tell us your ${area.city} address. We'll review your property and book a design visit.`,
              },
              {
                n: "02",
                title: "Custom Design",
                desc: `A designer visits your ${area.city} home, measures, photographs, and renders a custom display.`,
              },
              {
                n: "03",
                title: "Free Quote",
                desc: "We send a transparent quote with everything included — no hidden fees, no surprises.",
              },
              {
                n: "04",
                title: "Professional Install",
                desc: `Our crew arrives at your ${area.city} property with custom-cut LED lights and aerial-lift equipment.`,
              },
              {
                n: "05",
                title: "Season-Long Care",
                desc: "We're on standby all season. A bulb burns out — we replace it. Display stops working — we fix it.",
              },
              {
                n: "06",
                title: "Takedown & Storage",
                desc: "After the season we remove everything, inventory it, and store it labelled for next year.",
              },
            ].map((step) => (
              <div key={step.n} className="flex gap-5 card p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-bold text-sm">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] mb-1 text-sm">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--dark-surface)] py-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Reviews
          </p>
          <h2
            className="text-center text-3xl font-bold text-white mb-10"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            GTA Homeowners Love Us
          </h2>
          <div className="grid gap-5 md:grid-cols-3 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="card-dark p-6">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]"
                    />
                  ))}
                </div>
                <p className="text-sm text-white/75 leading-relaxed italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-xs text-white/55">
                  <strong className="text-white/85">{t.author}</strong> ·{" "}
                  {t.location} · {t.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--background)] py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Questions
          </p>
          <h2
            className="text-center text-3xl font-bold text-[var(--foreground)] mb-10"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            {area.city} Christmas Lighting FAQs
          </h2>
          <FaqAccordion faqs={faqs} />
          <div className="text-center mt-7">
            <Link
              href="/faq"
              className="text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* OTHER CITIES */}
      <section className="bg-[var(--dark-bg)] py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/55 text-xs tracking-[0.25em] uppercase font-semibold mb-4">
            Also Serving
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/services/christmas-light-installation/${c.slug}`}
                className="px-4 py-2 rounded-full text-sm border border-[var(--border-dark)] text-white/65 hover:border-[var(--accent-gold)] hover:text-white transition-colors"
              >
                {c.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[var(--accent)] py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Ready to Light Up Your {area.city} Home?
          </h2>
          <p className="text-white/85 text-lg mb-8">
            Free, no-obligation quote. Slots fill fast — book early to secure
            your preferred install date in {area.city}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#quote"
              className="btn bg-white text-[var(--accent)] hover:bg-white/90 px-10 font-bold"
            >
              Get a Free Quote
            </a>
            <a
              href={site.phoneHref}
              className="btn border-2 border-white/50 text-white hover:border-white px-10"
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
