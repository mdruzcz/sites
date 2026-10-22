export const site = {
  name: "Celebrate Lighting",
  tagline: "Permanent Outdoor LED Lighting in Southwestern Ontario",
  phone: "519-266-6796",
  phoneHref: "tel:+15192666796",
  smsHref: "sms:+15192666796",
  address: {
    street: "631 Peel Street",
    city: "Woodstock",
    region: "ON",
    postal: "N4S 1K1",
    country: "CA",
  },
  addressLine: "631 Peel Street, Woodstock, ON",
  geo: { lat: 43.1304, lng: -80.7467 },
  hours: "Mon–Fri 8 AM–8 PM · Sat 9 AM–6 PM · Sun 10 AM–4 PM",
  hoursShort: "Mon–Fri 8–8 · Sat 9–6 · Sun 10–4",
  hoursDetailed: [
    { day: "Monday – Friday", hours: "8:00 AM – 8:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 6:00 PM" },
    { day: "Sunday", hours: "10:00 AM – 4:00 PM" },
  ],
  /* Headline cities for schema + footer. The full 16-city list with
     local content lives in src/content/cities.json. */
  serviceAreas: [
    "Woodstock",
    "London",
    "Kitchener",
    "Waterloo",
    "Cambridge",
    "Guelph",
    "Brantford",
    "Stratford",
    "St. Thomas",
    "Tillsonburg",
    "Ingersoll",
    "Paris",
    "St. Marys",
    "Strathroy",
    "Simcoe",
    "Norwich",
  ],
  regionLabel: "Southwestern Ontario",
  url: "https://celebratelighting.ca",
  instagram: "https://www.instagram.com/celebratelighting/",
  responseTime: "24 hours",
  yearsExperience: 5,

  /* Season banner — update each year. */
  bookingBanner: "Now booking fall 2026 installs",

  /* ---------------------------------------------------------------
     The permanent-line offer. Every CTA, H1 and FAQ points back to
     it, so the promise can never drift page to page.
     --------------------------------------------------------------- */
  demo: {
    cta: "Book a Free Demo",
    ctaLong: "Book My Free On-Site Demo",
    promise: "See it lit up on your own home before you pay a cent.",
    detail:
      "We come to you, measure your rooflines, colour-match your soffit, and mount a live sample section right on your house so you can see exactly how it looks, lit up, at night, on your home. Not a render. Not a catalogue photo. Then you decide.",
    short: "Free on-site demo",
  },

  /* ---------------------------------------------------------------
     The seasonal line's offer: deadline-driven, never a "demo".
     --------------------------------------------------------------- */
  seasonal: {
    cta: "Get a Seasonal Quote",
    ctaLong: "Get My Early-Bird Seasonal Quote",
    promise: "Book early, lock your price, and get first pick of install dates.",
    detail:
      "Our install calendar fills from the outside in. The earliest bookings get the best dates and the season's lowest pricing. Reserve now and your price is locked before the fall rush, with your install slot held for you.",
    short: "Early-bird booking",
    deadline: "September 30",
    installWindow: "October and November",
    takedownWindow: "January",
    discountNote: "",
  },

  /* ---------------------------------------------------------------
     Free AI Home Preview — the popup offer. A visitor uploads a photo
     of their house and gets back a preview of it with permanent
     lighting. Turnaround is a promise, so keep it honest.
     --------------------------------------------------------------- */
  aiPreview: {
    cta: "Get My Free AI Preview",
    ctaShort: "Free AI Preview",
    title: "See Your Home Lit Up, Free",
    promise: "Upload one photo of your house. We send back a preview of it with permanent lighting.",
    turnaround: "within 1 business day",
    detail:
      "Snap a photo of the front of your home from the street, upload it here, and our team will email you an AI-generated preview showing how permanent roofline lighting would look on your actual house. Free, no obligation, and a great first step before booking your on-site demo.",
    href: "/ai-preview",
  },

  trustBadges: [
    { label: "Licensed & Insured", value: "Fully Certified" },
    { label: "Lifetime Warranty", value: "All Installations" },
    { label: "LED Lifespan", value: "50,000+ Hours" },
    { label: "Service Area", value: "SW Ontario" },
  ],

  proofPoints: [
    { stat: "Lifetime", label: "Warranty on parts, hardware & workmanship" },
    { stat: "−40°C", label: "Cold-rated, IP67 sealed for Ontario winters" },
    { stat: "1–2 days", label: "Typical install, start to lights-on" },
    { stat: "24 hrs", label: "Response time on every request" },
  ],

  nav: {
    services: [
      { label: "Permanent Lighting", href: "/permanent-lighting", desc: "Colour-matched LED track, installed once" },
      { label: "Seasonal C9 Christmas Lights", href: "/seasonal-lighting", desc: "Classic big-bulb look, hung and taken down for you" },
      { label: "Commercial Lighting", href: "/commercial", desc: "Storefronts, plazas, churches, municipal" },
      { label: "Repairs & Maintenance", href: "/services", desc: "Service for any permanent system" },
    ],
    main: [
      { label: "Service Area", href: "/service-areas" },
      { label: "Gallery", href: "/gallery" },
      { label: "Occasions", href: "/occasions" },
      { label: "Guides", href: "/guides" },
      { label: "FAQ", href: "/faq" },
      { label: "About", href: "/about" },
    ],
  },
} as const;
