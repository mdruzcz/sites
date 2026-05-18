export const COMPANY_NAME = "Deck Heroes";
export const PHONE = "519 878 6735";
export const PHONE_HREF = "tel:+15198786735";
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
    slug: "deck-refinishing",
    title: "Deck Refinishing",
    shortDescription:
      "Restore weathered, grey decks to their original glory with our complete sanding and refinishing process.",
  },
  {
    slug: "deck-resurfacing",
    title: "Deck Resurfacing",
    shortDescription:
      "Replace worn deck boards and give your entire surface a fresh start without rebuilding the frame.",
  },
  {
    slug: "deck-building",
    title: "Deck Building",
    shortDescription:
      "Custom-designed and expertly built decks that transform your backyard into the perfect outdoor living space.",
  },
  {
    slug: "deck-cleaning",
    title: "Deck Cleaning",
    shortDescription:
      "Professional power washing and deep cleaning to remove dirt, mould, and grey weathering from your deck.",
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
      "They cleaned and resurfaced our deck just before the fall rains hit. Two seasons later and it still looks fantastic. Great value for the transformation.",
    service: "Deck Resurfacing",
  },
  {
    name: "Marcus R.",
    city: "Brantford",
    rating: 5,
    quote:
      "Had our entire deck built from scratch. The crew was efficient, clean, and the finished product is stunning. Our backyard feels like a retreat now.",
    service: "Deck Building",
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
      "Solid work on our deck cleaning project. The team was friendly and worked around our schedule. The deck looks better than the day it was installed.",
    service: "Deck Cleaning",
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
      "Professional from start to finish. They helped us choose the right material for our deck resurfacing. The new boards have held up perfectly through a harsh winter.",
    service: "Deck Resurfacing",
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
