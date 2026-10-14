import Link from "next/link";
import { Photo } from "@/components/photo";
import { Breadcrumbs } from "@/components/ui";
import { Icon } from "@/components/icons";

interface PageHeroProps {
  photo: string;
  photoAlt?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: { href?: string; label: string }[];
  cta?: { href: string; label: string };
  secondary?: { href: string; label: string };
  compact?: boolean;
}

/** Inner-page header: photo, strong scrim, heading and optional CTAs. */
export function PageHero({ photo, photoAlt, eyebrow, title, intro, crumbs, cta, secondary, compact = false }: PageHeroProps) {
  return (
    <section className="relative isolate bg-[var(--color-night)] text-white">
      <Photo
        name={photo}
        alt={photoAlt}
        ratio={compact ? "aspect-[3/2] sm:aspect-[16/7] md:aspect-[21/6]" : "aspect-[4/3] sm:aspect-[16/8] md:aspect-[21/8]"}
        sizes="100vw"
        priority
        scrim="side"
      />
      <div className="absolute inset-0 flex items-end">
        <div className="shell pb-9 md:pb-14">
          {crumbs && <div className="mb-5"><Breadcrumbs items={crumbs} light /></div>}
          {eyebrow && <p className="eyebrow text-[var(--color-gold-bright)]">{eyebrow}</p>}
          <h1 className="font-display mt-3 max-w-3xl text-[2rem] leading-[1.08] md:text-[3.2rem]">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-white/82 md:text-lg">{intro}</p>}
          {(cta || secondary) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {cta && (
                <Link href={cta.href} className="btn-accent">
                  {cta.label} <Icon.arrow size={16} />
                </Link>
              )}
              {secondary && (
                <Link href={secondary.href} className="btn-ghost-light">
                  {secondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
