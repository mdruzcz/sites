import Link from "next/link";
import Image from "next/image";
import { Photo } from "@/components/Photo";
import { QuoteForm } from "@/components/QuoteForm";
import { photo } from "@/lib/photos";
import { productPhoto } from "@/lib/product-photos";
import { products, services, serviceAreas } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

const STEPS = [
  ["01", "We walk the property", "Someone stands on your site, checks sightlines from the road, finds the power and measures the frontage."],
  ["02", "You get a drawn plan", "A layout showing what goes where, plus a line-item quote covering decor, install, service and takedown."],
  ["03", "We install and maintain", "Insured crews between September and late November, then we look after it all season."],
  ["04", "We take it down", "January removal, inspection and repair, then labelled storage until next year."]
];

export default function HomePage() {
  const hero = photo("hero-commercial-wreath");

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={hero.blurDataURL}
          className="-z-10 object-cover object-center"
        />
        {/* Two overlays: a flat wash so mobile (where the copy spans the full
            width) stays legible, plus the horizontal falloff for desktop. */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(10,14,11,0.72)] md:bg-transparent" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[rgba(10,14,11,0.90)] via-[rgba(10,14,11,0.72)] to-[rgba(10,14,11,0.45)]"
        />
        <div className="shell grid gap-14 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28 lg:py-32">
          <div>
            <p className="eyebrow inline-flex rounded-full border border-[var(--color-gold)]/40 bg-white/10 px-4 py-2 text-[var(--color-gold-bright)] backdrop-blur">
              Southwestern Ontario
            </p>
            <h1 className="font-display mt-7 text-[2.5rem] leading-[1.05] text-white sm:text-5xl md:text-[3.9rem]">
              Commercial Christmas decor,
              <span className="mt-1 block text-[var(--color-gold-bright)]">installed and looked after.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-white/80 md:text-lg">
              Commercial trees to 100 feet, 4-foot wreaths, pole motifs, giant ornaments and custom
              fabrication — designed for your property, installed by insured crews, serviced all season and
              taken down in January.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/quote" className="btn-ember">{site.quote.ctaLong}</Link>
              <Link href="/products" className="btn-ghost-light">See what we build</Link>
            </div>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.14em] text-white/60">
              <li>Insured &amp; WSIB</li>
              <li>Install + service + takedown</li>
              <li>Storage included</li>
            </ul>
          </div>

          <div className="hidden rounded-3xl border border-white/15 bg-[rgba(16,22,18,0.72)] p-8 backdrop-blur-md md:block">
            <p className="eyebrow text-[var(--color-gold-bright)]">The catalogue</p>
            <ul className="mt-6 space-y-0">
              {products.map((p) => (
                <li key={p.slug} className="border-b border-white/10 last:border-0">
                  <Link href={`/products/${p.slug}`} className="group flex items-center justify-between gap-4 py-4">
                    <span className="text-sm font-semibold text-white">{p.name}</span>
                    <span className="text-xs text-[var(--color-gold-bright)] opacity-0 transition group-hover:opacity-100">
                      View →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/quote" className="btn-ember mt-7 w-full">{site.quote.cta}</Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Trust bar */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-9 py-10 md:grid-cols-4 md:py-12">
          {[
            ["One contractor", "Decor, install, service and takedown on one invoice"],
            ["Built commercial", "Steel frames and commercial LED, not retail product"],
            ["Insured crews", "Liability and WSIB certificates on request"],
            ["Stored off-season", "Labelled by property, so year two installs faster"]
          ].map(([t, d]) => (
            <div key={t} className="text-center md:text-left">
              <p className="text-sm font-semibold">{t}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-muted)]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- Products */}
      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">What we build</p>
            <h2 className="font-display mt-6 text-[2.1rem] md:text-[3rem]">Ten lines, one contractor.</h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
              Everything is sized on site. A wreath that works on a house disappears on a building front, and
              a tree that suits a lobby looks lost in a civic square — so we measure before we quote. Ten
              product lines, one contractor, one invoice.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
            {products.map((p) => (
              <article key={p.slug} className="group relative isolate overflow-hidden rounded-3xl bg-[var(--color-ink-deep)]">
                <Photo
                  name={p.scenePhoto}
                  ratio="aspect-[4/3]"
                  sizes="(max-width: 768px) 100vw, 560px"
                  scrim="strong"
                  className="transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  <p className="eyebrow text-[var(--color-gold-bright)]">{p.eyebrow}</p>
                  <h3 className="font-display mt-3 text-2xl text-white md:text-[2rem]">{p.headline}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">{p.summary}</p>
                  <Link
                    href={`/products/${p.slug}`}
                    className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[var(--color-gold-bright)] hover:underline"
                  >
                    {p.name} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Displays */}
      <section className="bg-[var(--color-ink-deep)]">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-bright)]">Large &amp; custom displays</p>
              <h2 className="font-display mt-6 text-[2.1rem] text-white md:text-[3rem]">
                The pieces people drive out to see.
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/70">
                Rooflines make a property look decorated. Displays make it a destination — 3D figures,
                walk-through photo-ops and custom fabrication built to stand outside all season.
              </p>
            </div>
            <Link href="/products/holiday-displays" className="btn-ember">Browse displays</Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {["display-snow-globe", "display-santa-group", "display-gingerbread", "display-candy-cane"].map((k) => {
              const pp = productPhoto(k);
              if (!pp) return null;
              return (
                <div key={k} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Image
                    src={pp.src}
                    alt={pp.alt}
                    width={pp.width}
                    height={pp.height}
                    sizes="(max-width: 768px) 50vw, 260px"
                    className="aspect-square w-full object-contain"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- Process */}
      <section className="bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">How it works</p>
            <h2 className="font-display mt-6 text-[2.1rem] md:text-[3rem]">From site walk to January takedown.</h2>
          </div>
          <ol className="mt-14 grid gap-7 md:grid-cols-4">
            {STEPS.map(([n, t, d]) => (
              <li key={n} className="rounded-2xl border border-[var(--color-border)] bg-white p-7">
                <span className="font-display text-sm font-bold tracking-[0.2em] text-[var(--color-gold-text)]">{n}</span>
                <h3 className="font-display mt-3 text-lg">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-soft)]">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------------------- Services */}
      <section className="bg-[var(--color-surface)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
            <Photo name="tree-lighting-row" ratio="aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 520px" rounded="rounded-3xl" />
            <div>
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">What is included</p>
              <h2 className="font-display mt-6 text-[2.1rem] md:text-[3rem]">One contract, the whole season.</h2>
              <dl className="mt-10 space-y-7">
                {services.map((s) => (
                  <div key={s.slug} className="border-l-2 border-[var(--color-gold)] pl-5">
                    <dt className="font-display text-lg">{s.name}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-[var(--color-text-soft)]">{s.summary}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/installation" className="btn-secondary mt-10">More on installation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Service areas */}
      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="max-w-3xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Where we work</p>
            <h2 className="font-display mt-6 text-[2.1rem] md:text-[3rem]">Across Southwestern Ontario.</h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
              Crews run out of London and cover the region from Windsor to Guelph. If you are just outside
              the list, ask — we usually can.
            </p>
          </div>
          <ul className="mt-11 flex flex-wrap gap-2.5">
            {serviceAreas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/service-areas/${a.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-border)] bg-white px-4 text-sm text-[var(--color-text-soft)] transition hover:border-[var(--color-green)] hover:text-[var(--color-green)]"
                >
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------------------- Quote */}
      <section id="quote" className="bg-[var(--color-ink-deep)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className="eyebrow text-[var(--color-gold-bright)]">{site.quote.promise}</p>
              <h2 className="font-display mt-5 text-[2.1rem] text-white md:text-[3rem]">
                Tell us about the property.
              </h2>
              <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-white/70">{site.quote.detail}</p>
              <div className="mt-10 space-y-3 text-sm text-white/60">
                <p>Book by {site.season.bookingOpens} for a same-season install.</p>
                <p>
                  Prefer to talk?{" "}
                  <a href={site.phoneHref} className="font-semibold text-[var(--color-gold-bright)] hover:underline">
                    {site.phone}
                  </a>
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-7 md:p-10">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
