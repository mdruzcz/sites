import Link from "next/link";
import { Icon } from "./Icons";

/* Small shared building blocks used across every page. */

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  gold = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "center" | "left";
  gold?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-10 md:mb-14`}>
      {eyebrow && <span className={`pill ${gold ? "pill-gold" : ""} mb-4`}>{eyebrow}</span>}
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

export function FeatureGrid({
  items,
  cols = 4,
  gold = false,
}: {
  items: { icon: React.ReactNode; title: string; body: string }[];
  cols?: 2 | 3 | 4;
  gold?: boolean;
}) {
  const colClass = cols === 2 ? "sm:grid-cols-2" : cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <div className={`grid gap-4 ${colClass}`}>
      {items.map((it) => (
        <div key={it.title} className="card card-static p-6">
          <IconTile gold={gold} className="mb-4">{it.icon}</IconTile>
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
        <Link key={c.slug} href={`${basePath}/${c.slug}`} className={`chip ${c.slug === current ? "chip-active" : ""}`}>
          {c.name}
        </Link>
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
