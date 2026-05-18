import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { SERVICES, COMPANY_NAME, PHONE, EMAIL, DOMAIN } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Deck Staining London, Ontario | Deck Heroes",
  description:
    "Professional deck staining, refinishing, resurfacing, building & cleaning in London, Ontario. Serving Byron, Westmount, Old North, Wortley Village & more. Free quotes from Deck Heroes.",
};

const neighborhoods = [
  "Byron",
  "Westmount",
  "Old North",
  "Wortley Village",
  "Masonville",
  "Hyde Park",
  "Lambeth",
  "White Oaks",
  "Oakridge",
  "Stoneybrook",
];

const faqs = [
  {
    question: "What is the best time to stain a deck in London, Ontario?",
    answer:
      "The ideal window for deck staining in London is late spring through early fall, typically from mid-May to mid-October. You need a stretch of dry days with temperatures between 10°C and 30°C. London's moderate humidity and warm summers provide excellent curing conditions, but we always check the extended forecast before scheduling your project.",
  },
  {
    question: "How often should I restain my deck in London's climate?",
    answer:
      "In London's climate, with its freeze-thaw cycles and humid summers, most decks benefit from restaining every two to three years. South-facing decks that receive heavy UV exposure may need attention sooner, while shaded decks under mature trees may last closer to four years between applications.",
  },
  {
    question: "Do you service all areas of London, Ontario?",
    answer:
      "Yes, Deck Heroes serves all neighbourhoods across London, including Byron, Westmount, Old North, Wortley Village, Masonville, Hyde Park, Lambeth, White Oaks, Oakridge, and Stoneybrook. We also travel to surrounding communities within Middlesex County.",
  },
  {
    question: "How much does deck staining cost in London?",
    answer:
      "Pricing depends on deck size, condition, and the products selected. A typical 200-square-foot deck in London ranges from $800 to $1,500 for a professional stain application including prep work. We provide free, no-obligation quotes so you know the exact cost before we begin.",
  },
  {
    question: "Can you stain a brand-new pressure-treated deck?",
    answer:
      "New pressure-treated lumber needs time to dry before staining — usually three to six months depending on when it was installed and weather conditions. We can assess your new deck's moisture content and recommend the optimal timing for staining to ensure the best adhesion and longest-lasting finish.",
  },
];

export default function LondonPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_NAME,
    description:
      "Professional deck staining, refinishing, resurfacing, building, and cleaning services in London, Ontario.",
    url: `https://${DOMAIN}/areas/london`,
    telephone: PHONE,
    email: EMAIL,
    areaServed: {
      "@type": "City",
      name: "London",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.9849,
      longitude: -81.2453,
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
            Professional Deck Staining &amp; Restoration in London, Ontario
          </h1>
          <p className="mt-6 text-lg text-sand leading-relaxed">
            Serving London homeowners with expert deck care since day one. From
            the tree-lined streets of Old North to the growing communities of
            Hyde Park, Deck Heroes keeps your outdoor living space looking its
            best all year round.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            London&apos;s Trusted Deck Care Professionals
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              London, Ontario is a city that loves its outdoor spaces. Whether
              you live near the winding paths along the Thames River, enjoy
              weekend barbecues in your Wortley Village backyard, or host summer
              gatherings on your Byron patio, a well-maintained deck is central
              to the southwestern Ontario lifestyle.
            </p>
            <p>
              But London&apos;s weather puts decks to the test. Cold winters with
              heavy snowfall, freeze-thaw cycles that cause wood to expand and
              contract, spring rains that promote mildew growth, and hot summers
              with intense UV exposure all conspire to grey, crack, and
              deteriorate unprotected wood. That is where Deck Heroes comes in.
            </p>
            <p>
              Our team of experienced professionals understands the unique
              challenges that London&apos;s four-season climate presents to deck
              owners. We use premium Canadian-made stains and sealants
              specifically formulated to withstand Ontario&apos;s weather
              extremes, and our meticulous preparation process ensures that every
              coat bonds properly for maximum longevity.
            </p>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-sand py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Neighbourhoods We Serve in London
          </h2>
          <p className="mt-4 text-wood-light leading-relaxed">
            Deck Heroes proudly serves homeowners throughout London and the
            surrounding area. No matter where you call home in the Forest City,
            we bring the same level of care and craftsmanship to every project.
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
            Our Deck &amp; Fence Services in London
          </h2>
          <p className="mt-4 text-wood-light leading-relaxed">
            From a quick seal to a complete refinish, we offer a full range of
            wood care services tailored to London&apos;s climate and your
            deck&apos;s specific needs.
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
            Why London Homeowners Trust Deck Heroes
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Local Expertise",
                desc: "We understand London’s unique weather patterns and recommend products and techniques proven to perform in southwestern Ontario’s four-season climate.",
              },
              {
                title: "Premium Products",
                desc: "We use top-tier, Canadian-formulated stains and sealants that resist UV damage, moisture penetration, and mildew growth common in the London area.",
              },
              {
                title: "Thorough Preparation",
                desc: "Every project starts with proper cleaning, sanding, and repair. We never cut corners on prep work — it’s the foundation of a lasting finish.",
              },
              {
                title: "Free, Honest Quotes",
                desc: "We provide transparent pricing with no hidden fees. Every London homeowner receives a detailed written quote before any work begins.",
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
            What London Homeowners Are Saying
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
              &ldquo;We had our cedar deck stained by Deck Heroes last spring
              and the results have been outstanding. Even after a full London
              winter with all the snow and salt, the finish still looks rich and
              vibrant. Their crew was professional, tidy, and finished ahead of
              schedule. We&apos;ve already recommended them to our neighbours in
              Westmount.&rdquo;
            </p>
            <footer className="mt-4 font-semibold text-wood-dark">
              &mdash; Jennifer &amp; Mark R., Westmount, London
            </footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark text-center">
            Frequently Asked Questions &mdash; London
          </h2>
          <div className="mt-8">
            <FAQAccordion items={faqs} />
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
            In addition to London, Deck Heroes provides expert deck and fence
            care across southwestern Ontario.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { slug: "woodstock", name: "Woodstock" },
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
