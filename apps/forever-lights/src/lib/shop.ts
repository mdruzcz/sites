// Online kit store: what can be bought, at what price, and how it is named on
// the order, invoice and pick list. Server components pass the small catalogue
// below to client components as props, so the cart UI never bundles kits.json.
//
// Two kinds of line: a kit (slug = kit slug, colour = track colour) and an
// add-on part (slug = "addon:<component key>", colour = track colour for the
// colour-matched parts, "-" otherwise). Prices always come from kits.json on
// the server at checkout.
import {
  kits, kitColours, kitAddons, getKit, getAddon, getComponent, kitLightCount, kitTrackFeet, kitImage,
  COLOURED_ADDONS, type Kit, type KitAddon,
} from '@/lib/kits';

/** "Custom colour match" can't be bought off the shelf; it goes through the request form. */
export const orderableColours = kitColours.filter(c => c.key !== 'custom');

export const ADDON_PREFIX = 'addon:';
export const NO_COLOUR = '-';
export const isAddonSlug = (slug: string) => slug.startsWith(ADDON_PREFIX);
export const addonSlug = (key: string) => `${ADDON_PREFIX}${key}`;

export interface CatalogKit {
  slug: string;
  feet: number;
  price: number;
  title: string;
  lights: number;
  trackFeet: number;
  image: string | null;
}

export interface CatalogAddon {
  slug: string;
  key: string;
  name: string;
  price: number;
  unit: string;
  pitch: string;
  image: string | null;
  needsColour: boolean;
}

export interface CatalogColour {
  key: string;
  label: string;
  hex: string | null;
}

export function kitProductName(kit: Kit): string {
  return `Forever Lights DIY Kit – ${kit.feet} ft`;
}

export function kitSku(kit: Kit, colourKey: string): string {
  return `FL-KIT-${kit.feet}-${colourKey.toUpperCase()}`;
}

export function addonSku(addon: KitAddon, colourKey: string): string {
  const base = `FL-${addon.key.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toUpperCase()}`;
  return colourKey && colourKey !== NO_COLOUR ? `${base}-${colourKey.toUpperCase()}` : base;
}

export function addonCatalog(): CatalogAddon[] {
  return kitAddons.map(a => {
    const comp = getComponent(a.key);
    return {
      slug: addonSlug(a.key),
      key: a.key,
      name: comp?.name ?? a.key,
      price: a.price,
      unit: a.unit,
      pitch: a.pitch,
      image: comp ? kitImage(comp.image)?.src ?? null : null,
      needsColour: COLOURED_ADDONS.has(a.key),
    };
  });
}

export function cartCatalog(): { kits: CatalogKit[]; addons: CatalogAddon[]; colours: CatalogColour[] } {
  const img = kitImage('aluminum-track');
  return {
    kits: kits.map(k => ({
      slug: k.slug,
      feet: k.feet,
      price: k.price,
      title: `${k.feet} ft DIY kit`,
      lights: kitLightCount(k),
      trackFeet: kitTrackFeet(k),
      image: img?.src ?? null,
    })),
    addons: addonCatalog(),
    colours: orderableColours.map(c => ({ key: c.key, label: c.label, hex: c.hex })),
  };
}

export type PricedLine =
  | { kind: 'kit'; kit: Kit; colourKey: string; colourLabel: string; qty: number }
  | { kind: 'addon'; addon: KitAddon; name: string; colourKey: string; colourLabel: string; qty: number };

export const lineUnitPrice = (l: PricedLine) => (l.kind === 'kit' ? l.kit.price : l.addon.price);

/** Validates browser cart lines against kits.json. Unknown kits/colours are an error, not dropped. */
export function priceCart(raw: unknown): { ok: true; lines: PricedLine[] } | { ok: false; error: string } {
  if (!Array.isArray(raw) || raw.length === 0) return { ok: false, error: 'Your cart is empty.' };
  if (raw.length > 30) return { ok: false, error: 'Too many lines in the cart. Please call us for a large order.' };
  const lines: PricedLine[] = [];
  for (const r of raw as Record<string, unknown>[]) {
    const slug = String(r?.slug ?? '');
    const colourKey = String(r?.colour ?? '');
    const qty = Math.floor(Number(r?.qty));
    if (!(qty >= 1 && qty <= 20)) return { ok: false, error: 'Please choose a quantity between 1 and 20.' };

    if (isAddonSlug(slug)) {
      const addon = getAddon(slug.slice(ADDON_PREFIX.length));
      const comp = addon ? getComponent(addon.key) : null;
      if (!addon || !comp) return { ok: false, error: 'One of the add-on parts in your cart is no longer available. Please remove it and add it again.' };
      const needsColour = COLOURED_ADDONS.has(addon.key);
      const colour = needsColour ? orderableColours.find(c => c.key === colourKey) : null;
      if (needsColour && !colour) return { ok: false, error: `Please choose a track colour for the ${comp.name}.` };
      const ck = needsColour ? colour!.key : NO_COLOUR;
      const same = lines.find(l => l.kind === 'addon' && l.addon.key === addon.key && l.colourKey === ck);
      if (same) same.qty += qty;
      else lines.push({ kind: 'addon', addon, name: comp.name, colourKey: ck, colourLabel: colour?.label ?? '', qty });
      continue;
    }

    const kit = getKit(slug);
    const colour = orderableColours.find(c => c.key === colourKey);
    if (!kit || !colour) return { ok: false, error: 'One of the kits in your cart is no longer available. Please remove it and add it again.' };
    const same = lines.find(l => l.kind === 'kit' && l.kit.slug === kit.slug && l.colourKey === colour.key);
    if (same) same.qty += qty;
    else lines.push({ kind: 'kit', kit, colourKey: colour.key, colourLabel: colour.label, qty });
  }
  if (!lines.some(l => l.kind === 'kit') && lines.length > 0) {
    // Parts-only orders are fine; they just ship at the normal rate.
  }
  return { ok: true, lines };
}
