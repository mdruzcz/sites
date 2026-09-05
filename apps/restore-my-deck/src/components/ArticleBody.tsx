import type { ReactNode } from "react";
import Link from "next/link";
import type { Block } from "@/lib/content";

const INTERNAL = /(\/(?:contact-us|about-us|services|service-areas|projects|blog|deck-[a-z-]+|fence-[a-z-]+|pressure-washing-services|sealing-services|[a-z]+-deck-fence-staining|[a-z]+-deck-staining|how-[a-z0-9-]+|oil-based-[a-z-]+|5-signs-[a-z-]+|pressure-washing-vs-[a-z-]+|cedar-vs-[a-z-]+|semi-transparent-[a-z-]+|best-time-[a-z-]+|fence-staining-vs-[a-z-]+)\b)/g;

function linkify(text: string): ReactNode[] {
  return text.split(INTERNAL).map((part, i) =>
    /^\/[a-z0-9]/.test(part) ? <Link key={i} href={part} className="font-semibold text-[var(--accent-deep)] underline decoration-[var(--accent-soft)] decoration-2 underline-offset-2 hover:decoration-[var(--accent)]">{part}</Link> : <span key={i}>{part}</span>
  );
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 id={slugify(block.text)} className="font-display mt-12 mb-4 scroll-mt-28 text-[1.7rem] md:text-[2.05rem]">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-8 mb-3 text-xl font-bold">{block.text}</h3>;
    case "p":
      return <p className="mb-5 text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">{linkify(block.text)}</p>;
    case "ul":
      return (
        <ul className="mb-6 space-y-2.5">
          {block.items.map((it, i) => (
            <li key={i} className="flex items-start gap-3 leading-relaxed text-[var(--ink-soft)]"><span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-[var(--accent)]" /><span>{linkify(it)}</span></li>
          ))}
        </ul>
      );
    case "callout":
      return <aside className="my-8 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] px-6 py-5"><p className="leading-relaxed text-[var(--ink)]">{linkify(block.text)}</p></aside>;
    default:
      return null;
  }
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return <div>{blocks.map((b, i) => <BlockView key={i} block={b} />)}</div>;
}
