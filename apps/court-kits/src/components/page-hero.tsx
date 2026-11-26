import Link from "next/link";
import Image from "next/image";
import { photos, type PhotoKey } from "@/lib/photos";
import { JsonLd, breadcrumbLd } from "@/lib/jsonld";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  photo: PhotoKey;
  photoAlt: string;
  position?: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Last breadcrumb label. Home is always prepended. */
  crumb?: string;
  /** Steps between Home and `crumb`. */
  trail?: Crumb[];
  /** Path of this page, for breadcrumb structured data. */
  path?: string;
  size?: "md" | "lg";
  children?: React.ReactNode;
}

/**
 * One photograph edge to edge with the header floating on it and the heading
 * bottom-left. Any page that does NOT use this must be listed in isSolid()
 * in header-frame.tsx.
 */
export function PageHero({ photo, photoAlt, position = "center 60%", eyebrow, title, intro, crumb, trail = [], path, size = "md", children }: PageHeroProps) {
  const p = photos[photo];
  const height = size === "lg" ? "min-h-[36rem] md:min-h-[42rem] lg:min-h-[max(86svh,44rem)]" : "min-h-[27rem] md:min-h-[31rem]";

  return (
    <section className={`relative isolate flex flex-col justify-end overflow-hidden bg-[var(--ink-deep)] text-white ${height}`}>
      <Image
        src={p.src}
        alt={photoAlt}
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

      <div className="shell pb-10 pt-44 md:pb-14 md:pt-52">
        {crumb && (
          <nav aria-label="Breadcrumb" className="crumbs mb-4">
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
        {eyebrow && <p className="eyebrow !text-[var(--cta-from)]">{eyebrow}</p>}
        <h1 className="hero-title mt-3 max-w-4xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/88 md:text-[1.0625rem]">{intro}</p>}
        {children}
      </div>
      {crumb && path && <JsonLd data={breadcrumbLd([...trail.map((t) => ({ name: t.label, path: t.href ?? path })), { name: crumb, path }])} />}
    </section>
  );
}
