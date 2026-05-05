import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { SERVICES, COMPANY_NAME, PHONE, EMAIL, DOMAIN } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Deck Staining Strathroy, Ontario | Deck Heroes",
  description:
    "Professional deck staining, sealing, refinishing & fence staining in Strathroy, Ontario. Serving Strathroy-Caradoc, Mount Brydges, Adelaide-Metcalfe & more. Free quotes from Deck Heroes.",
};

const neighborhoods = [
  "Strathroy-Caradoc",
  "Mount Brydges",
  "Adelaide-Metcalfe",
  "Parkview Area",
  "Downtown Strathroy",
];

const faqs = [
  {
    question: "Do you service rural properties outside of Strathroy?",
    answer:
      "Yes, we serve the entire Strathroy-Caradoc municipality as well as surrounding areas like Mount Brydges and Adelaide-Metcalfe. Rural properties with larger decks or multiple outbuildings are no problem — we provide free on-site estimates regardless of location within our service area.",
  },
  {
    question: "How do I prepare my deck for your team's arrival?",
    answer:
      "Simply clear your deck of furniture, planters, and personal items before our scheduled arrival. We handle all the cleaning, sanding, and preparation as part of our service. If you have items that are difficult to move, let us know and we can help.",
  },
  {
    question: "What is the difference between deck staining and deck sealing?",
    answer:
      "Deck staining adds colour and UV protection while also sealing the wood against moisture. Deck sealing provides a clear or lightly tinted protective barrier without significantly changing the wood's appearance. Both protect against Strathroy's weather, but staining offers more comprehensive coverage. We can recommend the best option for your deck.",
  },
  {
    question: "Can you match my existing fence stain colour?",
    answer:
      "In most cases, yes. We carry a wide range of stain colours and can custom-mix to closely match your existing finish. Bring us a sample or photo and we will find the closest match. Keep in mind that weathered stain may look different from a fresh application of the same colour.",
  },
  {
    question: "How long will my deck stain last in Strathroy's climate?",
    answer:
      "With proper preparation and premium products, a professional deck stain in the Strathroy area typically lasts two to four years depending on sun exposure, foot traffic, and weather severity. We use high-performance products formulated for Ontario's freeze-thaw conditions to maximize longevity.",
  },
];

export default function StrathroyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_NAME,
    description:
      "Professional deck staining, sealing, refinishing, and fence staining services in Strathroy, Ontario.",
    url: `https://${DOMAIN}/areas/strathroy`,
    telephone: PHONE,
    email: EMAIL,
    areaServed: {
      "@type": "City",
      name: "Strathroy",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Strathroy",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.9576,
      longitude: -81.6165,
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
            Professional Deck Staining &amp; Restoration in Strathroy, Ontario
          </h1>
          <p className="mt-6 text-lg text-sand leading-relaxed">
            From downtown Strathroy to the rural properties of
            Adelaide-Metcalfe, Deck Heroes delivers meticulous deck care that
            protects your investment and enhances your outdoor living space.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Strathroy&apos;s Reliable Deck Care Experts
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              Strathroy-Caradoc is a thriving community in Middlesex County
              where residents enjoy a balance of small-town character and easy
              access to larger centres. Many homeowners here have invested in
              outdoor living spaces — spacious decks for family dinners, wraparound
              porches, and privacy fences that define beautiful backyards. These
              features add real value to your home, but only when properly
              maintained.
            </p>
            <p>
              Southwestern Ontario&apos;s climate does not go easy on exposed
              wood. Strathroy sees everything from heavy winter snowfalls and
              ice storms to hot, humid summers. The constant cycle of freezing
              and thawing pushes moisture into wood fibres, causing swelling,
              cracking, and premature decay. Summer UV radiation then fades and
              dries the surface, compounding the damage.
            </p>
            <p>
              Deck Heroes helps Strathroy homeowners stay ahead of this cycle.
              Our professional staining and sealing services create a durable
              barrier against moisture and sun, keeping your wood looking fresh
              and structurally sound for years. We also serve the neighbouring
              communities of Mount Brydges and Adelaide-Metcalfe, bringing the
              same high standards to every project.
            </p>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-sand py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Areas We Serve in Strathroy &amp; Surrounds
          </h2>
          <p className="mt-4 text-wood-light leading-relaxed">
            Our service area covers Strathroy-Caradoc and the surrounding
            Middlesex County communities. Whether you are in town or on an
            acreage, we bring the same level of professionalism to your door.
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
            Our Deck &amp; Fence Services in Strathroy
          </h2>
          <p className="mt-4 text-wood-light leading-relaxed">
            Whether your deck needs a fresh coat of stain, a protective seal, or
            a complete overhaul, we have the skills and products to deliver
            outstanding results.
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
            Why Strathroy Homeowners Trust Deck Heroes
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Rural & Urban Expertise",
                desc: "We handle everything from compact town decks to sprawling country porches. No project is too big or too small for our experienced crew.",
              },
              {
                title: "Weather-Tested Products",
                desc: "Our stains and sealants are selected for their performance in Middlesex County's demanding four-season climate, with superior freeze-thaw resistance.",
              },
              {
                title: "Respectful Service",
                desc: "We treat your property like our own — protecting landscaping, cleaning up thoroughly, and communicating clearly at every stage.",
              },
              {
                title: "Satisfaction Guaranteed",
                desc: "We stand behind our work. If you are not completely happy with the results, we will make it right. That is the Deck Heroes promise.",
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
            What Strathroy Homeowners Are Saying
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
              &ldquo;We have a large wraparound deck on our property just
              outside Strathroy and it was long overdue for attention. Deck
              Heroes stripped the old finish, repaired a few boards, and applied
              a gorgeous cedar-toned stain. The whole process was smooth,
              on-time, and the result is absolutely stunning. Our neighbours keep
              asking who did the work.&rdquo;
            </p>
            <footer className="mt-4 font-semibold text-wood-dark">
              &mdash; Steve &amp; Laura M., Strathroy-Caradoc
            </footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark text-center">
            Frequently Asked Questions &mdash; Strathroy
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
            Beyond Strathroy, Deck Heroes is proud to serve homeowners across
            southwestern Ontario.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { slug: "london", name: "London" },
              { slug: "woodstock", name: "Woodstock" },
              { slug: "st-thomas", name: "St. Thomas" },
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
