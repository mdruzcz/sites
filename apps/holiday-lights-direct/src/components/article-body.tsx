import type { ReactNode } from "react";

export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "callout"; text: string }
  | { type: "ul"; items: string[] };

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Block({ block }: { block: ArticleBlock }): ReactNode {
  switch (block.type) {
    case "h2":
      return (
        <h2 id={slugify(block.text)} className="font-display mt-12 mb-4 scroll-mt-28 text-[1.75rem] md:text-[2.1rem]">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-8 mb-3 text-xl font-semibold">{block.text}</h3>;
    case "p":
      return <p className="mb-5 text-[1.05rem] leading-relaxed text-[var(--color-text-soft)]">{block.text}</p>;
    case "ul":
      return (
        <ul className="mb-6 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 leading-relaxed text-[var(--color-text-soft)]">
              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="my-8 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-gold-soft)] px-6 py-5">
          <p className="leading-relaxed text-[var(--color-text)]">{block.text}</p>
        </aside>
      );
    default:
      return null;
  }
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div>
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}
