export const site = {
  name: "Celebrate Lighting",
  tagline: "Permanent Outdoor LED Lighting in Ontario",
  phone: "519-266-6796",
  phoneHref: "tel:+15192666796",
  email: "contact@celebratelighting.ca",
  emailHref: "mailto:contact@celebratelighting.ca",
  address: {
    street: "631 Peel Street",
    city: "Woodstock",
    region: "ON",
    postal: "N4S 1K1",
    country: "CA",
  },
  addressLine: "631 Peel Street, Woodstock, ON",
  hours: "Mon–Fri 8 AM–8 PM · Sat 9 AM–6 PM · Sun 10 AM–4 PM",
  hoursDetailed: [
    { day: "Monday – Friday", hours: "8:00 AM – 8:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 6:00 PM" },
    { day: "Sunday", hours: "10:00 AM – 4:00 PM" },
  ],
  serviceAreas: [
    "St. Thomas",
    "London",
    "Stratford",
    "Brantford",
    "Tillsonburg",
    "Waterloo",
    "Guelph",
    "Woodstock",
  ],
  url: "https://celebratelighting.ca",
  instagram: "https://www.instagram.com/celebratelighting/",
  responseTime: "24 hours",
  yearsExperience: 5,
  warrantyYears: 25,

  /* ---------------------------------------------------------------
     The offer. This is the one thing competitors don't do, so it is
     the site's spine — every CTA, every headline, every schema block
     points back to it. Change the wording here and it changes
     everywhere, so the promise can never drift page to page.
     --------------------------------------------------------------- */
  demo: {
    /* Short button label — must fit a mobile pill */
    cta: "Book My Free Demo",
    ctaLong: "Book My Free On-Site Demo",
    /* One-line promise, used in bars and eyebrows */
    promise: "See it lit up on your own home — before you pay a cent.",
    /* Full explanation, used in hero sub, FAQ, closing CTA */
    detail:
      "We come to you, measure your rooflines, colour-match your soffit, and mount a live sample section right on your house so you can see exactly how it looks — lit up, at night, on your home. Not a render. Not a catalogue photo. Then you decide.",
    /* Used wherever we need the differentiator in a few words */
    short: "Free on-site demo",
  },

  /* ---------------------------------------------------------------
     The seasonal line's offer. Deliberately NOT the demo — you can't
     meaningfully demo a C9 roofline the way you can a permanent track,
     and seasonal buying is deadline-driven, so this leans on booking
     early instead. Keep "demo" language exclusive to permanent so the
     two offers never blur together.
     --------------------------------------------------------------- */
  seasonal: {
    cta: "Get My Seasonal Quote",
    ctaLong: "Get My Early-Bird Seasonal Quote",
    promise: "Book early, lock your price, and get first pick of install dates.",
    detail:
      "Our install calendar fills from the outside in — the earliest bookings get the best dates and the season's lowest pricing. Reserve now and your price is locked before the fall rush, with your install slot held for you.",
    short: "Early-bird booking",
    /* UPDATE EACH YEAR. Drives the urgency copy on the seasonal pages. */
    deadline: "September 30",
    installWindow: "October and November",
    takedownWindow: "January",
    /* Optional. Leave empty and the copy still reads correctly — do NOT
       put a number here unless it's a real, honoured discount. */
    discountNote: "",
  },

  trustBadges: [
    { label: "Licensed & Insured", value: "Fully Certified" },
    { label: "Lifetime Warranty", value: "All Installations" },
    { label: "LED Lifespan", value: "50,000+ Hours" },
    { label: "Service Area", value: "SW Ontario" },
  ],

  /* Verifiable proof points only — no invented review counts or
     unearned certifications. Every claim here is one the business
     can stand behind in writing. */
  proofPoints: [
    { stat: "Lifetime", label: "Warranty on parts, hardware & workmanship" },
    { stat: "−40°C", label: "Cold-rated, IP67 sealed for Ontario winters" },
    { stat: "1–2 days", label: "Typical install, start to lights-on" },
    { stat: "24 hrs", label: "Response time on every demo request" },
  ],
} as const;
