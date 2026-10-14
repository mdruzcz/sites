import heroPhotos from "@/content/hero-photos.json";

export interface SitePhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
}

const photos = heroPhotos as Record<string, SitePhoto>;

export type PhotoKey = keyof typeof heroPhotos;

export function photo(key: PhotoKey | string): SitePhoto {
  const p = photos[key as string];
  if (!p) {
    // Never crash a page over a missing editorial image; fall back to the plaza tree.
    return photos["plaza-tree"];
  }
  return p;
}

export const PHOTO_KEYS = Object.keys(photos) as PhotoKey[];
