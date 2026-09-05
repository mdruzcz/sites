import manifest from "./photos.json";

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
}

export type PhotoKey = keyof typeof manifest;

const photos = manifest as Record<string, Photo>;

/** Look up an optimised lifestyle photo by key; every entry carries a real blurDataURL. */
export function photo(key: PhotoKey): Photo {
  return photos[key];
}

export const ALL_PHOTO_KEYS = Object.keys(photos) as PhotoKey[];
