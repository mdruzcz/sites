// Track-colour check for checkout. Pure functions, safe to import from client
// components.
//
// SAME FILE in every store that uses src/lib/orders — keep the copies identical.
//
// Why it exists: the aluminum track is the only part of the system you see in
// daylight, it is cut and screwed to the house, and a kit in the wrong colour
// means a second shipment. Customers have ordered the wrong colour more than
// once, so checkout shows the colour of every colour-matched line and will not
// take payment until the customer ticks that it is right.

export type TrackColourKey = "black" | "white" | "wicker" | "brown";

export interface TrackColour {
  key: TrackColourKey;
  label: string;
  /** Approximate powder-coat colour, for the swatch only. */
  hex: string;
}

export const TRACK_COLOURS: Record<TrackColourKey, TrackColour> = {
  white: { key: "white", label: "White", hex: "#f2efe9" },
  black: { key: "black", label: "Black", hex: "#2b2b2b" },
  brown: { key: "brown", label: "Brown", hex: "#4a342a" },
  wicker: { key: "wicker", label: "Wicker (beige)", hex: "#d8bd9a" }
};

export interface ColourSourceLine {
  productName: string;
  variantName?: string | null;
  quantity: number;
}

export interface TrackColourItem {
  productName: string;
  colour: TrackColour;
  quantity: number;
}

// Only kits, track and the colour-matched screws carry a track colour. Lights,
// controllers, connectors and power supplies never do, even when "white" is in
// the name (e.g. warm white).
const COLOURED_PRODUCT = /\b(kit|track|tracks|screw|screws)\b/i;
const NOT_COLOURED = /\b(soffit light kit)\b/i;

function colourIn(text: string | null | undefined): TrackColourKey | null {
  const t = String(text ?? "").toLowerCase();
  if (/\bwarm[\s-]?white\b|\bcool[\s-]?white\b|\bpure[\s-]?white\b/.test(t)) return null;
  if (/\b(wicker|beige)\b/.test(t)) return "wicker";
  if (/\bblack\b/.test(t)) return "black";
  if (/\bbrown\b/.test(t)) return "brown";
  if (/\bwhite\b/.test(t)) return "white";
  return null;
}

/** The lines of a cart or order whose colour has to match the house. */
export function trackColourItems(lines: ColourSourceLine[]): TrackColourItem[] {
  const out: TrackColourItem[] = [];
  for (const l of lines) {
    if (!COLOURED_PRODUCT.test(l.productName) || NOT_COLOURED.test(l.productName)) continue;
    const fromVariant = colourIn(l.variantName);
    const key = fromVariant ?? colourIn(l.productName);
    if (!key) continue;
    // Show the colour by the name the customer picked ("Beige / tan", "Wicker").
    const picked = String(l.variantName ?? "")
      .replace(/^colou?r:\s*/i, "")
      .replace(/\s+track$/i, "")
      .trim();
    const label = fromVariant && picked.length <= 24 ? picked : TRACK_COLOURS[key].label;
    out.push({ productName: l.productName, colour: { ...TRACK_COLOURS[key], label }, quantity: l.quantity });
  }
  return out;
}

export function distinctTrackColours(items: TrackColourItem[]): TrackColour[] {
  const seen = new Map<TrackColourKey, TrackColour>();
  for (const i of items) seen.set(i.colour.key, i.colour);
  return [...seen.values()];
}

/** "White", "White and Black", "White, Black and Brown". */
export function colourList(colours: TrackColour[]): string {
  const names = colours.map((c) => c.label);
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** One line for the order record: "White: Permanent Lighting Kit – 100 ft x1; Black: Aluminum Track x2". */
export function trackColourSummary(items: TrackColourItem[]): string {
  return items.map((i) => `${i.colour.label}: ${i.productName} x${i.quantity}`).join("; ");
}

export const TRACK_COLOUR_HELP =
  "The track is the part you see in daylight. Match it to your soffit or fascia, not your shingles, siding or front door.";
