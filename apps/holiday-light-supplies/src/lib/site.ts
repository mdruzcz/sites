/**
 * Client-safe site constants. Keep this file free of server-only imports —
 * header, footer, popups and forms all import from here.
 */
export const SITE_NAME = "Holiday Light Supplies";
export const SITE_TAGLINE = "Commercial & wholesale Christmas lighting, shipped across Canada";
export const SITE_EMAIL = "info@holidaylightsupplies.ca";
export const SHIP_FROM = "London, Ontario";
export const FOUNDED = 2010;
export const FREE_SHIPPING_OVER = 150;
export const WELCOME_CODE = "FIRST10";
export const FOREVER_LIGHTS_URL = "https://foreverlights.ca";
export const FOREVER_LIGHTS_KITS_URL = "https://foreverlights.ca/kits";

/** Who we sell to — drives the audience nav, the homepage segment grid and the /commercial hub. */
export const AUDIENCES = [
  {
    slug: "malls-shopping-centres",
    short: "Malls",
    name: "Malls & shopping centres",
    blurb: "Atrium trees, Santa sets, walk-through displays and photo-ops that pull foot traffic through the season.",
    photo: "mall-red-tree"
  },
  {
    slug: "bias-downtowns",
    short: "BIAs",
    name: "BIAs & downtowns",
    blurb: "Pole-mount décor, warm-white tree wraps and overhead street spans that make a main street the place to be.",
    photo: "downtown-street-trees"
  },
  {
    slug: "municipalities-parks",
    short: "Municipalities",
    name: "Municipalities & parks",
    blurb: "Tender-ready quotes, net-30 invoicing and 3D displays built for public spaces and Canadian winters.",
    photo: "town-park-trees"
  },
  {
    slug: "property-managers",
    short: "Property managers",
    name: "Property managers & hotels",
    blurb: "Lobby trees, lit garland, roofline C9 and entrance displays for office towers, hotels and plazas.",
    photo: "lobby-warm-white-trees"
  },
  {
    slug: "installers",
    short: "Installers",
    name: "Professional installers",
    blurb: "Case pricing on C9, socket spools, wire and clips, priority fulfilment and a dedicated contact.",
    photo: "estate-fountain",
    href: "/professional-installer"
  }
] as const;

export type Audience = (typeof AUDIENCES)[number];

export function audienceHref(a: Pick<Audience, "slug"> & { href?: string }) {
  return a.href ?? `/commercial/${a.slug}`;
}

/** Primary navigation (desktop + mobile). */
export const NAV = [
  { label: "Commercial", href: "/commercial" },
  { label: "Permanent Lighting", href: "/product-category/permanent-lighting-kits" },
  { label: "Pro Installers", href: "/professional-installer" },
  { label: "Gallery", href: "/gallery" },
  { label: "Guides", href: "/resources" }
] as const;

/** Benefits bar — the five promises we repeat site-wide. */
export const BENEFITS = [
  { icon: "truck", title: "Ships across Canada", body: `From our ${SHIP_FROM} warehouse. Free over $${FREE_SHIPPING_OVER}.` },
  { icon: "tag", title: "Volume & wholesale pricing", body: "Case and contract pricing on bulbs, spools, displays and décor." },
  { icon: "invoice", title: "Net-30 for public sector", body: "PO invoicing, tax-exempt handling and tender-ready quotes." },
  { icon: "shield", title: "Commercial-grade, winter-rated", body: "Aluminum frames, sealed sockets and LEDs that run at -40°C." },
  { icon: "maple", title: `Canadian since ${FOUNDED}`, body: "Lighting malls, BIAs, municipalities and installers for 15+ seasons." }
] as const;
