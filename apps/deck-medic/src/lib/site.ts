export const site = {
  name: "Deck Medic",
  shortName: "Deck Medic",
  tagline: "Professional Deck Restoration & Staining Experts",
  phone: "(833) 243-3123",
  phoneHref: "tel:+18332433123",
  email: "service@deckmedic.ca",
  address: {
    street: "Serving Toronto & Southern Ontario",
    city: "Toronto",
    region: "ON",
    country: "CA",
  },
  addressLine: "Serving Toronto, Mississauga, Oakville & Burlington",
  hours: "Mon – Fri · 8 AM – 5 PM",
  hoursWeekend: "Weekends: Closed",
  yearsExperience: 5,
  serviceAreas: ["Toronto", "Mississauga", "Oakville", "Burlington"],
  url: "https://deckmedic.ca",
  googleRating: "5.0",
  trustBadges: [
    { label: "5-Star Rated", value: "Local homeowners" },
    { label: "Licensed & Insured", value: "Southern Ontario experts" },
    { label: "Weather-Shield Tech", value: "Built for Canadian winters" },
  ],
  responseTime: "24 hours",
} as const;

export type Service = {
  slug: string;
  name: string;
  shortDesc: string;
  description: string;
  image: string;
  imageAlt: string;
  benefits: string[];
  process: string[];
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "deck-staining-sealing",
    name: "Deck Staining & Sealing",
    shortDesc: "Professional Protection Against Ontario's Seasons",
    description:
      "Expert staining and sealing using premium weather-shield technology designed for the Canadian freeze-thaw cycle. We hand-brush or spray premium oil-based and solid-colour stains for maximum UV protection and moisture resistance.",
    image: "/images/Deck-Staining-Sealing-2-1024x1024.png",
    imageAlt: "Professional deck staining and sealing service by Deck Medic in Toronto, ON",
    benefits: [
      "Advanced UV-shielding stains that act as sunscreen for your wood",
      "Moisture barriers engineered for Canadian winters",
      "Semi-transparent, solid-colour, and clear sealant options",
      "Oil-based penetrating stains that won't peel or crack",
    ],
    process: [
      "Assess wood condition and recommend optimal stain type",
      "Deep power-wash to strip grime and old finishes",
      "Sand and prepare surface for maximum stain penetration",
      "Hand-brush application for even, thorough coverage",
      "Final quality inspection and 72-hour cure period",
    ],
    faqs: [
      {
        q: "How often should I stain my deck in Ontario?",
        a: "Due to our harsh winters and humid summers, we recommend staining horizontal surfaces every 2–3 years and vertical surfaces every 4–5 years.",
      },
      {
        q: "What stain type should I choose?",
        a: "We usually recommend semi-transparent for the best balance of natural wood beauty and UV protection. Solid stains hide more imperfections; transparent stains show the most grain but need more frequent maintenance.",
      },
      {
        q: "Does your stain peel?",
        a: "We use high-quality penetrating stains that soak into the wood rather than sitting on top. This significantly reduces peeling and makes future maintenance much easier.",
      },
    ],
    metaTitle: "Deck Staining & Sealing Services | Deck Medic Toronto",
    metaDescription:
      "Professional deck staining and sealing in Toronto, Mississauga, Oakville & Burlington. Weather-shield protection for Canadian winters. Free estimate from Deck Medic.",
  },
  {
    slug: "deck-restoration-refinishing",
    name: "Full-Service Deck Restoration",
    shortDesc: "Bring Your Old Deck Back to Life",
    description:
      "Our flagship service goes beyond a simple wash-and-stain. We inspect for rot, strip old finishes, deep pressure wash, and mechanically sand every surface to reveal fresh, beautiful wood ready for a premium new finish.",
    image: "/images/Deck-Restoration-Refinishing-2-1024x1024.png",
    imageAlt: "Full deck restoration and refinishing by Deck Medic in Toronto, ON",
    benefits: [
      "Turns grey, weathered wood into a brand-new outdoor retreat",
      "Structural tune-up: loose boards secured, screws reset",
      "Chemical stripping removes every layer of failed old finish",
      "Multi-stage sanding eliminates splinters and opens the wood grain",
    ],
    process: [
      "Thorough inspection for wood rot, structural issues, and finish condition",
      "Professional-grade chemical stripping of all old layers",
      "Deep pressure washing to neutralise strippers and lift debris",
      "Multi-stage mechanical sanding from 40-grit to 120-grit",
      "Premium stain or sealant application and final walkthrough",
    ],
    faqs: [
      {
        q: "How long does a full restoration take?",
        a: "Most projects take 2–3 visits. We first power wash, let it dry 48–72 hours, then return for sanding and staining.",
      },
      {
        q: "Can you fix loose boards or popped nails?",
        a: "Absolutely. Our restoration includes structural tune-ups where we secure loose boards and reset nails and screws before we start staining.",
      },
      {
        q: "What if it rains after you stain?",
        a: "We monitor weather closely. If unexpected rain occurs within 24 hours of application, we inspect the surface and perform necessary touch-ups at no extra cost.",
      },
    ],
    metaTitle: "Deck Restoration & Refinishing Services | Deck Medic Toronto",
    metaDescription:
      "Full-service deck restoration and refinishing in Toronto, Oakville, Burlington & Mississauga. Sanding, repairs, premium staining. Free estimate from Deck Medic.",
  },
  {
    slug: "power-washing-cleaning",
    name: "Power Washing & Deep Cleaning",
    shortDesc: "The Foundation of a Flawless Finish",
    description:
      "A great finish starts with a clean surface. We use a specialised Soft Wash technique to deep-clean your wood without damaging delicate fibres — eco-friendly cleaners, bio-growth removal, and wood brightening for a surface that holds stain far longer.",
    image: "/images/Power-Washing-Deep-Cleaning-2-1024x1024.png",
    imageAlt: "Professional pressure washing and deep deck cleaning by Deck Medic in Toronto, ON",
    benefits: [
      "Eco-friendly cleaners safe for lawns, gardens, and pets",
      "Bio-growth removal kills mold, mildew, and algae at the root",
      "Wood brightening removes grey oxidation for a natural glow",
      "Opens wood pores so new stain lasts years longer",
    ],
    process: [
      "Pre-treat with eco-friendly bio-growth cleaner",
      "Low-pressure soft wash to remove mold and organic buildup",
      "High-pressure rinse to clear dirt, old stain residue, and debris",
      "Wood brightener application to neutralise tannins and restore colour",
      "48–72 hour dry time before staining or sealing",
    ],
    faqs: [
      {
        q: "Do I need pressure washing before staining?",
        a: "Yes — it's mandatory. Stain applied over dirt, mold, or old residue will fail early. Our wash-and-dry step is what makes the finish last.",
      },
      {
        q: "Can you just pressure wash without staining?",
        a: "Absolutely. A Deck Medic deep clean alone will restore the look of your deck and extend the life of any existing finish.",
      },
    ],
    metaTitle: "Power Washing & Deck Cleaning Services | Deck Medic Toronto",
    metaDescription:
      "Professional deck power washing and deep cleaning in Toronto, Mississauga, Oakville & Burlington. Eco-friendly, Soft Wash technique. Free estimate from Deck Medic.",
  },
  {
    slug: "fence-staining-restoration",
    name: "Fence Staining & Restoration",
    shortDesc: "Enhance Your Property's Curb Appeal",
    description:
      "Your fence takes the same beating from UV rays, rain, and frost as your deck. We apply the same meticulous preparation and premium weather-shield stains to fences, gates, and pergolas — giving your entire yard a consistent, beautiful finish.",
    image: "/images/Fence-Staining-Restoration-2.png",
    imageAlt: "Professional fence staining and restoration by Deck Medic in Toronto, ON",
    benefits: [
      "Consistent colour match between your deck and fence",
      "UV-resistant stains to prevent grey weathering",
      "Hydrophobic sealants to repel moisture and prevent rot",
      "Works on cedar, pressure-treated, and hardwood fences",
    ],
    process: [
      "Inspect fence panels and posts for rot, loose sections, and staple/nail pops",
      "Power wash and bio-growth treatment",
      "Light sanding of rough or splintered boards",
      "Premium stain or sealant application by hand or spray",
      "Final inspection and colour-match confirmation",
    ],
    faqs: [
      {
        q: "Can you match the stain to my existing deck?",
        a: "Yes. We keep detailed records of stain products and colours used on your deck and can match fences, gates, and pergolas exactly.",
      },
      {
        q: "How long does fence staining take?",
        a: "Most residential fences are completed in one visit after the surface is dry. Larger properties may require two sessions.",
      },
    ],
    metaTitle: "Fence Staining & Restoration Services | Deck Medic Toronto",
    metaDescription:
      "Professional fence staining and restoration in Toronto, Oakville, Burlington & Mississauga. Weather-shield protection, colour-matched to your deck. Free estimate.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export type City = {
  slug: string;
  name: string;
  region: string;
  description: string;
  neighbourhoods: string[];
  heroIntro: string;
  metaTitle: string;
  metaDescription: string;
};

export const cities: City[] = [
  {
    slug: "toronto",
    name: "Toronto",
    region: "ON",
    description:
      "From the ravine-backed decks of the Annex to the modern builds in North York, Toronto homeowners trust Deck Medic for professional restoration that stands up to the city's humidity and hard winters.",
    neighbourhoods: ["North York", "Etobicoke", "Scarborough", "East York", "The Annex", "Leslieville"],
    heroIntro:
      "Toronto's professional deck restoration and staining specialists. Premium wood preservation designed for the city's four-season climate.",
    metaTitle: "Deck Restoration & Staining in Toronto, ON | Deck Medic",
    metaDescription:
      "Professional deck staining, restoration, and power washing in Toronto, ON. Expert wood preservation for cedar and pressure-treated decks. Free estimate from Deck Medic.",
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    region: "ON",
    description:
      "Whether it's a backyard deck in Port Credit or a multi-level structure in Erin Mills, Deck Medic brings the same meticulous preparation and premium finishes to every Mississauga home.",
    neighbourhoods: ["Port Credit", "Lorne Park", "Erin Mills", "Streetsville", "Clarkson", "Meadowvale"],
    heroIntro:
      "Mississauga's trusted deck restoration and staining team. Serving every neighbourhood from Port Credit to Meadowvale.",
    metaTitle: "Deck Restoration & Staining in Mississauga, ON | Deck Medic",
    metaDescription:
      "Professional deck staining and restoration in Mississauga. Expert sanding, repairs, and weather-shield finishes. Free estimate from Deck Medic.",
  },
  {
    slug: "oakville",
    name: "Oakville",
    region: "ON",
    description:
      "Oakville's older cedar decks and newer composite-framed structures both benefit from Deck Medic's surgical approach — deep preparation, premium stains, and finishes built to last through Southern Ontario winters.",
    neighbourhoods: ["Old Oakville", "Glen Abbey", "Bronte", "Joshua Creek", "West Oak Trails", "Iroquois Ridge"],
    heroIntro:
      "Oakville's deck restoration and staining specialists. Premium finishes for cedar, hardwood, and pressure-treated decks.",
    metaTitle: "Deck Restoration & Staining in Oakville, ON | Deck Medic",
    metaDescription:
      "Professional deck staining and restoration in Oakville. Sanding, repairs, and premium weather-shield finishes. Free estimate from Deck Medic.",
  },
  {
    slug: "burlington",
    name: "Burlington",
    region: "ON",
    description:
      "Burlington's lakeshore humidity and cold winters make deck maintenance essential. Deck Medic protects Burlington decks with hydrophobic sealants and UV-shield stains that outlast the elements year after year.",
    neighbourhoods: ["Aldershot", "Roseland", "Tyandaga", "Millcroft", "Alton Village", "Headon Forest"],
    heroIntro:
      "Burlington's deck restoration and staining experts. Protecting lakeshore homes from humidity, UV damage, and freeze-thaw cycles.",
    metaTitle: "Deck Restoration & Staining in Burlington, ON | Deck Medic",
    metaDescription:
      "Professional deck staining and restoration in Burlington, ON. Hydrophobic sealants and UV-shield finishes for Burlington's lakeshore climate. Free estimate.",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
