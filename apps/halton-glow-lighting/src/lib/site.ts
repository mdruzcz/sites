export const site = {
  name: "Halton Glow Lighting",
  shortName: "Halton Glow",
  tagline: "Permanent Outdoor LED Lighting",
  phone: "(519) 266-6796",
  phoneHref: "tel:+15192666796",
  // Email is intentionally NOT exposed publicly — inbox is not actively monitored.
  // All inbound goes through the contact form on /#contact.
  address: {
    street: "Burlington & Oakville",
    city: "Burlington",
    region: "ON",
    postal: "L7L",
    country: "CA",
  },
  addressLine: "Serving Burlington & Oakville, Ontario",
  hours: "Mon – Fri · 8 AM – 8 PM · Sat 9 – 6 · Sun 10 – 4",
  yearsExperience: 5,
  serviceAreas: ["Burlington", "Oakville", "Milton", "Hamilton", "Mississauga"],
  url: "https://haltonglowlighting.ca",
  googleRating: "5.0",
  trustBadges: [
    { label: "Lifetime Warranty", value: "On all installations" },
    { label: "Licensed & Insured", value: "Local Halton experts" },
    { label: "50,000+ Hour LEDs", value: "Rated for Canadian winters" },
  ],
  responseTime: "24 hours",
  social: {
    instagram: "https://instagram.com/haltonglowlighting",
    facebook: "https://facebook.com/haltonglowlighting",
  },
} as const;

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
    slug: "burlington",
    name: "Burlington",
    region: "ON",
    description:
      "From the lakeshore estates of Roseland to the new builds in Alton Village, Burlington homeowners trust Halton Glow for premium permanent outdoor LED lighting.",
    neighbourhoods: ["Aldershot", "Roseland", "Tyandaga", "Millcroft", "Alton Village", "Headon Forest"],
    heroIntro:
      "Burlington's permanent outdoor lighting specialists. Color-matched, weatherproof, app-controlled LED systems designed for the Halton climate.",
    metaTitle: "Permanent Outdoor LED Lighting in Burlington, ON",
    metaDescription:
      "Permanent outdoor LED lighting installer in Burlington. App-controlled, 50,000-hour LEDs, lifetime warranty. Free estimate from Halton Glow Lighting.",
  },
  {
    slug: "oakville",
    name: "Oakville",
    region: "ON",
    description:
      "Whether it's a classic Old Oakville home or a newer Joshua Creek build, our permanent LED systems frame the architecture and add curb appeal year-round.",
    neighbourhoods: ["Old Oakville", "Glen Abbey", "Bronte", "Joshua Creek", "West Oak Trails", "Iroquois Ridge"],
    heroIntro:
      "Oakville's premium permanent outdoor lighting installer. Subtle by day, stunning by night — and fully app-controlled.",
    metaTitle: "Permanent Outdoor LED Lighting in Oakville, ON",
    metaDescription:
      "Permanent outdoor LED lights in Oakville. Weatherproof, smart-app controlled, lifetime warranty. Free consultation from Halton Glow Lighting.",
  },
  {
    slug: "milton",
    name: "Milton",
    region: "ON",
    description:
      "Milton's fast-growing neighbourhoods demand lighting that looks polished and lasts. Our color-matched permanent LED systems do both.",
    neighbourhoods: ["Beaty", "Bronte Meadows", "Coates", "Dempsey", "Harrison", "Scott"],
    heroIntro:
      "Milton's permanent outdoor LED lighting installer. App-controlled brightness, color and schedules for every season.",
    metaTitle: "Permanent Outdoor LED Lighting in Milton, ON",
    metaDescription:
      "Permanent outdoor LED lighting installer serving Milton. 50,000-hour LEDs, lifetime warranty, app-controlled. Free estimate today.",
  },
  {
    slug: "hamilton",
    name: "Hamilton",
    region: "ON",
    description:
      "From Stoney Creek to Ancaster, Hamilton homes benefit from year-round curb appeal with permanent LED lighting that never needs taking down.",
    neighbourhoods: ["Ancaster", "Dundas", "Stoney Creek", "Westdale", "Waterdown", "Binbrook"],
    heroIntro:
      "Hamilton's permanent outdoor LED lighting team. Weatherproof, app-controlled, lifetime warranty — no more ladder time.",
    metaTitle: "Permanent Outdoor LED Lighting in Hamilton, ON",
    metaDescription:
      "Permanent outdoor LED lighting installer in Hamilton. Color-changing, smart-controlled, lifetime warranty. Free estimate from Halton Glow.",
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    region: "ON",
    description:
      "Mississauga homeowners get the same premium permanent lighting service as the rest of Halton — installed by certified local techs with lifetime warranty.",
    neighbourhoods: ["Port Credit", "Lorne Park", "Streetsville", "Erin Mills", "Meadowvale", "Clarkson"],
    heroIntro:
      "Mississauga's permanent outdoor LED lighting installer. Custom-designed, app-controlled, weatherproof systems built to last.",
    metaTitle: "Permanent Outdoor LED Lighting in Mississauga, ON",
    metaDescription:
      "Permanent outdoor LED lights in Mississauga. Smart-app controlled, lifetime warranty, 50,000-hour LEDs. Free estimate from Halton Glow.",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
