import type { FAQItem } from "@/lib/faqs";
import { homeFaqs } from "@/lib/faqs";

export type { FAQItem };
export { homeFaqs };

export function FAQ({ faqs = homeFaqs, title = "Questions people ask before booking" }: { faqs?: FAQItem[]; title?: string }) {
  return (
    <section className="bg-[var(--snow)]">
      <div className="shell section grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="eyebrow-pill">FAQ</p>
          <h2 className="font-display h2-fluid mt-4">{title}</h2>
          <p className="mt-4 text-[var(--ink-soft)]">Still wondering about something? Call us, or use the form and Cameron will get back to you within a day.</p>
          <a href="tel:+12894265764" className="btn-outline mt-6">Call (289) 426-5764</a>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group card">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold">
                {f.q}
                <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--paper)] text-[var(--candy)] transition group-open:rotate-45">+</span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-[var(--ink-soft)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
