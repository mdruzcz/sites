import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { SceneCanvas } from "@/components/demo/SceneCanvas";
import { breadcrumbSchema, howToSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const title = "Quick-Start Guide for Light Show Kits";
const description =
  "Set up a Resonate kit: unbox, connect and power up, join the Lightshow Wi-Fi, sign in, then run Setup for ports, microphone calibration and the look check.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/quick-start` },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/quick-start` },
  twitter: { title: `${title} | ${site.name}`, description },
};

type Step = { name: string; text: string; detail: string[]; tip?: string };

const STEPS: Step[] = [
  {
    name: "Unbox and check the parts",
    text: "Lay out the controller box, USB microphone, pixel controller, power supplies, props and cables, and check them against your prop map.",
    detail: [
      "Light Show controller (Raspberry Pi 5), USB microphone and the Kulp pixel controller with its power supplies, in one weatherproof enclosure.",
      "Pre-wired pigtails on every output, labelled by port, and the props for your package (Business Kit and larger).",
      "Data and power cables and mounting hardware.",
      "Keep the packaging if your props are seasonal; it is the easiest way to store them.",
    ],
  },
  {
    name: "Connect and power up",
    text: "Plug each prop into its port, connect the pixel controller to the controller box with the Ethernet cable, place the microphone, then power on.",
    detail: [
      "Each prop goes to the port number shown on your prop map.",
      "The pixel controller connects to the controller box's Ethernet port.",
      "Put the microphone where it hears the music clearly but is not pressed against a speaker.",
      "Power the pixel controller and props, then the controller box. Give it a minute to start.",
    ],
    tip: "On an installed kit our crew has already done this. Start at step 3.",
  },
  {
    name: "Join the Lightshow Wi-Fi",
    text: "On your phone, open Wi-Fi settings and join the network called Lightshow, then open the Light Show page in your browser.",
    detail: [
      "Use the Wi-Fi password and page address supplied with your kit.",
      "No internet connection is needed. Your phone may warn that the network has no internet; stay connected.",
      "Add the page to your home screen so it opens like an app next time.",
    ],
  },
  {
    name: "Sign in",
    text: "Enter the admin password supplied with your kit, then change it under Settings, Admin password.",
    detail: [
      "Anyone on the hotspot can reach the page, but only someone with the password can control the lights.",
      "Changing the password signs every other phone out, which is how you remove access for former staff.",
    ],
  },
  {
    name: "Run Setup, step 1: controller and ports",
    text: "Open Setup. Check each prop with Flash and Last 10 so you know every pixel count is right.",
    detail: [
      "Kits ship configured. If you ever change the layout, use Settings, Controller: Find controllers, enter the number of pixels on each port (or read them from a SanDevices E682), name each prop and Apply.",
      "Flash lights a whole prop for a few seconds so you can see which is which.",
      "Last 10 lights only the final 10 pixels of a prop. If they are not at the very end of the string, the pixel count is wrong.",
      "Under Settings, Props, give each prop a name and, for mega trees, the number of strands and whether alternate strands run top-down (zig-zag).",
    ],
  },
  {
    name: "Run Setup, step 2: microphone calibration",
    text: "Play music at normal volume with the microphone where it will live, choose a prop and tap Calibrate mic.",
    detail: [
      "The prop flashes white with the music for about a minute while the Pi adjusts the mic gain.",
      "It aims for loud moments near full brightness without clipping, then saves the gain.",
      "Re-run it any time the sound system or the microphone position changes.",
    ],
  },
  {
    name: "Run Setup, step 3: look check",
    text: "Keep the music playing and tap Check all looks. Each music look runs for 8 seconds, about 2 minutes in total.",
    detail: [
      "For each look the Pi reports how much of the prop lit up at least once and how often the whole prop was near full brightness (which reads as a flash).",
      "Tap Apply fixes and the app tunes the looks that need it. Clear fixes undoes them.",
    ],
  },
  {
    name: "Pick a theme and set the schedule",
    text: "Choose a theme or a look, then set lights-on and lights-off times under Schedule, and optionally build a playlist.",
    detail: [
      "Themes, Looks and Colours change what is on now, for all props or just the one selected.",
      "Adjust sets brightness, smoothness, speed, the always-on glow and music sensitivity.",
      "Schedule turns the lights on and off on chosen days and can start the playlist at the on time.",
      "Save favourite combinations under My looks and use them as playlist steps.",
    ],
  },
];

export default function QuickStartPage() {
  const url = `${site.url}/quick-start`;
  return (
    <>
      <JsonLd data={howToSchema("Set up a Resonate Lighting Light Show kit", description, STEPS.map((s) => ({ name: s.name, text: s.text })), url)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Quick-start guide", url }])} />

      <section className="bg-ink-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow">Quick-start guide</p>
            <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
              From box to <span className="gradient-text">show</span>.
            </h1>
            <p className="text-muted-strong text-lg leading-relaxed mb-6">
              Eight steps from unboxing to a scheduled show. Installed kits arrive with steps 1 and 2 done; the Setup wizard in the Light Show app walks you through the rest.
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {STEPS.map((s, i) => (
                <li key={s.name}>
                  <a href={`#step-${i + 1}`} className="flex items-center gap-2 min-h-[44px] text-muted-strong hover:text-resonant">
                    <span className="w-7 h-7 rounded-full bg-resonant/15 border border-resonant/40 text-resonant text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    {s.name}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-line bg-[#04060b]">
            <SceneCanvas scene="mega" selection={{ kind: "theme", name: "Candy Cane" }} label="3D render of a mega tree wired to its controller box, running the Candy Cane theme" mini={false} />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {STEPS.map((s, i) => (
            <article key={s.name} id={`step-${i + 1}`} className="card p-7 sm:p-8 scroll-mt-24">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-resonant/15 border border-resonant/40 text-resonant font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-white mb-2">{s.name}</h2>
                  <p className="text-muted-strong leading-relaxed mb-4">{s.text}</p>
                  <ul className="space-y-2 text-sm text-muted-strong list-disc pl-5 marker:text-resonant">
                    {s.detail.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  {s.tip && <p className="mt-4 text-sm text-cool">{s.tip}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Need a hand?" title="We are a phone call away." description={`Call ${site.phone} or email ${site.email}. Care visits can re-run Setup for you, swap themes for the season and check every pixel.`} />
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/care" className="btn btn-outline">Care &amp; seasonal service</Link>
            <Link href="/how-it-works" className="btn btn-ghost">How the system works</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
