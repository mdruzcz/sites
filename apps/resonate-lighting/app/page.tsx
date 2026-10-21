import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getCities, getFaqs, getKits, getMarkets } from "@/lib/content";
import { formatCad, pricing } from "@/lib/pricing";
import { LightShowDemo } from "@/components/demo/LightShowDemo";
import { BudgetPlanner } from "@/components/BudgetPlanner";
import { SectionHeader } from "@/components/SectionHeader";
import { SignalChain } from "@/components/SignalChain";
import { KitCard } from "@/components/KitCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Check } from "@/components/Icons";
import { faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const title = "Resonate Lighting | Music-Reactive Pixel Lighting Kits";
const description =
  "Music-reactive mega trees, rooflines and wrapped trees for businesses, BIAs and municipalities across Canada. Premium kits, lifetime software, full install.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: site.url },
  openGraph: { title, description, url: site.url },
  twitter: { title, description },
};

export default function HomePage() {
  const kits = getKits();
  const markets = getMarkets();
  const cities = getCities();
  const faqs = getFaqs().filter((f) => ["The kit", "Pricing"].includes(f.category ?? "")).slice(0, 6);
  const starter = pricing.packages[0];

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* Hero + live demo */}
      <section className="relative">
        <div className="hero-gradient absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-12 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="eyebrow">Music-reactive pixel lighting kits · Canada</p>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
                Lighting that <span className="gradient-text">listens</span>.
              </h1>
              <p className="text-muted-strong text-lg leading-relaxed mb-6">
                Mega trees, rooflines, wrapped trees and arches for commercial spaces, BIAs and municipalities. A Raspberry Pi 5 Light Show engine hears the music through a microphone and moves every pixel with it, and your staff run it all from a phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link href="/contact#quote" className="btn btn-primary">Request a Quote</Link>
                <Link href="#budget-planner" className="btn btn-ghost">Plan a budget</Link>
              </div>
              <p className="text-sm text-muted mb-6">
                Kits from <strong className="text-white">{formatCad(starter.price)}</strong> CAD, {pricing.taxNote}. Installation anywhere in Canada.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-strong">
                <li className="flex items-start gap-2"><Check /> Pi 5 Light Show controller box</li>
                <li className="flex items-start gap-2"><Check /> USB mic with quiet-room gate</li>
                <li className="flex items-start gap-2"><Check /> 12 V WS2811 pixel props</li>
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
            title="From a song to a street of pixels."
            description="Every kit is the same chain: something that listens, an engine that decides, a controller that drives the pixels, and the props. Staff only ever touch the Light Show app."
          />
          <SignalChain />
          <div className="text-center mt-10">
            <Link href="/how-it-works" className="btn btn-outline">How the system works</Link>
          </div>
        </div>
      </section>

      {/* Kits */}
      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Kits"
            title="Four sizes of the same system."
            description="Every kit includes the controller box, microphone, pixel controller, props and lifetime access to the software that runs them. Starting prices in Canadian dollars; installation is quoted by crew-day plus travel."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kits.map((kit) => (
              <KitCard key={kit.slug} kit={kit} />
            ))}
          </div>
          <div className="text-center mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/kits" className="btn btn-outline">Compare the kits</Link>
            <Link href="/pricing" className="btn btn-ghost">Pricing &amp; installation rates</Link>
          </div>
        </div>
      </section>

      {/* Budget planner */}
      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Budget planner"
            title="Slide your budget. Watch the display grow."
            description="Set a project budget and where the site is. The 3D scene adds mega trees, rooflines, wrapped trees and arches as the budget rises, with an itemised estimate including installation and travel."
          />
          <BudgetPlanner />
        </div>
      </section>

      {/* Markets */}
      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Who we serve"
            title="Built for the places people gather."
            description="Retail plazas, restaurants and hotels, Business Improvement Areas, municipalities, event venues and property managers."
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

      {/* Locations */}
      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Locations"
            title="Installed anywhere in Canada."
            description={`Based in ${site.homeRegion}, our crews install in any city with applicable travel charges. Climate, district and travel notes for major cities:`}
          />
          <ul className="flex flex-wrap justify-center gap-2">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/locations/${c.slug}`} className="spec-chip spec-chip-cool normal-case tracking-normal text-sm min-h-[44px] hover:bg-[rgba(76,201,240,0.15)]">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-center mt-8">
            <Link href="/locations" className="btn btn-outline">All locations &amp; travel zones</Link>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-16 sm:py-24 bg-ink">
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
