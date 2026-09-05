import kitsData from "@/content/kits.json";
import type { PhotoKey } from "@/lib/photos";

export interface KitComponent {
  key: string;
  name: string;
  image: string;
  productSlug: string;
  blurb: string;
}

export interface KitColour {
  key: string;
  label: string;
  hex: string;
}

export interface Kit {
  slug: string;
  feet: number;
  price: number;
  installedLow: number;
  installedHigh: number;
  photo: PhotoKey;
  suits: string;
  bom: Record<string, number>;
}

export const kits = kitsData.kits as Kit[];
export const kitComponents = kitsData.components as KitComponent[];
export const kitColours = kitsData.colours as KitColour[];
export const TRACK_PIECE_FEET = kitsData.trackPieceFeet;
export const LIGHTS_PER_STRAND = kitsData.lightsPerStrand;

export const getKit = (slug: string) => kits.find((k) => k.slug === slug) ?? null;
export const getKitByFeet = (feet: number) => kits.find((k) => k.feet === feet) ?? null;
export const isKitSlug = (slug: string) => kits.some((k) => k.slug === slug);

/** Components present in a kit, in catalogue order, with quantities. */
export function kitBom(kit: Kit): { component: KitComponent; qty: number }[] {
  return kitComponents
    .map((component) => ({ component, qty: kit.bom[component.key] ?? 0 }))
    .filter((row) => row.qty > 0);
}

export const kitLightCount = (kit: Kit) => (kit.bom.strand ?? 0) * LIGHTS_PER_STRAND;
export const kitTrackFeet = (kit: Kit) => Math.round((kit.bom.track ?? 0) * TRACK_PIECE_FEET);
export const kitSaving = (kit: Kit) => kit.installedLow - kit.price;
export const kitPerFoot = (kit: Kit) => kit.price / kit.feet;
export const kitTitle = (kit: Kit) => `Permanent Lighting Kit – ${kit.feet} ft`;

/** Markdown body used for the kit product records in Supabase and the kit page. */
export function kitDescription(kit: Kit): string {
  const lines = kitBom(kit).map(({ component, qty }) => `- ${qty} × ${component.name}`);
  return [
    `## What's in the ${kit.feet} ft kit`,
    `Everything needed to light about ${kit.feet} linear feet of roofline: ${kitLightCount(kit)} individually addressable 12V RGBW pucks in ${kitTrackFeet(kit)} ft of aluminum track, a WiFi controller, power, every connector and colour-matched screws. ${kit.suits}`,
    "",
    ...lines,
    "",
    "## Highlights",
    "- 12V RGBW pucks: 16 million colours plus a dedicated warm white channel",
    "- Aluminum track in black, white, wicker or brown, screws to the soffit and hides the wire",
    "- Free WLED app for Android and iOS: scenes, schedules, sunset triggers, zones, voice control",
    "- IP68 pucks, tested to −40 °C, 50,000-hour rated LEDs",
    "- CSA Class 2 low voltage: plugs into a GFCI outlet, no electrician required for a plug-in install",
    "- 5-year parts warranty, shipped from London, Ontario, free shipping over $500",
  ].join("\n");
}
