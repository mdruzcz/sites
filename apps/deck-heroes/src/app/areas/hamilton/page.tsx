import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { SERVICES, COMPANY_NAME, PHONE, EMAIL, DOMAIN } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Deck Staining Hamilton, Ontario | Deck Heroes",
  description:
    "Professional deck staining, sealing, refinishing & fence staining in Hamilton, Ontario. Serving Dundas, Ancaster, Waterdown, Stoney Creek & more. Free quotes from Deck Heroes.",
};

const neighborhoods = [
  "Dundas",
  "Ancaster",
  "Waterdown",
  "Stoney Creek",
  "Binbrook",
  "Flamborough",
  "Upper Paradise",
  "Westdale",
];

const faqs = [
  {
    question: "Do you serve all areas of greater Hamilton?",
    answer:
      "Yes, Deck Heroes serves the entire City of Hamilton including its amalgamated communities: Dundas, Ancaster, Waterdown, Stoney Creek, Binbrook, Flamborough, and all neighbourhoods on the mountain and below the escarpment. We provide free on-site estimates anywhere in the Hamilton area.",
  },
  {
    question: "Does Hamilton's escarpment climate affect deck maintenance?",
    answer:
      "Absolutely. Hamilton's unique geography creates distinct microclimates. Homes above the escarpment experience more wind exposure and slightly cooler temperatures, while lower-city properties near the harbour see more humidity. We factor in your specific location when recommending products and maintenance schedules.",
  },
  {
    question: "How long should I wait to use my deck after staining?",
    answer:
      "We recommend staying off your deck for at least 24 to 48 hours after staining to allow proper curing. Furniture can typically go back after 72 hours. Curing times vary based on temperature, humidity, and the specific products used. We will give you clear instructions tailored to your project and the current weather conditions.",
  },
  {
    question: "Can you stain a multi-level or elevated deck?",
    answer:
      "Yes, we regularly work on multi-level decks, elevated structures, and decks with complex railings and stairs. Many Hamilton homes, particularly those on the escarpment, have elevated decks that require special attention. We have the equipment and experience to handle decks of any height or complexity safely.",
  },
  {
    question: "What is the cost of deck refinishing in Hamilton?",
    answer:
      "Deck refinishing costs in Hamilton vary based on size, condition, and scope of work. A standard refinishing project for a 200-to-300-square-foot deck typically ranges from $1,200 to $2,500, including stripping, sanding, repairs, and a fresh coat of premium stain. Contact us for a free, detailed estimate specific to your deck.",
  },
];

export default function HamiltonPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_NAME,
    description:
      "Professional deck staining, sealing, refinishing, and fence staining services in Hamilton, Ontario.",
    url: `https://${DOMAIN}/areas/hamilton`,
    telephone: PHONE,
    email: EMAIL,
    areaServed: {
      "@type": "City",
      name: "Hamilton",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hamilton",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.2557,
      longitude: -79.8711,
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
            Professional Deck Staining &amp; Restoration in Hamilton, Ontario
          </h1>
          <p className="mt-6 text-lg text-sand leading-relaxed">
            From the escarpment communities of Ancaster and Dundas to the
            lakeside neighbourhoods of Stoney Creek, Deck Heroes brings
            professional deck care to homeowners across the greater Hamilton
            area.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Hamilton&apos;s Premier Deck Care Team
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              Hamilton is a city defined by its dramatic natural landscape. The
              Niagara Escarpment bisects the city, creating stunning views and
              diverse neighbourhoods from the historic streets of Westdale to the
              rolling hills of Flamborough. With over 100 waterfalls and
              extensive green space, Hamilton homeowners know the value of
              enjoying the outdoors — and a quality deck is where that enjoyment
              begins.
            </p>
            <p>
              Hamilton&apos;s geography brings varied weather conditions. The
              lower city near Hamilton Harbour experiences higher humidity and
              warmer winter temperatures, while the upper mountain and
              escarpment communities face stronger winds and heavier snowfall.
              Both above and below the escarpment, decks endure Ontario&apos;s
              full spectrum of weather: bitter winter freezes, wet spring thaws,
              humid summers, and everything in between.
            </p>
            <p>
              Deck Heroes tailors its approach to Hamilton&apos;s diverse
              conditions. Whether your Ancaster deck faces prevailing westerly
              winds, your Stoney Creek patio sits in full southern sun, or your
              Dundas deck is sheltered beneath mature maples, we select the
              right products and techniques to maximize the life and beauty of
              your wood. Our crew serves the entire greater Hamilton area with
              the same attention to detail on every project.
            </p>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-sand py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Neighbourhoods We Serve in Hamilton
          </h2>
          <p className="mt-4 text-wood-light leading-relaxed">
            Deck Heroes serves homeowners throughout greater Hamilton, from the
            harbour to the escarpment and beyond. No matter which community you
            call home, expert deck care is just a phone call away.
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
            Our Deck &amp; Fence Services in Hamilton
          </h2>
          <p className="mt-4 text-wood-light leading-relaxed">
            Whether you need a fresh stain to revive your deck&apos;s colour, a
            protective seal before winter, or a complete refinishing of a
            neglected surface, we have the expertise and products to deliver.
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
            Why Hamilton Homeowners Trust Deck Heroes
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Escarpment-Savvy Team",
                desc: "We understand how Hamilton's unique topography creates different conditions above and below the escarpment, and we adjust our approach to match your deck's specific exposure.",
              },
              {
                title: "Premium, Durable Finishes",
                desc: "We use commercial-grade stains and sealants with excellent UV, moisture, and mildew resistance — essential for Hamilton's variable climate.",
              },
              {
                title: "Comprehensive Care",
                desc: "Deck cleaning, sanding, board replacement, staining, and sealing — we handle the full scope of deck maintenance so you only need one phone call.",
              },
              {
                title: "Greater Hamilton Coverage",
                desc: "Dundas, Ancaster, Waterdown, Stoney Creek, Binbrook, Flamborough — we serve every corner of greater Hamilton with prompt, professional service.",
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
            What Hamilton Homeowners Are Saying
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
              &ldquo;We bought a home in Ancaster with a large, elevated deck
              that had been neglected for years. The wood was grey, splintering,
              and honestly a little scary to walk on. Deck Heroes came out,
              assessed everything, replaced several boards, sanded the entire
              surface, and applied a beautiful natural-toned stain. It looks and
              feels like a brand new deck. Outstanding work from start to
              finish.&rdquo;
            </p>
            <footer className="mt-4 font-semibold text-wood-dark">
              &mdash; Priya &amp; Daniel K., Ancaster, Hamilton
            </footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark text-center">
            Frequently Asked Questions &mdash; Hamilton
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
            Deck Heroes also provides deck and fence care services across
            southwestern Ontario.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { slug: "london", name: "London" },
              { slug: "woodstock", name: "Woodstock" },
              { slug: "st-thomas", name: "St. Thomas" },
              { slug: "strathroy", name: "Strathroy" },
              { slug: "brantford", name: "Brantford" },
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
