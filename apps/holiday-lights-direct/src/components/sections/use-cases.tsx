import Link from "next/link";

export function UseCases() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="eyebrow text-[var(--color-brand)]">Where they go</p>
        <h2 className="font-display mt-2 text-3xl md:text-4xl">Two lights, every occasion.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-2xl bg-[var(--color-night)] p-8 text-white">
            <p className="eyebrow text-[var(--color-gold)]">Christmas in a tap</p>
            <h3 className="font-display mt-3 text-2xl md:text-3xl">Permanent holiday lighting.</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              Red and green for Christmas. Pink for Valentine&rsquo;s. Orange for Halloween. Soft warm white
              for everyday accent. Switch any time from the app — no ladders, no clips, no tangled wire.
            </p>
            <Link
              href="/permanent-lights"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-gold)] hover:underline"
            >
              Pick a kit →
            </Link>
          </article>
          <article className="overflow-hidden rounded-2xl bg-[var(--color-brand)] p-8 text-white">
            <p className="eyebrow text-[var(--color-gold)]">Year-round</p>
            <h3 className="font-display mt-3 text-2xl md:text-3xl">Accent + security lighting.</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-emerald-50">
              Warm-white roofline glow that frames your home every night. Bright daylight white for security.
              The same hardware does both — schedule it, dim it, or leave it on auto.
            </p>
            <Link
              href="/product-category/permanent-lights"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-gold)] hover:underline"
            >
              See the components →
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
