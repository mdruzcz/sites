export const site = {
  name: "Spotless Deck Staining",
  shortName: "Spotless",
  tagline: "Professional Deck & Fence Staining in Kitchener-Waterloo",
  phone: "(226) 476-0604",
  phoneHref: "tel:+12264760604",
  addressLine: "Serving Kitchener · Waterloo · Cambridge · Guelph",
  address: {
    locality: "Kitchener",
    region: "ON",
    country: "CA",
  },
  hours: "Mon – Fri · 8 AM – 6 PM · Sat 9 AM – 4 PM · Sun Closed",
  hoursList: [
    { days: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
    { days: "Saturday",        time: "9:00 AM – 4:00 PM" },
    { days: "Sunday",          time: "Closed" },
  ],
  yearsExperience: 10,
  serviceAreas: ["Kitchener", "Waterloo", "Cambridge", "Guelph"],
  url: "https://spotlessdeckstaining.ca",
  googleRating: "5.0",
  responseTime: "24 hours",
  trustBadges: [
    { label: "Premium Penetrating Stains", value: "UV + moisture protection" },
    { label: "Eco-Friendly Products",      value: "Safe for kids, pets, plants" },
    { label: "Fully Insured Crew",         value: "Local, family-run team" },
  ],
} as const;

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  blurb: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "deck-staining",
    name: "Deck Staining",
    shortName: "Deck Staining",
    blurb:
      "Transform your weathered deck into a stunning outdoor feature with premium penetrating stains. Protects against UV damage and moisture while showcasing the natural beauty of the wood.",
    bullets: [
      "Premium penetrating, low-VOC stains",
      "Solid, semi-transparent or transparent finishes",
      "Wood-tone matching to existing siding or trim",
      "Two-coat application for maximum coverage",
    ],
    image: "/images/hero-deck.jpg",
    imageAlt: "Freshly stained cedar deck with rich amber tone after a Spotless Deck Staining project in Kitchener, Ontario",
  },
  {
    slug: "fence-staining",
    name: "Fence Staining",
    shortName: "Fence Staining",
    blurb:
      "Professional fence stain application that restores beauty and extends lifespan. Works on cedar, pressure-treated and pine fences — protects against rot while boosting curb appeal.",
    bullets: [
      "Cedar, pine and pressure-treated wood",
      "Privacy fences, picket, board-on-board",
      "Rot, mildew and UV protection",
      "Stain matched to your deck or trim",
    ],
    image: "/images/fence-staining.jpg",
    imageAlt: "Freshly stained wooden privacy fence by Spotless Deck Staining in Waterloo, Ontario",
  },
  {
    slug: "sealing-protection",
    name: "Sealing & Protection",
    shortName: "Sealing",
    blurb:
      "Advanced sealants create a barrier against moisture, UV rays, mold and mildew. Adds years of life to existing stained or unstained wood — recommended every 2–3 years.",
    bullets: [
      "Clear or tinted protective sealers",
      "Hydrophobic, water-beading finish",
      "Mold and mildew inhibitors",
      "Recommended every 2–3 seasons",
    ],
    image: "/images/sealing.jpg",
    imageAlt: "Clear protective sealer being applied to a hardwood deck in Cambridge, Ontario",
  },
  {
    slug: "power-washing",
    name: "Power Washing & Prep",
    shortName: "Prep & Wash",
    blurb:
      "Proper surface preparation is the difference between a job that lasts 2 years and one that lasts 6. We remove dirt, grime, old stain and mildew with the right pressure and eco-friendly cleaners.",
    bullets: [
      "Eco-friendly wood-safe cleaners",
      "Correct PSI for soft- vs hardwoods",
      "Old stain stripping when needed",
      "Light sanding and brightening included",
    ],
    image: "/images/power-washing.jpg",
    imageAlt: "Power washing a weathered deck during prep work by Spotless Deck Staining in Guelph, Ontario",
  },
  {
    slug: "deck-restoration",
    name: "Deck Restoration",
    shortName: "Restoration",
    blurb:
      "Comprehensive restoration for tired or weathered decks: assessment, board replacement, sanding, brightening and refinishing. Restores a like-new appearance without rebuilding.",
    bullets: [
      "Full deck assessment + safety check",
      "Board, joist and railing replacement",
      "Heavy sanding and brightening",
      "Two-coat finish to match your home",
    ],
    image: "/images/deck-restoration.jpg",
    imageAlt: "Fully restored backyard deck after sanding and re-staining by Spotless Deck Staining in Kitchener-Waterloo",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export type City = {
  slug: string;
  name: string;
  region: string;
  population: string;
  intro: string;
  heroIntro: string;
  neighbourhoods: string[];
  localProof: string;
  metaTitle: string;
  metaDescription: string;
};

export const cities: City[] = [
  {
    slug: "kitchener",
    name: "Kitchener",
    region: "ON",
    population: "260,000+",
    intro:
      "Kitchener's mix of century-old brick homes in Victoria Park, modern builds in Doon and family neighbourhoods in Forest Heights all share one thing: decks that take a serious beating from Ontario summers and winters. We restore and stain them so they look like the day they were built.",
    heroIntro:
      "Kitchener's trusted deck & fence staining specialists. Premium penetrating stains, fully insured local crew, free written quote within 24 hours.",
    neighbourhoods: ["Downtown Kitchener", "Forest Heights", "Doon", "Stanley Park", "Huron Park", "Victoria Park"],
    localProof: "Trusted by Kitchener homeowners from Victoria Park to Doon South.",
    metaTitle: "Deck Staining in Kitchener, ON | Spotless Deck Staining",
    metaDescription:
      "Professional deck & fence staining in Kitchener, ON. Premium stains, eco-friendly prep, fully insured. Free 24-hour quote from Spotless Deck Staining.",
  },
  {
    slug: "waterloo",
    name: "Waterloo",
    region: "ON",
    population: "120,000+",
    intro:
      "From the heritage homes in Uptown Waterloo to the executive properties in Beechwood and Laurelwood, Waterloo decks deserve a finish that protects against snow, ice and our humid summers. We use premium penetrating stains designed for Canadian climate swings.",
    heroIntro:
      "Waterloo's premium deck & fence staining team. Two-coat application, eco-friendly prep, written warranty on every job. Free quote within 24 hours.",
    neighbourhoods: ["Uptown Waterloo", "Beechwood", "Lakeshore", "Eastwood", "Laurelwood", "Westmount"],
    localProof: "Serving Waterloo's Uptown, Beechwood and Laurelwood neighbourhoods.",
    metaTitle: "Deck Staining in Waterloo, ON | Spotless Deck Staining",
    metaDescription:
      "Premium deck and fence staining in Waterloo, ON. UV + moisture protection, written warranty, eco-friendly stains. Free quote from Spotless Deck Staining.",
  },
  {
    slug: "cambridge",
    name: "Cambridge",
    region: "ON",
    population: "140,000+",
    intro:
      "Cambridge homeowners in Galt, Preston, Hespeler and Blair trust us to bring their decks back to life. Whether it's a heritage home near the Grand River or a newer build out by Cambridge Centre, we match the finish to the home.",
    heroIntro:
      "Cambridge's deck & fence staining experts. From Galt to Hespeler — premium stains, proper prep, fully insured. Free, no-obligation quote in 24 hours.",
    neighbourhoods: ["Galt", "Preston", "Hespeler", "Blair", "Cambridge Centre", "West Galt"],
    localProof: "Serving Cambridge from Galt's heritage homes to Hespeler's family neighbourhoods.",
    metaTitle: "Deck Staining in Cambridge, ON | Spotless Deck Staining",
    metaDescription:
      "Deck and fence staining in Cambridge, ON. Galt, Preston, Hespeler and Blair. Premium stains, written warranty, free quote from Spotless Deck Staining.",
  },
  {
    slug: "guelph",
    name: "Guelph",
    region: "ON",
    population: "145,000+",
    intro:
      "Guelph's mature neighbourhoods — Old University, Exhibition Park, Kortright Hills — are full of beautiful homes with hard-working decks. We stain, seal and restore them so they hold up to Wellington County's freeze-thaw cycles and humid summers.",
    heroIntro:
      "Guelph's deck & fence staining specialists. Premium penetrating stains, eco-friendly prep, fully insured. Free 24-hour written quote.",
    neighbourhoods: ["Old University", "Exhibition Park", "Kortright Hills", "Westminster Woods", "St. George's Park", "Downtown Guelph"],
    localProof: "Trusted by Guelph homeowners from Old University to Westminster Woods.",
    metaTitle: "Deck Staining in Guelph, ON | Spotless Deck Staining",
    metaDescription:
      "Deck and fence staining in Guelph, ON. Premium stains, eco-friendly prep, fully insured local crew. Free quote within 24 hours.",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export const gallery = [
  { src: "/images/gallery/deck-1.jpg", alt: "Cedar deck with amber stain finish in Kitchener, Ontario" },
  { src: "/images/gallery/deck-2.jpg", alt: "Freshly stained privacy fence in Waterloo, Ontario" },
  { src: "/images/gallery/deck-3.jpg", alt: "Clear sealer application on hardwood deck in Cambridge, Ontario" },
  { src: "/images/gallery/deck-4.jpg", alt: "Power washing and prep work on a backyard deck in Guelph, Ontario" },
  { src: "/images/gallery/deck-5.jpg", alt: "Restored two-tier deck with new stain in Kitchener-Waterloo" },
  { src: "/images/gallery/deck-6.jpg", alt: "Backyard deck with stained railings and steps in Cambridge, Ontario" },
] as const;

export const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Kitchener, ON",
    rating: 5,
    quote:
      "Absolutely thrilled with the results! Our old deck looks brand new. The team was professional, punctual, and the attention to detail was outstanding.",
  },
  {
    name: "Michael Chen",
    location: "Waterloo, ON",
    rating: 5,
    quote:
      "Best decision we made for our home. The fence staining transformed our backyard completely. Quality work and excellent customer service from start to finish.",
  },
  {
    name: "Jennifer Thompson",
    location: "Cambridge, ON",
    rating: 5,
    quote:
      "Professional service from start to finish. They explained every step, used eco-friendly products, and delivered exceptional results on time and within budget.",
  },
  {
    name: "David Park",
    location: "Guelph, ON",
    rating: 5,
    quote:
      "Quoted the same day, on the deck the following week, finished in two. The colour match to our siding is perfect. Worth every penny.",
  },
] as const;

export const faqs = [
  {
    q: "How long does deck staining take?",
    a: "Most residential decks take 2–3 days from prep to final coat. Day 1 is power washing and any repairs, day 2 is light sanding and the first coat, day 3 is the second coat and inspection. Larger or multi-tier decks can take a day or two longer.",
  },
  {
    q: "How long will my stain last?",
    a: "With proper prep and a quality penetrating stain, you can expect 3–5 years on a deck floor and 5–7 years on vertical surfaces like fences and railings. Re-coating every few years is dramatically cheaper than replacing a rotted deck.",
  },
  {
    q: "Do I need to be home during the work?",
    a: "No. As long as we have access to the deck and an outdoor water tap, we can complete the job while you're at work. We'll send progress photos and let you know when each phase is complete.",
  },
  {
    q: "What stain brands do you use?",
    a: "We use Sherwin-Williams SuperDeck, Sansin Enviro Stains and Sikkens — all premium, penetrating, low-VOC formulas designed for Canadian climate. We'll recommend the best match based on your wood species and desired look.",
  },
  {
    q: "Is the stain safe for kids and pets?",
    a: "Yes. We use low-VOC, water-based and oil-based stains that are safe for kids and pets once cured (typically 24–48 hours after the final coat). We always brief you on a safe re-entry timeline before we leave.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Every job comes with a written 2-year workmanship warranty. If anything peels, flakes or fails due to our application, we come back and fix it at no cost. Stain longevity itself depends on weather, sun exposure and traffic.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Free On-Site Quote",
    description:
      "We come to your home, measure the deck and fence, inspect for repairs, discuss colour options and email a written, itemized quote within 24 hours.",
  },
  {
    step: "02",
    title: "Prep & Power Wash",
    description:
      "Furniture moved, plants protected. We power wash with eco-friendly wood cleaner, strip failing old stain, and let the wood dry fully before the next step.",
  },
  {
    step: "03",
    title: "Sand, Brighten & Repair",
    description:
      "Light sanding to open the grain, brightening agent to neutralize the wood, and any rotted board or popped nail addressed before staining begins.",
  },
  {
    step: "04",
    title: "Two-Coat Premium Stain",
    description:
      "Two full coats of premium penetrating stain — brushed in, not just sprayed. Every railing, baluster and step gets the same attention as the deck floor.",
  },
  {
    step: "05",
    title: "Final Walk-Through",
    description:
      "We walk the finished job with you, point out the warranty details, and email you photos plus a re-coat reminder so you know exactly when to call us back.",
  },
];

export const whyChoose = [
  {
    title: "Premium Stains Only",
    body: "We use Sherwin-Williams, Sansin and Sikkens — the same penetrating stains the best deck builders specify. No bargain-bin products, no shortcuts.",
  },
  {
    title: "Proper Prep Every Time",
    body: "Power wash, strip, brighten, sand. We don't stain over a dirty deck and call it done — proper prep is the difference between 2 years and 5+.",
  },
  {
    title: "Local, Insured Crew",
    body: "Fully insured, KW-based crew. The same team starts and finishes your project — no subcontractors, no surprise faces in your backyard.",
  },
  {
    title: "Honest Written Quotes",
    body: "Itemized, written quotes emailed within 24 hours. No verbal pricing, no padding, no surprise change orders — what we quote is what you pay.",
  },
  {
    title: "Eco-Friendly Products",
    body: "Low-VOC stains and biodegradable cleaners that are safe for kids, pets, lawn, and the Grand River watershed once cured.",
  },
  {
    title: "Written Workmanship Warranty",
    body: "Every job ships with a 2-year written workmanship warranty. If our application fails, we come back and fix it at no charge.",
  },
];
