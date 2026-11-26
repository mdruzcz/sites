import type { Layout } from "./content";
import type { CourtColours } from "@/components/court-diagram";

/** The usual sport-tile colour range. Exact availability is confirmed on each quote. */
export const tileColours = [
  { name: "Royal Blue", hex: "#1F56C4" },
  { name: "Navy", hex: "#1B2A4E" },
  { name: "Sky Blue", hex: "#5AA7E0" },
  { name: "Forest Green", hex: "#1F6B45" },
  { name: "Bright Green", hex: "#4FA83D" },
  { name: "Graphite", hex: "#3B4047" },
  { name: "Light Grey", hex: "#A9AFB7" },
  { name: "Black", hex: "#17191C" },
  { name: "Red", hex: "#C8322B" },
  { name: "Orange", hex: "#F0701F" },
  { name: "Yellow", hex: "#F2C230" },
  { name: "Purple", hex: "#6A3FA8" },
] as const;

const hex = (name: string) => tileColours.find((c) => c.name === name)?.hex ?? "#1F56C4";

/** A sensible starting scheme for each kind of court. */
export function defaultColours(layout: Layout): CourtColours {
  switch (layout) {
    case "half":
    case "full":
      return { court: hex("Graphite"), zone: hex("Orange"), border: hex("Black") };
    case "pickleball":
      return { court: hex("Royal Blue"), zone: hex("Sky Blue"), border: hex("Forest Green") };
    case "multi":
      return { court: hex("Royal Blue"), zone: hex("Navy"), border: hex("Graphite") };
    case "tennis":
      return { court: hex("Forest Green"), zone: hex("Royal Blue"), border: hex("Forest Green") };
    default:
      return { court: hex("Forest Green"), zone: hex("Red"), border: hex("Graphite") };
  }
}

export const colourName = (h: string) => tileColours.find((c) => c.hex === h)?.name ?? h;

export function zoneLabel(layout: Layout): string {
  if (layout === "half" || layout === "full") return "Key";
  if (layout === "pickleball" || layout === "multi") return "Kitchen";
  if (layout === "tennis") return "Playing court";
  return "Scoring area";
}
