import kitsData from '@/content/kits.json';
import kitImages from '@/content/kit-images.json';

export interface KitComponent {
  key: string;
  name: string;
  image: string | null;
  blurb: string;
  detail: string;
}

export interface KitColour {
  key: string;
  label: string;
  hex: string | null;
}

export interface Kit {
  slug: string;
  feet: number;
  price: number;
  installedLow: number;
  installedHigh: number;
  suits: string;
  bom: Record<string, number>;
}

export interface KitImage {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
}

export const kits = kitsData.kits as Kit[];
export const kitComponents = kitsData.components as KitComponent[];
export const kitColours = kitsData.colours as KitColour[];
export const TRACK_PIECE_FEET = kitsData.trackPieceFeet;
export const LIGHTS_PER_STRAND = kitsData.lightsPerStrand;

const images = kitImages as Record<string, KitImage>;

export function kitImage(key: string | null): KitImage | null {
  if (!key) return null;
  return images[key] ?? null;
}

export function getKit(slug: string): Kit | null {
  return kits.find(k => k.slug === slug) ?? null;
}

export function getComponent(key: string): KitComponent | null {
  return kitComponents.find(c => c.key === key) ?? null;
}

/** Components actually present in a kit, in catalog order, with quantities. */
export function kitBom(kit: Kit): { component: KitComponent; qty: number }[] {
  return kitComponents
    .map(component => ({ component, qty: kit.bom[component.key] ?? 0 }))
    .filter(row => row.qty > 0);
}

/** Total individual light points in a kit. */
export function kitLightCount(kit: Kit): number {
  return (kit.bom.strand ?? 0) * LIGHTS_PER_STRAND;
}

/** Actual feet of track supplied (each piece is 3.5 ft), which exceeds the nominal size. */
export function kitTrackFeet(kit: Kit): number {
  return Math.round((kit.bom.track ?? 0) * TRACK_PIECE_FEET);
}

/** What a buyer saves versus our lowest installed price for the same length. */
export function kitSaving(kit: Kit): number {
  return kit.installedLow - kit.price;
}

/** Kit money is an exact list price, so it shows cents by default. */
export function formatCad(n: number, decimals = 2): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export const kitTitle = (kit: Kit) => `${kit.feet} ft Permanent Lighting Kit`;
