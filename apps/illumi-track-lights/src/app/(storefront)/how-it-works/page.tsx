import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/photos";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How Soffit Track Lighting Works and Installs",
  description:
    "How an Illumi soffit track system goes up: measure the roofline, screw colour-matched aluminum track under the soffit, press in 12V RGBW pucks, connect power injection, plug into a GFCI outlet and pair the WLED app.",
  alternates: { canonical: `${SITE_URL}/how-it-works` },
  openGraph: { title: "How It Works | Illumi Track Lights", description: "Track, pucks, power and app, step by step.", url: `${SITE_URL}/how-it-works`, images: ["/images/photos/detail-track-install.webp"] }
};

const STEPS: { n: string; title: string; body: string; photo: PhotoKey; tip: string }[] = [
  { n: "01", title: "Measure every edge you want lit", body: "Walk the house and add up rooflines, gables and soffit runs, including the gaps you will bridge with connectors. Kits come in 50, 75, 100, 150, 200 and 250 ft. In Southwestern Ontario we will measure on site for free.", photo: "home-day-hidden", tip: "Gables need the diagonal length, not the width across the bottom." },
  { n: "02", title: "Choose the track colour", body: "The channel is what people see by day, so match it to the soffit rather than the brick or the fascia. Black, white, wicker and brown cover nearly every vinyl and aluminum soffit sold in Canada. Screws are colour-matched too.", photo: "detail-tracks", tip: "Wicker is the safe pick for tan, sand and clay soffits." },
  { n: "03", title: "Screw the track under the soffit", body: "Each 42-inch piece screws flush to the soffit at the fascia edge through pre-drilled holes. Vinyl, aluminum and wood soffits each want a slightly different screw pattern, which the mounting guide covers. Cut the last piece with a hacksaw.", photo: "detail-track-install", tip: "Keep the pucks pointing down the wall so the light washes the siding." },
  { n: "04", title: "Press in the pucks, connect the run", body: "Five-puck strands press into the track and join with sealed twist connectors. Extension connectors skip garage doors and dormers so the spacing stays even. T-connectors let one output branch left and right.", photo: "detail-pucks", tip: "Kits from 100 ft include power-injection parts. Inject roughly every 120 pucks." },
  { n: "05", title: "Plug into a GFCI outlet", body: "The 12V supply plugs into an existing outdoor or garage GFCI receptacle. The whole system is CSA Class 2 low voltage, so a plug-in install needs no electrician or permit in most municipalities.", photo: "soffit-lights-day", tip: "A hidden outlet in the soffit is an electrician's job, and worth it on the front elevation." },
  { n: "06", title: "Pair the app and set a scene", body: "The controller joins your 2.4 GHz WiFi and the free WLED app takes over: colours, a true warm white, saved holiday scenes, sunset schedules, zones and voice control. Scenes live on the controller, so they run even when the internet is down.", photo: "home-blue-app-control", tip: "Set warm white on a sunset schedule first. The holiday colours are the bonus." }
];

export default function HowItWorksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to install soffit track lighting",
    description: metadata.description,
    totalTime: "PT8H",
    supply: ["Soffit track lighting kit", "Ladder", "Drill with Robertson bit", "Tape or laser measure", "Hacksaw"],
    step: STEPS.map((s) => ({ "@type": "HowToStep", name: s.title, text: s.body, url: `${SITE_URL}/how-it-works#step-${s.n}` }))
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero photo="detail-track-install" eyebrow="How it works" title="Track goes up once. Everything else is the app." intro="Six steps from a tape measure to a roofline you control from your phone. The same steps our crew follows, written for a weekend DIYer." crumbs={[{ label: "How it works" }]} />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section space-y-16">
          {STEPS.map((s, i) => (
            <div key={s.n} id={`step-${s.n}`} className={`grid gap-8 md:grid-cols-2 md:items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <Photo name={s.photo} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="(max-width: 768px) 100vw, 560px" />
              <div>
                <p className="font-display text-5xl text-[var(--color-border-strong)]">{s.n}</p>
                <h2 className="font-display h3-fluid mt-2">{s.title}</h2>
                <p className="mt-4 leading-relaxed text-[var(--color-text-soft)]">{s.body}</p>
                <p className="mt-5 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-gold-soft)] px-4 py-3 text-sm"><span className="font-semibold">Tip: </span>{s.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[var(--color-surface)]">
        <div className="shell section grid gap-6 md:grid-cols-3">
          {[
            ["Mounting on vinyl, aluminum and wood", "Screw patterns and pitfalls for each soffit type.", "/resources/mounting-track-on-vinyl-aluminum-and-wood-soffits"],
            ["Wiring layouts", "Single run, T-branch and multi-zone, with where to inject power.", "/resources/wiring-layouts-single-run-t-branch-and-multi-zone"],
            ["Full install walkthrough", "The complete step-by-step with tools and timing.", "/resources/how-to-install-permanent-soffit-lights"]
          ].map(([t, b, h]) => (
            <Link key={h} href={h} className="card card-lift p-6">
              <h3 className="font-display text-xl">{t}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-soft)]">{b}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--color-gold-text)]">Read the guide →</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-[var(--color-ink)] text-white">
        <div className="shell section-lg text-center">
          <p className="eyebrow text-[var(--color-gold)]">Two ways forward</p>
          <h2 className="font-display h2-fluid mx-auto mt-5 max-w-2xl">Order the kit, or let us put it up.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/diy-kits" className="btn-primary">Shop kits</Link>
            <Link href="/installation" className="btn-ghost-light">Professional installation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
