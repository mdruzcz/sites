import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import QuoteFab from "@/components/QuoteFab";
import { site, services, cities } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hot Tub Pads | Expert Concrete Pad Installation in Ontario",
  description:
    "Professional hot tub pad installation across Ontario. Durable, level concrete and gravel foundations for hot tubs, swim spas, and outdoor structures. Free quotes.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hot Tub Pads | Expert Concrete Pad Installation in Ontario",
    description:
      "Professional hot tub pad installation across Ontario. Durable, level concrete and gravel foundations for hot tubs and swim spas.",
    url: "https://hottubpads.ca",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1024,
        height: 683,
        alt: "Professional hot tub pad installation by Hot Tub Pads in Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hot Tub Pads | Expert Concrete Pad Installation in Ontario",
    description:
      "Professional hot tub pad installation across Ontario. Durable, level concrete and gravel foundations.",
    images: ["/images/hero-bg.jpg"],
  },
};

/* ─── JSON-LD Structured Data ─── */

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description:
    "Professional hot tub pad installation across Ontario. Durable concrete and gravel foundations for hot tubs, swim spas, and outdoor structures.",
  url: site.url,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  areaServed: cities.map((c) => ({
    "@type": "City",
    name: `${c.name}, ${c.region}`,
  })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "15:00",
    },
  ],
  image: `${site.url}/images/hero-bg.jpg`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How thick should a concrete hot tub pad be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We recommend 4-6 inches of reinforced concrete for most hot tubs. Larger swim spas may require additional thickness and reinforcement to support the extra weight.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a hot tub pad installation take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most hot tub pad installations are completed within 2 days. This includes excavation, gravel base preparation, formwork, concrete pouring, and finishing. The concrete needs 24-48 hours to cure before placing your hot tub.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a concrete pad for my hot tub?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A concrete pad is the best foundation for most hot tubs and swim spas. It provides a level, stable, and durable surface that prevents shifting, sinking, or damage over time. Gravel pads are a budget-friendly alternative for lighter hot tubs.",
      },
    },
  ],
};

/* ─── Why Choose Us Data ─── */

const whyChooseUs = [
  {
    title: "Specialized in Hot Tub & Swim Spa Pads",
    description:
      "We focus exclusively on hot tub and swim spa pad installations. This specialization means we understand the exact requirements for weight distribution, drainage, and leveling that your spa demands.",
    icon: (
      <svg
        className="h-8 w-8 text-orange"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
        />
      </svg>
    ),
  },
  {
    title: "High-Quality Concrete & Finishing",
    description:
      "Every pad is poured with 32 MPA reinforced concrete and finished with a professional broom texture for slip resistance. We use rebar and wire mesh reinforcement to ensure your pad lasts for decades.",
    icon: (
      <svg
        className="h-8 w-8 text-orange"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17l-5.58-3.4a1.006 1.006 0 010-1.72l5.58-3.4a1 1 0 011.16 0l5.58 3.4a1.006 1.006 0 010 1.72l-5.58 3.4a1 1 0 01-1.16 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.84 11.77L11.42 15.17a1 1 0 001.16 0l5.58-3.4"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.84 15.77l5.58 3.4a1 1 0 001.16 0l5.58-3.4"
        />
      </svg>
    ),
  },
  {
    title: "Fast Turnaround",
    description:
      "Most hot tub pad installations are completed in just 2 days. We handle everything from excavation and gravel base preparation to the final concrete pour and finishing, so your spa is ready to go quickly.",
    icon: (
      <svg
        className="h-8 w-8 text-orange"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

/* ─── Custom Pads Data ─── */

const customPadItems = [
  {
    title: "Swim Spas",
    description:
      "Heavy-duty reinforced concrete pads built to support the extra weight and water movement of full-size swim spas and resistance pools.",
  },
  {
    title: "Gazebos & Pergolas",
    description:
      "Level concrete foundations for backyard gazebos, pergolas, and covered structures that need a solid, permanent base.",
  },
  {
    title: "Outdoor Kitchens",
    description:
      "Custom-sized pads for outdoor kitchen islands, built-in grills, and entertaining areas that require a clean, level surface.",
  },
  {
    title: "Fire Pits & Seating Areas",
    description:
      "Safe, level concrete pads for fire pits, seating walls, and backyard gathering spaces designed for year-round enjoyment.",
  },
];

/* ─── Page Component ─── */

export default function HomePage() {
  return (
    <>
      {/* Structured Data — rendered as raw <script> so crawlers without JS see it */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <NavBar />
      <Hero />

      {/* ═══════════════ Intro Section ═══════════════ */}
      <section className="bg-light-bg py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text Column */}
            <div>
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-orange">
                Helping You Enjoy
              </span>
              <h2 className="mb-6 font-display text-3xl font-bold text-navy md:text-4xl">
                Expert Hot Tub Pad Installation in Ontario
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-muted">
                Every hot tub and swim spa needs a solid, level foundation to
                perform safely and last for years. We specialize in building
                durable concrete and gravel pads that are precisely leveled,
                properly drained, and reinforced to handle the weight of your
                spa. Whether you&apos;re installing a new hot tub or upgrading
                an existing base, our team delivers a foundation you can
                count on.
              </p>
              <Link
                href="/contact-us"
                className="inline-flex min-h-11 items-center rounded-full bg-orange px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-orange-dark"
              >
                Get A Free Quote
              </Link>
            </div>

            {/* Image Column */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/hero-bg.jpg"
                alt="Finished concrete hot tub pad installation in a backyard in Ontario"
                width={720}
                height={480}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ About Teaser ═══════════════ */}
      <section className="bg-off-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="mb-6 font-display text-3xl font-bold text-navy md:text-4xl">
            Specialized Hot Tub Pad Contractor
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-slate-muted">
            We&apos;re not a general contractor &mdash; we focus exclusively on
            building durable, precisely leveled pads for hot tubs, swim spas,
            and outdoor structures. Every pad is poured with 32 MPA reinforced
            concrete and finished to professional standards, giving your
            investment the foundation it deserves. From site preparation to the
            final broom finish, we handle every detail so you can enjoy your
            backyard sooner.
          </p>
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center rounded-full border-2 border-navy px-8 py-3 text-base font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* ═══════════════ Service Areas ═══════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-navy md:text-4xl">
              Our Service Areas
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">
              We install professional hot tub pads across southwestern Ontario.
              Find your city below to learn more.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <div
                key={city.slug}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
              >
                <h3 className="mb-3 font-display text-xl font-bold text-navy">
                  {city.name}, {city.region}
                </h3>
                <p className="mb-5 line-clamp-3 text-slate-muted">
                  Professional hot tub pad installation in {city.name} and
                  surrounding areas including{" "}
                  {city.neighbourhoods.slice(0, 3).join(", ")}.
                </p>
                <Link
                  href={`/${city.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-orange transition-colors hover:text-orange-dark"
                >
                  Learn More
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ Why Choose Us ═══════════════ */}
      <section className="bg-light-bg py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-navy md:text-4xl">
              Why Choose Us
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">
              When it comes to your hot tub pad, experience and specialization
              matter. Here&apos;s why homeowners across Ontario trust us.
            </p>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Cards Column */}
            <div className="space-y-6">
              {whyChooseUs.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-5 rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-pale">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="mb-2 font-display text-lg font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="text-slate-muted">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Image Column */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/hot-tub-pad-hero.jpg"
                alt="Completed hot tub pad with broom finish ready for spa installation in Ontario"
                width={720}
                height={540}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ Custom Pads Section ═══════════════ */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
              Custom Concrete Pads for More Than Just Hot Tubs
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Our expertise extends beyond hot tubs. We build custom concrete
              pads for a variety of outdoor structures and features.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {customPadItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <h3 className="mb-3 font-display text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <Footer />
      <QuoteFab />
    </>
  );
}
