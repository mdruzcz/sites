// Forever Lights → Light Visualizer catalog adapter.
// Kit prices and a-la-carte add-on prices both come from kits.json.
import { kits, kitComponents, kitColours, kitImage, getAddon, TRACK_PIECE_FEET, LIGHTS_PER_STRAND } from '@/lib/kits';
import { site } from '@/lib/site-config';
import type { VzCatalog } from './engine';

export function getVisualizerCatalog(): VzCatalog {
  return {
    siteName: site.name,
    domain: site.domain,
    cart: false,
    trackPieceFeet: TRACK_PIECE_FEET,
    lightsPerStrand: LIGHTS_PER_STRAND,
    colours: kitColours.map((c) => ({ key: c.key, label: c.label, hex: c.hex })),
    components: kitComponents.map((c) => ({
      key: c.key,
      name: c.name,
      blurb: c.blurb,
      image: kitImage(c.image)?.src ?? null,
      price: getAddon(c.key)?.price ?? null,
      url: '/kits#add-ons',
      packFeet: c.key === 'strand' || c.key === 'track' ? TRACK_PIECE_FEET : undefined,
    })),
    kits: kits.map((k) => ({ slug: k.slug, feet: k.feet, price: k.price, suits: k.suits, bom: k.bom, url: `/kits/${k.slug}` })),
  };
}
