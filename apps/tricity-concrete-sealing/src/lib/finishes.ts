import { PICKS } from "@/lib/photos";

export interface Finish {
  slug: "matte" | "semi-gloss" | "gloss";
  name: string;
  short: string;
  sheen: string;
  swatch: "matte" | "semi" | "gloss";
  photo: string;
  tagline: string;
  description: string;
  bestFor: string[];
  look: string[];
  considerations: string[];
  metaTitle: string;
  metaDescription: string;
  faqs: { q: string; a: string }[];
}

export const FINISHES: Finish[] = [
  {
    slug: "matte",
    name: "Matte",
    short: "Natural, no shine",
    sheen: "Low sheen",
    swatch: "matte",
    photo: PICKS.matte,
    tagline: "Protection you can't see.",
    description:
      "A matte finish protects the concrete without changing how it looks. The surface stays natural, colour is lightly enriched, and there is no reflection in sunlight. It is the finish we recommend for broom-finish driveways, exposed aggregate and anywhere slip resistance matters more than shine.",
    bestFor: ["Broom-finish driveways and garage pads", "Exposed aggregate patios and walkways", "Pool decks, steps and sloped walkways", "Homeowners who want protection without a wet look"],
    look: ["No reflection, even in full sun", "Subtle colour enrichment", "Hides minor surface imperfections", "Keeps the natural texture of the concrete"],
    considerations: ["Least colour enhancement of the three finishes", "Stamped and coloured concrete may look flat compared to semi-gloss", "Non-slip additive still recommended on smooth trowelled surfaces"],
    metaTitle: "Matte Concrete Sealer Finish | Natural Look, Full Protection",
    metaDescription: "Matte finish concrete sealing from TriCity: a natural, no-shine solvent-based sealer for broom-finish driveways, exposed aggregate and walkways across London and SW Ontario.",
    faqs: [
      { q: "Does a matte sealer still protect against salt and stains?", a: "Yes. Sheen is purely cosmetic. Our matte finish uses the same high-quality solvent-based acrylic as the gloss version, so salt, oil and water resistance are the same." },
      { q: "Will a matte finish darken my concrete?", a: "Slightly. Any solvent-based sealer enriches colour a little because it wets the surface, but matte keeps that effect subtle and there is no reflection." },
      { q: "Is matte the most slip resistant?", a: "It has the most texture of the three finishes, and we can add a non-slip additive for pool decks and steps." },
    ],
  },
  {
    slug: "semi-gloss",
    name: "Semi-Gloss",
    short: "Satin, our most popular",
    sheen: "Medium sheen",
    swatch: "semi",
    photo: PICKS.semiGloss,
    tagline: "The sweet spot for stamped and coloured concrete.",
    description:
      "Semi-gloss is the finish most of our clients choose. It brings out the colour and pattern of stamped, coloured and decorative concrete with a soft satin sheen that looks rich without looking wet. It shows less dust and dirt than gloss and is easier to keep looking even between reseals.",
    bestFor: ["Stamped concrete patios and driveways", "Coloured and integrally pigmented concrete", "Front walkways and porches", "Anyone who wants colour enhancement without high shine"],
    look: ["Soft satin sheen", "Strong colour and pattern enhancement", "Balanced reflection in sunlight", "Hides dust and light dirt better than gloss"],
    considerations: ["More reflective than matte, so surface imperfections show slightly more", "Non-slip additive recommended on steps and sloped surfaces"],
    metaTitle: "Semi-Gloss Concrete Sealer Finish | Satin Look for Stamped Concrete",
    metaDescription: "Semi-gloss concrete sealing from TriCity: a satin solvent-based finish that enhances stamped and coloured concrete without a wet look. London, Woodstock, Brantford and SW Ontario.",
    faqs: [
      { q: "Why is semi-gloss the most popular finish?", a: "It enhances colour almost as much as gloss while hiding dust, pollen and light wear better, so it looks good for longer between reseals." },
      { q: "Will semi-gloss look wet after rain?", a: "It looks slightly richer when wet, like any sealed surface, but it does not have the mirror-like reflection of a gloss finish." },
      { q: "Can I switch from gloss to semi-gloss at reseal time?", a: "Yes. Because our sealers are solvent-based, a new coat blends into the old one, and we can adjust the sheen at your next reseal." },
    ],
  },
  {
    slug: "gloss",
    name: "Gloss",
    short: "Wet look, maximum colour",
    sheen: "High sheen",
    swatch: "gloss",
    photo: PICKS.gloss,
    tagline: "The showcase finish.",
    description:
      "Gloss gives stamped and coloured concrete a permanent wet look with the deepest colour enhancement we can offer. It is the finish that makes a driveway or patio the focal point of the property, and the one most people picture when they think of freshly sealed stamped concrete.",
    bestFor: ["Stamped patios and pool surrounds", "Coloured and stained driveways", "Showcase front entrances", "Clients who want the richest possible colour"],
    look: ["Wet-look, mirror-like sheen", "Deepest colour and pattern enhancement", "Highest visual impact from the street", "Reflects landscape lighting beautifully at night"],
    considerations: ["Shows dust and footprints more readily than semi-gloss", "Surface imperfections are more visible", "Non-slip additive strongly recommended around pools and on steps"],
    metaTitle: "Gloss Concrete Sealer Finish | Wet Look for Stamped Concrete",
    metaDescription: "Gloss concrete sealing from TriCity: a wet-look solvent-based finish with the deepest colour enhancement for stamped and coloured patios and driveways across SW Ontario.",
    faqs: [
      { q: "Is a gloss sealer slippery?", a: "It can be when wet, especially on smooth stamped patterns. We add a non-slip additive on pool decks, steps and anywhere you ask for it, with no change to the look." },
      { q: "Does gloss last as long as the other finishes?", a: "Yes. The protective film is the same solvent-based acrylic. Gloss simply shows wear a little sooner because the sheen dulls in high-traffic lanes before the protection is gone." },
      { q: "Can gloss be applied over an older sealer?", a: "If the previous coat was solvent-based and is sound, yes. Our sealer re-emulsifies the old coat so the two bond into one seamless film." },
    ],
  },
];

export const getFinish = (slug: string) => FINISHES.find((f) => f.slug === slug);
