import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/photos";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How DIY Permanent Lighting Works, Box to Roofline",
  description:
    "How a Permanent Lighting Direct kit goes from box to roofline: measure, mount the aluminum track, snap in the 12V RGBW pucks, connect power injection, plug into a GFCI outlet and pair the WLED app.",
  alternates: { canonical: `${SITE_URL}/how-it-works` },
  openGraph: { title: "How It Works | Permanent Lighting Direct", description: "Six steps from box to roofline, in a weekend.", url: `${SITE_URL}/how-it-works`, images: ["/images/photos/install-home-day.webp"] }
};

const STEPS: { n: string; title: string; body: string; photo: PhotoKey; tip: string }[] = [
  { n: "01", title: "Measure and pick your kit", body: "Walk the house with a tape or a laser measure and add up every roofline, gable and soffit edge you want lit. Include the gaps you will bridge with connectors. Kits come in 50, 75, 100, 150, 200 and 250 ft; round up.", photo: "home-daytime-hidden", tip: "A typical bungalow front is 50 to 75 ft. A two-storey front plus both sides is usually 150 to 200 ft." },
  { n: "02", title: "Unbox and lay it out", body: "Everything arrives in one shipment: 12V RGBW puck strands, 42-inch aluminum track in your colour, the WiFi controller, power supplies, extension connectors in 1, 5, 10 and 20 ft, T-connectors, power-injection cables, colour-matched screws and spare fuses. Lay the run out on the driveway first.", photo: "detail-tracks", tip: "Decide where the controller lives (garage or a sheltered outlet) before you mount anything." },
  { n: "03", title: "Mount the track", body: "Hold each track piece flush to the soffit, right at the fascia edge, and drive the 5/8-inch colour-matched screws through the pre-drilled holes. Cut the last piece to length with a hacksaw or mitre saw. The channel hides the wire and sinks heat from the diodes.", photo: "install-track-mounting", tip: "Keep the pucks pointing down the face of the house, not straight out, so the light washes the wall." },
  { n: "04", title: "Snap in the pucks and connect the run", body: "Press each 5-light strand into the track and join strands with the sealed twist connectors. Use the extension connectors to skip over garage doors, dormers and window bays so the spacing stays even. T-connectors let the run branch left and right from the controller.", photo: "soffit-lights-installed", tip: "Every kit at 100 ft and up includes power-injection T-connectors. Inject power every 120 lights or so to keep the far end bright." },
  { n: "05", title: "Plug in", body: "The 12V power supply plugs into an existing GFCI outdoor or garage receptacle. Because the whole system is CSA Class 2 low voltage, a plug-in install does not need an electrician or a permit in most municipalities. Fuses protect each output.", photo: "soffit-lights-day", tip: "Want a hidden outlet in the soffit? That part is an electrician's job, and worth it on a front elevation." },
  { n: "06", title: "Pair the app and pick a scene", body: "The controller joins your 2.4 GHz WiFi and the free WLED app takes over: 16 million colours, a true warm white channel, saved holiday scenes, sunset-to-midnight schedules, zones per elevation and Alexa or Google voice control. Scenes are stored on the controller, so they run even if the internet drops.", photo: "home-blue-app-control", tip: "Set a warm white sunset schedule on day one. The holiday scenes are the fun part; the everyday glow is what you will actually use." }
];

export default function HowItWorksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to install a DIY permanent lighting kit",
    description: metadata.description,
    totalTime: "PT8H",
    supply: ["Permanent lighting kit", "Ladder", "Drill with Robertson bit", "Tape measure", "Hacksaw"],
    step: STEPS.map((s) => ({ "@type": "HowToStep", name: s.title, text: s.body, url: `${SITE_URL}/how-it-works#step-${s.n}` }))
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero photo="install-home-day" eyebrow="How it works" title="From box to roofline in a weekend." intro="Our kits are designed so a comfortable DIYer can put up a professional-grade permanent lighting system with a drill, a ladder and a free Saturday. Here is the whole process." crumbs={[{ label: "How it works" }]} />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section space-y-16">
          {STEPS.map((s, i) => (
            <div key={s.n} id={`step-${s.n}`} className={`grid gap-8 md:grid-cols-2 md:items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <Photo name={s.photo} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="(max-width: 768px) 100vw, 560px" />
              <div>
                <p className="font-display text-5xl text-[var(--color-border-strong)]">{s.n}</p>
                <h2 className="font-display h3-fluid mt-2">{s.title}</h2>
                <p className="mt-4 leading-relaxed text-[var(--color-text-soft)]">{s.body}</p>
                <p className="mt-5 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-accent-soft)] px-4 py-3 text-sm text-[var(--color-text)]"><span className="font-semibold">Tip: </span>{s.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="shell section grid gap-6 md:grid-cols-3">
          {[
            ["Full soffit install guide", "Ladder safety, screw pattern, corners and cuts, step by step.", "/resources/how-to-install-permanent-led-lights-on-your-soffit"],
            ["Power injection explained", "How many pucks per supply and where to inject on long runs.", "/resources/12v-power-supplies-and-power-injection-for-permanent-lights"],
            ["WLED app setup", "Pairing, scenes, schedules and voice control in ten minutes.", "/resources/wled-controller-setup-guide-for-permanent-lights"]
          ].map(([t, b, h]) => (
            <Link key={h} href={h} className="card card-lift p-6">
              <h3 className="font-display text-xl">{t}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-soft)]">{b}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent-dark)]">Read the guide →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-ink)] text-white">
        <div className="shell section-lg text-center">
          <p className="eyebrow text-[var(--color-gold)]">Ready?</p>
          <h2 className="font-display h2-fluid mx-auto mt-5 max-w-2xl">Pick your kit, or send us a sketch and we will size it.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/diy-kits" className="btn-primary">Pick a kit</Link>
            <Link href="/contact-us" className="btn-ghost-light">Talk to us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
