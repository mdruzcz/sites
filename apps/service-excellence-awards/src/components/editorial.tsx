import type { ReactNode } from "react";
import Link from "next/link";
import type { Block, Faq } from "@/lib/content";

const PATH_RE = /(\/(?:resources\/[a-z0-9-]+|winners(?:\/[a-z0-9-]+){0,3}|resources|winners|nominate|about|why-awards-matter))(?=[\s.,;:)!?]|$)/g;

/** Turns bare site paths written in prose into links. */
export function linkify(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0, i = 0;
  for (const m of text.matchAll(PATH_RE)) {
    out.push(text.slice(last, m.index));
    const p = m[1];
    const label = p.startsWith("/resources/") ? p.slice(11).replace(/-/g, " ") : p === "/resources" ? "our homeowner guides" : p === "/winners" ? "the winners directory" : p.slice(1).replace(/-/g, " ");
    out.push(<Link key={i++} href={p} className="underline decoration-[var(--gold)]/60 underline-offset-4 hover:text-[var(--gold)]">{label}</Link>);
    last = (m.index ?? 0) + p.length;
  }
  out.push(text.slice(last));
  return out;
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="mt-4 leading-relaxed text-stone-700">{linkify(block.text)}</p>;
    case "ul":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-stone-700"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" /><span>{linkify(it)}</span></li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="mt-5 space-y-3">
          {block.items.map((s, i) => (
            <li key={i} className="grid grid-cols-[2.25rem_1fr] gap-4 rounded-lg border border-stone-200 bg-stone-50/60 p-4">
              <span className="font-serif text-2xl text-[var(--gold)]">{String(i + 1).padStart(2, "0")}</span>
              <div><p className="font-medium text-stone-900">{s.title}</p><p className="mt-1 text-sm leading-relaxed text-stone-700">{linkify(s.text)}</p></div>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return <aside className="mt-6 border-l-2 border-[var(--gold)] bg-[var(--gold-soft)] px-5 py-4 leading-relaxed text-stone-800">{linkify(block.text)}</aside>;
    default:
      return null;
  }
}

export function Sections({ sections }: { sections: { heading: string; blocks: Block[] }[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.heading} className="mt-10 first:mt-0">
          <h2 id={slugify(s.heading)} className="scroll-mt-28 font-serif text-2xl tracking-tight text-stone-900 md:text-[1.75rem]">{s.heading}</h2>
          {s.blocks.map((b, i) => <BlockView key={i} block={b} />)}
        </section>
      ))}
    </>
  );
}

export function FaqList({ faqs, title = "Common questions" }: { faqs: Faq[]; title?: string }) {
  if (!faqs?.length) return null;
  return (
    <section className="mt-12">
      <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">{title}</h2>
      <div className="mt-4 divide-y divide-stone-200 border-y border-stone-200">
        {faqs.map((f, i) => (
          <details key={i} className="group">
            <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-stone-900 [&::-webkit-details-marker]:hidden">
              {f.q}<span aria-hidden className="text-[var(--gold)] transition group-open:rotate-45">+</span>
            </summary>
            <p className="pb-5 leading-relaxed text-stone-700">{linkify(f.a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Bullets({ items, tone = "neutral" }: { items: string[]; tone?: "plus" | "minus" | "neutral" }) {
  const mark = tone === "plus" ? "+" : tone === "minus" ? "–" : "•";
  const colour = tone === "plus" ? "text-emerald-700" : tone === "minus" ? "text-amber-700" : "text-[var(--gold)]";
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-stone-700">
          <span aria-hidden className={`mt-px w-4 shrink-0 text-center font-semibold ${colour}`}>{mark}</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  if (!faqs?.length) return null;
  const data = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
