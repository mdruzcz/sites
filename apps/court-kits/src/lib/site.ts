import type { PhotoKey } from "./photos";

/**
 * Everything that makes this site this brand lives here and in src/content.
 * The components are shared with the sister backyard-court site, so keep
 * brand-specific words out of them.
 */
export const site = {
  name: "CourtKits.ca",
  shortName: "CourtKits",
  wordmark: ["Court", "Kits.ca"] as [string, string],
  domain: "courtkits.ca",
  url: "https://courtkits.ca",
  tagline: "DIY sport court kits for Canadian backyards",
  homeTitle: "DIY Sport Court Kits for Canadian Backyards | CourtKits.ca",
  metaDescription:
    "DIY sport court kits in modular tile for basketball, pickleball, tennis and shuffleboard. Pick a size and colours, then get a freight quote anywhere in Canada.",
  description:
    "DIY court kits in modular sport tile: basketball, pickleball, tennis, shuffleboard and multi-game layouts. Choose a size, pick colours and get a freight quote to any Canadian postal code.",
  /** Set a number here (e.g. "519-555-0100") to switch on the phone links and the mobile Call button. */
  phone: null as string | null,
  email: null as string | null,
  region: "Canada",
  responseTime: "one business day",
  /**
   * Price per square foot of tile, in CAD. While this is null the site shows
   * "Request a delivered price" instead of a number. Set it once supplier
   * pricing is confirmed and every kit shows a "from" price.
   */
  pricePerSqFt: null as number | null,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "",
  announcement: "Every kit ships with a numbered layout plan. Freight quotes to all ten provinces.",
  theme: {
    accent: "#1E6BFF",
    accentInk: "#0F4FD1",
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
    footer: "dusk-court",
    og: "aerial-night",
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
    closingTitle: "Have a pad already?",
    closingText: "Give us its length and width. We will tell you which kit fits, what the lines will look like and what it costs delivered.",
  },
  kitsPage: {
    title: "Every court kit, every size",
    intro: "Twenty DIY kits across five sports. Each one lists its footprint, coverage and game lines, and each can be cut to your pad.",
  },
  footerBlurb: "CourtKits.ca sells do-it-yourself sport court kits in modular tile, sized for Canadian yards and shipped by freight nationwide.",
} as const;

export const phoneHref = site.phone ? `tel:+1${site.phone.replace(/\D/g, "")}` : null;

export const nav = [
  { label: "All kits", href: "/court-kits" },
  { label: "Pickleball", href: "/sports/pickleball" },
  { label: "Basketball", href: "/sports/basketball" },
  { label: "Multi-game", href: "/sports/multi-sport" },
  { label: "Build guide", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
];
