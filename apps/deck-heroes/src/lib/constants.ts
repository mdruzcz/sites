export const COMPANY_NAME = "Deck Heroes";
export const PHONE = "519 266 6796";
export const PHONE_HREF = "tel:+15192666796";
export const EMAIL = "service@deckheroes.ca";
export const DOMAIN = "deckheroes.ca";

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
}

export const SERVICES: Service[] = [
  {
    slug: "deck-staining",
    title: "Deck Staining",
    shortDescription:
      "Enhance and protect your deck with premium wood stains that bring out the natural beauty of the grain.",
  },
  {
    slug: "deck-sealing",
    title: "Deck Sealing",
    shortDescription:
      "Shield your deck from moisture, UV rays, and harsh Ontario winters with professional-grade sealants.",
  },
  {
    slug: "deck-refinishing",
    title: "Deck Refinishing",
    shortDescription:
      "Restore weathered, grey decks to their original glory with our complete sanding and refinishing process.",
  },
  {
    slug: "fence-staining",
    title: "Fence Staining",
    shortDescription:
      "Give your fence a rich, lasting finish that complements your deck and boosts curb appeal.",
  },
];

export interface City {
  slug: string;
  name: string;
  province: string;
}

export const CITIES: City[] = [
  { slug: "london", name: "London", province: "Ontario" },
  { slug: "woodstock", name: "Woodstock", province: "Ontario" },
  { slug: "st-thomas", name: "St Thomas", province: "Ontario" },
  { slug: "strathroy", name: "Strathroy", province: "Ontario" },
  { slug: "brantford", name: "Brantford", province: "Ontario" },
  { slug: "hamilton", name: "Hamilton", province: "Ontario" },
];

export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  quote: string;
  service: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah M.",
    city: "London",
    rating: 5,
    quote:
      "Our cedar deck looked brand new after Deck Heroes finished the staining. The colour they recommended matched our home perfectly. Couldn't be happier with the results.",
    service: "Deck Staining",
  },
  {
    name: "James T.",
    city: "Hamilton",
    rating: 5,
    quote:
      "We had our deck refinished after years of neglect. The team was professional, punctual, and the transformation was incredible. Highly recommend their refinishing service.",
    service: "Deck Refinishing",
  },
  {
    name: "Linda & Doug K.",
    city: "Woodstock",
    rating: 5,
    quote:
      "They sealed our deck just before the fall rains hit. Two seasons later and it still looks fantastic. Great value for the protection it provides.",
    service: "Deck Sealing",
  },
  {
    name: "Marcus R.",
    city: "Brantford",
    rating: 5,
    quote:
      "Had both our deck and fence stained at the same time. The crew was efficient, clean, and the finished product is stunning. Our backyard feels like a retreat now.",
    service: "Fence Staining",
  },
  {
    name: "Patricia W.",
    city: "St Thomas",
    rating: 5,
    quote:
      "From the free quote to the final walkthrough, everything was seamless. The deck staining brought out the wood grain beautifully. Five stars all the way.",
    service: "Deck Staining",
  },
  {
    name: "Tom & Angela H.",
    city: "Strathroy",
    rating: 4,
    quote:
      "Solid work on our fence staining project. The team was friendly and worked around our schedule. The fence looks better than the day it was installed.",
    service: "Fence Staining",
  },
  {
    name: "Rachel S.",
    city: "London",
    rating: 5,
    quote:
      "Our pressure-treated deck was greying badly. Deck Heroes stripped, sanded, and refinished it in two days. It's gorgeous and we've already recommended them to three neighbours.",
    service: "Deck Refinishing",
  },
  {
    name: "David L.",
    city: "Hamilton",
    rating: 5,
    quote:
      "Professional from start to finish. They helped us choose the right sealer for our composite-and-wood deck. The sealing has held up perfectly through a harsh winter.",
    service: "Deck Sealing",
  },
  {
    name: "Karen & Bill J.",
    city: "Brantford",
    rating: 5,
    quote:
      "We were impressed by how thorough the prep work was before staining. No shortcuts — they sanded every board. The result speaks for itself. Absolutely beautiful.",
    service: "Deck Staining",
  },
  {
    name: "Mike P.",
    city: "Woodstock",
    rating: 4,
    quote:
      "Great job refinishing our old deck. It had some rough spots but the team handled everything. Communication was excellent and the price was fair for the quality of work.",
    service: "Deck Refinishing",
  },
];
