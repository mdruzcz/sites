import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { SITE_URL } from "@/lib/utils";

export function Breadcrumbs({ items, light = false }: { items: { href?: string; label: string }[]; light?: boolean }) {
  const cls = light ? "text-white/65" : "text-[var(--color-muted)]";
  const active = light ? "text-white" : "text-[var(--color-text)]";
  return (
    <nav aria-label="Breadcrumb" className={`text-xs ${cls}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden>/</span>
            {it.href ? (
              <Link href={it.href} className="hover:underline">{it.label}</Link>
            ) : (
              <span className={active} aria-current="page">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbLd(items: { href?: string; label: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...items.map((it, i) => ({ "@type": "ListItem", position: i + 2, name: it.label, ...(it.href ? { item: `${SITE_URL}${it.href}` } : {}) }))
    ]
  };
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  tone = "light",
  action
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: { href: string; label: string };
}) {
  const dark = tone === "dark";
  return (
    <div className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <p className={`eyebrow ${align === "left" ? "eyebrow-rule" : ""} ${dark ? "text-[var(--color-gold-bright)]" : "text-[var(--color-accent)]"}`}>{eyebrow}</p>}
        <h2 className={`font-display h2-fluid mt-3 ${dark ? "text-white" : "text-[var(--color-text)]"}`}>{title}</h2>
        {sub && <p className={`mt-4 text-[1.05rem] leading-relaxed ${dark ? "text-white/75" : "text-[var(--color-muted)]"}`}>{sub}</p>}
      </div>
      {action && (
        <Link href={action.href} className={`inline-flex items-center gap-1 text-sm font-semibold ${dark ? "text-[var(--color-gold-bright)]" : "text-[var(--color-brand)]"} hover:underline`}>
          {action.label} <Icon.arrow size={16} />
        </Link>
      )}
    </div>
  );
}

export function CheckList({ items, className = "", tone = "light" }: { items: string[]; className?: string; tone?: "light" | "dark" }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((it) => (
        <li key={it} className={`flex items-start gap-3 leading-relaxed ${tone === "dark" ? "text-white/85" : "text-[var(--color-text-soft)]"}`}>
          <span className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full ${tone === "dark" ? "bg-[var(--color-gold)] text-[var(--color-text)]" : "bg-[var(--color-brand)] text-white"}`}>
            <Icon.check size={12} />
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function IconTile({ icon, title, body }: { icon: IconName; title: string; body: string }) {
  const I = Icon[icon];
  return (
    <div className="card p-6">
      <span className="grid size-11 place-items-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
        <I size={22} />
      </span>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">{body}</p>
    </div>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <details key={i} className="card group overflow-hidden">
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold">
            {f.q}
            <Icon.chevron size={18} className="shrink-0 text-[var(--color-muted)] transition group-open:rotate-180" />
          </summary>
          <p className="px-6 pb-6 leading-relaxed text-[var(--color-text-soft)]">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  };
}
