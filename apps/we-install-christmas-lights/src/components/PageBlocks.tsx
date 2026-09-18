import Image from "next/image";
import Link from "next/link";
import type { Faq, Photo, Section } from "@/lib/content";
import { faqJsonLd } from "@/lib/content";
import { site } from "@/lib/site";
import { CheckIcon, StarIcon } from "./icons";
import { QuoteForm } from "./QuoteForm";

/** Photo hero with overlaid headline and an inline quote form on desktop. */
export function PhotoHero({
  eyebrow,
  h1,
  intro,
  photo,
  formType = "Residential",
  formCity,
  source,
  ctaLabel = "Get a Free Quote",
}: {
  eyebrow: string;
  h1: string;
  intro: string;
  photo: Photo | null;
  formType?: "Residential" | "Commercial";
  formCity?: string;
  source?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--ink-strong)] text-white">
      {photo && (
        <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover opacity-60" />
      )}
      <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#022B1A]/90 via-[#022B1A]/70 to-[#022B1A]/30" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">{eyebrow}</p>
          <h1 className="heading-display mt-3 text-4xl leading-[1.05] text-white sm:text-5xl lg:text-[3.4rem]">{h1}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">{intro}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
            <span className="flex items-center gap-1.5"><StarIcon className="h-4 w-4 text-[#FFD43B]" /> 5.0 on Google · 80+ reviews</span>
            <span>Fully insured · WSIB</span>
            <span>Since 2016</span>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:hidden">
            <a href="#quote" className="btn btn-red">{ctaLabel}</a>
            <a href={site.phoneHref} className="btn btn-outline-white">Call {site.phone}</a>
          </div>
        </div>
        <div className="hidden lg:block">
          <QuoteForm variant="hero" defaultType={formType} defaultCity={formCity} source={source} />
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const items = [
    ["5.0★", "Google rating, 80+ reviews"],
    ["96%", "of customers rebook next year"],
    ["1 day", "typical residential install"],
    ["2016", "family-owned since"],
  ];
  return (
    <div className="border-b border-[color:var(--border)] bg-[color:var(--bg-cream)]">
      <ul className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 px-4 py-5 sm:px-6 md:grid-cols-4 lg:px-8">
        {items.map(([n, l]) => (
          <li key={l} className="flex items-baseline gap-2">
            <span className="heading-display text-2xl text-[color:var(--brand-red)]">{n}</span>
            <span className="text-sm text-[color:var(--ink-soft)]">{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Prose({ paragraphs, className = "" }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={`space-y-4 text-[17px] leading-relaxed text-[color:var(--ink-soft)] ${className}`}>
      {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  );
}

export function SectionList({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-8">
      {sections.map((s) => (
        <div key={s.heading}>
          <h2 className="heading-display text-2xl text-[color:var(--ink-strong)]">{s.heading}</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-[color:var(--ink-soft)]">{s.text}</p>
        </div>
      ))}
    </div>
  );
}

export function CheckList({ items, columns = 2, dark = false }: { items: string[]; columns?: 1 | 2 | 3; dark?: boolean }) {
  const cols = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <ul className={`grid gap-2.5 ${cols}`}>
      {items.map((it) => (
        <li key={it} className={`flex items-start gap-2.5 text-[15px] ${dark ? "text-white/90" : "text-[color:var(--ink-strong)]"}`}>
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-red)] text-white"><CheckIcon className="h-3 w-3" /></span>
          {it}
        </li>
      ))}
    </ul>
  );
}

export function PhotoGrid({ photos, title, caption }: { photos: Photo[]; title?: string; caption?: string }) {
  if (photos.length === 0) return null;
  return (
    <section className="section bg-[color:var(--bg-soft)]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Our work</p>
              <h2 className="heading-display mt-2 text-3xl">{title}</h2>
              {caption && <p className="mt-2 max-w-2xl text-[color:var(--ink-soft)]">{caption}</p>}
            </div>
            <Link href="/gallery" className="text-sm font-bold text-[color:var(--brand-green)] hover:text-[color:var(--brand-red)]">Full gallery →</Link>
          </div>
        )}
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {photos.map((p, i) => (
            <li key={p.file} className={`relative overflow-hidden rounded-xl bg-stone-200 ${i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-[4/3]"}`}>
              <Image src={p.src} alt={p.alt} fill sizes={i === 0 ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 320px, 50vw"} placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover transition-transform duration-500 hover:scale-[1.03]" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FaqSection({ faqs, title = "Questions we hear a lot", withSchema = true, id }: { faqs: Faq[]; title?: string; withSchema?: boolean; id?: string }) {
  if (!faqs?.length) return null;
  return (
    <section className="section" id={id}>
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">FAQ</p>
        <h2 className="heading-display mt-2 text-3xl">{title}</h2>
        <div className="mt-8 divide-y divide-[color:var(--border)] rounded-2xl border border-[color:var(--border)] bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-bold text-[color:var(--ink-strong)] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="shrink-0 text-[color:var(--brand-red)] transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--ink-soft)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      {withSchema && <script id={`faq-${(id ?? title).replace(/\W+/g, "-")}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />}
    </section>
  );
}

export function QuoteSection({ type = "Residential", city, source, title, blurb }: { type?: "Residential" | "Commercial"; city?: string; source?: string; title?: string; blurb?: string }) {
  return (
    <section className="section bg-[color:var(--bg-cream)]" id="quote">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
        <div>
          <p className="eyebrow">Free quote · 24-hour reply</p>
          <h2 className="heading-display mt-2 text-3xl sm:text-4xl">{title ?? (type === "Commercial" ? "Tell us about the property" : "Tell us about your home")}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[color:var(--ink-soft)]">
            {blurb ?? (type === "Commercial"
              ? "Send the address and what you have in mind. A commercial lighting specialist will come back with a design, a firm price and an install window that works around your hours."
              : "Send a photo or the address and what you have in mind. We reply with a custom design and a firm all-in price, then hold a date for you.")}
          </p>
          <ul className="mt-6 space-y-2 text-[15px] text-[color:var(--ink-strong)]">
            {["Everything supplied, installed, maintained, removed", "Fully insured, WSIB-compliant crews", "Custom-cut to your roofline, no staples or nails", "Prefer to talk? Call " + site.phone].map((t) => (
              <li key={t} className="flex items-start gap-2.5"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-green)] text-white"><CheckIcon className="h-3 w-3" /></span>{t}</li>
            ))}
          </ul>
        </div>
        <QuoteForm variant="full" defaultType={type} defaultCity={city} source={source} />
      </div>
    </section>
  );
}

export function CtaBand({ type = "Residential" }: { type?: "Residential" | "Commercial" }) {
  return (
    <section className="bg-[color:var(--brand-red)] text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <h2 className="heading-display text-3xl text-white sm:text-4xl">{type === "Commercial" ? "Book your property before the calendar fills." : "Installs book up by mid-November."}</h2>
          <p className="mt-3 max-w-xl text-white/90">{type === "Commercial" ? "Commercial slots go first because they run after hours. A site visit now locks your dates and your price." : "Lock in your date now. We can install early and switch on whenever you like."} <strong>{site.earlyBird.headline}</strong></p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#quote" className="btn btn-outline-white">Get a Free Quote</a>
          <a href={site.phoneHref} className="btn btn-green">Call {site.phone}</a>
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-7xl px-4 pt-5 text-xs uppercase tracking-[0.16em] text-[color:var(--ink-soft)] sm:px-6 lg:px-8">
      {items.map((it, i) => (
        <span key={it.name}>
          {i > 0 && <span className="mx-2">/</span>}
          {it.href ? <Link href={it.href} className="hover:text-[color:var(--brand-red)]">{it.name}</Link> : <span className="text-[color:var(--ink-strong)]">{it.name}</span>}
        </span>
      ))}
    </nav>
  );
}
