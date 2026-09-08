export const site = {
  name: "London Retaining Walls",
  legalName: "London Retaining Walls",
  tagline: "Retaining walls built for Ontario clay, frost and slopes",
  phone: "519-914-1908",
  phoneHref: "tel:+15199141908",
  email: "info@londonretainingwalls.ca",
  url: "https://londonretainingwalls.ca",
  owner: "Kyle",
  yearsLabel: "8+",
  hours: "Monday to Saturday, 7 AM to 6 PM",
  openingHours: "Mo-Sa 07:00-18:00",
  address: { city: "London", region: "ON", country: "CA" },
  geo: { lat: 42.9849, lng: -81.2453 },
  umamiId: "0a0ce21b-74ac-4591-9872-c26015c09df8",
  services: [
    { slug: "retaining-wall-installation", name: "Retaining Wall Installation", short: "Installation" },
    { slug: "block-retaining-walls", name: "Block Retaining Walls", short: "Block" },
    { slug: "concrete-retaining-walls", name: "Concrete Retaining Walls", short: "Concrete" },
    { slug: "wood-and-timber-retaining-walls", name: "Wood & Timber Retaining Walls", short: "Timber" },
    { slug: "natural-stone-retaining-walls", name: "Natural Stone & Armour Stone Walls", short: "Stone" },
    { slug: "terraced-retaining-walls", name: "Terraced & Tiered Retaining Walls", short: "Terracing" },
    { slug: "retaining-wall-repair", name: "Retaining Wall Repair", short: "Repair" },
  ],
  cities: [
    { slug: "london", name: "London", route: "london-retaining-wall-contractor", primary: true },
    { slug: "st-thomas", name: "St. Thomas", route: "st-thomas-retaining-wall-contractor", primary: true },
    { slug: "woodstock", name: "Woodstock", route: "woodstock-retaining-wall-contractor", primary: true },
    { slug: "strathroy", name: "Strathroy", route: "strathroy-retaining-wall-contractor", primary: true },
    { slug: "dorchester", name: "Dorchester", route: "dorchester-retaining-wall-contractor", primary: false },
    { slug: "aylmer", name: "Aylmer", route: "aylmer-retaining-wall-contractor", primary: false },
    { slug: "ilderton", name: "Ilderton", route: "ilderton-retaining-wall-contractor", primary: false },
    { slug: "komoka", name: "Komoka", route: "komoka-retaining-wall-contractor", primary: false },
    { slug: "mount-brydges", name: "Mount Brydges", route: "mount-brydges-retaining-wall-contractor", primary: false },
    { slug: "lucan", name: "Lucan", route: "lucan-retaining-wall-contractor", primary: false },
    { slug: "delaware", name: "Delaware", route: "delaware-retaining-wall-contractor", primary: false },
    { slug: "brantford", name: "Brantford", route: "brantford-retaining-wall-contractor", primary: false },
  ],
  testimonials: [
    { quote: "No other landscape contractor wanted to repair our retaining wall in Byron. This company stepped up and rebuilt our leaning wood retaining wall in three days. I recommend them.", name: "Sandra R.", place: "Byron, London" },
  ],
};

export type SiteService = (typeof site.services)[number];
export type SiteCity = (typeof site.cities)[number];
export const BRAND_SUFFIX = " | London Retaining Walls";
/** Append the brand only when the result stays within 60 characters. */
export const withBrand = (t: string) => (t.includes("London Retaining Walls") ? t : t.length + BRAND_SUFFIX.length <= 60 ? t + BRAND_SUFFIX : t);
