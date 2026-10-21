import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getFaqs, getKits } from "@/lib/content";
import { kitIncludes } from "@/lib/estimate";
import { formatCad, pricing, PROP_TYPES } from "@/lib/pricing";
import { MUSIC_LOOKS, STEADY_LOOKS, THEMES } from "@/lib/lightshow/core";
import type { SceneId } from "@/lib/lightshow/scenes";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { MediaSlot } from "@/components/MediaSlot";
import { SceneCanvas } from "@/components/demo/SceneCanvas";
import { Check } from "@/components/Icons";
import { breadcrumbSchema, faqSchema, kitProductSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const title = "Pixel Lighting Kits & What's Inside";
const description =
  "What ships in each Resonate kit: Pi 5 Light Show controller, USB mic, pixel controller, WS2811 mega trees, rooflines and wrapped trees, and lifetime software.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/kits` },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/kits` },
  twitter: { title: `${title} | ${site.name}`, description },
};

const CORE = [
  {
    title: "Light Show controller box",
    body: "A Raspberry Pi 5 running LedFx and our Light Show engine and app, in a weatherproof enclosure. It broadcasts its own Lightshow Wi-Fi and serves the control page to any phone.",
  },
  {
    title: "USB microphone",
    body: "Hears whatever is playing. The engine tracks the room's background noise so music looks only move for music, and Setup calibrates the gain on site.",
  },
  {
    title: "Kulp pixel controller and power",
    body: "A Kulp K-series pixel controller running Falcon Player, with 16 fused outputs, differential ports for distant props, a real-time clock and status display, plus 12 V power supplies sized to the props.",
  },
  {
    title: "Enclosure and pigtails",
    body: "Everything is built into a weatherproof enclosure with cable glands and vents, with a pre-wired pigtail on every output, labelled by port, so props plug straight in.",
  },
  {
    title: "Lifetime software access",
    body: "The proprietary Light Show software ships on the controller. No subscription: it is yours for the life of the kit, with updates included.",
  },
];

const PROP_SCENES: { type: (typeof PROP_TYPES)[number]; scene: SceneId; theme: string }[] = [
  { type: "mega", scene: "mega", theme: "Candy Cane" },
  { type: "roof", scene: "roofline", theme: "Christmas" },
  { type: "deciduous", scene: "deciduous", theme: "Northern Lights" },
  { type: "evergreen", scene: "evergreen", theme: "Icicles" },
];

export default function KitsPage() {
  const kits = getKits();
  const faqs = getFaqs().filter((f) => f.category === "The kit" || f.category === "Pricing");

  return (
    <>
      {kits.map((kit) => (
        <JsonLd key={kit.slug} data={kitProductSchema(kit, kitIncludes(kit.pkg.contents))} />
      ))}
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Kits", url: `${site.url}/kits` }])} />

      <section className="bg-ink-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">Kits</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            What&apos;s in the <span className="gradient-text">box</span>.
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed mb-8">
            The Starter Kit is the complete control system. Business adds a mega tree, Plaza / BIA adds two mega trees and four smaller props, and the Municipal Program scales up from there. We size the props, power and pixel controllers to your frontage, square or street.
          </p>
          <div className="flex flex-wrap gap-3">
            {kits.map((k) => (
              <Link key={k.slug} href={`#${k.slug}`} className="seg">
                {k.name} · {formatCad(k.pkg.price)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="In every kit" title="The control system." align="left" description="The part that listens, decides and drives the pixels is the same in every package. On its own, it is the Starter Kit." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE.map((c, i) => (
              <div key={c.title} className="card card-glow p-7">
                <div className="h-display text-resonant text-sm tracking-widest mb-3">0{i + 1}</div>
                <h2 className="text-lg font-bold text-white mb-2">{c.title}</h2>
                <p className="text-muted-strong text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
            <div className="card overflow-hidden relative min-h-[220px]">
              <MediaSlot id="controller-box" className="absolute inset-0" sizes="(min-width: 1024px) 33vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Packages"
            title="Starter, Business, Plaza / BIA, Municipal."
            description={`Starting prices in Canadian dollars, ${pricing.taxNote}. Installation is billed by the crew-day plus travel by zone; see pricing for the rates or plan a layout with the budget planner.`}
          />
          <div className="space-y-10">
            {kits.map((kit) => (
              <article key={kit.slug} id={kit.slug} className="card overflow-hidden scroll-mt-24">
                <MediaSlot id={`kit-${kit.slug}`} className="aspect-[4/3] sm:aspect-[2/1] lg:aspect-[21/8]" sizes="(min-width: 1280px) 1200px, 100vw" />
                <div>
                  <div className="p-7 sm:p-10">
                    <p className="eyebrow">{kit.tier}</p>
                    <h2 className="h-display text-2xl sm:text-3xl text-white mb-2">{kit.name}</h2>
                    <p className="text-lg text-white/90 font-semibold mb-3">{kit.headline}</p>
                    <p className="mb-5">
                      <span className="text-sm text-muted">{kit.pkg.priceLabel} </span>
                      <span className="h-display text-3xl text-white">{formatCad(kit.pkg.price)}</span>
                      <span className="text-sm text-muted"> CAD, {pricing.taxNote}, installation extra</span>
                    </p>
                    <p className="text-muted-strong leading-relaxed mb-6">{kit.summary}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="text-sm font-bold text-white mb-2">What&apos;s in the kit</h3>
                        <ul className="space-y-2 text-sm text-muted-strong">
                          {kitIncludes(kit.pkg.contents).map((p) => (
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
                      <Link href={`/contact?kit=${kit.slug}#quote`} className="btn btn-primary">Request a quote for {kit.tier}</Link>
                      <Link href="/pricing#budget-planner" className="btn btn-ghost">Plan a budget</Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Add props"
            title="Every prop, rendered."
            description="Grow any kit with more props on the same control system. Each render below is generated live by this site from the same patterns the controller runs."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROP_SCENES.map((p) => {
              const prop = pricing.props[p.type];
              return (
                <div key={p.type} className="card overflow-hidden flex flex-col">
                  <div className="relative aspect-[4/3] bg-[#04060b]">
                    <SceneCanvas scene={p.scene} selection={{ kind: "theme", name: p.theme }} label={`3D render of a ${prop.label.toLowerCase()} running the ${p.theme} theme`} />
                  </div>
                  <div className="p-5 flex-1">
                    <h3 className="font-bold text-white">{prop.label}</h3>
                    <p className="text-sm text-muted-strong mt-1 mb-3">{prop.detail}.</p>
                    <p className="text-sm text-white">Add-on from {formatCad(prop.price)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-muted mt-6">
            Also available: pixel arches from {formatCad(pricing.props.arch.price)} and additional pixel controllers from {formatCad(pricing.extraController.price)}. Want them moving? Try the <Link href="/" className="text-cool underline underline-offset-2">live demo</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-8">
            <p className="eyebrow">Lifetime software</p>
            <h2 className="text-2xl font-bold text-white mb-3">The Light Show app, for the life of the kit</h2>
            <p className="text-muted-strong leading-relaxed mb-4">
              The proprietary software that runs every kit is included with no subscription. From any phone on the controller&apos;s Wi-Fi: {THEMES.length} themes, {MUSIC_LOOKS.length} music looks, {STEADY_LOOKS.length} steady looks, colour schemes and custom colours, saved looks, playlists and schedules, plus Setup tools for ports, mic calibration and a look check.
            </p>
            <div className="flex flex-wrap gap-2">
              {MUSIC_LOOKS.map((m) => (
                <span key={m.id} className="spec-chip">{m.name}</span>
              ))}
            </div>
            <Link href="/how-it-works" className="inline-flex items-center min-h-[44px] mt-4 text-cool underline underline-offset-2 text-sm">How the system works</Link>
          </div>
          <div className="card p-8">
            <p className="eyebrow">Themes</p>
            <h2 className="text-2xl font-bold text-white mb-3">Sixteen themes, ready on day one</h2>
            <p className="text-muted-strong leading-relaxed mb-4">
              Themes bring their own pattern and colours and can pulse with the music. The Kulp controller in every kit also runs Falcon Player (FPP), so choreographed shows sequenced to specific songs can be added, quoted separately.
            </p>
            <div className="flex flex-wrap gap-2">
              {THEMES.map((t) => (
                <span key={t.name} className="spec-chip spec-chip-cool">{t.name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Kit FAQ" title="Questions about the kits." />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
