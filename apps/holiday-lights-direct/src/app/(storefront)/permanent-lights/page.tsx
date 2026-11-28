import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";
import { getStore, type CatalogProduct } from "@/lib/catalog";
import { cardCheckoutEnabled } from "@/lib/card-checkout";
import { PermanentLightsConfigurator, type ConfigOption } from "@/components/permanent-lights-configurator";
import { KitSizeGrid } from "@/components/kit-coverage";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/photos";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export const metadata = {
  title: "Permanent LED Lights & RGBW Track Kits",
  description:
    "Complete 12V permanent LED kits: aluminum track, RGBW pucks, controller, power supply and every connector. Six sizes, 50 to 250 ft.",
  alternates: { canonical: `${SITE_URL}/permanent-lights` },
  openGraph: {
    title: "Permanent LED Lights & RGBW Track Kits",
    description:
      "Complete 12V permanent LED lighting kits from 50 to 250 ft, shipped from London, Ontario.",
    url: `${SITE_URL}/permanent-lights`,
    images: [{ url: "/images/photos/stone-bungalow-night.webp", width: 1600, height: 900 }]
  }
};

export default async function PermanentLightsPage() {
  const store = await getStore();
  const supabase = await getServerSupabase();

  const { data: housingData } = await supabase
    .from("ecom_products")
    .select(
      "id, slug, name, short_description, long_description, status, ecom_variants(id, sku, name, price_cad, attribute_type, attribute_value, is_active), ecom_product_images(id, public_url, alt_text, sort_order, is_primary)"
    )
    .eq("store_id", store?.id ?? "")
    .eq("status", "active")
    .like("slug", "led-housing-package-%")
    .order("name");

  const packages = ((housingData ?? []) as unknown as CatalogProduct[]).sort((a, b) => {
    const num = (s: string) => parseInt(s.replace(/[^0-9]/g, ""), 10) || 0;
    return num(a.slug) - num(b.slug);
  });

  const options: ConfigOption[] = packages.map((p) => {
    const active = (p.ecom_variants ?? []).filter((v) => v.is_active);
    const coloured = active.filter((v) => v.attribute_type?.toLowerCase() === "color" && v.attribute_value);
    return {
      slug: p.slug,
      name: p.name,
      footage: parseInt(p.slug.replace(/.*-(\d+).*/, "$1"), 10) || 0,
      variants: (coloured.length ? coloured : active).map((v) => ({
        id: v.id,
        color: v.attribute_type?.toLowerCase() === "color" ? (v.attribute_value ?? "") : "",
        price: Number(v.price_cad)
      }))
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Permanent LED Lighting Kits",
    itemListElement: packages.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/product/${p.slug}`,
      name: p.name
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero />
      <KitSizes options={options} />
      <ConfiguratorSection options={options} />
      <ColourStrip />
      <WhatsIncluded />
      <SmartControl />
      <Specs />
      <Warranty />
      <InstallerCTA />
    </>
  );
}

function Hero() {
  return (
    <PageHero
      size="lg"
      photo="stone-bungalow-night"
      position="center 40%"
      crumb="Permanent lights"
      eyebrow="Permanent LED lighting kits"
      title="Light the roofline once. Change it from your phone."
      intro="Discreet aluminum track, 12V RGBW pucks, a WiFi controller and every connector, delivered as one complete kit. Six sizes from 50 to 250 feet, in black, white, wicker or brown track."
    >
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a href="#build" className="btn-hero group sm:min-w-[18rem]">
          Build your kit
          <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a href="#sizes" className="btn-ghost-light min-h-[54px]">
          See what each size covers
        </a>
      </div>
      <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-white/85">
        {["5-year warranty", "CSA Class 2", "IP68 weatherproof", "Tested to \u221240\u00b0C"].map((p) => (
          <li key={p} className="flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#ffd24a]" />
            {p}
          </li>
        ))}
      </ul>
    </PageHero>
  );
}

function KitSizes({ options }: { options: ConfigOption[] }) {
  return (
    <section id="sizes" className="bg-[var(--color-bg)]">
      <div className="shell section">
        <div className="max-w-3xl">
          <p className="eyebrow-plain">Which size fits</p>
          <h2 className="section-title mt-3">Six kits, drawn against the home each one covers.</h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
            Each kit is drawn on the kind of home it typically covers, from a bungalow front to a wide
            estate. Use them to find your ballpark, then measure your own roofline before you order.
          </p>
        </div>
        <div className="mt-10">
          <KitSizeGrid
            kits={options.map((o) => ({
              footage: o.footage,
              slug: o.slug,
              priceFrom: o.variants.length ? Math.min(...o.variants.map((v) => v.price)) : null
            }))}
          />
        </div>
      </div>
    </section>
  );
}

const COLOUR_SCENES: { photo: PhotoKey; label: string }[] = [
  { photo: "home-christmas-warm-white", label: "Christmas" },
  { photo: "home-red-canada-day", label: "Canada Day" },
  { photo: "home-pink-magenta", label: "Valentine's" },
  { photo: "home-green-roofline", label: "St. Patrick's" },
  { photo: "home-blue-app-control", label: "Everyday cool" },
  { photo: "home-rainbow", label: "Full spectrum" }
];

function ColourStrip() {
  return (
    <section className="bg-[var(--color-ink-deep)]">
      <div className="shell py-16 md:py-20">
        <p className="text-center text-sm text-white/60">
          One install, every occasion. Each scene below is a colour you can set from the app.
        </p>
        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {COLOUR_SCENES.map((s) => (
            <figure key={s.photo} className="group relative isolate overflow-hidden rounded-[14px]">
              <Photo
                name={s.photo}
                ratio="aspect-square"
                sizes="(max-width: 640px) 50vw, 200px"
                scrim="soft"
                className="transition duration-500 group-hover:scale-[1.06]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 text-center text-xs font-semibold text-white">
                {s.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConfiguratorSection({ options }: { options: ConfigOption[] }) {
  return (
    <section id="build" className="bg-[var(--color-bg-warm)]">
      <div className="shell section">
        <div className="max-w-3xl">
          <p className="eyebrow-plain">Build your kit</p>
          <h2 className="section-title mt-3">Pick a length and a track colour.</h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
            Measure the rooflines, soffits or fascia you want lit, then pick the kit that covers it. Every
            kit ships with a little more track than its nominal length for corners and offcuts, and includes
            the lights, aluminum track, WiFi controller, power supplies, every connector and colour-matched
            screws. Same hardware and the same kit pricing as our installer partner, Forever Lights.
          </p>
        </div>

        <div className="mt-10">
          <PermanentLightsConfigurator options={options} cardCheckout={cardCheckoutEnabled()} />
        </div>
      </div>
    </section>
  );
}

const BOX_CONTENTS: [string, string, string][] = [
  ["12V 5-Light RGBW Strands", "31 ×", "155 sealed, individually addressable puck lights, five per lead"],
  ["Aluminum Track, 42″ with 8″ spacing", "31 ×", "About 109 ft of track in black, white, wicker or brown"],
  ["150 W Power Supply, 12V", "2 ×", "Plugs into an existing GFCI outlet, so no electrical permit"],
  ["WiFi Controller", "1 ×", "Free Android and iOS app; scenes and schedules stored on board"],
  ["1 ft / 5 ft / 10 ft / 20 ft Light Extension Connectors", "2 / 1 / 2 / 2", "Sealed twist fittings, no cutting or soldering"],
  ["Power T Connector", "1 ×", "Feeds power into two directions from one supply"],
  ["Light Extension T Connector", "1 ×", "Branch the run left and right from a single start point"],
  ["20 ft Power Extension Connector", "1 ×", "Lets the supply live somewhere sheltered"],
  ["Data Amplifier", "1 ×", "Keeps the far end of a long run in sync"],
  ["Box of colour-matched screws", "1 ×", "5/8″ soffit screws matched to stock track colours"]
];

function WhatsIncluded() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="shell section">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div>
            <p className="eyebrow-plain">In the box</p>
            <h2 className="section-title mt-3">
              Everything you need, one delivery.
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
              The list below is the 100&prime; kit. Quantities scale with the size, and every kit page lists its exact contents.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <Photo
                name="detail-led-pucks"
                ratio="aspect-[3/2]"
                sizes="(max-width: 1024px) 50vw, 420px"
                rounded="rounded-[14px]"
              />
              <Photo
                name="detail-track-mounting"
                ratio="aspect-[3/2]"
                sizes="(max-width: 1024px) 50vw, 420px"
                rounded="rounded-[14px]"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-[var(--color-border)] bg-white">
            <ul className="divide-y divide-[var(--color-border)]">
              {BOX_CONTENTS.map(([part, qty, note]) => (
                <li key={part} className="px-6 py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-semibold">{part}</span>
                    <span className="shrink-0 rounded-full bg-[var(--color-gold-soft)] px-2.5 py-0.5 text-xs font-bold text-[var(--color-gold-text)]">
                      {qty}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-muted)]">{note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SmartControl() {
  return (
    <section className="bg-[var(--color-ink)] text-white">
      <div className="shell section">
        <div className="grid gap-14 md:grid-cols-2 md:items-center md:gap-20">
          <div>
            <p className="eyebrow text-[var(--color-gold-bright)]">Smart control</p>
            <h2 className="section-title mt-3">
              Every holiday, every colour, from your phone.
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-white/75">
              The included WiFi controller pairs with our free Android and iOS app. Change colours, schedule
              shows, dim sections or trigger pre-built effects from anywhere in the world.
            </p>
            <ul className="mt-9 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {[
                "16M colours (RGBW)",
                "Pre-built holiday scenes",
                "Schedule on/off + sunset triggers",
                "Dim per section",
                "Voice control via Alexa / Google",
                "Remote access worldwide"
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-gold-bright)]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <Photo
              name="home-blue-app-control"
              ratio="aspect-[4/3]"
              sizes="(max-width: 768px) 100vw, 480px"
              rounded="rounded-[14px]"
            />
            <div className="rounded-[14px] border border-white/12 bg-white/5 p-8 text-center backdrop-blur">
              <p className="font-display text-5xl text-[var(--color-gold-bright)] md:text-6xl">2850K</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/60">to 6500K</p>
              <div className="mt-6 grid grid-cols-6 gap-2">
                {["#fff4d6", "#fffadc", "#ffffee", "#f3faff", "#e6f1ff", "#d8ebff"].map((c) => (
                  <div key={c} className="h-7 rounded-[10px]" style={{ background: c }} />
                ))}
              </div>
              <p className="mt-5 text-xs text-white/55">
                Warm white through daylight, plus every RGB colour in the wheel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Specs() {
  const specs = [
    { value: "46", unit: "lumens", label: "Per puck at max brightness" },
    { value: "0.3", unit: "W", label: "Per LED — ultra efficient" },
    { value: "50k", unit: "hours", label: "20+ years of typical use" },
    { value: "−40°C", unit: "tested", label: "Built for Canadian winters" },
    { value: "IP68", unit: "rated", label: "Underwater-grade weatherproofing" },
    { value: "CSA", unit: "Class 2", label: "Low-voltage safety certified" }
  ];
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow-plain">The specs</p>
          <h2 className="section-title mt-3">Built for serious lighting.</h2>
        </div>
        <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
          {specs.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-[1.9rem] leading-none text-[var(--color-gold-text)] sm:text-[2.25rem]">
                {s.value}
                <span className="mt-2 block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)] sm:ml-1.5 sm:mt-0 sm:inline sm:align-middle">
                  {s.unit}
                </span>
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-[var(--color-text-soft)]">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Warranty() {
  return (
    <section className="bg-[var(--color-bg-warm)]">
      <div className="shell section">
        <div className="grid gap-14 md:grid-cols-2 md:items-center md:gap-20">
          <div>
            <p className="eyebrow-plain">Backed by warranty</p>
            <h2 className="section-title mt-3">5-year parts warranty.</h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
              We repair or replace any kit component that fails from a manufacturing defect within five years
              of purchase. The warranty excludes damage from improper installation, electrical surges and
              normal wear.
            </p>
            <Link href="/warranty" className="btn-secondary mt-8">
              See the full warranty
            </Link>
          </div>
          <div className="rounded-[14px] border border-[var(--color-border)] bg-white p-10 text-center">
            <p className="font-display text-7xl leading-none text-[var(--color-gold-text)] md:text-8xl">5</p>
            <p className="eyebrow mt-4 text-[var(--color-muted)]">Years parts coverage</p>
            <div className="mx-auto mt-8 h-px w-full bg-[var(--color-border)]" />
            <p className="mt-8 text-sm leading-relaxed text-[var(--color-text-soft)]">
              Local Canadian support — we ship from London, Ontario and answer the phone from London,
              Ontario.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstallerCTA() {
  return (
    <section className="relative isolate">
      <Photo
        name="commercial-gable-wreaths"
        alt="Shingled commercial gable at night outlined in warm white LED lights with two lit wreaths"
        ratio="aspect-[4/3] sm:aspect-[16/7] md:aspect-[21/7]"
        sizes="100vw"
        scrim="strong"
      />
      <div className="absolute inset-0 flex items-center">
        <div className="shell text-center">
          <p className="eyebrow text-[var(--color-gold-bright)]">For pros &amp; municipalities</p>
          <h2 className="font-display mx-auto mt-5 max-w-3xl text-[2rem] leading-tight text-white md:text-[3.25rem]">
            Selling permanent lighting?
            <span className="block text-[var(--color-gold-bright)]">Get installer pricing.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/75">
            Apply for the Pro Installer or Municipality program for tier pricing, priority fulfillment and
            net-30 invoicing on bulk orders.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/professional-installer" className="btn-gold">
              Apply as installer
            </Link>
            <Link href="/municipalities" className="btn-ghost-light">
              Municipality program
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
