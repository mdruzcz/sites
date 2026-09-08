import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/photos";
import { site } from "@/lib/site";

interface Crumb { name: string; href: string }

/** Full-bleed photo hero with a left content panel; used on every inner page. */
export default function PageHero({ photo, kicker, title, intro, crumbs, children, compact = false }: { photo: Photo; kicker?: string; title: string; intro?: string; crumbs?: Crumb[]; children?: React.ReactNode; compact?: boolean }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <Image src={photo.image} alt={photo.alt} fill priority sizes="100vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden />
      <div className={`container-x relative ${compact ? "py-14 md:py-20" : "py-20 md:py-28"}`}>
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-[13px] text-stone-2">
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {i === crumbs.length - 1 ? <span className="text-paper">{c.name}</span> : <Link href={c.href} className="hover:text-accent">{c.name}</Link>}
              </span>
            ))}
          </nav>
        )}
        {kicker && <p className="kicker text-accent">{kicker}</p>}
        <h1 className="display mt-3 max-w-4xl text-4xl md:text-5xl lg:text-[60px]">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/85 md:text-xl">{intro}</p>}
        {children ?? (
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact-us#quote" className="btn btn-accent">Request a free quote</Link>
            <a href={site.phoneHref} className="btn btn-paper">Call {site.phone}</a>
          </div>
        )}
      </div>
    </section>
  );
}
