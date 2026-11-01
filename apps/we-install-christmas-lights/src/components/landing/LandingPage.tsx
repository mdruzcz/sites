import Image from "next/image";
import Link from "next/link";
import type { CityContent, LandingContent, Photo } from "@/lib/content";
import { getLandingPhotos } from "@/lib/content";
import { getCityBySlug, site } from "@/lib/site";
import { AwardBadge } from "../award-badge";
import { CheckIcon, DropletIcon, MapPinIcon, PhoneIcon, ShieldIcon, StarIcon } from "../icons";
import { BeforeAfter } from "./BeforeAfter";
import { JumpToFormButton, SelectPackageButton, StickyUploadBar } from "./LandingCtas";
import { LandingQuoteForm } from "./LandingQuoteForm";

const STEPS = [
  { n: "01", title: "Submit Photo & Request Quote", photo: "design", text: "Upload a photo of your front elevation. We map out your roofline and send a custom design within 24 hours." },
  { n: "02", title: "Professional Installation", photo: "install", text: "Our insured, trained crew custom-cuts commercial LED wiring to fit your home's exact dimensions, with no messy loose cords." },
  { n: "03", title: "In-Season Guarantee", photo: "lit", text: "If a bulb burns out or a storm shifts a clip, text us. We fix it within 24–48 hours free of charge." },
  { n: "04", title: "Takedown & Storage", photo: "takedown", text: "Come January, we carefully remove your display and store it safely in our dry facility until next season." },
];

const PACKAGES = [
  {
    name: "Essentials", lead: "Essentials (Classic, from $700)", price: "From $700", cta: "Select Essentials",
    idealFor: "Single-story or front-facing peak focus",
    lighting: "Front Gutter/Eave Roofline",
    service: "Install, Takedown & Storage",
  },
  {
    name: "Signature Roofline & Trees", short: "Signature", lead: "Signature (Festive, from $1,400)", price: "From $1,400", cta: "Select Signature", featured: true,
    idealFor: "Standard 2-story residential homes",
    lighting: "Full Front & Side Roofline + Peak Framing",
    service: "Install, Takedown & Storage",
  },
  {
    name: "Estate Holiday Experience", short: "Estate", lead: "Estate (Griswold, from $2,800)", price: "From $2,800+", cta: "Select Estate",
    idealFor: "Large custom builds & wraparound rooflines",
    lighting: "Complete Roofline, Pillars, Trees & Wreaths",
    service: "Install, Takedown, Storage & Priority Service",
  },
];

const STATS = [
  [`${site.googleRating}★`, `Google rating, ${site.reviewCount}+ reviews`],
  ["96%", "of customers rebook next year"],
  ["740+", "homes decorated"],
  ["2016", "family-owned since"],
];

const initials = (name: string) => name.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w) && w.toLowerCase() !== "and").slice(0, 2).map((w) => w[0].toUpperCase()).join("");

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return <span className="flex gap-0.5 text-[#F5A623]" aria-hidden>{[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} className={className} />)}</span>;
}

function Photo({ p, sizes, className = "object-cover" }: { p: Photo; sizes: string; className?: string }) {
  return <Image src={p.src} alt={p.alt} fill sizes={sizes} placeholder="blur" blurDataURL={p.blurDataURL} className={className} />;
}

/** Conversion layout for pages receiving paid traffic. City copy comes from content/landing/<slug>.json. */
export function LandingPage({ lp, city }: { lp: LandingContent; city: CityContent }) {
  const photos = getLandingPhotos();
  const nearby = city.nearby.map(getCityBySlug).filter((x): x is NonNullable<typeof x> => !!x);
  const urgencyBody = lp.urgency.eventBody && lp.urgency.eventUntil && new Date() < new Date(lp.urgency.eventUntil) ? lp.urgency.eventBody : lp.urgency.body;

  return (
    <>
      {/* Paid traffic gets a header with no way out but the phone or the form. CSS hides the site nav while this exists. */}
      <header className="lp-header sticky top-0 z-50 border-b border-[color:var(--border)] bg-white">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
            <Image src="/images/logo.png" alt={`${site.name} logo`} width={300} height={76} priority className="h-11 w-auto" />
          </Link>
          <p className="hidden items-center gap-1.5 text-sm font-semibold text-[color:var(--ink-soft)] lg:flex"><MapPinIcon className="h-4 w-4 text-[color:var(--brand-red-deep)]" /> Serving {lp.areaLabel.replace(" / ", " & ")}</p>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href={site.phoneHref} aria-label={`Call ${site.phone}`} className="flex min-h-[44px] items-center gap-2 px-1 font-bold text-[color:var(--ink-strong)] hover:underline">
              <PhoneIcon className="h-4 w-4 text-[color:var(--brand-red-deep)]" /><span className="hidden sm:inline">{site.phone}</span><span className="sm:hidden">Call</span>
            </a>
            <JumpToFormButton className="lp-cta lp-cta-sm">Free Quote</JumpToFormButton>
          </div>
        </div>
      </header>

      {/* 1. Hero: 60/40 split with the form above the fold */}
      <section className="relative isolate overflow-hidden bg-[#06140E] text-white">
        <Image src={photos.hero.src} alt={photos.hero.alt} fill priority sizes="100vw" placeholder="blur" blurDataURL={photos.hero.blurDataURL} className="-z-20 object-cover brightness-125 saturate-125" />
        <div className="absolute inset-0 -z-10 bg-black/40" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/40 via-black/10 to-transparent" aria-hidden />
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-10 lg:px-8 lg:py-14">
          <div>
            <h1 className="lp-heading text-[1.9rem] text-white [text-shadow:0_2px_18px_rgba(0,0,0,.55)] sm:text-5xl lg:text-[3.2rem]">
              <span className="block text-[#FFD27A]">{lp.h1Accent}</span> <span className="mt-1 block">{lp.h1Rest}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/95 lg:mt-4 [text-shadow:0_1px_10px_rgba(0,0,0,.6)] sm:text-lg lg:text-xl">{lp.sub}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5 sm:gap-2 lg:mt-5">
              {lp.badges.map((b) => (
                <li key={b} className="flex min-h-[28px] items-center gap-1.5 rounded-full border border-white/25 bg-black/45 px-2.5 py-0.5 text-xs font-semibold sm:min-h-[34px] sm:px-3.5 sm:text-sm backdrop-blur-sm">
                  <CheckIcon className="h-3.5 w-3.5 text-[#FFD27A]" />{b}
                </li>
              ))}
            </ul>
            <div className="mt-6 hidden flex-wrap items-center gap-x-5 gap-y-3 lg:flex">
              <JumpToFormButton className="lp-cta">Get My Free Design &amp; Quote</JumpToFormButton>
              <a href={site.phoneHref} className="flex min-h-[44px] items-center gap-2 font-bold text-white [text-shadow:0_1px_8px_rgba(0,0,0,.6)] hover:underline"><PhoneIcon className="h-4 w-4 text-[#FFD27A]" /> Call {site.phone}</a>
            </div>
          </div>
          <LandingQuoteForm city={lp.city} areaLabel={lp.areaLabel} center={lp.mapCenter} source={`landing:${lp.slug}`} />
        </div>
      </section>

      {/* Proof numbers sit right under the fold line */}
      <section aria-label="Why homeowners choose us" className="bg-[#06140E] text-white">
        <ul className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-4 gap-y-3 px-4 py-5 sm:px-6 md:grid-cols-4 lg:px-8">
          {STATS.map(([n, label]) => (
            <li key={label} className="flex items-baseline gap-2">
              <span className="lp-heading text-2xl text-[#FFD27A]">{n}</span>
              <span className="text-sm text-white/80">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Local proof */}
      <section className="border-b border-[color:var(--border)] bg-white py-10 lg:py-14">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="lp-heading text-2xl sm:text-3xl">{lp.proof.heading}</h2>
              <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-[color:var(--ink-soft)]">{lp.proof.body}</p>
            </div>
            <AwardBadge style={{ justifySelf: "start" }} />
          </div>
          <ul className="mt-7 grid gap-4 md:grid-cols-3">
            {lp.reviews.map((r) => (
              <li key={r.name} className="flex gap-3 rounded-2xl border border-[color:var(--border)] p-5">
                <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-green)] font-bold text-white">{initials(r.name)}</span>
                <div>
                  <Stars className="h-3.5 w-3.5" />
                  <blockquote className="mt-1.5 text-[15px] leading-relaxed text-[color:var(--ink-strong)]">&ldquo;{r.quote}&rdquo;</blockquote>
                  <p className="mt-1.5 text-sm font-semibold text-[color:var(--ink-soft)]">{r.name}, {r.city}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-[color:var(--ink-soft)]">{lp.proof.reviewsNote}</p>
        </div>
      </section>

      {/* 4. How it works */}
      <section className="section bg-[color:var(--bg-soft)]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="lp-heading text-3xl sm:text-4xl">How it works</h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative aspect-[4/3] bg-stone-200"><Photo p={photos[s.photo]} sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" /></div>
                <div className="p-5">
                  <span className="lp-heading text-3xl text-[color:var(--brand-red-deep)]">{s.n}</span>
                  <h3 className="lp-heading mt-1 text-lg">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--ink-soft)]">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Packages */}
      <section className="section bg-[#06140E] text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="lp-heading text-3xl text-white sm:text-4xl">All-Inclusive Service Packages</h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-white/80">We supply all commercial-grade custom LED bulbs, timers, hidden wiring, and heavy-duty clips. You own the convenience; we own the maintenance.</p>
          <div className="mt-9 grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {PACKAGES.map((p, i) => (
              <article key={p.name} className={`relative flex flex-col rounded-2xl p-6 ${p.featured ? "bg-white text-[color:var(--ink-strong)] shadow-[0_0_60px_-12px_rgba(255,210,122,.55)] ring-2 ring-[#FFD27A]" : "border border-white/15 bg-white/5"}`}>
                {p.featured && <span className="absolute -top-3 left-6 rounded-full bg-[#FFD27A] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#06140E]">Most popular</span>}
                <h3 className={`lp-heading text-xl ${p.featured ? "" : "text-white"}`}>{p.name}</h3>
                <p className={`lp-heading mt-3 text-3xl ${p.featured ? "text-[color:var(--brand-red-deep)]" : "text-[#FFD27A]"}`}>{p.price}</p>
                {lp.packageFit[i] && <p className={`mt-1.5 flex items-start gap-1.5 text-sm font-semibold ${p.featured ? "text-[color:var(--brand-green)]" : "text-white/80"}`}><MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />{lp.packageFit[i]}</p>}
                <dl className={`mt-5 flex-1 space-y-3.5 text-[15px] ${p.featured ? "text-[color:var(--ink-strong)]" : "text-white/90"}`}>
                  {[["Ideal for", p.idealFor], ["Included lighting", p.lighting], ["Hardware grade", "Commercial-Grade Custom C9 LEDs"], ["Service included", p.service]].map(([k, v]) => (
                    <div key={k}>
                      <dt className={`text-xs font-bold uppercase tracking-wider ${p.featured ? "text-[color:var(--ink-soft)]" : "text-white/55"}`}>{k}</dt>
                      <dd className="mt-0.5">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6">
                  <SelectPackageButton choice={{ label: p.short ?? p.name, lead: p.lead }} featured={p.featured}>{p.cta}</SelectPackageButton>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-white/75">Your exact number depends on roofline footage, roof pitch and add-ons like tree wrapping or wreaths. You get a firm line-item price from your photo before anything is booked.</p>
        </div>
      </section>

      {/* Local guide: unique to each city, visible rather than tucked away */}
      <section className="section bg-[color:var(--bg-cream)]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="lp-heading text-3xl sm:text-4xl">{lp.areasHeading}</h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-[color:var(--ink-soft)]">{lp.areasIntro}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lp.areas.map((a) => (
              <li key={a.name} className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="lp-heading flex items-start gap-2 text-lg"><MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--brand-red-deep)]" />{a.name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[color:var(--ink-soft)]">{a.text}</p>
                <p className="mt-3 text-sm font-bold text-[color:var(--brand-green)]">Usually fits: {a.fit}</p>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-[15px] text-[color:var(--ink-soft)]">{lp.areasNote}</p>
            <JumpToFormButton className="lp-cta shrink-0">Get My Free Design &amp; Quote</JumpToFormButton>
          </div>
        </div>
      </section>

      {/* 6. Before and after */}
      <section className="section bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="lp-heading text-3xl sm:text-4xl">Real Transformations</h2>
          <p className="mt-2 text-[17px] text-[color:var(--ink-soft)]">Slide to see how custom-cut commercial LEDs turn standard rooflines into winter wonderlands.</p>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <BeforeAfter before={photos.baDay} after={photos.baNight} beforeLabel="At dusk" afterLabel="After dark" />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              {[photos.gallery1, photos.gallery2].map((p) => (
                <div key={p.file} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200 lg:aspect-auto"><Photo p={p} sizes="(min-width: 1024px) 400px, 50vw" /></div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm text-[color:var(--ink-soft)]">Real installs by our crews across South-Western Ontario.</p>
        </div>
      </section>

      {/* 7. Trust and safety */}
      <section className="section bg-[color:var(--bg-cream)]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="lp-heading text-3xl sm:text-4xl">Safe for your home, built for Ontario winters</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative aspect-[16/10] bg-stone-200"><Photo p={photos.clips} sizes="(min-width: 768px) 33vw, 100vw" /></div>
              <div className="p-5">
                <h3 className="lp-heading text-lg">Zero Roof Damage Guarantee</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--ink-soft)]">We never use nails, staples, or screws on your home. Our custom clips lock securely onto gutters and shingles without piercing roofing materials.</p>
              </div>
            </article>
            <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative flex aspect-[16/10] flex-col items-center justify-center bg-[#06140E] px-6 text-center text-white">
                <DropletIcon className="h-10 w-10 text-[#FFD27A]" />
                <p className="lp-heading mt-3 text-3xl text-[#FFD27A]">-40°C</p>
                <p className="mt-1 text-sm font-semibold text-white/85">SPT-2 waterproof sockets &amp; C9 LED bulbs</p>
              </div>
              <div className="p-5">
                <h3 className="lp-heading text-lg">Commercial-Grade Weatherproofing</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--ink-soft)]">Retail store lights fail in wet Ontario freezing rain. Our custom SPT-2 waterproof sockets and energy-efficient C9 LED bulbs are rated for -40°C winter conditions.</p>
              </div>
            </article>
            <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative aspect-[16/10] bg-stone-200">
                <Photo p={photos.lift} sizes="(min-width: 768px) 33vw, 100vw" />
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[#06140E]/90 px-3 py-1.5 text-xs font-bold text-white"><ShieldIcon className="h-4 w-4 text-[#FFD27A]" /> $2M liability · WSIB</span>
              </div>
              <div className="p-5">
                <h3 className="lp-heading text-lg">Fully Insured &amp; WSIB Certified</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--ink-soft)]">Don&rsquo;t risk slipping off an icy ladder. Our technicians are fully insured with $2,000,000 liability coverage and Working at Heights certification.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 8. Local FAQ, then the city guide that keeps this page's organic rankings */}
      <section className="section bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="lp-heading text-3xl sm:text-4xl">{lp.city} Christmas light questions</h2>
          <div className="mt-7 divide-y divide-[color:var(--border)] rounded-2xl border border-[color:var(--border)]">
            {lp.faq.map((f) => (
              <details key={f.q} className="group px-5">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-bold text-[color:var(--ink-strong)] [&::-webkit-details-marker]:hidden">
                  {f.q}<span className="shrink-0 text-xl text-[color:var(--brand-red-deep)] transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="pb-4 text-[15px] leading-relaxed text-[color:var(--ink-soft)]">{f.a}</p>
              </details>
            ))}
          </div>

          <details className="group mt-8 rounded-2xl bg-[color:var(--bg-cream)] px-5">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 font-bold text-[color:var(--ink-strong)] [&::-webkit-details-marker]:hidden">
              More about Christmas light installation in {lp.city}
              <span className="shrink-0 text-xl text-[color:var(--brand-red-deep)] transition-transform group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <div className="space-y-4 pb-6 text-[15px] leading-relaxed text-[color:var(--ink-soft)]">
              {city.intro.map((p, i) => <p key={i}>{p}</p>)}
              {city.sections.map((s) => (
                <div key={s.heading}>
                  <h3 className="lp-heading text-lg">{s.heading}</h3>
                  <p className="mt-1.5">{s.text}</p>
                </div>
              ))}
              <div>
                <h3 className="lp-heading text-lg">{city.commercial.heading}</h3>
                <p className="mt-1.5">{city.commercial.text} <Link href="/commercial-christmas-lighting" className="inline-flex min-h-[44px] items-center font-bold text-[color:var(--brand-green)] underline">Commercial lighting services</Link>.</p>
              </div>
              <p className="flex flex-wrap gap-x-4">
                {nearby.map((n) => <Link key={n.slug} href={`/cities/${n.slug}`} className="inline-flex min-h-[44px] items-center font-semibold text-[color:var(--brand-green)] underline">Christmas lights in {n.name}</Link>)}
                <Link href="/service-areas" className="inline-flex min-h-[44px] items-center font-semibold text-[color:var(--brand-green)] underline">All service areas</Link>
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* 9. Urgency */}
      <section className="relative overflow-hidden bg-[#06140E] text-white">
        <div className="absolute inset-x-0 -top-40 mx-auto h-80 max-w-3xl rounded-full bg-[#FFB347]/25 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <h2 className="lp-heading text-3xl text-white sm:text-[2.6rem]">{lp.urgency.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">{urgencyBody}</p>
          <JumpToFormButton className="lp-cta mt-7">{lp.urgency.button}</JumpToFormButton>
        </div>
      </section>

      <StickyUploadBar />
    </>
  );
}
