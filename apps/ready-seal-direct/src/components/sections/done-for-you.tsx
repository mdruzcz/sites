const PARTNERS = [
  {
    name: "Master Decker",
    href: "https://masterdecker.com",
    blurb: "Full-service deck staining & restoration. Book a professional to prep, stain and seal your deck with Ready Seal — done right, guaranteed.",
    cta: "Get it done for you"
  },
  {
    name: "DeckStain.ca",
    href: "https://deckstain.ca",
    blurb: "Deck & fence staining specialists serving Southwestern Ontario. Qualified Ready Seal applicators for homes and properties of any size.",
    cta: "Visit DeckStain.ca"
  },
  {
    name: "Restore My Deck",
    href: "https://restoremydeck.ca",
    blurb: "Deck restoration and refinishing in the Kitchener-Waterloo region. Bring tired, weathered wood back to life with a flawless Ready Seal finish.",
    cta: "Visit RestoreMyDeck.ca"
  }
];

export function DoneForYou() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <p className="eyebrow text-[var(--color-brand)]">Rather not DIY?</p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">Prefer to have your deck stained for you?</h2>
          <p className="mt-3 text-slate-600">
            Ready Seal is goof-proof enough for any DIYer &mdash; but if you&rsquo;d rather hand it to a
            pro, these qualified contractors use Ready Seal on every job. Reach out for a quote.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PARTNERS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-[var(--color-border)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:shadow-md"
            >
              <h3 className="font-display text-xl text-[var(--color-brand-deep)]">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] group-hover:underline">
                {p.cta}
                <span aria-hidden>↗</span>
              </span>
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          These are independent contractor partners. Ready Seal Direct supplies the stain; the partner
          provides the labour and any service warranty.
        </p>
      </div>
    </section>
  );
}
