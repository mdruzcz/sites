// Design review: warnings, recommendations, parts list and finishing add-ons.

import { CORNER_NAMES, WALL_NAMES, formatInches, type CornerId, type Design, type SurfaceId, type WallId } from "./types";
import {
  boxesOverlap,
  cornerIsUsable,
  islandBox,
  islandLength,
  nextWall,
  prevWall,
  projectBox,
  resolveAll,
  wallFrame,
  type Box,
  type Placed,
} from "./geometry";
import { GROUP_ORDER, getAddons, getPlannerItem, COUNTER_H, WALL_TOP } from "./catalog";
import { getCabinetBySku } from "@/lib/planner-catalog";
import { KITCHEN_SALE, kitchenLinePricing } from "@/lib/sale";

export type Issue = {
  id: string;
  kind: "warning" | "recommendation";
  title: string;
  detail: string;
  itemIds?: string[];
  surface?: SurfaceId;
  sku?: string; // suggested product
};

export type PartLine = {
  sku: string;
  name: string;
  qty: number;
  /** Sale unit price (what we quote). */
  unit: number;
  total: number;
  /** Regular unit price before the kitchen / overstock sale. */
  listUnit?: number;
  listTotal?: number;
  salePct?: number;
  saleLabel?: string;
  image?: string;
  slug?: string;
  comingSoon?: boolean;
};

export type AddonLine = PartLine & { reason: string; defaultOn: boolean };

export type Review = {
  warnings: Issue[];
  recommendations: Issue[];
  parts: PartLine[];
  appliances: PartLine[]; // the customer's own appliances (unpriced)
  addons: AddonLine[];
  /** Sale subtotal of the parts list. */
  subtotal: number;
  /** Regular-price subtotal of the parts list. */
  listSubtotal: number;
  saved: number;
  salePct: number;
  stats: {
    units: number;
    baseLinear: number;
    wallLinear: number;
    islandLength: number;
    counterLinear: number;
  };
};

function label(p: Placed): string {
  return `${p.def.short} (${p.def.name.replace(/\s*\(.*\)$/, "")})`;
}

function surfaceName(p: Placed): string {
  if (p.corner !== null) return CORNER_NAMES[p.corner].toLowerCase();
  if (p.item.surface === "island") return "the island";
  return WALL_NAMES[p.item.surface as WallId].toLowerCase();
}

function distanceBetween(a: Box, b: Box): number {
  const dx = Math.max(0, Math.max(a.x0, b.x0) - Math.min(a.x1, b.x1));
  const dy = Math.max(0, Math.max(a.y0, b.y0) - Math.min(a.y1, b.y1));
  return Math.sqrt(dx * dx + dy * dy);
}

export function reviewDesign(design: Design): Review {
  const warnings: Issue[] = [];
  const recommendations: Issue[] = [];
  const placed = resolveAll(design);
  const room = design.room;
  let n = 0;
  const warn = (title: string, detail: string, extra: Partial<Issue> = {}) => warnings.push({ id: `w${n++}`, kind: "warning", title, detail, ...extra });
  const rec = (title: string, detail: string, extra: Partial<Issue> = {}) => recommendations.push({ id: `r${n++}`, kind: "recommendation", title, detail, ...extra });

  // ---- Structural problems --------------------------------------------------
  if (placed.length === 0) {
    warn("Your design is empty", "Go back to step 2 and add cabinets to a wall or the island.");
  }

  for (let i = 0; i < placed.length; i++) {
    for (let j = i + 1; j < placed.length; j++) {
      if (boxesOverlap(placed[i].box, placed[j].box)) {
        warn(
          `${placed[i].def.short} overlaps ${placed[j].def.short}`,
          `${label(placed[i])} on ${surfaceName(placed[i])} runs into ${label(placed[j])} on ${surfaceName(placed[j])}. Move one of them or swap to a narrower width.`,
          { itemIds: [placed[i].item.id, placed[j].item.id] },
        );
      }
    }
  }

  for (const p of placed) {
    if (p.item.surface === "island" || p.corner !== null) continue;
    if (p.t < -0.05 || p.t + p.def.width > p.frame.length + 0.05) {
      warn(`${p.def.short} hangs past the end of the ${surfaceName(p)}`, `The ${formatInches(p.def.width)} unit doesn't fit inside the ${formatInches(p.frame.length)} wall. Slide it over or choose a narrower width.`, {
        itemIds: [p.item.id],
        surface: p.item.surface,
      });
    }
  }

  if (design.island.enabled) {
    const ib = islandBox(design);
    if (ib.x0 < -0.05 || ib.y0 < -0.05 || ib.x1 > room.width + 0.05 || ib.y1 > room.depth + 0.05) {
      warn("The island is outside the room", "Drag the island back inside the walls or shorten it.");
    }
    const islandItems = placed.filter((p) => p.item.surface === "island");
    if (islandItems.length === 0) {
      warn("The island is empty", "Add base cabinets to the island, or turn it off in step 2.");
    } else {
      let minClear = Infinity;
      let against = "";
      for (const w of [0, 1, 2, 3] as WallId[]) {
        if (room.openWalls.includes(w)) continue;
        const fr = wallFrame(room, w);
        const pr = projectBox(fr, ib);
        if (pr.nmin < minClear) {
          minClear = pr.nmin;
          against = `the ${WALL_NAMES[w].toLowerCase()}`;
        }
      }
      for (const p of placed) {
        if (p.item.surface === "island") continue;
        if (p.def.level === "wall") continue;
        const d = distanceBetween(ib, p.box);
        if (d < minClear) {
          minClear = d;
          against = `${p.def.short} on ${surfaceName(p)}`;
        }
      }
      if (minClear < 36) {
        warn(
          `Only ${formatInches(Math.max(0, Math.round(minClear)))} between the island and ${against}`,
          "Walkways around an island should be at least 36″ (42″ is ideal so doors, drawers and appliances can open with someone standing there).",
        );
      } else if (minClear < 42) {
        rec(`${formatInches(Math.round(minClear))} island clearance — 42″ is ideal`, `The tightest walkway is next to ${against}. Nudging the island a few inches gives room for two people to pass.`);
      }
      const L = islandLength(design);
      rec(
        "Finish the island back and ends",
        `Cover the exposed back and ends of the ${formatInches(L)} island with painted plywood panels — ${Math.ceil((L + 48) / 96)} × 4×8 sheet(s) — so it matches the doors.`,
        { sku: '48"*96"(5mm)' },
      );
    }
  }

  for (const o of room.openings) {
    const fr = wallFrame(room, o.wall);
    for (const p of placed) {
      const pr = projectBox(fr, p.box);
      if (pr.nmax <= 0.05 || pr.nmin > 30) continue;
      const overlapT = Math.min(pr.tmax, o.t + o.width) - Math.max(pr.tmin, o.t);
      if (overlapT <= 0.5) continue;
      if (o.kind === "door") {
        warn(`${p.def.short} blocks the door on the ${WALL_NAMES[o.wall].toLowerCase()}`, `Nothing can sit in front of a doorway. Move ${label(p)} or move the door in step 1.`, { itemIds: [p.item.id], surface: o.wall });
      } else if (p.def.zBottom < o.sill + o.height && p.def.zTop > o.sill) {
        warn(`${p.def.short} covers the window on the ${WALL_NAMES[o.wall].toLowerCase()}`, `${label(p)} sits in front of the window. Move it aside, or leave the run open above the sink.`, { itemIds: [p.item.id], surface: o.wall });
      } else if (p.def.level === "base" && o.sill < COUNTER_H) {
        warn(`Window sill is below counter height`, `The window on the ${WALL_NAMES[o.wall].toLowerCase()} starts ${formatInches(o.sill)} off the floor, but the counter is ${formatInches(COUNTER_H)} high. Raise the sill in step 1 or move ${label(p)}.`, { itemIds: [p.item.id], surface: o.wall });
      }
    }
  }

  if (room.ceiling < WALL_TOP && placed.some((p) => p.def.level !== "base")) {
    warn("Ceiling is lower than the cabinet tops", `Wall and tall cabinets top out at ${formatInches(WALL_TOP)}, but the ceiling is ${formatInches(room.ceiling)}. Double-check your ceiling height in step 1.`);
  }

  // ---- Work triangle & appliances ------------------------------------------
  const sinks = placed.filter((p) => p.def.front === "sink");
  const ranges = placed.filter((p) => p.def.front === "range");
  const fridges = placed.filter((p) => p.def.front === "fridge");
  const dishwashers = placed.filter((p) => p.def.front === "dishwasher");

  if (placed.length > 0) {
    if (sinks.length === 0) rec("No sink base yet", "Most kitchens are planned around the sink. Add an SB33 or SB36 sink base — under a window if you have one.", { sku: "SB33" });
    if (ranges.length === 0) rec("Add your range", "Drop a 24″, 30″ or 36″ range in from Appliances so the cabinets on either side land in the right place. Appliances aren't sold here — they're drawn to standard sizes for layout.", { sku: "APPL-RANGE-30" });
    if (fridges.length === 0) rec("Add your refrigerator", "Place a 24″–42″ refrigerator at the end of a run, ideally near the door you carry groceries through.", { sku: "APPL-FRIDGE-36" });
  }

  const adjacent = (a: Placed, b: Placed, gap = 1.5) =>
    a.item.surface === b.item.surface &&
    a.corner === null &&
    b.corner === null &&
    (Math.abs(a.t + a.def.width - b.t) <= gap || Math.abs(b.t + b.def.width - a.t) <= gap);

  for (const s of sinks) {
    const dw = dishwashers.find((d) => adjacent(s, d));
    if (!dw) {
      rec(`Leave room for a dishwasher beside ${s.def.short}`, "Put an 18″ or 24″ dishwasher right next to the sink base so the plumbing stays short.", { itemIds: [s.item.id], sku: "APPL-DW-24" });
    }
  }
  for (const d of dishwashers) {
    const neighbours = placed.filter((p) => p.item.id !== d.item.id && adjacent(d, p));
    const exposedEnd = neighbours.length < 2;
    const hasPanel = neighbours.some((p) => p.def.sku === "DWP3");
    if (exposedEnd && !hasPanel) {
      rec("Add a dishwasher end panel", `The dishwasher space at ${surfaceName(d)} has an exposed side. A DWP3 panel finishes it to match the cabinets.`, { itemIds: [d.item.id], sku: "DWP3" });
    }
  }
  for (const r of ranges) {
    const neighbours = placed.filter((p) => p.item.id !== r.item.id && p.def.level === "base" && adjacent(r, p));
    if (neighbours.length < 2) {
      rec(`Landing space beside the ${r.def.short}`, "Aim for at least 12″ of counter on one side of the range and 15″ on the other so there's somewhere to set a hot pan.", { itemIds: [r.item.id] });
    }
    if (fridges.some((f) => adjacent(r, f))) {
      rec("Range is right beside the fridge", "Heat from the range works against the fridge. If you can, put a cabinet or counter between them.", { itemIds: [r.item.id] });
    }
    const above = placed.filter((p) => p.def.level === "wall" && p.item.surface === r.item.surface && p.corner === null && p.t < r.t + r.def.width - 0.5 && p.t + p.def.width > r.t + 0.5);
    if (!above.some((a) => a.def.features.includes("hood"))) {
      rec(`Add a range hood over the ${r.def.short}`, "A 30″ or 36″ under-cabinet hood, chimney hood or over-the-range microwave sits at 66″ with an 18″-tall cabinet (W3018) above it.", { itemIds: [r.item.id], sku: r.def.width >= 36 ? "APPL-HOOD-36" : "APPL-HOOD-30" });
    }
    for (const a of above) {
      if (a.def.zBottom < 66 && !a.def.features.includes("hood")) {
        rec(`${a.def.short} is too low over the range`, "Keep 30″ between the cooktop and anything above it. Use an 18″-tall W3018 (or the WRC3018 wine rack) over the range with a hood underneath, or leave that spot open.", { itemIds: [a.item.id], sku: "W3018" });
      }
    }
  }
  for (const f of fridges) {
    const above = placed.some((p) => p.def.level === "wall" && p.item.surface === f.item.surface && p.corner === null && p.t < f.t + f.def.width - 0.5 && p.t + p.def.width > f.t + 0.5);
    if (!above && f.def.height <= 72) {
      rec(`Cabinet above the ${f.def.short}`, "A 24″-deep over-fridge cabinet (W361824 or W301824) fills the gap above the fridge and gives you a spot for platters.", { itemIds: [f.item.id], sku: f.def.width >= 36 ? "W361824" : "W301824" });
    }
    const hasPanel = placed.some((p) => p.def.sku.startsWith("RRP24") && adjacent(f, p, 2));
    if (!hasPanel) {
      rec(`Finish the side of the ${f.def.short}`, "A refrigerator end panel (RRP24) hides the fridge side and gives the run a built-in look.", { itemIds: [f.item.id], sku: "RRP24 (12mm)" });
    }
  }

  // ---- Corners & fillers ----------------------------------------------------
  for (const c of [0, 1, 2, 3] as CornerId[]) {
    if (!cornerIsUsable(design, c)) continue;
    for (const level of ["base", "wall"] as const) {
      const hasCorner = placed.some((p) => p.corner === c && p.def.level === level);
      if (hasCorner) continue;
      const wa = wallFrame(room, c);
      const near = (w: WallId, fromStart: boolean) =>
        placed.some((p) => {
          if (p.corner !== null || p.item.surface !== w) return false;
          const lvl = p.def.level === "tall" ? level : p.def.level;
          if (lvl !== level) return false;
          const reach = 30;
          return fromStart ? p.t < reach : p.t + p.def.width > wallFrame(room, w).length - reach;
        });
      const a = near(c, false);
      const b = near(nextWall(c), true);
      if (a && b) {
        const skus = level === "base" ? "a Lazy Susan (33″ or 36″) or a blind base corner with a 3″ filler" : "a diagonal wall corner (WDC2436) or blind wall corner (WBC2736)";
        rec(`Use the ${CORNER_NAMES[c].toLowerCase()}`, `Both runs meet at this corner at ${level} level. Add ${skus} so the corner becomes usable storage instead of dead space.`, {
          sku: level === "base" ? "Lazy Susan 33" : "WDC2436",
        });
      }
      void wa;
    }
  }

  for (const p of placed) {
    if (p.def.front !== "blind" && p.def.front !== "blind-wall") continue;
    const atStart = p.t < 3;
    const atEnd = p.t + p.def.width > p.frame.length - 3;
    if (!atStart && !atEnd) {
      rec(`${p.def.short} should sit in a corner`, "Blind corner cabinets are made to butt into a corner, with the blind side against the adjacent run and a 3″ filler so the door clears.", { itemIds: [p.item.id] });
    }
  }

  for (const w of [0, 1, 2, 3] as WallId[]) {
    if (room.openWalls.includes(w)) continue;
    const fr = wallFrame(room, w);
    for (const level of ["base", "wall"] as const) {
      const run = placed
        .filter((p) => p.item.surface === w && p.corner === null && (p.def.level === level || p.def.level === "tall"))
        .sort((a, b) => a.t - b.t);
      if (!run.length) continue;
      const first = run[0];
      const last = run[run.length - 1];
      const startWall = prevWall(w);
      const endWall = nextWall(w);
      const cornerAtStart = placed.some((p) => p.corner === startWall && (p.def.level === level));
      const cornerAtEnd = placed.some((p) => p.corner === w && (p.def.level === level));
      const isFiller = (p: Placed) => p.def.group === "filler";
      if (first.t < 0.5 && !room.openWalls.includes(startWall) && !cornerAtStart && !isFiller(first) && first.def.front !== "blind" && first.def.front !== "blind-wall") {
        rec(
          `Filler where the ${WALL_NAMES[w].toLowerCase()} run meets the ${WALL_NAMES[startWall].toLowerCase()}`,
          `Add a 3″ ${level === "base" ? "base" : "wall"} filler at the start of the run so ${first.def.short}'s ${level === "base" ? "drawer and door" : "door"} can open past the adjacent wall.`,
          { itemIds: [first.item.id], surface: w, sku: level === "base" ? "WF330" : "WF336" },
        );
      }
      if (last.t + last.def.width > fr.length - 0.5 && !room.openWalls.includes(endWall) && !cornerAtEnd && !isFiller(last) && last.def.front !== "blind" && last.def.front !== "blind-wall") {
        rec(
          `Filler where the ${WALL_NAMES[w].toLowerCase()} run meets the ${WALL_NAMES[endWall].toLowerCase()}`,
          `Add a 3″ ${level === "base" ? "base" : "wall"} filler at the end of the run so ${last.def.short} clears the adjacent wall.`,
          { itemIds: [last.item.id], surface: w, sku: level === "base" ? "WF330" : "WF336" },
        );
      }
    }
  }

  // ---- Parts list ------------------------------------------------------------
  const counts = new Map<string, number>();
  for (const p of placed) {
    if (!p.def.sold && !p.def.comingSoon) continue;
    counts.set(p.def.sku, (counts.get(p.def.sku) ?? 0) + 1);
  }
  const groupIndex = new Map(GROUP_ORDER.map((g, i) => [g, i]));
  const parts: PartLine[] = [...counts.entries()]
    .map(([sku, qty]) => {
      const def = getPlannerItem(sku)!;
      const cab = getCabinetBySku(sku);
      const pr = def.comingSoon || def.price <= 0 ? null : kitchenLinePricing(sku, def.price);
      return {
        sku,
        name: cab?.name ?? def.name,
        qty,
        unit: pr ? pr.price : 0,
        total: pr ? Math.round(pr.price * qty * 100) / 100 : 0,
        listUnit: pr ? pr.list : 0,
        listTotal: pr ? Math.round(pr.list * qty * 100) / 100 : 0,
        salePct: pr?.pct,
        saleLabel: pr?.label ?? undefined,
        image: def.image,
        slug: cab?.slug,
        comingSoon: !!def.comingSoon,
        _g: groupIndex.get(def.group) ?? 99,
        _w: def.width,
      };
    })
    .sort((a, b) => a._g - b._g || a._w - b._w)
    .map(({ _g: _ignoreG, _w: _ignoreW, ...rest }) => rest);
  const subtotal = Math.round(parts.reduce((s, p) => s + p.total, 0) * 100) / 100;
  const listSubtotal = Math.round(parts.reduce((s, p) => s + (p.listTotal ?? p.total), 0) * 100) / 100;
  const saved = Math.round((listSubtotal - subtotal) * 100) / 100;
  const salePct = listSubtotal > 0 ? Math.round((saved / listSubtotal) * 1000) / 10 : KITCHEN_SALE.pct;
  if (parts.some((p) => p.comingSoon)) {
    rec("Some units are from the 30″ wall line (coming soon)", "They're in your plan so you can design around them, but they can't be quoted until they land. We'll confirm pricing and timing with your quote.");
  }
  const applianceCounts = new Map<string, number>();
  for (const p of placed) if (p.def.group === "appliance") applianceCounts.set(p.def.sku, (applianceCounts.get(p.def.sku) ?? 0) + 1);
  const appliances: PartLine[] = [...applianceCounts.entries()].map(([sku, qty]) => {
    const def = getPlannerItem(sku)!;
    return { sku, name: def.name, qty, unit: 0, total: 0, image: def.image };
  });

  // ---- Stats & finishing add-ons ----------------------------------------------
  let baseLinear = 0;
  let wallLinear = 0;
  for (const p of placed) {
    if (p.def.level === "wall") wallLinear += p.corner !== null ? (p.def.cornerSize ?? p.def.width) * 2 : p.def.width;
    else if (p.def.group !== "appliance" && p.def.group !== "filler") baseLinear += p.corner !== null ? (p.def.cornerSize ?? p.def.width) * 2 : p.def.width;
  }
  const isl = design.island.enabled ? islandLength(design) : 0;
  const toeKickLinear = baseLinear + (design.island.enabled ? isl : 0); // island gets kick on the back too
  const addonsCatalog = getAddons();
  const addon = (sku: string, qty: number, reason: string, defaultOn: boolean): AddonLine | null => {
    const cab = addonsCatalog.find((c) => c.sku === sku);
    if (!cab || qty <= 0) return null;
    return { sku, name: cab.name, qty, unit: cab.price_cad, total: cab.price_cad * qty, image: cab.image_urls[0], slug: cab.slug, reason, defaultOn };
  };
  const addons = [
    addon("TK8(5MM)", Math.ceil(toeKickLinear / 96), `Covers ${formatInches(Math.round(toeKickLinear))} of toe kick along the base runs${design.island.enabled ? " and island" : ""}.`, true),
    wallLinear > 0 ? addon("Light Rail Molding", Math.ceil(wallLinear / 96), `Trims the underside of ${formatInches(Math.round(wallLinear))} of wall cabinets and hides under-cabinet lights.`, true) : null,
    placed.length > 0 ? addon("Scribe Moulding", Math.max(1, Math.ceil(placed.filter((p) => p.corner === null && p.item.surface !== "island").length / 8)), "Closes the gap where cabinets meet an uneven wall.", false) : null,
    design.island.enabled && isl > 0 ? addon('48"*96"(5mm)', Math.ceil((isl + 48) / 96), "Painted plywood to finish the back and ends of the island.", true) : null,
    design.island.enabled && isl > 0 ? addon("Corbel 8x12", 2, "Supports a seating overhang on the island counter.", false) : null,
    placed.length > 0 ? addon("Touch up Kit", 1, "Paint and marker for small nicks during install.", false) : null,
    placed.some((p) => p.def.level === "wall" && p.def.width >= 30) ? addon("Stem Glass Holder", 1, "Hangs under any 30″ wall cabinet.", false) : null,
    placed.some((p) => p.item.surface === "island" || p.def.group === "tall") ? addon("Outside Corner Mouldin", 1, "Finishes exposed outside corners on islands and tall units.", false) : null,
  ].filter((a): a is AddonLine => a !== null);

  return {
    warnings,
    recommendations,
    parts,
    appliances,
    addons,
    subtotal,
    listSubtotal,
    saved,
    salePct,
    stats: {
      units: placed.filter((p) => p.def.sold || p.def.comingSoon).length,
      baseLinear,
      wallLinear,
      islandLength: isl,
      counterLinear: baseLinear + isl,
    },
  };
}
