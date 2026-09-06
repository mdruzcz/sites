import { site } from "@/lib/site";

export type FAQItem = { q: string; a: string };

export const homeFaqs: FAQItem[] = [
  { q: "How long does concrete sealer last?", a: "Two to five years depending on traffic, sun and salt exposure. A driveway that sees salt every winter is at the short end; a shaded patio is at the long end. A light recoat before it fully wears keeps the protection continuous." },
  { q: "Which finish should I choose: high gloss, semi-gloss or matte?", a: "Semi-gloss is our most requested for stamped and decorative concrete. High gloss gives the wet look and the deepest colour. Matte keeps broom-finish, exposed aggregate and garage floors natural. All three use the same sealer, and we bring samples to the inspection." },
  { q: "Will a sealed surface be slippery?", a: "Gloss can be when wet on smooth concrete. We add an anti-slip additive to any sheen, and it is standard around pools and on steps." },
  { q: "Can you seal concrete that was sealed before?", a: "Yes. We check the old coating first. If it is sound and compatible we bond to it; if it is peeling or the wrong type we strip it so the new coat does not fail." },
  { q: "When is the best time to seal?", a: "Late spring through fall, when the slab is dry and temperatures sit roughly between 10 and 30°C. Fall bookings before the first salt are the most popular." },
  { q: "How soon can I use the surface?", a: "Foot traffic the next day and vehicles after 48 to 72 hours. We give you the exact window on the day." },
  { q: "Do you charge for the inspection or quote?", a: "No. Inspections and quotes are free across Woodstock, St. Thomas, Brantford, Hamilton, Kitchener-Waterloo and Cambridge." },
];

export function FAQ({ faqs = homeFaqs, title = "Questions before you book" }: { faqs?: FAQItem[]; title?: string }) {
  return (
    <section className="bg-white">
      <div className="shell section grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="kicker">FAQ</p>
          <h2 className="font-display h2-fluid mt-4">{title}</h2>
          <p className="mt-4 text-[var(--ink-soft)]">Anything else? Call or use the quote form and we will answer within one business day.</p>
          <a href={site.phoneHref} className="btn-outline mt-6">Call {site.phone}</a>
        </div>
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="font-display flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold uppercase tracking-wide">
                {f.q}
                <span aria-hidden className="font-display grid size-8 shrink-0 place-items-center rounded bg-[var(--graphite)] text-[var(--orange)] transition group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 leading-relaxed text-[var(--ink-soft)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
