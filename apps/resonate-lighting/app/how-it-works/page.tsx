import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getFaqs } from "@/lib/content";
import { MUSIC_LOOKS, SCHEMES, STEADY_LOOKS, THEMES } from "@/lib/lightshow/core";
import { SectionHeader } from "@/components/SectionHeader";
import { SignalChain } from "@/components/SignalChain";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { MediaSlot } from "@/components/MediaSlot";
import { SceneCanvas } from "@/components/demo/SceneCanvas";
import { Check } from "@/components/Icons";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const title = "How the Light Show System Works";
const description =
  "How a Resonate kit turns music into light: USB mic, Raspberry Pi 5 Light Show engine, pixel controller and props, run from a phone on the kit's own Wi-Fi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/how-it-works` },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/how-it-works` },
  twitter: { title: `${title} | ${site.name}`, description },
};

const APP = [
  { title: "Themes", body: `${THEMES.length} ready-made themes, each with its own pattern and colours, from Christmas and Candy Cane to Northern Lights, Fireplace and Canada Day. Switch on React to music and a theme pulses with the sound.` },
  { title: "Looks", body: `${MUSIC_LOOKS.length} music looks that follow the microphone and ${STEADY_LOOKS.length} steady looks that need no music, in any of ${SCHEMES.length} colour schemes or your own custom colours.` },
  { title: "Adjust", body: "Brightness, smoothness (calmer changes with no flicker, or punchier), speed, an always-on glow so no part of a prop goes dark, and music sensitivity." },
  { title: "Props", body: "Every prop is listed by name. Run all props together or give one prop, such as a single storefront's roofline, its own look." },
  { title: "My looks", body: "Save what is on now, across every prop, and bring it back with one tap. Saved looks can be steps in a playlist." },
  { title: "Live preview", body: "The app shows a live 3D view of each prop drawn from the frames the engine is actually sending, so you can check the show from inside." },
];

export default function HowItWorksPage() {
  const faqs = getFaqs().filter((f) => ["The kit", "Running the show"].includes(f.category ?? ""));
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "How it works", url: `${site.url}/how-it-works` }])} />

      <section className="bg-ink-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow">How it works</p>
            <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
              From a song to a street of <span className="gradient-text">pixels</span>.
            </h1>
            <p className="text-muted-strong text-lg leading-relaxed">
              A Resonate kit is a small, self-contained system: a microphone, a Raspberry Pi 5 running the Light Show engine, a pixel controller and the props. It runs on its own Wi-Fi, needs no internet, and your staff control it from a phone.
            </p>
          </div>
          <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-line bg-[#04060b]">
            <SceneCanvas scene="display" selection={{ kind: "music", id: "scroll" }} scheme="Classic Multi" label="3D render of a roofline, mega tree, wrapped tree, evergreens and an arch running the Scroll music look" mini={false} />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="The signal chain" title="Four parts, one show." />
          <SignalChain />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 prose-rl">
            <h2>1. Mic or music</h2>
            <p>
              A USB microphone on the controller listens to whatever is playing: your existing sound system, a band on a patio or a busker on the street. If the site has no music source, the controller can play MP3s itself from a USB stick plugged into it, or from tracks uploaded through the app, out through a connected speaker. Either way the lights react through the microphone.
            </p>
            <h2>2. The Light Show engine on a Raspberry Pi 5</h2>
            <p>
              The Pi runs LedFx, which analyses the audio and renders the music looks, and our engine, which sits between LedFx and the pixels. The engine draws the themes and steady looks itself, recolours and smooths every frame so changes are calm rather than flickery, caps brightness without washing colours out to white, and sends the result to the pixel controller over Ethernet at 40 frames a second.
            </p>
            <h2>3. Pixel controller and props</h2>
            <p>
              The pixel controller turns those frames into data for each port, and each port drives a prop: a mega tree&apos;s strands, a roofline run, a wrapped tree, an evergreen spiral or an arch. The app knows each prop&apos;s shape (for a mega tree, how many strands and whether alternate strands run top-down) so patterns like spirals and snowfall land the right way up.
            </p>
            <h2>4. The quiet-room gate</h2>
            <p>
              Microphones hear everything, including conversation, traffic and fans. The engine continuously tracks the background noise of the room or street and only treats sound as music when it stays clearly above that floor. When the music stops, music looks fade down and rest on a soft always-on glow, then come straight back when it starts again. The Music sensitivity slider moves the threshold, with a live meter showing where the room is.
            </p>
          </div>
          <aside className="space-y-6">
            <div className="card overflow-hidden">
              <MediaSlot id="controller-box" className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, 100vw" />
              <p className="p-4 text-sm text-muted">The controller box: Pi 5, microphone, pixel controller and power in one enclosure.</p>
            </div>
            <div className="card p-6">
              <p className="eyebrow">Try it</p>
              <p className="text-sm text-muted-strong mb-4">The home page demo runs the same patterns with your microphone, an on-screen piano or a drum pad.</p>
              <Link href="/" className="btn btn-outline w-full">Open the live demo</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The phone app"
            title="The Light Show app."
            description="Staff never need a laptop or a lighting desk. Everything happens on one page served by the controller, laid out for a phone."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {APP.map((a) => (
                <div key={a.title} className="card card-glow p-6">
                  <h3 className="font-bold text-white mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-strong leading-relaxed">{a.body}</p>
                </div>
              ))}
            </div>
            <div className="card overflow-hidden">
              <MediaSlot id="app-phone" className="aspect-[3/4]" sizes="(min-width: 1024px) 33vw, 100vw" />
              <p className="p-4 text-sm text-muted">The Light Show app on a phone, with the live 3D preview at the top.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-7">
            <p className="eyebrow">The hotspot</p>
            <h2 className="text-xl font-bold text-white mb-2">Its own Wi-Fi</h2>
            <p className="text-sm text-muted-strong leading-relaxed">
              The controller broadcasts a Wi-Fi network called Lightshow. Join it from any phone and open the Light Show page. No app store, no account and no internet connection are needed; add the page to your home screen and it opens like an app.
            </p>
          </div>
          <div className="card p-7">
            <p className="eyebrow">Security</p>
            <h2 className="text-xl font-bold text-white mb-2">One admin password</h2>
            <p className="text-sm text-muted-strong leading-relaxed">
              Anyone on the hotspot can reach the page, but only someone with the admin password can control the lights. Changing the password signs every other phone out.
            </p>
          </div>
          <div className="card p-7">
            <p className="eyebrow">Schedules</p>
            <h2 className="text-xl font-bold text-white mb-2">On at dusk, off at close</h2>
            <p className="text-sm text-muted-strong leading-relaxed">
              Set lights-on and lights-off times and the days of the week. At the on time the last look comes back, or the playlist starts. Sites without internet keep time through power cuts with the Pi&apos;s real-time clock battery fitted.
            </p>
          </div>
          <div className="card p-7">
            <p className="eyebrow">Playlists</p>
            <h2 className="text-xl font-bold text-white mb-2">A show that keeps changing</h2>
            <p className="text-sm text-muted-strong leading-relaxed">
              Steps can be a theme, a saved look, or any look with a colour scheme, each for a set number of seconds, looping until you stop. Short steps make a combination that never sits still. Save combos and load them for each season.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-8">
            <p className="eyebrow">Setup tools</p>
            <h2 className="text-2xl font-bold text-white mb-3">Built-in Setup wizard</h2>
            <ul className="space-y-3 text-sm text-muted-strong">
              <li className="flex items-start gap-2"><Check /> Find the pixel controller on the network and read its port settings (SanDevices E682), then name each prop.</li>
              <li className="flex items-start gap-2"><Check /> Port tests: flash a whole prop, or light only its last 10 pixels to prove the pixel count is right.</li>
              <li className="flex items-start gap-2"><Check /> Microphone calibration: with music playing, the Pi adjusts the mic gain until loud moments reach near-full brightness without clipping.</li>
              <li className="flex items-start gap-2"><Check /> Look check: each music look runs for 8 seconds while the Pi measures how much of the prop lights and how often it clips, then suggests fixes.</li>
            </ul>
            <Link href="/quick-start" className="inline-flex items-center min-h-[44px] mt-4 text-cool underline underline-offset-2 text-sm">Read the quick-start guide</Link>
          </div>
          <div className="card card-glow is-active p-8">
            <p className="eyebrow">Lifetime software access</p>
            <h2 className="text-2xl font-bold text-white mb-3">Yours for the life of the kit</h2>
            <p className="text-muted-strong leading-relaxed mb-4">
              The proprietary Light Show software that powers every Resonate kit is included with the hardware: no subscription, no per-season licence, and updates included. It runs on the controller itself, so the show keeps working whether or not the site has internet.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/kits" className="btn btn-primary">See the kits</Link>
              <Link href="/pricing" className="btn btn-ghost">Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="FAQ" title="How it works: questions." />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
