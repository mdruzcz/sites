import cities from "@/content/cities.json";

export const site = {
  name: "Resonate Lighting",
  shortName: "Resonate",
  legalName: "Resonate Lighting",
  phone: "519-878-6735",
  phoneHref: "tel:+15198786735",
  email: "service@masterdecker.com",
  emailHref: "mailto:service@masterdecker.com",
  address: {
    region: "SK",
    country: "CA",
  },
  homeRegion: "Saskatchewan",
  addressLine: "Based in Saskatchewan · Installing across Canada",
  hours: "Mon – Fri · 9 AM – 7 PM | Sat · 10 AM – 4 PM",
  url: "https://resonatelighting.com",
  domain: "resonatelighting.com",
  tagline: "Lighting that listens.",
  description:
    "Resonate Lighting supplies and installs music-reactive pixel lighting kits for commercial spaces, BIAs and municipalities across Canada: a Raspberry Pi 5 Light Show engine with USB microphone, pixel controller and 12 V WS2811 mega trees, rooflines, wrapped trees and arches, with lifetime access to the software that runs them.",
  currency: "CAD",
  responseTime: "24 hours",
  serviceAreas: cities.map((c) => c.name),
  markets: [
    "Commercial spaces",
    "Retail plazas",
    "Restaurants & patios",
    "Business Improvement Areas (BIAs)",
    "Municipalities",
    "Event venues",
    "Property managers",
  ],
  socials: {} as Record<string, string>,
} as const;
