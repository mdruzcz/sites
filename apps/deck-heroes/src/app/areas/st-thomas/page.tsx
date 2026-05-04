import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { SERVICES, COMPANY_NAME, PHONE, EMAIL, DOMAIN } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Deck Staining St. Thomas, Ontario | Deck Heroes",
  description:
    "Professional deck staining, sealing, refinishing & fence staining in St. Thomas, Ontario. Serving Elgin Centre, Railway City area, Port Stanley & more. Free quotes from Deck Heroes.",
};

const neighborhoods = [
  "Elgin Centre",
  "Railway City Area",
  "Southwold",
  "Talbot Street Area",
  "Central Elgin",
  "Port Stanley Area",
];

const faqs = [
  {
    question: "When is the best season to stain a deck in St. Thomas?",
    answer:
      "The best time for deck staining in St. Thomas is late May through September. The Lake Erie influence gives St. Thomas slightly milder temperatures than areas farther north, which can extend the staining season. We look for a window of two to three dry days with temperatures above 10°C for optimal results.",
  },
  {
    question: "Does the lake effect climate in St. Thomas affect my deck?",
    answer:
      "Yes, St. Thomas and Elgin County experience a lake effect from Lake Erie that brings higher humidity levels and additional precipitation, especially in late fall and winter. This extra moisture makes proper sealing and staining especially important for decks in this region to prevent water damage, warping, and mildew.",
  },
  {
    question: "How do I know if my deck needs staining or sealing?",
    answer:
      "A simple water test can help: sprinkle water on your deck boards. If it beads up, your existing finish is still working. If it soaks in quickly, it is time for maintenance. Other signs include greying, splintering, or a faded appearance. We offer free assessments for St. Thomas homeowners.",
  },
  {
    question: "Do you also service Port Stanley and surrounding areas?",
    answer:
      "Absolutely. We serve all of Elgin County, including Port Stanley, Central Elgin, Southwold, and the surrounding rural communities. Waterfront properties near Port Stanley especially benefit from regular deck maintenance due to increased moisture and wind exposure from the lake.",
  },
  {
    question: "What types of wood can you stain?",
    answer:
      "We stain all common decking lumber including pressure-treated pine, cedar, redwood, and exotic hardwoods like ipe. Each wood species requires a different approach to preparation and product selection, and our team has experience with all of them.",
  },
];

export default function StThomasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_NAME,
    description:
      "Professional deck staining, sealing, refinishing, and fence staining services in St. Thomas, Ontario.",
    url: `https://${DOMAIN}/areas/st-thomas`,
    telephone: PHONE,
    email: EMAIL,
    areaServed: {
      "@type": "City",
      name: "St. Thomas",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "St. Thomas",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.774,
      longitude: -81.1824,
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
            Professional Deck Staining &amp; Restoration in St. Thomas, Ontario
          </h1>
          <p className="mt-6 text-lg text-sand leading-relaxed">
            The Railway City deserves decks that stand the test of time. Deck
            Heroes delivers premium deck care to St. Thomas and Elgin County
            homeowners who demand lasting quality.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Expert Deck Care for St. Thomas &amp; Elgin County
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              St. Thomas sits at the heart of Elgin County, just a short drive
              from the shores of Lake Erie. This proud Railway City has a rich
              heritage and a growing community of homeowners who take pride in
              their properties. With charming residential streets along Talbot
              and the expanding neighbourhoods on the city&apos;s edges, outdoor
              living is a way of life here.
            </p>
            <p>
              The proximity to Lake Erie gives St. Thomas a unique microclimate.
              Lake effect moisture means higher humidity, additional snowfall in
              winter, and damper conditions in spring and fall. These factors
              accelerate the breakdown of unprotected wood, making regular deck
              maintenance not just cosmetic but essential for preserving the
              structural integrity of your outdoor space.
            </p>
            <p>
              Deck Heroes specializes in protecting decks against exactly these
              conditions. Our products are chosen for their ability to repel
              moisture, resist mildew, and hold up under the UV intensity of
              long summer days. Whether your deck overlooks a quiet yard in
              Southwold or sits steps from the bustle of downtown St. Thomas,
              we deliver results that last.
            </p>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-sand py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Areas We Serve in St. Thomas &amp; Elgin County
          </h2>
          <p className="mt-4 text-wood-light leading-relaxed">
            From the heart of the Railway City to the lakeside communities of
            Port Stanley, Deck Heroes provides convenient, reliable service
            across the region.
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
            Our Deck &amp; Fence Services in St. Thomas
          </h2>
          <p className="mt-4 text-wood-light leading-relaxed">
            Every deck is different, and so is every project. We offer a
            complete menu of wood care services to match your needs and budget.
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
            Why St. Thomas Homeowners Trust Deck Heroes
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Lake Effect Specialists",
                desc: "We understand how Lake Erie's influence impacts your deck and choose products specifically designed to handle higher moisture and humidity levels.",
              },
              {
                title: "Proven Track Record",
                desc: "Homeowners across Elgin County count on us for consistent, high-quality results. Our repeat customers are our best advertisement.",
              },
              {
                title: "Complete Prep Work",
                desc: "We never skip steps. Proper cleaning, sanding, and repair are essential to a finish that lasts, and we include them in every project.",
              },
              {
                title: "Convenient Scheduling",
                desc: "We work around your schedule and the weather to ensure optimal conditions for your project. Flexible booking for St. Thomas and area residents.",
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
            What St. Thomas Homeowners Are Saying
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
              &ldquo;Living near Port Stanley, our deck takes a beating from the
              lake moisture. Deck Heroes sealed and stained it beautifully last
              June and it still looks fantastic heading into its second season.
              The team was respectful, cleaned up after themselves, and the price
              was very fair. Highly recommended for anyone in the St. Thomas
              area.&rdquo;
            </p>
            <footer className="mt-4 font-semibold text-wood-dark">
              &mdash; Brenda &amp; Al W., Central Elgin
            </footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark text-center">
            Frequently Asked Questions &mdash; St. Thomas
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
            Deck Heroes provides expert deck and fence care across southwestern
            Ontario, including these nearby cities.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { slug: "london", name: "London" },
              { slug: "woodstock", name: "Woodstock" },
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
