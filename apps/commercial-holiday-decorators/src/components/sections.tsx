import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getImage, getVideo, posterFor, type MediaImage, type TitledBody } from "@/lib/content";
import { Icon } from "./Icons";
import { SectionHeading, IconTile, Photo } from "./ui";
import { QuoteFormCompact } from "./QuoteFormCompact";
import { VideoLoop } from "./VideoLoop";

/* Reusable page sections (server components). */

/** Dark photo (or video) hero used by every inner page. */
export function PageHero({ image, video, eyebrow, title, sub, crumbs, children, align = "split" }: { image: string | MediaImage; video?: string | null; eyebrow?: string; title: React.ReactNode; sub?: string; crumbs?: React.ReactNode; children?: React.ReactNode; align?: "split" | "narrow" }) {
  const img = typeof image === "string" ? getImage(image) : image;
  const clip = getVideo(video);
  return (
    <section className="relative overflow-hidden on-photo" style={{ background: "var(--deep)" }}>
      <div className="absolute inset-0">
        {clip ? (
          <VideoLoop src={clip.src} poster={posterFor(clip).src} label={clip.alt} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <Image src={img.src} alt={img.alt} fill priority sizes="100vw" placeholder="blur" blurDataURL={img.blurDataURL} className="object-cover" />
        )}
        <div className="absolute inset-0 night-veil" />
      </div>
      <div className={`wrap relative py-14 md:py-20 lg:py-24 ${align === "split" ? "grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center" : ""}`}>
        <div className={align === "split" ? "max-w-2xl" : "max-w-3xl"}>
          {crumbs && <div className="mb-6">{crumbs}</div>}
          {eyebrow && <span className="pill mb-4">{eyebrow}</span>}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.3rem] leading-[1.08] text-ink text-balance">{title}</h1>
          {sub && <p className="mt-5 text-lg text-body leading-relaxed">{sub}</p>}
          {align === "narrow" && (
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn btn-gold btn-lg">{site.quote.ctaLong} <Icon.Arrow width={18} height={18} /></Link>
              <a href={site.phoneHref} className="btn btn-ghost-white btn-lg"><Icon.Phone width={18} height={18} /> {site.phone}</a>
            </div>
          )}
        </div>
        {align === "split" && (children ?? (
          <div className="card-light p-5 sm:p-7">
            <span className="pill mb-3"><Icon.Calendar width={14} height={14} /> {site.quote.short}</span>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">Get a fixed seasonal price</h2>
            <p className="text-sm text-slate-600 mt-1 mb-4">{site.quote.promise}</p>
            <QuoteFormCompact formId="hero" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProcessTimeline({ steps, eyebrow = "How it works", title = "From site visit to January takedown", sub = "One team, one invoice, nothing for your staff to manage." }: { steps: { title: string; desc: string; highlight?: string }[]; eyebrow?: string; title?: string; sub?: string }) {
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <SectionHeading eyebrow={eyebrow} title={title} sub={sub} />
        <ol className={`timeline grid gap-8 lg:grid-cols-${Math.min(steps.length, 6)} lg:gap-5`}>
          {steps.map((s, i) => (
            <li key={s.title} className="relative pl-16 lg:pl-0 lg:text-center">
              <span className="timeline-dot absolute left-0 top-0 lg:static lg:flex lg:mx-auto lg:mb-5">{i + 1}</span>
              {s.highlight && <div className="mb-2"><span className="pill">{s.highlight}</span></div>}
              <h3 className="font-bold text-ink text-lg mb-1.5">{s.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Two-column feature with a photo. */
export function SplitFeature({ eyebrow, title, body, bullets, image, flip = false, cta, children }: { eyebrow: string; title: React.ReactNode; body: string | string[]; bullets?: { icon?: React.ReactNode; label: string }[]; image: string; flip?: boolean; cta?: { label: string; href: string }; children?: React.ReactNode }) {
  const img = getImage(image);
  const paras = Array.isArray(body) ? body : [body];
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className={`wrap grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <Photo img={img} ratio="aspect-[4/3]" className="rounded-3xl" sizes="(max-width: 1024px) 100vw, 50vw" />
        <div>
          <span className="pill mb-4">{eyebrow}</span>
          <h2 className="font-display text-3xl md:text-[2.4rem] leading-[1.1] text-ink text-balance">{title}</h2>
          {paras.map((p, i) => <p key={i} className="mt-4 text-[var(--muted)] leading-relaxed">{p}</p>)}
          {bullets && (
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {bullets.map((b) => (
                <li key={b.label} className="flex items-center gap-3 text-sm font-semibold text-body">
                  <IconTile className="!w-10 !h-10 shrink-0">{b.icon ?? <Icon.Check width={18} height={18} />}</IconTile>{b.label}
                </li>
              ))}
            </ul>
          )}
          {children}
          {cta && <Link href={cta.href} className="btn btn-outline mt-7">{cta.label} <Icon.Arrow width={16} height={16} /></Link>}
        </div>
      </div>
    </section>
  );
}

/** Numbered cards for "what’s included" style lists. */
export function IncludesGrid({ items, eyebrow, title, sub, cols = 3 }: { items: TitledBody[]; eyebrow?: string; title: React.ReactNode; sub?: string; cols?: 2 | 3 }) {
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <SectionHeading eyebrow={eyebrow} title={title} sub={sub} />
        <div className={`grid gap-4 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
          {items.map((it, i) => (
            <div key={it.title} className="card card-static p-6">
              <span className="stat-num text-2xl block mb-3 text-[var(--gold-ink)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-bold text-ink text-lg mb-1.5">{it.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Photo + text cards, used for "spaces we decorate". */
export function SpacesGrid({ items, eyebrow, title, sub }: { items: { title: string; body: string; image: string }[]; eyebrow?: string; title: React.ReactNode; sub?: string }) {
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="wrap">
        <SectionHeading eyebrow={eyebrow} title={title} sub={sub} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => {
            const img = getImage(it.image);
            return (
              <div key={it.title} className="card card-static overflow-hidden flex flex-col">
                <div className="relative aspect-[4/3]"><Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 33vw" placeholder="blur" blurDataURL={img.blurDataURL} className="object-cover" /></div>
                <div className="p-6"><h3 className="font-bold text-ink text-lg mb-1.5">{it.title}</h3><p className="text-sm text-[var(--muted)] leading-relaxed">{it.body}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Three program tiers. */
export function Programs({ programs, eyebrow = "Programs", title = "Three ways to scope it", sub = "Every program is custom quoted. These are the shapes most properties land on." }: { programs: { name: string; body: string; includes: string[] }[]; eyebrow?: string; title?: string; sub?: string }) {
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <SectionHeading eyebrow={eyebrow} title={title} sub={sub} />
        <div className="grid gap-5 lg:grid-cols-3">
          {programs.map((p, i) => (
            <div key={p.name} className={`card card-static p-7 flex flex-col ${i === 1 ? "border-[var(--gold)] border-2" : ""}`}>
              {i === 1 && <span className="pill mb-3 self-start">Most popular</span>}
              <h3 className="font-display text-2xl text-ink">{p.name}</h3>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{p.body}</p>
              <ul className="mt-5 space-y-2 text-sm text-body flex-1">
                {p.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2"><Icon.Check width={14} height={14} className="mt-1 text-[var(--accent-ink)] shrink-0" /> {inc}</li>
                ))}
              </ul>
              <Link href="/contact" className={`btn ${i === 1 ? "btn-primary" : "btn-outline"} mt-6`}>Quote this program</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Compact season timeline (when / what). */
export function SeasonTimeline({ items, title = "Your season, step by step" }: { items: { when: string; what: string }[]; title?: string }) {
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="wrap max-w-4xl">
        <SectionHeading eyebrow="Timeline" title={title} />
        <ol className="relative border-l-2 border-[var(--accent)] ml-3 space-y-7">
          {items.map((t) => (
            <li key={t.when} className="pl-7 relative">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[var(--gold)] ring-4 ring-[var(--surface)]" />
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-ink)]">{t.when}</p>
              <p className="mt-1 text-body leading-relaxed">{t.what}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Video strip: short clips that play when scrolled into view. */
export function VideoStrip({ keys, eyebrow = "On site", title = "A few seconds on our job sites", sub }: { keys: string[]; eyebrow?: string; title?: string; sub?: string }) {
  const clips = keys.map((k) => getVideo(k)).filter((v): v is NonNullable<typeof v> => Boolean(v));
  if (!clips.length) return null;
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <SectionHeading eyebrow={eyebrow} title={title} sub={sub} />
        <div className={`grid gap-4 ${clips.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {clips.map((c) => (
            <figure key={c.key} className="relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4] bg-[var(--deep)]">
              <VideoLoop src={c.src} poster={posterFor(c).src} label={c.alt} className="absolute inset-0 w-full h-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm text-white bg-gradient-to-t from-black/70 to-transparent">{c.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing section with the compact form on a photo bed. */
export function ClosingForm({ eyebrow = site.quote.short, title = "Tell us about the property. We’ll bring the plan.", body = site.quote.detail, image = "corporate-lobby-christmas-tree-gold-ribbon-accent-trees", formProps }: { eyebrow?: string; title?: string; body?: string; image?: string; formProps?: React.ComponentProps<typeof QuoteFormCompact> }) {
  const img = getImage(image);
  return (
    <section className="relative overflow-hidden section on-photo" style={{ background: "var(--deep)" }}>
      <Image src={img.src} alt={img.alt} fill sizes="100vw" placeholder="blur" blurDataURL={img.blurDataURL} className="object-cover opacity-50" />
      <div className="absolute inset-0 night-veil-center" />
      <div className="wrap relative grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="pill mb-4">{eyebrow}</span>
          <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.08] text-ink text-balance">{title}</h2>
          <p className="mt-4 text-body leading-relaxed max-w-xl">{body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.phoneHref} className="btn btn-ghost-white"><Icon.Phone width={18} height={18} /> {site.phone}</a>
            <Link href="/gallery" className="btn btn-ghost-white">See our work</Link>
          </div>
        </div>
        <div className="card-light p-5 sm:p-7">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Request a commercial quote</h3>
          <p className="text-sm text-slate-600 mb-4">We reply within {site.responseTime} and book a site visit at your convenience.</p>
          <QuoteFormCompact formId="closing" {...formProps} />
        </div>
      </div>
    </section>
  );
}

/** Boxed CTA without a form. */
export function BookCta({ title, body, eyebrow = "Next step" }: { title: string; body: string; eyebrow?: string }) {
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <div className="card card-static p-6 md:p-10 lg:p-14 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center" style={{ background: "linear-gradient(135deg, var(--panel) 0%, var(--surface-2) 100%)" }}>
          <div>
            <span className="pill mb-4">{eyebrow}</span>
            <h2 className="font-display text-3xl md:text-[2.4rem] leading-[1.08] text-ink">{title}</h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed max-w-xl">{body}</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link href="/contact" className="btn btn-primary btn-lg">{site.quote.ctaLong} <Icon.Arrow width={18} height={18} /></Link>
            <a href={site.phoneHref} className="btn btn-outline btn-lg"><Icon.Phone width={18} height={18} /> Call {site.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
