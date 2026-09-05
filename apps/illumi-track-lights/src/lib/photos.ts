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

/**
 * Look up an optimised lifestyle photo by key.
 *
 * Every entry ships with a real blurDataURL generated at build-prep time, so
 * `<Photo>` can always blur up instead of popping in.
 */
export function photo(key: PhotoKey): Photo {
  return photos[key];
}

/**
 * Same as `photo()` but lets the caller override the alt text when the image is
 * used in a context that needs more specific wording (e.g. a city page).
 */
export function photoWithAlt(key: PhotoKey, alt: string): Photo {
  return { ...photos[key], alt };
}

export const ALL_PHOTO_KEYS = Object.keys(photos) as PhotoKey[];
