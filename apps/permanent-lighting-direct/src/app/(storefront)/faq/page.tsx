import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Permanent Lighting FAQ: Sizing, Power, App, Shipping",
  description:
    "Answers on sizing a permanent lighting kit, 12V power and electricians, WLED app control, track colours, Canadian winters, shipping times, returns and the 5-year warranty.",
  alternates: { canonical: `${SITE_URL}/faq` }
};

const GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Choosing a kit",
    items: [
      { q: "How do I know which kit size I need?", a: "Measure every roofline, gable and soffit edge you want lit and add them together, including the gaps you will bridge with connectors. Round up to the next kit. A bungalow front is usually 50 to 75 ft; a two-storey front plus both sides is 150 to 200 ft. Email us a photo or sketch and we will size it for you." },
      { q: "What is the difference between the kits?", a: "Only quantity. Every kit uses the same 12V RGBW pucks, 42-inch aluminum track, WLED WiFi controller and waterproof power supplies. Larger kits add strands, track, power supplies, connectors and amplifiers so long runs stay bright and in sync." },
      { q: "Which track colour should I pick?", a: "Match the soffit, not the fascia or the brick. White for white aluminum or vinyl soffit, black for black or charcoal trim, wicker for tan and sand tones, brown for chocolate or clay. The screws are colour-matched too." },
      { q: "Can I buy parts separately?", a: "Yes. Track, puck strands, controllers, power supplies, connectors and screws are all sold individually, so you can build a custom run, extend a kit or replace a part years later." }
    ]
  },
  {
    title: "Power and safety",
    items: [
      { q: "Are all your products 12V?", a: "Yes. Every light, controller, power supply and connector in the store is 12V. We do not carry 24V products, so everything works together and nothing can be plugged into the wrong supply." },
      { q: "Do I need an electrician?", a: "Not for a plug-in install. The system is CSA Class 2 low voltage and the power supply plugs into an existing outdoor GFCI receptacle. If you want a new outlet installed under the soffit, that is an electrician's job." },
      { q: "How much electricity do they use?", a: "About 0.3 W per puck at full white. A 100 ft kit with 160 pucks draws under 50 W at full brightness, and far less on a coloured scene. Running warm white five hours a night costs a few dollars a season." },
      { q: "What is power injection and do I need it?", a: "On long runs the far pucks see less voltage and dim slightly. Power injection feeds a second 12V supply into the run partway along through a T-connector. Kits at 100 ft and up include the injection parts; the guide on power supplies explains where to place them." }
    ]
  },
  {
    title: "Control and features",
    items: [
      { q: "How do I control the lights?", a: "The included controller runs WLED and joins your 2.4 GHz WiFi. The free app on Android and iOS gives you 16 million colours, a true warm white, saved scenes, schedules, sunset triggers and zones. Alexa and Google Home work too." },
      { q: "Do they work if my internet goes down?", a: "Yes. Scenes and schedules are stored on the controller, so a dusk-to-dawn routine keeps running. You only need the app when you want to change something." },
      { q: "Can I do animations and patterns?", a: "Yes. The pucks are individually addressable, so chases, twinkles, fades and multi-colour patterns are all available in the app alongside static colours." }
    ]
  },
  {
    title: "Weather and durability",
    items: [
      { q: "Will they survive a Canadian winter?", a: "They are designed for it. Pucks and connectors are IP68 sealed, the hardware is tested to −40 °C and the aluminum track sheds snow and ice. See the winter guide for details on ice damming and snow load." },
      { q: "How long do the LEDs last?", a: "Rated life is 50,000 hours. At five hours a night that is more than 25 years." },
      { q: "What does the warranty cover?", a: "Five years on parts against manufacturing defects on every kit and component. Damage from improper installation, surges or physical impact is excluded. Full terms are on the warranty page." }
    ]
  },
  {
    title: "Ordering and shipping",
    items: [
      { q: "How long does shipping take?", a: "Orders leave London, Ontario within one to two business days. Ontario and Quebec usually see delivery in two to four days, the rest of Canada in four to eight. Orders over $500 ship free." },
      { q: "Do you ship to the United States?", a: "Not at the moment. Contact us about larger orders and we will see what we can do." },
      { q: "What is the return policy?", a: "Unused items in original packaging can be returned within 30 days for a refund. Kits must be complete. Return shipping is at the customer's expense." },
      { q: "Do you offer installation?", a: "We sell the kits; installers across Canada install them. Tell us your postal code on the installers page and we will connect you with one who uses this hardware." }
    ]
  }
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GROUPS.flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero photo="home-cottage-evening" eyebrow="FAQ" title="Straight answers before you buy." crumbs={[{ label: "FAQ" }]} compact />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="FAQ sections" className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <ul className="space-y-2 text-sm">
              {GROUPS.map((g) => (
                <li key={g.title}><a href={`#${g.title.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="link-underline">{g.title}</a></li>
              ))}
            </ul>
          </nav>
          <div className="space-y-12">
            {GROUPS.map((g) => (
              <div key={g.title} id={g.title.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-28">
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
              <h2 className="font-display text-xl">Still stuck?</h2>
              <p className="mt-2 text-sm text-[var(--color-text-soft)]">Send us the question, a photo of the house, and your postal code. We answer within one business day.</p>
              <Link href="/contact-us" className="btn-primary mt-4">Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
