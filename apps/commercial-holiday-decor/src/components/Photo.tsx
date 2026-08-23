import Image from "next/image";
import { photo, type PhotoKey } from "@/lib/photos";

interface PhotoProps {
  /** Key into src/lib/photos.json */
  name: PhotoKey;
  /** Override the manifest alt text when a page needs more specific wording. */
  alt?: string;
  className?: string;
  /** Tailwind aspect ratio class applied to the wrapper, e.g. "aspect-[4/3]". */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  /** Adds a bottom-up gradient so overlaid text stays readable. */
  scrim?: "none" | "soft" | "strong";
  rounded?: string;
  /** Compression quality (must be whitelisted in next.config images.qualities). */
  quality?: number;
}

/**
 * Lifestyle photo with a blur-up placeholder and an optional readability scrim.
 *
 * The scrim exists because the previous build laid white headings straight onto
 * photos and page backgrounds — anything overlaying an image should pass
 * `scrim="soft"` or `"strong"`.
 */
export function Photo({
  name,
  alt,
  className = "",
  ratio = "aspect-[4/3]",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  scrim = "none",
  rounded = "",
  quality = 78
}: PhotoProps) {
  const p = photo(name);
  return (
    <div className={`relative isolate overflow-hidden ${ratio} ${rounded} ${className}`}>
      <Image
        src={p.src}
        alt={alt ?? p.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder="blur"
        blurDataURL={p.blurDataURL}
        className="object-cover"
      />
      {scrim === "soft" && <div className="photo-scrim-soft" aria-hidden />}
      {scrim === "strong" && <div className="photo-scrim" aria-hidden />}
    </div>
  );
}
