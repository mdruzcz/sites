// Planner state: reducer with undo/redo, design defaults + presets, and localStorage persistence.

import {
  uid,
  type CornerId,
  type Design,
  type DesignNote,
  type Island,
  type Opening,
  type PlacedItem,
  type Room,
  type SavedDesignMeta,
  type SurfaceId,
  type WallId,
  isWall,
} from "./types";
import { getPlannerItem, LEGACY_SKUS } from "./catalog";
import { boxCentre, boxesOverlap, clampFree, clampIsland, clampToSpans, cornerIsUsable, cornerPoint, findSlot, freeSpans, nearestSurface, nextWall, placeItem, prevWall, resolveAll, rotFor } from "./geometry";

export type PlannerAction =
  | { type: "load"; design: Design }
  | { type: "reset"; design?: Design }
  | { type: "rename"; name: string }
  | { type: "set-room"; patch: Partial<Omit<Room, "openings" | "openWalls">> }
  | { type: "apply-preset"; preset: RoomPreset }
  | { type: "toggle-open-wall"; wall: WallId }
  | { type: "add-opening"; opening: Omit<Opening, "id"> & { id?: string } }
  | { type: "update-opening"; id: string; patch: Partial<Opening> }
  | { type: "remove-opening"; id: string }
  | { type: "add-item"; sku: string; surface: SurfaceId; t?: number; corner?: CornerId; id?: string; x?: number; y?: number; rot?: 0 | 1 | 2 | 3 }
  | { type: "move-item"; id: string; surface?: SurfaceId; t?: number; corner?: CornerId; x?: number; y?: number; rot?: 0 | 1 | 2 | 3; transient?: boolean }
  | { type: "nudge-item"; id: string; delta: number }
  | { type: "nudge-free"; id: string; dx: number; dy: number }
  | { type: "rotate-item"; id: string; delta: 1 | -1 }
  | { type: "float-item"; id: string } // wall / island / corner unit → free-standing, keeps its spot
  | { type: "dock-item"; id: string } // free-standing unit → nearest wall, island or corner
  | { type: "remove-item"; id: string }
  | { type: "swap-item"; id: string; sku: string }
  | { type: "duplicate-item"; id: string }
  | { type: "clear-surface"; surface: SurfaceId }
  | { type: "clear-all" }
  | { type: "set-island"; patch: Partial<Island>; transient?: boolean }
  | { type: "add-note"; note: Omit<DesignNote, "id" | "createdAt"> & { id?: string } }
  | { type: "update-note"; id: string; text: string }
  | { type: "remove-note"; id: string }
  | { type: "begin" }
  | { type: "undo" }
  | { type: "redo" }
  | { type: "batch"; actions: PlannerAction[] };

export type PlannerState = {
  design: Design;
  past: Design[];
  future: Design[];
  lastError: string | null;
  tick: number;
};

const HISTORY_LIMIT = 80;

export type RoomPreset = {
  id: string;
  label: string;
  description: string;
  width: number;
  depth: number;
  openWalls: WallId[];
};

export const ROOM_PRESETS: RoomPreset[] = [
  { id: "enclosed", label: "Enclosed kitchen", description: "Four walls — classic closed kitchen", width: 144, depth: 120, openWalls: [] },
  { id: "open-front", label: "Open on one side", description: "Three walls, open to the living area", width: 144, depth: 132, openWalls: [2] },
  { id: "l-open", label: "L-shape, open plan", description: "Two walls meeting in a corner — add an island", width: 156, depth: 144, openWalls: [1, 2] },
  { id: "galley", label: "Galley", description: "Two facing walls with a walkway between", width: 144, depth: 96, openWalls: [1, 3] },
  { id: "single", label: "Single wall", description: "One long wall, open plan", width: 168, depth: 120, openWalls: [1, 2, 3] },
];

export function defaultDesign(): Design {
  const now = Date.now();
  const width = 144;
  const depth = 120;
  return {
    v: 1,
    id: uid(),
    name: "My kitchen",
    createdAt: now,
    updatedAt: now,
    room: {
      width,
      depth,
      ceiling: 96,
      openWalls: [],
      openings: [
        { id: uid(), wall: 0, kind: "window", t: (width - 36) / 2, width: 36, height: 48, sill: 42 },
        { id: uid(), wall: 2, kind: "door", t: 8, width: 32, height: 80, sill: 0 },
      ],
    },
    items: [],
    island: { enabled: false, x: width / 2, y: depth / 2 + 12, facing: 0 },
    notes: [],
  };
}

export function normalizeDesign(raw: unknown): Design {
  const d = (raw ?? {}) as Partial<Design>;
  const base = defaultDesign();
  const room = { ...base.room, ...(d.room ?? {}) } as Room;
  room.width = clampNum(room.width, 48, 480, base.room.width);
  room.depth = clampNum(room.depth, 48, 480, base.room.depth);
  room.ceiling = clampNum(room.ceiling, 84, 144, 96);
  room.openWalls = Array.isArray(room.openWalls) ? room.openWalls.filter((w): w is WallId => [0, 1, 2, 3].includes(w as number)) : [];
  room.openings = Array.isArray(room.openings)
    ? room.openings
        .filter((o) => o && typeof o.t === "number" && [0, 1, 2, 3].includes(o.wall as number))
        .map((o) => ({
          id: o.id || uid(),
          wall: o.wall as WallId,
          kind: o.kind === "door" ? "door" : "window",
          t: o.t,
          width: clampNum(o.width, 12, 240, 36),
          height: clampNum(o.height, 12, 120, o.kind === "door" ? 80 : 48),
          sill: clampNum(o.sill, 0, 96, o.kind === "door" ? 0 : 42),
        }))
    : [];
  const items: PlacedItem[] = Array.isArray(d.items)
    ? d.items
        .map((i) => (i && typeof i.sku === "string" && LEGACY_SKUS[i.sku] ? { ...i, sku: LEGACY_SKUS[i.sku] } : i))
        .filter((i) => i && typeof i.sku === "string" && getPlannerItem(i.sku))
        .map((i) => ({
          id: i.id || uid(),
          sku: i.sku,
          surface: i.surface === "island" ? "island" : i.surface === "free" ? "free" : ([0, 1, 2, 3].includes(i.surface as number) ? (i.surface as WallId) : 0),
          t: typeof i.t === "number" ? i.t : 0,
          ...(typeof i.corner === "number" && i.surface !== "free" ? { corner: i.corner as CornerId } : {}),
          ...(i.surface === "free" ? { x: clampNum(i.x, 0, 480, room.width / 2), y: clampNum(i.y, 0, 480, room.depth / 2), rot: ([0, 1, 2, 3].includes(i.rot as number) ? i.rot : 0) as 0 | 1 | 2 | 3 } : {}),
        }))
    : [];
  const island: Island = { ...base.island, ...(d.island ?? {}) };
  island.facing = ([0, 1, 2, 3].includes(island.facing as number) ? island.facing : 0) as Island["facing"];
  const notes: DesignNote[] = Array.isArray(d.notes)
    ? d.notes.filter((n) => n && typeof n.text === "string").map((n) => ({ id: n.id || uid(), text: n.text, itemId: n.itemId, createdAt: n.createdAt || Date.now() }))
    : [];
  return {
    v: 1,
    id: typeof d.id === "string" && d.id ? d.id : uid(),
    name: typeof d.name === "string" && d.name.trim() ? d.name.trim().slice(0, 80) : base.name,
    createdAt: typeof d.createdAt === "number" ? d.createdAt : Date.now(),
    updatedAt: typeof d.updatedAt === "number" ? d.updatedAt : Date.now(),
    room,
    items,
    island,
    notes,
  };
}

function clampNum(v: unknown, min: number, max: number, fallback: number): number {
  const n = typeof v === "number" && Number.isFinite(v) ? v : fallback;
  return Math.min(max, Math.max(min, n));
}

export function initialState(design?: Design): PlannerState {
  return { design: design ?? defaultDesign(), past: [], future: [], lastError: null, tick: 0 };
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

type Result = { design: Design; error?: string; noHistory?: boolean };

function applyDesign(design: Design, action: PlannerAction): Result {
  switch (action.type) {
    case "load":
    case "reset":
      return { design: action.type === "load" ? action.design : (action.design ?? defaultDesign()) };

    case "rename":
      return { design: { ...design, name: action.name.slice(0, 80) } };

    case "set-room": {
      const room = { ...design.room, ...action.patch };
      room.width = clampNum(room.width, 48, 480, design.room.width);
      room.depth = clampNum(room.depth, 48, 480, design.room.depth);
      room.ceiling = clampNum(room.ceiling, 84, 144, design.room.ceiling);
      const next = { ...design, room };
      // keep openings inside their walls
      next.room.openings = room.openings.map((o) => {
        const len = o.wall === 0 || o.wall === 2 ? room.width : room.depth;
        return { ...o, t: Math.max(0, Math.min(o.t, len - o.width)) };
      });
      const isl = clampIsland(next, next.island.x, next.island.y);
      next.island = { ...next.island, ...isl };
      return { design: next };
    }

    case "apply-preset": {
      const p = action.preset;
      const room: Room = {
        ...design.room,
        width: p.width,
        depth: p.depth,
        openWalls: [...p.openWalls],
        openings: design.room.openings.filter((o) => !p.openWalls.includes(o.wall)),
      };
      room.openings = room.openings.map((o) => {
        const len = o.wall === 0 || o.wall === 2 ? room.width : room.depth;
        return { ...o, t: Math.max(0, Math.min(o.t, len - o.width)) };
      });
      let next: Design = { ...design, room };
      next = { ...next, items: next.items.filter((i) => !itemTouchesOpenWall(i, room.openWalls)) };
      next.island = { ...next.island, ...clampIsland(next, next.island.x, next.island.y) };
      return { design: next };
    }

    case "toggle-open-wall": {
      const open = design.room.openWalls.includes(action.wall)
        ? design.room.openWalls.filter((w) => w !== action.wall)
        : [...design.room.openWalls, action.wall];
      if (open.length === 4) return { design, error: "A kitchen needs at least one wall." };
      const room = { ...design.room, openWalls: open, openings: design.room.openings.filter((o) => !open.includes(o.wall)) };
      const items = design.items.filter((i) => !itemTouchesOpenWall(i, open));
      return { design: { ...design, room, items } };
    }

    case "add-opening": {
      const o = action.opening;
      const len = o.wall === 0 || o.wall === 2 ? design.room.width : design.room.depth;
      const opening: Opening = {
        id: o.id ?? uid(),
        wall: o.wall,
        kind: o.kind,
        width: clampNum(o.width, 12, len, 36),
        height: clampNum(o.height, 12, design.room.ceiling, o.kind === "door" ? 80 : 48),
        sill: o.kind === "door" ? 0 : clampNum(o.sill, 0, design.room.ceiling - 12, 42),
        t: clampNum(o.t, 0, Math.max(0, len - o.width), 0),
      };
      return { design: { ...design, room: { ...design.room, openings: [...design.room.openings, opening] } } };
    }

    case "update-opening": {
      const openings = design.room.openings.map((o) => {
        if (o.id !== action.id) return o;
        const merged = { ...o, ...action.patch };
        const len = merged.wall === 0 || merged.wall === 2 ? design.room.width : design.room.depth;
        merged.width = clampNum(merged.width, 12, len, o.width);
        merged.height = clampNum(merged.height, 12, design.room.ceiling, o.height);
        merged.sill = merged.kind === "door" ? 0 : clampNum(merged.sill, 0, design.room.ceiling - 12, o.sill);
        merged.t = clampNum(merged.t, 0, Math.max(0, len - merged.width), 0);
        return merged;
      });
      return { design: { ...design, room: { ...design.room, openings } } };
    }

    case "remove-opening":
      return { design: { ...design, room: { ...design.room, openings: design.room.openings.filter((o) => o.id !== action.id) } } };

    case "add-item": {
      const def = getPlannerItem(action.sku);
      if (!def) return { design, error: "Unknown cabinet." };
      const id = action.id ?? uid();
      if (action.surface === "free") {
        if (def.level === "wall") return { design, error: "Wall cabinets need a wall behind them — only base, tall and corner units can stand free." };
        return addFree(design, def, id, action.x, action.y, action.rot ?? 0);
      }
      if (def.cornerSize) {
        const corner = action.corner ?? firstFreeCorner(design, def.level);
        if (corner === null || !cornerIsUsable(design, corner) || (action.corner !== undefined && cornerOccupied(design, corner, def.level))) {
          // No usable corner (open-plan room, or every corner taken): place it free-standing so it can anchor an island.
          const r = addFree(design, def, id, action.x, action.y, action.rot ?? 0);
          return r.error ? r : { ...r, error: `${def.short} placed free-standing — drag it anywhere to build an island, or use “Attach to wall” in the side panel.` };
        }
        if (cornerOccupied(design, corner, def.level)) return { design, error: "That corner already has a corner cabinet." };
        const item: PlacedItem = { id, sku: def.id, surface: corner, t: 0, corner };
        const blocker = cornerBlockedBy(design, item);
        if (blocker) return { design, error: `${blocker} is in the way of that corner — move it first.` };
        return { design: { ...design, items: [...design.items, item] } };
      }
      if (action.surface === "island" && !design.island.enabled) return { design, error: "Turn the island on first." };
      if (action.surface === "island" && def.level !== "base") return { design, error: "Only base cabinets can go on an island." };
      if (isWall(action.surface) && design.room.openWalls.includes(action.surface)) return { design, error: "That side of the room is open — pick a wall." };
      const spans = freeSpans(design, action.surface, def);
      const t = action.t !== undefined ? clampToSpans(spans, def.width, action.t) : findSlot(design, action.surface, def);
      if (t === null) return { design, error: `No room left for a ${def.width}″ unit there.` };
      const item: PlacedItem = { id, sku: def.id, surface: action.surface, t };
      return { design: { ...design, items: [...design.items, item] } };
    }

    case "move-item": {
      const item = design.items.find((i) => i.id === action.id);
      if (!item) return { design };
      const def = getPlannerItem(item.sku);
      if (!def) return { design };
      const wantsFree = action.surface === "free" || (action.surface === undefined && item.surface === "free" && action.corner === undefined);
      if (wantsFree) {
        if (def.level === "wall") return { design, noHistory: action.transient, error: action.transient ? undefined : "Wall cabinets need a wall behind them." };
        const rot = (action.rot ?? item.rot ?? 0) as 0 | 1 | 2 | 3;
        const cur = placeItem(design, item);
        const c = cur ? boxCentre(cur.box) : { x: design.room.width / 2, y: design.room.depth / 2 };
        const draft: PlacedItem = { id: item.id, sku: item.sku, surface: "free", t: 0, x: action.x ?? item.x ?? c.x, y: action.y ?? item.y ?? c.y, rot };
        const pos = clampFree(design, draft, def, draft.x!, draft.y!);
        const next: PlacedItem = { ...draft, ...pos };
        if (item.surface === "free" && item.x === next.x && item.y === next.y && item.rot === next.rot) return { design, noHistory: action.transient };
        return { design: { ...design, items: design.items.map((i) => (i.id === item.id ? next : i)) }, noHistory: action.transient };
      }
      if (def.cornerSize) {
        const corner = action.corner ?? item.corner ?? 0;
        if (corner === item.corner) return { design, noHistory: action.transient };
        if (!cornerIsUsable(design, corner)) return { design, error: "That corner is open — corner cabinets need two walls.", noHistory: action.transient };
        if (cornerOccupied(design, corner, def.level, item.id)) return { design, error: "That corner already has a corner cabinet.", noHistory: action.transient };
        const blocker = cornerBlockedBy(design, { ...item, corner, surface: corner });
        if (blocker) return { design, error: `${blocker} is in the way of that corner — move it first.`, noHistory: action.transient };
        return { design: { ...design, items: design.items.map((i) => (i.id === item.id ? { id: i.id, sku: i.sku, t: 0, corner, surface: corner } : i)) }, noHistory: action.transient };
      }
      const surface = action.surface ?? item.surface;
      if (surface === "free") return { design, noHistory: action.transient };
      if (surface === "island" && (!design.island.enabled || def.level !== "base")) return { design, noHistory: action.transient };
      if (isWall(surface) && design.room.openWalls.includes(surface)) return { design, noHistory: action.transient };
      const spans = freeSpans(design, surface, def, item.id);
      const t = clampToSpans(spans, def.width, action.t ?? item.t);
      if (t === null) return { design, noHistory: action.transient };
      if (t === item.t && surface === item.surface) return { design, noHistory: action.transient };
      return { design: { ...design, items: design.items.map((i) => (i.id === item.id ? { id: i.id, sku: i.sku, surface, t } : i)) }, noHistory: action.transient };
    }

    case "nudge-free": {
      const item = design.items.find((i) => i.id === action.id);
      if (!item || item.surface !== "free") return { design };
      return applyDesign(design, { type: "move-item", id: item.id, surface: "free", x: (item.x ?? 0) + action.dx, y: (item.y ?? 0) + action.dy });
    }

    case "rotate-item": {
      const item = design.items.find((i) => i.id === action.id);
      if (!item || item.surface !== "free") return { design, error: "Only free-standing units rotate — wall units face into the room." };
      const rot = ((((item.rot ?? 0) + action.delta) % 4) + 4) % 4;
      return applyDesign(design, { type: "move-item", id: item.id, surface: "free", rot: rot as 0 | 1 | 2 | 3 });
    }

    case "float-item": {
      const item = design.items.find((i) => i.id === action.id);
      const def = item && getPlannerItem(item.sku);
      if (!item || !def) return { design };
      if (item.surface === "free") return { design };
      if (def.level === "wall") return { design, error: "Wall cabinets need a wall behind them — only base, tall and corner units can stand free." };
      const cur = placeItem(design, item);
      if (!cur) return { design };
      const c = boxCentre(cur.box);
      return applyDesign(design, { type: "move-item", id: item.id, surface: "free", x: c.x, y: c.y, rot: rotFor(cur.frame.n) });
    }

    case "dock-item": {
      const item = design.items.find((i) => i.id === action.id);
      const def = item && getPlannerItem(item.sku);
      if (!item || !def || item.surface !== "free") return { design };
      const cur = placeItem(design, item);
      if (!cur) return { design };
      const c = boxCentre(cur.box);
      if (def.cornerSize) {
        let best: CornerId | null = null;
        let bestD = Infinity;
        for (const k of [0, 1, 2, 3] as CornerId[]) {
          if (!cornerIsUsable(design, k) || cornerOccupied(design, k, def.level, item.id)) continue;
          const q = cornerPoint(design.room, k);
          const d = (q.x - c.x) ** 2 + (q.y - c.y) ** 2;
          if (d < bestD) {
            bestD = d;
            best = k;
          }
        }
        if (best === null) return { design, error: "No free corner with two walls to attach it to." };
        return applyDesign(design, { type: "move-item", id: item.id, corner: best });
      }
      const hit = nearestSurface(design, c, def, true, 120);
      if (!hit) return { design, error: "No wall close enough — drag it nearer a wall first." };
      return applyDesign(design, { type: "move-item", id: item.id, surface: hit.surface, t: hit.t });
    }

    case "nudge-item": {
      const item = design.items.find((i) => i.id === action.id);
      if (!item || item.corner !== undefined) return { design };
      return applyDesign(design, { type: "move-item", id: item.id, t: item.t + action.delta });
    }

    case "remove-item":
      return {
        design: {
          ...design,
          items: design.items.filter((i) => i.id !== action.id),
          notes: design.notes.map((n) => (n.itemId === action.id ? { ...n, itemId: undefined } : n)),
        },
      };

    case "swap-item": {
      const item = design.items.find((i) => i.id === action.id);
      const def = getPlannerItem(action.sku);
      if (!item || !def) return { design };
      if (item.surface === "free") {
        if (def.level === "wall") return { design, error: "Wall cabinets can't stand free." };
        const pos = clampFree(design, { ...item, sku: def.id }, def, item.x ?? 0, item.y ?? 0);
        return { design: { ...design, items: design.items.map((i) => (i.id === item.id ? { ...i, sku: def.id, ...pos } : i)) } };
      }
      if (def.cornerSize) {
        if (item.corner === undefined) return { design, error: "Use a regular cabinet here, not a corner unit." };
        return { design: { ...design, items: design.items.map((i) => (i.id === item.id ? { ...i, sku: def.id } : i)) } };
      }
      const spans = freeSpans(design, item.surface, def, item.id);
      const t = clampToSpans(spans, def.width, item.t);
      if (t === null) return { design, error: `A ${def.width}″ unit doesn't fit here.` };
      return { design: { ...design, items: design.items.map((i) => (i.id === item.id ? { ...i, sku: def.id, t } : i)) } };
    }

    case "duplicate-item": {
      const item = design.items.find((i) => i.id === action.id);
      if (!item) return { design };
      const def = getPlannerItem(item.sku);
      if (!def) return { design };
      if (item.surface === "free") {
        const cur = placeItem(design, item);
        const fr = cur?.frame;
        const { w } = { w: def.cornerSize ?? def.width };
        return applyDesign(design, { type: "add-item", sku: def.id, surface: "free", x: (item.x ?? 0) + (fr?.u.x ?? 1) * w, y: (item.y ?? 0) + (fr?.u.y ?? 0) * w, rot: item.rot ?? 0 });
      }
      if (def.cornerSize) return applyDesign(design, { type: "add-item", sku: def.id, surface: item.surface });
      return applyDesign(design, { type: "add-item", sku: def.id, surface: item.surface, t: item.t + def.width });
    }

    case "clear-surface": {
      const items = design.items.filter((i) => {
        if (i.surface === action.surface && i.corner === undefined) return false;
        if (i.corner !== undefined && isWall(action.surface) && (i.corner === action.surface || nextWall(i.corner) === action.surface)) return false;
        return true;
      });
      return { design: { ...design, items } };
    }

    case "clear-all":
      return { design: { ...design, items: [], notes: design.notes.map((n) => ({ ...n, itemId: undefined })) } };

    case "set-island": {
      let island = { ...design.island, ...action.patch };
      let items = design.items;
      const next: Design = { ...design, island };
      if (action.patch.x !== undefined || action.patch.y !== undefined) {
        island = { ...island, ...clampIsland(next, island.x, island.y) };
      }
      if (action.patch.enabled === false) items = items.filter((i) => i.surface !== "island");
      if (action.patch.enabled === true && !design.island.enabled) {
        const pos = clampIsland(next, design.room.width / 2, design.room.depth / 2 + 12);
        island = { ...island, ...pos };
      }
      return { design: { ...next, island, items }, noHistory: action.transient };
    }

    case "add-note": {
      const note: DesignNote = { id: action.note.id ?? uid(), text: action.note.text.slice(0, 2000), itemId: action.note.itemId, createdAt: Date.now() };
      return { design: { ...design, notes: [...design.notes, note] } };
    }
    case "update-note":
      return { design: { ...design, notes: design.notes.map((n) => (n.id === action.id ? { ...n, text: action.text.slice(0, 2000) } : n)) } };
    case "remove-note":
      return { design: { ...design, notes: design.notes.filter((n) => n.id !== action.id) } };

    case "batch": {
      let d = design;
      let error: string | undefined;
      for (const a of action.actions) {
        const r = applyDesign(d, a);
        d = r.design;
        if (r.error && !error) error = r.error;
      }
      return { design: d, error };
    }

    default:
      return { design };
  }
}

function itemTouchesOpenWall(i: PlacedItem, open: WallId[]): boolean {
  if (i.surface === "free") return false;
  if (i.corner !== undefined) return open.includes(i.corner) || open.includes(nextWall(i.corner));
  return isWall(i.surface) && open.includes(i.surface);
}

/** Place a free-standing unit at (x, y) — or the nearest clear spot in an expanding ring around it. */
function addFree(design: Design, def: ReturnType<typeof getPlannerItem> & object, id: string, x?: number, y?: number, rot: 0 | 1 | 2 | 3 = 0): Result {
  const cx = x ?? design.room.width / 2;
  const cy = y ?? design.room.depth / 2;
  const others = resolveAll(design);
  const tryAt = (px: number, py: number): PlacedItem | null => {
    const draft: PlacedItem = { id, sku: def.id, surface: "free", t: 0, x: px, y: py, rot };
    const pos = clampFree(design, draft, def, px, py);
    const item = { ...draft, ...pos };
    const placed = placeItem(design, item);
    if (!placed) return null;
    return others.some((o) => boxesOverlap(placed.box, o.box)) ? null : item;
  };
  let item = tryAt(cx, cy);
  for (let r = 6; !item && r <= 144; r += 6) {
    for (const [dx, dy] of [[r, 0], [-r, 0], [0, r], [0, -r], [r, r], [-r, r], [r, -r], [-r, -r]]) {
      item = tryAt(cx + dx, cy + dy);
      if (item) break;
    }
  }
  if (!item) {
    // room is packed — drop it where asked and let the design check flag the overlap
    const draft: PlacedItem = { id, sku: def.id, surface: "free", t: 0, x: cx, y: cy, rot };
    item = { ...draft, ...clampFree(design, draft, def, cx, cy) };
  }
  return { design: { ...design, items: [...design.items, item] } };
}

function cornerOccupied(design: Design, corner: CornerId, level: string, exceptId?: string): boolean {
  return design.items.some((i) => {
    if (i.corner !== corner || i.id === exceptId) return false;
    const d = getPlannerItem(i.sku);
    return !!d && d.level === level;
  });
}

/** Name of the first unit a corner cabinet would land on, or null if the corner is clear. */
function cornerBlockedBy(design: Design, item: PlacedItem): string | null {
  const placed = placeItem(design, item);
  if (!placed) return null;
  for (const other of resolveAll(design)) {
    if (other.item.id === item.id) continue;
    if (boxesOverlap(placed.box, other.box)) return other.def.short;
  }
  return null;
}

function firstFreeCorner(design: Design, level: string): CornerId | null {
  for (const c of [0, 3, 1, 2] as CornerId[]) {
    if (cornerIsUsable(design, c) && !cornerOccupied(design, c, level)) return c;
  }
  return null;
}

export function plannerReducer(state: PlannerState, action: PlannerAction): PlannerState {
  switch (action.type) {
    case "begin":
      return { ...state, past: pushHistory(state.past, state.design), future: [], lastError: null };
    case "undo": {
      if (!state.past.length) return state;
      const prev = state.past[state.past.length - 1];
      return { ...state, design: prev, past: state.past.slice(0, -1), future: [state.design, ...state.future].slice(0, HISTORY_LIMIT), lastError: null, tick: state.tick + 1 };
    }
    case "redo": {
      if (!state.future.length) return state;
      const [next, ...rest] = state.future;
      return { ...state, design: next, past: pushHistory(state.past, state.design), future: rest, lastError: null, tick: state.tick + 1 };
    }
    default: {
      const r = applyDesign(state.design, action);
      if (r.design === state.design) return { ...state, lastError: r.error ?? null, tick: r.error ? state.tick + 1 : state.tick };
      const design = { ...r.design, updatedAt: Date.now() };
      if (action.type === "load" || action.type === "reset") {
        return { design, past: [], future: [], lastError: null, tick: state.tick + 1 };
      }
      const past = r.noHistory ? state.past : pushHistory(state.past, state.design);
      return { design, past, future: r.noHistory ? state.future : [], lastError: r.error ?? null, tick: state.tick + 1 };
    }
  }
}

function pushHistory(past: Design[], d: Design): Design[] {
  const next = [...past, d];
  return next.length > HISTORY_LIMIT ? next.slice(next.length - HISTORY_LIMIT) : next;
}

// ---------------------------------------------------------------------------
// Persistence (localStorage)
// ---------------------------------------------------------------------------

const CURRENT_KEY = "rta_planner_current_v1";
const SAVED_KEY = "rta_planner_saved_v1";
const SAVED_LIMIT = 24;

export function loadCurrent(): Design | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CURRENT_KEY);
    return raw ? normalizeDesign(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function saveCurrent(d: Design) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CURRENT_KEY, JSON.stringify(d));
  } catch {
    /* quota or private mode — ignore */
  }
}

function readSaved(): Design[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_KEY);
    const parsed = raw ? (JSON.parse(raw) as { v: number; designs: unknown[] }) : null;
    if (!parsed || !Array.isArray(parsed.designs)) return [];
    return parsed.designs.map((d) => normalizeDesign(d));
  } catch {
    return [];
  }
}

function writeSaved(list: Design[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify({ v: 1, designs: list.slice(0, SAVED_LIMIT) }));
  } catch {
    /* ignore */
  }
}

export function listSaved(): SavedDesignMeta[] {
  return readSaved()
    .map((d) => ({ id: d.id, name: d.name, updatedAt: d.updatedAt, itemCount: d.items.length }))
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function loadSaved(id: string): Design | null {
  return readSaved().find((d) => d.id === id) ?? null;
}

export function saveNamed(d: Design) {
  const list = readSaved().filter((x) => x.id !== d.id);
  writeSaved([{ ...d, updatedAt: Date.now() }, ...list]);
}

export function deleteSaved(id: string) {
  writeSaved(readSaved().filter((d) => d.id !== id));
}

export function describeSurface(s: SurfaceId): string {
  if (s === "island") return "Island";
  if (s === "free") return "Free-standing island";
  return ["Back wall", "Right wall", "Front wall", "Left wall"][s];
}

export { nextWall, prevWall };
