import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Resonate Lighting — Ontario Pixel Lighting Design & Installation",
  description:
    "Resonate Lighting is an Ontario company that designs, supplies, installs and services music-reactive pixel lighting kits for commercial spaces, BIAs and municipalities. Pi 5 + LedFx, WS2811 props, lifetime software.",
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "About", url: `${site.url}/about` }])} />
      <section className="bg-ink-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">About</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            We make lights <span className="gradient-text">listen</span>.
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            Resonate Lighting is an Ontario company that designs, supplies, installs and services music-reactive pixel lighting for the places people gather: patios and plazas, main streets and town squares, venues and managed properties.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 prose-rl">
            <h2>Why we built a kit instead of a one-off</h2>
            <p>
              Addressable pixel displays used to be something only hobbyists with a winter of free evenings could run. The hardware was fine; the software was the barrier. We packaged the parts that work — a Raspberry Pi 5 running LedFx, a USB microphone, a SanDevices E682 or Kulp K-series pixel controller, 12 V WS2811 props — and wrote a simplified Light Show app on top so that a restaurant manager or a BIA coordinator can run a show from any phone with two taps.
            </p>
            <h2>What you actually get</h2>
            <p>
              A controller box that boots straight into the Light Show app and broadcasts its own Wi-Fi hotspot (no app store, no accounts), a pixel controller configured to your prop map, and props built for Ontario weather. Buyers get lifetime access to the proprietary control software that powers the kit; it ships on the Pi and updates are included. For sequenced holiday programs we add FPP on a Kulp controller and sequence the shows ourselves.
            </p>
            <h2>How we work</h2>
            <ul>
              <li>Design first: a prop layout, pixel count and power plan before anything is ordered.</li>
              <li>Specific, not salesy: we tell you exactly which hardware is in the box.</li>
              <li>Quoted per project in Canadian dollars, with a reply within {site.responseTime}.</li>
              <li>Serviced through the seasons: changeovers, sequencing, takedown and storage.</li>
            </ul>
            <h2>Where we work</h2>
            <p>
              We are based in Ontario, Canada and install for commercial, BIA and municipal clients across the province — {site.serviceAreas.slice(0, 6).join(", ")} and beyond. See <Link href="/services">installation &amp; services</Link> or <Link href="/kits">the kits</Link>.
            </p>
          </div>
          <aside className="space-y-6">
            <div className="card p-7">
              <p className="eyebrow">At a glance</p>
              <ul className="space-y-3 text-sm text-muted-strong">
                <li><strong className="text-white">Based:</strong> Ontario, Canada</li>
                <li><strong className="text-white">Serves:</strong> {site.markets.join(", ")}</li>
                <li><strong className="text-white">Controller:</strong> Raspberry Pi 5 + LedFx + Light Show app</li>
                <li><strong className="text-white">Pixel controllers:</strong> SanDevices E682; Kulp K-series (FPP)</li>
                <li><strong className="text-white">Pixels:</strong> 12 V WS2811</li>
                <li><strong className="text-white">Currency:</strong> CAD, quoted per project</li>
              </ul>
            </div>
            <div className="card p-7">
              <h3 className="font-bold text-white mb-2">Talk to us</h3>
              <p className="text-muted-strong text-sm mb-4">{site.hours}</p>
              <a href={site.phoneHref} className="block text-resonant font-semibold mb-1">{site.phone}</a>
              <a href={site.emailHref} className="block text-cool text-sm underline underline-offset-2">{site.email}</a>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
