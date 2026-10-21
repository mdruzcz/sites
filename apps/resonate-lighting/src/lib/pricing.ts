// ─────────────────────────────────────────────────────────────────────────────
// ALL PRICES ON THE SITE LIVE IN THIS ONE FILE.
// Edit a number here and every page (kits, pricing, budget planner, city pages,
// FAQ, JSON-LD offers) picks it up on the next deploy.
//
// Everything is CAD, "starting at", plus applicable taxes. Installation is
// always extra and is estimated from crew-days × the crew day rate, plus
// travel charges by zone (see `travel` below).
// ─────────────────────────────────────────────────────────────────────────────

export type PropType = "mega" | "roof" | "deciduous" | "evergreen" | "arch";
export type PackageSlug = "starter" | "business" | "plaza" | "municipal";
export type ZoneId = "home" | "prairies" | "national" | "east" | "north";
export type PackageDef = {
  slug: PackageSlug;
  name: string;
  fullName: string;
  price: number;
  priceLabel: string;
  contents: Record<PropType, number>;
};

export const pricing = {
  currency: "CAD",
  taxNote: "plus applicable taxes",

  /** Base of every kit: the controller box and everything that runs the show. */
  controlSystem: {
    label: "Control system",
    detail:
      "Raspberry Pi 5 Light Show engine with LedFx and the Light Show app, USB microphone, pixel controller, power supply and weatherproof enclosure, lifetime software access",
    price: 2900,
    crewDays: 0.5, // commissioning: Setup wizard, mic calibration, look check, handover
  },

  /** Unit prices for props and add-ons (used by the budget planner and for extras beyond a package). */
  props: {
    mega: {
      label: "Mega tree",
      plural: "Mega trees",
      detail: "Cone of 12 V WS2811 pixel strands on a centre pole with a star topper, sized to the site",
      price: 4000,
      crewDays: 1,
    },
    roof: {
      label: "Roofline run",
      plural: "Roofline runs",
      detail: "Eaves and peaks of one building frontage traced in pixels, up to about 30 m (100 ft)",
      price: 6400,
      crewDays: 1,
    },
    deciduous: {
      label: "Wrapped tree",
      plural: "Wrapped trees",
      detail: "Trunk and main branches of an existing deciduous tree wrapped in pixels",
      price: 3000,
      crewDays: 0.75,
    },
    evergreen: {
      label: "Evergreen spiral",
      plural: "Evergreen spirals",
      detail: "An evergreen wrapped bottom to top in a single spiral of pixels",
      price: 2400,
      crewDays: 0.5,
    },
    arch: {
      label: "Pixel arch",
      plural: "Pixel arches",
      detail: "Free-standing walk-through arch outlined in pixels",
      price: 1800,
      crewDays: 0.25,
    },
  } satisfies Record<PropType, { label: string; plural: string; detail: string; price: number; crewDays: number }>,

  /** Every kit includes one pixel controller. Larger layouts add one per this many props. */
  propsPerController: 6,
  extraController: {
    label: "Additional pixel controller",
    detail: "Extra pixel controller with power distribution for larger layouts",
    price: 2400,
    crewDays: 0.25,
  },

  /**
   * Packages: fixed "starting at" bundle prices. The budget planner prices any
   * layout that contains a package's props at the package price, plus extras at
   * unit prices, so a package is never dearer than its parts.
   */
  packages: [
    {
      slug: "starter",
      name: "Starter",
      fullName: "Starter Kit",
      price: 6900,
      priceLabel: "Starting at",
      contents: { mega: 1, roof: 0, deciduous: 0, evergreen: 0, arch: 0 },
    },
    {
      slug: "business",
      name: "Business",
      fullName: "Business Kit",
      price: 18500,
      priceLabel: "Starting at",
      contents: { mega: 1, roof: 1, deciduous: 2, evergreen: 0, arch: 0 },
    },
    {
      slug: "plaza",
      name: "Plaza / BIA",
      fullName: "Plaza / BIA Kit",
      price: 42000,
      priceLabel: "Starting at",
      contents: { mega: 2, roof: 3, deciduous: 4, evergreen: 0, arch: 2 },
    },
    {
      slug: "municipal",
      name: "Municipal",
      fullName: "Municipal Program",
      price: 95000,
      priceLabel: "From",
      contents: { mega: 4, roof: 6, deciduous: 8, evergreen: 6, arch: 6 },
    },
  ] as PackageDef[],

  installation: {
    /** One crew = two installers with tools and vehicle. */
    crewDayRate: 2600,
    crewLabel: "two-person crew",
    /** Estimates round crew-days up to this step, with this minimum. */
    roundTo: 0.5,
    minimumDays: 1,
    /** One crew mobilisation covers up to this many crew-days on site. */
    maxDaysPerTrip: 5,
    liftNote: "Lift or boom rental, permits and electrical work by others are billed at cost if needed.",
  },

  travel: {
    homeRegion: "Saskatchewan",
    /** Mileage inside the home region, beyond the free radius from our base. */
    homeMileagePerKm: 0.95,
    homeFreeRadiusKm: 150,
    /**
     * Zone-based travel. tripFee is charged per crew mobilisation; accommodation
     * (hotel and per diem for the crew) per crew-night on multi-day jobs outside
     * the home region. Nights = crew-days on site.
     */
    zones: {
      home: {
        name: "Home region",
        provinces: ["SK"],
        tripFee: 0,
        accommodationPerNight: 0,
        summary: "No trip fee. Mileage beyond 150 km of our base only.",
      },
      prairies: {
        name: "Zone 1 · Prairies",
        provinces: ["AB", "MB"],
        tripFee: 1200,
        accommodationPerNight: 450,
        summary: "Drive-in crews from Saskatchewan.",
      },
      national: {
        name: "Zone 2 · BC & Ontario",
        provinces: ["BC", "ON"],
        tripFee: 2800,
        accommodationPerNight: 520,
        summary: "Fly-in or long-haul crews with freight.",
      },
      east: {
        name: "Zone 3 · Québec & Atlantic",
        provinces: ["QC", "NB", "NS", "PE", "NL"],
        tripFee: 3600,
        accommodationPerNight: 560,
        summary: "Fly-in crews with freight.",
      },
      north: {
        name: "Zone 4 · North",
        provinces: ["YT", "NT", "NU"],
        tripFee: 5500,
        accommodationPerNight: 700,
        summary: "Quoted per project; figures are a starting point.",
      },
    } satisfies Record<ZoneId, { name: string; provinces: string[]; tripFee: number; accommodationPerNight: number; summary: string }>,
  },

  /** Budget planner slider range (all-in project budget before tax). */
  planner: {
    min: 5000,
    max: 250000,
    default: 25000,
    /** Most props of each type the planner will add automatically. */
    caps: { mega: 8, roof: 10, deciduous: 16, evergreen: 12, arch: 12 } satisfies Record<PropType, number>,
    /** Order in which the planner adds extras on top of a package as the budget grows. */
    recipe: ["roof", "deciduous", "deciduous", "evergreen", "evergreen", "mega", "arch", "arch"] as PropType[],
  },
};

export const PROVINCES: { code: string; name: string }[] = [
  { code: "SK", name: "Saskatchewan" },
  { code: "AB", name: "Alberta" },
  { code: "MB", name: "Manitoba" },
  { code: "BC", name: "British Columbia" },
  { code: "ON", name: "Ontario" },
  { code: "QC", name: "Québec" },
  { code: "NB", name: "New Brunswick" },
  { code: "NS", name: "Nova Scotia" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "YT", name: "Yukon" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
];

export const PROP_TYPES: PropType[] = ["mega", "roof", "deciduous", "evergreen", "arch"];

export function zoneForProvince(code: string): ZoneId {
  for (const [id, z] of Object.entries(pricing.travel.zones)) {
    if (z.provinces.includes(code)) return id as ZoneId;
  }
  return "national";
}

export function getPackage(slug: string) {
  return pricing.packages.find((p) => p.slug === slug);
}

export const formatCad = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(Math.round(n));
