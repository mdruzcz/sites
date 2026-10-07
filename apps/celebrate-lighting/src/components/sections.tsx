import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getFeaturedTestimonials, getPhoto, type Testimonial } from "@/lib/content";
import { Icon } from "./Icons";
import { SectionHeading, IconTile } from "./ui";
import { QuoteFormCompact } from "./QuoteFormCompact";
import { AiPreviewButton } from "./AiPreviewProvider";

/* Reusable page sections (server components). */

export function ProcessTimeline({
  steps,
  eyebrow = "The process",
  title = "How It Works",
  sub = "From first call to lights-on, we handle every detail.",
  gold = false,
}: {
  steps: { title: string; desc: string; highlight?: string }[];
  eyebrow?: string;
  title?: string;
  sub?: string;
  gold?: boolean;
}) {
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <SectionHeading eyebrow={eyebrow} title={title} sub={sub} gold={gold} />
        <ol className={`timeline grid gap-8 lg:grid-cols-${Math.min(steps.length, 5)} lg:gap-6`}>
          {steps.map((s, i) => (
            <li key={s.title} className="relative pl-16 lg:pl-0 lg:text-center">
              <span className={`timeline-dot absolute left-0 top-0 lg:static lg:flex lg:mx-auto lg:mb-5 ${gold ? "!bg-[var(--gold)]" : ""}`}>{i + 1}</span>
              {s.highlight && <div className="mb-2"><span className={`pill ${gold ? "pill-gold" : ""}`}>{s.highlight}</span></div>}
              <h3 className="font-bold text-white text-lg mb-1.5">{s.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Testimonials({ items, title = "What Our Clients Say", sub = "Homeowners across Southwestern Ontario." }: { items?: Testimonial[]; title?: string; sub?: string }) {
  const list = items ?? getFeaturedTestimonials();
  const photo = getPhoto("warm-white-permanent-roofline-lights-two-storey-home-covered-porch");
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="wrap">
        <SectionHeading eyebrow="Testimonials" title={title} sub={sub} />
        <div className="card card-static overflow-hidden grid lg:grid-cols-[1fr_1.4fr]">
          <div className="relative min-h-[240px] lg:min-h-full">
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1024px) 100vw, 40vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover" />
          </div>
          <div className="p-6 md:p-10 grid sm:grid-cols-2 gap-6">
            {list.slice(0, 4).map((t) => (
              <figure key={t.author + t.location} className="flex flex-col">
                <div className="flex gap-0.5 text-[var(--gold)] mb-3" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => <Icon.Star key={i} width={16} height={16} />)}
                </div>
                <blockquote className="text-[#e3e9f2] leading-relaxed text-[0.95rem] flex-1">“{t.quote}”</blockquote>
                <figcaption className="mt-3 text-sm"><span className="font-bold text-white">{t.author}</span> <span className="text-[var(--muted)]">· {t.location}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link href="/reviews" className="btn btn-outline btn-sm">Read more reviews <Icon.Arrow width={16} height={16} /></Link>
        </div>
      </div>
    </section>
  );
}

export function BookCta({
  eyebrow = "Limited fall availability",
  title = "Book Your Free On-Site Demo",
  body,
  primary = { label: site.demo.ctaLong, href: "/contact" },
  gold = false,
  bullets,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  gold?: boolean;
  bullets?: { icon: React.ReactNode; title: string; body: string }[];
}) {
  const items = bullets ?? [
    { icon: <Icon.Home />, title: "Permanent lighting", body: "One install, every night of the year. Free demo on your own house first." },
    { icon: <Icon.Lamp />, title: "Seasonal C9 lights", body: "Classic big bulbs, hung in the fall and gone in January. Rent or buy." },
    { icon: <Icon.Sparkle />, title: "Free AI home preview", body: "Upload one photo and see your home lit before you book anything." },
  ];
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <div className="card card-static p-6 md:p-10 lg:p-14 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center" style={{ background: "linear-gradient(135deg, var(--panel) 0%, var(--surface-2) 100%)" }}>
          <div>
            <span className={`pill ${gold ? "pill-gold" : ""} mb-4`}>{eyebrow}</span>
            <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.08] text-white">{title}</h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed max-w-xl">{body ?? site.demo.detail}</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href={primary.href} className={`btn ${gold ? "btn-gold" : "btn-primary"} btn-lg`}>{primary.label} <Icon.Arrow width={18} height={18} /></Link>
              <a href={site.phoneHref} className="btn btn-outline btn-lg"><Icon.Phone width={18} height={18} /> Call {site.phone}</a>
            </div>
          </div>
          <ul className="space-y-3">
            {items.map((b) => (
              <li key={b.title} className="card card-static p-4 flex gap-4 items-start" style={{ background: "rgba(255,255,255,0.03)" }}>
                <IconTile gold={gold} className="shrink-0">{b.icon}</IconTile>
                <div>
                  <p className="font-bold text-white">{b.title}</p>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{b.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Closing section with the compact form on a photo bed. */
export function ClosingForm({
  eyebrow = "Free on-site demo",
  title = "See It Lit Up on Your Own Home. Then Decide.",
  body = site.demo.detail,
  photoNeedle = "cool-white-permanent-roofline-lights-stone-home-wraparound-porch",
  formProps,
  gold = false,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  photoNeedle?: string;
  formProps?: React.ComponentProps<typeof QuoteFormCompact>;
  gold?: boolean;
}) {
  const photo = getPhoto(photoNeedle);
  return (
    <section className="relative overflow-hidden section" style={{ background: "var(--deep)" }}>
      <Image src={photo.src} alt={photo.alt} fill sizes="100vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover opacity-50" />
      <div className="absolute inset-0 night-veil-center" />
      <div className="wrap relative grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className={`pill ${gold ? "pill-gold" : ""} mb-4`}>{eyebrow}</span>
          <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.08] text-white text-balance">{title}</h2>
          <p className="mt-4 text-[#c3cddc] leading-relaxed max-w-xl">{body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <AiPreviewButton className="btn btn-outline" />
            <a href={site.phoneHref} className="btn btn-ghost-white"><Icon.Phone width={18} height={18} /> {site.phone}</a>
          </div>
        </div>
        <div className="card-light p-5 sm:p-7">
          <h3 className="text-lg font-bold text-slate-900 mb-1">{gold ? "Get your seasonal quote" : "Book your free demo"}</h3>
          <p className="text-sm text-slate-600 mb-4">{gold ? "Early bookings get the best dates and the season's lowest price." : "We call within 24 hours to set a time."}</p>
          <QuoteFormCompact formId="closing" gold={gold} {...formProps} />
        </div>
      </div>
    </section>
  );
}

export function SplitFeature({
  eyebrow,
  title,
  body,
  bullets,
  photoNeedle,
  flip = false,
  cta,
  gold = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  bullets?: { icon: React.ReactNode; label: string }[];
  photoNeedle: string;
  flip?: boolean;
  cta?: { label: string; href: string };
  gold?: boolean;
}) {
  const photo = getPhoto(photoNeedle);
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className={`wrap grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[var(--border)]">
          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover" />
        </div>
        <div>
          <span className={`pill ${gold ? "pill-gold" : ""} mb-4`}>{eyebrow}</span>
          <h2 className="font-display text-3xl md:text-[2.4rem] leading-[1.1] text-white text-balance">{title}</h2>
          <p className="mt-4 text-[var(--muted)] leading-relaxed">{body}</p>
          {bullets && (
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {bullets.map((b) => (
                <li key={b.label} className="flex items-center gap-3 text-sm font-semibold text-[#e3e9f2]">
                  <IconTile gold={gold} className="!w-10 !h-10 shrink-0">{b.icon}</IconTile>{b.label}
                </li>
              ))}
            </ul>
          )}
          {cta && <Link href={cta.href} className="btn btn-outline mt-7">{cta.label} <Icon.Arrow width={16} height={16} /></Link>}
        </div>
      </div>
    </section>
  );
}
