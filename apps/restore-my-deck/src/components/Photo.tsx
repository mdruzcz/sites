import Image from "next/image";
import { photo } from "@/lib/photos";

interface PhotoProps {
  name: string;
  alt?: string;
  className?: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  scrim?: "none" | "soft" | "hero";
  rounded?: string;
}

/** Real install photo with blur-up and an optional readability scrim. */
export function Photo({ name, alt, className = "", ratio = "aspect-[4/3]", sizes = "(max-width: 768px) 100vw, 50vw", priority = false, scrim = "none", rounded = "" }: PhotoProps) {
  const p = photo(name);
  return (
    <div className={`relative isolate overflow-hidden ${ratio} ${rounded} ${className}`}>
      <Image src={p.image} alt={alt ?? p.alt} fill sizes={sizes} priority={priority} placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover" />
      {scrim === "soft" && <div className="photo-scrim" aria-hidden />}
      {scrim === "hero" && <div className="photo-scrim-hero" aria-hidden />}
    </div>
  );
}
