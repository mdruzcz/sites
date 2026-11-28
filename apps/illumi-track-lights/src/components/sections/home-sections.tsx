import Link from "next/link";
import Image from "next/image";
import { Photo } from "@/components/photo";
import { KitHomeDiagram, kitHomeInfo } from "@/components/kit-home-diagram";
import { kitLightCount, kitTrackFeet, kitPerFoot, type Kit } from "@/lib/kits";
import { ARTICLES } from "@/lib/resources";
import { BRAND, formatCad } from "@/lib/utils";

/* ----------------------------------------------------------------------------
   Hero: one wide photograph, the words set bottom-left like a caption.
---------------------------------------------------------------------------- */
export function Hero({ fromPrice }: { fromPrice: number }) {
  return (
    <section className="on-dark relative isolate bg-[var(--color-ink-deep)] text-white">
      <Photo name="hero-home-twilight" ratio="h-[30rem] sm:h-[34rem] lg:h-[38rem]" sizes="100vw" priority scrim="hero" />
      <div className="absolute inset-0 flex items-end">
        <div className="shell pb-8 md:pb-12">
          <p className="eyebrow text-white/85">Permanent track lighting</p>
          <h1 className="font-display display mt-2 max-w-2xl text-white">Put the lights up once.</h1>
          <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-white/90">
            Complete 12V track lighting kits for 50 to 250 feet of roofline, from {formatCad(fromPrice, 0)}, and every part sold on its own. Shipping is free on every order in Canada.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/diy-kits" className="btn-white">Shop the kits</Link>
            <Link href="/how-it-works" className="btn-ghost-light">How it works</Link>
          </div>
        </div>
      </div>
      <p className="absolute bottom-3 right-4 hidden text-xs italic text-white/75 md:block">Shown in warm white</p>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   Kits: six tiles, one plain price each, the per-foot maths spelled out.
---------------------------------------------------------------------------- */
export function KitShelf({ kits }: { kits: Kit[] }) {
  return (
    <section>
      <div className="shell section">
        <h2 className="font-display h2-fluid track-title">Track lighting kits, 50 to 250 feet</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-soft)]">
          Measure the edges you want lit, pick the next size up, and you are done shopping. Each kit has the track, the lights, the controller, the power and the connectors counted out for that length. The drawings show an example home for each size.
        </p>
        <ul className="mt-8 grid gap-x-6 gap-y-9 sm:mt-10 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
          {kits.map((k) => (
            <li key={k.slug}>
              <Link href={`/product/${k.slug}`} className="group block">
                <div className="overflow-hidden bg-[var(--color-ink-deep)]">
                  <KitHomeDiagram footage={k.feet} scale="shared" labels={false} className="aspect-[2/1]" />
                </div>
                <div>
                  <h3 className="text-[1.0625rem] leading-snug text-[var(--color-ink)] group-hover:underline mt-3">Track Lighting Kit, {k.feet} ft</h3>
                  <p className="price mt-1 text-[1.0625rem]">{formatCad(k.price, 2)}</p>
                  <p className="mt-1 text-sm text-[var(--color-text-soft)]">
                    Works out to {formatCad(kitPerFoot(k), 2)} a foot. {kitLightCount(k)} lights, {kitTrackFeet(k)} ft of track.
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">Drawn: {kitHomeInfo(k.feet)?.title.toLowerCase() ?? "example home"}. {k.suits}</p>
                  <p className="mt-2 border-t border-[var(--color-border)] pt-2 text-[0.8rem] font-semibold text-[var(--color-accent)]">See everything in the kit</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="note mx-auto mt-10 max-w-3xl">
          <strong>The price is the whole price.</strong> No shipping charge, no controller to add, no power supply sold separately. Pick black, white, wicker or brown track at no extra cost. <Link href="/diy-kits" className="text-link">Compare all six kits part by part</Link>.
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   Parts by type: the shelf, eight tiles.
---------------------------------------------------------------------------- */
const PART_TILES: { name: string; note: string; href: string; image: string; alt: string }[] = [
  { name: "Puck Lights", note: "12V RGBW, strands of five", href: "/product-category/lights", image: "/images/products/puck-lights.webp", alt: "12V RGBW puck light strand for permanent track lighting" },
  { name: "Aluminum Track", note: "42-inch pieces in four colours", href: "/product/aluminum-track-12v-led-lights-2-pack", image: "/images/products/aluminum-track.webp", alt: "Aluminum soffit track pre-drilled for five puck lights" },
  { name: "WiFi Controllers", note: "2 and 4 channel, app controlled", href: "/product-category/controllers", image: "/images/products/controller-2ch.webp", alt: "2-channel 12V WiFi LED controller" },
  { name: "Power Supplies", note: "60 W to 300 W, all 12V", href: "/product-category/power-supplies", image: "/images/products/power-supply-150w.webp", alt: "12V 150 watt weatherproof LED power supply" },
  { name: "Extension Connectors", note: "1, 5, 10 and 20 ft jumpers", href: "/product-category/connectors", image: "/images/products/connector-5ft.webp", alt: "5 ft extension connector cable for 12V puck lights" },
  { name: "T-Connectors & Injection", note: "Branch a run or feed it mid-way", href: "/product/t-power-injection-connector-for-12-24v-led", image: "/images/products/t-power-injection.webp", alt: "Power injection T-connector for 12V LED track lighting" },
  { name: "Data Amplifier", note: "Keeps long runs in step", href: "/product/amplifier-for-12v-led-lights", image: "/images/products/amplifier.webp", alt: "Data signal amplifier for long 12V LED lighting runs" },
  { name: "Soffit Screws", note: "Colour-matched, 100 to a box", href: "/product-category/hardware", image: "/images/products/screws-white.webp", alt: "Box of 100 white colour-matched soffit screws" }
];

export function PartsByType() {
  return (
    <section className="border-t border-[var(--color-border)]">
      <div className="shell section">
        <h2 className="font-display h2-fluid track-title">Shop parts by type</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-soft)]">
          Adding a run to the garage, replacing a strand or building your own layout? Everything in a kit is also on the shelf by itself, and it is all 12V, so any part works with any other.
        </p>
        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-4">
          {PART_TILES.map((t) => (
            <li key={t.name}>
              <Link href={t.href} className="group block text-center">
                <span className="relative block aspect-square overflow-hidden border border-[var(--color-border)] bg-white transition group-hover:border-[var(--color-accent)]">
                  <Image src={t.image} alt={t.alt} fill sizes="(max-width: 768px) 50vw, 240px" className="object-contain p-5" />
                </span>
                <span className="mt-3 block text-[1.0625rem] text-[var(--color-ink)] group-hover:underline">{t.name}</span>
                <span className="mt-0.5 block text-sm text-[var(--color-muted)]">{t.note}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center">
          <Link href="/shop" className="btn-secondary">See every part</Link>
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   The three promises, stated once and plainly.
---------------------------------------------------------------------------- */
export function Promises() {
  const items: { title: string; body: string; href: string; link: string; icon: React.ReactNode }[] = [
    {
      title: "Free shipping, every order",
      body: "A 250 ft kit or a single connector, to any address in Canada. There is no minimum and nothing is added at checkout but tax.",
      href: "/shipping-returns",
      link: "Shipping details",
      icon: <path d="M2 7h11v9H2zM13 10h4l3 3v3h-7zM6.5 19.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4zM16.5 19.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4z" />
    },
    {
      title: "Free pickup in Woodstock",
      body: `Close to Highway 401 or 403? Choose pickup at checkout and collect your order at ${BRAND.street} once we email that it is ready.`,
      href: "/shipping-returns#pickup",
      link: "How pickup works",
      icon: <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
    },
    {
      title: "Five-year parts warranty",
      body: "If a light, controller or power supply fails from a defect inside five years, we replace it. Send a photo and your order number.",
      href: "/warranty",
      link: "Read the warranty",
      icon: <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6zM8.8 12l2.3 2.3 4.2-4.5" />
    }
  ];
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-warm)]">
      <div className="shell grid gap-8 py-10 md:grid-cols-3 md:gap-10">
        {items.map((it) => (
          <div key={it.title} className="text-center">
            <svg aria-hidden width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-[var(--color-ink)]">{it.icon}</svg>
            <h3 className="font-display mt-3 text-[1.2rem]">{it.title}</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[var(--color-text-soft)]">{it.body}</p>
            <Link href={it.href} className="text-link mt-2 inline-flex min-h-[40px] items-center text-sm">{it.link}</Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   Day and night: the reason it is a track and not a string.
---------------------------------------------------------------------------- */
export function DayNight() {
  return (
    <section>
      <div className="shell section">
        <h2 className="font-display h2-fluid track-title">Why a track, and not a string?</h2>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          <figure>
            <Photo name="home-day-hidden" ratio="aspect-[16/10]" sizes="(max-width: 768px) 100vw, 560px" />
            <figcaption className="mt-2 text-sm text-[var(--color-text-soft)]"><strong className="text-[var(--color-text)]">By day.</strong> The track is painted to match the soffit, so the roofline reads as trim.</figcaption>
          </figure>
          <figure>
            <Photo name="home-night-lit" ratio="aspect-[16/10]" sizes="(max-width: 768px) 100vw, 560px" />
            <figcaption className="mt-2 text-sm text-[var(--color-text-soft)]"><strong className="text-[var(--color-text)]">By night.</strong> The same house, every light pointed down the wall and set from your phone.</figcaption>
          </figure>
        </div>
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-[var(--color-text-soft)]">
          <p>
            <strong className="text-[var(--color-text)]">Short answer:</strong> a track holds every light at the same spacing and the same angle, hides the wire, and comes apart if you ever need to swap a light.
          </p>
          <p>
            <strong className="text-[var(--color-text)]">Long answer:</strong> string-style permanent lights stick or clip to the fascia one light at a time, and the wire between them is in plain view all day. A track is a rigid aluminum channel that screws up under the soffit. The lights press into pre-drilled holes, the cable sits inside the channel, and from the street you see a straight, even row at night and very little at noon. It takes a drill and more time on the ladder than a stick-on string does.
          </p>
          <p>
            <Link href="/how-it-works" className="text-link">How track lighting goes together</Link>
            <span className="mx-2 text-[var(--color-border-strong)]">|</span>
            <Link href="/brands" className="text-link">How the big brands compare</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   Guides: a plain list, grouped the way people ask.
---------------------------------------------------------------------------- */
export function GuideList({ slugs }: { slugs: string[] }) {
  const picks = slugs.map((s) => ARTICLES.find((a) => a.slug === s)).filter((a): a is (typeof ARTICLES)[number] => !!a);
  return (
    <section className="border-t border-[var(--color-border)]">
      <div className="shell section">
        <h2 className="font-display h2-fluid track-title">Guides &amp; how-to</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-soft)]">
          We would rather you order the right thing once. These are the questions we answer most, written down.
        </p>
        <ul className="mx-auto mt-9 grid max-w-5xl gap-x-10 md:grid-cols-2">
          {picks.map((a) => (
            <li key={a.slug} className="border-t border-[var(--color-border)] py-4">
              <Link href={`/resources/${a.slug}`} className="group block">
                <span className="eyebrow text-[var(--color-gold-text)]">{a.category}</span>
                <span className="font-display mt-1 block text-[1.15rem] leading-snug group-hover:underline">{a.title}</span>
                <span className="mt-1 line-clamp-2 block text-sm text-[var(--color-text-soft)]">{a.excerpt}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Link href="/resources" className="btn-secondary">All guides</Link>
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   Questions: short answers.
---------------------------------------------------------------------------- */
export function homeFaq(low: number, high: number): { q: string; a: string }[] {
  return [
    { q: "What is permanent track lighting?", a: "An aluminum channel that screws up under your soffit and holds a row of 12V colour-changing LED lights. It stays on the house all year. By day it looks like part of the trim, and at night you pick the colour from an app on your phone." },
    { q: "How much does a kit cost?", a: `Kits run from ${formatCad(low, 0)} for 50 feet to ${formatCad(high, 0)} for 250 feet, before tax. That price includes the track, the lights, the WiFi controller, the power supplies, the connectors, the screws and the shipping.` },
    { q: "Is shipping really free on everything?", a: "Yes. Every order ships free to any address in Canada, whether it is a full kit or one connector. There is no minimum order and no flat rate. If you are near Woodstock, Ontario you can also choose free pickup at checkout." },
    { q: "Can I pick up my order?", a: `Yes. Choose pickup at checkout and collect it at ${BRAND.address}. Please wait for our "ready for pickup" email before you drive over; it usually comes within one to two business days.` },
    { q: "Can I install it myself?", a: "If you are comfortable on a ladder with a drill, yes. The track screws to the soffit, the lights press in, the connectors twist together and the power supply plugs into an outdoor GFCI outlet. A bungalow front is an afternoon. Two storeys is a harder job and worth a second person or an installer." },
    { q: "How is this different from Gemstone or Govee?", a: "Gemstone and similar dealer brands use a track like this one but are sold only through installers at a per-foot installed price. Govee and similar retail kits are low-cost light strings that stick or clip to the fascia. Our kits are track hardware sold direct for you to install. The brand comparison page lays out the differences." },
    { q: "Are all your parts 12V?", a: "Yes. Every light, controller, power supply and connector in the store is 12V, so any part works with any other and nothing can be plugged into the wrong supply." },
    { q: "Will it survive a Canadian winter?", a: "The lights and connectors are sealed to IP68 and the hardware is tested to −40 °C. The aluminum track sheds snow and ice. Nothing comes down in January." }
  ];
}

export function FaqList({ faq }: { faq: { q: string; a: string }[] }) {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-warm)]">
      <div className="shell section">
        <h2 className="font-display h2-fluid track-title">Questions, short answers</h2>
        <div className="mx-auto mt-9 max-w-3xl border-t border-[var(--color-border-strong)]">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-[var(--color-border-strong)]">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-[1.0625rem] font-semibold text-[var(--color-ink)]">
                {f.q}
                <span aria-hidden className="text-xl leading-none text-[var(--color-muted)] transition group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 pr-6 leading-relaxed text-[var(--color-text-soft)]">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/faq" className="text-link">Every question we get asked</Link>
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   Who we are and where to find us.
---------------------------------------------------------------------------- */
export function VisitUs() {
  return (
    <section>
      <div className="shell section grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div>
          <p className="eyebrow text-[var(--color-gold-text)]">About Illumi</p>
          <h2 className="font-display h2-fluid mt-2">A lighting shop in Woodstock, Ontario.</h2>
          <div className="mt-4 space-y-4 text-[var(--color-text-soft)]">
            <p>
              We sell one kind of lighting: 12V LED lights that sit in an aluminum track under the eaves and stay there. We stock the kits and every part that goes in them, we ship all of it free, and we install it ourselves around Southwestern Ontario.
            </p>
            <p>
              Not sure what size you need? Send us the lengths of the edges you want lit, or a photo of the house, and we will tell you which kit fits and whether you need anything else. If the honest answer is a smaller kit, that is the answer you will get.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact-us" className="btn-primary">Ask us a question</Link>
            <Link href="/about" className="btn-secondary">About the shop</Link>
          </div>
        </div>
        <div className="border border-[var(--color-border)] p-6">
          <h3 className="eyebrow text-[var(--color-gold-text)]">Pickup address</h3>
          <address className="font-display mt-2 text-[1.35rem] not-italic leading-snug">
            {BRAND.street}
            <br />
            {BRAND.city}, {BRAND.regionCode} {BRAND.postal}
          </address>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-soft)]">
            Pickups are by appointment. Choose pickup at checkout, wait for the email that says your order is ready, then come by. There is no charge.
          </p>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-[40px] items-center">Open in Google Maps</a>
            <Link href="/shipping-returns#pickup" className="text-link inline-flex min-h-[40px] items-center">Pickup details</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
