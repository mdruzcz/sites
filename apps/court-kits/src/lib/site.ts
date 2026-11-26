import type { PhotoKey } from "./photos";

/**
 * Everything that makes this site this brand lives here and in src/content.
 * The components and pages are shared with the sister backyard-court site, so
 * keep brand-specific words out of them and put them here instead.
 */
export const site = {
  name: "CourtKits.ca",
  shortName: "CourtKits",
  domain: "courtkits.ca",
  url: "https://courtkits.ca",
  tagline: "DIY sport court kits for Canadian backyards",
  homeTitle: "DIY Sport Court Kits for Canadian Backyards | CourtKits.ca",
  metaDescription:
    "DIY sport court kits in modular tile from $3,285: basketball, pickleball, tennis and shuffleboard. Pick a size and colours, then get a freight quote in Canada.",
  description:
    "DIY court kits in modular sport tile: basketball, pickleball, tennis, shuffleboard and multi-game layouts. Choose a size, pick colours and get a freight quote to any Canadian postal code.",
  /** Set a number here (e.g. "519-555-0100") to switch on the phone links and the mobile Call button. */
  phone: null as string | null,
  email: null as string | null,
  region: "Canada",
  responseTime: "one business day",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "",
  announcement: "Kits from $3,285 with a numbered layout plan. Freight quotes to all ten provinces.",
  logo: { mark: "tiles" as "court" | "tiles", line1: "CourtKits", inlineAccent: ".ca", line2: "" },
  theme: {
    accent: "#1E6BFF",
    accentInk: "#0F4FD1",
    onAccent: "#FFFFFF",
    accentSoft: "#E8F0FF",
    ctaFrom: "#D7F24A",
    ctaTo: "#B4DB12",
    ink: "#10151C",
    inkDeep: "#070B10",
    page: "#E9EAE6",
  },
  photos: {
    hero: "aerial-night",
    heroPosition: "center 42%",
    heroAlt: "Aerial view of two pickleball courts lit at night and surrounded by trees",
    kits: "court-lines",
    how: "day-court",
    faq: "pickleball-net",
    contact: "backyard-court",
    locations: "dusk-court",
    guides: "aerial-day",
    custom: "day-court",
    footer: "dusk-court",
  },
  copy: {
    kitSummary:
      "A {size} DIY {what} with {area} square feet of playing surface. {bestFor}. {price} for the kit with game lines, edging and a numbered plan. Freight is quoted to your postal code.",
  },
  home: {
    eyebrow: "DIY court kits",
    title: "The whole court, in one kit.",
    caption: "Shown: two full-size pickleball courts lit for night play.",
    cta: "Find your kit",
    trust: [
      { title: "One box, one plan", text: "Tiles, edging and lines are counted and numbered before they leave." },
      { title: "Built by you", text: "A weekend, a rubber mallet and a couple of helpers." },
      { title: "Freight to your door", text: "Pallet delivery to any Canadian postal code." },
    ],
    sportsHeading: "Start with the sport",
    sportsIntro: "Each kit is drawn around real court dimensions, then scaled to the pad you have.",
    finderHeading: "Kit finder",
    finderIntro: "Type in your pad size. See which kits fit, what they cost and a rough number for a custom cut.",
    whyHeading: "What a tile kit gets you",
    why: [
      { title: "No coating to roll on", text: "Tiles arrive in your colours with the game lines already on, so there is no acrylic coating to apply or redo." },
      { title: "Dry sooner", text: "Water falls through the grid to the pad below instead of pooling where you play." },
      { title: "Fixable in minutes", text: "Damage a section and you swap that section, not the whole court." },
      { title: "Room to grow", text: "Start with a half court and extend it later. The new tiles lock onto the old ones." },
    ],
    stepsHeading: "Three steps to a finished court",
    steps: [
      { title: "Pick a kit", text: "Choose the sport and the size closest to your pad. Odd dimensions are no problem." },
      { title: "Lock in the look", text: "Set the court, zone and border colours on the kit page and send them with your quote request." },
      { title: "Build it in a weekend", text: "Follow the numbered plan from one corner. The tiles click together by hand." },
    ],
    audiences: [
      { tag: "Homeowners", title: "Weekend project, years of play", text: "Starter half courts and compact pickleball kits for a typical yard.", href: "/court-kits", photo: "backyard-court" },
      { tag: "Cottages and resorts", title: "Something for every guest", text: "Shuffleboard lanes and multi-game pads that keep a crowd busy.", href: "/sports/shuffleboard", photo: "day-court" },
      { tag: "Schools and clubs", title: "Resurface without repaving", text: "Tile over tired asphalt for tennis, pickleball and full-court basketball.", href: "/sports/tennis", photo: "aerial-day" },
    ] as { tag: string; title: string; text: string; href: string; photo: PhotoKey }[],
    railHeading: "Good sizes to start with",
    guidesHeading: "Read before you build",
    guidesIntro: "Dimensions, pad prep, prices and assembly, step by step.",
    closingTitle: "Have a pad already?",
    closingText: "Give us its length and width. We will tell you which kit fits, what the lines will look like and what it costs delivered.",
  },
  pages: {
    kits: {
      title: "All DIY Court Kits and Prices",
      description: "Compare {count} DIY sport court kits by sport, footprint and price, from {from}. Basketball, pickleball, tennis, shuffleboard and multi-game kits for Canada.",
      heroAlt: "White game lines on a blue sport court surface, DIY court kits",
      h1: "Every court kit, every size",
      intro: "Twenty DIY kits across five sports. Each one lists its footprint, coverage, price and game lines, and each can be cut to your pad.",
      sectionTitle: "Filter by sport, compare by size",
      sectionIntro: "Each card shows the footprint, the square footage and the kit price. Tap a kit to try colours on a scale drawing.",
      tableTitle: "Kit prices at a glance",
      tableIntro: "Footprint, square footage, kit price and price per square foot for the full range.",
    },
    how: {
      title: "Court Kit Build Guide: Base, Layout, Assembly",
      description: "A step-by-step build guide for DIY court kits: checking your pad, picking a kit and colours, taking delivery and assembling the tiles from the numbered plan.",
      heroAlt: "Fenced outdoor sport court on a flat hard base surrounded by lawn and trees",
      heroPosition: "center 60%",
      h1: "The court kit build guide",
      intro: "What to check before you order, what arrives on the pallet and how the tiles go down.",
      summaryTitle: "The three-step summary",
    },
    faq: {
      title: "Court Kit FAQ: Sizes, Bases, Assembly, Shipping",
      description: "Court kit FAQ covering how to choose a size, what base you need, how long assembly takes, winter care, and how quotes and freight delivery work in Canada.",
      heroAlt: "Pickleball net post and balls on an outdoor court surface",
      h1: "Court kit FAQ",
      intro: "Choosing a kit, preparing the base, building it and getting it delivered.",
    },
    contact: {
      title: "Request a Court Kit Freight Quote",
      description: "Request a court kit quote with freight to your Canadian postal code. Send your sport, pad size and colours and receive a delivered price and a court drawing.",
      heroAlt: "Backyard court with pickleball lines and a basketball hoop beside a garden",
      heroPosition: "center 70%",
      h1: "Request a kit quote",
      intro: "Send the sport, the pad size and your postal code. A delivered price comes back within {responseTime}.",
    },
    city: {
      title: "DIY Court Kits Delivered to {city}, {code}",
      titleShort: "Court Kits Delivered to {city}, {code}",
      description: "DIY sport court kits with freight to {city}, {province}. Pickleball, basketball and multi-game layouts in modular tile from {from}, built by you in a weekend.",
      heroAlt: "Fenced sport court lit at dusk, DIY court kits delivered to {city}, {province}",
      h1: "Court kits delivered to {city}",
      bodyHeading: "Planning a court kit in {city}",
      kitsHeading: "Kit sizes to consider in {city}",
    },
    kit: {
      description: "{size} DIY {type} with {area} sq ft of modular tile, {price} plus freight. {bestFor}. Try colours, then request a freight quote.",
    },
    sport: { bodyHeading: "What to know about {sport} kits" },
    guides: {
      title: "Court Kit Guides and How-Tos",
      description: "How-to guides for DIY court kits: pickleball court dimensions, installing court tiles, briefing a concrete contractor, kit prices and multi-sport layouts.",
      heroAlt: "Aerial view of pickleball courts with players, DIY court kit guides",
      h1: "Court kit guides",
      intro: "Measurements, pad prep, prices and assembly. Everything to read before the pallet arrives.",
    },
    custom: {
      title: "Custom Court Kit Sizes and Estimates",
      description: "Get a custom court kit cut to your pad. Enter length and width to see the kits that fit and an estimated price for a made-to-size modular tile court in Canada.",
      heroAlt: "Fenced outdoor court set into a lawn with trees behind",
      h1: "Custom court kit sizes",
      intro: "Not every pad is 30 by 60. Enter yours and see what fits as-is and what a made-to-size kit would run.",
    },
  },
  footerBlurb: "CourtKits.ca sells do-it-yourself sport court kits in modular tile, sized for Canadian yards and shipped by freight nationwide.",
} as const;

export const phoneHref = site.phone ? `tel:+1${site.phone.replace(/\D/g, "")}` : null;

export const nav = [
  { label: "All kits", href: "/court-kits" },
  { label: "Pickleball", href: "/sports/pickleball" },
  { label: "Basketball", href: "/sports/basketball" },
  { label: "Multi-game", href: "/sports/multi-sport" },
  { label: "Guides", href: "/guides" },
  { label: "Build guide", href: "/how-it-works" },
];

/** Fills {placeholders} in the copy above. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ""));
}
