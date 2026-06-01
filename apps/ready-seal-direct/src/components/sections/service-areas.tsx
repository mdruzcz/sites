export function ServiceAreas() {
  const cities = [
    "London", "St. Thomas", "Woodstock", "Stratford", "Ingersoll",
    "Tillsonburg", "Brantford", "Kitchener-Waterloo", "Hamilton",
    "Mississauga", "Toronto", "Ottawa", "Windsor", "Sarnia",
    "Burlington", "Oakville", "Niagara"
  ];
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="eyebrow text-[var(--color-brand)]">Where we ship</p>
        <h2 className="font-display mt-2 text-3xl md:text-4xl">
          Shipping Ready Seal across Ontario, from Belmont.
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600">
          We carry the full Ready Seal color range in stock near Belmont, Ontario. Online ordering
          is currently available for delivery within Ontario, with free shipping over $750.
          Outside Ontario? <a href="/contact-us" className="font-semibold text-[var(--color-brand)] underline">Message us for a shipping quote</a> and
          we&rsquo;ll get your order on its way.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {cities.map((c) => (
            <li key={c} className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-sm text-slate-700">
              {c}
            </li>
          ))}
          <li className="rounded-full border border-[var(--color-brand)] bg-[var(--color-brand-soft)] px-3 py-1 text-sm font-semibold text-[var(--color-brand)]">
            + every Ontario postal code
          </li>
        </ul>
      </div>
    </section>
  );
}
