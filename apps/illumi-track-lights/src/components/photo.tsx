import Image from "next/image";
import { photo, type PhotoKey } from "@/lib/photos";

interface PhotoProps {
  name: PhotoKey;
  alt?: string;
  className?: string;
  /** Tailwind aspect ratio class applied to the wrapper, e.g. "aspect-[4/3]". */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  scrim?: "none" | "soft" | "strong" | "hero";
  rounded?: string;
  imgClassName?: string;
}

/** Lifestyle photo with a blur-up placeholder and an optional readability scrim. */
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
        placeholder="blur"
        blurDataURL={p.blurDataURL}
        className={`object-cover ${imgClassName}`}
      />
      {scrim === "soft" && <div className="photo-scrim-soft" aria-hidden />}
      {scrim === "strong" && <div className="photo-scrim" aria-hidden />}
      {scrim === "hero" && <div className="photo-scrim-hero" aria-hidden />}
    </div>
  );
}
