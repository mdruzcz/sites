import Image from "next/image";
import Link from "next/link";

export function DayNight() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand)]">Day & night</p>
          <h2 className="font-display mt-3 text-3xl leading-tight md:text-5xl">
            Invisible by day.<br />
            <span className="gradient-text">Stunning at night.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Aluminum tracks color-matched to your soffit disappear into the trim. Touch the app and the
            same trim transforms into a roofline of colour.
          </p>
        </div>

        <div className="relative mt-12 grid gap-4 md:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/showcase/day.webp"
                alt="Illumi Track Lights blending into the soffit during the day"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-text)]">
                ☀️ Day
              </span>
            </div>
            <figcaption className="px-5 py-3 text-sm text-slate-600">
              Tucked under the soffit &mdash; you&rsquo;d never know they were there.
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/showcase/night.webp"
                alt="Illumi Track Lights illuminated on a home at night"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <span className="absolute left-4 top-4 rounded-full bg-[var(--color-night)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-brand-bright)]">
                🌙 Night
              </span>
            </div>
            <figcaption className="px-5 py-3 text-sm text-slate-600">
              Same trim, lit up in any colour you can imagine.
            </figcaption>
          </figure>
        </div>

        <div className="mt-10 text-center">
          <Link href="/gallery" className="btn-secondary">See more installs →</Link>
        </div>
      </div>
    </section>
  );
}
