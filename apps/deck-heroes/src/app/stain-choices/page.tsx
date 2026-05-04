import type { Metadata } from "next";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Deck Stain Choices & Color Guide",
  description:
    "Comprehensive guide to deck stain types, colors, and brands. Compare transparent, semi-transparent, and solid stains. Find the perfect stain for your Ontario deck.",
  openGraph: {
    title: "Deck Stain Choices & Color Guide | Deck Heroes",
    description:
      "Compare deck stain types, colors, and top brands. Expert guide from Deck Heroes to help you choose the perfect stain.",
    url: "https://deckheroes.ca/stain-choices",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Deck Stain Choices & Color Guide",
  description:
    "Comprehensive guide to deck stain types, colors, and brands for Ontario homeowners.",
  author: {
    "@type": "Organization",
    name: "Deck Heroes",
    url: "https://deckheroes.ca",
  },
  publisher: {
    "@type": "Organization",
    name: "Deck Heroes",
    url: "https://deckheroes.ca",
  },
};

const STAIN_TYPES = [
  {
    name: "Transparent / Clear Stains",
    description:
      "Transparent stains let the full natural beauty of your wood grain shine through. They provide the most natural look but offer the least amount of UV protection. Ideal for new, high-quality wood like western red cedar where you want to showcase the grain pattern.",
    pros: [
      "Shows full wood grain and natural colour",
      "Easiest to apply and touch up",
      "No peeling or flaking over time",
      "Great for premium wood species",
    ],
    cons: [
      "Least UV protection — wood will grey faster",
      "Needs reapplication every 1-2 years",
      "Minimal colour change or enhancement",
    ],
    lifespan: "1-2 years",
    icon: (
      <svg className="h-12 w-12 text-terracotta" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={2}>
        <rect x="6" y="14" width="36" height="24" rx="2" />
        <line x1="14" y1="14" x2="14" y2="38" strokeDasharray="2 2" />
        <line x1="22" y1="14" x2="22" y2="38" strokeDasharray="2 2" />
        <line x1="30" y1="14" x2="30" y2="38" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    name: "Semi-Transparent Stains",
    description:
      "The most popular choice for Ontario decks. Semi-transparent stains add rich colour while still allowing the wood grain to show through. They strike the perfect balance between beauty and protection, making them our most recommended option for most homeowners.",
    pros: [
      "Beautiful colour with visible grain",
      "Good UV and moisture protection",
      "Wide range of colour options",
      "Ideal balance of look and durability",
    ],
    cons: [
      "Needs reapplication every 2-3 years",
      "Some prep work needed for recoating",
      "Colour may vary with wood porosity",
    ],
    lifespan: "2-3 years",
    icon: (
      <svg className="h-12 w-12 text-terracotta" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={2}>
        <rect x="6" y="14" width="36" height="24" rx="2" />
        <line x1="14" y1="14" x2="14" y2="38" opacity={0.5} />
        <line x1="22" y1="14" x2="22" y2="38" opacity={0.5} />
        <line x1="30" y1="14" x2="30" y2="38" opacity={0.5} />
        <rect x="6" y="14" width="36" height="24" rx="2" fill="currentColor" opacity={0.15} />
      </svg>
    ),
  },
  {
    name: "Solid / Opaque Stains",
    description:
      "Solid stains provide maximum protection and completely cover the wood grain with rich, even colour. They work like a thin paint, hiding imperfections and old stain. Best for older decks that need a fresh, uniform look or decks with extensive repairs.",
    pros: [
      "Maximum UV and weather protection",
      "Hides imperfections, repairs, and old stain",
      "Longest lifespan of any stain type",
      "Uniform, consistent colour finish",
    ],
    cons: [
      "Completely hides wood grain",
      "Can peel or flake if poorly applied",
      "Harder to strip if you change your mind",
    ],
    lifespan: "3-5 years",
    icon: (
      <svg className="h-12 w-12 text-terracotta" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={2}>
        <rect x="6" y="14" width="36" height="24" rx="2" fill="currentColor" opacity={0.3} />
        <rect x="6" y="14" width="36" height="24" rx="2" />
      </svg>
    ),
  },
];

const COLORS = [
  { name: "Natural Cedar", hex: "#D4A574" },
  { name: "Honey Gold", hex: "#C8933E" },
  { name: "Redwood", hex: "#8B4226" },
  { name: "Dark Walnut", hex: "#5C4033" },
  { name: "Driftwood Grey", hex: "#9E9E8E" },
  { name: "Mahogany", hex: "#6E3B2A" },
];

const BRANDS = [
  {
    name: "Benjamin Moore Arborcoat",
    description: "Premium stain with advanced alkyd technology. Excellent penetration and UV protection.",
  },
  {
    name: "Cabot",
    description: "Trusted for over 140 years. Known for deep wood penetration and rich colour.",
  },
  {
    name: "TWP (Total Wood Preservative)",
    description: "Professional-grade oil-based stain. Outstanding weather resistance for harsh climates.",
  },
  {
    name: "Ready Seal",
    description: "No back-brushing required. Self-priming with a beautiful semi-transparent finish.",
  },
];

const DECISION_FACTORS = [
  {
    factor: "Deck Age",
    guide:
      "New decks look great with transparent stains. Older decks with wear benefit from semi-transparent or solid stains that hide imperfections.",
  },
  {
    factor: "Sun Exposure",
    guide:
      "South-facing decks get intense UV. Choose semi-transparent or solid stains with higher pigment for better UV protection.",
  },
  {
    factor: "Desired Look",
    guide:
      "Want a natural wood look? Go transparent. Want rich colour with grain? Semi-transparent. Want a uniform painted look? Solid.",
  },
  {
    factor: "Maintenance Preference",
    guide:
      "Transparent stains need annual touch-ups. Semi-transparent lasts 2-3 years. Solid stains give you the longest time between coats.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Can I change from a solid stain to a transparent stain?",
    answer:
      "Going from solid to transparent requires stripping the old stain down to bare wood, which is labour-intensive but possible. Our team uses professional-grade strippers and sanders to prepare the surface. Going from transparent to solid is much easier.",
  },
  {
    question: "Does the wood species affect which stain I should choose?",
    answer:
      "Absolutely. Cedar and redwood have beautiful natural grain that looks stunning with transparent or semi-transparent stains. Pressure-treated lumber often benefits from semi-transparent or solid stains that add colour and hide the green tint.",
  },
  {
    question: "How do I know when my deck needs re-staining?",
    answer:
      "Perform the water test: sprinkle water on your deck. If it beads up, your stain is still protecting. If it soaks in, it is time to re-stain. Also watch for greying, fading, or visible wear patterns in high-traffic areas.",
  },
  {
    question: "Is it better to stain or paint a deck?",
    answer:
      "Stain is almost always better for decks. It penetrates the wood and allows it to breathe, while paint sits on top and can trap moisture, leading to peeling and rot. Stain also highlights the wood's natural texture rather than hiding it.",
  },
  {
    question: "What is the difference between deck stain and deck sealer?",
    answer:
      "Deck sealer is a clear protective coat that guards against moisture but adds no colour or UV protection. Deck stain contains pigment that protects against UV rays and adds colour. Many modern stains include sealant properties, giving you both in one product.",
  },
];

export default function StainChoicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-wood-dark py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
            Deck Stain Choices &amp; Color Guide
          </h1>
          <p className="mt-4 text-lg text-cream-dark max-w-2xl mx-auto">
            Choosing the right stain is the single most important decision for
            your deck&apos;s appearance and longevity. Let us help you find the
            perfect match.
          </p>
        </div>
      </section>

      {/* Stain Types */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-wood-dark text-center sm:text-3xl">
            Three Types of Deck Stain
          </h2>
          <p className="mt-3 text-center text-wood max-w-2xl mx-auto">
            Each stain type offers a different balance of natural beauty and
            weather protection. Here is what you need to know about each.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {STAIN_TYPES.map((stain) => (
              <div
                key={stain.name}
                className="rounded-2xl bg-white p-6 shadow-md shadow-wood-dark/5 border border-cream-dark/50 sm:p-8"
              >
                <div className="mb-4">{stain.icon}</div>
                <h3 className="font-serif text-xl font-bold text-wood-dark">
                  {stain.name}
                </h3>
                <p className="mt-2 text-sm text-wood leading-relaxed">
                  {stain.description}
                </p>
                <div className="mt-4 inline-block rounded-full bg-terracotta/10 px-3 py-1 text-xs font-semibold text-terracotta">
                  Lifespan: {stain.lifespan}
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-forest uppercase tracking-wider mb-2">
                    Advantages
                  </p>
                  <ul className="space-y-1">
                    {stain.pros.map((pro) => (
                      <li
                        key={pro}
                        className="flex items-start gap-2 text-sm text-wood"
                      >
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-forest"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-terracotta uppercase tracking-wider mb-2">
                    Considerations
                  </p>
                  <ul className="space-y-1">
                    {stain.cons.map((con) => (
                      <li
                        key={con}
                        className="flex items-start gap-2 text-sm text-wood"
                      >
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-terracotta"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01"
                          />
                        </svg>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-wood-dark text-center sm:text-3xl">
            Popular Stain Colors
          </h2>
          <p className="mt-3 text-center text-wood max-w-2xl mx-auto">
            These are the most popular deck stain colours we apply across
            Southwestern Ontario. Actual colours vary by wood species and stain
            brand.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {COLORS.map((color) => (
              <div key={color.name} className="text-center group">
                <div
                  className="mx-auto h-24 w-24 rounded-2xl shadow-md border-2 border-cream-dark/40 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="mt-3 text-sm font-semibold text-wood-dark">
                  {color.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Choose */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-wood-dark text-center sm:text-3xl">
            How to Choose the Right Stain
          </h2>
          <p className="mt-3 text-center text-wood max-w-2xl mx-auto">
            Consider these four factors when selecting a stain for your deck.
          </p>

          <div className="mt-10 space-y-6">
            {DECISION_FACTORS.map((item, i) => (
              <div
                key={item.factor}
                className="flex gap-4 rounded-xl bg-white p-5 shadow-sm border border-cream-dark/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta text-white text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-wood-dark">
                    {item.factor}
                  </h3>
                  <p className="mt-1 text-sm text-wood leading-relaxed">
                    {item.guide}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-wood-dark text-center sm:text-3xl">
            Brands We Work With
          </h2>
          <p className="mt-3 text-center text-wood max-w-2xl mx-auto">
            We use only professional-grade stains from trusted manufacturers. Our
            team will recommend the best product for your specific deck.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="rounded-xl bg-cream p-6 border border-cream-dark/50"
              >
                <h3 className="font-semibold text-wood-dark">{brand.name}</h3>
                <p className="mt-2 text-sm text-wood leading-relaxed">
                  {brand.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-wood-dark text-center sm:text-3xl mb-8">
            Stain Choices FAQ
          </h2>
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
