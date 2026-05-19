import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { SERVICES, CITIES, COMPANY_NAME, PHONE, PHONE_HREF, EMAIL, DOMAIN } from "@/lib/constants";

const CITY_DETAILS: Record<
  string,
  { neighbourhoods: string[]; lat: number; lng: number; nicknames: string }
> = {
  london: {
    neighbourhoods: ["Byron", "Westmount", "Old North", "Wortley Village", "Masonville", "Hyde Park", "Lambeth", "White Oaks"],
    lat: 42.9849,
    lng: -81.2453,
    nicknames: "the Forest City",
  },
  woodstock: {
    neighbourhoods: ["Downtown", "West End", "Southside", "Huron Street area", "Dundas Street corridor"],
    lat: 43.1315,
    lng: -80.7565,
    nicknames: "the Friendly City",
  },
  "st-thomas": {
    neighbourhoods: ["Central", "South", "East End", "Pinafore Park area", "Shaw Valley"],
    lat: 42.7740,
    lng: -81.1824,
    nicknames: "the Railway City",
  },
  strathroy: {
    neighbourhoods: ["Downtown", "South Strathroy", "Industrial Park area", "Frank Street area"],
    lat: 42.9567,
    lng: -81.6165,
    nicknames: "the Heart of Middlesex",
  },
  brantford: {
    neighbourhoods: ["Eagle Place", "Terrace Hill", "West Brant", "Holmedale", "Downtown"],
    lat: 43.1394,
    lng: -80.2644,
    nicknames: "the Telephone City",
  },
  hamilton: {
    neighbourhoods: ["Dundas", "Ancaster", "Stoney Creek", "Westdale", "Flamborough", "Waterdown"],
    lat: 43.2557,
    lng: -79.8711,
    nicknames: "the Ambitious City",
  },
};

const SERVICE_DETAILS: Record<
  string,
  {
    verb: string;
    gerund: string;
    benefitIntro: string;
    processSteps: { title: string; desc: string }[];
    faqs: { question: string; answer: string }[];
  }
> = {
  "deck-staining": {
    verb: "stain",
    gerund: "staining",
    benefitIntro:
      "Deck staining protects your wood from UV damage, moisture penetration, and the freeze-thaw cycles common in Ontario. A properly stained deck resists greying, cracking, and mould growth while showcasing the natural beauty of the wood grain.",
    processSteps: [
      { title: "Inspection & Quote", desc: "We assess your deck's condition, wood type, and existing finish to recommend the best stain and approach." },
      { title: "Surface Preparation", desc: "Thorough cleaning, sanding, and repairs ensure the new stain bonds deeply and lasts for years." },
      { title: "Premium Stain Application", desc: "We apply your chosen stain with brushes and rollers for even coverage and maximum penetration." },
      { title: "Final Walkthrough", desc: "We inspect every surface with you and share maintenance tips specific to your stain and wood type." },
    ],
    faqs: [
      { question: "How often should I restain my deck in {city}?", answer: "In {city}'s climate, most decks benefit from restaining every two to three years. South-facing decks with heavy sun exposure may need attention sooner, while shaded decks can sometimes stretch to four years between applications." },
      { question: "What type of stain is best for decks in {city}, Ontario?", answer: "For {city}'s four-season climate, we typically recommend semi-transparent stains for the best balance of UV protection, moisture resistance, and natural wood grain visibility. We carry transparent, semi-transparent, and solid stain options and will help you choose based on your wood type and aesthetic preferences." },
      { question: "How long does deck staining take?", answer: "A typical residential deck in {city} takes one to three days including preparation. Weather conditions need to be dry with temperatures between 10°C and 30°C for optimal stain curing." },
    ],
  },
  "deck-refinishing": {
    verb: "refinish",
    gerund: "refinishing",
    benefitIntro:
      "Deck refinishing is the most transformative service we offer. We strip away years of weathering, sand down to fresh wood, make necessary repairs, and apply a beautiful new finish — giving your deck a second life at a fraction of replacement cost.",
    processSteps: [
      { title: "Comprehensive Inspection", desc: "We examine every board, railing, and structural component to determine the full scope of work needed." },
      { title: "Stripping & Sanding", desc: "Old finish is chemically stripped and the entire surface is sanded to expose fresh, healthy wood." },
      { title: "Repairs", desc: "Damaged boards are replaced, loose fasteners are secured, and any structural issues are addressed." },
      { title: "Finish Application", desc: "Your chosen stain or sealer is applied to the freshly prepared surface for deep, even absorption and lasting protection." },
    ],
    faqs: [
      { question: "How do I know if my deck in {city} needs refinishing?", answer: "Signs include greying wood, peeling or flaking stain, splinters, surface roughness, and a water test where water soaks into the wood rather than beading on the surface. If your deck has not been maintained for several years, refinishing is likely the best path to restore it." },
      { question: "Is refinishing cheaper than replacing my deck?", answer: "Significantly. Refinishing typically costs thirty to fifty percent less than a full deck replacement while delivering a result that looks nearly identical to a brand-new build. If your deck's substructure is still sound, refinishing is almost always the smarter investment." },
      { question: "How long will a refinished deck last in {city}?", answer: "With proper maintenance and regular recoating every two to three years, a professionally refinished deck can serve you well for another ten to fifteen years or more, depending on the wood type and condition of the substructure." },
    ],
  },
  "deck-resurfacing": {
    verb: "resurface",
    gerund: "resurfacing",
    benefitIntro:
      "Deck resurfacing replaces worn surface boards while keeping your solid substructure intact. It is the smart middle ground between refinishing and a full rebuild — you get a brand-new walking surface, often with the option to upgrade materials, at a fraction of the cost of starting from scratch.",
    processSteps: [
      { title: "Structural Assessment", desc: "We inspect joists, beams, and posts to confirm the substructure can support new decking." },
      { title: "Old Surface Removal", desc: "Worn boards and damaged railings are carefully removed and hauled away." },
      { title: "Substructure Repair", desc: "Any joists showing wear are sistered or replaced, and connections are re-secured." },
      { title: "New Surface Installation", desc: "Your chosen decking material is installed with precision fastening and consistent spacing." },
    ],
    faqs: [
      { question: "Can my deck in {city} be resurfaced instead of rebuilt?", answer: "If the substructure — joists, beams, posts, and footings — is still solid and level, resurfacing is almost certainly an option. During our free inspection we check every structural component and give you an honest recommendation." },
      { question: "What materials can I choose for resurfacing?", answer: "You can choose pressure-treated lumber, western red cedar, composite decking (like Trex or TimberTech), or PVC decking. Resurfacing is a great opportunity to upgrade from the original material to something lower-maintenance or more visually appealing." },
      { question: "How long does deck resurfacing take in {city}?", answer: "Most residential deck resurfacing projects take three to five days, including removal of old boards, any joist repairs, and installation of the new surface. Larger or multi-level decks may take a bit longer." },
    ],
  },
  "deck-building": {
    verb: "build",
    gerund: "building",
    benefitIntro:
      "A custom-built deck transforms your backyard into a true outdoor living space. Whether you need a simple platform for a barbecue or a multi-level entertainment area with built-in seating and lighting, we design and build decks that fit your property, your lifestyle, and Ontario's building codes.",
    processSteps: [
      { title: "Design Consultation", desc: "We visit your property, discuss your vision, take measurements, and present material and layout options within your budget." },
      { title: "Permits & Planning", desc: "We handle all permit applications, site plans, and coordination with your local building department." },
      { title: "Construction", desc: "From footings below the frost line to the final railing spindle, every component is built to code with quality materials." },
      { title: "Final Walkthrough", desc: "We inspect the completed deck with you, clean the site, and hand over your maintenance guide." },
    ],
    faqs: [
      { question: "Do I need a building permit for a new deck in {city}?", answer: "In most cases, yes. Decks more than twenty-four inches above grade, attached to the house, or larger than a certain square footage require a permit in {city}. Requirements vary by municipality. We handle the entire permit process for you." },
      { question: "How long does it take to build a deck in {city}?", answer: "A standard single-level deck typically takes one to two weeks from start to finish. Multi-level or complex designs may take two to four weeks. Permit timelines can add one to three weeks before construction begins." },
      { question: "What materials do you recommend for new decks in {city}?", answer: "It depends on your budget and maintenance preferences. Pressure-treated lumber is the most affordable. Cedar is naturally beautiful and rot-resistant. Composite decking costs more upfront but requires virtually no maintenance. We will discuss all options during your consultation." },
    ],
  },
  "deck-cleaning": {
    verb: "clean",
    gerund: "cleaning",
    benefitIntro:
      "Professional deck cleaning removes the dirt, mould, mildew, algae, and grey weathering that accumulate on outdoor wood surfaces in Ontario's climate. A clean deck looks better, lasts longer, and provides a safe, slip-free surface for your family to enjoy.",
    processSteps: [
      { title: "Pre-Clean Inspection", desc: "We assess soiling type, wood condition, and any areas needing special attention." },
      { title: "Cleaning Solution Application", desc: "A professional-grade deck cleaner is applied and left to dwell, breaking down embedded grime and killing mould at the root." },
      { title: "Controlled Pressure Washing", desc: "Commercial equipment at the right pressure and fan setting washes every surface without damaging the wood." },
      { title: "Brightening & Rinse", desc: "A wood brightener restores natural colour and pH balance, followed by a final low-pressure rinse." },
    ],
    faqs: [
      { question: "How often should I have my deck professionally cleaned in {city}?", answer: "At least once a year, ideally in spring before the outdoor season. Decks in shaded areas or near trees in {city} may benefit from a second cleaning in late fall to remove leaf stains and organic buildup before winter." },
      { question: "Will power washing damage my deck?", answer: "Not when done by professionals. We use commercial equipment with adjustable pressure and the correct fan tips for your wood type. Consumer-grade pressure washers set too high can gouge soft wood, but our controlled approach cleans thoroughly without causing damage." },
      { question: "Should I stain my deck after cleaning?", answer: "It depends on the condition of your existing finish. If water still beads on the surface after cleaning, the finish is still performing. If water soaks in, cleaning is the perfect time to apply a fresh coat — the clean, open-pored wood will absorb the new finish beautifully." },
    ],
  },
};

function interpolate(text: string, city: string): string {
  return text.replace(/\{city\}/g, city);
}

export function generateServiceCityMetadata(
  serviceSlug: string,
  citySlug: string
): Metadata {
  const service = SERVICES.find((s) => s.slug === serviceSlug);
  const city = CITIES.find((c) => c.slug === citySlug);
  if (!service || !city) return {};

  const title = `${service.title} in ${city.name}, Ontario | Deck Heroes`;
  const description = `Professional ${service.title.toLowerCase()} services in ${city.name}, Ontario. Serving ${CITY_DETAILS[citySlug]?.neighbourhoods.slice(0, 4).join(", ")} and surrounding areas. Free estimates from Deck Heroes.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://deckheroes.ca/services/${serviceSlug}/${citySlug}`,
    },
  };
}

export function ServiceCityPage({
  serviceSlug,
  citySlug,
}: {
  serviceSlug: string;
  citySlug: string;
}) {
  const service = SERVICES.find((s) => s.slug === serviceSlug)!;
  const city = CITIES.find((c) => c.slug === citySlug)!;
  const cityInfo = CITY_DETAILS[citySlug]!;
  const serviceInfo = SERVICE_DETAILS[serviceSlug]!;
  const otherServices = SERVICES.filter((s) => s.slug !== serviceSlug);
  const otherCities = CITIES.filter((c) => c.slug !== citySlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} in ${city.name}`,
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY_NAME,
      url: `https://${DOMAIN}`,
      telephone: "+15198786735",
      email: EMAIL,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      addressRegion: "ON",
      addressCountry: "CA",
    },
    description: `Professional ${service.title.toLowerCase()} services in ${city.name}, Ontario. ${service.shortDescription}`,
    serviceType: service.title,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceInfo.faqs.map((faq) => ({
      "@type": "Question",
      name: interpolate(faq.question, city.name),
      acceptedAnswer: {
        "@type": "Answer",
        text: interpolate(faq.answer, city.name),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-dark via-forest to-forest-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-bold text-cream sm:text-5xl">
            {service.title} in {city.name}, Ontario
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream">
            Professional {service.title.toLowerCase()} services for homeowners in{" "}
            {city.name} and surrounding {city.province} communities.{" "}
            {COMPANY_NAME} brings expert craftsmanship and premium products to
            every project in {cityInfo.nicknames}.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-lg bg-terracotta px-8 py-4 text-lg font-semibold text-cream shadow-lg transition hover:bg-terra-dark"
            >
              Get a Free Quote
            </Link>
            <a
              href={PHONE_HREF}
              className="rounded-lg border-2 border-cream/40 px-8 py-4 text-lg font-semibold text-cream transition hover:bg-white/10"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Why this service in this city */}
      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            {service.title} for {city.name} Homeowners
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              {city.name}, known as {cityInfo.nicknames}, is home to beautiful
              outdoor spaces that deserve expert care. Ontario&apos;s four-season
              climate — freezing winters, wet springs, hot summers, and damp
              autumns — takes a serious toll on outdoor wood surfaces. Professional{" "}
              {serviceInfo.gerund} is essential for protecting and maintaining
              your deck in {city.name}.
            </p>
            <p>{serviceInfo.benefitIntro}</p>
            <p>
              At {COMPANY_NAME}, we have years of experience serving homeowners
              across {city.name}, including the neighbourhoods of{" "}
              {cityInfo.neighbourhoods.join(", ")}. We understand the specific
              challenges that {city.name}&apos;s climate and environment present,
              and we tailor our approach to deliver lasting results for your
              property.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-bg-alt py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Our {service.title} Process in {city.name}
          </h2>
          <div className="mt-12 space-y-8">
            {serviceInfo.processSteps.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta text-xl font-bold text-cream">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-wood-dark">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-wood-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighbourhoods */}
      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            {city.name} Neighbourhoods We Serve
          </h2>
          <p className="mt-4 text-wood-light">
            {COMPANY_NAME} provides {serviceInfo.gerund} services throughout{" "}
            {city.name} and the surrounding area, including:
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {cityInfo.neighbourhoods.map((n) => (
              <div
                key={n}
                className="rounded-lg bg-bg-alt px-4 py-3 text-center font-medium text-wood-dark shadow-sm"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="bg-bg-alt py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Other Deck Services in {city.name}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/${citySlug}`}
                className="group rounded-xl border border-forest-light/20 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-terracotta/40"
              >
                <h3 className="font-serif text-xl font-bold text-wood-dark group-hover:text-terracotta transition-colors">
                  {s.title} in {city.name}
                </h3>
                <p className="mt-2 text-sm text-wood-light leading-relaxed">
                  {s.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            {service.title} FAQ — {city.name}
          </h2>
          <div className="mt-10">
            <FAQAccordion
              items={serviceInfo.faqs.map((faq) => ({
                question: interpolate(faq.question, city.name),
                answer: interpolate(faq.answer, city.name),
              }))}
            />
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      <section className="bg-bg-alt py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-2xl font-bold text-wood-dark">
            {service.title} in Other Areas
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/services/${serviceSlug}/${c.slug}`}
                className="rounded-lg bg-white px-5 py-2 font-medium text-wood-dark transition hover:bg-terracotta hover:text-cream shadow-sm"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
