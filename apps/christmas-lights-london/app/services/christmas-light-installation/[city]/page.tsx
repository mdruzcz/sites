import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Phone, Star } from "lucide-react";
import { site } from "@/lib/site";
import { getServiceAreaBySlug, getServices, getTestimonials } from "@/lib/content";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const CITY_SLUGS = ["london", "kitchener", "hamilton", "mississauga", "brantford"];

export async function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);
  if (!area) return {};

  return {
    title: `Christmas Light Installation in ${area.city}, ON | Christmas Lights London`,
    description: `Professional Christmas light installation in ${area.city}, Ontario. Custom-cut LED lights, no ladders, aerial lift equipment, season guarantee. Get a free quote today.`,
    openGraph: {
      title: `Christmas Light Installation in ${area.city}, ON`,
      description: `Professional Christmas light installation in ${area.city}, Ontario. Custom-cut LED lights, 7-person team, aerial lifts. Full installation, maintenance & takedown.`,
      url: `${site.url}/services/christmas-light-installation/${city}`,
    },
  };
}

const cityContent: Record<string, { intro: string; neighborhoods: string; extra: string }> = {
  london: {
    intro: `London, Ontario is our home base, and we&apos;re proud to serve all neighbourhoods across the city — from Byron and Lambeth in the west to Masonville and Old North in the north, and everywhere in between. We know London homes, and we know how to make them shine at Christmas.`,
    neighborhoods: "Byron, Lambeth, Old North, Masonville, Wortley Village, White Oaks, South London, Argyle, Whitehills",
    extra: `As London&apos;s dedicated Christmas light installers, we&apos;ve helped hundreds of local homeowners enjoy a stunning holiday display without climbing a single ladder. Our team lives and works here — we&apos;re your neighbours.`,
  },
  kitchener: {
    intro: `Serving Kitchener homeowners and businesses with professional holiday lighting installations. We bring the same precision, professional-grade LED lights, and full-service experience to Kitchener that we&apos;re known for across Southwestern Ontario.`,
    neighborhoods: "Downtown Kitchener, Doon, Forest Heights, Pioneer Park, Laurentian Hills, Beechwood, Idlewood",
    extra: `Our aerial lift vehicles mean we can safely and efficiently install lights on any Kitchener property, from heritage homes downtown to modern builds in the newer subdivisions.`,
  },
  hamilton: {
    intro: `Professional Christmas light installation for Hamilton homes and commercial properties. Our team brings the holiday spirit to the Steel City with expert lighting displays designed to complement Hamilton&apos;s diverse architecture.`,
    neighborhoods: "Ancaster, Dundas, Stoney Creek, Binbrook, Waterdown, Flamborough, Glanbrook",
    extra: `We serve all corners of Hamilton and the surrounding communities. Whether you&apos;re in the escarpment neighbourhoods or the lower city, our team arrives fully equipped to deliver a stunning Christmas display.`,
  },
  mississauga: {
    intro: `Transform your Mississauga home or commercial property with a stunning professional Christmas light display. We bring expert installation, custom-cut LED lights, and our 7-person team to serve all Mississauga neighbourhoods with our aerial lift equipment.`,
    neighborhoods: "Port Credit, Streetsville, Meadowvale, Erin Mills, Clarkson, Lakeview, Mississauga Valleys",
    extra: `Mississauga plazas and commercial properties benefit especially from our professional-grade commercial lighting. We help businesses attract customers and stand out during the busiest shopping season of the year.`,
  },
  brantford: {
    intro: `Bringing professional holiday lighting to Brantford and surrounding areas. Make your Brantford home or business stand out this Christmas season with a custom light display installed safely by our trained team with aerial lift equipment.`,
    neighborhoods: "Brant County, Paris, St. George, Burford, Oakland, Mount Pleasant",
    extra: `Brantford families have been trusting Christmas Lights London for beautiful, hassle-free holiday displays. We serve the city and all of Brant County with the same professional service.`,
  },
};

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);

  if (!area || !CITY_SLUGS.includes(city)) {
    notFound();
  }

  const services = getServices();
  const testimonials = getTestimonials().slice(0, 3);
  const content = cityContent[city] || {
    intro: `We provide professional Christmas light installation in ${area.city}, Ontario. Our 7-person team brings custom-cut LED lights, aerial lift equipment, and a season-long guarantee to your property.`,
    neighborhoods: area.city,
    extra: `Contact us today for a free quote on professional Christmas light installation in ${area.city}.`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              `Christmas Light Installation in ${area.city}, ON`,
              `Professional Christmas light installation in ${area.city}, Ontario. Custom-cut LED lights, no ladders, 7-person team with aerial lifts. Installation, maintenance & takedown.`,
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
              { name: "Christmas Light Installation", url: `${site.url}/services/christmas-light-installation/${city}` },
              { name: area.city, url: `${site.url}/services/christmas-light-installation/${city}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative bg-[var(--dark-bg)] py-24 md:py-32 overflow-hidden">
        <Image
          src="/images/Christmaslights.jpg"
          alt={`Professional Christmas light installation in ${area.city}, Ontario`}
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/60 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Serving {area.city}, Ontario
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Christmas Light Installation in{" "}
            <span className="text-[var(--accent)]">{area.city}, ON</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Professional Christmas light installation for {area.city} homes and businesses.
            Custom-cut LED lights, no ladders, full-service from installation to takedown.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary text-base min-h-[52px] px-10">
              Get a Free Quote
            </Link>
            <a
              href={site.phoneHref}
              className="btn btn-ghost text-base min-h-[52px] px-10 flex items-center gap-2 justify-center"
            >
              <Phone className="h-5 w-5" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Local Intro */}
      <section className="bg-[var(--background)] py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
                {area.city}, Ontario
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-5"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Professional Christmas Lights in {area.city}
              </h2>
              <p
                className="text-[var(--muted)] text-base leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: content.intro.replace(/&apos;/g, "'") }}
              />
              <p
                className="text-[var(--muted)] text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content.extra.replace(/&apos;/g, "'") }}
              />
            </div>
            <div className="card p-7">
              <h3
                className="font-bold text-[var(--foreground)] text-xl mb-5"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Our {area.city} Service Includes:
              </h3>
              <ul className="space-y-3">
                {[
                  "Free property quote",
                  "Custom-cut professional LED lights",
                  "No ladders — aerial lift equipment",
                  "7-person professional team",
                  "Timer installation & programming",
                  "Season-long maintenance guarantee",
                  "End-of-season takedown & storage",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[var(--muted)]">
                    <CheckCircle className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {content.neighborhoods && (
            <div className="mt-10 card p-5">
              <p className="text-sm text-[var(--muted)]">
                <span className="font-semibold text-[var(--foreground)]">
                  {area.city} neighbourhoods we serve:
                </span>{" "}
                {content.neighborhoods}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Services in this city */}
      <section className="bg-[var(--dark-bg)] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            What We Offer in {area.city}
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-white mb-10"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Our Services
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {services.map((service) => (
              <div key={service.slug} className="card-dark p-6">
                <h3
                  className="font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[var(--background)] py-16 md:py-20">
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
          <div className="space-y-5">
            {[
              { n: "01", title: "Contact Us", desc: `Tell us your ${area.city} address and we&apos;ll review your property on Google Maps to prepare a free quote.` },
              { n: "02", title: "Receive Your Free Quote", desc: "We&apos;ll send a customized proposal within 1 business day with everything included." },
              { n: "03", title: "We Install Your Lights", desc: `Our team arrives at your ${area.city} property and installs custom-cut lights with professional equipment.` },
              { n: "04", title: "We Maintain All Season", desc: "We&apos;re on call all season for any adjustments or repairs — no extra charge." },
              { n: "05", title: "We Take Down & Store", desc: "After the season, we remove, label, and store everything for next year." },
            ].map((step) => (
              <div key={step.n} className="flex gap-5 card p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-bold text-xs">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] mb-1 text-sm">{step.title}</h3>
                  <p
                    className="text-xs text-[var(--muted)] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: step.desc.replace(/&apos;/g, "'") }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--dark-surface)] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            What Clients Say
          </p>
          <h2
            className="text-center text-3xl font-bold text-white mb-10"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Happy Clients Across Ontario
          </h2>
          <div className="grid gap-5 md:grid-cols-3 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="card-dark p-6">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]" />
                  ))}
                </div>
                <p className="text-sm text-white/60 leading-relaxed italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-xs text-white/40 font-medium">{t.author} · {t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--accent)] py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Ready to Light Up Your {area.city} Home?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get your free, no-obligation quote for professional Christmas light installation in {area.city}, Ontario.
            Slots fill fast — book early to secure your preferred date.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn bg-white text-[var(--accent)] hover:bg-white/90 min-h-[52px] px-10 text-base font-bold"
            >
              Get a Free Quote
            </Link>
            <a
              href={site.phoneHref}
              className="btn border-2 border-white/50 text-white hover:border-white min-h-[52px] px-10 text-base flex items-center gap-2 justify-center"
            >
              <Phone className="h-5 w-5" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
