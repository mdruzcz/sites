export type CityConfig = {
  slug: string; // URL slug → /cabinets-{slug}
  name: string;
  region: string;
  pathLabel: string; // e.g. "Cabinets in London Ontario"
  metaTitle: string;
  metaDescription: string;
  blurb: string;
  // 1-paragraph "why people in this city renovate / buy cabinets"
  context: string;
  // 2-3 specific neighborhoods or landmarks for local color
  neighborhoods: string[];
  // Drive time / distance to our shipping origin (London ON)
  shippingNote: string;
  geo?: { lat: number; lng: number };
  // Whether $500 free local shipping applies (always true for these 6)
  freeLocalShipping: boolean;
};

export const CITIES: CityConfig[] = [
  {
    slug: "london-ontario",
    name: "London",
    region: "Middlesex County",
    pathLabel: "London, Ontario",
    metaTitle: "Kitchen Cabinets in London, Ontario — White Shaker, Free Local Shipping",
    metaDescription:
      "Premium White Shaker kitchen cabinets delivered free across London ON on orders over $500. Plywood box, painted birch & MDF doors, 36″ wall cabinets. 2–3 week lead time.",
    blurb: "We're based here. Same-week delivery on in-stock items.",
    context:
      "London is our home base. Whether you're renovating a Victorian in Old North, finishing a basement suite in Byron, or filling a gap in a new build out near Hyde Park, we can usually get your cabinets to your door within 7–10 days of confirming the order.",
    neighborhoods: ["Old North", "Byron", "Hyde Park", "Wortley Village", "Masonville", "Sunningdale"],
    shippingNote: "Same-week delivery for orders confirmed by Tuesday.",
    geo: { lat: 42.9849, lng: -81.2453 },
    freeLocalShipping: true,
  },
  {
    slug: "brantford",
    name: "Brantford",
    region: "Brant County",
    pathLabel: "Brantford, Ontario",
    metaTitle: "Kitchen Cabinets in Brantford, Ontario — White Shaker, Free Local Shipping",
    metaDescription:
      "White Shaker kitchen cabinets delivered to Brantford ON. Free local shipping over $500. Plywood box, painted birch & MDF doors, 36″ wall cabinets standard. 2–3 weeks.",
    blurb: "Direct delivery from London on Wednesdays.",
    context:
      "Brantford is full of older homes with kitchens that haven't been touched in decades — small footprints, awkward layouts, a missing pantry. We ship a lot of one-cabinet orders here for homeowners patching their existing kitchen and contractors handling Telephone City flips.",
    neighborhoods: ["West Brant", "Mayfair", "Echo Place", "Lansdowne", "Brier Park", "Holmedale"],
    shippingNote: "Weekly truck from London. Order by Monday, deliver Wednesday.",
    geo: { lat: 43.1394, lng: -80.2644 },
    freeLocalShipping: true,
  },
  {
    slug: "st-thomas",
    name: "St. Thomas",
    region: "Elgin County",
    pathLabel: "St. Thomas, Ontario",
    metaTitle: "Kitchen Cabinets in St. Thomas, Ontario — White Shaker, Free Local Shipping",
    metaDescription:
      "White Shaker kitchen cabinets shipped to St. Thomas ON. Free local delivery on orders over $500. Plywood box, painted birch & MDF doors, 36″ wall cabinets.",
    blurb: "Just 25 minutes south of our London base.",
    context:
      "St. Thomas is one of our fastest delivery destinations — we run trucks down Highway 4 most weeks. Lots of growth around the new Volkswagen plant has homeowners updating older kitchens and builders sourcing for spec homes. We're happy to quote big or small.",
    neighborhoods: ["Lake Margaret", "Pinafore Park", "Locke's Estates", "Downtown", "Centennial"],
    shippingNote: "Free delivery on orders over $500. 25-minute drive from London warehouse.",
    geo: { lat: 42.7752, lng: -81.1762 },
    freeLocalShipping: true,
  },
  {
    slug: "woodstock",
    name: "Woodstock",
    region: "Oxford County",
    pathLabel: "Woodstock, Ontario",
    metaTitle: "Kitchen Cabinets in Woodstock, Ontario — White Shaker, Free Local Shipping",
    metaDescription:
      "White Shaker kitchen cabinets delivered to Woodstock ON. Free local shipping over $500. Plywood box, painted birch & MDF doors, 36″ wall cabinets. 2–3 week lead time.",
    blurb: "Direct 401 route from London — 40 minutes.",
    context:
      "Woodstock sits in the middle of our service area. Direct 401 route from our London warehouse keeps freight cheap, and we deliver enough Oxford County orders to run a weekly truck. Popular with the Toyota Motor Manufacturing crowd renovating older Oxford homes.",
    neighborhoods: ["Pittock", "Old North", "Sally Creek", "Northcrest", "Eastern Heights"],
    shippingNote: "Weekly truck. Direct 401 route from London — 40 minutes.",
    geo: { lat: 43.1310, lng: -80.7466 },
    freeLocalShipping: true,
  },
  {
    slug: "hamilton",
    name: "Hamilton",
    region: "Greater Hamilton",
    pathLabel: "Hamilton, Ontario",
    metaTitle: "Kitchen Cabinets in Hamilton, Ontario — White Shaker, Free Local Shipping",
    metaDescription:
      "White Shaker kitchen cabinets delivered across Hamilton ON. Free local shipping over $500. Plywood box, painted birch & MDF doors, 36″ wall cabinets standard.",
    blurb: "Bi-weekly delivery routes through Hamilton + Ancaster + Dundas.",
    context:
      "Hamilton's renovation market is hot — century homes downtown, mid-century bungalows on the Mountain, infill builds in Stoney Creek. We deliver weekly to the entire Greater Hamilton Area, including Ancaster, Dundas, Waterdown, and Stoney Creek. Lots of contractors source from us here.",
    neighborhoods: ["Westdale", "Ancaster", "Dundas", "Stoney Creek", "Waterdown", "Locke Street", "Durand"],
    shippingNote: "Weekly delivery to all of Hamilton + surrounding communities.",
    geo: { lat: 43.2557, lng: -79.8711 },
    freeLocalShipping: true,
  },
  {
    slug: "kitchener-waterloo",
    name: "Kitchener-Waterloo",
    region: "Region of Waterloo",
    pathLabel: "Kitchener-Waterloo, Ontario",
    metaTitle: "Kitchen Cabinets in Kitchener-Waterloo, Ontario — White Shaker, Free Local Shipping",
    metaDescription:
      "White Shaker kitchen cabinets delivered across Kitchener-Waterloo. Free local shipping over $500. Plywood box, painted birch & MDF doors, 36″ wall cabinets standard.",
    blurb: "Direct delivery routes 2× per week to KW + Cambridge + Guelph.",
    context:
      "KW is one of our largest service areas. We run dedicated weekly routes through Kitchener, Waterloo, Cambridge and Guelph — so freight is fast and cheap. Popular with the tech-corridor crowd renovating Westmount-era homes and the student-rental investors upgrading kitchens in Lakeshore and University Heights.",
    neighborhoods: ["Westmount", "Lakeshore", "Beechwood", "Uptown Waterloo", "Belmont Village", "Stanley Park", "Doon"],
    shippingNote: "Twice-weekly delivery — order Monday or Wednesday, deliver Thursday or Friday.",
    geo: { lat: 43.4516, lng: -80.4925 },
    freeLocalShipping: true,
  },
];

export function getCityBySlug(slug: string): CityConfig | undefined {
  return CITIES.find((c) => c.slug === slug);
}
