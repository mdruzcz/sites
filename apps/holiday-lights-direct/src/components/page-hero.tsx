import Link from "next/link";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/photos";

interface PageHeroProps {
  photo: PhotoKey;
  photoAlt?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Breadcrumb trail, excluding Home (which is always prepended). */
  crumb?: string;
}

/**
 * Standard inner-page header: a photograph, a strong scrim, and the heading on
 * top. The scrim is not decorative — it is what guarantees the title stays
 * readable regardless of how bright the photo is.
 */
export function PageHero({ photo, photoAlt, eyebrow, title, intro, crumb }: PageHeroProps) {
  return (
    <section className="relative isolate">
      <Photo
        name={photo}
        alt={photoAlt}
        ratio="aspect-[3/2] sm:aspect-[16/8] md:aspect-[21/7]"
        sizes="100vw"
        priority
        scrim="strong"
      />
      <div className="absolute inset-0 flex items-end">
        <div className="shell pb-11 md:pb-16">
          {crumb && (
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/65">
              <Link href="/" className="transition hover:text-white hover:underline">
                Home
              </Link>
              <span className="mx-1.5">/</span>
              <span className="text-white">{crumb}</span>
            </nav>
          )}
          {eyebrow && <p className="eyebrow text-[var(--color-gold-bright)]">{eyebrow}</p>}
          <h1 className="font-display mt-4 max-w-3xl text-[2.1rem] leading-tight text-white md:text-[3.5rem]">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/80">{intro}</p>
          )}
        </div>
      </div>
    </section>
  );
}
