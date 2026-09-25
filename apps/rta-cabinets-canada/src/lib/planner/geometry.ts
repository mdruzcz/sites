// Planner geometry: surfaces (walls + island), footprints, collision, free-span search.

import type { CornerId, Design, Island, Level, PlacedItem, Room, SurfaceId, WallId } from "./types";
import { getPlannerItem, type PlannerItem, BASE_H, COUNTER_H } from "./catalog";

export type Vec = { x: number; y: number };
export type Frame = { id: SurfaceId; start: Vec; u: Vec; n: Vec; length: number };
export type Box = { x0: number; y0: number; x1: number; y1: number; z0: number; z1: number };
export type Span = [number, number];

export type Placed = {
  item: PlacedItem;
  def: PlannerItem;
  frame: Frame; // frame the unit is drawn in (corner units use the frame of wall `corner`)
  t: number; // left edge along that frame
  box: Box;
  corner: CornerId | null;
};

export const COUNTER_DEPTH = 25.5; // 24" cabinet + 1.5" overhang
export const COUNTER_THICK = COUNTER_H - BASE_H; // 1.5"
export const ISLAND_DEPTH = 24;
export const ISLAND_MAX_LENGTH = 240;

export const FACING_VECS: Vec[] = [
  { x: 0, y: 1 }, // 0: doors face the front wall
  { x: -1, y: 0 }, // 1: doors face the left wall
  { x: 0, y: -1 }, // 2: doors face the back wall
  { x: 1, y: 0 }, // 3: doors face the right wall
];

export function wallFrame(room: Room, w: WallId): Frame {
  const { width: W, depth: D } = room;
  switch (w) {
    case 0:
      return { id: 0, start: { x: 0, y: 0 }, u: { x: 1, y: 0 }, n: { x: 0, y: 1 }, length: W };
    case 1:
      return { id: 1, start: { x: W, y: 0 }, u: { x: 0, y: 1 }, n: { x: -1, y: 0 }, length: D };
    case 2:
      return { id: 2, start: { x: W, y: D }, u: { x: -1, y: 0 }, n: { x: 0, y: -1 }, length: W };
    default:
      return { id: 3, start: { x: 0, y: D }, u: { x: 0, y: -1 }, n: { x: 1, y: 0 }, length: D };
  }
}

export function nextWall(w: WallId): WallId {
  return ((w + 1) % 4) as WallId;
}
export function prevWall(w: WallId): WallId {
  return ((w + 3) % 4) as WallId;
}

/** Corner c is the end of wall c (= start of wall c+1). */
export function cornerPoint(room: Room, c: CornerId): Vec {
  return wallFrame(room, nextWall(c)).start;
}

export function islandLength(design: Design): number {
  let L = 0;
  for (const it of design.items) {
    if (it.surface !== "island") continue;
    const def = getPlannerItem(it.sku);
    if (def) L = Math.max(L, it.t + def.width);
  }
  return Math.max(L, ISLAND_DEPTH);
}

export function islandFrame(design: Design, override?: Partial<Island>): Frame {
  const isl = { ...design.island, ...override };
  const f = FACING_VECS[isl.facing];
  const u = { x: f.y, y: -f.x };
  const L = islandLength(design);
  const start = {
    x: isl.x - (u.x * L) / 2 - f.x * (ISLAND_DEPTH / 2),
    y: isl.y - (u.y * L) / 2 - f.y * (ISLAND_DEPTH / 2),
  };
  return { id: "island", start, u, n: f, length: L };
}

export function surfaceFrame(design: Design, s: SurfaceId): Frame {
  return s === "island" ? islandFrame(design) : wallFrame(design.room, s);
}

export function worldPoint(fr: Frame, t: number, n: number): Vec {
  return { x: fr.start.x + fr.u.x * t + fr.n.x * n, y: fr.start.y + fr.u.y * t + fr.n.y * n };
}

export function localCoords(fr: Frame, p: Vec): { t: number; n: number } {
  const dx = p.x - fr.start.x;
  const dy = p.y - fr.start.y;
  return { t: dx * fr.u.x + dy * fr.u.y, n: dx * fr.n.x + dy * fr.n.y };
}

/** Rotation (radians, about the vertical axis) that maps local +X onto direction u in a Y-up 3D scene where room Y is scene Z. */
export function yawFor(u: Vec): number {
  return Math.atan2(-u.y, u.x);
}

export function rectFromFrame(fr: Frame, t0: number, t1: number, n0: number, n1: number, z0: number, z1: number): Box {
  const pts = [worldPoint(fr, t0, n0), worldPoint(fr, t1, n0), worldPoint(fr, t0, n1), worldPoint(fr, t1, n1)];
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys), z0, z1 };
}

export function projectBox(fr: Frame, b: Box): { tmin: number; tmax: number; nmin: number; nmax: number } {
  const pts = [
    { x: b.x0, y: b.y0 },
    { x: b.x1, y: b.y0 },
    { x: b.x0, y: b.y1 },
    { x: b.x1, y: b.y1 },
  ].map((p) => localCoords(fr, p));
  return {
    tmin: Math.min(...pts.map((p) => p.t)),
    tmax: Math.max(...pts.map((p) => p.t)),
    nmin: Math.min(...pts.map((p) => p.n)),
    nmax: Math.max(...pts.map((p) => p.n)),
  };
}

export function boxesOverlap(a: Box, b: Box, eps = 0.05): boolean {
  return (
    a.x0 < b.x1 - eps &&
    b.x0 < a.x1 - eps &&
    a.y0 < b.y1 - eps &&
    b.y0 < a.y1 - eps &&
    a.z0 < b.z1 - eps &&
    b.z0 < a.z1 - eps
  );
}

export function placeItem(design: Design, item: PlacedItem): Placed | null {
  const def = getPlannerItem(item.sku);
  if (!def) return null;
  if (def.cornerSize) {
    const c = (item.corner ?? 0) as CornerId;
    const fr = wallFrame(design.room, c);
    const t = fr.length - def.cornerSize;
    return {
      item,
      def,
      frame: fr,
      t,
      box: rectFromFrame(fr, t, fr.length, 0, def.cornerSize, def.zBottom, def.zTop),
      corner: c,
    };
  }
  const fr = surfaceFrame(design, item.surface);
  return {
    item,
    def,
    frame: fr,
    t: item.t,
    box: rectFromFrame(fr, item.t, item.t + def.width, 0, def.depth, def.zBottom, def.zTop),
    corner: null,
  };
}

export function resolveAll(design: Design): Placed[] {
  const out: Placed[] = [];
  for (const it of design.items) {
    const p = placeItem(design, it);
    if (p) out.push(p);
  }
  return out;
}

export function islandBox(design: Design, override?: Partial<Island>): Box {
  const fr = islandFrame(design, override);
  return rectFromFrame(fr, 0, fr.length, 0, ISLAND_DEPTH, 0, BASE_H);
}

function mergeSpans(spans: Span[]): Span[] {
  const s = spans.filter((x) => x[1] > x[0]).sort((a, b) => a[0] - b[0]);
  const out: Span[] = [];
  for (const sp of s) {
    const last = out[out.length - 1];
    if (last && sp[0] <= last[1] + 0.01) last[1] = Math.max(last[1], sp[1]);
    else out.push([sp[0], sp[1]]);
  }
  return out;
}

/** Free intervals along `surface` where a unit like `def` could sit. */
export function freeSpans(design: Design, surface: SurfaceId, def: PlannerItem, excludeId?: string): Span[] {
  if (surface !== "island" && design.room.openWalls.includes(surface)) return [];
  if (surface === "island" && !design.island.enabled) return [];
  const fr = surfaceFrame(design, surface);
  const limit = surface === "island" ? ISLAND_MAX_LENGTH : fr.length;
  const blocks: Span[] = [];
  for (const p of resolveAll(design)) {
    if (p.item.id === excludeId) continue;
    const pr = projectBox(fr, p.box);
    if (pr.nmax <= 0.05 || pr.nmin >= def.depth - 0.05) continue;
    if (p.def.zTop <= def.zBottom + 0.05 || p.def.zBottom >= def.zTop - 0.05) continue;
    blocks.push([pr.tmin, pr.tmax]);
  }
  if (surface !== "island") {
    for (const o of design.room.openings) {
      if (o.wall !== surface) continue;
      if (o.kind === "door") blocks.push([o.t - 1.5, o.t + o.width + 1.5]);
      else if (o.sill < def.zTop - 0.05 && o.sill + o.height > def.zBottom + 0.05) blocks.push([o.t, o.t + o.width]);
    }
  }
  // Island blocks wall runs that would collide with it (walkway aside) — handled by resolveAll above.
  const merged = mergeSpans(blocks);
  const free: Span[] = [];
  let cursor = 0;
  for (const [a, b] of merged) {
    if (a > cursor + 0.05) free.push([cursor, Math.min(a, limit)]);
    cursor = Math.max(cursor, b);
    if (cursor >= limit) break;
  }
  if (cursor < limit - 0.05) free.push([cursor, limit]);
  return free.filter((s) => s[1] - s[0] > 0.05 && s[0] < limit);
}

/** First position on the surface where `def` fits; prefers continuing the existing run. */
export function findSlot(design: Design, surface: SurfaceId, def: PlannerItem): number | null {
  const spans = freeSpans(design, surface, def);
  let runEnd = 0;
  for (const it of design.items) {
    if (it.surface !== surface || it.corner !== undefined) continue;
    const d = getPlannerItem(it.sku);
    if (!d) continue;
    if (d.level !== def.level && !(d.level === "tall" || def.level === "tall")) continue;
    runEnd = Math.max(runEnd, it.t + d.width);
  }
  const fits = spans.filter((s) => s[1] - s[0] >= def.width - 0.01);
  const after = fits.find((s) => s[1] >= runEnd + def.width - 0.01);
  if (after) return Math.max(after[0], runEnd);
  if (fits.length) return fits[0][0];
  return null;
}

/** Nearest legal left-edge position for a unit of `width` given the free spans. */
export function clampToSpans(spans: Span[], width: number, desired: number, snap = 0.5): number | null {
  let best: number | null = null;
  let bestDist = Infinity;
  for (const [a, b] of spans) {
    if (b - a < width - 0.01) continue;
    let t = Math.min(Math.max(desired, a), b - width);
    // magnetic snap to the span edges so runs butt together
    if (Math.abs(t - a) < 2) t = a;
    else if (Math.abs(t - (b - width)) < 2) t = b - width;
    else t = Math.round(t / snap) * snap;
    const dist = Math.abs(t - desired);
    if (dist < bestDist) {
      bestDist = dist;
      best = t;
    }
  }
  return best;
}

export type SurfaceHit = { surface: SurfaceId; t: number; distance: number };

/** Which surface is the pointer closest to (for dragging units around the plan). */
export function nearestSurface(design: Design, p: Vec, def: PlannerItem, allowIsland = true): SurfaceHit | null {
  let best: SurfaceHit | null = null;
  const consider = (surface: SurfaceId, fr: Frame, nCentre: number) => {
    const { t, n } = localCoords(fr, p);
    const band = surface === "island" ? 30 : 40;
    if (n < -10 || n > band) return;
    if (t < -18 || t > fr.length + 18) return;
    const distance = Math.abs(n - nCentre);
    if (!best || distance < best.distance) best = { surface, t: t - def.width / 2, distance };
  };
  for (const w of [0, 1, 2, 3] as WallId[]) {
    if (design.room.openWalls.includes(w)) continue;
    consider(w, wallFrame(design.room, w), def.depth / 2);
  }
  if (allowIsland && design.island.enabled && def.level === "base" && !def.cornerSize) {
    consider("island", islandFrame(design), ISLAND_DEPTH / 2);
  }
  return best;
}

export function nearestCorner(design: Design, p: Vec): CornerId {
  let best: CornerId = 0;
  let bestD = Infinity;
  for (const c of [0, 1, 2, 3] as CornerId[]) {
    const q = cornerPoint(design.room, c);
    const d = (q.x - p.x) ** 2 + (q.y - p.y) ** 2;
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return best;
}

export function cornerIsUsable(design: Design, c: CornerId): boolean {
  return !design.room.openWalls.includes(c) && !design.room.openWalls.includes(nextWall(c));
}

// ---------------------------------------------------------------------------
// Countertops
// ---------------------------------------------------------------------------

export type CounterPiece = { frame: Frame; t0: number; t1: number; n0: number; n1: number; box: Box; corner?: CornerId; surface: SurfaceId };

const COUNTER_CARRIERS = new Set(["base", "drawer", "sink", "specialty", "filler", "corner", "appliance"]);

function carriesCounter(def: PlannerItem): boolean {
  if (def.level !== "base") return false;
  if (def.front === "range" || def.front === "fridge") return false;
  if (def.front === "lazy" || def.front === "blind") return true;
  return COUNTER_CARRIERS.has(def.group);
}

export function counterPieces(design: Design): CounterPiece[] {
  const placed = resolveAll(design);
  const pieces: CounterPiece[] = [];
  const bySurface = new Map<SurfaceId, Placed[]>();
  for (const p of placed) {
    if (!carriesCounter(p.def)) continue;
    if (p.corner !== null) {
      // Corner unit: a square top over the corner with overhang on both inward faces
      const s = p.def.cornerSize ?? p.def.width;
      const fr = p.frame;
      const t0 = fr.length - s;
      const t1 = fr.length;
      pieces.push({
        frame: fr,
        t0: t0 - 1.5,
        t1,
        n0: 0,
        n1: s + 1.5,
        box: rectFromFrame(fr, t0 - 1.5, t1, 0, s + 1.5, BASE_H, COUNTER_H),
        corner: p.corner,
        surface: p.frame.id,
      });
      continue;
    }
    const list = bySurface.get(p.item.surface) ?? [];
    list.push(p);
    bySurface.set(p.item.surface, list);
  }
  for (const [surface, list] of bySurface) {
    list.sort((a, b) => a.t - b.t);
    let run: Placed[] = [];
    const flush = () => {
      if (!run.length) return;
      const fr = run[0].frame;
      const t0 = run[0].t;
      const t1 = run[run.length - 1].t + run[run.length - 1].def.width;
      const isIsland = surface === "island";
      const n0 = isIsland ? -1.5 : 0;
      const n1 = isIsland ? ISLAND_DEPTH + 1.5 : COUNTER_DEPTH;
      const tt0 = isIsland ? t0 - 1.5 : t0;
      const tt1 = isIsland ? t1 + 1.5 : t1;
      pieces.push({ frame: fr, t0: tt0, t1: tt1, n0, n1, box: rectFromFrame(fr, tt0, tt1, n0, n1, BASE_H, COUNTER_H), surface });
      run = [];
    };
    for (const p of list) {
      const last = run[run.length - 1];
      if (last && p.t - (last.t + last.def.width) > 0.75) flush();
      run.push(p);
    }
    flush();
  }
  return pieces;
}

// ---------------------------------------------------------------------------
// Small helpers used by several views
// ---------------------------------------------------------------------------

export function roomBounds(room: Room) {
  return { x0: 0, y0: 0, x1: room.width, y1: room.depth };
}

export function levelOf(def: PlannerItem): Level {
  return def.level;
}

export function itemsOnSurface(design: Design, surface: SurfaceId): PlacedItem[] {
  return design.items.filter((i) => i.surface === surface && i.corner === undefined);
}

export function clampIsland(design: Design, x: number, y: number): { x: number; y: number } {
  const fr = islandFrame(design, { x, y });
  const b = rectFromFrame(fr, 0, fr.length, 0, ISLAND_DEPTH, 0, 1);
  let dx = 0;
  let dy = 0;
  if (b.x0 < 0) dx = -b.x0;
  if (b.x1 > design.room.width) dx = design.room.width - b.x1;
  if (b.y0 < 0) dy = -b.y0;
  if (b.y1 > design.room.depth) dy = design.room.depth - b.y1;
  return { x: Math.round((x + dx) * 2) / 2, y: Math.round((y + dy) * 2) / 2 };
}
