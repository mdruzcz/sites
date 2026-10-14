import { Fragment, type ReactNode } from "react";
import Link from "next/link";

/**
 * Minimal Markdown renderer for catalog copy and guide paragraphs.
 * Handles headings, bold/italic, unordered lists, paragraphs and
 * inline links — the subset the catalog and guides actually use.
 */
export function RichText({ text, className = "" }: { text: string; className?: string }) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];

  let listBuffer: string[] = [];
  let paraBuffer: string[] = [];

  const flushList = () => {
    if (!listBuffer.length) return;
    const items = [...listBuffer];
    listBuffer = [];
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="mt-4 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 leading-relaxed text-[var(--color-text-soft)]">
            <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
            <span>{inline(item)}</span>
          </li>
        ))}
      </ul>
    );
  };

  const flushPara = () => {
    if (!paraBuffer.length) return;
    const body = paraBuffer.join(" ");
    paraBuffer = [];
    blocks.push(
      <p key={`p-${blocks.length}`} className="mt-4 leading-relaxed text-[var(--color-text-soft)]">
        {inline(body)}
      </p>
    );
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      flushPara();
      continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushList();
      flushPara();
      const level = heading[1].length;
      const content = heading[2].replace(/:$/, "");
      blocks.push(
        level <= 3 ? (
          <h3 key={`h-${blocks.length}`} className="font-display mt-9 text-xl first:mt-0">
            {inline(content)}
          </h3>
        ) : (
          <h4 key={`h-${blocks.length}`} className="mt-7 text-base font-semibold first:mt-0">
            {inline(content)}
          </h4>
        )
      );
      continue;
    }
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    if (bullet) {
      flushPara();
      listBuffer.push(bullet[1]);
      continue;
    }
    flushList();
    paraBuffer.push(line);
  }
  flushList();
  flushPara();

  return <div className={className}>{blocks}</div>;
}

/** Renders `**bold**`, `*italic*` and `[text](href)` runs inside a line. */
export function inline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return parts.map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = link[2];
      const external = /^https?:\/\//.test(href);
      const cls = "font-semibold text-[var(--color-brand)] underline decoration-[var(--color-gold)] decoration-2 underline-offset-[3px] hover:text-[var(--color-accent)]";
      return external ? (
        <a key={i} href={href} className={cls} target="_blank" rel="noopener">
          {link[1]}
        </a>
      ) : (
        <Link key={i} href={href} className={cls}>
          {link[1]}
        </Link>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[var(--color-text)]">
          {part.slice(2, -2).replace(/:$/, "")}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
