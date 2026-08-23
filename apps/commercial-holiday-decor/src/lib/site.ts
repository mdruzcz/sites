/**
 * Single source of truth for business facts.
 *
 * TODO (Matt): confirm the phone number and mailing address below. They were
 * carried over from the Celebrate Lighting record because this is the same
 * operation; replace them if Commercial Holiday Decor uses a different line.
 */
export const site = {
  name: "Commercial Holiday Decor",
  shortName: "CHD",
  tagline: "Commercial Christmas Decor & Installation for Southwestern Ontario",
  phone: "519-266-6796",
  phoneHref: "tel:+15192666796",
  email: "service@masterdecker.com",
  emailHref: "mailto:service@masterdecker.com",
  url: "https://commercialholidaydecor.ca",

  address: {
    city: "London",
    region: "ON",
    country: "CA"
  },
  addressLine: "London, Ontario",

  hours: "Mon–Fri 8 AM–6 PM · Peak season 7 days",
  responseTime: "1 business day",

  /** Booking reality — commercial installs are scheduled well ahead of the season. */
  season: {
    bookingOpens: "June",
    installWindow: "September through late November",
    takedownWindow: "January"
  },

  /** The offer. Every CTA points back to this. */
  quote: {
    cta: "Request a Quote",
    ctaLong: "Request a Commercial Quote",
    promise: "Priced per property, not per catalogue page.",
    detail:
      "Send us the property and what you want lit. We come back with a line-item quote covering the decor, the install, the seasonal maintenance and the January takedown — one number, one contractor, one invoice."
  },

  /** Southwestern Ontario service area. */
  serviceAreas: [
    "London",
    "Kitchener-Waterloo",
    "Windsor",
    "Sarnia",
    "Chatham",
    "Woodstock",
    "Stratford",
    "St. Thomas",
    "Brantford",
    "Cambridge",
    "Guelph",
    "Tillsonburg"
  ]
} as const;

export type Site = typeof site;
