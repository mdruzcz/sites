export function Testimonial() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="font-display text-[var(--color-gold)] text-7xl leading-none">&ldquo;</p>
        <blockquote className="font-display mt-2 text-2xl leading-snug text-slate-800 md:text-3xl">
          I&rsquo;ve stained dozens of decks and fences with Ready Seal &mdash; it goes on fast,
          never streaks, and the color holds up season after season. Ordering by the skid from
          Ready Seal Direct keeps my jobs on budget.
        </blockquote>
        <footer className="mt-6">
          <p className="text-sm font-semibold">Mark D. · Deck Restoration Contractor · Southwestern Ontario</p>
          <p className="text-xs text-slate-500">Verified contractor customer</p>
        </footer>
      </div>
    </section>
  );
}
