import type { ReactNode } from "react";
import Link from "next/link";
import type { Block } from "@/lib/content";

const INTERNAL = /(\/(?:contact|about|services\/[a-z0-9-]+\/[a-z0-9-]+|services\/[a-z0-9-]+|services|service-areas\/[a-z0-9-]+|service-areas|gallery|finishes|resources\/[a-z0-9-]+|resources)\b)/g;

function linkify(text: string): ReactNode[] {
  return text.split(INTERNAL).map((part, i) =>
    /^\/[a-z]/.test(part) ? <Link key={i} href={part} className="font-semibold text-[var(--orange-deep)] underline decoration-2 underline-offset-2 hover:text-[var(--orange)]">{part}</Link> : <span key={i}>{part}</span>
  );
}
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2": return <h2 id={slugify(block.text)} className="font-display mt-12 mb-4 scroll-mt-28 text-3xl md:text-4xl">{block.text}</h2>;
    case "h3": return <h3 className="mt-8 mb-3 text-xl font-bold normal-case tracking-normal" style={{ fontFamily: "var(--font-body)" }}>{block.text}</h3>;
    case "p": return <p className="mb-5 text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">{linkify(block.text)}</p>;
    case "ul": return <ul className="mb-6 space-y-2.5">{block.items.map((it, i) => <li key={i} className="flex items-start gap-3 leading-relaxed text-[var(--ink-soft)]"><span aria-hidden className="mt-2.5 h-0.5 w-4 shrink-0 bg-[var(--orange)]" /><span>{linkify(it)}</span></li>)}</ul>;
    case "callout": return <aside className="my-8 border-l-4 border-[var(--orange)] bg-[var(--fog)] px-6 py-5"><p className="leading-relaxed text-[var(--ink)]">{linkify(block.text)}</p></aside>;
    default: return null;
  }
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return <div>{blocks.map((b, i) => <BlockView key={i} block={b} />)}</div>;
}
