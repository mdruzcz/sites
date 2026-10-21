import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getFaqs, getKits, getMarkets, getServices } from "@/lib/content";
import { LightShowDemo } from "@/components/demo/LightShowDemo";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${site.name} | Music-Reactive Pixel Lighting Kits for Commercial Spaces in Ontario`,
  description:
    "Music-reactive pixel lighting kits for commercial spaces, BIAs and municipalities in Ontario. Raspberry Pi 5 + LedFx controller, mega trees, rooflines, lifetime software. Design, supply, installation and seasonal service. Request a quote.",
  alternates: { canonical: site.url },
};

export default function HomePage() {
  const kits = getKits();
  const markets = getMarkets();
  const services = getServices();
  const faqs = getFaqs().slice(0, 6);

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* Hero + demo */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-12 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <p className="eyebrow">Music-reactive pixel lighting · Ontario</p>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
                Lighting that <span className="gradient-text">listens</span>.
              </h1>
              <p className="text-muted-strong text-lg leading-relaxed mb-6">
                Permanent and seasonal pixel lighting kits for commercial spaces, BIAs and municipalities. A Raspberry Pi 5 controller listens through a microphone and drives mega trees, singing trees, strips and rooflines in time with the music — controlled from any phone, no app store required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link href="/contact" className="btn btn-primary">Request a Quote</Link>
                <Link href="/kits" className="btn btn-ghost">See the kits</Link>
              </div>
              <ul className="grid grid-cols-2 gap-3 text-sm text-muted-strong">
                <li className="flex items-start gap-2"><Check /> Pi 5 + LedFx controller box</li>
                <li className="flex items-start gap-2"><Check /> E682 or Kulp/FPP pixel controller</li>
                <li className="flex items-start gap-2"><Check /> 12 V WS2811 props</li>
                <li className="flex items-start gap-2"><Check /> Lifetime software access</li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <LightShowDemo />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How it works"
            title="Three parts. One show."
            description="Every kit is the same simple chain: something that listens, something that decides, and pixels that light up. Staff only ever touch the Light Show app."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Listen",
                body: "A USB microphone on the controller picks up whatever your sound system is playing — live band, playlist or a busker on the street.",
              },
              {
                step: "02",
                title: "Analyse",
                body: "The Raspberry Pi 5 runs LedFx, breaking the audio into beats and energy in real time. Our Light Show app sits on top so anyone can pick a mode and theme in two taps.",
              },
              {
                step: "03",
                title: "Light",
                body: "A SanDevices E682 (or Kulp K-series running FPP for sequenced holiday shows) drives 12 V WS2811 pixels on mega trees, singing trees, strips and rooflines.",
              },
            ].map((s) => (
              <div key={s.step} className="card card-glow p-7">
                <div className="h-display text-resonant text-sm tracking-widest mb-3">{s.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-muted-strong text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kits */}
      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Kits"
            title="Starter, Business, Municipal."
            description="Same controller, same software, scaled to the space. Every package is quoted per project in Canadian dollars."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kits.map((kit) => (
              <Link key={kit.slug} href={`/kits#${kit.slug}`} className="card card-glow p-7 flex flex-col">
                <p className="eyebrow">{kit.tier} Package</p>
                <h3 className="text-xl font-bold text-white mb-2">{kit.headline}</h3>
                <p className="text-muted-strong text-sm leading-relaxed mb-5 flex-1">{kit.audience}</p>
                <ul className="space-y-2 text-sm text-muted-strong mb-6">
                  {kit.propsIncluded.slice(0, 3).map((p) => (
                    <li key={p} className="flex items-start gap-2"><Check /> {p}</li>
                  ))}
                </ul>
                <span className="text-resonant font-semibold text-sm">What&apos;s included →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Who we serve"
            title="Built for the places people gather."
            description="Retail plazas, restaurants and patios, Business Improvement Areas, municipalities, event venues and property managers across Ontario."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {markets.map((m) => (
              <Link key={m.slug} href={`/${m.slug}`} className="card card-glow p-7">
                <h3 className="text-xl font-bold text-white mb-2">{m.name}</h3>
                <p className="text-muted-strong text-sm leading-relaxed mb-4">{m.intro}</p>
                <div className="flex flex-wrap gap-2">
                  {m.audiences.slice(0, 3).map((a) => (
                    <span key={a} className="spec-chip spec-chip-cool normal-case tracking-normal">{a}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Installation & services"
            title="Design, supply, installation, seasonal service."
            description="One team from the first site walk to the holiday changeover."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`} className="card card-glow p-6">
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-muted-strong text-sm leading-relaxed">{s.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="FAQ" title="Common questions." />
          <FaqAccordion faqs={faqs} />
          <div className="text-center mt-8">
            <Link href="/faq" className="btn btn-outline">All questions</Link>
          </div>
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
