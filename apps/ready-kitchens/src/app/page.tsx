import Link from "next/link";
import { getAllKits } from "@/lib/kits";
import { KitCard } from "@/components/kit-card";
import { SITE } from "@/lib/utils";
import { formatCad } from "@/lib/utils";

export const revalidate = 3600;

export default function HomePage() {
  const kits = getAllKits();
  const startingPrice = Math.min(...kits.map((k) => k.price_cad));

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    image: `${SITE.url}/og.jpg`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "50432 Yorke Line",
      addressLocality: "Belmont",
      addressRegion: "ON",
      postalCode: SITE.postalCode,
      addressCountry: "CA",
    },
    priceRange: "$$$",
    description: SITE.shortDescription,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />

      {/* HERO */}
      <section className="kit-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:px-8">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-[12px] font-semibold uppercase tracking-widest text-[var(--color-accent-dark)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              In stock now · Belmont, ON
            </span>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Complete White Shaker kitchens.
              <br />
              <span className="text-[var(--color-accent)]">Assembled. Ready. Pickup today.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-[var(--color-ink-soft)]">
              Six pre-configured kitchen cabinet packages — galley, L-shape, U-shape and island layouts.
              Solid plywood boxes, soft-close doors, fully assembled at our Belmont warehouse.
              Starting at <strong className="text-[var(--color-ink)]">{formatCad(startingPrice)}</strong>.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/kits" className="btn-primary">
                Shop Kitchen Kits →
              </Link>
              <Link href="/how-it-works" className="btn-ghost">
                How it works
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Bullet>Plywood boxes — no MDF</Bullet>
              <Bullet>Soft-close everywhere</Bullet>
              <Bullet>No payment until confirmed</Bullet>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-lg border border-[var(--color-line)] bg-white shadow-xl">
              <HeroWarehouseSvg />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-md">
                <span className="h-2 w-2 rounded-full bg-[var(--color-sage)]" />
                Assembled at 50432 Yorke Line
              </div>
            </div>
            <div className="absolute -bottom-5 -right-3 rotate-2 rounded-md bg-[var(--color-ink)] px-4 py-3 text-white shadow-xl sm:-right-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-accent)]">From</p>
              <p className="font-display text-3xl leading-none">{formatCad(startingPrice)}</p>
              <p className="text-[11px] text-white/70">10-piece kitchenette</p>
            </div>
          </div>
        </div>
      </section>

      {/* KITS */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="accent-rule mb-3" />
            <h2 className="font-display text-3xl sm:text-4xl">Six kitchens. Pick yours.</h2>
            <p className="mt-2 max-w-2xl text-[var(--color-ink-soft)]">
              Every package contains real, assembled cabinets — not flat-packed. Choose by shape and size, add to cart, and we&rsquo;ll confirm pickup before any payment.
            </p>
          </div>
          <Link href="/kits" className="text-sm font-medium underline-offset-4 hover:underline">
            See all kits →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kits.map((kit) => (
            <KitCard key={kit.slug} kit={kit} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[var(--color-paper-warm)]">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">How it works</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">From cart to kitchen in 3 steps.</h2>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            <Step n={1} title="Pick your kit">Choose the layout that fits your space. Every kit is fully spec&rsquo;d with cabinet sizes, SKUs, and the runs it&rsquo;s designed for.</Step>
            <Step n={2} title="Submit your order">Add to cart, then send us your details. No payment yet — we confirm stock and walk you through pickup or freight.</Step>
            <Step n={3} title="Pick up & install">Come to our Belmont warehouse, load your cabinets (fully assembled), and bring your kitchen to life.</Step>
          </ol>
          <div className="mt-10 text-center">
            <Link href="/how-it-works" className="btn-secondary">See the full process →</Link>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="accent-rule mb-3" />
            <h2 className="font-display text-3xl sm:text-4xl">Premium build. Honest pricing.</h2>
            <p className="mt-4 text-lg text-[var(--color-ink-soft)]">
              We&rsquo;re a contractor-owned cabinet shop in Belmont, Ontario. We assemble every kit ourselves
              from real plywood-box cabinets — the same boxes we install in custom kitchens. By stocking
              the most-requested layouts, we cut weeks of lead time and skip the showroom upcharge.
            </p>
            <ul className="mt-6 space-y-3">
              <Feature>5⁄8&quot; & 1⁄2&quot; plywood cabinet boxes — no particleboard, no MDF</Feature>
              <Feature>36&quot; tall wall cabinets — full pantry-height storage</Feature>
              <Feature>Soft-close hinges and undermount drawer glides on every box</Feature>
              <Feature>Fully assembled — open the doors, slide in the drawers, install</Feature>
              <Feature>Contractor pricing available — ask about volume</Feature>
            </ul>
          </div>
          <div className="rounded-lg border border-[var(--color-line)] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">What you save</p>
            <h3 className="mt-2 font-display text-2xl">Compared to a typical custom-kitchen quote</h3>
            <div className="mt-5 space-y-3 text-sm">
              <Row label="Same plywood boxes & soft-close hardware" badge="Included" />
              <Row label="Cabinet assembly labour" badge="Included" />
              <Row label="6–10 week custom lead time" badge="Skipped" />
              <Row label="$15,000–$25,000 design retainer" badge="Skipped" />
              <Row label="Quartz tops, hardware, install" badge="DIY or ask us" />
            </div>
            <div className="mt-6 rounded-md bg-[var(--color-paper-warm)] p-4">
              <p className="text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">Most popular</p>
              <p className="font-display text-xl">Modern Symmetrical · 16 pieces</p>
              <p className="mt-1 font-display text-3xl">{formatCad(3900)}</p>
              <Link href="/kits/modern-symmetrical" className="btn-primary mt-4 w-full">View kit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-ink)] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-14 text-center lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl">Stop waiting on a kitchen.</h2>
          <p className="max-w-2xl text-white/80">
            Visit us at 50432 Yorke Line in Belmont, or submit your order online — we&rsquo;ll confirm everything by email before you pay a dollar.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/kits" className="btn-primary">Shop kitchen kits</Link>
            <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="btn-ghost !bg-transparent !text-white !border-white/40 hover:!bg-white hover:!text-[var(--color-ink)]">
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-sage)] text-white">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span>{children}</span>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="rounded-lg border border-[var(--color-line)] bg-white p-6 shadow-sm">
      <div className="font-display text-5xl leading-none text-[var(--color-accent)]">{n}</div>
      <h3 className="mt-3 font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{children}</p>
    </li>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent-dark)]">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}

function Row({ label, badge }: { label: string; badge: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[var(--color-line)] pb-3 last:border-0 last:pb-0">
      <span className="text-[var(--color-ink-soft)]">{label}</span>
      <span className="shrink-0 rounded-full bg-[var(--color-sage-soft)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-sage)]">{badge}</span>
    </div>
  );
}

function HeroWarehouseSvg() {
  return (
    <svg viewBox="0 0 500 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dad1be" />
          <stop offset="100%" stopColor="#b4a98f" />
        </linearGradient>
        <linearGradient id="wallg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#efece4" />
          <stop offset="100%" stopColor="#dad4c4" />
        </linearGradient>
      </defs>
      <rect width="500" height="400" fill="url(#wallg)" />
      <rect y="290" width="500" height="110" fill="url(#floor)" />
      {/* Back wall cabinets */}
      <rect x="40" y="80" width="100" height="80" fill="#ffffff" stroke="#c7bfae" />
      <rect x="145" y="80" width="120" height="80" fill="#ffffff" stroke="#c7bfae" />
      <rect x="270" y="60" width="80" height="100" fill="#ffffff" stroke="#c7bfae" />
      <rect x="355" y="80" width="105" height="80" fill="#ffffff" stroke="#c7bfae" />
      <line x1="90" y1="80" x2="90" y2="160" stroke="#c7bfae" />
      <line x1="205" y1="80" x2="205" y2="160" stroke="#c7bfae" />
      <line x1="310" y1="60" x2="310" y2="160" stroke="#c7bfae" />
      <line x1="407" y1="80" x2="407" y2="160" stroke="#c7bfae" />
      {/* Counter */}
      <rect x="30" y="220" width="440" height="14" fill="#3a4252" />
      {/* Base cabinets */}
      <rect x="40" y="234" width="80" height="90" fill="#ffffff" stroke="#c7bfae" />
      <rect x="125" y="234" width="120" height="90" fill="#ffffff" stroke="#c7bfae" />
      <rect x="250" y="234" width="60" height="90" fill="#ffffff" stroke="#c7bfae" />
      <rect x="315" y="234" width="80" height="90" fill="#ffffff" stroke="#c7bfae" />
      <rect x="400" y="234" width="60" height="90" fill="#ffffff" stroke="#c7bfae" />
      <line x1="125" y1="262" x2="245" y2="262" stroke="#c7bfae" />
      <line x1="125" y1="290" x2="245" y2="290" stroke="#c7bfae" />
      {/* Handles */}
      <circle cx="80" cy="125" r="2" fill="#a8853e" />
      <circle cx="180" cy="125" r="2" fill="#a8853e" />
      <circle cx="290" cy="125" r="2" fill="#a8853e" />
      <circle cx="430" cy="125" r="2" fill="#a8853e" />
      <circle cx="80" cy="280" r="2" fill="#a8853e" />
      <circle cx="280" cy="280" r="2" fill="#a8853e" />
      <circle cx="355" cy="280" r="2" fill="#a8853e" />
      <circle cx="430" cy="280" r="2" fill="#a8853e" />
      {/* Range / sink hints */}
      <rect x="200" y="234" width="50" height="14" fill="#1f2532" />
      <circle cx="225" cy="262" r="8" fill="none" stroke="#888" />
      <circle cx="225" cy="290" r="8" fill="none" stroke="#888" />
      {/* Window */}
      <rect x="180" y="70" width="80" height="60" fill="#cfe1eb" stroke="#3a4252" strokeWidth="2" />
      <line x1="220" y1="70" x2="220" y2="130" stroke="#3a4252" />
      <line x1="180" y1="100" x2="260" y2="100" stroke="#3a4252" />
    </svg>
  );
}
