import Link from "next/link";
import { Fragment } from "react";
import { Photo } from "@/components/Photo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, type Crumb } from "@/lib/seo";
import type { PhotoKey } from "@/lib/photos";

interface PageHeroProps {
  photo: PhotoKey;
  photoAlt?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  /**
   * Breadcrumb trail AFTER Home (Home is always prepended). When provided, the
   * hero also emits BreadcrumbList structured data.
   */
  crumbs?: Crumb[];
  /** Legacy single-label crumb (visual only, no schema). Prefer `crumbs`. */
  crumb?: string;
}

/**
 * Standard inner-page header: a photograph, a strong scrim, and the heading on
 * top. The scrim is not decorative — it is what guarantees the title stays
 * readable regardless of how bright the photo is. A soft fade at the base
 * blends the band into the page background below it.
 */
export function PageHero({ photo, photoAlt, eyebrow, title, intro, crumbs, crumb }: PageHeroProps) {
  const trail = crumbs ?? (crumb ? [{ name: crumb, href: "" }] : []);

  return (
    <section className="relative isolate">
      {crumbs && crumbs.length > 0 && <JsonLd data={breadcrumbLd(crumbs)} />}

      <Photo
        name={photo}
        alt={photoAlt}
        ratio="aspect-[3/2] sm:aspect-[16/8] md:aspect-[21/7]"
        sizes="100vw"
        priority
        quality={70}
        scrim="strong"
      />
      {/* Fade the very bottom of the band into the page below it. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-bg)] to-transparent"
      />

      <div className="absolute inset-0 flex items-end">
        <div className="shell pb-12 md:pb-16">
          {trail.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1.5 text-xs text-white/65">
              <Link href="/" className="transition hover:text-white hover:underline">
                Home
              </Link>
              {trail.map((c, i) => {
                const last = i === trail.length - 1;
                return (
                  <Fragment key={c.name}>
                    <span aria-hidden className="text-white/40">/</span>
                    {last || !c.href ? (
                      <span className="text-white" aria-current="page">{c.name}</span>
                    ) : (
                      <Link href={c.href} className="transition hover:text-white hover:underline">
                        {c.name}
                      </Link>
                    )}
                  </Fragment>
                );
              })}
            </nav>
          )}
          {eyebrow && <p className="eyebrow eyebrow-star text-[var(--color-gold-bright)]">{eyebrow}</p>}
          <h1 className="font-display h1-fluid mt-4 max-w-3xl leading-tight text-white">
            {title}
          </h1>
          {intro && (
            <p className="lead mt-5 max-w-2xl text-white/85">{intro}</p>
          )}
        </div>
      </div>
    </section>
  );
}
