/**
 * Single source of truth for business facts.
 *
 * TODO (Matt): confirm the phone number below before launch — it is carried
 * over from the Master Decker main line. Swap it if Off Season Rentals runs
 * its own number.
 */
export const site = {
  name: "Off Season Rentals",
  shortName: "Off Season Rentals",
  tagline: "Furnished Port Stanley cottages by the month — September to May",
  phone: "519-266-6796",
  phoneHref: "tel:+15192666796",
  email: "service@masterdecker.com",
  emailHref: "mailto:service@masterdecker.com",
  url: "https://offseasonrentals.ca",

  address: {
    city: "Port Stanley",
    region: "ON",
    country: "CA",
    postalCode: "N5L"
  },
  addressLine: "Port Stanley, Ontario",
  geo: { latitude: 42.6642, longitude: -81.2151 },

  hours: "Mon–Fri 8 AM–7 PM · Weekends by appointment",
  responseTime: "1 business day",

  /**
   * The off season is the whole product. In Ontario cottage country that is
   * Labour Day to Victoria Day — the months these places would otherwise sit
   * dark, heated and empty.
   */
  season: {
    label: "September – May",
    startsLabel: "Labour Day",
    endsLabel: "Victoria Day",
    startMonth: 9,
    endMonth: 5,
    shortStay: "30 nights",
    blurb:
      "Every home on this site is a summer rental the rest of the year. From Labour Day to Victoria Day the rates drop, the minimum stay becomes a month, and the village belongs to the people who actually live in it."
  },

  /** The offer. Every CTA on the site points back to one of these two. */
  cta: {
    renter: "Check availability",
    renterLong: "Check off-season availability",
    owner: "List your property",
    ownerLong: "Want to list your property?"
  },

  /** What an owner gets — used on the list-your-property page and in schema. */
  ownerPromise: {
    headline: "Your cottage earns nine months a year instead of three",
    points: [
      "We market the shoulder and winter months you are not selling anyway",
      "Longer stays: one tenant for a month or a season, not fifty turnovers",
      "Guests screened, agreements signed, deposits held",
      "You keep your summer calendar — we only touch the off season"
    ]
  },

  /** Nearby anchors that make Port Stanley worth a winter lease. */
  nearby: [
    { name: "St. Thomas", minutes: 15 },
    { name: "London", minutes: 35 },
    { name: "Aylmer", minutes: 30 },
    { name: "Highway 401", minutes: 20 }
  ],

  social: {} as Record<string, string>
} as const;

export type Site = typeof site;
