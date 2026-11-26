import type { PhotoKey } from "./photos";

/**
 * Everything that makes this site this brand lives here and in src/content.
 * The components and pages are shared with the sister court-kit site, so keep
 * brand-specific words out of them and put them here instead.
 */
export const site = {
  name: "Backyard Courts Direct",
  shortName: "Backyard Courts Direct",
  domain: "backyardcourtsdirect.ca",
  url: "https://backyardcourtsdirect.ca",
  tagline: "Modular backyard court kits, shipped across Canada",
  homeTitle: "Backyard Court Kits in Canada | Backyard Courts Direct",
  metaDescription:
    "Backyard basketball, pickleball and multi-sport court kits in modular tile from $3,285. Pick a size, choose your colours and get a delivered price in Canada.",
  description:
    "Backyard basketball, pickleball and multi-sport court kits made from interlocking modular tiles. Pick a size, choose your colours and get a delivered price anywhere in Canada.",
  /** Set a number here (e.g. "519-555-0100") to switch on the phone links and the mobile Call button. */
  phone: null as string | null,
  email: null as string | null,
  region: "Canada",
  responseTime: "one business day",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "",
  announcement: "Court kits from $3,285. Shipping to every province, with a free layout plan on every quote.",
  logo: { mark: "court" as "court" | "tiles", line1: "Backyard Courts", inlineAccent: "", line2: "Direct" },
  theme: {
    accent: "#F26A1B",
    accentInk: "#B94A08",
    onAccent: "#1A1005",
    accentSoft: "#FFF1E7",
    ctaFrom: "#FFC83A",
    ctaTo: "#F5A300",
    ink: "#14181F",
    inkDeep: "#0A0D12",
    page: "#EBE7E2",
  },
  photos: {
    hero: "dusk-court",
    heroPosition: "center 70%",
    heroAlt: "Fenced backyard sport court with a blue and green playing surface, lit for evening play",
    kits: "day-court",
    how: "backyard-court",
    faq: "court-lines",
    contact: "aerial-day",
    locations: "day-court",
    guides: "court-lines",
    custom: "aerial-day",
    footer: "aerial-night",
  },
  copy: {
    kitSummary:
      "A {size} modular tile {what} covering {area} square feet. {bestFor}. Kit price {price} before freight and tax, with a numbered layout plan and your choice of colours.",
  },
  home: {
    eyebrow: "Modular court kits",
    title: "Your own court, in your own backyard.",
    caption: "Shown: a fenced backyard sport court lit for evening play.",
    cta: "Shop court kits",
    trust: [
      { title: "Snaps together", text: "Interlocking tiles lock by hand. No glue, no special tools." },
      { title: "Shipped Canada-wide", text: "Palletized freight to your driveway in every province." },
      { title: "Planned for you", text: "A numbered layout plan and your game lines come with the kit." },
    ],
    sportsHeading: "Pick your game",
    sportsIntro: "Every kit is sized around the sport you play most, with room to add lines for a second one.",
    finderHeading: "What fits in your yard?",
    finderIntro: "Enter the flat space you have. We show the kits that fit and a ballpark for a custom size.",
    whyHeading: "Why build on modular tile",
    why: [
      { title: "Drains in minutes", text: "The open-grid surface lets rain and meltwater pass through, so you are playing again soon after a storm." },
      { title: "Easier on knees", text: "Tiles flex slightly underfoot, which takes some of the sting out of a hard concrete slab." },
      { title: "Hides a tired slab", text: "Hairline cracks and faded paint disappear under a fresh surface with crisp lines." },
      { title: "Yours to change", text: "Unlock a section to fix the base, add a sport or take the court with you when you move." },
    ],
    stepsHeading: "From bare pad to game on",
    steps: [
      { title: "Measure your space", text: "Tell us how much flat room you have. We match it to a kit or draw a custom size." },
      { title: "Choose your colours", text: "Pick the court, the key or kitchen, and the border. We confirm the layout before anything ships." },
      { title: "Snap it together", text: "Tiles arrive on a pallet with a numbered plan. Two or three people can lay a half court in an afternoon." },
    ],
    audiences: [
      { tag: "Families", title: "A place to play at home", text: "Half courts and pickleball kits that fit a normal backyard pad.", href: "/court-kits", photo: "backyard-court" },
      { tag: "Clubs and schools", title: "Full courts, built to share", text: "Regulation pickleball, tennis and full basketball footprints.", href: "/sports/pickleball", photo: "aerial-day" },
      { tag: "Contractors", title: "A finish for your concrete", text: "Pour the pad, we supply the surface. Trade quotes on request.", href: "/contact", photo: "court-lines" },
    ] as { tag: string; title: string; text: string; href: string; photo: PhotoKey }[],
    railHeading: "Court kits to start with",
    guidesHeading: "Plan it properly",
    guidesIntro: "Costs, sizes and surfaces explained before you pour a pad or place an order.",
    closingTitle: "Not sure which size fits?",
    closingText: "Send us the size of your pad or the space you have. We will reply with the kits that fit and a delivered price.",
  },
  pages: {
    kits: {
      title: "Court Kits and Prices: All Sizes",
      description: "Compare {count} modular tile court kits with prices from {from}. Basketball, pickleball, tennis, shuffleboard and multi-sport sizes shipped across Canada.",
      heroAlt: "Fenced outdoor sport court with a blue playing surface, court kits shipped across Canada",
      h1: "Court kits for every backyard",
      intro: "Pre-sized modular tile kits for basketball, pickleball, tennis, shuffleboard and multi-sport play. Every kit can be resized to fit your pad.",
      sectionTitle: "Choose a sport, then a size",
      sectionIntro: "Sizes are the tile footprint in feet. Prices are for the kit, before freight and tax.",
      tableTitle: "Court kit price list",
      tableIntro: "Every kit, its footprint, coverage and price in Canadian dollars.",
    },
    how: {
      title: "How to Build a Backyard Court",
      description: "How a backyard court kit goes together: measuring your space, preparing a concrete or asphalt base, choosing colours and snapping the tiles in place.",
      heroAlt: "Backyard court with pickleball lines and a basketball hoop surrounded by gardens, built on a flat hard base",
      heroPosition: "center 70%",
      h1: "How to build a backyard court",
      intro: "Six steps from an empty corner of the yard to the first game. No special tools and no contractor needed for the surface.",
      summaryTitle: "Three things to decide",
    },
    faq: {
      title: "Backyard Court Kit FAQ",
      description: "Answers about modular backyard court kits: base requirements, space needed, colours, DIY installation, Canadian winters, shipping and ordering.",
      heroAlt: "Close view of white game lines on a blue sport court surface",
      h1: "Backyard court kit questions",
      intro: "What the tiles sit on, how much room you need, what comes in the box and how ordering works.",
    },
    contact: {
      title: "Get a Court Kit Quote",
      description: "Request a delivered price for a backyard court kit anywhere in Canada. Tell us your sport, space and colours and we reply with a quote and a layout drawing.",
      heroAlt: "Aerial view of two outdoor pickleball courts beside a lawn and trees",
      heroPosition: "center 45%",
      h1: "Get a delivered price",
      intro: "Tell us what you want to play and how much room you have. We reply within {responseTime}.",
    },
    city: {
      title: "Backyard Court Kits in {city}, {code}",
      titleShort: "Court Kits in {city}, {code}",
      description: "Backyard basketball, pickleball and multi-sport court kits delivered to {city}, {province}. Modular tiles from {from}, your colours, freight to your driveway.",
      heroAlt: "Outdoor sport court surrounded by trees, backyard court kits delivered to {city}, {province}",
      h1: "Backyard court kits in {city}",
      bodyHeading: "Building a backyard court in {city}",
      kitsHeading: "Court kits delivered to {city}",
    },
    kit: {
      description: "{size} modular tile {type}, {area} sq ft, {price} before freight. {bestFor}. Choose colours and get a delivered price in Canada.",
    },
    sport: { bodyHeading: "Planning a {sport} court" },
    guides: {
      title: "Backyard Court Guides",
      description: "Planning guides for backyard courts in Canada: what a basketball or pickleball court costs, which size fits your yard, court dimensions and winter care.",
      heroAlt: "White game lines on a blue court surface, backyard court planning guides",
      h1: "Backyard court guides",
      intro: "Straight answers on cost, size and surface, written for Canadian yards and Canadian winters.",
    },
    custom: {
      title: "Custom Backyard Court Sizes",
      description: "Need a court that fits an odd-shaped pad? Enter your space for kits that fit and a ballpark price for a custom modular tile court, shipped anywhere in Canada.",
      heroAlt: "Aerial view of outdoor courts fitted into a landscaped yard",
      h1: "Custom backyard court sizes",
      intro: "Tiles are about a foot square, so a court can be drawn to almost any pad. Start with the space you have.",
    },
  },
  footerBlurb:
    "Backyard Courts Direct supplies modular sport court kits to homeowners, clubs and contractors across Canada. Tell us your space and we will size the court.",
} as const;

export const phoneHref = site.phone ? `tel:+1${site.phone.replace(/\D/g, "")}` : null;

export const nav = [
  { label: "Court kits", href: "/court-kits" },
  { label: "Basketball", href: "/sports/basketball" },
  { label: "Pickleball", href: "/sports/pickleball" },
  { label: "Multi-sport", href: "/sports/multi-sport" },
  { label: "Guides", href: "/guides" },
  { label: "How it works", href: "/how-it-works" },
];

/** Fills {placeholders} in the copy above. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ""));
}
