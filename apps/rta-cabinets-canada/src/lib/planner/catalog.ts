// Planner catalog: turns the sales catalog (src/content/cabinets.json) into placeable
// planner items with real footprints, mounting heights and front styles, plus standard
// appliances drawn to typical sizes (we don't sell appliances, but a kitchen plan
// still needs somewhere for the range, fridge and dishwasher to go).

import { getAllCabinets, getCabinetBySku, type Cabinet } from "@/lib/planner-catalog";
import type { Level } from "./types";

export type PlannerGroup =
  | "base"
  | "drawer"
  | "sink"
  | "corner"
  | "wall"
  | "tall"
  | "specialty"
  | "filler"
  | "appliance";

export type FrontStyle =
  | "door-drawer" // single door + top drawer (B09–B21)
  | "doors-drawer" // double door + top drawer (B24–B36)
  | "drawers3" // three drawer stack
  | "sink" // false drawer front + doors
  | "door" // single full-height door (wall ≤ 21")
  | "doors" // double full-height doors (wall ≥ 24")
  | "glass" // single glass door
  | "open" // open angled shelves (end cabinets)
  | "blind" // blind base corner: blank left panel + door/drawer right
  | "blind-wall" // blind wall corner: blank left + door right
  | "micro" // microwave shelf below, doors above
  | "wine" // wine lattice
  | "pantry" // tall utility: doors top + bottom
  | "lazy" // L-shaped corner base with bi-fold doors (drawn specially)
  | "diag" // diagonal wall corner (drawn specially)
  | "diag-glass"
  | "filler" // flat filler strip
  | "panel" // finished end panel
  | "range"
  | "hood" // under-cabinet range hood
  | "chimney" // wall-mount chimney hood
  | "microwave" // over-the-range microwave
  | "dishwasher"
  | "fridge";

export type PlannerItem = {
  id: string; // catalog SKU, or an APPL-* appliance id
  sku: string;
  name: string;
  short: string; // compact label for plans
  group: PlannerGroup;
  level: Level;
  width: number;
  height: number; // overall height of the unit as drawn (base units include the toe kick)
  depth: number;
  zBottom: number;
  zTop: number;
  price: number;
  image?: string;
  front: FrontStyle;
  cornerSize?: number; // square footprint side for corner units
  features: string[];
  sold: boolean; // false for appliances (layout only)
  comingSoon?: boolean; // in the catalog but not orderable yet (30" wall line)
  cabinet?: Cabinet;
};

export const GROUP_LABEL: Record<PlannerGroup, string> = {
  base: "Base cabinets",
  drawer: "Drawer cabinets",
  sink: "Sink bases",
  corner: "Corner cabinets",
  wall: "Wall cabinets",
  tall: "Tall & pantry",
  specialty: "Specialty",
  filler: "Fillers & panels",
  appliance: "Appliances",
};

export const GROUP_ORDER: PlannerGroup[] = [
  "base",
  "drawer",
  "sink",
  "corner",
  "wall",
  "tall",
  "specialty",
  "filler",
  "appliance",
];

export const TOE_KICK_H = 4.5;
export const BASE_H = 34.5;
export const COUNTER_H = 36;
export const WALL_TOP = 90; // wall cabinets hang with their tops aligned at 90"

// Catalog SKUs that live in the plan as finishing add-ons rather than placed units
export const ADDON_SKUS = [
  "TK8(5MM)",
  "Light Rail Molding",
  "Scribe Moulding",
  "Outside Corner Mouldin",
  "Corbel 8x12",
  "Stem Glass Holder",
  "Touch up Kit",
  "SAMPLE-DOOR-WS",
  "WHITE-SHAKER",
  '48"*96"(5mm)',
];

// Standard appliances so a kitchen can be planned around them. We don't sell appliances —
// these are unpriced, drawn to typical sizes, and listed separately on the design sheet.
function appliance(
  id: string,
  name: string,
  short: string,
  dims: { w: number; h: number; d: number; z0?: number },
  front: FrontStyle,
  image: string,
  features: string[],
  level: Level = "base",
): PlannerItem {
  const z0 = dims.z0 ?? 0;
  return {
    id,
    sku: id,
    name,
    short,
    group: "appliance",
    level,
    width: dims.w,
    height: dims.h,
    depth: dims.d,
    zBottom: z0,
    zTop: z0 + dims.h,
    price: 0,
    image: `/images/planner/appliances/${image}.svg`,
    front,
    features: ["appliance", ...features],
    sold: false,
  };
}

const APPLIANCES: PlannerItem[] = [
  appliance("APPL-RANGE-24", "24\u2033 Freestanding Range", "Range 24", { w: 24, h: 36, d: 25 }, "range", "range", ["range"]),
  appliance("APPL-RANGE-30", "30\u2033 Freestanding Range", "Range 30", { w: 30, h: 36, d: 25 }, "range", "range", ["range"]),
  appliance("APPL-RANGE-36", "36\u2033 Freestanding Range", "Range 36", { w: 36, h: 36, d: 25 }, "range", "range", ["range"]),
  appliance("APPL-HOOD-30", "30\u2033 Under-Cabinet Range Hood", "Hood 30", { w: 30, h: 6, d: 18, z0: 66 }, "hood", "hood", ["hood"], "wall"),
  appliance("APPL-HOOD-36", "36\u2033 Under-Cabinet Range Hood", "Hood 36", { w: 36, h: 6, d: 18, z0: 66 }, "hood", "hood", ["hood"], "wall"),
  appliance("APPL-CHIMNEY-30", "30\u2033 Wall-Mount Chimney Hood", "Chimney 30", { w: 30, h: 24, d: 20, z0: 66 }, "chimney", "chimney", ["hood", "chimney"], "wall"),
  appliance("APPL-CHIMNEY-36", "36\u2033 Wall-Mount Chimney Hood", "Chimney 36", { w: 36, h: 24, d: 20, z0: 66 }, "chimney", "chimney", ["hood", "chimney"], "wall"),
  appliance("APPL-OTR-30", "30\u2033 Over-the-Range Microwave", "OTR Micro 30", { w: 30, h: 17, d: 16, z0: 66 }, "microwave", "microwave", ["hood", "microwave"], "wall"),
  appliance("APPL-DW-18", "18\u2033 Dishwasher", "DW 18", { w: 18, h: 34.5, d: 24 }, "dishwasher", "dishwasher", ["dishwasher"]),
  appliance("APPL-DW-24", "24\u2033 Dishwasher", "DW 24", { w: 24, h: 34.5, d: 24 }, "dishwasher", "dishwasher", ["dishwasher"]),
  appliance("APPL-FRIDGE-24", "24\u2033 Apartment Refrigerator", "Fridge 24", { w: 24, h: 66, d: 26 }, "fridge", "fridge-top", ["fridge", "top-freezer"], "tall"),
  appliance("APPL-FRIDGE-30", "30\u2033 Top-Freezer Refrigerator", "Fridge 30", { w: 30, h: 66, d: 30 }, "fridge", "fridge-top", ["fridge", "top-freezer"], "tall"),
  appliance("APPL-FRIDGE-33", "33\u2033 French-Door Refrigerator", "Fridge 33", { w: 33, h: 70, d: 32 }, "fridge", "fridge-fd", ["fridge", "french-door"], "tall"),
  appliance("APPL-FRIDGE-36", "36\u2033 French-Door Refrigerator", "Fridge 36", { w: 36, h: 70, d: 32 }, "fridge", "fridge-fd", ["fridge", "french-door"], "tall"),
  appliance("APPL-FRIDGE-42", "42\u2033 Built-In Refrigerator", "Fridge 42", { w: 42, h: 84, d: 26 }, "fridge", "fridge-builtin", ["fridge", "built-in"], "tall"),
];

/** Placeholder ids from the first planner release -> current appliance ids (keeps saved designs loading). */
export const LEGACY_SKUS: Record<string, string> = {
  "SPACER-RANGE-30": "APPL-RANGE-30",
  "SPACER-RANGE-36": "APPL-RANGE-36",
  "SPACER-DW-24": "APPL-DW-24",
  "SPACER-FRIDGE-36": "APPL-FRIDGE-36",
  "SPACER-FRIDGE-33": "APPL-FRIDGE-33",
};

function fromCabinet(c: Cabinet): PlannerItem | null {
  if (ADDON_SKUS.includes(c.sku)) return null;
  const w = c.width_in ?? 0;
  const h = c.height_in ?? 0;
  const d = c.depth_in ?? 0;
  const base = {
    id: c.sku,
    sku: c.sku,
    name: c.name,
    short: c.sku.replace(/\s*\(.*\)$/, ""),
    price: c.price_cad,
    image: c.image_urls[0],
    features: c.features,
    sold: !c.coming_soon,
    comingSoon: !!c.coming_soon,
    cabinet: c,
  };
  const sku = c.sku.toUpperCase();

  // --- Corner units -------------------------------------------------------
  if (/^LAZY SUSAN/.test(sku)) {
    return {
      ...base,
      short: `LS${w}`,
      group: "corner",
      level: "base",
      width: w,
      height: BASE_H,
      depth: w,
      zBottom: 0,
      zTop: BASE_H,
      front: "lazy",
      cornerSize: w,
    };
  }
  if (sku === "WDC2436" || sku === "WDC2430" || sku === "WDCG243612" || sku === "WDCG2463612") {
    return {
      ...base,
      group: "corner",
      level: "wall",
      width: 24,
      height: h || 36,
      depth: 24,
      zBottom: WALL_TOP - (h || 36),
      zTop: WALL_TOP,
      front: sku === "WDC2436" || sku === "WDC2430" ? "diag" : "diag-glass",
      cornerSize: 24,
    };
  }
  if (sku.startsWith("BBC")) {
    return {
      ...base,
      short: "BBC42",
      group: "corner",
      level: "base",
      width: 42,
      height: BASE_H,
      depth: 24,
      zBottom: 0,
      zTop: BASE_H,
      front: "blind",
    };
  }
  if (sku === "WBC2736" || sku === "WBC2730") {
    return {
      ...base,
      group: "corner",
      level: "wall",
      width: 27,
      height: h || 36,
      depth: 12,
      zBottom: WALL_TOP - (h || 36),
      zTop: WALL_TOP,
      front: "blind-wall",
    };
  }

  // --- Fillers & panels -----------------------------------------------------
  if (sku === "WF336") {
    return { ...base, group: "filler", level: "wall", width: 3, height: 36, depth: 12, zBottom: WALL_TOP - 36, zTop: WALL_TOP, front: "filler" };
  }
  if (sku === "WF330") {
    return { ...base, name: "3″ Base Filler (30″ long)", group: "filler", level: "base", width: 3, height: BASE_H, depth: 24, zBottom: 0, zTop: BASE_H, front: "filler" };
  }
  if (sku === "WF 3*96") {
    return { ...base, name: "3″ Tall Filler (96″ long)", short: "WF396", group: "filler", level: "tall", width: 3, height: WALL_TOP, depth: 24, zBottom: 0, zTop: WALL_TOP, front: "filler" };
  }
  if (sku === "DWP3") {
    return { ...base, group: "filler", level: "base", width: 3, height: BASE_H, depth: 24, zBottom: 0, zTop: BASE_H, front: "panel" };
  }
  if (sku.startsWith("RRP24")) {
    return { ...base, name: "Refrigerator End Panel (24″ deep)", short: "RRP24", group: "filler", level: "tall", width: 0.75, height: WALL_TOP, depth: 24, zBottom: 0, zTop: WALL_TOP, front: "panel" };
  }

  // --- Tall -----------------------------------------------------------------
  if (sku.startsWith("WP")) {
    return { ...base, group: "tall", level: "tall", width: w, height: 90, depth: 24, zBottom: 0, zTop: 90, front: "pantry" };
  }

  // --- Base / drawer / sink --------------------------------------------------
  if (c.type === "drawer") {
    return { ...base, group: "drawer", level: "base", width: w, height: BASE_H, depth: 24, zBottom: 0, zTop: BASE_H, front: "drawers3" };
  }
  if (c.type === "base") {
    if (c.features.includes("sink")) {
      return { ...base, group: "sink", level: "base", width: w, height: BASE_H, depth: 24, zBottom: 0, zTop: BASE_H, front: "sink" };
    }
    if (sku === "SR9") {
      return { ...base, name: c.name, group: "specialty", level: "base", width: w, height: BASE_H, depth: 24, zBottom: 0, zTop: BASE_H, front: "door-drawer" };
    }
    if (sku === "BEC24") {
      return { ...base, group: "specialty", level: "base", width: w, height: BASE_H, depth: 24, zBottom: 0, zTop: BASE_H, front: "open" };
    }
    return {
      ...base,
      group: sku === "BWBK18" ? "specialty" : "base",
      level: "base",
      width: w,
      height: BASE_H,
      depth: 24,
      zBottom: 0,
      zTop: BASE_H,
      front: w >= 24 ? "doors-drawer" : "door-drawer",
    };
  }

  // --- Wall -----------------------------------------------------------------
  if (c.type === "wall") {
    const height = h || 36;
    const depth = d || 12;
    let front: FrontStyle = w >= 24 ? "doors" : "door";
    let group: PlannerGroup = "wall";
    if (sku.startsWith("WGC")) {
      front = "glass";
      group = "specialty";
    } else if (sku === "WEC1236") {
      front = "open";
      group = "specialty";
    } else if (sku.startsWith("WMC")) {
      front = "micro";
      group = "specialty";
    } else if (sku.startsWith("WRC")) {
      front = "wine";
      group = "specialty";
    }
    return {
      ...base,
      group,
      level: "wall",
      width: w,
      height,
      depth,
      zBottom: WALL_TOP - height,
      zTop: WALL_TOP,
      front,
    };
  }
  return null;
}

let CACHE: PlannerItem[] | null = null;
let BY_ID: Map<string, PlannerItem> | null = null;

export function getPlannerItems(): PlannerItem[] {
  if (!CACHE) {
    const list: PlannerItem[] = [];
    for (const c of getAllCabinets()) {
      const it = fromCabinet(c);
      if (it) list.push(it);
    }
    list.push(...APPLIANCES);
    const order = new Map(GROUP_ORDER.map((g, i) => [g, i]));
    list.sort((a, b) => {
      const g = (order.get(a.group) ?? 99) - (order.get(b.group) ?? 99);
      if (g !== 0) return g;
      if (a.level !== b.level) return a.level === "wall" ? 1 : -1;
      return a.width - b.width || a.height - b.height;
    });
    CACHE = list;
    BY_ID = new Map(list.map((i) => [i.id, i]));
  }
  return CACHE;
}

export function getPlannerItem(id: string): PlannerItem | undefined {
  if (!BY_ID) getPlannerItems();
  return BY_ID!.get(id);
}

export function getAddons(): Cabinet[] {
  return ADDON_SKUS.map((s) => getCabinetBySku(s)).filter((c): c is Cabinet => !!c);
}

/** Other widths of the same family — used by the "swap width" control. */
export function getWidthAlternatives(item: PlannerItem): PlannerItem[] {
  const all = getPlannerItems();
  return all.filter(
    (o) =>
      o.id !== item.id &&
      o.group === item.group &&
      o.level === item.level &&
      o.front === item.front &&
      o.height === item.height &&
      o.sold === item.sold,
  );
}

// ---------------------------------------------------------------------------
// Front layouts — shared by the 2D elevation and the 3D scene.
// Coordinates are local to the unit: x from its left edge, y up from the floor line of
// the unit (so a base cabinet's door starts above the toe kick), all in inches.
// ---------------------------------------------------------------------------

export type FrontPart = {
  kind: "door" | "drawer" | "glass" | "panel" | "open" | "wine" | "appliance";
  x: number;
  y: number;
  w: number;
  h: number;
  hinge?: "left" | "right";
  label?: string;
  variant?: string; // appliance drawing hint: range | hood | chimney | microwave | dishwasher | fridge-top | fridge-fd | fridge-builtin
};

const GAP = 0.125;

function doorsAcross(x: number, y: number, w: number, h: number, count: 1 | 2, kind: FrontPart["kind"] = "door"): FrontPart[] {
  if (count === 1) return [{ kind, x, y, w, h, hinge: "left" }];
  const half = (w - GAP) / 2;
  return [
    { kind, x, y, w: half, h, hinge: "left" },
    { kind, x: x + half + GAP, y, w: half, h, hinge: "right" },
  ];
}

export function frontLayout(def: PlannerItem): FrontPart[] {
  const w = def.width;
  switch (def.front) {
    case "door-drawer":
    case "doors-drawer": {
      const drawerH = 6;
      const doorH = BASE_H - TOE_KICK_H - drawerH - GAP;
      return [
        { kind: "drawer", x: 0, y: BASE_H - drawerH, w, h: drawerH },
        ...doorsAcross(0, TOE_KICK_H, w, doorH, def.front === "doors-drawer" ? 2 : 1),
      ];
    }
    case "sink": {
      const drawerH = 6;
      const doorH = BASE_H - TOE_KICK_H - drawerH - GAP;
      return [
        { kind: "panel", x: 0, y: BASE_H - drawerH, w, h: drawerH, label: "false front" },
        ...doorsAcross(0, TOE_KICK_H, w, doorH, w >= 24 ? 2 : 1),
      ];
    }
    case "drawers3": {
      const top = 6;
      const rest = BASE_H - TOE_KICK_H - top - GAP * 2;
      const mid = rest / 2;
      return [
        { kind: "drawer", x: 0, y: BASE_H - top, w, h: top },
        { kind: "drawer", x: 0, y: TOE_KICK_H + mid + GAP, w, h: mid },
        { kind: "drawer", x: 0, y: TOE_KICK_H, w, h: mid },
      ];
    }
    case "door":
      return doorsAcross(0, 0, w, def.height, 1);
    case "doors":
      return doorsAcross(0, 0, w, def.height, 2);
    case "glass":
      return doorsAcross(0, 0, w, def.height, 1, "glass");
    case "open":
      return [{ kind: "open", x: 0, y: def.level === "base" ? TOE_KICK_H : 0, w, h: def.level === "base" ? BASE_H - TOE_KICK_H : def.height }];
    case "blind": {
      const drawerH = 6;
      const doorH = BASE_H - TOE_KICK_H - drawerH - GAP;
      const blank = w - 21;
      return [
        { kind: "panel", x: 0, y: TOE_KICK_H, w: blank, h: BASE_H - TOE_KICK_H, label: "blind" },
        { kind: "drawer", x: blank, y: BASE_H - drawerH, w: 21, h: drawerH },
        { kind: "door", x: blank, y: TOE_KICK_H, w: 21, h: doorH, hinge: "right" },
      ];
    }
    case "blind-wall": {
      const blank = w - 15;
      return [
        { kind: "panel", x: 0, y: 0, w: blank, h: def.height, label: "blind" },
        { kind: "door", x: blank, y: 0, w: 15, h: def.height, hinge: "right" },
      ];
    }
    case "micro": {
      const bay = 18;
      return [
        { kind: "open", x: 0, y: 0, w, h: bay, label: "microwave" },
        ...doorsAcross(0, bay + GAP, w, def.height - bay - GAP, 2),
      ];
    }
    case "wine":
      return [{ kind: "wine", x: 0, y: 0, w, h: def.height }];
    case "pantry": {
      const lower = 30;
      return [
        ...doorsAcross(0, TOE_KICK_H, w, lower, 2),
        ...doorsAcross(0, TOE_KICK_H + lower + GAP, w, def.height - TOE_KICK_H - lower - GAP, 2),
      ];
    }
    case "filler":
      return [{ kind: "panel", x: 0, y: def.level === "base" ? TOE_KICK_H : 0, w, h: def.level === "base" ? BASE_H - TOE_KICK_H : def.height }];
    case "panel":
      return [{ kind: "panel", x: 0, y: 0, w, h: def.height }];
    case "range":
      return [{ kind: "appliance", x: 0, y: 0, w, h: def.height, label: "Range", variant: "range" }];
    case "hood":
      return [{ kind: "appliance", x: 0, y: 0, w, h: def.height, label: "Hood", variant: "hood" }];
    case "chimney":
      return [{ kind: "appliance", x: 0, y: 0, w, h: def.height, label: "Hood", variant: "chimney" }];
    case "microwave":
      return [{ kind: "appliance", x: 0, y: 0, w, h: def.height, label: "Microwave", variant: "microwave" }];
    case "dishwasher":
      return [{ kind: "appliance", x: 0, y: 0, w, h: def.height, label: "Dishwasher", variant: "dishwasher" }];
    case "fridge":
      return [{ kind: "appliance", x: 0, y: 0, w, h: def.height, label: "Fridge", variant: def.features.includes("french-door") ? "fridge-fd" : def.features.includes("built-in") ? "fridge-builtin" : "fridge-top" }];
    case "lazy":
    case "diag":
    case "diag-glass":
      return []; // drawn by the corner renderers
  }
}
