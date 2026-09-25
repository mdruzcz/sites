import { bodyBlocks, type CitySection, type Faq } from "@/lib/content";

/** Renders JSON "sections" (heading + body with paragraphs / "- bullets") as an article. */
export default function ArticleBody({ sections, level = 2 }: { sections: CitySection[]; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <div className="space-y-8">
      {sections.map((s) => (
        <section key={s.heading}>
          <H className={`${level === 2 ? "text-2xl" : "text-xl"} font-bold mb-3`}>{s.heading}</H>
          <div className="space-y-3 text-ink-soft leading-relaxed">
            {bodyBlocks(s.body).map((b, i) =>
              b.type === "ul" ? (
                <ul key={i} className="list-disc pl-5 space-y-1">
                  {b.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              ) : (
                <p key={i}>{b.lines[0]}</p>
              ),
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

export function FaqList({ faqs, title = "Frequently asked questions" }: { faqs: Faq[]; title?: string }) {
  if (!faqs.length) return null;
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="bg-white border border-border rounded-lg p-5 group">
            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
              {f.q}
              <span className="text-accent group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-ink-soft mt-3 text-sm leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
