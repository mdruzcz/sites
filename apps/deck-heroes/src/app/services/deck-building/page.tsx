import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { PHONE, PHONE_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Custom Deck Building Services in Ontario | Deck Heroes",
  description:
    "Custom deck design and construction across Southwestern Ontario. From simple platforms to multi-level entertainment spaces. Pressure-treated, cedar, and composite options. Free estimates from Deck Heroes.",
  openGraph: {
    title: "Custom Deck Building Services in Ontario | Deck Heroes",
    description:
      "Transform your backyard with a custom-built deck from Deck Heroes. Expert design and construction across Southwestern Ontario.",
    url: "https://deckheroes.ca/services/deck-building",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Deck Building",
  provider: {
    "@type": "LocalBusiness",
    name: "Deck Heroes",
    url: "https://deckheroes.ca",
    telephone: "+15198786735",
  },
  areaServed: { "@type": "State", name: "Ontario" },
  description:
    "Custom deck design and construction services. From simple platforms to multi-level entertainment spaces across Southwestern Ontario.",
  serviceType: "Deck Building",
};

const FAQS = [
  {
    question: "How long does it take to build a new deck?",
    answer:
      "A standard single-level deck typically takes one to two weeks from start to finish, including footing installation, framing, decking, and railings. More complex projects — multi-level decks, integrated seating, pergolas, or custom features — can take two to four weeks. Permit timelines vary by municipality and can add one to three weeks before construction begins. We will give you a detailed schedule in your quote.",
  },
  {
    question: "Do I need a building permit for a new deck in Ontario?",
    answer:
      "In most Ontario municipalities, yes. Decks that are more than twenty-four inches above grade, attached to the house, or larger than a certain square footage require a building permit. The requirements vary by city. We handle the permit application process for you, including preparing the site plan and construction drawings required by your local building department.",
  },
  {
    question: "What materials do you recommend for a new deck?",
    answer:
      "It depends on your budget, aesthetic preferences, and how much maintenance you want to do. Pressure-treated lumber is the most affordable and performs well when stained regularly. Cedar is naturally beautiful and rot-resistant. Composite decking costs more upfront but requires virtually no maintenance over its lifetime. We will discuss all options during your consultation and help you choose the best fit.",
  },
  {
    question: "How much does a new deck cost in Ontario?",
    answer:
      "Deck costs vary based on size, height, material choice, complexity of design, and site conditions. A basic pressure-treated deck starts at a lower price point, while composite and cedar builds cost more. Multi-level designs, built-in benches, pergolas, and lighting add to the total. We provide free, itemized quotes so you can see exactly where your investment goes and compare material options.",
  },
  {
    question: "Can you build a deck on uneven or sloped ground?",
    answer:
      "Absolutely. Sloped yards are actually excellent candidates for elevated or multi-level decks that create usable outdoor living space where the ground itself is not flat enough to enjoy. We use engineered footings and framing techniques to build level, code-compliant decks on any terrain. A sloped lot often results in the most dramatic and visually impressive deck designs.",
  },
];

export default function DeckBuildingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-dark via-forest to-forest-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-bold text-cream sm:text-5xl">
            Custom Deck Building in Ontario
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream">
            From a simple backyard platform to a multi-level outdoor
            entertainment space, we design and build decks that fit your home,
            your lifestyle, and your budget. Expert craftsmanship backed by years
            of experience across Southwestern Ontario.
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

      {/* Featured Image */}
      <section className="bg-bg py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/images/composite-maintenance.png"
            alt="Custom composite deck building and maintenance"
            width={683}
            height={1024}
            className="h-auto w-full max-h-[500px] object-cover"
            priority
          />
        </div>
      </section>

      {/* Why Build a Deck */}
      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Why Build a New Deck?
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              A well-designed deck is one of the best investments you can make in
              your home. It extends your living space outdoors, gives you a
              dedicated area for entertaining, dining, and relaxing, and adds
              measurable value to your property. In Ontario, where summers are
              warm and beautiful, a deck lets you make the most of every good
              weather day.
            </p>
            <p>
              Beyond lifestyle, a professionally built deck is a strong return on
              investment. Real estate studies consistently show that quality
              outdoor living spaces are among the top features homebuyers look
              for. A custom deck can recoup seventy to eighty percent of its cost
              at resale, and in competitive markets it can be the detail that
              closes a sale.
            </p>
            <p>
              We build decks to last. Every project starts with proper footings
              sized for Ontario frost depth, uses code-compliant framing
              practices, and is finished with materials chosen for our climate.
              The result is a deck you can enjoy for decades, not just a few
              seasons.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-bg-alt py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Our Deck Building Process
          </h2>
          <div className="mt-12 space-y-8">
            {[
              {
                step: "1",
                title: "Design Consultation",
                desc: "We visit your property to discuss your vision, assess the site conditions, take measurements, and talk through material options and budget. You get a detailed proposal with a layout sketch, material specifications, and an itemized quote.",
              },
              {
                step: "2",
                title: "Permits & Planning",
                desc: "We prepare and submit all required permit applications, including site plans and construction drawings. We schedule the utility locate (Ontario One Call) and coordinate any necessary inspections with your local building department.",
              },
              {
                step: "3",
                title: "Footings & Foundation",
                desc: "Proper footings are critical in Ontario where frost heave can shift poorly supported structures. We install concrete footings below the frost line (typically four feet deep) with code-compliant post brackets. Every footing is positioned precisely to the layout plan.",
              },
              {
                step: "4",
                title: "Framing & Structure",
                desc: "The substructure is built with treated lumber sized for the span and load requirements of your design. Ledger boards are properly flashed and bolted to the house. Beams, joists, and blocking are installed to code with corrosion-resistant hardware throughout.",
              },
              {
                step: "5",
                title: "Decking, Railings & Finishing",
                desc: "Your chosen decking material is installed with consistent spacing and hidden fasteners where possible. Railings, stairs, and any custom features (benches, planters, privacy screens) are built and finished. We clean the site, walk through the completed deck with you, and hand over your maintenance guide.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta text-xl font-bold text-cream">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-wood-dark">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-wood-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Deck Styles We Build
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Ground-Level Decks", desc: "Low-profile platforms that sit close to the ground. Perfect for flat backyards, walkouts, and creating a smooth indoor-outdoor transition from patio doors." },
              { title: "Raised Decks", desc: "Elevated structures that bring your outdoor living space up to the level of your main floor. Ideal for homes with basements or walkout levels." },
              { title: "Multi-Level Decks", desc: "Two or more connected platforms at different heights. Create distinct zones for cooking, dining, and lounging — perfect for sloped lots." },
              { title: "Wraparound Decks", desc: "Decks that extend around two or more sides of your home. Maximize outdoor space and give you sunny and shaded areas throughout the day." },
              { title: "Pool Decks", desc: "Designed to surround above-ground or in-ground pools with slip-resistant surfaces, proper drainage, and code-compliant barriers." },
              { title: "Rooftop & Balcony Decks", desc: "Elevated platforms for upper-level outdoor spaces. Engineered for proper load bearing, waterproofing, and drainage over occupied space below." },
            ].map((s) => (
              <div key={s.title} className="rounded-xl bg-white p-6 shadow-sm border border-sand/30">
                <h3 className="font-serif text-lg font-semibold text-wood-dark">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-wood-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="bg-bg-alt py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-wood-dark">
            Explore Our Other Services
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/services/deck-staining" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Staining</Link>
            <Link href="/services/deck-refinishing" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Refinishing</Link>
            <Link href="/services/deck-resurfacing" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Resurfacing</Link>
            <Link href="/services/deck-cleaning" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Cleaning</Link>
            <Link href="/contact" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Additional Photo */}
      <section className="bg-bg py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-lg">
          <Image src="/images/beautiful-home-deck.jpg" alt="Custom built deck showcasing quality craftsmanship" width={1200} height={800} className="h-auto w-full object-cover" />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Deck Building FAQ
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-wood-light">
            Common questions about our custom deck construction services.
          </p>
          <div className="mt-10">
            <FAQAccordion items={FAQS} />
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
