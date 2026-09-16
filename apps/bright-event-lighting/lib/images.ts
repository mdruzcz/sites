import imagesData from "@/content/images.json";

type ImageMeta = { width: number; height: number; alt: string; blurDataURL: string };

const images = imagesData as Record<string, ImageMeta>;

/** Look up width/height/alt/blur placeholder for a local image in public/images. */
export function img(src: string): ImageMeta {
  const m = images[src];
  if (!m) {
    return { width: 1600, height: 1067, alt: "", blurDataURL: "" };
  }
  return m;
}

/** Props to spread onto next/image for a local photo: blur placeholder plus a default alt. */
export function picProps(src: string, alt?: string) {
  const m = img(src);
  return {
    src,
    alt: alt ?? m.alt,
    ...(m.blurDataURL ? { placeholder: "blur" as const, blurDataURL: m.blurDataURL } : {}),
  };
}
