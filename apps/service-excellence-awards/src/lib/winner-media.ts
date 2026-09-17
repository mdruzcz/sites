import fs from "node:fs";
import path from "node:path";
import type { Winner } from "./types";

/**
 * Winner photography lives on disk, not in the database:
 *   public/images/winners/<slug>/logo.(png|svg|jpg|webp)
 *   public/images/winners/<slug>/photo-1.jpg, photo-2.jpg, ...
 *
 * Drop files into the folder and redeploy; every page picks them up. The
 * database photo_url / logo_url / gallery columns remain as a fallback for
 * winners that have no folder yet.
 */

export type WinnerMedia = { logo: string | null; photos: string[] };

const ROOT = path.join(process.cwd(), "public", "images", "winners");
const PHOTO_RE = /^photo-(\d+)\.(jpe?g|png|webp|avif)$/i;
const LOGO_RE = /^logo\.(png|svg|jpe?g|webp)$/i;

let cache: Map<string, WinnerMedia> | null = null;

function scan(): Map<string, WinnerMedia> {
  const map = new Map<string, WinnerMedia>();
  if (!fs.existsSync(ROOT)) return map;
  for (const slug of fs.readdirSync(ROOT)) {
    const dir = path.join(ROOT, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    const files = fs.readdirSync(dir);
    const photos = files
      .filter((f) => PHOTO_RE.test(f))
      .sort((a, b) => parseInt(a.match(PHOTO_RE)![1], 10) - parseInt(b.match(PHOTO_RE)![1], 10))
      .map((f) => `/images/winners/${slug}/${f}`);
    const logoFile = files.find((f) => LOGO_RE.test(f));
    map.set(slug, { logo: logoFile ? `/images/winners/${slug}/${logoFile}` : null, photos });
  }
  return map;
}

export function getAllWinnerMedia(): Map<string, WinnerMedia> {
  // In dev, rescan every call so new files show up without a restart.
  if (process.env.NODE_ENV !== "production" || !cache) cache = scan();
  return cache;
}

export function getWinnerMedia(slug: string): WinnerMedia {
  return getAllWinnerMedia().get(slug) ?? { logo: null, photos: [] };
}

type MediaFields = Pick<Winner, "slug" | "photo_url" | "logo_url"> & { gallery?: string[] | null };

/** Overlay on-disk media onto a DB row: photo_url, logo_url and gallery become the folder contents. */
export function withMedia<T extends MediaFields>(w: T): T & { photos: string[] } {
  const m = getWinnerMedia(w.slug);
  const dbPhotos = [w.photo_url, ...(Array.isArray(w.gallery) ? w.gallery : [])].filter((x): x is string => !!x);
  const photos = m.photos.length ? m.photos : dbPhotos;
  return {
    ...w,
    photo_url: photos[0] ?? null,
    gallery: photos.slice(1),
    logo_url: m.logo ?? w.logo_url ?? null,
    photos,
  };
}
