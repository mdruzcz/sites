import Link from "next/link";
import Image from "next/image";
import { Photo } from "@/components/photo";
import { kits, kitLightCount, kitTrackFeet, kitBom, getKitByFeet } from "@/lib/kits";
import { ARTICLES, heroPhotoFor } from "@/lib/resources";
import { INSTALL_CITIES } from "@/lib/installation";
import { formatCad } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)] text-white">
      <Photo name="hero-home-twilight" ratio="absolute inset-0" sizes="100vw" priority scrim="hero" className="!absolute" />
      <div className="shell relative grid min-h-[78vh] items-end gap-10 py-16 md:grid-cols-[1.25fr_1fr] md:items-center md:py-24">
        <div className="reveal">
          <p className="eyebrow eyebrow-dot text-[var(--color-gold)]">Soffit track lighting · London, Ontario</p>
          <h1 className="font-display display mt-5 max-w-2xl text-white">
            Invisible by day. <span className="aurora-text">Any colour by night.</span>
          </h1>
          <p className="lead mt-6 max-w-xl text-white/85">
            Colour-matched aluminum track tucks under your soffit and holds 12V RGBW pucks you control from your
            phone. Buy the complete kit and install it in a weekend, or let our Southwestern Ontario crew do it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/diy-kits" className="btn-primary">Shop soffit track kits</Link>
            <Link href="/installation" className="btn-ghost-light">Get it installed</Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-wider text-white/65">
            <li>Kits from $1,265</li>
            <li>5-year warranty</li>
            <li>IP68 · −40 °C tested</li>
            <li>All 12V · CSA Class 2</li>
          </ul>
        </div>
        <div className="glass reveal reveal-2 hidden p-6 md:block">
          <p className="eyebrow text-[var(--color-gold)]">Kit or installed</p>
          <ul className="mt-4 divide-y divide-white/10 text-sm">
            <li className="grid grid-cols-[1fr_auto_auto] gap-4 py-2 text-xs uppercase tracking-wider text-white/55"><span>Length</span><span>DIY kit</span><span>Installed</span></li>
            {kits.map((k) => (
              <li key={k.slug} className="grid grid-cols-[1fr_auto_auto] gap-4 py-2.5">
                <Link href={`/product/${k.slug}`} className="text-white/85 hover:text-white">{k.feet} ft</Link>
                <span className="font-semibold">{formatCad(k.price, 0)}</span>
                <span className="text-white/70">from {formatCad(k.installedLow, 0)}</span>
              </li>
            ))}
          </ul>
          <Link href="/compare" className="mt-4 inline-flex text-sm font-semibold text-[var(--color-accent-bright)] hover:underline">See what the difference buys →</Link>
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const items = [
    ["Colour-matched track", "Black, white, wicker or brown, flush to the soffit"],
    ["12V RGBW pucks", "16M colours and a true warm white"],
    ["Ships from London, ON", "Free across Canada over $500"],
    ["Installed in SW Ontario", "Our crew, free on-site measurement"]
  ];
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-5 py-6 md:grid-cols-4">
        {items.map(([t, s]) => (
          <div key={t} className="flex items-start gap-3">
            <span aria-hidden className="mt-1 size-2 shrink-0 rounded-full bg-[var(--color-gold)]" />
            <div>
              <p className="text-sm font-semibold">{t}</p>
              <p className="text-xs text-[var(--color-muted)]">{s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DayNight() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Day and night</p>
          <h2 className="font-display h2-fluid mt-5">The track is the whole point.</h2>
          <p className="lead mt-4 text-[var(--color-text-soft)]">Strip lights stick to the fascia and show all day. A soffit track is a rigid aluminum channel, painted to match your trim, that hides the wire and points every puck down the face of the house. Neighbours see a clean roofline until you tap the app.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <figure className="card overflow-hidden">
            <Photo name="home-day-hidden" ratio="aspect-[16/10]" sizes="(max-width: 768px) 100vw, 600px" />
            <figcaption className="flex items-center gap-3 px-5 py-4 text-sm text-[var(--color-text-soft)]"><span className="rounded-full bg-[var(--color-gold-soft)] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-[var(--color-gold-text)]">Day</span>Track sits flush under the soffit.</figcaption>
          </figure>
          <figure className="card overflow-hidden">
            <Photo name="home-night-lit" ratio="aspect-[16/10]" sizes="(max-width: 768px) 100vw, 600px" />
            <figcaption className="flex items-center gap-3 px-5 py-4 text-sm text-[var(--color-text-soft)]"><span className="rounded-full bg-[var(--color-ink)] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white">Night</span>The same roofline in any colour.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function KitBand() {
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Soffit track kits</p>
            <h2 className="font-display h2-fluid mt-5">Sized by the foot, boxed complete.</h2>
            <p className="lead mt-4 text-[var(--color-text-soft)]">Six kits from 50 to 250 feet with track, pucks, WiFi controller, power supplies, connectors and screws counted for that length. Pick the track colour that matches your soffit.</p>
          </div>
          <Link href="/diy-kits" className="btn-secondary">Compare all kits</Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {kits.map((k, i) => (
            <Link key={k.slug} href={`/product/${k.slug}`} className="card card-lift group overflow-hidden">
              <Photo name={k.photo} ratio="aspect-[4/3]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className="transition duration-500 group-hover:scale-[1.03]" priority={i < 3} />
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl">{k.feet} ft kit</h3>
                  <p className="font-semibold">{formatCad(k.price, 2)}</p>
                </div>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{kitLightCount(k)} pucks · {kitTrackFeet(k)} ft of track</p>
                <p className="mt-2 text-sm text-[var(--color-text-soft)]">{k.suits}</p>
                <p className="mt-3 text-sm font-semibold text-[var(--color-gold-text)]">View kit →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhatsInTheBox() {
  const kit = getKitByFeet(100)!;
  return (
    <section id="whats-included" className="bg-[var(--color-bg)]">
      <div className="shell section grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="grid grid-cols-2 gap-4">
          <Photo name="detail-track-install" ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
          <Photo name="detail-tracks" ratio="aspect-[4/5]" rounded="rounded-2xl" className="mt-8" sizes="300px" />
          <Photo name="detail-pucks" ratio="aspect-[4/5]" rounded="rounded-2xl" className="-mt-8" sizes="300px" />
          <Photo name="soffit-lights-day" ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
        </div>
        <div>
          <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">In the box</p>
          <h2 className="font-display h2-fluid mt-5">The 100 ft kit, part by part.</h2>
          <p className="mt-4 text-[var(--color-text-soft)]">Every kit is the same hardware in different quantities. Bigger kits add strands, track, a second or third power supply and the injection parts that keep long runs bright.</p>
          <ul className="mt-6 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-white">
            {kitBom(kit).map(({ component, qty }) => (
              <li key={component.key} className="flex items-center gap-4 px-4 py-2.5">
                <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg border border-[var(--color-border)] bg-white">
                  <Image src={component.image} alt={component.name} width={44} height={44} className="size-11 object-contain" />
                </span>
                <span className="flex-1 text-sm font-medium">{component.name}</span>
                <span className="font-mono text-sm text-[var(--color-gold-text)]">×{qty}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function TwoWays() {
  return (
    <section className="bg-[var(--color-ink)] text-white">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-rule text-[var(--color-gold)]">Two ways to get it</p>
          <h2 className="font-display h2-fluid mt-5">Install it yourself, or book our crew.</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="glass p-7">
            <Photo name="install-track-mounting" ratio="aspect-[16/9]" rounded="rounded-xl" sizes="(max-width: 768px) 100vw, 540px" />
            <h3 className="font-display mt-6 text-2xl">DIY kit, shipped anywhere in Canada</h3>
            <p className="mt-3 text-white/75">A drill, a ladder and a Saturday. The track screws to the soffit, the pucks snap in, the controller plugs into a GFCI outlet. From {formatCad(kits[0].price, 0)}, free shipping over $500.</p>
            <Link href="/diy-kits" className="btn-gold mt-6">Pick a kit</Link>
          </div>
          <div className="glass p-7">
            <Photo name="install-eder" ratio="aspect-[16/9]" rounded="rounded-xl" sizes="(max-width: 768px) 100vw, 540px" />
            <h3 className="font-display mt-6 text-2xl">Installed by Illumi in Southwestern Ontario</h3>
            <p className="mt-3 text-white/75">Free on-site measurement, colour-matched track, sealed wiring and an app walkthrough before we leave. {INSTALL_CITIES.map((c) => c.city).slice(0, 5).join(", ")} and nearby. From {formatCad(kits[0].installedLow, 0)}.</p>
            <Link href="/installation" className="btn-ghost-light mt-6">Book a measurement</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Occasions() {
  const items: { photo: Parameters<typeof Photo>[0]["name"]; label: string; sub: string }[] = [
    { photo: "scene-warm-white", label: "Warm white", sub: "Every ordinary evening" },
    { photo: "scene-red", label: "Red & white", sub: "Canada Day, Christmas" },
    { photo: "scene-green", label: "Green", sub: "St. Patrick's, game day" },
    { photo: "scene-pink", label: "Magenta", sub: "Valentine's, awareness" },
    { photo: "scene-rainbow", label: "Rainbow", sub: "Pride, birthdays" },
    { photo: "scene-security", label: "Security white", sub: "Sunset to sunrise" }
  ];
  return (
    <section className="bg-[var(--color-bg-warm)]">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Year-round</p>
          <h2 className="font-display h2-fluid mt-5">Twelve months of reasons to leave it up.</h2>
          <p className="lead mt-4 text-[var(--color-text-soft)]">Saved scenes for every holiday, a warm white for the other 300 nights, and a bright white security mode on a sunset schedule.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {items.map((o) => (
            <div key={o.photo} className="group relative overflow-hidden rounded-2xl">
              <Photo name={o.photo} ratio="aspect-[4/3]" sizes="(max-width: 768px) 50vw, 400px" scrim="soft" className="transition duration-500 group-hover:scale-[1.04]" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="font-display text-lg">{o.label}</p>
                <p className="text-xs text-white/75">{o.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <Link href="/gallery" className="btn-secondary mt-8">Browse the gallery</Link>
      </div>
    </section>
  );
}

export function Specs() {
  const specs = [
    ["12V", "everything", "One voltage, every part compatible"],
    ["46 lm", "per puck", "Bright from the street, soft up close"],
    ["50,000 h", "rated", "Decades of evenings"],
    ["−40 °C", "tested", "Ontario winters, no problem"],
    ["IP68", "sealed", "Pucks and connectors"],
    ["5 yr", "warranty", "Kits and parts"]
  ];
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="shell section">
        <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Built for Canada</p>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {specs.map(([v, u, l]) => (
            <div key={l}>
              <p className="font-display text-3xl text-[var(--color-ink)] md:text-4xl">{v}</p>
              <p className="eyebrow mt-1 text-[var(--color-gold-text)]">{u}</p>
              <p className="mt-2 text-sm text-[var(--color-text-soft)]">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  const reviews = [
    ["Measured on a Tuesday, installed the following week. The track matches our soffit so well my wife asked when they were coming back to do it.", "Marc", "Woodstock, ON", "Installed, 150 ft"],
    ["Ordered the 100 ft kit, watched the guide, done in a day with my son. The app is the fun part.", "Priya", "Kitchener, ON", "DIY kit, 100 ft"],
    ["Third winter, not a single puck out. We run warm white most nights and the kids pick the colours on holidays.", "Dan", "Guelph, ON", "DIY kit, 200 ft"]
  ];
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="shell section">
        <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">From Ontario homes</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {reviews.map(([q, n, c, k]) => (
            <figure key={n} className="card p-6">
              <p aria-label="5 of 5 stars" className="text-[var(--color-gold)]">★★★★★</p>
              <blockquote className="mt-3 text-[0.98rem] leading-relaxed text-[var(--color-text-soft)]">“{q}”</blockquote>
              <figcaption className="mt-4 text-xs text-[var(--color-muted)]">{n} · {c} · {k}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GuidesPreview() {
  const picks = ARTICLES.slice(0, 3);
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Guides</p>
            <h2 className="font-display h2-fluid mt-5">Read before you measure.</h2>
          </div>
          <Link href="/resources" className="btn-secondary">All guides</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {picks.map((a) => (
            <Link key={a.slug} href={`/resources/${a.slug}`} className="card card-lift group overflow-hidden">
              <Photo name={heroPhotoFor(a.slug)} ratio="aspect-[16/9]" sizes="(max-width: 768px) 100vw, 400px" className="transition duration-500 group-hover:scale-[1.04]" />
              <div className="p-5">
                <p className="text-xs text-[var(--color-muted)]">{a.category} · {a.readMinutes} min read</p>
                <h3 className="font-display mt-2 text-lg leading-snug transition group-hover:text-[var(--color-gold-text)]">{a.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--color-text-soft)]">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export const HOME_FAQ: { q: string; a: string }[] = [
  { q: "What is soffit track lighting?", a: "An extruded aluminum channel screws up under the soffit and holds individually addressable 12V RGBW pucks. By day it reads as a trim line in your soffit colour. At night the whole roofline is any colour you choose from the app." },
  { q: "Is it hard to install myself?", a: "A comfortable DIYer with a drill and a ladder does a bungalow front in an afternoon. Track screws up with the colour-matched screws, pucks press in, connectors twist together, and the power supply plugs into a GFCI outlet." },
  { q: "Do you install it?", a: "Yes, in Southwestern Ontario: London, Woodstock, Kitchener, Waterloo, Cambridge, Guelph, Stratford, Ingersoll and nearby. We measure on site for free. Elsewhere in Canada we connect you with partner installers who use the same hardware." },
  { q: "Are all your parts 12V?", a: "Yes. Every puck, controller, power supply and connector is 12V, so anything in the store works with anything else and nothing can be plugged into the wrong supply." },
  { q: "How much does it cost?", a: "Kits run from $1,265 for 50 ft to $3,157 for 250 ft. Installed by our crew, the same lengths run from about $1,665 to $4,988 depending on the house. Both are a fraction of national installers at $25 to $40 per foot." },
  { q: "What about winter?", a: "Pucks and connectors are IP68 sealed and the hardware is tested to −40 °C. Aluminum track sheds snow and ice. Nothing comes down in January." }
];

export function FaqPreview() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="shell section grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Questions</p>
          <h2 className="font-display h2-fluid mt-5">What people ask before ordering.</h2>
          <Link href="/faq" className="btn-secondary mt-6">All questions</Link>
        </div>
        <div className="space-y-3">
          {HOME_FAQ.map((f) => (
            <details key={f.q} className="group card">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
                {f.q}
                <span aria-hidden className="text-[var(--color-muted)] transition group-open:rotate-180">▾</span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-[var(--color-text-soft)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)] text-white">
      <Photo name="home-elevation-blue" ratio="absolute inset-0" sizes="100vw" scrim="strong" className="!absolute opacity-80" />
      <div className="shell section-lg relative text-center">
        <p className="eyebrow text-[var(--color-gold)]">This is the last year you hang lights</p>
        <h2 className="font-display display mx-auto mt-5 max-w-3xl">Put the track up once. Change the colour forever.</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/diy-kits" className="btn-primary">Shop kits</Link>
          <Link href="/installation" className="btn-ghost-light">Book an install</Link>
        </div>
      </div>
    </section>
  );
}
