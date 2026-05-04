import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { PHONE, PHONE_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Deck Sealing & Waterproofing Services in Ontario | Deck Heroes",
  description:
    "Protect your deck from water damage, rot, and Ontario winters with professional deck sealing from Deck Heroes. Premium waterproof sealants, expert application. Free estimates.",
  openGraph: {
    title: "Deck Sealing & Waterproofing Services in Ontario | Deck Heroes",
    description:
      "Shield your deck from moisture, mould, and freeze-thaw damage with professional sealing from Deck Heroes.",
    url: "https://deckheroes.ca/services/deck-sealing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Deck Sealing",
  provider: {
    "@type": "LocalBusiness",
    name: "Deck Heroes",
    url: "https://deckheroes.ca",
    telephone: "+15192666796",
  },
  areaServed: { "@type": "State", name: "Ontario" },
  description:
    "Professional deck sealing and waterproofing services that protect your wood deck from moisture damage, rot, and harsh Ontario weather.",
  serviceType: "Deck Sealing",
};

const FAQS = [
  {
    question: "What is the difference between deck sealing and deck staining?",
    answer:
      "Deck sealing focuses primarily on creating a waterproof barrier to protect wood from moisture, mould, and rot. Sealers are often clear or lightly tinted. Deck staining, on the other hand, adds colour pigment for UV protection and aesthetics while also offering some moisture resistance. Many homeowners choose a combination approach. We can help you decide what is best for your deck during a free consultation.",
  },
  {
    question: "How often does a deck need to be resealed?",
    answer:
      "In Ontario's climate, most decks benefit from resealing every one to three years, depending on the sealant type and sun exposure. High-traffic areas and decks with full southern exposure may need more frequent attention. A simple water test, where you sprinkle water on the surface and watch whether it beads or absorbs, is the best way to determine if it is time for a fresh coat.",
  },
  {
    question: "Can you seal a composite or Trex deck?",
    answer:
      "Composite decking generally does not require traditional sealing because it is manufactured with built-in moisture resistance. However, composite decks can still benefit from UV-protective coatings and specialized composite sealers to prevent fading and surface chalking. We carry products designed specifically for composite materials and can assess whether your composite deck would benefit from treatment.",
  },
  {
    question: "Is deck sealing safe for pets and children?",
    answer:
      "The sealants we use are safe once fully cured, which typically takes 24 to 48 hours depending on temperature and humidity. During the curing period, we recommend keeping pets and children off the treated surface. We use low-VOC and environmentally responsible products whenever possible and will advise you on the exact timeline for your specific project.",
  },
  {
    question: "What is the best time of year to seal a deck in Ontario?",
    answer:
      "Late spring through early fall is ideal, with temperatures between 10 and 30 degrees Celsius and no rain in the forecast for at least 48 hours after application. We avoid sealing in direct, intense sunlight as it can cause the product to dry too quickly and not penetrate properly. Our team monitors weather closely and will schedule your project for optimal conditions.",
  },
];

export default function DeckSealingPage() {
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
            Deck Sealing &amp; Waterproofing in Ontario
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-sand-light">
            Ontario weather is tough on outdoor wood. Our professional deck sealing
            service creates a durable moisture barrier that prevents water damage, rot,
            and mould, keeping your deck safe and solid for years.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="rounded-lg bg-terracotta px-8 py-4 text-lg font-semibold text-cream shadow-lg transition hover:bg-terra-dark">
              Get a Free Quote
            </Link>
            <a href={PHONE_HREF} className="rounded-lg border-2 border-sand px-8 py-4 text-lg font-semibold text-cream transition hover:bg-white/10">
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Why Sealing Matters */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Why Deck Sealing Is Essential in Ontario
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              Water is the number one enemy of outdoor wood. In Southwestern Ontario,
              your deck faces rain, snow, ice, and humidity throughout the year. When
              water penetrates unsealed wood, it causes the fibres to swell and
              contract with each freeze-thaw cycle. Over time, this leads to cracking,
              splitting, warping, and eventually structural rot that can compromise the
              safety of your deck.
            </p>
            <p>
              Professional deck sealing creates an invisible barrier that repels water
              at the surface while still allowing the wood to breathe. This prevents
              moisture from entering the grain while letting trapped vapour escape,
              which is critical for preventing mould and mildew growth on the underside
              of your deck boards.
            </p>
            <p>
              Sealing also protects against greying caused by UV exposure and reduces
              the likelihood of splinters by keeping the wood fibres intact and
              flexible. A properly sealed deck feels smoother underfoot, resists
              staining from spills and leaf tannins, and requires far less maintenance
              than an unsealed surface.
            </p>
            <p>
              Think of sealing as an insurance policy for your deck investment. The
              cost of regular sealing is a fraction of the cost of replacing rotted
              boards or rebuilding a neglected structure. It is one of the smartest
              things you can do to protect your home.
            </p>
          </div>
        </div>
      </section>

      {/* Our Sealing Process */}
      <section className="bg-sand-light/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Our Deck Sealing Process
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-wood-light">
            A systematic approach that ensures maximum protection and a flawless finish.
          </p>
          <div className="mt-12 space-y-8">
            {[
              {
                step: "1",
                title: "Moisture & Condition Assessment",
                desc: "We use a moisture meter to measure the water content of your deck boards and inspect for existing damage, rot, or mould. This determines whether the wood is ready for sealing or needs to dry further. We also check the condition of any previous sealant.",
              },
              {
                step: "2",
                title: "Professional Cleaning",
                desc: "We remove dirt, algae, mildew, and any remaining old sealant with specialized deck cleaners and controlled pressure washing. We carefully calibrate the pressure to avoid damaging the wood fibres while ensuring a thoroughly clean surface.",
              },
              {
                step: "3",
                title: "Brightening & Drying",
                desc: "After cleaning, we apply a wood brightener to neutralize the cleaners and restore the ideal pH level. The deck then needs to dry completely, typically 48 to 72 hours, before we proceed. Rushing this step compromises the sealant bond.",
              },
              {
                step: "4",
                title: "Sealant Application",
                desc: "We apply the selected sealant using back-brushing techniques that work the product deep into the wood grain. Special attention is given to end-grain cuts, joints, and areas where water tends to pool. These vulnerable spots receive additional coats for maximum protection.",
              },
              {
                step: "5",
                title: "Cure Time & Quality Check",
                desc: "Once applied, the sealant needs proper cure time without foot traffic or moisture. We perform a final quality check, conduct a water-bead test to confirm penetration, and walk you through maintenance recommendations specific to your sealant type.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta text-xl font-bold text-cream">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-wood-dark">{item.title}</h3>
                  <p className="mt-2 text-wood-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sealant Types */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Types of Deck Sealants We Use
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                type: "Penetrating Water Repellents",
                desc: "These sealers soak into the wood and repel moisture from within without changing the appearance. Ideal for homeowners who want invisible protection while maintaining the deck's natural look and feel.",
              },
              {
                type: "Film-Forming Sealers",
                desc: "These create a protective coating on the surface that provides excellent water resistance and adds a subtle sheen. They offer strong protection but may require more frequent maintenance in high-traffic areas.",
              },
              {
                type: "Hybrid Stain-Sealers",
                desc: "Combining the moisture protection of a sealer with light colour pigment, hybrids offer the best of both worlds. They protect against water and UV while adding a hint of warmth to the wood tone.",
              },
            ].map((s) => (
              <div key={s.type} className="rounded-xl bg-white p-6 shadow-sm border border-sand/30 text-center">
                <h3 className="font-serif text-lg font-semibold text-terracotta">{s.type}</h3>
                <p className="mt-3 text-sm leading-relaxed text-wood-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Water Damage Prevention */}
      <section className="bg-sand-light/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Preventing Water Damage Before It Starts
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {[
              { title: "Stops Rot & Decay", desc: "Sealed wood resists the moisture that fuels fungal growth and wood-destroying organisms. This extends the structural life of your deck by years." },
              { title: "Prevents Warping", desc: "By controlling moisture absorption, sealing keeps boards flat and stable. No more cupped, twisted, or bowed decking underfoot." },
              { title: "Eliminates Mould & Mildew", desc: "A sealed surface denies mould the damp environment it needs to grow, keeping your deck healthier and safer for bare feet." },
              { title: "Reduces Maintenance", desc: "Sealed decks shed dirt, resist stains from leaves and spills, and need far less scrubbing and cleaning than unsealed surfaces." },
            ].map((b) => (
              <div key={b.title} className="rounded-xl bg-white p-6 shadow-sm border border-sand/30">
                <h3 className="font-serif text-lg font-semibold text-wood-dark">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-wood-light">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="bg-cream py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-wood-dark">Explore Our Other Services</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/services/deck-staining" className="rounded-lg bg-sand-light/60 px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Staining</Link>
            <Link href="/services/deck-refinishing" className="rounded-lg bg-sand-light/60 px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Refinishing</Link>
            <Link href="/services/fence-staining" className="rounded-lg bg-sand-light/60 px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Fence Staining</Link>
            <Link href="/contact" className="rounded-lg bg-sand-light/60 px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand-light/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">Deck Sealing FAQ</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-wood-light">Common questions about our deck sealing and waterproofing services.</p>
          <div className="mt-10">
            <FAQAccordion faqs={FAQS} />
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
