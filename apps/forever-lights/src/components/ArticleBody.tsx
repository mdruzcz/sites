import { Icon } from './icons';

export type ArticleBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'callout'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 id={slugify(block.text)} className="text-2xl md:text-3xl font-bold text-ink mt-12 mb-4 scroll-mt-28">{block.text}</h2>;
    case 'h3':
      return <h3 className="text-xl font-bold text-ink mt-8 mb-3">{block.text}</h3>;
    case 'p':
      return <p className="text-ink-soft leading-relaxed mb-5 text-[1.05rem]">{block.text}</p>;
    case 'ul':
      return (
        <ul className="space-y-2.5 mb-6">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-ink-soft leading-relaxed">
              <span className="mt-1 w-5 h-5 rounded-full bg-accent/20 text-ink flex items-center justify-center shrink-0"><Icon.check size={12} strokeWidth={2.5} /></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="space-y-3 mb-6">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-ink-soft leading-relaxed">
              <span className="mt-0.5 w-6 h-6 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case 'steps':
      return (
        <ol className="space-y-4 mb-8">
          {block.items.map((s, i) => (
            <li key={i} className="card p-5 flex gap-4">
              <span className="w-9 h-9 rounded-full bg-accent text-ink font-heading font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <div>
                <h4 className="font-bold text-ink">{s.title}</h4>
                <p className="text-ink-soft leading-relaxed mt-1 text-[15px]">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case 'table':
      return (
        <div className="overflow-x-auto mb-8 rounded-2xl border border-line">
          <table className="w-full text-sm text-left">
            <thead className="bg-soft text-ink">
              <tr>{block.headers.map((h, i) => <th key={i} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i} className="border-t border-line align-top">
                  {r.map((c, j) => <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-medium text-ink' : 'text-ink-soft'}`}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout':
      return (
        <aside className="my-8 rounded-2xl border border-accent/40 bg-tint px-6 py-5 flex gap-3">
          <span className="text-ink mt-0.5 shrink-0"><Icon.sparkles size={20} /></span>
          <p className="text-ink leading-relaxed">{block.text}</p>
        </aside>
      );
    default:
      return null;
  }
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose-fl">
      {blocks.map((b, i) => <Block key={i} block={b} />)}
    </div>
  );
}
