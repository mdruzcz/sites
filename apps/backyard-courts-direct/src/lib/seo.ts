import type { Metadata } from "next";
import { site } from "./site";

/** 1200 x 630 share card in /public, one per brand. */
export const ogImage = { url: "/og.jpg", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` };
export const ogImages = [ogImage];
export const ogBase = { type: "website" as const, siteName: site.name, locale: "en_CA", images: ogImages };
export const twitterImages = [ogImage.url];

/** Keeps "Title | Brand" within 60 characters by falling back to a shorter page title. */
export function fitTitle(title: string, shorter?: string): string {
  const room = 60 - ` | ${site.name}`.length;
  return title.length > room && shorter ? shorter : title;
}

/** Trims a description to 160 characters on a word boundary. */
export function fitDescription(text: string): string {
  if (text.length <= 160) return text;
  const cut = text.slice(0, 160);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "") + ".";
}

/** Title, description, canonical, Open Graph and Twitter tags for one page. */
export function pageMeta({ title, description, path, type = "website" }: { title: string; description: string; path: string; type?: "website" | "article" }): Metadata {
  const d = fitDescription(description);
  return {
    title,
    description: d,
    alternates: { canonical: path },
    openGraph: { ...ogBase, type, title: `${title} | ${site.name}`, description: d, url: path },
    twitter: { card: "summary_large_image", title, description: d, images: twitterImages },
  };
}
