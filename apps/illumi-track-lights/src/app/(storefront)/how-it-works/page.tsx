import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { kits } from "@/lib/kits";
import { photo, type PhotoKey } from "@/lib/photos";
import { BRAND, SITE_URL } from "@/lib/utils";

const PAGE_URL = `${SITE_URL}/how-it-works`;
const TITLE = "How Track Lighting Works and Installs";
const DESCRIPTION =
  "How track lighting goes up: measure the roofline, screw aluminum track under the soffit, press in 12V RGBW lights, plug into a GFCI outlet, then set the app.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", title: `${TITLE} | ${BRAND.name}`, description: DESCRIPTION, url: PAGE_URL, images: [photo("detail-track-install").src] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION }
};

const SIZES = kits.map((k) => k.feet);
const SIZE_LIST = `${SIZES.slice(0, -1).join(", ")} and ${SIZES[SIZES.length - 1]}`;

const STEPS: { n: string; title: string; body: string; photo: PhotoKey; tip: string }[] = [
  {
    n: "01",
    title: "Measure every edge you want lit",
    body: `Walk around the house with a tape and write down each roofline, gable and soffit run. Count the gaps you plan to bridge with connectors as well. Add it up and go to the next kit size above your total. Kits come in ${SIZE_LIST} feet. If you are in Southwestern Ontario, we will come and measure for free.`,
    photo: "home-day-hidden",
    tip: "On a gable, measure up the slope on both sides. The width across the bottom comes up short."
  },
  {
    n: "02",
    title: "Pick the track colour",
    body: "By day the track is the only part anyone sees, so match it to the soffit, not to the brick or the fascia. It comes in black, white, wicker and brown, which between them suit most vinyl and aluminum soffits. The screws come in the same four colours.",
    photo: "detail-tracks",
    tip: "For a tan, sand or clay soffit, wicker is the safe choice."
  },
  {
    n: "03",
    title: "Screw the track under the soffit",
    body: "The track comes in 42-inch pieces. Each one screws flat to the underside of the soffit, along the fascia edge. Vinyl, aluminum and wood soffits each take a slightly different screw pattern, and the mounting guide covers all three. When you reach the end of a run, cut the last piece to length with a hacksaw.",
    photo: "detail-track-install",
    tip: "Keep the lights aimed down the wall. That is what washes the siding with light."
  },
  {
    n: "04",
    title: "Press in the lights and join the run",
    body: "The lights come in strands of five. They press into the holes in the track, and one strand joins the next with a sealed twist connector. Where you want a stretch left dark, such as over a garage door or around a dormer, an extension connector carries the run across so the spacing stays even. A T-connector lets one output branch left and right.",
    photo: "detail-pucks",
    tip: "Kits of 100 feet and up include the parts for power injection. Feed power in roughly every 120 lights."
  },
  {
    n: "05",
    title: "Plug into a GFCI outlet",
    body: "The 12V power supply plugs into an outdoor or garage GFCI outlet you already have. The whole system is 12V Class 2 low voltage, so a plug-in install does not need an electrician.",
    photo: "soffit-lights-day",
    tip: "A new outlet hidden in the soffit is an electrician's job. On the front of the house it is worth having done."
  },
  {
    n: "06",
    title: "Join the WiFi and set a scene",
    body: "The controller joins your 2.4 GHz WiFi, and from there the free WLED app runs everything: colours, a true warm white, saved holiday scenes, sunset schedules, zones and voice control. Scenes are stored on the controller, so they keep running when the internet is down.",
    photo: "home-blue-app-control",
    tip: "Set warm white on a sunset schedule first. You will use it far more nights than the holiday colours."
  }
];

const TOOLS = ["A ladder", "A drill with a Robertson bit", "A tape or laser measure", "A hacksaw"];

const GUIDES: [string, string, string][] = [
  ["Mounting on vinyl, aluminum and wood", "The screw pattern for each soffit type, and what goes wrong on each.", "/resources/mounting-track-on-vinyl-aluminum-and-wood-soffits"],
  ["Wiring layouts", "A single run, a T-branch and several zones, with where to feed in power.", "/resources/wiring-layouts-single-run-t-branch-and-multi-zone"],
  ["The full install walkthrough", "Every step in order, with the tools and how long each part takes.", "/resources/how-to-install-permanent-soffit-lights"]
];

export default function HowItWorksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to install permanent track lighting under a soffit",
    description: DESCRIPTION,
    totalTime: "PT8H",
    image: `${SITE_URL}${photo("detail-track-install").src}`,
    supply: [{ "@type": "HowToSupply", name: "Track lighting kit" }],
    tool: ["Ladder", "Drill with Robertson bit", "Tape or laser measure", "Hacksaw"].map((name) => ({ "@type": "HowToTool", name })),
    step: STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
      url: `${PAGE_URL}#step-${s.n}`,
      image: `${SITE_URL}${photo(s.photo).src}`
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        compact
        photo="detail-track-install"
        eyebrow="How it works"
        title="The track goes up once. After that it is all the app."
        intro="Six steps, from the tape measure to a roofline you set from your phone. Our crew follows the same steps."
        crumbs={[{ label: "How it works" }]}
      />

      <section>
        <div className="shell section grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div className="space-y-4 text-[1.0625rem] text-[var(--color-text-soft)]">
            <p>
              <strong className="text-[var(--color-text)]">Short answer:</strong> an aluminum channel screws under the soffit, the lights press into it, a power supply plugs into an outdoor outlet and a WiFi controller takes orders from your phone.
            </p>
            <p>
              <strong className="text-[var(--color-text)]">Long answer:</strong> a kit has four kinds of parts. The track holds the lights in a straight line and hides the wire. The lights are 12V RGBW, which means each one has red, green, blue and a separate warm white. The power supply turns household current into 12V. The controller sits between the two and decides what each light does. The steps below put them together in the order you would on the day.
            </p>
            <p>
              <Link href="/diy-kits" className="text-link">See what comes in each kit</Link>
              <span className="mx-2 text-[var(--color-border-strong)]">|</span>
              <Link href="/brands" className="text-link">How track compares with other brands</Link>
            </p>
          </div>
          <div className="border border-[var(--color-border)] p-5 md:p-6">
            <h2 className="eyebrow text-[var(--color-gold-text)]">What you need besides the kit</h2>
            <ul className="mt-3 text-[0.95rem]">
              {TOOLS.map((t) => (
                <li key={t} className="border-t border-[var(--color-border)] py-2.5 text-[var(--color-text)] first:border-t-0 first:pt-0">{t}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-[var(--color-text-soft)]">And an outdoor or garage GFCI outlet within reach of the first run.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)]">
        <div className="shell section">
          <h2 className="font-display h2-fluid track-title">The install, step by step</h2>
          <ol className="mt-10 space-y-12 md:space-y-14">
            {STEPS.map((s, i) => (
              <li key={s.n} id={`step-${s.n}`} className="grid scroll-mt-28 gap-6 md:grid-cols-2 md:items-center md:gap-10">
                <Photo name={s.photo} ratio="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 560px" className={i % 2 ? "md:order-2" : ""} />
                <div>
                  <p className="eyebrow text-[var(--color-gold-text)]">Step {i + 1} of {STEPS.length}</p>
                  <h3 className="font-display h3-fluid mt-2">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--color-text-soft)]">{s.body}</p>
                  <p className="note note-amber mt-4"><strong>Tip:</strong> {s.tip}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow text-[var(--color-gold-text)]">Go deeper</p>
            <h2 className="font-display h2-fluid mt-2">Three guides for the day you do it</h2>
            <ul className="mt-5 border-t border-[var(--color-border-strong)]">
              {GUIDES.map(([t, b, h]) => (
                <li key={h} className="border-b border-[var(--color-border-strong)]">
                  <Link href={h} className="group block py-4">
                    <span className="font-display block text-[1.15rem] leading-snug group-hover:underline">{t}</span>
                    <span className="mt-1 block text-[0.95rem] text-[var(--color-text-soft)]">{b}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5">
              <Link href="/resources" className="text-link inline-flex min-h-[44px] items-center">All guides</Link>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="shell section">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display h2-fluid">Do it yourself, or have us do it.</h2>
            <p className="mt-4 text-[var(--color-text-soft)]">
              Kits ship free to any address in Canada, and you can pick up free in {BRAND.city}. If you would rather stay off the ladder, our crew installs the same hardware across Southwestern Ontario.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/diy-kits" className="btn-primary">Shop the kits</Link>
              <Link href="/installation" className="btn-secondary">Installation by our crew</Link>
            </div>
            <p className="mt-4 text-sm">
              <Link href="/shipping-returns#pickup" className="text-link inline-flex min-h-[44px] items-center">How pickup works</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
