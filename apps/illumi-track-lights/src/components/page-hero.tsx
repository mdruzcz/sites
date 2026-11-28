import Link from "next/link";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/photos";
import { SITE_URL } from "@/lib/utils";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  photo: PhotoKey;
  photoAlt?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Breadcrumb trail excluding Home (always prepended). Last item is the current page. */
  crumbs?: Crumb[];
  /** Legacy single crumb label (older pages). */
  crumb?: string;
  compact?: boolean;
}

/**
 * Inner-page banner: the breadcrumb on white, then a wide photograph with the
 * heading and one plain sentence set bottom-left. Emits BreadcrumbList JSON-LD
 * for the trail it renders.
 */
export function PageHero({ photo, photoAlt, eyebrow, title, intro, crumbs, crumb, compact = false }: PageHeroProps) {
  if (!crumbs) crumbs = crumb ? [{ label: crumb }] : [];
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href ? `${SITE_URL}${c.href === "/" ? "" : c.href}` || SITE_URL : undefined
    }))
  };
  return (
    <section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="shell py-3 text-[0.8rem] text-[var(--color-muted)]">
          {trail.map((c, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-1.5" aria-hidden>›</span>}
              {c.href && i < trail.length - 1 ? (
                <Link href={c.href} className="transition hover:text-[var(--color-accent)] hover:underline">{c.label}</Link>
              ) : (
                <span className="text-[var(--color-text-soft)]">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="on-dark relative isolate bg-[var(--color-ink-deep)] text-white">
        <Photo
          name={photo}
          alt={photoAlt}
          ratio={compact ? "aspect-[4/3] sm:aspect-[16/6] md:aspect-[24/6]" : "aspect-[4/3] sm:aspect-[16/7] md:aspect-[24/7.5]"}
          sizes="100vw"
          priority
          scrim="strong"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="shell pb-7 md:pb-10">
            {eyebrow && <p className="eyebrow text-white/85">{eyebrow}</p>}
            <h1 className="font-display mt-2 max-w-3xl text-[1.85rem] leading-[1.12] text-white md:text-[2.75rem]">{title}</h1>
            {intro && <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-white/90 md:text-[1.0625rem]">{intro}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
