import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteFormCompact } from "@/components/QuoteFormCompact";
import { GalleryTabs } from "@/components/GalleryTabs";
import { ServiceLineFork } from "@/components/ServiceLineFork";
import { VideoLoop } from "@/components/VideoLoop";
import { site } from "@/lib/site";
import { getProjects, getFeaturedTestimonials, getServices, getTestimonials } from "@/lib/content";
import { localBusinessSchema, faqSchema } from "@/lib/jsonld";
import videos from "@/content/xmas-videos.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Permanent LED & Christmas Lighting in Ontario | Celebrate Lighting" },
  description:
    "Permanent app-controlled LED lighting and classic C9 Christmas light installation across Southwestern Ontario. Free on-site demo for permanent — see it on your home before you pay.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Permanent LED & Christmas Lighting in Southwestern Ontario | Celebrate Lighting",
    description:
      "Two ways to light your home: permanent app-controlled LED track, or classic C9 Christmas lights installed and taken down each year. Free on-site demo for permanent.",
    url: "https://celebratelighting.ca",
    images: [{ url: "/images/hero-main.jpg", alt: "Permanent outdoor LED lighting installed by Celebrate Lighting on an Ontario home at night" }],
  },
};

/* The demo is the differentiator, so it gets the first FAQ slot —
   it's also the question that most often blocks a booking. */
const homeFaqs = [
  {
    question: "What actually happens at the free on-site demo?",
    answer:
      "A lighting specialist comes to your home, measures your rooflines, and takes a colour sample of your soffit and fascia. Then we mount a live sample section of track on your house and turn it on, so you can stand on your own driveway and see exactly how your home looks lit up — the real thing, at night, not a render or a catalogue photo. You get an itemized quote before we leave. There's no cost and no obligation.",
  },
  {
    question: "How much does a system cost?",
    answer:
      "Most residential installations run between $2,500 and $8,000 depending on the size of your home, the number of peaks and rooflines, and how much track is needed. You get a transparent, itemized quote at your demo — no hidden fees and no pressure to sign on the spot.",
  },
  {
    question: "Will it damage my roof or gutters?",
    answer:
      "No. We use specialized clips and mounting systems that don't penetrate your roof or damage gutters. Track is fastened into the soffit or fascia channel and colour-matched so it effectively disappears in daylight.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most residential installations are finished in one to two days, including app setup and a full walkthrough of the controls before we leave. We book installs the same week wherever our schedule allows.",
  },
  {
    question: "How do I control the lights?",
    answer:
      "Through a mobile app on your phone, connected over WiFi. Set colours, brightness, patterns and schedules from anywhere, with pre-programmed themes for every holiday included. Change it as often as you like — there's nothing to take down.",
  },
  {
    question: "What does the warranty cover?",
    answer:
      "A lifetime warranty on the LED modules, the mounting hardware, and our installation workmanship — including free repairs and replacements. The LEDs themselves are rated for 50,000+ hours and the components are IP67-sealed and cold-rated to −40°C.",
  },
];

/* Three steps, and step two is the whole pitch. */
const steps = [
  {
    step: "01",
    title: "Book your free demo",
    desc: "Call us or send the form. We'll ring you back within 24 hours and find a time that suits you — evenings included, since the lights show best after dark.",
  },
  {
    step: "02",
    title: "We come out and turn the lights on",
    desc: "We measure your rooflines, colour-match your soffit, and mount a live sample section right on your house. You see your own home lit up before you've spent a cent — then you get an itemized quote.",
  },
  {
    step: "03",
    title: "Professional installation",
    desc: "Say yes and we install the full system — usually in one to two days — with concealed cable routing, app setup, and a walkthrough of every control before we leave.",
  },
];

const whyPillars = [
  {
    title: "See it before you pay",
    body: "The only way to know how permanent lighting looks on your home is to see it on your home. We bring the demo to you — free, no obligation, no deposit.",
  },
  {
    title: "Colour-matched to disappear",
    body: "Track is mounted in your soffit or fascia channel and colour-matched to it. Lit up at night it's dramatic; in daylight you have to look for it.",
  },
  {
    title: "Built for Ontario winters",
    body: "IP67-sealed fixtures, UV-rated cable, and components cold-rated to −40°C. Installed once, left up year-round, through freeze-thaw and lake-effect snow.",
  },
  {
    title: "Lifetime warranty, in writing",
    body: "LED modules, mounting hardware, and our workmanship — covered for life, with free repairs and replacements. Local crews you can actually reach.",
  },
];

/* The Christmas light-show highlight reel — muted, autoplays on scroll into
   view (see VideoLoop). The manifest ships a produced reel with its own poster;
   the VideoObject schema below points crawlers at the same file. */
const reel = videos.reel;

const videoSchema = reel
  ? {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Celebrate Lighting Christmas Light Show Highlight Reel",
      description:
        "Highlights of permanent LED and classic Christmas light installations by Celebrate Lighting across Southwestern Ontario, filmed after dark.",
      thumbnailUrl: `${site.url}${reel.poster}`,
      uploadDate: "2026-08-25",
      contentUrl: `${site.url}${reel.src}`,
    }
  : null;

export default function HomePage() {
  const projects = getProjects();
  const testimonials = getFeaturedTestimonials();
  const services = getServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(getTestimonials())) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />
      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}

      {/* ============================================================
          HERO — night photograph, promise, and the form side by side.
          The form is above the fold on desktop and one scroll away on
          mobile; previously the only form on the page sat 9 sections down.
          ============================================================ */}
      <section className="relative overflow-hidden" style={{ background: "var(--deep)" }}>
        <div className="absolute inset-0">
          <Image
            src="/images/hero-main.jpg"
            alt="Home in Southwestern Ontario lit at night with permanent LED roofline lighting installed by Celebrate Lighting"
            fill
            priority
            sizes="100vw"
            className="object-cover hero-drift"
          />
          <div className="absolute inset-0 night-veil" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
          {/* Three blocks, re-ordered by breakpoint. On mobile the form comes
              straight after the CTAs (promise → form → proof) so it isn't
              pushed a full screen down by the stat row. On desktop the stats
              tuck under the headline and the form spans both rows. */}
          <div className="grid lg:grid-cols-12 gap-y-10 gap-x-10 items-start">
            {/* Promise */}
            <div className="lg:col-span-7 lg:row-start-1">
              <p className="section-eyebrow mb-5">
                Permanent &amp; Seasonal Outdoor Lighting · Southwestern Ontario
              </p>

              <h1 className="font-display text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem] font-extrabold text-white mb-6 text-balance">
                See It Lit Up On Your Home.{" "}
                <span style={{ color: "var(--accent)" }}>Before You Pay a Cent.</span>
              </h1>

              <p className="text-lg text-[#c7d2e1] leading-relaxed mb-8 max-w-xl">
                Every permanent quote starts with a free on-site demo. We come to you, colour-match your
                soffit, and mount a live sample right on your house so you can see the real thing — at night,
                on your own home. Then you decide.
              </p>
              <p className="text-base text-[#93a1b8] leading-relaxed mb-8 max-w-xl">
                Only want lights up for the holidays?{" "}
                <Link href="/seasonal-lighting" className="font-semibold underline decoration-1 underline-offset-2" style={{ color: "var(--gold)" }}>
                  We install classic C9 Christmas lights too
                </Link>{" "}
                — hung in the fall, taken down and stored in January.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn btn-primary text-base px-8">
                  {site.demo.ctaLong}
                </Link>
                <a href={site.phoneHref} className="btn btn-ghost-white text-base px-8">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {site.phone}
                </a>
              </div>
            </div>

            {/* Form — second on mobile, right-hand column on desktop */}
            <div className="order-2 lg:order-none lg:col-span-5 lg:row-start-1 lg:row-span-2">
              <div className="card-light p-6 sm:p-7">
                <div className="mb-5">
                  <h2 className="font-display text-xl font-bold text-slate-900 leading-snug">
                    Book your free on-site demo
                  </h2>
                  <p className="text-sm text-slate-600 mt-1.5">
                    We&apos;ll call within 24 hours to set a time. No cost, no obligation, no deposit.
                  </p>
                </div>
                <QuoteFormCompact formId="hero" />
              </div>
            </div>

            {/* Proof points — verifiable claims only. Last on mobile. */}
            <div className="order-3 lg:order-none lg:col-span-7 lg:row-start-2 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5 max-w-2xl self-start">
              {site.proofPoints.map((p) => (
                <div key={p.stat}>
                  <div className="stat-num text-2xl sm:text-[1.7rem] mb-1.5">{p.stat}</div>
                  <div className="text-[0.7rem] leading-snug text-[#93a1b8]">{p.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROMISE STRIP — what the demo is, what the system is, what it does */}
      <section className="border-y" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-6 md:gap-0 md:divide-x" style={{ borderColor: "var(--border)" }}>
            {[
              {
                head: "Free on-site demo",
                sub: "We mount a live sample on your house and turn it on — before you commit to anything.",
              },
              {
                head: "Lifetime warranty · IP67 · −40°C",
                sub: "Sealed fixtures, UV-rated cable, colour-matched track. Installed once, left up year-round.",
              },
              {
                head: "Every season, one system",
                sub: "Christmas · Halloween · Canada Day · game day · warm-white everyday — changed from your phone.",
              },
            ].map((item) => (
              <div key={item.head} className="md:px-8 first:md:pl-0 last:md:pr-0">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 shrink-0 mt-0.5"
                    style={{ color: "var(--accent)" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <div className="font-semibold text-[var(--foreground)] text-[0.9375rem] mb-1">{item.head}</div>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{item.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE FORK — two products, two audiences, chosen before anything else */}
      <ServiceLineFork />

      {/* ============================================================
          THE DIFFERENCE IS OBVIOUS AT NIGHT — why us, with the demo
          argued properly rather than asserted
          ============================================================ */}
      <section className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <p className="eyebrow-gold mb-4">Why Celebrate Lighting</p>
              <h2 className="font-display text-3xl md:text-[2.75rem] font-extrabold text-[var(--foreground)] leading-tight mb-6 text-balance">
                The difference is obvious at night.
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-8">
                Permanent lighting is a real investment, and no brochure, mock-up or render tells you what it
                will actually look like on <em>your</em> roofline, in <em>your</em> neighbourhood, after dark.
                So we stopped asking people to imagine it.
              </p>

              <div className="space-y-3">
                {[
                  {
                    q: "See it on your own home first",
                    a: "We bring a sample track and demo controller to your house, mount a live section on your actual soffit, and light it up. You see the real colour temperature, the real spacing, the real brightness against your brick or siding — standing in your own driveway. Then you decide, with an itemized quote in hand.",
                  },
                  {
                    q: "Colour-matched so it vanishes by day",
                    a: "We take a physical colour sample of your soffit and fascia at the demo and match the track to it. The result is dramatic after dark and close to invisible at noon — no white plastic strip running across the front of your house.",
                  },
                  {
                    q: "One system, every occasion",
                    a: "Warm white for everyday curb appeal, red and green at Christmas, orange at Halloween, red and white on Canada Day, your team's colours on game day. 16 million+ colours, scheduled or changed from your phone in seconds — with nothing to hang and nothing to take down.",
                  },
                ].map((item, i) => (
                  <details key={item.q} className="card p-5" open={i === 0}>
                    <summary className="flex items-center justify-between gap-4 font-semibold text-[var(--foreground)]">
                      {item.q}
                      <svg
                        className="w-5 h-5 shrink-0 transition-transform"
                        style={{ color: "var(--accent)" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-3 font-semibold">
                  Serving
                </p>
                <div className="flex flex-wrap gap-2">
                  {site.serviceAreas.map((city) => (
                    <Link
                      key={city}
                      href={`/service-areas/${city.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                      className="chip"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 40px 90px -30px rgba(0,0,0,0.85)" }}>
                <Image
                  src="/images/project-tillsonburg.jpg"
                  alt="Colour-matched permanent LED track lighting on the roofline of a Tillsonburg, Ontario home at dusk"
                  width={700}
                  height={525}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 90px rgba(0,0,0,0.5)" }} />
              </div>
              {/* Floating promise card */}
              <div
                className="absolute -bottom-6 left-4 right-4 sm:left-8 sm:right-8 rounded-2xl border p-5 backdrop-blur"
                style={{ background: "rgba(10,15,28,0.92)", borderColor: "var(--border-strong)" }}
              >
                <p className="text-sm text-[#dbe3ee] leading-relaxed">
                  <strong className="text-white">A real demo on your house</strong> — not a digital mock-up.
                  That&apos;s the difference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SEE IT IN MOTION — Christmas light-show reel, muted & looping,
          loads only when it scrolls into view (VideoLoop)
          ============================================================ */}
      {reel && (
        <section className="py-20 md:py-28" style={{ background: "var(--deep)" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <p className="eyebrow-gold mb-3">See It In Motion</p>
              <h2 className="font-display text-3xl md:text-[2.75rem] font-extrabold text-white tracking-tight text-balance">
                Watch the lights come alive.
              </h2>
              <p className="mt-4 text-[#c7d2e1] max-w-xl mx-auto leading-relaxed">
                Colour-changing pixel displays and classic Christmas installs across Southwestern Ontario —
                filmed after dark, exactly the way your neighbours see them.
              </p>
            </div>

            <div
              className="relative overflow-hidden rounded-2xl border"
              style={{ borderColor: "var(--border-strong)", boxShadow: "0 40px 90px -30px rgba(0,0,0,0.85)" }}
            >
              <VideoLoop
                src={reel.src}
                poster={reel.poster}
                className="aspect-video w-full rounded-2xl object-cover"
              />
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn btn-gold text-base px-8">
                {site.demo.ctaLong}
              </Link>
              <Link href="/gallery" className="btn btn-ghost-white text-base px-8">
                See the full gallery
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          GALLERY — the product is visual, so this moves up the page
          ============================================================ */}
      <section className="py-20 md:py-28" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">Our Work</p>
            <h2 className="font-display text-3xl md:text-[2.75rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              Real Ontario homes, lit by us.
            </h2>
            <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto">
              Every install is measured, colour-matched and laid out for the specific house. Here&apos;s
              what that looks like after dark.
            </p>
          </div>

          <GalleryTabs projects={projects} />
        </div>
      </section>

      {/* ============================================================
          DEMO PROMISE — the single-idea interstitial
          ============================================================ */}
      <section className="relative py-20 md:py-24 overflow-hidden" style={{ background: "var(--deep)" }}>
        <div className="absolute inset-0">
          <Image
            src="/images/project-brantford.jpg"
            alt="Bungalow in Brantford, Ontario with every roofline and gable peak traced in cool blue permanent LED lighting"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 night-veil-center" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <svg
            className="w-10 h-10 mx-auto mb-6"
            style={{ color: "var(--gold)" }}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2a1 1 0 011 1v1.5a1 1 0 11-2 0V3a1 1 0 011-1zm7.07 2.93a1 1 0 010 1.414l-1.06 1.06a1 1 0 11-1.415-1.414l1.061-1.06a1 1 0 011.414 0zM22 12a1 1 0 01-1 1h-1.5a1 1 0 110-2H21a1 1 0 011 1zM6.404 7.404a1 1 0 01-1.415 0L3.93 6.344A1 1 0 015.343 4.93l1.06 1.06a1 1 0 010 1.414zM4.5 12a1 1 0 01-1 1H2a1 1 0 110-2h1.5a1 1 0 011 1zM12 6.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM11 20a1 1 0 112 0v1a1 1 0 11-2 0v-1z" />
          </svg>
          <blockquote className="font-display text-2xl md:text-[2.1rem] font-bold text-white leading-snug mb-6 text-balance">
            &ldquo;See it lit up on your own home before you pay a cent. Every quote starts with a free
            on-site demo.&rdquo;
          </blockquote>
          <p className="text-[#b8c4d4] leading-relaxed mb-9 max-w-2xl mx-auto">
            {site.demo.detail}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn btn-gold text-base px-8">
              {site.demo.ctaLong}
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost-white text-base px-8">
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS
          ============================================================ */}
      <section className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">How It Works</p>
            <h2 className="font-display text-3xl md:text-[2.75rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              Three steps to a lit-up home.
            </h2>
            <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto">
              No deposit, no pressure, and nothing to pay until you&apos;ve seen it on your own house.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((item, i) => (
              <div
                key={item.step}
                className="card p-7 relative"
                style={i === 1 ? { borderColor: "var(--accent)" } : undefined}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-display font-extrabold text-sm shrink-0"
                    style={
                      i === 1
                        ? { background: "var(--accent)", color: "#04121a" }
                        : { background: "var(--accent-light)", color: "var(--accent)" }
                    }
                  >
                    {item.step}
                  </div>
                  {i === 1 && (
                    <span
                      className="text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                    >
                      The free part
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-[var(--foreground)] text-lg mb-2.5">{item.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="btn btn-primary text-base px-9">
              {site.demo.ctaLong}
            </Link>
            <p className="mt-4 text-sm text-[var(--muted)]">
              Or call{" "}
              <a href={site.phoneHref} className="font-semibold text-[var(--accent)] hover:underline">
                {site.phone}
              </a>{" "}
              — {site.hours.split("·")[0].trim()}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          SERVICES
          ============================================================ */}
      <section className="py-20 md:py-28" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">What We Do</p>
            <h2 className="font-display text-3xl md:text-[2.75rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              Our Services
            </h2>
            <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto">
              New systems, upgrades to an existing one, and service after the install — all by the same
              local crews.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card card-lift p-7 group flex flex-col"
              >
                <h3 className="font-bold text-[var(--foreground)] mb-2.5 text-lg group-hover:text-[var(--accent)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-5 flex-1">
                  {service.shortDescription}
                </p>
                <span className="text-sm font-semibold flex items-center gap-1.5" style={{ color: "var(--accent)" }}>
                  Learn more
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY US — four pillars
          ============================================================ */}
      <section className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow-gold mb-3">Why Homeowners Choose Us</p>
            <h2 className="font-display text-3xl md:text-[2.75rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              Four reasons this lasts.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPillars.map((pillar, i) => (
              <div key={pillar.title} className="card p-7">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 font-display font-extrabold text-sm"
                  style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                >
                  {i + 1}
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-2.5">{pillar.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIALS — customer quotes, no invented review counts
          ============================================================ */}
      <section className="py-20 md:py-28" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Customer Reviews</p>
            <h2 className="font-display text-3xl md:text-[2.75rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              What Ontario homeowners say.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure key={i} className="card p-7 flex flex-col">
                <div className="flex mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg
                      key={j}
                      className="w-4 h-4"
                      style={{ color: "var(--gold)" }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-sm text-[#c3cddc] leading-relaxed mb-5 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <div className="font-semibold text-sm text-[var(--foreground)]">{t.author}</div>
                  <div className="text-xs text-[var(--muted)]">{t.location}</div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/reviews" className="btn btn-outline">
              Read more reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          SERVICE AREA
          ============================================================ */}
      <section className="py-20 md:py-24" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-eyebrow mb-3">Where We Work</p>
              <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight mb-5 text-balance">
                Serving homes across Southwestern Ontario.
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                We&apos;re based in Woodstock and our crews cover Oxford County and the surrounding cities.
                Not sure whether you&apos;re in our area? Give us a call — chances are we cover it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn btn-primary">
                  {site.demo.ctaLong}
                </Link>
                <a href={site.phoneHref} className="btn btn-outline">
                  {site.phone}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              {site.serviceAreas.map((city) => (
                <Link
                  key={city}
                  href={`/service-areas/${city.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                  className="flex items-center gap-2.5 py-2.5 border-b text-[var(--foreground)] hover:text-[var(--accent)] transition-colors text-sm min-h-[44px]"
                  style={{ borderColor: "var(--border)" }}
                >
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: "var(--accent)" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ
          ============================================================ */}
      <section className="py-20 md:py-28" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Common Questions</p>
            <h2 className="font-display text-3xl md:text-[2.75rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {homeFaqs.map((faq, i) => (
              <details key={faq.question} className="card p-5 group" open={i === 0}>
                <summary className="flex items-center justify-between gap-4 font-semibold text-[var(--foreground)]">
                  {faq.question}
                  <svg
                    className="w-5 h-5 shrink-0 group-open:rotate-180 transition-transform"
                    style={{ color: "var(--accent)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/faq" className="btn btn-outline">
              View all FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          CLOSING CTA
          ============================================================ */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "var(--deep)" }}>
        <div className="absolute inset-0">
          <Image
            src="/images/project-london.jpg"
            alt="London, Ontario home with permanent LED roofline lighting on at dusk"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 night-veil" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="eyebrow-gold mb-4">Ready to see it?</p>
              <h2 className="font-display text-4xl md:text-[3.25rem] font-extrabold text-white leading-[1.06] mb-6 text-balance">
                This is the last year you hang Christmas lights.
              </h2>
              <p className="text-[#c7d2e1] leading-relaxed mb-8 text-lg">
                Book the free on-site demo. We&apos;ll come out, colour-match your soffit, mount a live
                sample on your house and turn it on — so you know exactly what you&apos;re buying before
                you buy it.
              </p>
              <ul className="space-y-3 text-sm text-[#c7d2e1]">
                {[
                  "Free on-site demo — no cost, no deposit, no obligation",
                  "Itemized quote before we leave your driveway",
                  "Response within 24 hours, evenings included",
                  "Lifetime warranty on parts, hardware and workmanship",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "var(--accent)" }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-light p-7 sm:p-8">
              <h3 className="font-display text-xl font-bold text-slate-900 mb-1.5">
                Book your free on-site demo
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Prefer to talk?{" "}
                <a href={site.phoneHref} className="font-semibold text-[var(--accent-ink)] hover:underline">
                  Call {site.phone}
                </a>
              </p>
              <QuoteFormCompact formId="closing" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
