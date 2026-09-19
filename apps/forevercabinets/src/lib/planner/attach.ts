// Attach a design to the quote request (stored in localStorage, read by the quote form).

import type { Design, SurfaceId, WallId } from "./types";
import { formatFeet } from "./types";
import type { Review } from "./review";
import { resolveAll, nextWall } from "./geometry";

export const ATTACH_KEY = "fc_planner_attach_v1";

export type DesignAttachment = {
  id: string;
  name: string;
  link: string;
  summary: string;
  notes: string[];
  savedAt: number;
};

export function buildAttachment(design: Design, review: Review, link: string): DesignAttachment {
  const room = design.room;
  const parts = review.parts.map((p) => `${p.qty}× ${p.sku}`).join(", ");
  return {
    id: design.id,
    name: design.name,
    link,
    summary: `${review.stats.units} cabinets · room ${formatFeet(room.width)} × ${formatFeet(room.depth)} · ${design.island.enabled ? "with island" : "no island"} · ${parts}`,
    notes: design.notes.map((n) => n.text),
    savedAt: Date.now(),
  };
}

export function storeAttachment(a: DesignAttachment) {
  try {
    window.localStorage.setItem(ATTACH_KEY, JSON.stringify(a));
  } catch {
    /* ignore */
  }
}

export function readAttachment(): DesignAttachment | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ATTACH_KEY);
    if (!raw) return null;
    const a = JSON.parse(raw) as DesignAttachment;
    return a && typeof a.link === "string" ? a : null;
  } catch {
    return null;
  }
}

export function clearAttachment() {
  try {
    window.localStorage.removeItem(ATTACH_KEY);
  } catch {
    /* ignore */
  }
}

/** Surfaces that have something on them (for elevations). */
export function surfacesWithUnits(design: Design): SurfaceId[] {
  const placed = resolveAll(design);
  const out: SurfaceId[] = [];
  for (const w of [0, 1, 2, 3] as WallId[]) {
    if (design.room.openWalls.includes(w)) continue;
    const has = placed.some((p) => (p.corner === null ? p.item.surface === w : p.corner === w || nextWall(p.corner) === w));
    if (has) out.push(w);
  }
  if (design.island.enabled && placed.some((p) => p.item.surface === "island")) out.push("island");
  return out;
}
