export function ServiceAreas() {
  const cities = [
    "London", "St. Thomas", "Woodstock", "Stratford", "Ingersoll",
    "Tillsonburg", "Brantford", "Kitchener-Waterloo", "Hamilton",
    "Mississauga", "Toronto", "Ottawa", "Windsor", "Sarnia",
    "Burlington", "Oakville", "Niagara"
  ];
  return (
    <section className="bg-warm">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
        <p className="eyebrow text-[var(--color-accent)]">Where we ship</p>
        <h2 className="font-display mt-3 max-w-3xl text-4xl md:text-5xl">
          Shipping from our Ontario warehouse &mdash; arriving anywhere in Canada.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-[var(--color-muted)]">
          We carry our full catalog in stock in Ontario. Most orders ship same- or next-business-day via
          Canada Post. Free shipping over $150 CAD anywhere in the country.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {cities.map((c) => (
            <li
              key={c}
              className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-sm text-slate-700"
            >
              {c}
            </li>
          ))}
          <li className="rounded-full border border-[var(--color-brand)] bg-[var(--color-brand-soft)] px-3 py-1 text-sm font-semibold text-[var(--color-brand)]">
            + every Canadian postal code
          </li>
        </ul>
      </div>
    </section>
  );
}
