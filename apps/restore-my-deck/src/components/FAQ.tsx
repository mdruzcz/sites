import { site } from "@/lib/site";

export type FAQItem = { q: string; a: string };

export const homeFaqs: FAQItem[] = [
  { q: "Are the products you use safe for plants and pets?", a: "Yes. We use eco-friendly, VOC-compliant cleaning solutions and stains, and we rinse gardens and lawns around the work area. Ready Seal and Penofin Verde are both low-odour, plant-safe products." },
  { q: "How long does a deck restoration take?", a: "Most projects are finished in about two days including drying time: cleaning and repairs on day one, sanding and staining on day two. Large decks or decks plus fences can take three days." },
  { q: "Do you spray or brush the stain?", a: "We always brush. Brushing works the stain into the grain rather than leaving it on the surface, which is why brushed finishes last longer and fade evenly." },
  { q: "What is the difference between your oil-based stain and the water-based stain from a big-box store?", a: "Oil-based penetrating stains soak into the wood and fade gracefully. Water-based and latex products form a film on top that eventually cracks and peels, and a peeling deck has to be stripped before it can be refinished." },
  { q: "Which stain type is most popular?", a: "Semi-transparent. It adds colour and UV protection while still showing the grain. Transparent, semi-solid and solid options are available for newer wood or heavily weathered boards." },
  { q: "How often should I restain my deck?", a: "With a quality penetrating oil stain, a maintenance coat every two to four years and a full restoration every five to seven years keeps the wood protected." },
  { q: "Do you handle pressure-treated and cedar decks differently?", a: "Yes. Cedar is softer and needs lower pressure and a gentler sand; pressure-treated pine needs to be fully dry and free of mill glaze before stain will absorb. The process is tailored to the wood." },
  { q: "Do you provide free quotes?", a: "Yes. Every quote is free and no-obligation. Email a few photos of the deck or fence and we can usually quote without a site visit." },
];

export function FAQ({ faqs = homeFaqs, title = "Questions people ask before booking" }: { faqs?: FAQItem[]; title?: string }) {
  return (
    <section className="bg-[var(--paper)]">
      <div className="shell section grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="eyebrow-pill">FAQ</p>
          <h2 className="font-display h2-fluid mt-4">{title}</h2>
          <p className="mt-4 text-[var(--ink-soft)]">Still wondering about something? Call, or use the form and we will get back to you within 24 hours.</p>
          <a href={site.phoneHref} className="btn-outline mt-6">Call {site.phone}</a>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group card">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold">
                {f.q}
                <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--cream)] text-[var(--accent)] transition group-open:rotate-45">+</span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-[var(--ink-soft)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
