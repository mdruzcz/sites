import "server-only";
import { amenities as CATALOGUE } from "@/lib/content";

const FIRECRAWL = "https://api.firecrawl.dev/v2/scrape";

export type Platform = "Airbnb" | "VRBO" | "Other";

export interface ImportedListing {
  platform: Platform;
  sourceUrl: string;
  title: string;
  description: string;
  propertyType: string;
  city: string;
  region: string;
  bedrooms: number | null;
  bathrooms: number | null;
  sleeps: number | null;
  beds: number | null;
  amenities: string[];
  rawAmenities: string[];
  photos: string[];
  /** The platform's own advertised nightly rate — an anchor for pricing the
   *  off season, not a rate we publish. */
  nightlyRate: number | null;
  currency: string | null;
}

export function detectPlatform(url: string): Platform {
  const host = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  if (host.includes("airbnb.")) return "Airbnb";
  if (host.includes("vrbo.") || host.includes("homeaway.") || host.includes("expedia."))
    return "VRBO";
  return "Other";
}

/**
 * Anything that is plainly not a photograph of the property.
 *
 * The platform-asset entries matter more than they look: Airbnb serves its
 * review-summary illustrations and host avatars from the same CDN and the same
 * /im/pictures/ prefix as real listing photography, so a path check alone lets
 * seven pieces of UI furniture into the gallery.
 */
const JUNK =
  /(sprite|logo|icon|favicon|avatar|profile|badge|flag|placeholder|staticmap|maps\.googleapis|gstatic|doubleclick|analytics|pixel|1x1|blank|PlatformAssets|platform-assets|Review-AI-Synthesis|\/pictures\/user\/|\/im\/users\/)/i;

/**
 * Photo hosts normalise very differently, and the resize parameters in the
 * markup are always thumbnail-sized. We key on the path (the stable identity of
 * the photograph) and re-request it at a size worth keeping.
 */
function normalisePhoto(raw: string, platform: Platform): string | null {
  let url = raw.replace(/&amp;/g, "&").trim();
  if (!/^https?:\/\//i.test(url)) return null;
  if (JUNK.test(url)) return null;

  try {
    const u = new URL(url);

    if (platform === "VRBO" || /vrbo\.com|trvl-media\.com|expedia/i.test(u.hostname)) {
      // .../lodging/<tiers>/<hash>.jpg — query is purely a resize policy.
      if (!/\/lodging\//i.test(u.pathname)) return null;
      return `${u.origin}${u.pathname}?impolicy=resizecrop&rw=2000&ra=fit`;
    }

    if (platform === "Airbnb" || /muscache\.com/i.test(u.hostname)) {
      // Listing photography lives under /im/pictures/hosting/ or the older
      // flat /pictures/<uuid> form. Everything else on this CDN is chrome.
      const isHosting = /\/im\/pictures\/hosting\//i.test(u.pathname);
      const isLegacyFlat = /^\/pictures\/[0-9a-f-]{20,}\.(jpg|jpeg|png|webp)$/i.test(u.pathname);
      if (!isHosting && !isLegacyFlat) return null;
      return `${u.origin}${u.pathname}?im_w=1920`;
    }

    // Unknown host: strip obvious thumbnail hints and keep the rest.
    for (const p of ["w", "width", "size", "resize", "thumb", "thumbnail"]) u.searchParams.delete(p);
    url = u.toString();
    return url;
  } catch {
    return null;
  }
}

/** Dedupe key — the same photograph at two sizes must collapse to one entry. */
function photoKey(url: string): string {
  try {
    const u = new URL(url);
    return `${u.hostname}${u.pathname}`.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

const IMG_PATTERN = /https:\/\/[^"'<>\\ )]+?\.(?:jpg|jpeg|png|webp|avif)(?:\?[^"'<>\\ )]*)?/gi;

export function extractPhotos(html: string, platform: Platform, limit = 40): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const match of html.matchAll(IMG_PATTERN)) {
    const normalised = normalisePhoto(match[0], platform);
    if (!normalised) continue;
    const key = photoKey(normalised);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(normalised);
    if (out.length >= limit) break;
  }
  return out;
}

/**
 * Map the platform's free-text amenity strings onto our own catalogue so the
 * imported listing renders with the same icons as a hand-written one. Anything
 * we cannot place is returned separately rather than silently dropped.
 */
export function mapAmenities(raw: string[]): { matched: string[]; unmatched: string[] } {
  const matched = new Set<string>();
  const unmatched: string[] = [];

  const RULES: [RegExp, string][] = [
    [/wi-?fi|internet|wireless/i, "wifi"],
    [/fast|gigabit|high.?speed/i, "fast-internet"],
    [/washer|laundry|dryer/i, "in-suite-laundry"],
    [/kitchen/i, "full-kitchen"],
    [/dishwasher/i, "dishwasher"],
    [/microwave/i, "microwave"],
    [/coffee/i, "coffee-maker"],
    [/air.?condition|a\/c\b/i, "air-conditioning"],
    [/wood.?stove/i, "wood-stove"],
    [/fireplace/i, "fireplace"],
    [/hot.?tub|jacuzzi|spa\b/i, "hot-tub"],
    [/\bbath.?tub\b/i, "bathtub"],
    [/barbe?cue|bbq|grill/i, "bbq"],
    [/fire.?pit|fire.?table/i, "fire-pit"],
    [/deck|patio|balcony/i, "deck"],
    [/fenced/i, "fenced-yard"],
    [/parking|driveway|garage/i, "driveway-parking"],
    [/\bev\b|electric vehicle|charger/i, "ev-outlet"],
    [/pets? allowed|pet.?friendly|dog/i, "pet-friendly"],
    [/smoke.?free|no smoking/i, "smoke-free"],
    [/workspace|desk|dedicated work/i, "workspace"],
    [/\btv\b|television|smart tv/i, "smart-tv"],
    [/netflix|streaming|prime video/i, "streaming"],
    [/lake ?(view|front)|water ?view|waterfront/i, "lake-view"],
    [/harbour|harbor|marina/i, "harbour-view"],
    [/beach/i, "walk-to-beach"],
    [/private entrance/i, "private-entrance"],
    [/linens|towels|bedding/i, "linens-towels"],
    [/furnish/i, "fully-furnished"],
    [/heat(ing)?\b/i, "heat-included"]
  ];

  const known = new Set(CATALOGUE.map((a) => a.slug));

  for (const item of raw) {
    const text = String(item ?? "").trim();
    if (!text) continue;
    let hit = false;
    for (const [re, slug] of RULES) {
      if (re.test(text) && known.has(slug)) {
        matched.add(slug);
        hit = true;
        break;
      }
    }
    if (!hit) unmatched.push(text);
  }

  return { matched: [...matched], unmatched };
}

const EXTRACT_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string", description: "The listing headline" },
    description: {
      type: "string",
      description:
        "The owner's own prose description of the property under a heading such as 'About this property'. Never the review summary, the star rating, or badge text such as 'Loved by Guests'. Return an empty string if the real description is not present on the page."
    },
    propertyType: { type: "string", description: "Cottage, House, Apartment, Condo, Suite etc." },
    city: { type: "string" },
    region: { type: "string", description: "Province or state, two-letter code if possible" },
    bedrooms: { type: "number" },
    bathrooms: { type: "number" },
    sleeps: { type: "number", description: "Maximum number of guests" },
    beds: { type: "number", description: "Total number of beds" },
    amenities: { type: "array", items: { type: "string" } },
    nightlyRate: {
      type: "number",
      description:
        "The advertised nightly rate in the listing currency, before taxes and fees. Omit if no price is shown."
    },
    currency: { type: "string", description: "Currency code of the advertised rate, e.g. CAD" }
  }
} as const;

/**
 * Spec numbers only. Zero is treated as absent, not as a value: a rental with
 * no bathrooms or sleeping nobody does not exist, and the extractor returns 0
 * for "I could not find this" often enough that saving it would publish a
 * listing reading "0 bedrooms · 0 baths · Sleeps 0".
 */
function num(v: unknown): number | null {
  const n = typeof v === "number" ? v : Number.parseFloat(String(v ?? ""));
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

/** True when a scrape came back with none of the facts worth having. */
function isEmptyExtract(j: Record<string, unknown>): boolean {
  const hasSpec = [j.bedrooms, j.bathrooms, j.sleeps].some((v) => num(v) !== null);
  const hasAmenities = Array.isArray(j.amenities) && j.amenities.length > 0;
  return !hasSpec && !hasAmenities;
}

/**
 * Both platforms render review badges near the description and hide the real
 * prose behind a "show more" control, so the extractor sometimes returns
 * "Loved by Guests 10 out of 10 · 7 reviews" as the description. That is worse
 * than nothing: it would be saved as body copy and published.
 */
const REVIEW_BOILERPLATE =
  /(loved by guests|out of 10|guest favou?rite|top \d+% of|\b\d+ reviews?\b|rated \d(\.\d)? out of)/i;

/**
 * Extractors answer "Not specified" / "N/A" rather than omitting a field, and
 * that string would otherwise be saved as the town name.
 */
const NOT_STATED = /^(not\s*(specified|stated|listed|available|provided)|n\/?a|unknown|none|-)$/i;

export function orFallback(raw: unknown, fallback: string): string {
  const text = String(raw ?? "").trim();
  return !text || NOT_STATED.test(text) ? fallback : text;
}

export function cleanDescription(raw: unknown): string {
  const text = String(raw ?? "").trim();
  if (!text) return "";
  // Short and review-flavoured is boilerplate. Long prose that merely mentions
  // reviews in passing is a genuine description and is kept.
  if (text.length < 400 && REVIEW_BOILERPLATE.test(text)) return "";
  return text;
}

/**
 * Scrape a public VRBO or Airbnb listing and return everything we can use.
 *
 * Note on photo counts: both platforms render only the hero images into the
 * initial HTML and hide the rest behind a gallery modal, so a typical import
 * yields five to twenty photographs rather than the full set. The admin says so
 * plainly and drag-drop covers the remainder.
 */
export async function scrapeListing(sourceUrl: string): Promise<ImportedListing> {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) throw new Error("FIRECRAWL_API_KEY is not configured.");

  const platform = detectPlatform(sourceUrl);

  type Payload = {
    success?: boolean;
    data?: { rawHtml?: string; json?: Record<string, unknown>; metadata?: Record<string, unknown> };
    error?: string;
  };

  async function attempt(waitFor: number): Promise<Payload> {
    const res = await fetch(FIRECRAWL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        url: sourceUrl,
        formats: [
          "rawHtml",
          {
            type: "json",
            prompt:
              "Extract the vacation rental listing details exactly as published. Do not invent values; omit anything not stated on the page.",
            schema: EXTRACT_SCHEMA
          }
        ],
        onlyMainContent: false,
        waitFor
      })
    });
    if (!res.ok) {
      throw new Error(`Firecrawl returned ${res.status}: ${(await res.text()).slice(0, 300)}`);
    }
    return (await res.json()) as Payload;
  }

  // Both platforms hydrate their spec block client-side, so a scrape that
  // lands early gets photographs but no bedroom count. One slower retry costs
  // a few seconds and turns most of those into a complete import.
  let payload = await attempt(3000);
  if (payload.success && payload.data && isEmptyExtract(payload.data.json ?? {})) {
    try {
      const retry = await attempt(9000);
      if (retry.success && retry.data && !isEmptyExtract(retry.data.json ?? {})) payload = retry;
    } catch {
      // Keep the first result — partial beats nothing.
    }
  }

  if (!payload.success || !payload.data) {
    throw new Error(payload.error ?? "Firecrawl could not read that page.");
  }

  const j = payload.data.json ?? {};
  const html = payload.data.rawHtml ?? "";
  const rawAmenities = Array.isArray(j.amenities) ? (j.amenities as string[]) : [];
  const { matched } = mapAmenities(rawAmenities);

  return {
    platform,
    sourceUrl,
    title: String(j.title ?? payload.data.metadata?.title ?? "").trim(),
    description: cleanDescription(j.description),
    propertyType: orFallback(j.propertyType, "Cottage"),
    city: orFallback(j.city, "Port Stanley"),
    region: orFallback(j.region, "ON").slice(0, 4),
    bedrooms: num(j.bedrooms),
    bathrooms: num(j.bathrooms),
    sleeps: num(j.sleeps),
    beds: num(j.beds),
    amenities: matched,
    rawAmenities,
    photos: extractPhotos(html, platform),
    nightlyRate: num(j.nightlyRate),
    currency: j.currency ? orFallback(j.currency, "CAD").toUpperCase().slice(0, 3) : null
  };
}
