import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { SERVICES, COMPANY_NAME, PHONE, EMAIL, DOMAIN } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Deck Staining Woodstock, Ontario | Deck Heroes",
  description:
    "Expert deck staining, sealing, refinishing & fence staining in Woodstock, Ontario. Serving Southside, Northend, Roth Park & surrounding areas. Free quotes from Deck Heroes.",
};

const neighborhoods = [
  "Southside",
  "Northend",
  "Huron Street Area",
  "Roth Park",
  "Vansittart Woods",
  "College Avenue Area",
];

const faqs = [
  {
    question: "How long does a deck staining project take in Woodstock?",
    answer:
      "Most residential deck staining projects in Woodstock take one to two days, depending on the size of the deck and the amount of preparation required. Larger decks or those needing significant sanding and repair may take up to three days. We always provide a clear timeline during your free quote.",
  },
  {
    question: "What stain colours work best for Woodstock homes?",
    answer:
      "Woodstock homes often feature classic Ontario architecture that pairs beautifully with warm, natural wood tones. Semi-transparent stains in cedar, honey, and walnut shades are popular choices that complement brick and stone exteriors common throughout the Southside and Northend neighbourhoods.",
  },
  {
    question: "Do you offer deck sealing as a standalone service in Woodstock?",
    answer:
      "Absolutely. Deck sealing is one of our most requested services in Woodstock. A quality sealant protects your deck from Oxford County's heavy spring rains and winter moisture without changing the wood's natural appearance. It's an excellent option for newer decks that don't yet need staining.",
  },
  {
    question: "Can you refinish a deck that has been neglected for years?",
    answer:
      "Yes, deck refinishing is our specialty. We regularly restore decks in Woodstock that have gone years without maintenance. Our process includes thorough cleaning, stripping of old finish, sanding, repairs to damaged boards, and a fresh application of premium stain or sealant.",
  },
  {
    question: "Do you provide free estimates in Woodstock?",
    answer:
      "Yes, every Woodstock homeowner receives a free, no-obligation on-site estimate. We assess your deck's condition, discuss your goals and colour preferences, and provide a detailed written quote — typically within 24 hours of our visit.",
  },
];

export default function WoodstockPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_NAME,
    description:
      "Professional deck staining, sealing, refinishing, and fence staining services in Woodstock, Ontario.",
    url: `https://${DOMAIN}/areas/woodstock`,
    telephone: PHONE,
    email: EMAIL,
    areaServed: {
      "@type": "City",
      name: "Woodstock",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Woodstock",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.1306,
      longitude: -80.7467,
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-wood-dark py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-bold text-cream sm:text-5xl">
            Professional Deck Staining &amp; Restoration in Woodstock, Ontario
          </h1>
          <p className="mt-6 text-lg text-sand leading-relaxed">
            Woodstock is known as the Friendly City, and your deck should be the
            friendliest spot on your property. Deck Heroes delivers expert wood
            care to homeowners throughout Oxford County.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Woodstock&apos;s Go-To Deck Care Team
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              Nestled in the heart of Oxford County, Woodstock is a community
              that values its outdoor living. From the scenic trails of Pittock
              Conservation Area to the charming streetscapes of downtown, this
              city blends small-town warmth with growing urban amenities. For
              homeowners here, a beautiful deck is not a luxury — it is an
              extension of the home.
            </p>
            <p>
              Woodstock&apos;s climate presents real challenges for exposed wood.
              The region sees substantial snowfall during winter, with repeated
              freeze-thaw cycles that force moisture deep into deck boards. Spring
              brings heavy rain, and summers deliver intense sun and humidity that
              accelerate fading and mildew growth. Without proper protection, even
              quality lumber can deteriorate rapidly.
            </p>
            <p>
              Deck Heroes brings professional-grade deck care to Woodstock
              homeowners who want lasting results. We combine thorough surface
              preparation with premium stains and sealants designed for Ontario
              conditions, ensuring your deck stands up to everything Oxford
              County&apos;s weather throws at it.
            </p>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-sand py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Neighbourhoods We Serve in Woodstock
          </h2>
          <p className="mt-4 text-wood-light leading-relaxed">
            Whether you live on the Southside near the hospital or in the
            established streets of the Northend, Deck Heroes is just a phone
            call away.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {neighborhoods.map((n) => (
              <div
                key={n}
                className="rounded-lg bg-cream px-4 py-3 text-center font-medium text-wood-dark shadow-sm"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Our Deck &amp; Fence Services in Woodstock
          </h2>
          <p className="mt-4 text-wood-light leading-relaxed">
            We provide comprehensive wood care services for Woodstock homes,
            from targeted sealing to full refinishing of aged decks.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-xl border border-sand/50 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-terracotta/40"
              >
                <h3 className="font-serif text-xl font-bold text-wood-dark group-hover:text-terracotta transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 text-wood-light leading-relaxed">
                  {s.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="bg-wood-dark py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-cream">
            Why Woodstock Homeowners Trust Deck Heroes
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Oxford County Knowledge",
                desc: "We know Woodstock's soil, climate, and building styles. Our recommendations are tailored to the specific conditions your deck faces in Oxford County.",
              },
              {
                title: "Quality Materials",
                desc: "We source premium stains and sealants from trusted Canadian suppliers, choosing products with superior UV and moisture resistance for lasting performance.",
              },
              {
                title: "Detail-Oriented Crew",
                desc: "Our team takes pride in the details — from taping off railings to protecting landscaping. We treat your property with the same care we would our own.",
              },
              {
                title: "Transparent Process",
                desc: "No surprises. We walk you through every step of the process, provide a clear written quote, and keep you informed from start to finish.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-wood-light/10 p-6">
                <h3 className="font-serif text-lg font-bold text-cream">
                  {item.title}
                </h3>
                <p className="mt-2 text-sand leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            What Woodstock Homeowners Are Saying
          </h2>
          <blockquote className="mt-8">
            <div className="flex justify-center gap-1 text-terracotta">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-6 w-6 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mt-4 text-lg italic text-wood-light leading-relaxed">
              &ldquo;Our deck off the back of the house had turned completely
              grey after five years of neglect. Deck Heroes came out, gave us an
              honest assessment, and transformed it in just two days. The walnut
              stain they recommended looks incredible against our red brick. Best
              money we&apos;ve spent on the house in years.&rdquo;
            </p>
            <footer className="mt-4 font-semibold text-wood-dark">
              &mdash; Chris &amp; Dana P., Roth Park, Woodstock
            </footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark text-center">
            Frequently Asked Questions &mdash; Woodstock
          </h2>
          <div className="mt-8">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-2xl font-bold text-wood-dark">
            Also Serving Nearby Communities
          </h2>
          <p className="mt-3 text-wood-light">
            Deck Heroes serves homeowners across southwestern Ontario, including
            these nearby cities.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { slug: "london", name: "London" },
              { slug: "st-thomas", name: "St. Thomas" },
              { slug: "strathroy", name: "Strathroy" },
              { slug: "brantford", name: "Brantford" },
              { slug: "hamilton", name: "Hamilton" },
            ].map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="rounded-lg bg-sand px-5 py-2 font-medium text-wood-dark transition hover:bg-terracotta hover:text-cream"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
