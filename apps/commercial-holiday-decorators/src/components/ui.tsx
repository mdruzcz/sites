import Link from "next/link";
import Image from "next/image";
import { Icon } from "./Icons";
import type { MediaImage } from "@/lib/content";

/* Small shared building blocks used across every page. */

export function SectionHeading({ eyebrow, title, sub, align = "center", as: Tag = "h2" }: { eyebrow?: string; title: React.ReactNode; sub?: React.ReactNode; align?: "center" | "left"; as?: "h1" | "h2" | "h3" }) {
  const center = align === "center";
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-10 md:mb-14`}>
      {eyebrow && <span className="pill mb-4">{eyebrow}</span>}
      <Tag className="font-display text-3xl md:text-[2.6rem] leading-[1.1] text-ink text-balance">{title}</Tag>
      {sub && <p className="mt-4 text-base md:text-lg text-[var(--muted)] leading-relaxed text-balance">{sub}</p>}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-[var(--muted)]">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href="/" className="hover:text-ink">Home</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {it.href ? <Link href={it.href} className="hover:text-ink">{it.name}</Link> : <span className="text-body">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function FaqList({ items, name = "faq" }: { items: { question: string; answer: string }[]; name?: string }) {
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <details key={i} className="faq-item" name={name}>
          <summary>
            <span className="text-ink">{f.question}</span>
            <span className="faq-icon" aria-hidden="true">+</span>
          </summary>
          <div className="faq-body">{f.answer}</div>
        </details>
      ))}
    </div>
  );
}

export function IconTile({ children, gold = false, className = "" }: { children: React.ReactNode; gold?: boolean; className?: string }) {
  return <span className={`icon-tile ${gold ? "icon-tile-gold" : ""} ${className}`}>{children}</span>;
}

export function FeatureGrid({ items, cols = 3, icons }: { items: { title: string; body: string }[]; cols?: 2 | 3 | 4; icons?: React.ReactNode[] }) {
  const colClass = cols === 2 ? "sm:grid-cols-2" : cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <div className={`grid gap-4 ${colClass}`}>
      {items.map((it, i) => (
        <div key={it.title} className="card card-static p-6">
          <IconTile className="mb-4">{icons?.[i % (icons.length || 1)] ?? <Icon.Check />}</IconTile>
          <h3 className="font-bold text-ink text-lg mb-1.5">{it.title}</h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed">{it.body}</p>
        </div>
      ))}
    </div>
  );
}

export function CheckList({ items, className = "" }: { items: readonly string[] | string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-body">
          <span className="mt-0.5 inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-light)] text-[var(--accent-ink)]">
            <Icon.Check width={12} height={12} strokeWidth={3} />
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function CityChips({ cities, basePath, current }: { cities: { slug: string; name: string }[]; basePath: string; current?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {cities.map((c) => (
        <Link key={c.slug} href={`${basePath}/${c.slug}`} className={`chip ${c.slug === current ? "chip-active" : ""}`}>{c.name}</Link>
      ))}
    </div>
  );
}

export function StatRow({ stats }: { stats: readonly { stat: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="card card-static p-5 text-center">
          <div className="stat-num text-3xl md:text-4xl">{s.stat}</div>
          <p className="mt-2 text-xs md:text-sm text-[var(--muted)] leading-snug">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/** A photo tile with blur placeholder; `ratio` is a Tailwind aspect class. */
export function Photo({ img, sizes = "(max-width: 768px) 100vw, 33vw", className = "", ratio = "aspect-[4/3]", priority = false, caption }: { img: MediaImage; sizes?: string; className?: string; ratio?: string; priority?: boolean; caption?: string }) {
  return (
    <figure className={`relative overflow-hidden rounded-2xl ${ratio} ${className}`}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} placeholder="blur" blurDataURL={img.blurDataURL} priority={priority} className="object-cover" />
      {caption && <figcaption className="absolute left-3 bottom-3 pill pill-white !text-[0.62rem] !py-1">{caption}</figcaption>}
    </figure>
  );
}

/** Masonry-ish photo grid: the first tile spans two columns on desktop. */
export function PhotoGrid({ images, href = "/gallery" }: { images: MediaImage[]; href?: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {images.map((p, i) => (
        <Link key={p.key} href={href} className={`relative overflow-hidden rounded-2xl group ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[4/3]"}`}>
          <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 50vw, 25vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </Link>
      ))}
    </div>
  );
}

export function RelatedLinks({ title = "Related", items }: { title?: string; items: { label: string; href: string; desc?: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)] mb-3">{title}</h3>
      <ul className="grid sm:grid-cols-2 gap-3">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="card card-lift p-4 flex items-center justify-between gap-3">
              <span><span className="font-semibold text-ink block">{it.label}</span>{it.desc && <span className="text-xs text-[var(--muted)]">{it.desc}</span>}</span>
              <Icon.Arrow width={16} height={16} className="text-[var(--accent-ink)] shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
