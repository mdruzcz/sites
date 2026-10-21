import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getFaqs, getKits } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, kitProductSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pixel Lighting Kits — Starter, Business & Municipal Packages",
  description:
    "What is in a Resonate Lighting kit: Raspberry Pi 5 controller running LedFx, SanDevices E682 or Kulp/FPP pixel controller, USB microphone and 12 V WS2811 props. Starter, Business and Municipal packages for Ontario. Request a quote.",
  alternates: { canonical: `${site.url}/kits` },
  openGraph: {
    title: `Pixel Lighting Kits | ${site.name}`,
    description: "Starter, Business and Municipal music-reactive pixel lighting packages. Lifetime software access included.",
    url: `${site.url}/kits`,
  },
};

const CORE = [
  {
    title: "Raspberry Pi 5 controller box",
    body: "Runs LedFx and the Resonate Light Show app. Broadcasts its own Wi-Fi hotspot and serves the control page to any phone — no app store, no accounts.",
  },
  {
    title: "Pixel controller",
    body: "SanDevices E682 for live music-reactive displays, or a Kulp K-series controller running FPP (Falcon Player) when you want fully sequenced, scheduled holiday shows.",
  },
  {
    title: "USB microphone",
    body: "Listens to whatever is playing and feeds the analysis. Placement is tuned on install to your sound system.",
  },
  {
    title: "12 V WS2811 pixel props",
    body: "Mega trees, singing trees, strips and rooflines, sized to the package and built for Ontario weather. Power supplies, enclosures and cabling included.",
  },
  {
    title: "Lifetime software access",
    body: "The proprietary Resonate Light Show software ships on the Pi. Access is for the life of the kit and updates are included.",
  },
];

export default function KitsPage() {
  const kits = getKits();
  const faqs = getFaqs().filter((f) => f.category === "The kit" || f.category === "Packages");

  return (
    <>
      {kits.map((kit) => (
        <JsonLd key={kit.slug} data={kitProductSchema(kit)} />
      ))}
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Kits", url: `${site.url}/kits` },
        ])}
      />

      <section className="bg-ink-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">Kits</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            What&apos;s in the <span className="gradient-text">box</span>.
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            Every Resonate kit is the same five parts, scaled to the space. Choose Starter, Business or Municipal and we size the props, power and controller to your frontage, tree or street. Pricing is quoted per project in Canadian dollars.
          </p>
        </div>
      </section>

      {/* Core components */}
      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Included in every kit" title="The core components." align="left" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE.map((c, i) => (
              <div key={c.title} className="card card-glow p-7">
                <div className="h-display text-resonant text-sm tracking-widest mb-3">0{i + 1}</div>
                <h2 className="text-lg font-bold text-white mb-2">{c.title}</h2>
                <p className="text-muted-strong text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Packages"
            title="Starter, Business, Municipal."
            description="Three sizes of the same system. Start where the site is today and expand later without replacing the controller or software."
          />
          <div className="space-y-10">
            {kits.map((kit, i) => (
              <article key={kit.slug} id={kit.slug} className="card overflow-hidden scroll-mt-24">
                <div className={`grid grid-cols-1 lg:grid-cols-5 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="lg:col-span-2 relative min-h-[220px] placeholder-slot">
                    <Image
                      src={kit.image}
                      alt={`${kit.name} — placeholder image slot for a ${kit.tier.toLowerCase()} installation by ${site.name}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  </div>
                  <div className="lg:col-span-3 p-7 sm:p-10">
                    <p className="eyebrow">{kit.tier} Package</p>
                    <h2 className="h-display text-2xl sm:text-3xl text-white mb-3">{kit.headline}</h2>
                    <p className="text-muted-strong leading-relaxed mb-6">{kit.summary}</p>

                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm mb-6">
                      <div>
                        <dt className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-1">Controller</dt>
                        <dd className="text-muted-strong">{kit.controller}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-1">Pixel controller</dt>
                        <dd className="text-muted-strong">{kit.pixelController}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-1">Microphone</dt>
                        <dd className="text-muted-strong">{kit.mic}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-1">Software</dt>
                        <dd className="text-muted-strong">{kit.software}</dd>
                      </div>
                    </dl>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="text-sm font-bold text-white mb-2">Props &amp; pixels</h3>
                        <ul className="space-y-2 text-sm text-muted-strong">
                          {kit.propsIncluded.map((p) => (
                            <li key={p} className="flex items-start gap-2"><Check /> {p}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-2">Best for</h3>
                        <ul className="space-y-2 text-sm text-muted-strong">
                          {kit.bestFor.map((p) => (
                            <li key={p} className="flex items-start gap-2"><Check /> {p}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href={`/contact?kit=${kit.slug}`} className="btn btn-primary">Request a quote for {kit.tier}</Link>
                      <Link href="/services" className="btn btn-ghost">Installation &amp; services</Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reactive vs sequenced */}
      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-8">
            <p className="eyebrow">Live reactive</p>
            <h2 className="text-2xl font-bold text-white mb-3">Pi 5 + LedFx + E682</h2>
            <p className="text-muted-strong leading-relaxed mb-4">
              The everyday mode. The microphone hears the music, LedFx analyses it, and the E682 drives the pixels. Pick Pulse, Ripple, Scroll, Power, Rainbow or Solid and a colour theme in the Light Show app. Try it in the demo on the <Link href="/" className="text-cool underline underline-offset-2">home page</Link>.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Pulse", "Ripple", "Scroll", "Power", "Rainbow", "Solid"].map((m) => (
                <span key={m} className="spec-chip">{m}</span>
              ))}
            </div>
          </div>
          <div className="card p-8">
            <p className="eyebrow">Sequenced holiday shows</p>
            <h2 className="text-2xl font-bold text-white mb-3">Kulp K-series + FPP</h2>
            <p className="text-muted-strong leading-relaxed mb-4">
              For scheduled, choreographed programs — singing trees, synchronized rooflines across several buildings, a tree-lighting ceremony — Business and Municipal packages add a Kulp K-series controller running FPP. We sequence the shows as part of <Link href="/services#seasonal-service" className="text-cool underline underline-offset-2">seasonal service</Link>.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Christmas", "Candy Cane", "Grinch", "Snowman", "Halloween", "Canada Day", "Ocean"].map((t) => (
                <span key={t} className="spec-chip spec-chip-cool">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Kit FAQ" title="Questions about the kits." />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Check() {
  return (
    <svg className="w-4 h-4 text-resonant mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
