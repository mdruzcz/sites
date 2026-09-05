import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Soffit Track Lighting FAQ: Install, Power, App, Winter",
  description:
    "Answers on soffit track lighting: sizing a kit, mounting on different soffits, 12V power and GFCI outlets, the WLED app, Ontario winters, professional installation areas, shipping and the 5-year warranty.",
  alternates: { canonical: `${SITE_URL}/faq` }
};

const GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "The system",
    items: [
      { q: "What is soffit track lighting?", a: "An extruded aluminum channel, painted to match your soffit, screws up under the eave and holds individually addressable 12V RGBW pucks. By day it reads as a trim line. At night the roofline is any colour you set in the app, or a warm white that looks like architectural lighting." },
      { q: "How is it different from strip lights?", a: "Strip kits glue a flexible LED strip to the fascia. The adhesive fails in freeze-thaw, the strip sags and the wire is visible all day. Track systems screw a rigid channel to the soffit, hide the wire and point each puck down the wall. It is what every professional installer uses." },
      { q: "Are all your parts 12V?", a: "Yes. Every puck, controller, power supply and connector is 12V, so anything in the store works with anything else and nothing can be plugged into the wrong supply." },
      { q: "What colours does the track come in?", a: "Black, white, wicker and brown, with colour-matched 5/8-inch screws. Match the soffit, not the brick." }
    ]
  },
  {
    title: "Sizing and ordering",
    items: [
      { q: "How much track do I need?", a: "Add up every roofline, gable and soffit edge you want lit, including the gaps you will bridge with connectors, and round up to the next kit. A bungalow front is usually 50 to 75 ft; a two-storey front plus both sides is 150 to 200 ft. Email us a photo and we will size it, or book a free on-site measurement in Southwestern Ontario." },
      { q: "What is in a kit?", a: "Track, five-puck RGBW strands, a WLED WiFi controller, 12V power supplies, 1 to 20 ft extension connectors, T-connectors, power-injection parts on 100 ft and up, a data amplifier on larger kits, and colour-matched screws. The full bill of materials is on the kits page." },
      { q: "Can I buy parts on their own?", a: "Yes. Track, strands, controllers, power supplies, connectors and screws are all sold individually for custom runs, extensions and repairs." },
      { q: "How long does shipping take?", a: "Orders leave London, Ontario within two business days. Ontario and Quebec usually see delivery in two to four days, the rest of Canada in four to eight. Orders over $500 ship free. We do not ship to the United States." }
    ]
  },
  {
    title: "Installing",
    items: [
      { q: "Can I install it myself?", a: "Yes. A comfortable DIYer with a drill, a ladder and a free Saturday does a bungalow front in an afternoon. The how-it-works page and the soffit mounting guide cover every step." },
      { q: "Do I need an electrician?", a: "Not for a plug-in install. The system is CSA Class 2 low voltage and the supply plugs into an outdoor GFCI receptacle. A new outlet hidden in the soffit is an electrician's job." },
      { q: "Does it work on vinyl soffit?", a: "Yes. Vinyl, aluminum and wood soffits each want a slightly different screw pattern and fastener, which the mounting guide explains. Perforated vinyl needs the screws to land on the framing behind it." },
      { q: "Do you install it?", a: "Yes, with our own crew in London, Woodstock, Kitchener, Waterloo, Cambridge, Guelph, Stratford, Ingersoll and nearby towns. Free on-site measurement, same hardware, 5-year warranty. Elsewhere in Canada we connect you with partner installers." }
    ]
  },
  {
    title: "Power and control",
    items: [
      { q: "What is power injection and when do I need it?", a: "Long runs lose voltage toward the far end, so the last pucks dim slightly. Power injection feeds a second 12V supply into the run through a T-connector, roughly every 120 pucks. Kits from 100 ft include the parts." },
      { q: "How do I control the lights?", a: "The controller runs WLED and joins your 2.4 GHz WiFi. The free app gives you 16 million colours, a true warm white, saved scenes, schedules, sunset triggers, zones and Alexa or Google voice control. Scenes are stored on the controller and keep running if your internet drops." },
      { q: "How much electricity does it use?", a: "About 0.3 W per puck at full white. A 100 ft kit with 155 pucks draws under 50 W at full brightness and far less on a coloured scene." }
    ]
  },
  {
    title: "Weather and warranty",
    items: [
      { q: "Will it survive an Ontario winter?", a: "Pucks and connectors are IP68 sealed and the hardware is tested to −40 °C. Aluminum track sheds snow and ice. Nothing comes down in January." },
      { q: "How long do the LEDs last?", a: "Rated life is 50,000 hours, which is more than 25 years at five hours a night." },
      { q: "What does the warranty cover?", a: "Five years on parts against manufacturing defects on every kit and component, plus workmanship on our own installs. Improper installation, surges and physical damage are excluded." }
    ]
  }
];

export default function FaqPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: GROUPS.flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  const id = (t: string) => t.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero photo="home-cottage" eyebrow="FAQ" title="What people ask before they order." crumbs={[{ label: "FAQ" }]} compact />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="FAQ sections" className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <ul className="space-y-2 text-sm">
              {GROUPS.map((g) => <li key={g.title}><a href={`#${id(g.title)}`} className="link-underline">{g.title}</a></li>)}
            </ul>
          </nav>
          <div className="space-y-12">
            {GROUPS.map((g) => (
              <div key={g.title} id={id(g.title)} className="scroll-mt-28">
                <h2 className="font-display h3-fluid">{g.title}</h2>
                <div className="mt-5 space-y-3">
                  {g.items.map((f) => (
                    <details key={f.q} className="group card">
                      <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
                        {f.q}
                        <span aria-hidden className="text-[var(--color-muted)] transition group-open:rotate-180">▾</span>
                      </summary>
                      <p className="px-5 pb-5 leading-relaxed text-[var(--color-text-soft)]">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
            <div className="card p-6">
              <h2 className="font-display text-xl">Something else?</h2>
              <p className="mt-2 text-sm text-[var(--color-text-soft)]">Send a photo of the house and your postal code. We answer within one business day from London, Ontario.</p>
              <Link href="/contact-us" className="btn-primary mt-4">Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
