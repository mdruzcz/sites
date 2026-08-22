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
        <div className="max-w-3xl">
          <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Where we ship</p>
          <h2 className="font-display mt-6 text-[2.1rem] md:text-[3rem]">
            Out of London, Ontario — arriving anywhere in Canada.
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
            We hold the full catalog in stock in London. Most orders leave the same or next business day via
            Canada Post, and shipping is free anywhere in the country on orders over $500 CAD.
          </p>
        </div>

        <ul className="mt-11 flex flex-wrap gap-2.5">
          {CITIES.map((c) => (
            <li
              key={c}
              className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-[var(--color-text-soft)]"
            >
              {c}
            </li>
          ))}
          <li className="rounded-full border border-[var(--color-gold)] bg-[var(--color-gold-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-gold-text)]">
            + every Canadian postal code
          </li>
        </ul>
      </div>
    </section>
  );
}
