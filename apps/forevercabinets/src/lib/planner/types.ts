// Kitchen Planner — shared data model.
// All dimensions are in inches. Room origin is the back-left corner; X runs along the
// back wall to the right, Y runs toward the front of the room (toward the viewer of a floor plan).

export type WallId = 0 | 1 | 2 | 3; // 0 back, 1 right, 2 front, 3 left (clockwise from the back wall)
export type CornerId = 0 | 1 | 2 | 3; // corner c sits where wall c ends and wall c+1 begins
export type SurfaceId = WallId | "island";
export type Level = "base" | "wall" | "tall";

export const WALL_IDS: WallId[] = [0, 1, 2, 3];
export const WALL_NAMES: Record<WallId, string> = {
  0: "Back wall",
  1: "Right wall",
  2: "Front wall",
  3: "Left wall",
};
export const WALL_SHORT: Record<WallId, string> = { 0: "A", 1: "B", 2: "C", 3: "D" };
export const CORNER_NAMES: Record<CornerId, string> = {
  0: "Back-right corner",
  1: "Front-right corner",
  2: "Front-left corner",
  3: "Back-left corner",
};

export type OpeningKind = "window" | "door";

export type Opening = {
  id: string;
  wall: WallId;
  kind: OpeningKind;
  t: number; // offset from the wall's start (left edge when looking at the wall from inside the room)
  width: number;
  height: number;
  sill: number; // height of the bottom edge above the floor (0 for doors)
};

export type Room = {
  width: number; // back wall length (X)
  depth: number; // side wall length (Y)
  ceiling: number;
  openWalls: WallId[]; // walls that don't exist (open-plan side) — nothing can be mounted there
  openings: Opening[];
};

export type PlacedItem = {
  id: string;
  sku: string; // catalog SKU or a planner spacer id (e.g. "SPACER-RANGE-30")
  surface: SurfaceId;
  t: number; // left edge offset along the surface
  corner?: CornerId; // corner cabinets ignore surface/t and sit in this corner
};

export type Island = {
  enabled: boolean;
  x: number; // centre of the island footprint
  y: number;
  facing: 0 | 1 | 2 | 3; // which way the doors face: 0 = front wall, 1 = left wall, 2 = back wall, 3 = right wall
};

export type DesignNote = {
  id: string;
  text: string;
  itemId?: string; // optional: pinned to a placed cabinet
  createdAt: number;
};

export type Design = {
  v: 1;
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  room: Room;
  items: PlacedItem[];
  island: Island;
  notes: DesignNote[];
};

export type SavedDesignMeta = {
  id: string;
  name: string;
  updatedAt: number;
  itemCount: number;
};

export function uid(): string {
  return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-3);
}

export function formatInches(v: number): string {
  const whole = Math.floor(v);
  const frac = v - whole;
  const eighths = Math.round(frac * 8);
  const map: Record<number, string> = { 1: "⅛", 2: "¼", 3: "⅜", 4: "½", 5: "⅝", 6: "¾", 7: "⅞" };
  if (eighths === 0) return `${whole}″`;
  if (eighths === 8) return `${whole + 1}″`;
  return whole === 0 ? `${map[eighths]}″` : `${whole}${map[eighths]}″`;
}

export function formatFeet(v: number): string {
  const ft = Math.floor(v / 12);
  const inch = Math.round((v - ft * 12) * 4) / 4;
  if (ft === 0) return formatInches(inch);
  if (inch === 0) return `${ft}′`;
  return `${ft}′ ${formatInches(inch)}`;
}
