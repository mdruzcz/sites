import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { SERVICES, COMPANY_NAME, PHONE, EMAIL, DOMAIN } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Deck Staining Brantford, Ontario | Deck Heroes",
  description:
    "Professional deck staining, sealing, refinishing & fence staining in Brantford, Ontario. Serving Eagle Place, Holmedale, West Brant, Paris & Brant County. Free quotes from Deck Heroes.",
};

const neighborhoods = [
  "Eagle Place",
  "Holmedale",
  "Terrace Hill",
  "West Brant",
  "Paris",
  "St. George",
  "Brant County",
];

const faqs = [
  {
    question: "What areas around Brantford do you serve?",
    answer:
      "We serve all of Brantford and Brant County, including the communities of Paris, St. George, Burford, and surrounding rural areas. Whether you live in Eagle Place, up on Terrace Hill, or out in the county, our team is happy to provide a free on-site estimate.",
  },
  {
    question: "How does Brantford's river valley climate affect deck maintenance?",
    answer:
      "Brantford sits along the Grand River, which creates a valley microclimate with higher humidity levels, especially in the mornings and evenings. This extra moisture, combined with Ontario's freeze-thaw cycles, makes decks particularly susceptible to mildew growth and water damage. Regular staining and sealing is essential for decks near the river valley.",
  },
  {
    question: "Do you offer eco-friendly deck staining options?",
    answer:
      "Yes, we carry a range of low-VOC and water-based stain products that deliver excellent protection with a reduced environmental footprint. These products are ideal for Brantford homeowners who want high performance without strong chemical odours, and they are safe for use around children, pets, and gardens.",
  },
  {
    question: "Can you stain or seal a composite deck?",
    answer:
      "While composite decking generally does not require staining, some older composite products can benefit from specialized sealants to prevent fading and staining. We can assess your composite deck and recommend whether sealing would be beneficial based on its age, condition, and manufacturer specifications.",
  },
  {
    question: "How quickly can you schedule a project in Brantford?",
    answer:
      "During our peak season from May to September, we typically book projects one to three weeks out. Smaller projects like fence staining may be available sooner. We recommend reaching out early in the spring to secure your preferred timing, especially for larger refinishing projects.",
  },
];

export default function BrantfordPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_NAME,
    description:
      "Professional deck staining, sealing, refinishing, and fence staining services in Brantford, Ontario.",
    url: `https://${DOMAIN}/areas/brantford`,
    telephone: PHONE,
    email: EMAIL,
    areaServed: {
      "@type": "City",
      name: "Brantford",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brantford",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.1394,
      longitude: -80.2644,
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
            Professional Deck Staining &amp; Restoration in Brantford, Ontario
          </h1>
          <p className="mt-6 text-lg text-sand leading-relaxed">
            Brantford and Brant County homeowners trust Deck Heroes for expert
            deck staining, sealing, and refinishing. Protect your outdoor
            investment with professionals who understand the Grand River valley
            climate.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Brantford&apos;s Deck Care Specialists
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              Set along the banks of the Grand River, Brantford is a city with
              deep roots and a growing appetite for outdoor living. From the
              established neighbourhoods of Eagle Place and Holmedale to the
              newer developments in West Brant, decks are a defining feature of
              Brantford homes. Nearby communities like the picturesque town of
              Paris and rural St. George share the same love of backyard spaces.
            </p>
            <p>
              The Grand River valley creates specific conditions that impact deck
              longevity. Morning fog and higher ambient humidity from the river
              promote mildew and algae growth on wood surfaces. Coupled with
              harsh Ontario winters that bring ice, snow, and constant
              freeze-thaw stress, unprotected decks in the Brantford area
              deteriorate faster than homeowners expect.
            </p>
            <p>
              Deck Heroes serves Brantford and Brant County with deck care
              services built for these exact challenges. We select stains and
              sealants with superior mildew resistance and moisture-blocking
              capabilities, and our thorough preparation process ensures every
              product performs to its full potential. The result is a deck that
              looks beautiful and stands up to everything the Grand River valley
              climate delivers.
            </p>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-sand py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Neighbourhoods We Serve in Brantford &amp; Brant County
          </h2>
          <p className="mt-4 text-wood-light leading-relaxed">
            Deck Heroes is proud to serve homeowners across Brantford and the
            wider Brant County region. From the hilltop views of Terrace Hill
            to the riverside charm of Paris, we are your local deck care team.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
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
            Our Deck &amp; Fence Services in Brantford
          </h2>
          <p className="mt-4 text-wood-light leading-relaxed">
            We offer a full suite of wood care services designed to protect and
            beautify your outdoor spaces, whatever their current condition.
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
            Why Brantford Homeowners Trust Deck Heroes
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Grand River Expertise",
                desc: "We understand the unique moisture and humidity challenges that the Grand River valley presents and tailor our approach accordingly.",
              },
              {
                title: "Mildew-Resistant Solutions",
                desc: "Our product selection prioritizes mildew and algae resistance — critical for decks in the Brantford area where river-valley humidity is a constant factor.",
              },
              {
                title: "Full-Service Approach",
                desc: "From initial inspection to final walkthrough, we handle everything: cleaning, repairs, sanding, staining, and cleanup. One call does it all.",
              },
              {
                title: "Brant County Coverage",
                desc: "We travel throughout Brant County, including Paris, St. George, and surrounding rural areas. Distance is never a barrier to quality service.",
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
            What Brantford Homeowners Are Saying
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
              &ldquo;Our deck and fence both needed serious help after a couple
              of rough winters. Deck Heroes came out, gave us a detailed quote
              same day, and scheduled the work within two weeks. The crew did
              both the deck refinishing and fence staining over three days, and
              the transformation is remarkable. Our backyard in Eagle Place has
              never looked this good.&rdquo;
            </p>
            <footer className="mt-4 font-semibold text-wood-dark">
              &mdash; Natalie &amp; Ryan C., Eagle Place, Brantford
            </footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark text-center">
            Frequently Asked Questions &mdash; Brantford
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
            Deck Heroes provides professional deck and fence care across
            southwestern and south-central Ontario.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { slug: "london", name: "London" },
              { slug: "woodstock", name: "Woodstock" },
              { slug: "st-thomas", name: "St. Thomas" },
              { slug: "strathroy", name: "Strathroy" },
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
