import { photos } from "./photos";
import { site } from "./site";

const og = photos[site.photos.og];

/** Share image used on every page. Page-level openGraph replaces the layout's, so each page spreads these in. */
export const ogImages = [{ url: og.src, width: og.width, height: og.height, alt: site.photos.heroAlt }];
export const ogBase = { type: "website" as const, siteName: site.name, locale: "en_CA", images: ogImages };
export const twitterImages = [og.src];

/** Keeps "Title | Brand" within 60 characters by trimming the page part when needed. */
export function fitTitle(title: string, shorter?: string): string {
  const room = 60 - ` | ${site.name}`.length;
  return title.length > room && shorter ? shorter : title;
}
