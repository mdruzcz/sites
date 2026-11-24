import Link from "next/link";
import Image from "next/image";
import { photo as lookup, type PhotoKey } from "@/lib/photos";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  photo: PhotoKey;
  photoAlt?: string;
  /** CSS object-position, so the roofline stays in frame on wide crops. */
  position?: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Last breadcrumb label. Home is always prepended. */
  crumb?: string;
  /** Extra breadcrumb steps between Home and `crumb`. */
  trail?: Crumb[];
  /** "lg" is the taller landing-page hero; "md" suits content pages. */
  size?: "md" | "lg";
  /** Buttons, proof points or anything else that sits under the intro. */
  children?: React.ReactNode;
}

/**
 * Inner-page hero. Same idea as the homepage: one photograph edge to edge, the
 * header floating on top of it, and the heading bottom-left. The top and bottom
 * shades are what keep the nav and the title readable on any photo.
 *
 * Any route that uses this must be listed in HERO_ROUTES in header-frame.tsx.
 */
export function PageHero({
  photo,
  photoAlt,
  position = "center 62%",
  eyebrow,
  title,
  intro,
  crumb,
  trail = [],
  size = "md",
  children
}: PageHeroProps) {
  const p = lookup(photo);
  const height =
    size === "lg"
      ? "min-h-[34rem] md:min-h-[40rem] lg:min-h-[max(78svh,42rem)]"
      : "min-h-[28rem] md:min-h-[32rem]";

  return (
    <section className={`relative isolate flex flex-col justify-end overflow-hidden bg-[var(--color-ink-deep)] text-white ${height}`}>
      <Image
        src={p.src}
        alt={photoAlt ?? p.alt}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={p.blurDataURL}
        className="-z-[2] object-cover"
        style={{ objectPosition: position }}
      />
      <div aria-hidden className="hero-shade-top -z-[1]" />
      <div aria-hidden className="hero-shade-bottom -z-[1]" />

      <div className="shell pb-10 pt-44 md:pb-14 md:pt-56">
        {crumb && (
          <nav aria-label="Breadcrumb" className="crumbs mb-5">
            <Link href="/">Home</Link>
            {trail.map((t) => (
              <span key={t.label} className="contents">
                <span aria-hidden>/</span>
                {t.href ? <Link href={t.href}>{t.label}</Link> : <span>{t.label}</span>}
              </span>
            ))}
            <span aria-hidden>/</span>
            <span aria-current="page">{crumb}</span>
          </nav>
        )}
        {eyebrow && <p className="eyebrow text-[#ffd24a]">{eyebrow}</p>}
        <h1 className="hero-title mt-3 max-w-4xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-[1.0625rem]">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
