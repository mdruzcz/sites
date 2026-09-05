import Link from "next/link";
import Image from "next/image";
import { Photo } from "@/components/photo";
import { kits, kitLightCount, kitTrackFeet, kitBom, getKitByFeet } from "@/lib/kits";
import { articles, articlePhoto } from "@/lib/resources";
import { formatCad } from "@/lib/utils";

/* ------------------------------------------------------------------ Hero */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)] text-white">
      <Photo name="hero-multicolour-wide" ratio="absolute inset-0" sizes="100vw" priority scrim="hero" className="!absolute" />
      <div className="shell relative grid min-h-[78vh] items-end gap-10 py-16 md:grid-cols-[1.25fr_1fr] md:items-center md:py-24">
        <div className="reveal">
          <p className="eyebrow eyebrow-dot text-[var(--color-gold)]">DIY permanent lighting · Ships from London, Ontario</p>
          <h1 className="font-display display mt-5 max-w-2xl text-white">
            Permanent roofline lighting. <span className="aurora-text">Installed by you.</span>
          </h1>
          <p className="lead mt-6 max-w-xl text-white/85">
            The same 12V RGBW track-and-puck system professional installers use, boxed as a complete kit
            with app control. Pick your footage, mount it in a weekend, run any colour all year.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/diy-kits" className="btn-primary">Pick your kit</Link>
            <Link href="/how-it-works" className="btn-ghost-light">See how it works</Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-wider text-white/65">
            <li>Kits from $1,265</li>
            <li>5-year warranty</li>
            <li>IP68 · −40 °C tested</li>
            <li>CSA Class 2 · 12V</li>
          </ul>
        </div>

        <div className="glass reveal reveal-2 hidden p-6 md:block">
          <p className="eyebrow text-[var(--color-gold)]">Kit pricing</p>
          <ul className="mt-4 divide-y divide-white/10">
            {kits.map((k) => (
              <li key={k.slug} className="flex items-center justify-between py-2.5 text-sm">
                <Link href={`/product/${k.slug}`} className="text-white/85 hover:text-white">{k.feet} ft kit</Link>
                <span className="font-semibold">{formatCad(k.price, 2)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-white/60">Installed by a pro, the same lengths run {formatCad(kits[0].installedLow)} to {formatCad(kits[5].installedHigh)}.</p>
          <Link href="/compare" className="mt-4 inline-flex text-sm font-semibold text-[var(--color-accent-bright)] hover:underline">Compare DIY vs installed →</Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Trust strip */
export function TrustStrip() {
  const items = [
    ["12V RGBW pucks", "16M colours + true warm white"],
    ["Aluminum soffit track", "Hides the wire, matches your trim"],
    ["Free shipping over $500", "Canada-wide from London, ON"],
    ["5-year parts warranty", "Real people answer the email"]
  ];
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-5 py-6 md:grid-cols-4">
        {items.map(([t, s]) => (
          <div key={t} className="flex items-start gap-3">
            <span aria-hidden className="mt-1 size-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
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

/* ------------------------------------------------------------- Kit band */
export function KitBand() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Complete kits</p>
            <h2 className="font-display h2-fluid mt-5">One box for your whole roofline.</h2>
            <p className="lead mt-4 text-[var(--color-text-soft)]">
              Six sizes from 50 to 250 feet. Every kit ships with pucks, track, controller, power supply,
              every connector and colour-matched screws. Choose black, white, wicker or brown track.
            </p>
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
                <p className="mt-1 text-sm text-[var(--color-muted)]">{kitLightCount(k)} pucks · {kitTrackFeet(k)} ft of track · {k.bom.powerSupply} power {k.bom.powerSupply === 1 ? "supply" : "supplies"}</p>
                <p className="mt-2 text-sm text-[var(--color-text-soft)]">{k.suits}</p>
                <p className="mt-3 text-sm font-semibold text-[var(--color-accent-dark)]">View kit →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------- What's in the box */
export function WhatsInTheBox() {
  const kit = getKitByFeet(100)!;
  const rows = kitBom(kit);
  return (
    <section id="whats-included" className="bg-[var(--color-surface)]">
      <div className="shell section grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">What's in the box</p>
          <h2 className="font-display h2-fluid mt-5">Every part, counted for your footage.</h2>
          <p className="lead mt-4 text-[var(--color-text-soft)]">
            Shown for the 100 ft kit. Larger kits scale the strands, track, power supplies and connectors so
            you are never short a piece on install day.
          </p>
          <ul className="mt-8 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
            {rows.map(({ component, qty }) => (
              <li key={component.key} className="flex items-center gap-4 px-4 py-3">
                <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-[var(--color-border)] bg-white">
                  <Image src={component.image} alt={component.name} width={48} height={48} className="size-12 object-contain" />
                </span>
                <span className="flex-1 text-sm font-medium">{component.name}</span>
                <span className="font-mono text-sm text-[var(--color-accent-dark)]">×{qty}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Photo name="detail-tracks" ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="(max-width: 1024px) 50vw, 300px" />
          <Photo name="detail-pucks-closeup" ratio="aspect-[4/5]" rounded="rounded-2xl" className="mt-8" sizes="(max-width: 1024px) 50vw, 300px" />
          <Photo name="soffit-lights-day" ratio="aspect-[4/5]" rounded="rounded-2xl" className="-mt-8" sizes="(max-width: 1024px) 50vw, 300px" />
          <Photo name="install-track-mounting" ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="(max-width: 1024px) 50vw, 300px" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Steps */
export function Steps() {
  const steps = [
    ["Measure and pick a kit", "Add up the rooflines and soffits you want lit. Choose the kit that covers it and the track colour that matches your trim."],
    ["Mount the track", "Screw the 42-inch aluminum pieces flush to the soffit with the colour-matched screws. It disappears in daylight."],
    ["Snap in the pucks and connect", "Press each strand into the track, join sections with the sealed connectors, and run power injection on long runs."],
    ["Plug in and pair the app", "The controller plugs into a GFCI outlet, joins your WiFi and the free app does the rest: colours, scenes, schedules."]
  ];
  return (
    <section className="bg-[var(--color-ink)] text-white">
      <div className="shell section">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-gold)]">How it works</p>
            <h2 className="font-display h2-fluid mt-5">Box to roofline in a weekend.</h2>
            <p className="mt-4 text-white/75">Basic tools, a ladder and a free afternoon. No electrician for a plug-in low-voltage system.</p>
            <ol className="mt-8 space-y-5">
              {steps.map(([t, b], i) => (
                <li key={t} className="flex gap-4">
                  <span className="font-display grid size-10 shrink-0 place-items-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-semibold">{t}</h3>
                    <p className="mt-1 text-sm text-white/70">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/how-it-works" className="btn-gold mt-8">Read the full walkthrough</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Photo name="install-home-day" ratio="aspect-[4/3]" rounded="rounded-2xl" className="col-span-2" sizes="(max-width: 1024px) 100vw, 600px" />
            <Photo name="soffit-lights-installed" ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
            <Photo name="home-blue-app-control" ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Occasions */
export function Occasions() {
  const items: { photo: Parameters<typeof Photo>[0]["name"]; label: string; sub: string }[] = [
    { photo: "home-warm-white-christmas", label: "Warm white", sub: "Every ordinary evening" },
    { photo: "home-red-canada-day", label: "Red & white", sub: "Canada Day" },
    { photo: "home-green-roofline", label: "Green", sub: "St. Patrick's, game day" },
    { photo: "home-pink-magenta", label: "Magenta", sub: "Valentine's, awareness months" },
    { photo: "home-rainbow", label: "Rainbow", sub: "Pride, birthdays" },
    { photo: "home-blue-night", label: "Blue", sub: "Hanukkah, winter" }
  ];
  return (
    <section className="bg-[var(--color-bg-warm)]">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Year-round</p>
          <h2 className="font-display h2-fluid mt-5">Christmas is one week of the year. Own the other fifty-one.</h2>
          <p className="lead mt-4 text-[var(--color-text-soft)]">Sixteen million colours, a dedicated warm white channel and saved scenes for every holiday. Set a sunset schedule once and forget about it.</p>
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
        <Link href="/gallery" className="btn-secondary mt-8">See the gallery</Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Compare */
export function CompareBand() {
  const rows = [
    ["Professional install (Trimlight, Jellyfish, local)", "$25–40 / ft", "Contractor crew", "Pro-grade track & pucks", "Service contract"],
    ["Permanent Lighting Direct kit", "$12.60–25 / ft", "You, in a weekend", "Same pro-grade track & pucks", "Email support, 5-year warranty"],
    ["Consumer strip kits (Govee, Eufy)", "$2–4 / ft", "Adhesive strip", "Visible strip and wire", "Boilerplate, short life"]
  ];
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Honest comparison</p>
          <h2 className="font-display h2-fluid mt-5">Pro hardware without the pro invoice.</h2>
          <p className="lead mt-4 text-[var(--color-text-soft)]">A 100 ft kit is {formatCad(1729.2, 2)}. The same 100 ft installed by a crew typically runs {formatCad(2129.2, 2)} to {formatCad(2555.04, 2)} with us, and far more with the national brands.</p>
        </div>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="table-clean min-w-[720px]">
            <thead>
              <tr><th>Option</th><th>Price</th><th>Installation</th><th>Hardware</th><th>Support</th></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r[0]} className={i === 1 ? "bg-[var(--color-accent-soft)] font-medium" : ""}>
                  {r.map((c, j) => <td key={j} className={j === 0 ? "font-semibold" : ""}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/compare" className="btn-primary">Full comparison</Link>
          <Link href="/installers" className="btn-secondary">Rather hire someone? Find an installer</Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Specs */
export function Specs() {
  const specs = [
    ["12V", "RGBW pucks", "Low voltage, CSA Class 2"],
    ["46 lm", "per puck", "Bright from the street, soft up close"],
    ["50,000 h", "rated life", "Twenty-plus years of evenings"],
    ["−40 °C", "tested", "Built for Canadian winters"],
    ["IP68", "sealed", "Pucks and connectors"],
    ["5 yr", "warranty", "Parts, on every kit"]
  ];
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="shell section">
        <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">The numbers</p>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {specs.map(([v, u, l]) => (
            <div key={l}>
              <p className="font-display text-3xl text-[var(--color-ink)] md:text-4xl">{v}</p>
              <p className="eyebrow mt-1 text-[var(--color-accent-dark)]">{u}</p>
              <p className="mt-2 text-sm text-[var(--color-text-soft)]">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Reviews */
export function Reviews() {
  const reviews = [
    ["Best price I could find for real track lighting. Had a question on a Sunday about power injection and had an answer Monday morning.", "Skyler", "Calgary, AB", "150 ft kit"],
    ["A third of the quote I got from an installer, and honestly it looks the same from the street. Took me and my brother-in-law one Saturday.", "David", "London, ON", "100 ft kit"],
    ["The aluminum track completely hides the wires. Kids picked the colours on the app before I was off the ladder.", "James", "Toronto, ON", "200 ft kit"]
  ];
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="shell section">
        <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">From Canadian DIYers</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {reviews.map(([q, n, c, k]) => (
            <figure key={n} className="card p-6">
              <p aria-label="5 of 5 stars" className="text-[var(--color-gold)]">★★★★★</p>
              <blockquote className="mt-3 text-[0.98rem] leading-relaxed text-[var(--color-text-soft)]">“{q}”</blockquote>
              <figcaption className="mt-4 text-xs text-[var(--color-muted)]">{n} · {c} · {k} · Verified buyer</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Guides preview */
export function GuidesPreview() {
  const picks = articles.slice(0, 3);
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Guides</p>
            <h2 className="font-display h2-fluid mt-5">Plan it properly before you order.</h2>
          </div>
          <Link href="/resources" className="btn-secondary">All guides</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {picks.map((a) => (
            <Link key={a.slug} href={`/resources/${a.slug}`} className="card card-lift group overflow-hidden">
              <Photo name={articlePhoto(a)} ratio="aspect-[16/9]" sizes="(max-width: 768px) 100vw, 400px" className="transition duration-500 group-hover:scale-[1.04]" />
              <div className="p-5">
                <p className="text-xs text-[var(--color-muted)]">{a.category} · {a.readMinutes} min read</p>
                <h3 className="font-display mt-2 text-lg leading-snug transition group-hover:text-[var(--color-accent-dark)]">{a.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--color-text-soft)]">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- FAQ */
export const HOME_FAQ: { q: string; a: string }[] = [
  { q: "Do I need an electrician to install a permanent lighting kit?", a: "No for a standard plug-in install. The system is 12V low voltage (CSA Class 2) and the power supply plugs into an existing outdoor GFCI receptacle. If you want a new dedicated outlet under the soffit, that part is an electrician's job." },
  { q: "How do I know which kit size to order?", a: "Measure every roofline, soffit and fascia edge you want lit and add them up, including gaps you will bridge with connectors. Round up to the next kit size. Our measuring guide walks through it, and you can email us a sketch and we will size it for you." },
  { q: "Are all your products 12V?", a: "Yes. Every puck, controller, power supply and connector we sell is 12V. We do not carry 24V products, so everything in the store works together." },
  { q: "How long does shipping take?", a: "Orders ship from London, Ontario within one to two business days. Most of Ontario and Quebec sees delivery in two to four days, and the rest of Canada in four to eight. Orders over $500 ship free." },
  { q: "What does the warranty cover?", a: "Five years on parts against manufacturing defects on every kit and component. Damage from improper installation, surges or physical impact is not covered. See the warranty page for the full terms." },
  { q: "Can I add more lights later?", a: "Yes. Track, strands, connectors and power supplies are all sold separately, so you can extend a run or add a detached garage later. The controller handles up to several hundred pucks per output with power injection." }
];

export function FaqPreview() {
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="shell section grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Questions</p>
          <h2 className="font-display h2-fluid mt-5">Straight answers before you buy.</h2>
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

/* ------------------------------------------------------------ CTA band */
export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)] text-white">
      <Photo name="home-blue-night" ratio="absolute inset-0" sizes="100vw" scrim="strong" className="!absolute opacity-80" />
      <div className="shell section-lg relative text-center">
        <p className="eyebrow text-[var(--color-gold)]">Ready when you are</p>
        <h2 className="font-display display mx-auto mt-5 max-w-3xl">Stop renting Christmas lights. Own the show.</h2>
        <p className="mx-auto mt-5 max-w-xl text-white/80">Pick a kit in five minutes. Ships from London, Ontario within two business days.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/diy-kits" className="btn-primary">Pick your kit</Link>
          <Link href="/contact-us" className="btn-ghost-light">Ask us to size it</Link>
        </div>
      </div>
    </section>
  );
}
