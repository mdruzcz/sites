import type { ReactNode } from "react";
import Link from "next/link";
import { getExpansion, type Block } from "@/lib/expansions";

const INTERNAL = /(\/(?:about-us|contact-us|service-areas|blog\/[a-z0-9-]+|blog|concrete-[a-z0-9-]+|stamped-concrete-driveway|[a-z-]+-concrete-contractor)\b)/g;

function linkify(text: string): ReactNode[] {
  return text.split(INTERNAL).map((part, i) =>
    /^\/[a-z]/.test(part) ? <Link key={i} href={part} className="font-semibold text-[#c96f0a] underline underline-offset-2 hover:text-[#F7931E]">{label(part)}</Link> : <span key={i}>{part}</span>
  );
}
const label = (p: string) => p.replace(/^\/(blog\/)?/, "").replace(/-in-london-on$/, " in London, ON").replace(/-/g, " ");
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2": return <h2 id={slugify(block.text)} className="mt-10 mb-3 scroll-mt-28 text-2xl font-extrabold text-[#333333] md:text-3xl">{block.text}</h2>;
    case "h3": return <h3 className="mt-7 mb-2 text-xl font-bold text-[#333333]">{block.text}</h3>;
    case "p": return <p className="mb-4 leading-relaxed text-slate-600">{linkify(block.text)}</p>;
    case "ul": return <ul className="mb-5 space-y-2">{block.items.map((it, i) => <li key={i} className="flex items-start gap-3 leading-relaxed text-slate-600"><span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-[#F7931E]" /><span>{linkify(it)}</span></li>)}</ul>;
    case "callout": return <aside className="my-6 rounded-xl border-l-4 border-[#F7931E] bg-[#fff7ed] px-5 py-4 text-[#333333]">{linkify(block.text)}</aside>;
    default: return null;
  }
}

/** Long-form SEO content block loaded from content/expansions/<slug>.json, with FAQ schema. */
export function Expansion({ slug }: { slug: string }) {
  const e = getExpansion(slug);
  if (!e) return null;
  const faqLd = e.faqs?.length ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: e.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) } : null;
  return (
    <section className="section bg-white">
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <div className="container-custom">
        <article className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold text-[#333333] md:text-4xl">{e.sectionTitle}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{e.intro}</p>
          <div className="mt-2">{e.blocks.map((b, i) => <BlockView key={i} block={b} />)}</div>
          {e.faqs?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-extrabold text-[#333333] md:text-3xl">More questions</h2>
              <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                {e.faqs.map((f, i) => (
                  <details key={i} className="group">
                    <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 font-bold text-[#333333]">{f.q}<span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-[#F7931E] text-white transition group-open:rotate-45">+</span></summary>
                    <p className="pb-4 leading-relaxed text-slate-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
