import type { ReactNode } from "react";
import Link from "next/link";
import type { Block, Section, Faq } from "@/lib/content";
import { site } from "@/lib/site";

const ROUTES = new Set<string>([
  ...site.services.map((s) => `/${s.slug}`),
  ...site.cities.map((c) => `/${c.route}`),
  "/gallery", "/contact-us", "/about-us", "/services", "/service-areas", "/resources",
  "/retaining-wall-cost-guide-ontario", "/how-to-choose-retaining-wall-material", "/how-long-do-retaining-walls-last", "/retaining-wall-maintenance-tips", "/tips-on-how-to-stain-your-wooden-retaining-wall", "/retaining-wall-drainage-explained", "/do-i-need-a-permit-for-a-retaining-wall-in-ontario", "/signs-your-retaining-wall-is-failing", "/timber-vs-block-retaining-walls", "/retaining-wall-height-limits-and-engineering", "/building-a-retaining-wall-on-clay-soil", "/retaining-walls-and-property-value",
]);
const LABELS: Record<string, string> = {
  "/gallery": "our project gallery", "/contact-us": "contact us", "/about-us": "about us", "/services": "our services", "/service-areas": "service areas", "/resources": "our guides",
};
const PATH_RE = /(\/[a-z0-9-]+(?:\/[a-z0-9-]+)?)(?=[\s.,;:)!?]|$)/g;

function labelFor(p: string) {
  if (LABELS[p]) return LABELS[p];
  const svc = site.services.find((s) => `/${s.slug}` === p);
  if (svc) return svc.name.toLowerCase();
  const city = site.cities.find((c) => `/${c.route}` === p);
  if (city) return `retaining walls in ${city.name}`;
  return p.slice(1).replace(/-/g, " ");
}

export function linkify(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0, i = 0;
  for (const m of text.matchAll(PATH_RE)) {
    const p = m[1];
    if (!ROUTES.has(p)) continue;
    out.push(text.slice(last, m.index));
    out.push(<Link key={i++} href={p}>{labelFor(p)}</Link>);
    last = (m.index ?? 0) + p.length;
  }
  out.push(text.slice(last));
  return out;
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{linkify(block.text)}</p>;
    case "ul":
      return (
        <ul className="mb-5 space-y-2.5">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-[17px] leading-[1.65] text-ink-2"><span aria-hidden className="mt-[11px] h-[3px] w-4 shrink-0 bg-accent" /><span>{linkify(it)}</span></li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="mb-6 grid gap-3">
          {block.items.map((s, i) => (
            <li key={i} className="grid grid-cols-[44px_1fr] gap-4 border border-[var(--line)] bg-white p-4">
              <span className="flex h-11 w-11 items-center justify-center bg-ink font-display text-lg font-extrabold text-accent" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              <div><h3 className="font-display text-lg font-bold">{s.title}</h3><p className="!mb-0 mt-1 !text-[16px]">{linkify(s.text)}</p></div>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return <aside className="my-6 border-l-4 border-accent bg-accent-soft/60 px-5 py-4 text-[17px] leading-relaxed text-ink">{linkify(block.text)}</aside>;
    default:
      return null;
  }
}

export function Sections({ sections }: { sections: Section[] }) {
  return (
    <div className="prose-lrw">
      {sections.map((s) => (
        <section key={s.heading} className="mt-10 first:mt-0">
          <h2 id={slugify(s.heading)} className="mb-4 scroll-mt-28 font-display text-2xl font-extrabold leading-tight md:text-[28px]">{s.heading}</h2>
          {s.blocks.map((b, i) => <BlockView key={i} block={b} />)}
        </section>
      ))}
    </div>
  );
}

export function FaqList({ faqs, title = "Questions we get asked" }: { faqs: Faq[]; title?: string }) {
  if (!faqs?.length) return null;
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-extrabold md:text-[28px]">{title}</h2>
      <div className="mt-5 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {faqs.map((f, i) => (
          <details key={i} className="faq group">
            <summary className="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 py-4 text-left text-[17px] font-bold text-ink">
              {f.q}
              <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center bg-ink text-accent transition group-open:rotate-45">+</span>
            </summary>
            <p className="pb-5 text-[16px] leading-relaxed text-ink-2">{linkify(f.a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function TableOfContents({ sections }: { sections: Section[] }) {
  return (
    <nav aria-label="On this page" className="border border-[var(--line)] bg-white p-5">
      <p className="kicker">On this page</p>
      <ol className="mt-3 space-y-2 text-[15px]">
        {sections.map((s) => (
          <li key={s.heading}><a href={`#${slugify(s.heading)}`} className="text-ink-2 hover:text-accent-2">{s.heading}</a></li>
        ))}
      </ol>
    </nav>
  );
}
