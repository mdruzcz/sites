export const site = {
  name: "Festive Holiday Lighting",
  shortName: "Festive",
  tagline: "Professional Holiday & Permanent Lighting",
  phone: "(289) 426-5764",
  phoneHref: "tel:+12894265764",
  email: "info@festiveholidaylighting.ca",
  address: {
    city: "Hamilton",
    region: "ON",
    country: "CA",
  },
  addressLine: "Serving Southern Ontario",
  hours: "Mon – Fri · 8 AM – 6 PM (extended hours during holiday season)",
  hoursShort: "Mon–Fri 8AM–6PM",
  yearsExperience: 10,
  founder: "Cameron Blancher",
  url: "https://festiveholidaylighting.ca",
  googleRating: "5.0",
  reviewCount: 47,
  trustBadges: [
    { label: "$5M Liability", value: "Fully insured" },
    { label: "WSIB Compliant", value: "Certified crews" },
    { label: "10+ Years Experience", value: "Award-winning displays" },
    { label: "Family Owned", value: "Southern Ontario" },
  ],
  responseTime: "24 hours",
  social: {
    facebook: "https://facebook.com/festiveholidaylighting",
    instagram: "https://instagram.com/festiveholidaylighting",
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
  localFact: string;
};

export const cities: City[] = [
  {
    slug: "hamilton",
    name: "Hamilton",
    region: "ON",
    description:
      "From the historic Victorian homes in Durand to modern family estates on the Mountain, Hamilton truly shines during the holidays — and year-round with permanent LED lighting.",
    neighbourhoods: ["Ancaster", "Dundas", "Stoney Creek", "Westdale", "Waterdown", "Binbrook", "Durand", "Ainslie Wood"],
    heroIntro: "Hamilton's most trusted holiday and permanent lighting specialists. Serving every neighbourhood from the Escarpment to the lakeshore.",
    metaTitle: "Holiday Lighting Hamilton ON | Permanent & Christmas Lights",
    metaDescription:
      "Professional holiday lighting in Hamilton. Seasonal Christmas light installation + permanent LED systems. Fully insured, WSIB compliant. Free quote — (289) 426-5764.",
    localFact: "Serving over 200 Hamilton homes and businesses annually, from Ancaster estates to Stoney Creek plazas.",
  },
  {
    slug: "burlington",
    name: "Burlington",
    region: "ON",
    description:
      "From lakeshore estates in Roseland to the growing new builds in Alton Village, Burlington homeowners and businesses trust Festive for premium seasonal and permanent lighting.",
    neighbourhoods: ["Aldershot", "Roseland", "Tyandaga", "Millcroft", "Alton Village", "Headon Forest", "Brant Hills", "Mountainside"],
    heroIntro: "Burlington's professional holiday lighting company. Seasonal installs and permanent LED systems designed for Halton's best neighbourhoods.",
    metaTitle: "Holiday Lighting Burlington ON | Christmas & Permanent Lights",
    metaDescription:
      "Burlington's top holiday lighting installer. Seasonal Christmas lights + year-round permanent LED systems. $5M insured, WSIB compliant. Free quote today.",
    localFact: "Burlington's fastest-growing service — permanent roofline LED systems now in over 150 Burlington homes.",
  },
  {
    slug: "oakville",
    name: "Oakville",
    region: "ON",
    description:
      "Whether it's a classic Old Oakville estate or a newer Joshua Creek home, our holiday and permanent lighting systems enhance curb appeal and create magical seasonal displays.",
    neighbourhoods: ["Old Oakville", "Glen Abbey", "Bronte", "Joshua Creek", "West Oak Trails", "Iroquois Ridge", "College Park", "River Oaks"],
    heroIntro: "Oakville's premium holiday lighting installer. Elegant seasonal displays and permanent app-controlled LED systems for Halton's finest homes.",
    metaTitle: "Holiday Lighting Oakville ON | Christmas & Permanent Lights",
    metaDescription:
      "Professional holiday lighting in Oakville. Custom Christmas light installs + permanent LED roofline systems. Fully insured, 10+ years experience. Free quote.",
    localFact: "Oakville's most trusted holiday lighting company — serving Glen Abbey, Old Oakville, and Joshua Creek since 2014.",
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    region: "ON",
    description:
      "Mississauga's diverse neighbourhoods — from Port Credit's lakefront to Erin Mills' family subdivisions — all benefit from our professional seasonal and permanent lighting services.",
    neighbourhoods: ["Port Credit", "Lorne Park", "Streetsville", "Erin Mills", "Meadowvale", "Clarkson", "Cooksville", "Applewood"],
    heroIntro: "Mississauga's professional holiday lighting team. Serving the GTA West with premium Christmas light installs and permanent LED systems.",
    metaTitle: "Holiday Lighting Mississauga ON | Christmas & Permanent Lights",
    metaDescription:
      "Expert holiday lighting in Mississauga. Seasonal Christmas installation + year-round permanent LED systems. $5M insured, WSIB. Free quote — call today.",
    localFact: "Serving Mississauga businesses and homeowners from Port Credit to Meadowvale with fully-managed lighting programs.",
  },
  {
    slug: "brampton",
    name: "Brampton",
    region: "ON",
    description:
      "Brampton's growing communities deserve spectacular holiday lighting. From Heritage Heights to Vales of Castlemore, we install stunning seasonal displays and permanent LED systems.",
    neighbourhoods: ["Heritage Heights", "Vales of Castlemore", "Springdale", "Heart Lake", "Bramalea", "Fletcher's Meadow", "Sandalwood"],
    heroIntro: "Brampton's professional holiday lighting company. Seasonal Christmas lights and permanent roofline LED systems for homes and businesses.",
    metaTitle: "Holiday Lighting Brampton ON | Christmas & Permanent Lights",
    metaDescription:
      "Professional holiday lighting in Brampton. Custom Christmas installs + permanent LED systems. Fully insured, family-owned. Free quote from Festive Holiday Lighting.",
    localFact: "Proud to light up Brampton's fastest-growing neighbourhoods with both seasonal and year-round permanent lighting.",
  },
  {
    slug: "milton",
    name: "Milton",
    region: "ON",
    description:
      "Milton's fast-growing communities demand lighting that impresses. Our permanent and seasonal holiday lighting systems are built to perform in Halton's demanding climate.",
    neighbourhoods: ["Beaty", "Bronte Meadows", "Coates", "Dempsey", "Harrison", "Scott", "Willmott", "Timberlea"],
    heroIntro: "Milton's holiday lighting specialists. Seasonal Christmas installs and permanent LED systems built for Halton's climate.",
    metaTitle: "Holiday Lighting Milton ON | Christmas & Permanent Lights",
    metaDescription:
      "Holiday lighting in Milton — seasonal Christmas installs and permanent LED roofline systems. WSIB compliant, $5M insured. Free quote from Festive Holiday Lighting.",
    localFact: "Milton's go-to holiday lighting company — serving Beaty, Coates, and every growing Milton neighbourhood.",
  },
  {
    slug: "ancaster",
    name: "Ancaster",
    region: "ON",
    description:
      "Ancaster's prestigious homes and businesses deserve equally impressive holiday displays. We specialize in high-end custom installations for Ancaster's discerning homeowners.",
    neighbourhoods: ["Ancaster Village", "Meadowlands", "Governor's Road", "Tiffany Hills", "University Gardens"],
    heroIntro: "Ancaster's professional holiday lighting specialists. Custom seasonal and permanent LED lighting for Ancaster's finest properties.",
    metaTitle: "Holiday Lighting Ancaster ON | Christmas & Permanent Lights",
    metaDescription:
      "Premium holiday lighting in Ancaster. Custom Christmas installs + permanent LED systems for Ancaster's finest homes. Fully insured. Free quote today.",
    localFact: "Ancaster's premium holiday lighting choice — award-winning displays for Meadowlands and Ancaster Village estates.",
  },
  {
    slug: "grimsby",
    name: "Grimsby",
    region: "ON",
    description:
      "Grimsby's lakeside setting makes holiday lighting even more magical. We serve both the charming downtown core and the growing new developments above the escarpment.",
    neighbourhoods: ["Grimsby Beach", "Downtown Grimsby", "Lakeview", "Casablanca", "Upper Grimsby"],
    heroIntro: "Grimsby's professional holiday lighting company. Seasonal Christmas displays and permanent LED systems for Niagara's lakeside communities.",
    metaTitle: "Holiday Lighting Grimsby ON | Christmas & Permanent Lights",
    metaDescription:
      "Professional holiday lighting in Grimsby. Seasonal Christmas installs + permanent LED systems. Insured, local, award-winning. Free quote from Festive.",
    localFact: "Proud to serve Grimsby Beach, downtown Grimsby, and the lakeside communities of Niagara's North Shore.",
  },
  {
    slug: "st-catharines",
    name: "St. Catharines",
    region: "ON",
    description:
      "St. Catharines' Garden City deserves to bloom at Christmas too. We bring brilliant holiday lighting to homes and businesses across the Niagara region's largest city.",
    neighbourhoods: ["Downtown St. Catharines", "Port Dalhousie", "Glenridge", "Merritton", "Facer", "Lakeport", "Ridley"],
    heroIntro: "St. Catharines' professional holiday lighting team. Serving the Garden City with seasonal Christmas displays and permanent LED systems.",
    metaTitle: "Holiday Lighting St. Catharines ON | Christmas & Permanent Lights",
    metaDescription:
      "Expert holiday lighting in St. Catharines. Custom Christmas installs + permanent LED roofline systems. Niagara's trusted lighting company. Free quote.",
    localFact: "Serving St. Catharines' Port Dalhousie waterfront, downtown BIA, and Glenridge neighbourhoods with premium holiday displays.",
  },
  {
    slug: "niagara-falls",
    name: "Niagara Falls",
    region: "ON",
    description:
      "Niagara Falls is already one of Canada's most dazzling sights — let us make your home or business just as spectacular. Permanent and seasonal lighting for the Falls area.",
    neighbourhoods: ["Chippawa", "Drummond Hill", "Stamford", "Lundy's Lane", "Fernwood", "Cherrywood"],
    heroIntro: "Niagara Falls' professional holiday lighting company. Seasonal Christmas installs and permanent LED systems for Canada's most visited city.",
    metaTitle: "Holiday Lighting Niagara Falls ON | Christmas & Permanent Lights",
    metaDescription:
      "Professional holiday lighting in Niagara Falls. Custom Christmas displays + permanent LED systems. Insured, experienced, award-winning. Free quote today.",
    localFact: "Serving Niagara Falls' residential neighbourhoods and tourist-area businesses with premium seasonal and permanent lighting.",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export const services = [
  {
    slug: "christmas-light-installation",
    name: "Christmas Light Installation",
    shortName: "Christmas Lights",
    icon: "🎄",
    tagline: "Full-service seasonal installation, maintenance & takedown",
    description:
      "We handle everything — custom design, professional installation, mid-season maintenance checks, post-holiday takedown, and organized storage. You enjoy the magic, we handle the work.",
  },
  {
    slug: "permanent-lighting",
    name: "Permanent Holiday Lighting",
    shortName: "Permanent Lights",
    icon: "✨",
    tagline: "Year-round app-controlled LED roofline systems",
    description:
      "Smart RGBW LED lights installed permanently in your roofline, soffits, or fascia. Control every colour, pattern, and schedule from your phone — Christmas, Halloween, birthdays, team colours, any occasion.",
  },
  {
    slug: "residential-holiday-lighting",
    name: "Residential Holiday Lighting",
    shortName: "Residential",
    icon: "🏠",
    tagline: "Custom home lighting for homeowners",
    description:
      "Tailored holiday lighting designs for homes of all sizes. Whether it's a cozy bungalow or a sprawling estate, we create a display that complements your home's architecture and your personal style.",
  },
  {
    slug: "commercial-holiday-lighting",
    name: "Commercial Holiday Lighting",
    shortName: "Commercial",
    icon: "🏢",
    tagline: "Attract customers with festive commercial displays",
    description:
      "Make your storefront, office, or plaza impossible to ignore this holiday season. We design commercial lighting programs that drive foot traffic, boost brand visibility, and create the festive atmosphere customers love.",
  },
  {
    slug: "municipal-bia-lighting",
    name: "Municipal & BIA Lighting",
    shortName: "Municipal/BIA",
    icon: "🏙️",
    tagline: "Streetscapes, town centres & public spaces",
    description:
      "Turnkey festive lighting for municipalities, BIAs, commercial properties, and public spaces across Southern Ontario. $5M liability, WSIB-compliant crews, commercial-grade LED products.",
  },
  {
    slug: "tree-lighting",
    name: "Tree Lighting",
    shortName: "Tree Lighting",
    icon: "🌲",
    tagline: "Indoor and outdoor tree wrapping & illumination",
    description:
      "Award-winning tree lighting displays that transform ordinary trees into magical focal points. We've won accolades for Christmas Tree wraps — our specialty. Indoor and outdoor, any size.",
  },
  {
    slug: "interior-holiday-decorating",
    name: "Interior Holiday Decorating",
    shortName: "Interior Decor",
    icon: "🎁",
    tagline: "Lobby, office & indoor space holiday transformation",
    description:
      "Holiday magic isn't just for the outside. We transform lobbies, offices, retail spaces, and event venues with stunning interior holiday décor and lighting that impresses clients and energizes teams.",
  },
] as const;

export type ServiceSlug = typeof services[number]["slug"];
