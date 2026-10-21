// ─────────────────────────────────────────────────────────────────────────────
// ALL SHOW PLANNER PRICES LIVE IN THIS ONE FILE.
// CAD, "starting at", plus applicable taxes. Installation and travel are
// estimated separately and itemised (never shown as time on the site).
// Edit a number here and the budget planner picks it up on the next deploy.
// ─────────────────────────────────────────────────────────────────────────────

export type PropType = "stage" | "flake" | "mega" | "singing" | "cane" | "arch";
export type RegionId = "home" | "central" | "far";

type Unit = { label: string; plural: string; detail: string; price: number; crewDays: number };

export const pricing = {
  currency: "CAD",
  taxNote: "plus applicable taxes",

  /** Every show starts here. */
  controlSystem: {
    label: "Show control system",
    detail: "Show player and pixel controllers, FM transmitter for drive-up audio, power supplies, weatherproof enclosures, and sequencing of your first songs",
    price: 6900,
    crewDays: 0.5,
  },

  props: {
    stage: {
      label: "Stage outline",
      plural: "Stage outlines",
      detail: "Your stage or building's gable and eave traced in pixels, with pixel verticals on the columns",
      price: 6400,
      crewDays: 1,
    },
    flake: {
      label: "Pixel snowflake",
      plural: "Pixel snowflakes",
      detail: "Six-arm pixel snowflake for the stage gable or facade",
      price: 900,
      crewDays: 0.15,
    },
    mega: {
      label: "Mega tree",
      plural: "Mega trees",
      detail: "Cone of pixel strands on a centre pole with a pixel star, flanking the stage",
      price: 11600,
      crewDays: 1,
    },
    singing: {
      label: "Singing tree",
      plural: "Singing trees",
      detail: "Flat pixel tree with a face that sings along with the soundtrack",
      price: 3600,
      crewDays: 0.4,
    },
    cane: {
      label: "Pixel candy cane",
      plural: "Pixel candy canes",
      detail: "Candy cane outlined in pixels, lining the front of the stage",
      price: 750,
      crewDays: 0.15,
    },
    arch: {
      label: "Pixel arch",
      plural: "Pixel arches",
      detail: "Walk-through arch outlined in pixels, between the crowd and the stage",
      price: 2750,
      crewDays: 0.25,
    },
  } satisfies Record<PropType, Unit>,

  installation: {
    crewDayRate: 2600,
    crewLabel: "two-person crew",
    roundTo: 0.5,
    minimumDays: 1,
    maxDaysPerTrip: 5,
    note: "Lift rental, permits and electrical work by others are billed at cost if needed.",
  },

  travel: {
    homeRegion: "Southwestern Ontario",
    regions: {
      home: { name: "Southwestern Ontario", areas: "Chatham-Kent, Windsor-Essex, Sarnia-Lambton, London, Elgin, Oxford", tripFee: 0, accommodationPerNight: 0 },
      central: { name: "Central Ontario", areas: "Hamilton, Niagara, Kitchener-Waterloo, Guelph, the GTA, Barrie", tripFee: 650, accommodationPerNight: 420 },
      far: { name: "Eastern & Northern Ontario", areas: "Ottawa, Kingston, Peterborough, Muskoka, Northern Ontario", tripFee: 1800, accommodationPerNight: 480 },
    } satisfies Record<RegionId, { name: string; areas: string; tripFee: number; accommodationPerNight: number }>,
  },

  planner: {
    min: 5000,
    max: 250000,
    default: 45000,
    caps: { stage: 1, flake: 7, mega: 6, singing: 6, cane: 8, arch: 4 } satisfies Record<PropType, number>,
    /** Props are added in this order as the budget grows (pairs keep the stage symmetric). */
    recipe: [
      ["stage", 1],
      ["flake", 3],
      ["cane", 2],
      ["singing", 2],
      ["mega", 2],
      ["flake", 2],
      ["cane", 2],
      ["arch", 2],
      ["flake", 2],
      ["singing", 2],
      ["mega", 2],
      ["cane", 4],
      ["arch", 2],
      ["singing", 2],
      ["mega", 2],
    ] as [PropType, number][],
  },

  /** Quick picks in the planner. "Community show" mirrors our December 2025 park show. */
  presets: [
    { name: "Small show", contents: { stage: 1, flake: 3, mega: 0, singing: 2, cane: 2, arch: 0 } },
    { name: "Community show", contents: { stage: 1, flake: 7, mega: 2, singing: 2, cane: 2, arch: 0 } },
    { name: "Festival", contents: { stage: 1, flake: 7, mega: 4, singing: 4, cane: 8, arch: 4 } },
  ] as { name: string; contents: Record<PropType, number> }[],
};

export const PROP_TYPES: PropType[] = ["stage", "flake", "mega", "singing", "cane", "arch"];
export const REGIONS: RegionId[] = ["home", "central", "far"];

export const formatCad = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(Math.round(n));
