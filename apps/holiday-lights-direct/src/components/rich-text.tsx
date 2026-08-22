import { Fragment, type ReactNode } from "react";

/**
 * Minimal Markdown renderer for catalog copy.
 *
 * Product `long_description` values come out of the WordPress import as
 * Markdown (`### Heading`, `**bold**`, `- item`). They were previously dumped
 * into a `whitespace-pre-wrap` block, so shoppers saw the raw asterisks and
 * hashes. This handles the small subset the catalog actually uses — headings,
 * bold, unordered lists and paragraphs — without pulling in a parser.
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
      <ul key={`ul-${blocks.length}`} className="mt-4 list-disc space-y-2 pl-5">
        {items.map((item, i) => (
          <li key={i} className="leading-relaxed text-[var(--color-text-soft)]">
            {inline(item)}
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

/** Renders `**bold**` and `*italic*` runs inside a line. */
function inline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, i) => {
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
