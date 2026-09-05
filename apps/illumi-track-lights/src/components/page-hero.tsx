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
  /** Legacy single crumb label (existing pages). */
  crumb?: string;
  compact?: boolean;
}

/**
 * Standard inner-page header: a photograph, a strong scrim and the heading on top.
 * Emits BreadcrumbList JSON-LD for the trail it renders.
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
    <section className="relative isolate bg-[var(--color-ink)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Photo
        name={photo}
        alt={photoAlt}
        ratio={compact ? "aspect-[3/2] sm:aspect-[16/7] md:aspect-[21/6]" : "aspect-[3/2] sm:aspect-[16/8] md:aspect-[21/7.5]"}
        sizes="100vw"
        priority
        scrim="strong"
      />
      <div className="absolute inset-0 flex items-end">
        <div className="shell pb-10 md:pb-14">
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-5 text-xs text-white/65">
              {trail.map((c, i) => (
                <span key={i}>
                  {i > 0 && <span className="mx-1.5">/</span>}
                  {c.href && i < trail.length - 1 ? (
                    <Link href={c.href} className="transition hover:text-white hover:underline">{c.label}</Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && <p className="eyebrow text-[var(--color-gold)]">{eyebrow}</p>}
          <h1 className="font-display mt-3 max-w-3xl text-[2rem] leading-[1.08] text-white md:text-[3.25rem]">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/80">{intro}</p>}
        </div>
      </div>
    </section>
  );
}
