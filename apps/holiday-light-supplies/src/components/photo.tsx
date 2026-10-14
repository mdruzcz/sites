import Image from "next/image";
import { photo, type PhotoKey } from "@/lib/photos";

interface PhotoProps {
  name: PhotoKey | string;
  alt?: string;
  className?: string;
  /** Tailwind aspect ratio class applied to the wrapper. */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  /** Readability scrim for text overlaid on the photo. */
  scrim?: "none" | "strong" | "side";
  rounded?: string;
  imgClassName?: string;
}

/** Editorial photo with blur-up placeholder and an optional scrim. */
export function Photo({
  name,
  alt,
  className = "",
  ratio = "aspect-[4/3]",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  scrim = "none",
  rounded = "",
  imgClassName = ""
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
        placeholder={p.blurDataURL ? "blur" : "empty"}
        blurDataURL={p.blurDataURL || undefined}
        className={`object-cover ${imgClassName}`}
      />
      {scrim === "strong" && <div className="scrim-strong absolute inset-0" aria-hidden />}
      {scrim === "side" && <div className="scrim-side absolute inset-0" aria-hidden />}
    </div>
  );
}
