const CITIES = [
  "London", "St. Thomas", "Woodstock", "Stratford", "Ingersoll",
  "Tillsonburg", "Brantford", "Kitchener-Waterloo", "Hamilton",
  "Mississauga", "Toronto", "Ottawa", "Windsor", "Sarnia",
  "Burlington", "Oakville", "Niagara"
];

export function ServiceAreas() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="shell section">
        <div className="reveal max-w-3xl">
          <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Where we ship</p>
          <h2 className="font-display h2-fluid mt-6">
            Out of London, Ontario — arriving anywhere in Canada.
          </h2>
          <p className="lead mt-6 text-[var(--color-text-soft)]">
            We hold the full catalog in stock in London. Most orders leave the same or next business day via
            Canada Post, and shipping is free anywhere in the country on orders over $500 CAD.
          </p>
        </div>

        <ul className="mt-11 flex flex-wrap gap-2.5">
          {CITIES.map((c) => (
            <li
              key={c}
              className="reveal-sm rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-[var(--color-text-soft)]"
            >
              {c}
            </li>
          ))}
          <li className="reveal-sm rounded-full border border-[var(--color-gold)] bg-[var(--color-gold-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-gold-text)]">
            + every Canadian postal code
          </li>
        </ul>
      </div>
    </section>
  );
}
