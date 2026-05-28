export const site = {
  name: "We Install Christmas Lights",
  shortName: "We Install Christmas Lights",
  tagline: "Professional Christmas and Holiday Lighting",
  subTagline: "Easy, Custom, Holiday Lighting In As Little As 1 Day!",
  phone: "(519) 266-6796",
  phoneHref: "tel:+15192666796",
  email: "service@weinstallchristmaslights.ca",
  address: {
    street: "300 Marconi Gate #1002",
    city: "London",
    region: "ON",
    postalCode: "N5V 4T2",
    country: "CA",
  },
  addressLine: "300 Marconi Gate #1002, London, ON N5V 4T2",
  url: "https://weinstallchristmaslights.ca",
  responseTime: "24 hours",
  hours: "Mon–Fri 8 AM – 6 PM (extended hours during holiday season)",
  googleRating: "5.0",
  reviewCount: 80,
  social: {
    facebook: "https://www.facebook.com/weinstallchristmaslights/",
    pinterest: "https://www.pinterest.ca/weinstallchristmaslights/",
    instagram: "https://www.instagram.com/weinstallchristmaslights",
    youtube: "https://www.youtube.com/@weinstallchristmaslights",
  },
  affiliates: [
    { name: "Master Decker", url: "https://masterdecker.com/" },
    { name: "London Concrete Sealing", url: "https://londonconcretesealing.ca/" },
    { name: "London Christmas Lights", url: "https://masterdecker.com/" },
  ],
  stats: [
    { number: "740", label: "Houses Decorated" },
    { number: "921", label: "Decorated Christmas Trees (Residential)" },
    { number: "3,960", label: "Light Strands Connected" },
  ],
} as const;

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  category: "residential" | "commercial" | "addon";
  tagline: string;
  description: string;
  longDescription?: string;
  image?: string;
  features?: string[];
};

export const services: Service[] = [
  {
    slug: "residential-christmas-light-installation",
    name: "Residential Christmas Light Installation",
    shortName: "Residential Light Installation",
    category: "residential",
    tagline: "Make your home glow this holiday season",
    description:
      "Custom-cut professional-grade LED holiday lighting installed on your home's roofline, trees, hedges, and yard — all included in one stress-free package.",
    image: "/images/residential-lights.jpg",
    features: [
      "Custom roofline design",
      "Professional-grade LED lighting",
      "Mid-season maintenance included",
      "Takedown and storage handled",
    ],
  },
  {
    slug: "residential-christmas-decorators",
    name: "Residential Christmas Decorators",
    shortName: "Residential Decorators",
    category: "residential",
    tagline: "Full-service holiday decorating for your home",
    description:
      "Beyond lights — wreaths, garlands, indoor trees, mantel décor and more. Let our designers transform your home into a winter wonderland.",
    image: "/images/residential-decor.jpg",
    features: [
      "Designer consultation",
      "Custom décor packages",
      "Indoor + outdoor styling",
      "Post-season removal",
    ],
  },
  {
    slug: "full-season-holiday-service",
    name: "Full Season Holiday Service",
    shortName: "Full Season Service",
    category: "addon",
    tagline: "Set it and forget it — we handle everything",
    description:
      "From design to installation to maintenance, takedown, and storage. Our most popular all-inclusive holiday lighting program.",
    image: "/images/full-season.jpg",
    features: [
      "Free design + quote",
      "Installation",
      "In-season maintenance",
      "Removal + storage",
    ],
  },
  {
    slug: "christmas-light-takedown",
    name: "Christmas Light Takedown",
    shortName: "Light Takedown",
    category: "addon",
    tagline: "Professional removal after the season ends",
    description:
      "We carefully take down your holiday lights when the season ends, ensuring no damage to your home, then pack everything for storage.",
    image: "/images/takedown.jpg",
    features: [
      "Scheduled removal window",
      "Damage-free takedown",
      "Optional storage",
      "Property protection",
    ],
  },
  {
    slug: "christmas-light-year-long-storage",
    name: "Year-Long Christmas Light Storage",
    shortName: "Year-Long Storage",
    category: "addon",
    tagline: "Free up your garage — let us store your lights",
    description:
      "Convenient secure storage of your holiday lighting until next season. We catalog every strand and inspect it before re-install.",
    image: "/images/storage.jpg",
    features: [
      "Climate-controlled storage",
      "Pre-install inspection",
      "Inventory tracking",
      "From $100 per season",
    ],
  },
  {
    slug: "govee-light-installer",
    name: "Govee Light Installation",
    shortName: "Govee Installer",
    category: "addon",
    tagline: "Authorized professional installers for Govee permanent lighting",
    description:
      "Have a Govee Permanent Outdoor Lights kit? Our team installs and configures Govee permanent LED systems so you get the perfect result.",
    image: "/images/govee.jpg",
    features: [
      "Govee Permanent Outdoor Lights",
      "Pro mounting + concealment",
      "App pairing + scenes",
      "Wiring + power planning",
    ],
  },
  {
    slug: "eufy-light-installer",
    name: "Eufy Light Installation",
    shortName: "Eufy Installer",
    category: "addon",
    tagline: "Professional installation for Eufy Permanent Outdoor Lights",
    description:
      "We install and configure Eufy's permanent outdoor lighting systems — clean mounting, proper power, and full app setup.",
    image: "/images/eufy.jpg",
    features: [
      "Eufy permanent LED systems",
      "Clean mounting",
      "App pairing",
      "Optional service contract",
    ],
  },
  {
    slug: "commercial-christmas-light-installation",
    name: "Commercial Christmas Light Installation",
    shortName: "Commercial Lights",
    category: "commercial",
    tagline: "Festive lighting for storefronts, plazas, and offices",
    description:
      "Drive foot traffic and spread cheer with professional commercial holiday lighting. We design, install, maintain, take down, and store.",
    image: "/images/commercial-lights.jpg",
    features: [
      "Storefronts + plazas",
      "Insured + WSIB-compliant",
      "After-hours installs",
      "Multi-year programs",
    ],
  },
  {
    slug: "commercial-christmas-decorators",
    name: "Commercial Christmas Decorators",
    shortName: "Commercial Decorators",
    category: "commercial",
    tagline: "Award-winning commercial holiday décor",
    description:
      "Trees, wreaths, garlands, custom installations — for hotels, malls, restaurants, banks, casinos, and more. Hundreds of satisfied commercial clients.",
    image: "/images/commercial-decor.jpg",
    features: [
      "Custom design",
      "Premium décor inventory",
      "Installation + breakdown",
      "Multi-location programs",
    ],
  },
  {
    slug: "commercial-christmas-trees-and-decorations",
    name: "Commercial Christmas Trees & Decorations",
    shortName: "Commercial Trees",
    category: "commercial",
    tagline: "Premium commercial trees and indoor decorating",
    description:
      "Large-scale Christmas trees, garlands, wreaths and interior decorating for businesses, lobbies, and event spaces.",
    image: "/images/commercial-trees.jpg",
    features: [
      "Large-scale trees",
      "Lobby + atrium displays",
      "Themed décor",
      "Full removal service",
    ],
  },
  {
    slug: "commercial-holiday-lighting-services",
    name: "Commercial Holiday Lighting Services",
    shortName: "Commercial Holiday",
    category: "commercial",
    tagline: "Complete commercial holiday lighting programs",
    description:
      "End-to-end commercial holiday lighting: design, supply, install, maintenance, removal, storage. Built for businesses that want results without the headache.",
    image: "/images/commercial-holiday.jpg",
    features: [
      "Turn-key program",
      "Designer support",
      "On-call maintenance",
      "Annual renewal",
    ],
  },
] as const;

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export type City = {
  slug: string;
  name: string;
  region: string;
  heroIntro: string;
  description: string;
  neighbourhoods: string[];
  metaTitle: string;
  metaDescription: string;
  localFact: string;
};

export const cities: City[] = [
  {
    slug: "london-ontario",
    name: "London",
    region: "ON",
    heroIntro:
      "London's #1 rated holiday lighting installer — proudly transforming homes in Old North, Byron, Masonville, Hyde Park, and every London neighbourhood.",
    description:
      "Our home base. We've decorated over 700 London homes since we started, and our team lives here year-round. Quick turnaround, local crews, and the most experienced installers in the city.",
    neighbourhoods: ["Old North", "Byron", "Masonville", "Hyde Park", "Westmount", "Lambeth", "White Oaks", "Hunt Club"],
    metaTitle: "Christmas Light Installation London Ontario | We Install Christmas Lights",
    metaDescription:
      "Professional Christmas light installation in London, Ontario. 96% return rate, 5-star reviews, 740+ London homes decorated. Free quote — (519) 266-6796.",
    localFact: "Over 740 London homes decorated since 2016 — our flagship service area.",
  },
  {
    slug: "strathroy",
    name: "Strathroy",
    region: "ON",
    heroIntro:
      "Strathroy's professional Christmas light installation team — serving every neighbourhood from downtown to the new builds on the west end.",
    description:
      "Strathroy homeowners deserve the same magical holiday displays we install in London. Our team travels to Strathroy for full-service holiday lighting — design, installation, maintenance, takedown, and storage.",
    neighbourhoods: ["Downtown Strathroy", "West Strathroy", "East Strathroy", "Mount Brydges (nearby)"],
    metaTitle: "Christmas Light Installation Strathroy | We Install Christmas Lights",
    metaDescription:
      "Strathroy's holiday lighting installer. Full-service Christmas light design, installation, maintenance & storage. 5-star rated. Free quote today.",
    localFact: "Trusted by Strathroy homeowners since 2018.",
  },
  {
    slug: "woodstock",
    name: "Woodstock",
    region: "ON",
    heroIntro:
      "Woodstock's go-to Christmas light installer. Custom-cut roofline lighting, trees, hedges — all installed, maintained, and removed by our local team.",
    description:
      "We've been lighting up Woodstock homes for years — from Oxford County estates to family bungalows. All-inclusive holiday lighting service.",
    neighbourhoods: ["Northwest Woodstock", "South Woodstock", "Old North Woodstock", "Sally Creek"],
    metaTitle: "Christmas Light Installation Woodstock ON | We Install Christmas Lights",
    metaDescription:
      "Professional Christmas light installation in Woodstock, Ontario. Custom design, installed in 1 day, full-season maintenance. Free quote — call today.",
    localFact: "Woodstock's most reviewed Christmas light installer.",
  },
  {
    slug: "waterloo",
    name: "Waterloo",
    region: "ON",
    heroIntro:
      "Waterloo's professional holiday lighting team. We handle the heights, the wiring, and the design — you enjoy the magic.",
    description:
      "Whether it's a townhouse in Uptown, an estate in Beechwood, or a tech-campus office decoration, our Waterloo crew handles the lot.",
    neighbourhoods: ["Uptown Waterloo", "Beechwood", "Lakeshore Village", "Westmount", "Lincoln Heights"],
    metaTitle: "Christmas Light Installation Waterloo ON | We Install Christmas Lights",
    metaDescription:
      "Waterloo's professional Christmas light installer. Custom-cut roofline lighting, trees, hedges. Insured, 5-star rated. Free quote — (519) 266-6796.",
    localFact: "Serving Waterloo Region year after year — our return rate is 96%.",
  },
  {
    slug: "st-thomas",
    name: "St. Thomas",
    region: "ON",
    heroIntro:
      "St. Thomas's holiday lighting specialists. We bring our award-winning London team to St. Thomas every season.",
    description:
      "St. Thomas homes get the same premium service our London customers love. Custom design, professional installation, maintenance, takedown, and storage.",
    neighbourhoods: ["Downtown St. Thomas", "Lake Margaret", "Lynhurst", "Pinafore Park"],
    metaTitle: "Christmas Light Installation St. Thomas ON | We Install Christmas Lights",
    metaDescription:
      "Premium Christmas light installation in St. Thomas, Ontario. Custom design, full-service program, insured. 5-star reviews — book today.",
    localFact: "Trusted by St. Thomas families since 2017.",
  },
  {
    slug: "milton",
    name: "Milton",
    region: "ON",
    heroIntro:
      "Milton's holiday lighting experts. We install in 1 day — and handle everything from design to takedown.",
    description:
      "Milton's neighbourhoods are growing fast — and so is the demand for premium holiday lighting. Our team has serviced Beaty, Coates, Willmott and beyond.",
    neighbourhoods: ["Beaty", "Coates", "Willmott", "Harrison", "Scott", "Dempsey"],
    metaTitle: "Christmas Light Installation Milton ON | We Install Christmas Lights",
    metaDescription:
      "Milton's premier holiday lighting installer. Custom Christmas light design, installation, maintenance & storage. Free quote — call today.",
    localFact: "Milton's fast-growing west-end neighbourhoods love our 1-day install promise.",
  },
  {
    slug: "oakville",
    name: "Oakville",
    region: "ON",
    heroIntro:
      "Oakville's premium Christmas light installation team. Elegant designs for Halton's finest homes.",
    description:
      "From the lakefront estates of Old Oakville to the family homes of Glen Abbey, our Oakville crew installs sophisticated, custom holiday lighting designs.",
    neighbourhoods: ["Old Oakville", "Glen Abbey", "Joshua Creek", "Bronte", "Iroquois Ridge", "River Oaks"],
    metaTitle: "Christmas Light Installation Oakville ON | We Install Christmas Lights",
    metaDescription:
      "Oakville's premium Christmas light installer. Custom-cut roofline designs for Halton's finest homes. Insured, 5-star rated. Free quote.",
    localFact: "Oakville's premium holiday lighting choice — elegant displays for Halton's finest homes.",
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    region: "ON",
    heroIntro:
      "Mississauga's professional holiday lighting team. From Port Credit to Meadowvale — we cover every neighbourhood.",
    description:
      "Mississauga's biggest, brightest holiday lighting installs. Whether it's a Port Credit townhome or an Erin Mills estate, we deliver.",
    neighbourhoods: ["Port Credit", "Lorne Park", "Streetsville", "Erin Mills", "Meadowvale", "Clarkson"],
    metaTitle: "Christmas Light Installation Mississauga | We Install Christmas Lights",
    metaDescription:
      "Mississauga's professional Christmas light installer. Custom design, full-service program, insured. 5-star rated. Free quote — call today.",
    localFact: "Serving Mississauga's diverse neighbourhoods from the lakefront to the suburbs.",
  },
  {
    slug: "cambridge",
    name: "Cambridge",
    region: "ON",
    heroIntro:
      "Cambridge's Christmas light installation team. Custom-cut roofline lighting plus trees, hedges, and yard décor.",
    description:
      "Cambridge homeowners get the same premium full-service program our London customers love. Design, install, maintain, take down, store.",
    neighbourhoods: ["Galt", "Preston", "Hespeler", "West Galt", "East Galt"],
    metaTitle: "Christmas Light Installation Cambridge ON | We Install Christmas Lights",
    metaDescription:
      "Cambridge's premier Christmas light installer. Custom design, 1-day installation, maintenance + storage. 5-star reviews. Free quote.",
    localFact: "Cambridge's most-loved Christmas light installer — Galt, Preston, and Hespeler covered.",
  },
  {
    slug: "guelph",
    name: "Guelph",
    region: "ON",
    heroIntro:
      "Guelph's professional Christmas light installation specialists. Premium displays for the Royal City.",
    description:
      "From Old University to the new neighbourhoods on the west end, our Guelph crew installs custom holiday lighting with care.",
    neighbourhoods: ["Old University", "Exhibition Park", "Westminster Woods", "Kortright Hills", "Pineridge"],
    metaTitle: "Christmas Light Installation Guelph ON | We Install Christmas Lights",
    metaDescription:
      "Guelph's professional Christmas light installer. Custom roofline designs, trees, hedges, takedown + storage. Free quote today.",
    localFact: "Royal City's award-rated holiday lighting team.",
  },
  {
    slug: "georgetown",
    name: "Georgetown",
    region: "ON",
    heroIntro:
      "Georgetown's holiday lighting team. From Norval to downtown Georgetown — we cover Halton Hills.",
    description:
      "Georgetown's beautiful homes deserve beautiful lighting. We bring premium materials, custom design, and our 5-star service to Halton Hills.",
    neighbourhoods: ["Downtown Georgetown", "Norval", "Stewarttown", "Limehouse"],
    metaTitle: "Christmas Light Installation Georgetown ON | We Install Christmas Lights",
    metaDescription:
      "Georgetown's premium Christmas light installer. Custom design, installed in 1 day, full-season maintenance. Free quote.",
    localFact: "Halton Hills' Christmas lighting team — covering Georgetown and Norval.",
  },
  {
    slug: "etobicoke",
    name: "Etobicoke",
    region: "ON",
    heroIntro:
      "Etobicoke's professional Christmas light installer. We bring the magic from London to the GTA.",
    description:
      "Whether it's a Kingsway estate, a Mimico bungalow, or a Humber Bay condo, our Etobicoke crew installs and maintains premium holiday lighting.",
    neighbourhoods: ["The Kingsway", "Mimico", "Humber Bay", "Etobicoke Centre", "Markland Wood"],
    metaTitle: "Christmas Light Installation Etobicoke | We Install Christmas Lights",
    metaDescription:
      "Etobicoke's professional Christmas light installer. Custom roofline designs, trees, hedges. Insured + 5-star reviewed. Free quote.",
    localFact: "Etobicoke's premium Christmas lighting choice from The Kingsway to the lakeshore.",
  },
  {
    slug: "burlington",
    name: "Burlington",
    region: "ON",
    heroIntro:
      "Burlington's Christmas light installation specialists. Premium displays for Halton's lakeside city.",
    description:
      "Burlington homes — from Roseland to Alton Village — get our full-service holiday lighting program: design, install, maintain, takedown, store.",
    neighbourhoods: ["Roseland", "Aldershot", "Tyandaga", "Millcroft", "Alton Village", "Headon Forest"],
    metaTitle: "Christmas Light Installation Burlington ON | We Install Christmas Lights",
    metaDescription:
      "Burlington's premier Christmas light installer. Custom design, 1-day installation, full-season program. Insured. Free quote.",
    localFact: "Burlington's go-to holiday lighting team — Halton's lakeside city covered.",
  },
  {
    slug: "hamilton",
    name: "Hamilton",
    region: "ON",
    heroIntro:
      "Hamilton's Christmas light installation team. From Westdale to Stoney Creek — we cover the city.",
    description:
      "Hamilton's historic homes and growing neighbourhoods deserve world-class holiday lighting. Our Hamilton crew handles it all.",
    neighbourhoods: ["Westdale", "Durand", "Ancaster", "Dundas", "Stoney Creek", "Waterdown"],
    metaTitle: "Christmas Light Installation Hamilton ON | We Install Christmas Lights",
    metaDescription:
      "Hamilton's premier Christmas light installer. Custom roofline designs, trees, hedges + takedown. 5-star rated. Free quote — call today.",
    localFact: "Hamilton's professional Christmas lighting team — Mountain, Durand, Dundas, Stoney Creek.",
  },
  {
    slug: "ingersoll",
    name: "Ingersoll",
    region: "ON",
    heroIntro:
      "Ingersoll's professional Christmas light installer. Premium displays for Oxford County.",
    description:
      "Ingersoll homes and businesses get the same premium full-service program our London customers love.",
    neighbourhoods: ["Downtown Ingersoll", "Centreville", "Beachville (nearby)"],
    metaTitle: "Christmas Light Installation Ingersoll ON | We Install Christmas Lights",
    metaDescription:
      "Ingersoll's professional Christmas light installer. Custom design, full-service program. Insured + 5-star rated. Free quote.",
    localFact: "Oxford County's Christmas lighting team — Ingersoll homes love us.",
  },
  {
    slug: "kitchener",
    name: "Kitchener",
    region: "ON",
    heroIntro:
      "Kitchener's professional holiday lighting installer. We light up Waterloo Region one home at a time.",
    description:
      "From Heritage neighbourhoods to Doon South new builds, Kitchener homes love our custom-cut roofline lighting and full-service program.",
    neighbourhoods: ["Stanley Park", "Forest Heights", "Country Hills", "Doon South", "Westmount", "Victoria Park"],
    metaTitle: "Christmas Light Installation Kitchener ON | We Install Christmas Lights",
    metaDescription:
      "Kitchener's professional Christmas light installer. Custom roofline designs, trees, hedges. Insured + 5-star reviewed. Free quote.",
    localFact: "Kitchener's professional Christmas lighting team — full-service in Waterloo Region.",
  },
  {
    slug: "brampton",
    name: "Brampton",
    region: "ON",
    heroIntro:
      "Brampton's professional Christmas light installer. Premium displays for Peel's biggest city.",
    description:
      "Brampton homeowners trust us for elegant custom roofline lighting designs, full-season maintenance, and stress-free takedown.",
    neighbourhoods: ["Heart Lake", "Bramalea", "Springdale", "Fletcher's Meadow", "Sandalwood", "Heritage Heights"],
    metaTitle: "Christmas Light Installation Brampton | We Install Christmas Lights",
    metaDescription:
      "Brampton's premium Christmas light installer. Custom roofline designs. Insured + 5-star reviewed. Free quote — call today.",
    localFact: "Brampton's professional Christmas lighting team — Peel's biggest city covered.",
  },
  {
    slug: "ancaster",
    name: "Ancaster",
    region: "ON",
    heroIntro:
      "Ancaster's premium Christmas light installation specialists. Sophisticated displays for Hamilton's most prestigious neighbourhood.",
    description:
      "Ancaster Village, Meadowlands, Governor's Road — our Ancaster crew delivers custom luxury holiday lighting to Hamilton's most discerning homeowners.",
    neighbourhoods: ["Ancaster Village", "Meadowlands", "Governor's Road", "Tiffany Hills", "University Gardens"],
    metaTitle: "Christmas Light Installation Ancaster | We Install Christmas Lights",
    metaDescription:
      "Ancaster's premium Christmas light installer. Custom luxury displays for Hamilton's most prestigious neighbourhood. Free quote.",
    localFact: "Hamilton's premium Christmas lighting team for Ancaster's finest properties.",
  },
  {
    slug: "london-surrounding-areas",
    name: "London Surrounding Areas",
    region: "ON",
    heroIntro:
      "Christmas light installation in the towns around London — Thorndale, Ilderton, Lucan, Komoka, and more.",
    description:
      "Live near London but not in the city? We service the entire London area — from Thorndale to Lucan, Komoka to Dorchester. Same premium program, same 1-day installs.",
    neighbourhoods: ["Thorndale", "Ilderton", "Lucan", "Komoka", "Mount Brydges", "Dorchester", "Belmont", "Arva"],
    metaTitle: "Christmas Light Installation London Surrounding Areas | We Install Christmas Lights",
    metaDescription:
      "Christmas light installation in the towns around London, Ontario. Thorndale, Ilderton, Lucan, Komoka & more. Full-service program. Free quote.",
    localFact: "We cover every town within 45 minutes of London — same premium service.",
  },
] as const;

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export type Industry = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  image?: string;
};

export const industries: Industry[] = [
  {
    slug: "christmas-decorators-for-banks",
    name: "Christmas Decorators for Banks",
    shortName: "Banks",
    tagline: "Holiday decorating for financial institutions",
    description:
      "Banks build long-term relationships with their clients. Reward your customers' loyalty with a beautiful in-branch holiday display that says thank you and welcome.",
    image: "/images/industry-bank.jpg",
  },
  {
    slug: "christmas-decorator-for-malls",
    name: "Christmas Decorator for Malls",
    shortName: "Malls",
    tagline: "Transform shopping centres into winter wonderlands",
    description:
      "Christmas is the biggest retail season. A spectacular mall holiday display lifts customer mood and increases dwell time — directly boosting sales.",
    image: "/images/industry-mall.jpg",
  },
  {
    slug: "christmas-decorators-for-casinos",
    name: "Christmas Decorators for Casinos",
    shortName: "Casinos",
    tagline: "Holiday magic for gaming and entertainment venues",
    description:
      "Make every guest feel like a winner this holiday season. Lavish casino holiday displays keep guests coming back through the festive months.",
    image: "/images/industry-casino.jpg",
  },
  {
    slug: "christmas-decorators-for-restaurants",
    name: "Christmas Decorators for Restaurants",
    shortName: "Restaurants",
    tagline: "Festive ambiance that fills your reservation book",
    description:
      "Office parties, family dinners, romantic evenings — your restaurant hosts every kind of holiday gathering. The right décor turns one visit into a tradition.",
    image: "/images/industry-restaurant.jpg",
  },
  {
    slug: "christmas-decorators-for-hoas",
    name: "Christmas Decorators for HOAs",
    shortName: "HOAs",
    tagline: "Cohesive community holiday lighting and décor",
    description:
      "Unified holiday decorating for HOA-managed communities. Streetlight pole décor, entrance features, clubhouse styling — coordinated and beautiful.",
    image: "/images/industry-hoa.jpg",
  },
  {
    slug: "christmas-decorators-for-churches",
    name: "Christmas Decorators for Churches",
    shortName: "Churches",
    tagline: "Beautiful seasonal décor for places of worship",
    description:
      "Sanctuary décor, exterior wreaths, tree installations, Advent displays — we bring warmth and reverence to your church's holiday season.",
    image: "/images/industry-church.jpg",
  },
  {
    slug: "christmas-decorators-for-municipalities",
    name: "Christmas Decorators for Municipalities",
    shortName: "Municipalities",
    tagline: "Streetscape lighting and downtown holiday décor",
    description:
      "Streetlight pole banners, downtown tree wraps, holiday arches, civic square installations — turnkey municipal holiday lighting programs.",
    image: "/images/industry-municipality.jpg",
  },
  {
    slug: "christmas-decorators-for-office-lobbies",
    name: "Christmas Decorators for Office Lobbies",
    shortName: "Office Lobbies",
    tagline: "Welcoming holiday displays for corporate spaces",
    description:
      "First impressions matter. A polished holiday lobby display warms up the corporate environment for employees, clients, and visitors.",
    image: "/images/industry-office.jpg",
  },
  {
    slug: "christmas-decorators-for-hotels",
    name: "Christmas Decorators for Hotels",
    shortName: "Hotels",
    tagline: "Memorable holiday décor for hospitality venues",
    description:
      "Hotel lobbies, restaurants, ballrooms — we deliver photo-worthy holiday displays that guests share on social and remember next year.",
    image: "/images/industry-hotel.jpg",
  },
  {
    slug: "christmas-decorators-for-special-events",
    name: "Christmas Decorators for Special Events",
    shortName: "Special Events",
    tagline: "Custom holiday décor for parties, galas, and corporate events",
    description:
      "From private holiday parties to corporate galas, we design and install custom event décor that wows guests and elevates your venue.",
    image: "/images/industry-event.jpg",
  },
  {
    slug: "christmas-decorators-for-production-sets",
    name: "Christmas Decorators for Production Sets",
    shortName: "Production Sets",
    tagline: "Authentic holiday décor for film and TV",
    description:
      "Movie sets, commercial shoots, TV productions — we deliver realistic, on-brand holiday décor on tight production schedules.",
    image: "/images/industry-production.jpg",
  },
  {
    slug: "christmas-decorators-for-retail",
    name: "Christmas Decorators for Retail",
    shortName: "Retail",
    tagline: "Storefront holiday displays that drive sales",
    description:
      "Holiday-decorated storefronts pull foot traffic off the street. We design, install, and maintain commercial retail holiday displays.",
    image: "/images/industry-retail.jpg",
  },
  {
    slug: "christmas-decorators-for-car-dealerships",
    name: "Christmas Decorators for Car Dealerships",
    shortName: "Car Dealerships",
    tagline: "Showroom and lot holiday lighting that sells cars",
    description:
      "Festive lot lighting and showroom décor that drives year-end traffic. Big bows, holiday displays, and seasonal signage included.",
    image: "/images/industry-dealership.jpg",
  },
] as const;

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
