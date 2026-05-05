import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { COMPANY_NAME, PHONE, PHONE_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Deck Staining Services in Ontario | Deck Heroes",
  description:
    "Professional deck staining services across Southwestern Ontario. Enhance and protect your deck with premium wood stains. UV protection, moisture barrier, lasting beauty. Free estimates from Deck Heroes.",
  openGraph: {
    title: "Deck Staining Services in Ontario | Deck Heroes",
    description:
      "Enhance and protect your deck with professional staining from Deck Heroes. UV protection, moisture barrier, and lasting beauty for your outdoor space.",
    url: "https://deckheroes.ca/services/deck-staining",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Deck Staining",
  provider: {
    "@type": "LocalBusiness",
    name: "Deck Heroes",
    url: "https://deckheroes.ca",
    telephone: "+15192666796",
  },
  areaServed: {
    "@type": "State",
    name: "Ontario",
  },
  description:
    "Professional deck staining services that enhance and protect your wood deck with premium stains. Available across Southwestern Ontario.",
  serviceType: "Deck Staining",
};

const FAQS = [
  {
    question: "How often should I stain my deck?",
    answer:
      "Most decks in Ontario need re-staining every two to three years, depending on sun exposure, foot traffic, and the type of stain used. Transparent stains may need refreshing more frequently, while solid stains can last longer. We recommend a quick water-bead test each spring: sprinkle water on the surface and if it soaks in rather than beading up, it is time to re-stain.",
  },
  {
    question: "What types of wood stain do you use?",
    answer:
      "We work with premium transparent, semi-transparent, and solid stains from trusted Canadian brands. Transparent stains showcase the natural wood grain, semi-transparent stains offer a balance of colour and grain visibility, and solid stains provide maximum UV protection and colour coverage. We will help you choose the right option based on your deck material, aesthetic goals, and maintenance preferences.",
  },
  {
    question: "How long does the deck staining process take?",
    answer:
      "A typical residential deck staining project takes one to three days, including surface preparation. The prep work, which includes cleaning, sanding, and drying time, is crucial for a lasting finish. Weather plays a role as well; we need at least 48 hours of dry weather for the stain to cure properly. We will schedule your project around the forecast to ensure optimal results.",
  },
  {
    question: "Can you stain a brand new deck?",
    answer:
      "Yes, but new pressure-treated lumber needs to weather for several weeks before staining so the wood can dry and open its pores to accept the stain. We recommend waiting at least four to eight weeks after installation. New cedar and natural wood decks can typically be stained sooner. We will inspect your new deck and advise on the ideal timing.",
  },
  {
    question: "How much does deck staining cost in Ontario?",
    answer:
      "The cost depends on the size of your deck, the condition of the wood, the type of stain selected, and any prep work required. We offer free, no-obligation quotes so you know exactly what to expect. Contact us for a personalized estimate tailored to your specific project.",
  },
];

export default function DeckStainingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-wood-dark via-wood to-wood-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-bold text-cream sm:text-5xl">
            Professional Deck Staining in Ontario
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-sand-light">
            Bring out the natural beauty of your wood deck while adding lasting
            protection against the elements. Our expert staining service combines
            thorough preparation with premium products for results that endure.
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
              className="rounded-lg border-2 border-sand px-8 py-4 text-lg font-semibold text-cream transition hover:bg-white/10"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* What is Deck Staining */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            What Is Deck Staining and Why Does It Matter?
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              Deck staining is the process of applying a protective, pigmented finish
              to exposed wood surfaces. Unlike paint, stain penetrates into the wood
              fibres, creating a bond that protects from within. This means it will not
              peel or flake the way paint can, and it allows the wood to breathe
              naturally while still shielding it from moisture, ultraviolet rays, and
              temperature swings.
            </p>
            <p>
              In Ontario, your deck endures everything from intense summer sun to
              freeze-thaw cycles in winter. Without proper staining, wood quickly turns
              grey, develops cracks, and becomes vulnerable to rot and mould.
              Professional staining is the single most effective way to extend the life
              of your deck and keep it looking beautiful season after season.
            </p>
            <p>
              Beyond protection, staining enhances the natural character of the wood.
              Whether you want a subtle transparent finish that showcases every grain
              line or a rich solid colour that complements your home, the right stain
              transforms an ordinary deck into the centrepiece of your outdoor living
              space.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-sand-light/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Our Deck Staining Process
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-wood-light">
            Every project follows our proven five-step process to ensure a flawless,
            long-lasting finish.
          </p>
          <div className="mt-12 space-y-8">
            {[
              {
                step: "1",
                title: "Thorough Inspection",
                desc: "We start with a detailed assessment of your deck, checking for loose boards, popped nails, rot, mould, and previous coating condition. This helps us plan the right approach and give you an accurate quote.",
              },
              {
                step: "2",
                title: "Deep Cleaning",
                desc: "Using professional-grade deck cleaners and controlled pressure washing, we remove dirt, mildew, grey weathering, and old stain residue. This step opens the wood pores so the new stain can penetrate deeply and bond properly.",
              },
              {
                step: "3",
                title: "Surface Preparation",
                desc: "After the wood dries completely, we sand rough spots, tighten any loose fasteners, replace damaged boards if needed, and apply wood brightener to restore the ideal pH balance. Proper prep is the foundation of a lasting finish.",
              },
              {
                step: "4",
                title: "Premium Stain Application",
                desc: "We apply your chosen stain using brushes, rollers, or professional sprayers depending on the surface. Two coats are applied to high-traffic areas for extra durability. We carefully mask railings, siding, and landscaping to keep everything clean.",
              },
              {
                step: "5",
                title: "Final Inspection & Walkthrough",
                desc: "Once the stain has cured, we inspect every square foot and walk through the results with you. We will also share maintenance tips tailored to your specific stain and wood type to help you get the most life out of your new finish.",
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

      {/* Benefits */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Benefits of Professional Deck Staining
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {[
              {
                title: "UV Protection",
                desc: "Pigmented stains block harmful ultraviolet rays that break down wood fibres, preventing greying, cracking, and surface degradation. Your deck keeps its colour and structural integrity much longer.",
                icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
              },
              {
                title: "Moisture Barrier",
                desc: "Quality stains repel water and prevent it from soaking into the wood grain, which is essential in Ontario where rain, snow, and freeze-thaw cycles can cause boards to warp, split, and rot.",
                icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
              },
              {
                title: "Enhanced Natural Beauty",
                desc: "Staining brings out the rich tones and grain patterns in your wood, whether it is cedar, pine, or pressure-treated lumber. Choose from a wide range of colours to match your home and landscape.",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
              },
              {
                title: "Increased Home Value",
                desc: "A well-maintained, beautifully stained deck boosts your curb appeal and adds tangible value to your property. Buyers notice outdoor spaces, and a fresh stain makes a powerful first impression.",
                icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
              },
            ].map((b) => (
              <div key={b.title} className="rounded-xl bg-white p-6 shadow-sm border border-sand/30">
                <svg className="h-8 w-8 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                </svg>
                <h3 className="mt-4 font-serif text-xl font-semibold text-wood-dark">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-wood-light">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stain Types */}
      <section className="bg-sand-light/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Stain Types We Use
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                type: "Transparent",
                desc: "Maximum grain visibility with light UV protection. Best for new, high-quality wood where you want the natural character to shine through. Requires more frequent reapplication but delivers a stunning, natural look.",
              },
              {
                type: "Semi-Transparent",
                desc: "The most popular choice. Adds a wash of colour while still allowing the wood grain and texture to show through. Offers good UV and moisture protection with moderate maintenance requirements.",
              },
              {
                type: "Solid",
                desc: "Full colour coverage similar to paint, but still penetrates the wood. Ideal for older decks with imperfections you want to conceal, or when you want a specific colour to match your home. Maximum UV protection and longest lifespan.",
              },
            ].map((s) => (
              <div key={s.type} className="rounded-xl bg-white p-6 shadow-sm border border-sand/30 text-center">
                <h3 className="font-serif text-xl font-semibold text-terracotta">
                  {s.type}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-wood-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="bg-cream py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-wood-dark">
            Explore Our Other Services
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/services/deck-sealing" className="rounded-lg bg-sand-light/60 px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">
              Deck Sealing
            </Link>
            <Link href="/services/deck-refinishing" className="rounded-lg bg-sand-light/60 px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">
              Deck Refinishing
            </Link>
            <Link href="/services/fence-staining" className="rounded-lg bg-sand-light/60 px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">
              Fence Staining
            </Link>
            <Link href="/contact" className="rounded-lg bg-sand-light/60 px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand-light/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Deck Staining FAQ
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-wood-light">
            Common questions about our deck staining services.
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
