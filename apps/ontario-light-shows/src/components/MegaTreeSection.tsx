import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const buildSpecs = [
  {
    label: "Pixel Density",
    value: "1,200 – 4,000",
    detail: "addressable pixels per tree, mapped to a custom 3D model",
  },
  {
    label: "Strand Count",
    value: "16 – 32",
    detail: "vertical pixel strands, hand-soldered and weather-sealed",
  },
  {
    label: "Pixel Spec",
    value: "WS2811 / WS2812",
    detail: "12V or 5V, 50,000+ hour LED lifespan",
  },
  {
    label: "Top Star",
    value: "RGB Topper",
    detail: "sequenced into the main show — pulses, twinkles, or beat-drops",
  },
];

const buildSteps = [
  {
    n: "01",
    title: "Frame & rig",
    text: "We weld an aluminum mast and crown plate, sized to your site clearance and snow load. Guy lines and ground anchors get rated for the wind class of your install.",
  },
  {
    n: "02",
    title: "Strand & pixel-map",
    text: "Each strand is cut, dressed, and pixel-mapped to a 3D model of the tree before it ever ships. By the time we arrive on-site, every LED already knows its address.",
  },
  {
    n: "03",
    title: "Sequence to music",
    text: "We program the show frame-by-frame against your audio mix in xLights, then bake the sequence onto an outdoor-rated Falcon controller for show-night playback.",
  },
  {
    n: "04",
    title: "Tune & light it up",
    text: "On-site assembly takes a day. We sync the tree into the rest of the display, broadcast on an FM transmitter if cars are watching, and tune the white balance to the venue.",
  },
];

export function MegaTreeSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-midnight overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(124, 58, 237, 0.22), transparent 60%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0, 229, 255, 0.18), transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual side */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-square rounded-2xl overflow-hidden card card-glow">
              <Image
                src="/images/uploads/placeholder-mega-tree.svg"
                alt="Pixel Mega Tree built and music-synchronized by Ontario Light Shows"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="spec-chip">xLights</span>
                <span className="spec-chip">FPP</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-[rgba(5,7,15,0.85)] backdrop-blur-md rounded-xl p-4 border border-soft">
                <p className="text-[11px] uppercase tracking-widest text-accent font-bold mb-1">
                  Signature Build
                </p>
                <p className="text-white font-semibold text-sm sm:text-base leading-tight">
                  Pixel Mega Tree — 16 strands, 2,400 RGB pixels, sequenced to a 12-minute holiday show.
                </p>
              </div>
            </div>
          </div>

          {/* Copy side */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <p className="eyebrow">Signature Build</p>
            <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-5">
              Building & Syncing <span className="gradient-text">Pixel Mega Trees</span>.
            </h2>
            <p className="text-muted-strong text-base sm:text-lg leading-relaxed mb-8">
              A Pixel Mega Tree is the centrepiece of any serious music-synchronized light show — a 16-foot cone of individually addressable RGB pixels that pulses, sweeps, and dances to your soundtrack. We design, fabricate, pixel-map, and sequence every tree we ship — from the aluminum frame and the WS2811 strands all the way to the FM-broadcast audio sync. Whether it's a homeowner's front-yard showpiece or a commercial centrepiece for a community holiday display, the build is custom and the sequence is yours.
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {buildSpecs.map((s) => (
                <div key={s.label} className="card p-4 corner-accent">
                  <div className="text-[10px] uppercase tracking-widest text-accent font-bold mb-1">
                    {s.label}
                  </div>
                  <div className="text-xl font-extrabold text-white leading-tight mb-1">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-strong leading-snug">{s.detail}</div>
                </div>
              ))}
            </div>

            {/* Build steps */}
            <div className="space-y-4 mb-8">
              {buildSteps.map((step) => (
                <div key={step.n} className="flex gap-4 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center font-extrabold text-accent text-sm">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base mb-1">{step.title}</h3>
                    <p className="text-muted-strong text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn btn-primary">
                Design my Mega Tree
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
