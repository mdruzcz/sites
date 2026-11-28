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
export const kitTitle = (kit: Kit) => `Track Lighting Kit, ${kit.feet} ft`;
export const kitFromPrice = (list: Kit[] = kits) => Math.min(...list.map((k) => k.price));
export const kitTopPrice = (list: Kit[] = kits) => Math.max(...list.map((k) => k.price));

/**
 * Kits priced from the catalogue: the lowest active variant price of the kit's
 * product, which is what checkout charges. kits.json is only the fallback, so a
 * price changed in the database shows on the next revalidation without a deploy.
 */
export function kitsWithLivePrices(products: { slug: string; ecom_variants?: { price_cad: number; is_active: boolean }[] }[]): Kit[] {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  return kits.map((k) => {
    const prices = (bySlug.get(k.slug)?.ecom_variants ?? [])
      .filter((v) => v.is_active)
      .map((v) => Number(v.price_cad))
      .filter((n) => Number.isFinite(n) && n > 0);
    return prices.length ? { ...k, price: Math.min(...prices) } : k;
  });
}

/** Markdown body used for the kit product records in Supabase and the kit page. */
export function kitDescription(kit: Kit): string {
  const lines = kitBom(kit).map(({ component, qty }) => `- ${qty} × ${component.name}`);
  return [
    `## What is in the ${kit.feet} ft kit`,
    `Enough to light about ${kit.feet} feet of roofline: ${kitLightCount(kit)} 12V RGBW lights, ${kitTrackFeet(kit)} ft of aluminum track to hold them, a WiFi controller, the power, the connectors and a box of colour-matched screws. ${kit.suits}`,
    "",
    ...lines,
    "",
    "## Good to know",
    "- Every light is RGBW: 16 million colours and a separate warm white",
    "- Track comes in black, white, wicker or brown at the same price",
    "- Runs from the free WLED app on Android and iPhone: colours, scenes, schedules, sunset timers and zones",
    "- Lights and connectors are sealed to IP68 and tested to −40 °C",
    "- 12V Class 2 low voltage. The power supply plugs into an outdoor GFCI outlet",
    "- 5-year parts warranty",
    "- Ships free anywhere in Canada, or pick it up free in Woodstock, Ontario"
  ].join("\n");
}
