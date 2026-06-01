import Link from "next/link";

export function UseCases() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="eyebrow text-[var(--color-brand)]">Where it goes</p>
        <h2 className="font-display mt-2 text-3xl md:text-4xl">One product. Every outdoor wood project.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-2xl bg-[var(--color-brand-deep)] p-8 text-white">
            <p className="eyebrow text-[var(--color-gold)]">Decks &amp; railings</p>
            <h3 className="font-display mt-3 text-2xl md:text-3xl">Rich, even color that lasts.</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-orange-50/80">
              Ready Seal penetrates deep to protect deck boards and railings from UV, moisture and
              mildew &mdash; without the peeling and flaking of film-forming finishes.
            </p>
            <Link href="/shop" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-gold)] hover:underline">
              Shop deck colors →
            </Link>
          </article>
          <article className="overflow-hidden rounded-2xl bg-[var(--color-brand)] p-8 text-white">
            <p className="eyebrow text-orange-100">Fences &amp; outdoor wood</p>
            <h3 className="font-display mt-3 text-2xl md:text-3xl">Fences, pergolas, siding &amp; more.</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-orange-50/90">
              Spray a whole fence in an afternoon. No wet-line, no laps, no streaks &mdash; just
              uniform, long-lasting color on any outdoor wood surface.
            </p>
            <Link href="/calculator" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white hover:underline">
              Estimate your coverage →
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
