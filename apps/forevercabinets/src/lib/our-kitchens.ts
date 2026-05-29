import fs from "fs";
import path from "path";

export type OurKitchenPhoto = {
  filename: string;
  url: string;
  caption: string;
};

let cache: OurKitchenPhoto[] | null = null;

function captionFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  return base
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getOurKitchens(): OurKitchenPhoto[] {
  if (cache) return cache;
  try {
    const dir = path.join(process.cwd(), "public", "images", "our-kitchens");
    const entries = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isFile() && /\.(jpe?g|png|webp|avif)$/i.test(e.name))
      .map((e) => e.name)
      .sort();
    cache = entries.map((filename) => ({
      filename,
      url: `/images/our-kitchens/${filename}`,
      caption: captionFromFilename(filename),
    }));
    return cache;
  } catch {
    cache = [];
    return cache;
  }
}
