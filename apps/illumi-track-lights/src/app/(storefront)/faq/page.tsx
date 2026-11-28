import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { listProducts } from "@/lib/catalog";
import { kitFromPrice, kitTopPrice, kitsWithLivePrices } from "@/lib/kits";
import { photo } from "@/lib/photos";
import { BRAND, SITE_URL, formatCad } from "@/lib/utils";

export const revalidate = 3600;

const PAGE_URL = `${SITE_URL}/faq`;
const TITLE = "Track Lighting FAQ: Kits, Power, App";
const DESCRIPTION =
  "Track lighting FAQ: sizing a kit, free shipping and Woodstock pickup, mounting on any soffit, 12V power, the WLED app, Canadian winters and the 5-year warranty.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", title: `Permanent Track Lighting FAQ | ${BRAND.name}`, description: DESCRIPTION, url: PAGE_URL, images: [photo("home-cottage").src] },
  twitter: { card: "summary_large_image", title: "Permanent Track Lighting FAQ", description: DESCRIPTION }
};

interface Item {
  q: string;
  a: string;
  /** Where to read more. Rendered under the answer, left out of the JSON-LD text. */
  more?: { label: string; href: string };
}

/** Kit prices come from the catalogue, so the answers follow a price change without an edit here. */
const faqGroups = (low: number, high: number, smallest: number, largest: number): { title: string; items: Item[] }[] => [
  {
    title: "The system",
    items: [
      {
        q: "What is permanent track lighting?",
        a: "Short answer: a row of small 12V lights held in an aluminum channel under the eaves, left up all year. Long answer: the channel is painted to match your soffit and screws up underneath it. Each light is RGBW and set on its own from an app, so the roofline can be one warm white, a holiday pattern or anything between. By day you see a line of trim.",
        more: { label: "How it goes together", href: "/how-it-works" }
      },
      {
        q: "How is a track different from a light string?",
        a: "A string sticks or clips to the fascia one light at a time, and the wire between the lights stays in view. A track is a rigid channel that screws under the soffit. The wire sits inside it, every light is held at the same spacing and angle, and the lights point down the wall. A track takes a drill and more time on the ladder than a string does.",
        more: { label: "Brands and types compared", href: "/brands" }
      },
      {
        q: "How does this compare with Gemstone, Govee and the others?",
        a: "Dealer brands such as Gemstone sell a track system through installers. Retail strings such as Govee are sold in boxes and stick or clip on. We sell track hardware as a kit you install yourself. We keep a page that lists what each maker publishes about mounting, warranty and price.",
        more: { label: "Read the brand comparison", href: "/brands" }
      },
      {
        q: "Are all your parts 12V?",
        a: "Yes. Every light, controller, power supply and connector in the store is 12V. Any part works with any other, and nothing can end up on the wrong supply."
      },
      {
        q: "What colours does the track come in?",
        a: "Black, white, wicker and brown. The 5/8-inch screws come in the same colours. Match the track to the soffit, not to the brick."
      }
    ]
  },
  {
    title: "Sizing and ordering",
    items: [
      {
        q: "How much track do I need?",
        a: "Add up every roofline, gable and soffit edge you want lit. Include the gaps you will bridge with connectors. Then round up to the next kit size. A bungalow front is usually 50 to 75 feet. A two-storey front plus both sides is usually 150 to 200 feet. If you would like a second opinion, email us a photo and we will size it, or book a free on-site measurement if you are in Southwestern Ontario.",
        more: { label: "Compare the kit sizes", href: "/diy-kits" }
      },
      {
        q: "What is in a kit?",
        a: "Aluminum track, RGBW light strands of five, a WLED WiFi controller, 12V power supplies, extension connectors from 1 to 20 feet, T-connectors and colour-matched screws. Kits of 100 feet and up add the parts for power injection, and the larger kits add a data amplifier. The kits page lists the exact count of every part by size.",
        more: { label: "See every part in each kit", href: "/diy-kits" }
      },
      {
        q: "Can I buy parts on their own?",
        a: "Yes. Track, light strands, controllers, power supplies, connectors and screws are all sold singly, for custom layouts, extensions and repairs.",
        more: { label: "Browse the parts", href: "/shop" }
      },
      {
        q: "What does a kit cost?",
        a: `Kits run from ${formatCad(low, 0)} for ${smallest} feet to ${formatCad(high, 0)} for ${largest} feet, before tax. That is the whole price: track, lights, controller, power, connectors, screws and shipping.`,
        more: { label: "Every kit and its price", href: "/diy-kits" }
      }
    ]
  },
  {
    title: "Shipping, pickup and returns",
    items: [
      {
        q: "What does shipping cost?",
        a: "Nothing. Every order ships free to any address in Canada, whether it is the largest kit or one connector. There is no minimum order and no flat fee.",
        more: { label: "Shipping details", href: "/shipping-returns" }
      },
      {
        q: "How long does delivery take?",
        a: `Orders are packed within one to two business days and ship from ${BRAND.city}, ${BRAND.region}. After that, Ontario and Quebec usually see the parcel in two to four days and the rest of Canada in four to eight.`
      },
      {
        q: "Can I pick up my order?",
        a: `Yes, and pickup is free. Choose pickup at checkout, then wait for the "ready for pickup" email, which usually comes within one to two business days. Collect the order at ${BRAND.address}. Pickups are by appointment.`,
        more: { label: "How pickup works", href: "/shipping-returns#pickup" }
      },
      {
        q: "Do you ship to the United States?",
        a: "No. We ship within Canada only."
      },
      {
        q: "Can I return a kit?",
        a: "Unused items in their original packaging can be returned within 30 days of delivery for a refund of the product price. A kit has to come back complete, and return shipping is paid by the customer. A controller or power supply that has been powered up is exchanged under warranty instead of refunded.",
        more: { label: "Read the returns policy", href: "/shipping-returns" }
      }
    ]
  },
  {
    title: "Installing",
    items: [
      {
        q: "Can I install it myself?",
        a: "Yes, if you are steady on a ladder and can run a drill. A bungalow front takes an afternoon on a free Saturday. Two storeys is a harder job. The how-it-works page and the soffit mounting guide take you through each step.",
        more: { label: "The install, step by step", href: "/how-it-works" }
      },
      {
        q: "Do I need an electrician?",
        a: "Not for a plug-in install. The system is 12V Class 2 low voltage, and the power supply plugs into an outdoor GFCI outlet. If you want a new outlet hidden in the soffit, that part is an electrician's job."
      },
      {
        q: "Does it work on vinyl soffit?",
        a: "Yes. Vinyl, aluminum and wood soffits each take a slightly different screw pattern and fastener, and the mounting guide covers all three. On perforated vinyl the screws need to land on the framing behind the panel.",
        more: { label: "Mounting on vinyl, aluminum and wood", href: "/resources/mounting-track-on-vinyl-aluminum-and-wood-soffits" }
      },
      {
        q: "Do you install it?",
        a: "Yes. Our own crew installs in London, Woodstock, Kitchener, Waterloo, Cambridge, Guelph, Stratford, Ingersoll and the towns nearby. You get a free on-site measurement, the same hardware that goes in the kits and the 5-year warranty. Elsewhere in Canada we connect you with partner installers.",
        more: { label: "Installation areas", href: "/installation" }
      }
    ]
  },
  {
    title: "Power and control",
    items: [
      {
        q: "What is power injection and when do I need it?",
        a: "A long run loses voltage toward the far end, so the last lights come out slightly dimmer. Power injection feeds a second 12V supply into the run through a T-connector, roughly every 120 lights. Kits of 100 feet and up include the parts for it.",
        more: { label: "Power injection explained", href: "/resources/what-is-power-injection" }
      },
      {
        q: "How do I control the lights?",
        a: "The controller runs WLED and joins your 2.4 GHz WiFi. The app is free. It gives you 16 million colours, a true warm white, saved scenes, schedules, sunset triggers and zones, and it works with Alexa and Google voice control. Scenes are stored on the controller, so they keep running if the internet drops."
      },
      {
        q: "How much electricity does it use?",
        a: "About 0.3 watts a light at full white. A 100 foot kit has 155 lights and draws under 50 watts at full brightness. A coloured scene draws much less."
      }
    ]
  },
  {
    title: "Weather and warranty",
    items: [
      {
        q: "Will it survive a Canadian winter?",
        a: "The lights and connectors are sealed to IP68 and the hardware is tested to −40 °C. Aluminum track sheds snow and ice. You leave it up in January."
      },
      {
        q: "How long do the LEDs last?",
        a: "They are rated for 50,000 hours. At five hours a night that is more than 25 years."
      },
      {
        q: "What does the warranty cover?",
        a: "Five years on parts, against manufacturing defects, on every kit and every part sold singly. Our own installs are also covered for workmanship. Improper installation, power surges and physical damage are not covered.",
        more: { label: "Read the warranty", href: "/warranty" }
      }
    ]
  }
];

const slug = (t: string) => t.toLowerCase().replace(/[^a-z]+/g, "-");

export default async function FaqPage() {
  const kits = kitsWithLivePrices(await listProducts());
  const feet = kits.map((k) => k.feet);
  const GROUPS = faqGroups(kitFromPrice(kits), kitTopPrice(kits), Math.min(...feet), Math.max(...feet));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GROUPS.flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        compact
        photo="home-cottage"
        eyebrow="Questions"
        title="What people ask before they order."
        intro="Plain answers on sizing, shipping, installing, power and the warranty. If yours is not here, ask us."
        crumbs={[{ label: "FAQ" }]}
      />
      <section>
        <div className="shell section grid gap-10 lg:grid-cols-[230px_1fr] lg:gap-14">
          <nav aria-label="FAQ sections" className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <p className="eyebrow text-[var(--color-gold-text)]">On this page</p>
            <ul className="mt-2 border-t border-[var(--color-border)]">
              {GROUPS.map((g) => (
                <li key={g.title} className="border-b border-[var(--color-border)]">
                  <a href={`#${slug(g.title)}`} className="flex min-h-[44px] items-center py-2 text-[0.95rem] text-[var(--color-ink)] hover:underline">{g.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-3xl space-y-12">
            {GROUPS.map((g) => (
              <div key={g.title} id={slug(g.title)} className="scroll-mt-28">
                <h2 className="font-display h3-fluid">{g.title}</h2>
                <div className="mt-4 border-t border-[var(--color-border-strong)]">
                  {g.items.map((f) => (
                    <details key={f.q} className="group border-b border-[var(--color-border-strong)]">
                      <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold text-[var(--color-ink)]">
                        {f.q}
                        <span aria-hidden className="text-xl leading-none text-[var(--color-muted)] transition group-open:rotate-45">+</span>
                      </summary>
                      <div className="pb-5 pr-6">
                        <p className="leading-relaxed text-[var(--color-text-soft)]">{f.a}</p>
                        {f.more && (
                          <Link href={f.more.href} className="text-link mt-1 inline-flex min-h-[44px] items-center text-[0.95rem]">{f.more.label}</Link>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}

            <div className="border border-[var(--color-border)] bg-[var(--color-bg-warm)] p-5 md:p-6">
              <h2 className="font-display text-[1.35rem]">Still not sure?</h2>
              <p className="mt-2 text-[var(--color-text-soft)]">
                Send a photo of the house and tell us which edges you want lit. We reply within one business day from {BRAND.city}, {BRAND.region}.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/contact-us" className="btn-primary">Ask us a question</Link>
                <Link href="/resources" className="btn-secondary">Read the guides</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
