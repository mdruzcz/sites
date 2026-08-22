import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";
import { getStore, primaryImage, type CatalogProduct } from "@/lib/catalog";
import { PermanentLightsConfigurator } from "@/components/permanent-lights-configurator";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/photos";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export const metadata = {
  title: "Permanent LED Lights — Aluminum-Tracked RGBW Housing Kits",
  description:
    "Complete permanent LED lighting kits: aluminum track, RGBW pucks, controller, power supply and connectors. Pick 50ft to 200ft. Free Canadian shipping over $500.",
  alternates: { canonical: `${SITE_URL}/permanent-lights` },
  openGraph: {
    title: "Permanent LED Lights — Aluminum-Tracked RGBW Housing Kits",
    description:
      "Complete permanent LED lighting kits from 50ft to 200ft, shipped from London, Ontario.",
    url: `${SITE_URL}/permanent-lights`,
    images: [{ url: "/images/photos/track-night-glow.webp", width: 1600, height: 1067 }]
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
      <ColourStrip />
      <ConfiguratorSection packages={packages} />
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
    <section className="relative isolate">
      <Photo
        name="track-night-glow"
        alt="Roofline of a home glowing with warm-white permanent LED track lighting at night"
        ratio="aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/8]"
        sizes="100vw"
        priority
        scrim="strong"
      />
      <div className="absolute inset-0 flex items-end">
        <div className="shell pb-12 md:pb-20">
          <p className="eyebrow text-[var(--color-gold-bright)]">Flagship — Permanent Lights</p>
          <h1 className="font-display mt-4 max-w-3xl text-[2.3rem] leading-tight text-white md:text-[3.75rem]">
            Soffit-mounted LED lighting,
            <span className="block text-[var(--color-gold-bright)]">installed once.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-white/80">
            Discreet aluminum tracks, RGBW LED pucks, smart-app control and the full hardware bundle,
            delivered as one complete kit. Available in 50, 75, 100, 125, 150, 175 and 200 linear-foot sizes.
          </p>
          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-xs uppercase tracking-[0.14em] text-white/70">
            <li>5-year warranty</li>
            <li>CSA Class 2</li>
            <li>IP68 weatherproof</li>
            <li>−40°C tested</li>
          </ul>
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
          One install. Every scene below is the same set of lights, changed from the app.
        </p>
        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {COLOUR_SCENES.map((s) => (
            <figure key={s.photo} className="group relative isolate overflow-hidden rounded-xl">
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

function ConfiguratorSection({ packages }: { packages: CatalogProduct[] }) {
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="shell section">
        <div className="max-w-3xl">
          <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Step 1 — Pick your kit</p>
          <h2 className="font-display mt-6 text-[2.1rem] md:text-[3rem]">Match your home perimeter.</h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
            Measure the rooflines, soffits or fascia you want lit, then pick the kit that covers it — a
            little extra never hurts. Every kit includes lights, aluminum tracks, controller, power supply,
            T-connectors, extension cables, screws, drill bit and fuses.
          </p>
        </div>

        <div className="mt-12">
          <PermanentLightsConfigurator
            options={packages.map((p) => {
              const variants = (p.ecom_variants ?? []).filter((v) => v.is_active);
              const minPrice = variants.length ? Math.min(...variants.map((v) => Number(v.price_cad))) : 0;
              const colors = Array.from(
                new Set(
                  variants
                    .filter((v) => v.attribute_type?.toLowerCase() === "color")
                    .map((v) => v.attribute_value ?? "")
                    .filter(Boolean)
                )
              );
              return {
                slug: p.slug,
                name: p.name,
                footage: parseInt(p.slug.replace(/.*-(\d+).*/, "$1"), 10) || 0,
                price: minPrice,
                colors,
                image: primaryImage(p)?.public_url ?? null,
                firstVariantId:
                  variants.find((v) => v.attribute_value?.toLowerCase() === "white")?.id ??
                  variants[0]?.id ??
                  null
              };
            })}
          />
        </div>
      </div>
    </section>
  );
}

const BOX_CONTENTS: [string, string, string][] = [
  ["24V RGBW LED Lights", "160 ×", "5 lights per metre of track, individually addressable"],
  ["Aluminum Tracks (1 m / 3.28 ft)", "31 ×", "5-hole pre-drilled, beige / black / brown / white"],
  ["Box of colour-matching screws", "1 ×", "5/8″ soffit screws (white or black to match track)"],
  ["Controller", "1 ×", "WiFi-enabled, free Android and iOS app"],
  ["300 W Power Supply (24V Controller)", "1 ×", "CSA Class 2"],
  ["20 ft / 10 ft / 5 ft / 1 ft Connectors", "2 / 2 / 1 / 2", "Plug-and-play, waterproof"],
  ["T-Connector for 2-run splits", "1 ×", "Branch around corners and second storeys"],
  ["T-power injection connectors", "2 ×", "Maintains brightness on long runs"],
  ["20 ft Power INJ Extension Cable", "2 ×", "For runs over 120 lights"],
  ["20 ft PWR INJ Cable for Controller", "1 ×", "Connects controller to first run"],
  ["Robertson drill bit", "1 ×", "For the included soffit screws"],
  ["7.5 amp controller fuses", "2 ×", "Spare protection"]
];

function WhatsIncluded() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="shell section">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Step 2 — In the box</p>
            <h2 className="font-display mt-6 text-[2.1rem] md:text-[3rem]">
              Everything you need, one delivery.
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
              The list below is a 100&prime; kit. Larger kits scale proportionally.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <Photo
                name="detail-led-pucks"
                ratio="aspect-[3/2]"
                sizes="(max-width: 1024px) 50vw, 420px"
                rounded="rounded-2xl"
              />
              <Photo
                name="detail-track-mounting"
                ratio="aspect-[3/2]"
                sizes="(max-width: 1024px) 50vw, 420px"
                rounded="rounded-2xl"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
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
            <p className="eyebrow text-[var(--color-gold-bright)]">Step 3 — Smart control</p>
            <h2 className="font-display mt-5 text-[2.1rem] md:text-[3rem]">
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
              rounded="rounded-3xl"
            />
            <div className="rounded-3xl border border-white/12 bg-white/5 p-8 text-center backdrop-blur">
              <p className="font-display text-5xl text-[var(--color-gold-bright)] md:text-6xl">2850K</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/60">to 6500K</p>
              <div className="mt-6 grid grid-cols-6 gap-2">
                {["#fff4d6", "#fffadc", "#ffffee", "#f3faff", "#e6f1ff", "#d8ebff"].map((c) => (
                  <div key={c} className="h-7 rounded-md" style={{ background: c }} />
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
          <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">The specs</p>
          <h2 className="font-display mt-6 text-[2.1rem] md:text-[3rem]">Built for serious lighting.</h2>
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
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Backed by warranty</p>
            <h2 className="font-display mt-6 text-[2.1rem] md:text-[3rem]">5-year parts warranty.</h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
              We repair or replace any kit component that fails from a manufacturing defect within five years
              of purchase. The warranty excludes damage from improper installation, electrical surges and
              normal wear.
            </p>
            <Link href="/warranty" className="btn-secondary mt-8">
              See the full warranty
            </Link>
          </div>
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-10 text-center">
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
        name="home-install-1"
        alt="Completed permanent LED lighting install on a two-storey home"
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
