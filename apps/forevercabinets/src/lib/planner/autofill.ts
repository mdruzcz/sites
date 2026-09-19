// Auto-fill a wall (or the island) using the exact-fit solver from the original visualizer.

import { planWall, type Preferences } from "@/lib/visualizer";
import type { Design, SurfaceId } from "./types";
import { getPlannerItem, getPlannerItems, type PlannerItem } from "./catalog";
import { clampToSpans, freeSpans } from "./geometry";
import type { PlannerAction } from "./store";

export type AutofillOptions = {
  mix: Preferences["cabinetMix"];
  includeSink: boolean;
  includeDishwasher: boolean;
  includeRange: boolean;
  includeWallCabinets: boolean;
};

export const DEFAULT_AUTOFILL: AutofillOptions = {
  mix: "mostly-base-some-drawer",
  includeSink: true,
  includeDishwasher: true,
  includeRange: true,
  includeWallCabinets: true,
};

export type AutofillResult = { actions: PlannerAction[]; summary: string; span: [number, number] | null };

type Seq = { sku: string; width: number };

/** Standard 36"-tall, 12"-deep wall cabinets by width. */
function standardWalls(): Map<number, PlannerItem> {
  const map = new Map<number, PlannerItem>();
  for (const it of getPlannerItems()) {
    if (it.level === "wall" && it.front !== "glass" && it.front !== "open" && it.height === 36 && it.depth === 12 && !it.cornerSize && it.group === "wall") {
      map.set(it.width, it);
    }
  }
  return map;
}

/** Wall cabinets to hang above a base unit of `width` (exact width, else two that add up). */
function wallsFor(width: number, walls: Map<number, PlannerItem>): PlannerItem[] {
  const exact = walls.get(width);
  if (exact) return [exact];
  const widths = [...walls.keys()].sort((a, b) => b - a);
  for (const a of widths) {
    const b = width - a;
    if (b >= 9 && walls.has(b)) return [walls.get(a)!, walls.get(b)!];
  }
  return [];
}

export function autofillSurface(design: Design, surface: SurfaceId, opts: AutofillOptions): AutofillResult {
  const probeBase = getPlannerItem("B24")!;
  const probeWall = getPlannerItem("W2436")!;
  const spans = freeSpans(design, surface, probeBase);
  if (!spans.length) return { actions: [], summary: "No free space on that surface.", span: null };
  const span = spans.reduce((a, b) => (b[1] - b[0] > a[1] - a[0] ? b : a));
  const isIsland = surface === "island";
  const length = Math.floor(isIsland ? Math.min(span[1] - span[0], 120) : span[1] - span[0]);
  if (length < 12) return { actions: [], summary: "The free space is too small to fill.", span };

  const includeSink = opts.includeSink && !isIsland;
  const includeDw = includeSink && opts.includeDishwasher && length >= 33 + 24 + 12;
  const includeRange = opts.includeRange && !isIsland && length >= 30 + 24;
  const reserved = (includeDw ? 24 : 0) + (includeRange ? 30 : 0);
  const solverLength = Math.max(12, length - reserved);

  const plan = planWall({
    wallLength: solverLength,
    cabinetMix: opts.mix,
    includeSink: includeSink && solverLength >= 33 + 12 ? 33 : false,
    includeLazySusan: false,
    includeBlindCorner: false,
    includeWallCabinets: false,
  });

  // Base sequence: solver pieces, with the dishwasher right after the sink and the range mid-run.
  const seq: Seq[] = plan.pieces.map((p) => ({ sku: p.cabinet.sku, width: p.width_in }));
  if (includeDw) {
    const sinkIdx = seq.findIndex((s) => s.sku.startsWith("SB"));
    seq.splice(sinkIdx >= 0 ? sinkIdx + 1 : seq.length, 0, { sku: "SPACER-DW-24", width: 24 });
  }
  if (includeRange) {
    let idx = Math.max(1, Math.floor(seq.length / 3));
    while (idx < seq.length && (seq[idx].sku.startsWith("SB") || seq[idx].sku.startsWith("SPACER"))) idx++;
    seq.splice(Math.min(idx, seq.length), 0, { sku: "SPACER-RANGE-30", width: 30 });
  }

  const actions: PlannerAction[] = [];
  const placedBase: Array<Seq & { t: number }> = [];
  let t = span[0];
  for (const s of seq) {
    if (!getPlannerItem(s.sku)) continue;
    if (t + s.width > span[1] + 0.05) break;
    actions.push({ type: "add-item", sku: s.sku, surface, t });
    placedBase.push({ ...s, t });
    t += s.width;
  }
  const placedWidth = placedBase.reduce((sum, p) => sum + p.width, 0);

  // Wall cabinets: hang one (or two) above each base unit, skipping the sink (window) and anything blocked.
  let wallCount = 0;
  if (opts.includeWallCabinets && !isIsland) {
    const walls = standardWalls();
    const wallSpans = freeSpans(design, surface, probeWall);
    const w3018 = getPlannerItem("W3018");
    for (const b of placedBase) {
      if (b.sku.startsWith("SB")) continue; // leave the window over the sink open
      let picks: PlannerItem[];
      if (b.sku === "SPACER-RANGE-30") picks = w3018 ? [w3018] : [];
      else picks = wallsFor(b.width, walls);
      let wt = b.t;
      for (const def of picks) {
        const pos = clampToSpans(wallSpans, def.width, wt);
        if (pos !== null && Math.abs(pos - wt) < 0.6) {
          actions.push({ type: "add-item", sku: def.id, surface, t: pos });
          wallCount++;
          // mark the span as used so the next pick can't land on top of it
          for (const sp of wallSpans) {
            if (pos >= sp[0] - 0.01 && pos + def.width <= sp[1] + 0.01) {
              const tail: [number, number] = [pos + def.width, sp[1]];
              sp[1] = pos;
              if (tail[1] - tail[0] > 0.5) wallSpans.push(tail);
              break;
            }
          }
        }
        wt += def.width;
      }
    }
  }

  const summary = `Filled ${Math.round(placedWidth)}″ with ${placedBase.length} base unit${placedBase.length === 1 ? "" : "s"}${wallCount ? ` and ${wallCount} wall cabinet${wallCount === 1 ? "" : "s"}` : ""}.`;
  return { actions, summary, span };
}
