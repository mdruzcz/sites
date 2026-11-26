import type { PhotoKey } from "./photos";

/**
 * Everything that makes this site this brand lives here and in src/content.
 * The components are shared with the sister court-kit site, so keep
 * brand-specific words out of them.
 */
export const site = {
  name: "Backyard Courts Direct",
  shortName: "Backyard Courts Direct",
  wordmark: ["Backyard Courts", "Direct"] as [string, string],
  domain: "backyardcourtsdirect.ca",
  url: "https://backyardcourtsdirect.ca",
  tagline: "Modular backyard court kits, shipped across Canada",
  homeTitle: "Backyard Court Kits in Canada | Backyard Courts Direct",
  metaDescription:
    "Backyard basketball, pickleball and multi-sport court kits in modular tile. Pick a size, choose your colours and get a delivered price anywhere in Canada.",
  description:
    "Backyard basketball, pickleball and multi-sport court kits made from interlocking modular tiles. Pick a size, choose your colours and get a delivered price anywhere in Canada.",
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
  announcement: "Shipping court kits to every province. Free layout plan with every quote.",
  theme: {
    accent: "#F26A1B",
    accentInk: "#B94A08",
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
    footer: "aerial-night",
    og: "dusk-court",
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
    stepsHeading: "From bare pad to game on",
    steps: [
      { title: "Measure your space", text: "Tell us how much flat room you have. We match it to a kit or draw a custom size." },
      { title: "Choose your colours", text: "Pick the court, the key or kitchen, and the border. We confirm the layout before anything ships." },
      { title: "Snap it together", text: "Tiles arrive on a pallet with a numbered plan. Most families finish a half court in an afternoon." },
    ],
    audiences: [
      { tag: "Families", title: "A place to play at home", text: "Half courts and pickleball kits that fit a normal backyard pad.", href: "/court-kits", photo: "backyard-court" },
      { tag: "Clubs and schools", title: "Full courts, built to share", text: "Regulation pickleball, tennis and full basketball footprints.", href: "/sports/pickleball", photo: "aerial-day" },
      { tag: "Contractors", title: "A finish for your concrete", text: "Pour the pad, we supply the surface. Trade quotes on request.", href: "/contact", photo: "court-lines" },
    ] as { tag: string; title: string; text: string; href: string; photo: PhotoKey }[],
    railHeading: "Court kits to start with",
    closingTitle: "Not sure which size fits?",
    closingText: "Send us the size of your pad or the space you have. We will reply with the kits that fit and a delivered price.",
  },
  kitsPage: {
    title: "Court kits for every backyard",
    intro: "Pre-sized modular tile kits for basketball, pickleball, tennis, shuffleboard and multi-sport play. Every kit can be resized to fit your pad.",
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
  { label: "How it works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
];
