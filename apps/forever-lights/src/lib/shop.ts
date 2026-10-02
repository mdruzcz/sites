// Online kit store: what can be bought, at what price, and how it is named on
// the order, invoice and pick list. Server components pass the small catalogue
// below to client components as props, so the cart UI never bundles kits.json.
import { kits, kitColours, getKit, kitLightCount, kitTrackFeet, kitImage, type Kit } from '@/lib/kits';

/** "Custom colour match" can't be bought off the shelf; it goes through the request form. */
export const orderableColours = kitColours.filter(c => c.key !== 'custom');

export interface CatalogKit {
  slug: string;
  feet: number;
  price: number;
  title: string;
  lights: number;
  trackFeet: number;
  image: string | null;
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

export function cartCatalog(): { kits: CatalogKit[]; colours: CatalogColour[] } {
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
    colours: orderableColours.map(c => ({ key: c.key, label: c.label, hex: c.hex })),
  };
}

export interface PricedLine {
  kit: Kit;
  colourKey: string;
  colourLabel: string;
  qty: number;
}

/** Validates browser cart lines against kits.json. Unknown kits/colours are an error, not dropped. */
export function priceCart(raw: unknown): { ok: true; lines: PricedLine[] } | { ok: false; error: string } {
  if (!Array.isArray(raw) || raw.length === 0) return { ok: false, error: 'Your cart is empty.' };
  if (raw.length > 12) return { ok: false, error: 'Too many lines in the cart. Please call us for a large order.' };
  const lines: PricedLine[] = [];
  for (const r of raw as Record<string, unknown>[]) {
    const kit = getKit(String(r?.slug ?? ''));
    const colour = orderableColours.find(c => c.key === String(r?.colour ?? ''));
    const qty = Math.floor(Number(r?.qty));
    if (!kit || !colour) return { ok: false, error: 'One of the kits in your cart is no longer available. Please remove it and add it again.' };
    if (!(qty >= 1 && qty <= 20)) return { ok: false, error: 'Please choose a quantity between 1 and 20.' };
    const same = lines.find(l => l.kit.slug === kit.slug && l.colourKey === colour.key);
    if (same) same.qty += qty;
    else lines.push({ kit, colourKey: colour.key, colourLabel: colour.label, qty });
  }
  return { ok: true, lines };
}
