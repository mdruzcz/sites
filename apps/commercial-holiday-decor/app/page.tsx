import Link from "next/link";
import Image from "next/image";
import { Photo } from "@/components/Photo";
import { QuoteForm } from "@/components/QuoteForm";
import { VideoLoop } from "@/components/VideoLoop";
import { JsonLd } from "@/components/JsonLd";
import { photo } from "@/lib/photos";
import { productPhoto } from "@/lib/product-photos";
import { products, services, serviceAreas, faqs } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

const reelVideo = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Commercial Holiday Decor — installation highlight reel",
  description:
    "Real commercial Christmas tree and holiday decor installs by Commercial Holiday Decor across Southwestern Ontario — corporate lobbies, office interiors and building entrances.",
  thumbnailUrl: [`${site.url}/images/video/reel-poster.webp`],
  uploadDate: "2026-01-05",
  contentUrl: `${site.url}/videos/reel.mp4`,
  duration: "PT25S",
  publisher: { "@type": "Organization", name: site.name, url: site.url }
};

const STEPS = [
  ["01", "We walk the property", "Someone stands on your site, checks sightlines from the road, finds the power and measures the frontage."],
  ["02", "You get a drawn plan", "A layout showing what goes where, plus a line-item quote covering decor, install, service and takedown."],
  ["03", "We install and maintain", "Insured crews between September and late November, then we look after it all season."],
  ["04", "We take it down", "January removal, inspection and repair, then labelled storage until next year."]
];

const WHY = [
  ["Built commercial, not retail", "Steel frames and commercial-grade LED that survive an exposed season — not big-box product that fails by mid-December."],
  ["One contractor, one invoice", "Design, supply, install, in-season service, January takedown and storage. No coordinating three vendors."],
  ["Insured & WSIB covered", "Liability and WSIB certificates on request for your vendor file — the paperwork municipalities and property managers need."],
  ["Procurement-ready", "Purchase orders, tender documentation and net terms for BIAs, municipalities and property-management portfolios."]
];

export default function HomePage() {
  const hero = photo("disp-scene-1");
  const topFaqs = faqs.slice(0, 4);

  return (
    <>
      <JsonLd data={reelVideo} />
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={hero.src}
          alt="Illuminated commercial Christmas star displays over a decorated downtown street at night"
          fill
          priority
          quality={72}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={hero.blurDataURL}
          className="-z-10 object-cover object-center"
        />
        {/* Legibility: a flat wash for mobile, then a directional falloff so the
            left-hand copy always has a dark ground under it on desktop. */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(9,13,10,0.7)] md:bg-transparent" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[rgba(9,13,10,0.94)] via-[rgba(9,13,10,0.74)] to-[rgba(9,13,10,0.35)]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[rgba(9,13,10,0.85)] to-transparent" />

        <div className="shell py-20 md:py-28 lg:py-36">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-star inline-flex rounded-full border border-[var(--color-gold)]/40 bg-white/10 px-4 py-2 text-[var(--color-gold-bright)] backdrop-blur">
              Southwestern Ontario · Commercial &amp; municipal
            </p>
            <h1 className="font-display display mt-7 text-white">
              Commercial Christmas decor,
              <span className="mt-1 block text-[var(--color-gold-bright)]">installed and looked after.</span>
            </h1>
            <p className="lead mt-7 max-w-xl text-white/85">
              Commercial trees to 100 feet, 4-foot wreaths, pole motifs, giant ornaments and custom
              fabrication — designed for your property, installed by insured crews, serviced all season and
              taken down in January.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/quote" className="btn-ember group">
                {site.quote.ctaLong}
                <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/products" className="btn-ghost-light">See what we build</Link>
            </div>
          </div>

          {/* Glass stat strip anchored to the hero base */}
          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md md:mt-20 md:grid-cols-4">
            {[
              ["10", "Product lines"],
              ["100 ft", "Tallest tree"],
              ["12+", "Cities served"],
              ["1", "Contractor, whole season"]
            ].map(([n, l]) => (
              <div key={l} className="bg-[rgba(9,13,10,0.35)] px-5 py-5">
                <dt className="font-display text-2xl text-[var(--color-gold-bright)] md:text-3xl">{n}</dt>
                <dd className="mt-1 text-xs leading-snug text-white/70">{l}</dd>
              </div>
            ))}
          </dl>
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
          <div className="reveal max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">What we build</p>
            <h2 className="font-display h2-fluid mt-6">Ten lines, one contractor.</h2>
            <p className="lead mt-6 text-[var(--color-text-soft)]">
              Everything is sized on site. A wreath that works on a house disappears on a building front, and
              a tree that suits a lobby looks lost in a civic square — so we measure before we quote. Ten
              product lines, one contractor, one invoice.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
            {products.map((p) => (
              <article key={p.slug} className="reveal group relative isolate overflow-hidden rounded-3xl bg-[var(--color-ink-deep)] shadow-[var(--shadow-md)]">
                <Photo
                  name={p.scenePhoto}
                  ratio="aspect-[4/3]"
                  sizes="(max-width: 768px) 100vw, 560px"
                  scrim="strong"
                  className="transition duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  <p className="eyebrow text-[var(--color-gold-bright)]">{p.eyebrow}</p>
                  <h3 className="font-display mt-3 text-2xl text-white md:text-[2rem]">{p.headline}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">{p.summary}</p>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group/link mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[var(--color-gold-bright)] hover:underline"
                  >
                    {p.name}
                    <span className="btn-arrow" aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Video showcase */}
      <section className="bg-[var(--color-surface)]">
        <div className="shell section">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
            <div className="reveal order-2 lg:order-1">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">On real properties</p>
              <h2 className="font-display h2-fluid mt-6">See the work, not stock photos.</h2>
              <p className="lead mt-6 text-[var(--color-text-soft)]">
                Corporate lobbies, office interiors and building entrances we decorated across Southwestern
                Ontario — the real trees, the real ribbon work, the real install. Every piece is designed for
                the property, installed by insured crews and taken down in January.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Commercial trees to 100 ft",
                  "Custom ribbon & ornament work",
                  "Installed by insured crews",
                  "Serviced & stored off-season"
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-[var(--color-text-soft)]">
                    <svg className="mt-0.5 size-4 shrink-0 text-[var(--color-green-text)]" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/quote" className="btn-ember group">
                  {site.quote.ctaLong}
                  <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href="/gallery" className="btn-secondary">See the gallery</Link>
              </div>
            </div>

            <div className="reveal order-1 mx-auto w-full max-w-[320px] lg:order-2">
              <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-ink-deep)] p-2.5 shadow-[var(--shadow-xl)]">
                <VideoLoop
                  src="/videos/reel.mp4"
                  poster="/images/video/reel-poster.webp"
                  className="aspect-[9/16] w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Displays */}
      <section className="bg-[var(--color-ink-deep)]">
        <div className="shell section">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-bright)]">Large &amp; custom displays</p>
              <h2 className="font-display h2-fluid mt-6 text-white">
                The pieces people drive out to see.
              </h2>
              <p className="lead mt-5 text-white/70">
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
                <div key={k} className="reveal-sm overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[var(--color-gold)]/40 hover:bg-white/[0.08]">
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

      {/* -------------------------------------------------------- Why commercial */}
      <section className="bg-[var(--color-bg-tint)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
            <div className="reveal">
              <Photo name="pole-scene-1" ratio="aspect-[4/5]" sizes="(max-width: 1024px) 100vw, 480px" rounded="rounded-3xl" className="shadow-[var(--shadow-lg)]" />
            </div>
            <div className="reveal">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Why us</p>
              <h2 className="font-display h2-fluid mt-6">Built for commercial &amp; municipal properties.</h2>
              <p className="lead mt-6 text-[var(--color-text-soft)]">
                We do not do houses. Everything is engineered, insured and scheduled for properties where the
                decor has to survive weather, meet insurance requirements and go up without disrupting trading.
              </p>
              <dl className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {WHY.map(([t, d]) => (
                  <div key={t}>
                    <dt className="flex items-start gap-2.5 font-display text-lg">
                      <svg className="mt-1 size-4 shrink-0 text-[var(--color-green-text)]" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {t}
                    </dt>
                    <dd className="mt-2 pl-[1.625rem] text-sm leading-relaxed text-[var(--color-text-soft)]">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- Process */}
      <section className="bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <div className="reveal max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">How it works</p>
            <h2 className="font-display h2-fluid mt-6">From site walk to January takedown.</h2>
          </div>
          <ol className="mt-14 grid gap-7 md:grid-cols-4">
            {STEPS.map(([n, t, d]) => (
              <li key={n} className="reveal-sm panel p-7">
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
            <div className="reveal">
              <Photo name="tree-lighting-row" ratio="aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 520px" rounded="rounded-3xl" className="shadow-[var(--shadow-lg)]" />
            </div>
            <div className="reveal">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">What is included</p>
              <h2 className="font-display h2-fluid mt-6">One contract, the whole season.</h2>
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
          <div className="reveal max-w-3xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Where we work</p>
            <h2 className="font-display h2-fluid mt-6">Across Southwestern Ontario.</h2>
            <p className="lead mt-6 text-[var(--color-text-soft)]">
              Crews run out of London and cover the region from Windsor to Guelph. If you are just outside
              the list, ask — we usually can.
            </p>
          </div>
          <ul className="mt-11 flex flex-wrap gap-2.5">
            {serviceAreas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/service-areas/${a.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-border)] bg-white px-4 text-sm text-[var(--color-text-soft)] shadow-[var(--shadow-xs)] transition hover:border-[var(--color-green)] hover:text-[var(--color-green)]"
                >
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------------- FAQ teaser */}
      <section className="bg-[var(--color-bg-tint)]">
        <div className="shell section">
          <div className="reveal max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Good to know</p>
            <h2 className="font-display h2-fluid mt-6">Questions we get asked first.</h2>
          </div>
          <div className="mt-12 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {topFaqs.map((f) => (
              <div key={f.q} className="reveal-sm border-t border-[var(--color-border)] pt-6">
                <h3 className="font-display text-lg">{f.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-soft)]">{f.a}</p>
              </div>
            ))}
          </div>
          <Link href="/faq" className="btn-secondary mt-12">Read all FAQs</Link>
        </div>
      </section>

      {/* ----------------------------------------------------------------- Quote */}
      <section id="quote" className="bg-[var(--color-ink-deep)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className="eyebrow eyebrow-star text-[var(--color-gold-bright)]">{site.quote.promise}</p>
              <h2 className="font-display h2-fluid mt-5 text-white">
                Tell us about the property.
              </h2>
              <p className="lead mt-6 max-w-md text-white/75">{site.quote.detail}</p>
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
            <div className="rounded-3xl bg-white p-7 shadow-[var(--shadow-xl)] md:p-10">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
