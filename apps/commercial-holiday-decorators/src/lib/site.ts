export const site = {
  name: "Commercial Holiday Decorators",
  shortName: "CHD",
  tagline: "Commercial holiday decorating, lighting and lobby trees across Ontario",
  description:
    "Turnkey commercial holiday decorating for hotels, condo and apartment lobbies, plazas and malls, offices, property managers and municipalities across Ontario. Design, install, maintain, remove and store. Insured, WSIB-compliant crews.",
  phone: "519-266-6796",
  phoneHref: "tel:+15192666796",
  address: {
    street: "300 Marconi Gate #1002",
    city: "London",
    region: "ON",
    postal: "N5V 4T2",
    country: "CA",
  },
  addressLine: "300 Marconi Gate #1002, London, ON N5V 4T2",
  geo: { lat: 43.0193, lng: -81.1844 },
  hours: "Mon–Fri 8 AM–6 PM · extended hours October to January",
  hoursShort: "Mon–Fri 8–6",
  hoursDetailed: [
    { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 4:00 PM (season)" },
    { day: "Sunday", hours: "By appointment" },
  ],
  url: "https://commercialholidaydecorators.ca",
  domain: "commercialholidaydecorators.ca",
  since: 2016,
  responseTime: "one business day",
  regionLabel: "Southwestern Ontario, the GTA and Hamilton-Niagara",
  sisterBrand: { name: "We Install Christmas Lights", url: "https://weinstallchristmaslights.ca" },
  socials: {
    facebook: "https://www.facebook.com/weinstallchristmaslights/",
    instagram: "https://www.instagram.com/weinstallchristmaslights",
    youtube: "https://www.youtube.com/@weinstallchristmaslights",
  },

  /* Season banner. Update each year. */
  bookingBanner: "Now booking 2026 holiday programs",
  bannerDetail: "Site visits through October. Installs run October to late November.",

  quote: {
    cta: "Request a Quote",
    ctaLong: "Request a Commercial Quote",
    promise: "A site visit, a design and a fixed seasonal price. No obligation.",
    detail:
      "Send the form or call. We reply within one business day, walk the property (or work from plans and photos), and come back with a marked-up design, a fixed price for the season, and an optional multi-year rate.",
    short: "Free site visit & quote",
  },

  trustBar: [
    { icon: "shield", title: "Insured & WSIB-compliant", body: "Certificates on request. Lift-trained crews, traffic plans, after-hours access." },
    { icon: "clock", title: "Overnight installs", body: "Lobbies, storefronts and lots are decorated while they're empty." },
    { icon: "wrench", title: "Maintenance included", body: "Any fault fixed all season at no charge. Timers and photocells set by us." },
    { icon: "box", title: "Takedown & storage", body: "January removal, labelled storage, priority dates next year." },
  ],

  stats: [
    { stat: "2016", label: "Decorating Ontario properties since" },
    { stat: "24 hrs", label: "Response on every request" },
    { stat: "100%", label: "Our own inventory, fully warrantied" },
    { stat: "Jan", label: "Takedown and storage included" },
  ],

  nav: {
    sectors: [
      { label: "Hotels & Hospitality", href: "/hotels-hospitality", desc: "Lobbies, atriums, porte-cochères" },
      { label: "Condo & Apartment Lobbies", href: "/condo-apartment-lobbies", desc: "Boards, property managers, portfolios" },
      { label: "Plazas & Shopping Centres", href: "/plazas-malls", desc: "Giant trees, lot lighting, Santa sets" },
      { label: "Office Buildings", href: "/office-buildings", desc: "Lobby trees, atriums, entrances" },
      { label: "Property Managers & REITs", href: "/property-management", desc: "One contact, one invoice, many sites" },
      { label: "Restaurants, Retail & Dealerships", href: "/restaurants-retail", desc: "Storefronts, patios, windows" },
      { label: "Municipalities & BIAs", href: "/municipalities-bias", desc: "Street trees, town squares, light shows" },
    ],
    main: [
      { label: "Gallery", href: "/gallery" },
      { label: "Service Areas", href: "/service-areas" },
      { label: "Guides", href: "/guides" },
      { label: "About", href: "/about" },
    ],
  },
} as const;

export const SECTOR_SLUGS = [
  "hotels-hospitality",
  "condo-apartment-lobbies",
  "plazas-malls",
  "office-buildings",
  "property-management",
  "restaurants-retail",
  "municipalities-bias",
] as const;
