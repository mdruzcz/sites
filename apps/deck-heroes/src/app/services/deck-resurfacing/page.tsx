import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { PHONE, PHONE_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Deck Resurfacing Services in Ontario | Deck Heroes",
  description:
    "Professional deck resurfacing across Southwestern Ontario. Replace worn boards, repair substructure, and give your deck a brand-new surface without a full rebuild. Free estimates from Deck Heroes.",
  openGraph: {
    title: "Deck Resurfacing Services in Ontario | Deck Heroes",
    description:
      "Give your deck a brand-new surface without tearing it all down. Professional resurfacing from Deck Heroes across Southwestern Ontario.",
    url: "https://deckheroes.ca/services/deck-resurfacing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Deck Resurfacing",
  provider: {
    "@type": "LocalBusiness",
    name: "Deck Heroes",
    url: "https://deckheroes.ca",
    telephone: "+15198786735",
  },
  areaServed: { "@type": "State", name: "Ontario" },
  description:
    "Professional deck resurfacing services. Replace worn deck boards and give your outdoor space a fresh surface without rebuilding the entire structure.",
  serviceType: "Deck Resurfacing",
};

const FAQS = [
  {
    question: "What is the difference between resurfacing and rebuilding a deck?",
    answer:
      "Resurfacing replaces only the top layer of your deck — the boards you walk on, and sometimes the railings — while keeping the existing substructure (joists, beams, posts, and ledger board) intact. A full rebuild tears everything down to the footings and starts fresh. Resurfacing is the right choice when your framing is still structurally sound but the surface boards are worn, splintered, warped, or rotting. It typically costs forty to sixty percent less than a complete rebuild and takes significantly less time.",
  },
  {
    question: "How do I know if my deck can be resurfaced instead of replaced?",
    answer:
      "The key factor is the condition of the substructure. If your joists, beams, and posts are solid, level, and free of significant rot or insect damage, resurfacing is almost always viable. During our free inspection, we probe the framing, check for level and plumb, inspect connections, and assess the ledger board attachment to your home. We will give you an honest recommendation — if the structure needs work, we will tell you before any boards come off.",
  },
  {
    question: "What materials can I choose for my new deck surface?",
    answer:
      "You have several options. Pressure-treated lumber is the most affordable and works well when stained. Cedar offers natural beauty and rot resistance. Composite decking (like Trex or TimberTech) requires virtually no maintenance and comes in a wide range of colours and textures. PVC decking is fully synthetic and extremely durable. We will walk you through the pros, cons, and costs of each material so you can choose what fits your budget and lifestyle.",
  },
  {
    question: "How long does deck resurfacing take?",
    answer:
      "Most residential deck resurfacing projects take three to five days. Removing the old boards is typically a one-day job, followed by any joist repairs, then installing the new surface. Larger decks, multi-level designs, or projects involving railing replacement may take a bit longer. Weather can also be a factor. We will give you a clear timeline in your quote.",
  },
  {
    question: "How much does deck resurfacing cost in Ontario?",
    answer:
      "Cost depends on the size of your deck, the condition of the substructure, the material you choose for the new surface, and whether railings are included. Pressure-treated resurfacing is the most budget-friendly, while composite and PVC cost more upfront but save on long-term maintenance. We provide free, detailed quotes so you can compare options side by side.",
  },
];

export default function DeckResurfacingPage() {
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
            Deck Resurfacing in Ontario
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-sand-light">
            Your deck frame is still solid, but the surface has seen better days.
            Our resurfacing service replaces worn, warped, or splintered boards
            with fresh material — giving you a like-new deck at a fraction of the
            cost of a full rebuild.
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

      {/* What is Resurfacing */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Why Resurface Instead of Rebuild?
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              Many homeowners assume that a worn-out deck surface means the whole
              structure needs to go. In most cases, that is not true. The
              substructure — the joists, beams, posts, and footings that hold
              everything up — is built to last decades. It is the surface boards
              that take the punishment: foot traffic, furniture, UV exposure, rain,
              snow, and freeze-thaw cycles all wear down the top layer while the
              frame underneath remains perfectly sound.
            </p>
            <p>
              Resurfacing lets you keep that solid foundation and replace only what
              needs replacing. The result looks and feels like a brand-new deck,
              but the project costs significantly less, takes less time, and
              produces far less waste than tearing everything down and starting
              from scratch.
            </p>
            <p>
              It is also a chance to upgrade. If your original deck was built with
              pressure-treated lumber, resurfacing lets you switch to composite,
              cedar, or PVC without rebuilding the frame. Many of our clients use
              resurfacing as an opportunity to modernize their outdoor space with
              low-maintenance materials and updated railing styles.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-sand-light/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Our Resurfacing Process
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-wood-light">
            A systematic approach that protects your investment and delivers a
            flawless new surface.
          </p>
          <div className="mt-12 space-y-8">
            {[
              {
                step: "1",
                title: "Structural Assessment",
                desc: "We inspect every joist, beam, post, and connection point. We check for rot, insect damage, level, and bearing capacity. You get an honest report on what is sound and what needs attention before a single board comes off.",
              },
              {
                step: "2",
                title: "Old Surface Removal",
                desc: "We carefully remove the existing deck boards and any damaged railings. This gives us full access to the substructure for a closer inspection and any necessary repairs. We haul away all old material and leave a clean work site.",
              },
              {
                step: "3",
                title: "Substructure Repair",
                desc: "Any joists showing early signs of wear are sistered or replaced. We re-secure connections, add blocking where needed for the new board layout, and ensure the frame is level and code-compliant. This step is what separates a professional resurface from a cosmetic cover-up.",
              },
              {
                step: "4",
                title: "New Surface Installation",
                desc: "Your chosen decking material is installed with precision. We use hidden fasteners where possible for a clean look, maintain consistent gap spacing for drainage, and ensure every board is straight and secure. Railings and stairs are updated to match.",
              },
              {
                step: "5",
                title: "Finishing & Walkthrough",
                desc: "For wood surfaces, we apply your chosen stain or sealer. Composite and PVC surfaces are cleaned and inspected. We walk through the finished deck with you, explain maintenance requirements, and make sure you are completely satisfied.",
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

      {/* Material Options */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Resurfacing Material Options
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {[
              {
                title: "Pressure-Treated Lumber",
                desc: "The most affordable option. Widely available, easy to work with, and performs well when properly stained and maintained. Ideal for budget-conscious projects where you plan to stain the surface.",
                icon: "M4 6h16M4 10h16M4 14h16M4 18h16",
              },
              {
                title: "Western Red Cedar",
                desc: "Naturally rot-resistant with a beautiful warm tone and tight grain. Cedar weathers gracefully and can be left natural or stained. A premium wood choice that balances beauty and durability.",
                icon: "M12 3v18m-6-6l6 6 6-6M6 9l6-6 6 6",
              },
              {
                title: "Composite Decking",
                desc: "Made from a blend of wood fibres and recycled plastic. Resists fading, staining, scratching, and mould. Never needs staining or sealing. Available in realistic wood-grain textures and a wide colour palette.",
                icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
              },
              {
                title: "PVC Decking",
                desc: "One hundred percent synthetic with no wood content. Extremely resistant to moisture, insects, and fading. Lightweight, easy to clean, and backed by lengthy manufacturer warranties. The ultimate low-maintenance choice.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              },
            ].map((m) => (
              <div key={m.title} className="rounded-xl bg-white p-6 shadow-sm border border-sand/30">
                <svg className="h-8 w-8 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
                </svg>
                <h3 className="mt-4 font-serif text-xl font-semibold text-wood-dark">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-wood-light">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="bg-sand-light/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-wood-dark">
            Explore Our Other Services
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/services/deck-staining" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Staining</Link>
            <Link href="/services/deck-refinishing" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Refinishing</Link>
            <Link href="/services/deck-building" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Building</Link>
            <Link href="/services/deck-cleaning" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Cleaning</Link>
            <Link href="/contact" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Deck Resurfacing FAQ
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-wood-light">
            Common questions about our deck resurfacing services.
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
