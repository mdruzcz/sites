export type BlogPost = {
  slug: string;
  title: string;
  /**
   * Optional shorter title used in <title> meta only (kept under 60 chars
   * once the " | London Deck Builder" suffix is appended by the layout
   * template). When omitted, `title` is used.
   */
  seoTitle?: string;
  description: string;
  date: string;
  category: "Buying Guide" | "Maintenance" | "Permits" | "Design" | "Cost" | "Materials";
  readingMinutes: number;
  heroImage: string;
  heroAlt: string;
  /** Body is a list of section blocks, rendered in order. */
  body: PostBlock[];
};

export type PostBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; html: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title: string; body: string; href?: string; cta?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export const POSTS: BlogPost[] = [
  {
    slug: "composite-vs-pressure-treated-decking",
    title: "Composite vs Pressure-Treated Decking: Which Should You Build in Ontario?",
    seoTitle: "Composite vs Pressure-Treated Decking in Ontario",
    description:
      "A practical Ontario homeowner's guide comparing composite and PT decking — cost, lifespan, maintenance, look and resale value.",
    date: "2026-03-15",
    category: "Buying Guide",
    readingMinutes: 9,
    heroImage: "/images/IMG-9498-scaled-2.jpg",
    heroAlt: "Composite deck built by London Deck Builder, comparing material choices",
    body: [
      {
        type: "p",
        html: "Choosing between composite and pressure-treated (PT) lumber is the single biggest decision most Ontario homeowners make when building a deck. The two materials look similar from a distance — but they live very different lives. After 500+ builds across London, Woodstock, St. Thomas and the surrounding area, here's the honest breakdown we give every client.",
      },
      { type: "h2", text: "The 30-second answer" },
      {
        type: "p",
        html: "<strong>Pressure-treated</strong> is roughly 40–50% cheaper up front, but needs sealing or staining every 2–3 years to last. <strong>Composite</strong> costs more up front but is nearly maintenance-free for 25+ years — and most homeowners come out ahead on lifetime cost.",
      },
      { type: "h2", text: "What is pressure-treated lumber, exactly?" },
      {
        type: "p",
        html: "Pressure-treated lumber is softwood (typically southern yellow pine or spruce) that's been chemically treated to resist rot, fungi and insects. In Canada, the chemical of choice is now ACQ (alkaline copper quaternary) — safer than older CCA treatments and approved for residential use.",
      },
      {
        type: "ul",
        items: [
          "Cost: roughly $4–$7 per square foot of decking material",
          "Lifespan: 10–15 years with proper maintenance, 20+ with annual care",
          "Maintenance: stain or seal every 2–3 years; occasional board replacement",
          "Look: classic wood grain, ages to silvery grey if left unsealed",
        ],
      },
      { type: "h2", text: "What is composite decking?" },
      {
        type: "p",
        html: "Composite decking is engineered from recycled wood fibres and recycled plastic, typically wrapped in a polymer shell (\"capped composite\"). Modern brands like Trex, TimberTech, MoistureShield and Fiberon now closely mimic the look of stained hardwood — but never need staining, won't splinter, and resist fading.",
      },
      {
        type: "ul",
        items: [
          "Cost: roughly $10–$18 per square foot of decking material",
          "Lifespan: 25–30 years; many brands offer 25-year warranties",
          "Maintenance: occasional wash with soap and water — that's it",
          "Look: factory-finished, consistent colour, slip-resistant",
        ],
      },
      { type: "h2", text: "Total cost over 20 years (a real Ontario example)" },
      {
        type: "p",
        html: "For a 400 sq ft deck in London, here's the actual cost we tracked over 20 years on two side-by-side builds (one PT, one composite):",
      },
      {
        type: "ul",
        items: [
          "<strong>PT deck — build cost:</strong> $11,500 in 2026 dollars",
          "<strong>PT deck — 20-year maintenance:</strong> $4,800 (staining/sealing every 2.5 yrs, two board replacements)",
          "<strong>PT deck — total at 20 yrs:</strong> ~$16,300, and the deck is at end of life",
          "<strong>Composite deck — build cost:</strong> $18,400 in 2026 dollars",
          "<strong>Composite deck — 20-year maintenance:</strong> $400 (wash kit + minor repairs)",
          "<strong>Composite deck — total at 20 yrs:</strong> ~$18,800, and the deck has 5–10 years left",
        ],
      },
      { type: "h2", text: "When PT still makes the most sense" },
      {
        type: "ul",
        items: [
          "Tight budget, or you plan to move within 5 years",
          "You actually enjoy the look of natural wood and don't mind staining",
          "The deck is small enough that maintenance is trivial",
          "You want a rustic, cottage-style look that ages to a grey patina",
        ],
      },
      {
        type: "callout",
        title: "Already have a wood deck and need it refreshed?",
        body: "Master Decker (our sister company) handles professional deck staining, sealing and refinishing across Southwestern Ontario. They use commercial-grade stains that hold colour for 4+ years.",
        href: "https://masterdecker.com",
        cta: "Visit Master Decker",
      },
      { type: "h2", text: "When composite is the obvious winner" },
      {
        type: "ul",
        items: [
          "You're staying in the home long-term (10+ years)",
          "You hate maintenance, or live somewhere where staining is a hassle",
          "The deck gets heavy sun exposure — composite resists UV fading better",
          "You want a polished, modern look to lift resale value",
        ],
      },
      { type: "h2", text: "What we actually recommend in Ontario" },
      {
        type: "p",
        html: "For most clients in London, Woodstock or St. Thomas planning to stay 7+ years, we recommend composite. For shorter-term owners or smaller decks under 200 sq ft, PT is hard to beat. We'll quote both side-by-side for free — it's the easiest way to compare.",
      },
      {
        type: "callout",
        title: "Concrete pad or footings needed?",
        body: "Larger decks, hot tubs, and ground-level builds often need a concrete pad or proper footings. London Concrete Forming handles the concrete side so we can focus on the build.",
        href: "https://londonconcreteforming.ca",
        cta: "Visit London Concrete Forming",
      },
    ],
  },
  {
    slug: "deck-permit-guide-london-ontario",
    title: "The Deck Permit Guide for London, Ontario (2026)",
    seoTitle: "Deck Permit Guide for London, Ontario (2026)",
    description:
      "Everything you need to know about deck permits in London, Middlesex County and Elgin County — when you need one, how to get one, and what inspectors actually check.",
    date: "2026-03-08",
    category: "Permits",
    readingMinutes: 7,
    heroImage: "/images/Permit.jpg",
    heroAlt: "Deck permit paperwork for a London Ontario backyard deck",
    body: [
      {
        type: "p",
        html: "Most homeowners in Southwestern Ontario need a building permit for any deck more than 24\" (600 mm) above grade — but the rules vary by municipality. This guide covers London, Middlesex County and Elgin County. We pull permits for our clients as part of the build, but it's good to know what's going on behind the scenes.",
      },
      { type: "h2", text: "When you need a permit in London, Ontario" },
      {
        type: "ul",
        items: [
          "<strong>Decks over 600 mm (24\") high:</strong> permit required",
          "<strong>Decks attached to your house:</strong> permit required regardless of height (ledger flashing is inspected)",
          "<strong>Roofed or covered decks:</strong> permit required, plus structural review",
          "<strong>Decks under 600 mm and detached:</strong> usually no permit, but zoning setbacks still apply",
        ],
      },
      {
        type: "p",
        html: "If you're in St. Thomas, Strathroy-Caradoc, Woodstock, Tillsonburg or any of the other surrounding municipalities, the rules are similar — but always confirm with the local building department.",
      },
      { type: "h2", text: "What inspectors actually check" },
      {
        type: "p",
        html: "Inspectors don't show up to admire the finish — they're looking for safety. Specifically:",
      },
      {
        type: "ul",
        items: [
          "<strong>Footings:</strong> sized correctly (typically 10–12\" diameter) and below frost line (1.2 m / 4 ft in Ontario)",
          "<strong>Ledger board:</strong> properly bolted to the house with structural lag screws, flashing in place to keep water out",
          "<strong>Beam and joist spans:</strong> consistent with OBC tables",
          "<strong>Railings:</strong> 36\" min for decks under 5'11\" above grade, 42\" for higher decks; balusters max 4\" apart",
          "<strong>Stair geometry:</strong> consistent rise/run, graspable handrail",
        ],
      },
      { type: "h2", text: "Typical permit timeline" },
      {
        type: "ul",
        items: [
          "Plan preparation: 3–5 business days (we handle this)",
          "Permit submission to review: 1–2 weeks in London",
          "Construction inspection: footings inspected after digging, framing inspected before decking goes on, final inspection at completion",
        ],
      },
      {
        type: "callout",
        title: "Concrete footings done right",
        body: "Footings are the first thing inspectors check. We work with London Concrete Forming on larger or trickier projects to get footings poured properly, sized and inspected without delays.",
        href: "https://londonconcreteforming.ca",
        cta: "London Concrete Forming",
      },
      { type: "h2", text: "Cost of a deck permit" },
      {
        type: "p",
        html: "In London, deck permit fees are typically $150–$350 depending on the deck size and complexity. In St. Thomas and Strathroy-Caradoc, fees usually fall in the $120–$280 range. We include the permit fee in our quote so there are no surprises.",
      },
      { type: "h2", text: "What happens if you skip the permit" },
      {
        type: "p",
        html: "A few real consequences we've seen:",
      },
      {
        type: "ul",
        items: [
          "Forced removal of the deck if a complaint is filed (rare, but it happens)",
          "Failed home inspection on resale — buyers often walk away or demand a price cut",
          "Insurance claims denied if injury occurs on an unpermitted structure",
          "Retroactive permit fees, typically double the original",
        ],
      },
      { type: "h2", text: "We handle the permit for you" },
      {
        type: "p",
        html: "Permit hassles are why a lot of homeowners hire us. We draw the plans, submit them, schedule the inspections, and meet the inspector on-site. You just sign the forms.",
      },
    ],
  },
  {
    slug: "deck-maintenance-schedule",
    title: "The Honest Deck Maintenance Schedule (Composite, Cedar &amp; PT)",
    seoTitle: "Deck Maintenance Schedule (Composite, Cedar & PT)",
    description:
      "What deck maintenance actually looks like across composite, cedar and pressure-treated builds — month by month and year by year.",
    date: "2026-02-22",
    category: "Maintenance",
    readingMinutes: 6,
    heroImage: "/images/Deck-Cleaning.jpg",
    heroAlt: "Pressure treated deck mid-restoration showing the difference cleaning makes",
    body: [
      {
        type: "p",
        html: "Most \"deck maintenance\" articles read like a religious calendar — clean monthly, seal annually, sand bi-annually. The reality is much simpler. Here's what you actually need to do, broken down by material.",
      },
      { type: "h2", text: "Composite decking" },
      {
        type: "ul",
        items: [
          "<strong>Spring:</strong> One wash with warm soapy water and a soft-bristle brush. That's it.",
          "<strong>Mid-summer:</strong> Spot-clean any food spills or bird droppings within a day or two",
          "<strong>Fall:</strong> Clear leaves so they don't stain the boards over winter",
          "<strong>Winter:</strong> Plastic shovel only — never metal. Avoid rock salt; use calcium chloride if needed",
        ],
      },
      { type: "h2", text: "Cedar decks" },
      {
        type: "ul",
        items: [
          "<strong>Year 1:</strong> Let the cedar acclimate for 6–12 months before staining",
          "<strong>Year 1–2:</strong> Apply a UV-blocking semi-transparent stain to lock in the colour",
          "<strong>Every 2–3 years:</strong> Clean and re-stain. Cedar that's not maintained turns silver — beautiful to some, neglected-looking to others",
          "<strong>Annual:</strong> Check for any nail/screw pops, especially around perimeter boards",
        ],
      },
      { type: "h2", text: "Pressure-treated decks" },
      {
        type: "ul",
        items: [
          "<strong>Year 1:</strong> Wait 6 months before sealing — fresh PT is still drying out",
          "<strong>Every 2–3 years:</strong> Pressure wash, light sand, apply solid or semi-transparent stain/sealer",
          "<strong>Every 7–10 years:</strong> Inspect for rot at posts and ledger; replace any soft boards",
        ],
      },
      {
        type: "callout",
        title: "Tired of staining your own deck?",
        body: "Master Decker specializes in deck cleaning, sanding, staining and sealing across Southwestern Ontario — and uses commercial-grade products that last 3–5 years between coats.",
        href: "https://masterdecker.com",
        cta: "Get a refinishing quote",
      },
      { type: "h2", text: "Mistakes that destroy decks" },
      {
        type: "ul",
        items: [
          "Power washing too aggressively (rips up wood fibres, causes splintering)",
          "Using deck cleaner with chlorine bleach (degrades wood and metal hardware)",
          "Leaving leaves and snow piled against the house ledger — that's how rot starts",
          "Planters with no saucers sitting directly on boards (traps moisture)",
        ],
      },
    ],
  },
  {
    slug: "deck-cost-guide-ontario",
    title: "How Much Does a Deck Really Cost in London, Ontario? (2026 Pricing)",
    seoTitle: "Deck Cost in London, Ontario (2026 Pricing Guide)",
    description:
      "Real 2026 deck pricing for Southwestern Ontario — broken down by material, size and feature, with three real project examples.",
    date: "2026-02-10",
    category: "Cost",
    readingMinutes: 8,
    heroImage: "/images/Wilmot-Deck-and-Concrete-rotated-2.jpg",
    heroAlt: "Custom multi-level deck and concrete project in London Ontario",
    body: [
      {
        type: "p",
        html: "We get asked this every week: \"Roughly what does a deck cost?\" The honest answer is \"it depends\" — but here are the actual 2026 numbers for London, Woodstock, St. Thomas and the surrounding area.",
      },
      { type: "h2", text: "Per-square-foot pricing in 2026" },
      {
        type: "ul",
        items: [
          "<strong>Pressure-treated, simple build:</strong> $35–$50/sq ft",
          "<strong>Cedar, mid-range build:</strong> $50–$75/sq ft",
          "<strong>Composite (Trex/TimberTech mid-range):</strong> $65–$95/sq ft",
          "<strong>Composite (premium / capped PVC):</strong> $90–$130/sq ft",
        ],
      },
      {
        type: "p",
        html: "These are all-in numbers — they include materials, labour, footings, fasteners, permit fees and 5-year workmanship warranty.",
      },
      { type: "h2", text: "Three real project examples (built in 2025)" },
      { type: "h3", text: "Project 1: 200 sq ft PT back deck, Old North London" },
      {
        type: "p",
        html: "Simple 12'×16' single-level pressure-treated deck off the kitchen, with a basic railing and one set of stairs. <strong>Total: $7,800 + HST.</strong>",
      },
      { type: "h3", text: "Project 2: 320 sq ft composite deck, Woodstock" },
      {
        type: "p",
        html: "16'×20' mid-range Trex composite deck with hidden fasteners, aluminum railing, and stairs to grade. Permit included. <strong>Total: $24,400 + HST.</strong>",
      },
      { type: "h3", text: "Project 3: 540 sq ft multi-level cedar deck with pergola, St. Thomas" },
      {
        type: "p",
        html: "Two levels, a built-in bench, integrated lighting, and a cedar pergola overhead. Concrete footings done by our partners. <strong>Total: $41,800 + HST.</strong>",
      },
      {
        type: "callout",
        title: "Concrete footings or pads driving up your quote?",
        body: "If your deck needs significant concrete work (large pads, structural footings, walkways), it can be cheaper to use a dedicated concrete contractor. We coordinate directly with London Concrete Forming on bigger jobs.",
        href: "https://londonconcreteforming.ca",
        cta: "Visit London Concrete Forming",
      },
      { type: "h2", text: "What changes the price the most" },
      {
        type: "ul",
        items: [
          "<strong>Height above grade:</strong> taller decks need more footings, longer posts, more rail",
          "<strong>Stairs:</strong> stairs are labour-heavy. A simple set adds $800–$1,800; a wide flared set, $2,500+",
          "<strong>Railings:</strong> wood = cheapest, aluminum = mid, glass = premium",
          "<strong>Site access:</strong> tight access or sloped lots add labour hours",
          "<strong>Demolition of old deck:</strong> typically $1,500–$3,500",
          "<strong>Permits and engineered drawings:</strong> $150–$1,200 depending on complexity",
        ],
      },
      { type: "h2", text: "Where homeowners waste money (and where they shouldn't cut corners)" },
      {
        type: "p",
        html: "Save on:",
      },
      {
        type: "ul",
        items: [
          "Decorative post caps — fine, but not worth $400+ on a small deck",
          "Premium hardwood when mid-range composite looks 90% as good",
          "Built-in flower boxes — they trap moisture; use freestanding planters with saucers",
        ],
      },
      {
        type: "p",
        html: "Don't save on:",
      },
      {
        type: "ul",
        items: [
          "Footings — every dollar saved here costs ten dollars later",
          "Fasteners — galvanized or stainless on every connection, no exceptions",
          "Ledger flashing — the #1 cause of premature deck failure",
          "Permit and inspection — non-negotiable",
        ],
      },
    ],
  },
  {
    slug: "best-decking-materials-southwestern-ontario",
    title: "The Best Decking Materials for Southwestern Ontario Weather",
    seoTitle: "Best Decking Materials for SW Ontario Weather",
    description:
      "Composite, cedar, PT, PVC, hardwood — which decking material handles Ontario's winters and humid summers best? An honest breakdown.",
    date: "2026-01-28",
    category: "Materials",
    readingMinutes: 7,
    heroImage: "/images/Light-Oak-Deck.jpg",
    heroAlt: "Cedar deck installation in London Ontario backyard",
    body: [
      {
        type: "p",
        html: "Southwestern Ontario throws a lot at a deck: -25°C winters, +30°C humid summers, freeze-thaw cycles that crack everything, and just enough rainfall to keep things wet. Here's how each major decking material actually performs here.",
      },
      { type: "h2", text: "Pressure-treated (PT) lumber" },
      {
        type: "p",
        html: "PT handles Ontario freeze-thaw cycles well — it's chemically treated to resist rot and insects. Where it suffers is UV exposure and moisture cycling: cracks open, boards warp, and fasteners loosen over time.",
      },
      { type: "h2", text: "Cedar" },
      {
        type: "p",
        html: "Western red cedar handles Ontario weather beautifully if you stain it. Untreated, it weathers to grey within 1–2 years. Cedar is naturally rot-resistant but soft — it dents and scratches more easily than PT. Best for clients who want premium look on a moderate budget.",
      },
      { type: "h2", text: "Composite" },
      {
        type: "p",
        html: "Modern capped composite (Trex Transcend, TimberTech AZEK, MoistureShield) is essentially indifferent to Ontario weather. It doesn't crack, splinter, fade meaningfully, or rot. The only weakness: it gets hotter underfoot in direct summer sun. Choose lighter colours for south-facing decks.",
      },
      { type: "h2", text: "PVC (cellular vinyl)" },
      {
        type: "p",
        html: "Pure PVC decking (no wood content) is bulletproof in Ontario weather. 100% waterproof, won't host mould, expands less than composite in temperature swings. Costs more than composite but lasts longer. We recommend it for hot tubs, pool decks, and anywhere standing water is likely.",
      },
      { type: "h2", text: "Tropical hardwood (ipe, cumaru)" },
      {
        type: "p",
        html: "Stunning, ultra-dense hardwoods like ipe perform well in Ontario but require specialized fasteners (hidden clip systems) and annual oiling. Best for design-driven clients with the budget for premium materials and yearly upkeep. Most homeowners are happier with high-end composite.",
      },
      { type: "h2", text: "What about retaining walls and sloped lots?" },
      {
        type: "p",
        html: "If your deck is being built into a hillside or above grade by more than 4', you may need a retaining wall to manage soil and water properly. Done wrong, the soil pushes against your foundation and undermines the deck footings.",
      },
      {
        type: "callout",
        title: "Building on a sloped lot?",
        body: "London Retaining Walls designs and installs Allan Block, natural stone, and segmental retaining walls — pairs perfectly with our decks.",
        href: "https://londonretainingwalls.ca",
        cta: "Visit London Retaining Walls",
      },
      { type: "h2", text: "Our recommendation by use case" },
      {
        type: "ul",
        items: [
          "<strong>Family back deck (kids, BBQs):</strong> mid-range composite",
          "<strong>Pool deck or hot tub area:</strong> capped PVC",
          "<strong>Cottage or rustic look:</strong> cedar with a quality semi-transparent stain",
          "<strong>Tight budget:</strong> PT with proper sealing",
          "<strong>Statement deck on a premium home:</strong> ipe or premium PVC",
        ],
      },
    ],
  },
  {
    slug: "small-backyard-deck-design-ideas",
    title: "6 Small Backyard Deck Design Ideas That Actually Work",
    seoTitle: "6 Small Backyard Deck Design Ideas That Work",
    description:
      "Small backyard deck ideas for Ontario homes — multi-level builds, built-in storage, screens for privacy and modular footprints.",
    date: "2026-01-12",
    category: "Design",
    readingMinutes: 6,
    heroImage: "/images/Gazebo-and-Deck-2-1.jpg",
    heroAlt: "Backyard deck with gazebo and integrated lighting in Southwestern Ontario",
    body: [
      {
        type: "p",
        html: "Not everyone has a sprawling backyard in Old North or Lambeth. A lot of London-area homes have lots smaller than 30 feet wide. Here are six designs we've built into tight backyards that still deliver real outdoor living.",
      },
      { type: "h2", text: "1. Multi-level instead of multi-large" },
      {
        type: "p",
        html: "A two-step level change with a 6' upper deck for dining and a 10' lower deck for lounging visually doubles a small footprint. The level break also breaks up the visual space, making it feel bigger.",
      },
      { type: "h2", text: "2. Built-in benches with storage" },
      {
        type: "p",
        html: "Skip patio furniture entirely. Build deep benches along two sides — they double as seating for entertainers and as storage for cushions, kids' toys, and BBQ supplies. Frees up the whole deck for foot traffic.",
      },
      { type: "h2", text: "3. Privacy screens on the property line" },
      {
        type: "p",
        html: "On lots under 35' wide, a 6' privacy screen along one edge is the difference between feeling enclosed and feeling exposed. Vertical cedar slats with 1\" gaps for airflow look modern and work hard.",
      },
      { type: "h2", text: "4. Wraparound deck off a side door" },
      {
        type: "p",
        html: "If your back door dumps you into a 6' wide strip beside the house, wrap the deck around the side. Suddenly you've got 80+ extra square feet of usable space along the side yard — perfect for a coffee spot.",
      },
      { type: "h2", text: "5. Pergola for shade, not just looks" },
      {
        type: "p",
        html: "A 10'×10' pergola overhead turns the back third of even a tiny deck into a daily-used shaded room from May through September. Skip the lattice top and use cedar 2x4 slats spaced for 50% shade.",
      },
      { type: "h2", text: "6. Hot tub-ready footings, even if you're not buying yet" },
      {
        type: "p",
        html: "Adding hot tub-rated footings during the original build adds about $400–$800 to a deck. Cutting in a hot tub footing after the fact is closer to $3,500. If there's any chance you'll add a tub down the road, build it in now.",
      },
      {
        type: "callout",
        title: "Need a concrete pad next to the deck?",
        body: "Hot tub bases, walkways and patio extensions — London Concrete Forming pours the concrete side so we can focus on the wood.",
        href: "https://londonconcreteforming.ca",
        cta: "Visit London Concrete Forming",
      },
      { type: "h2", text: "Want to see what would fit your yard?" },
      {
        type: "p",
        html: "We'll come measure, sketch a layout on the spot, and send a free quote with two or three design options. No obligation, no pressure.",
      },
    ],
  },
];

export const POST_SLUGS = POSTS.map((p) => p.slug);

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
