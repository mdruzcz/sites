import type { PhotoKey } from "@/lib/photos";
import areas from "@/content/installation-areas.json";

export interface InstallCity {
  slug: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  localAngle: string;
  serviceBullets: string[];
  nearbyAreas: string[];
}

export interface InstallationAreas {
  regionIntro: string;
  cities: InstallCity[];
}

const data = areas as unknown as InstallationAreas;

export const REGION_INTRO: string = data.regionIntro;
export const INSTALL_CITIES: InstallCity[] = data.cities;

/** Hero photograph per city page; falls back to a roofline install shot. */
const CITY_PHOTOS: Record<string, PhotoKey> = {
  woodstock: "banner-install",
  kitchener: "home-street",
  waterloo: "home-elevation-blue",
  cambridge: "home-residential",
  guelph: "home-roofline-garage",
  stratford: "home-wide",
  ingersoll: "install-wide"
};

export function cityPhotoFor(slug: string): PhotoKey {
  return CITY_PHOTOS[slug] ?? "home-install";
}

export function getCity(slug: string): InstallCity | undefined {
  return INSTALL_CITIES.find((c) => c.slug === slug);
}

/**
 * Sibling cities for the "nearby areas we serve" cross-links. Named towns that
 * are themselves city pages link through; the rest are shown as plain text.
 */
export function siblingCities(slug: string): InstallCity[] {
  return INSTALL_CITIES.filter((c) => c.slug !== slug);
}

export const ALL_CITY_SLUGS = INSTALL_CITIES.map((c) => c.slug);
