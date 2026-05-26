import Link from "next/link";
import Image from "next/image";
import { getServerSupabase } from "@/lib/supabase/server";
import { getStore, primaryImage, type CatalogProduct } from "@/lib/catalog";
import { DiyKitsConfigurator } from "@/components/diy-kits-configurator";
import { SITE_URL, formatCad } from "@/lib/utils";

export const revalidate = 3600;

export const metadata = {
  title: "Permanent Lights — Aluminum-tracked RGBW LED housing packages",
  description:
    "Complete permanent LED lighting kits — aluminum tracks, RGBW pucks, controller, power supply and connectors. Pick your linear footage from 50ft to 200ft. Free shipping over $500 in Canada.",
  alternates: { canonical: `${SITE_URL}/diy-kits` }
};

export default async function PermanentLightsPage() {
  const store = await getStore();
  const supabase = await getServerSupabase();

  // Fetch the LED housing packages + the standalone tracks/pucks
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
    <section className="relative overflow-hidden bg-[var(--color-night)] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-night)] via-[#0f1e36] to-[var(--color-night)]" />
      <div className="pointer-events-none absolute inset-x-0 top-1/3 hidden gap-3 px-8 md:flex md:justify-between md:px-16">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className={`twinkle twinkle-delay-${(i % 5) as 0 | 1 | 2 | 3 | 4} inline-block size-1.5 rounded-full bg-[var(--color-gold)]`}
            style={{ boxShadow: "0 0 10px 2px rgba(212,175,55,0.55)" }}
          />
        ))}
      </div>
      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center md:py-28">
        <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[var(--color-gold)]">
          ★ Flagship — Permanent Lights
        </p>
        <h1 className="font-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
          Soffit-mounted LED lighting,<br />
          <span className="text-[var(--color-gold)]">installed once.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
          Discreet aluminum tracks, RGBW LED pucks, smart-app control, and the full hardware bundle —
          delivered as a complete kit. Available in 50, 75, 100, 125, 150, 175 and 200 linear-foot sizes.
        </p>
        <p className="mt-6 text-xs uppercase tracking-wider text-slate-400">
          5-year warranty · CSA Class 2 · IP68 weatherproof · −40°C tested
        </p>
      </div>
    </section>
  );
}

function ConfiguratorSection({ packages }: { packages: CatalogProduct[] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand)]">Step 1 — Pick your kit</p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">Match your home perimeter.</h2>
          <p className="mt-3 text-slate-600">
            Measure the rooflines, soffits or fascia you want to light. Pick the kit that covers it (a
            little extra never hurts). Each kit includes lights, aluminum tracks, controller, power supply,
            T-connectors, extension cables, screws, drill bit and fuses.
          </p>
        </div>

        <DiyKitsConfigurator
          options={packages.map((p) => {
            const variants = (p.ecom_variants ?? []).filter((v) => v.is_active);
            const minPrice = variants.length
              ? Math.min(...variants.map((v) => Number(v.price_cad)))
              : 0;
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
    </section>
  );
}

function WhatsIncluded() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand)]">Step 2 — What&rsquo;s in the box</p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">
            Everything you need to install in one delivery.
          </h2>
          <p className="mt-3 text-slate-600">
            Example for a 100&prime; kit. Larger kits scale proportionally.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
          <ul className="divide-y divide-[var(--color-border)]">
            {[
              ["24V RGBW LED Lights", "160 ×", "5 lights per metre of track, individually addressable"],
              ["Aluminum Tracks (1 m / 3.28 ft)", "31 ×", "5-hole pre-drilled, beige / black / brown / white"],
              ["Box of color-matching screws", "1 ×", "5/8″ soffit screws (white/black to match track)"],
              ["Controller", "1 ×", "WiFi-enabled, free Android & iOS app"],
              ["300 W Power Supply (24V Controller)", "1 ×", "CSA Class 2"],
              ["20 ft / 10 ft / 5 ft / 1 ft Connectors", "2 / 2 / 1 / 2", "Plug-and-play, waterproof"],
              ["T-Connector for 2-run splits", "1 ×", "Branch around corners and second stories"],
              ["T-power injection connectors", "2 ×", "Maintains brightness on long runs"],
              ["20 ft Power INJ Extension Cable", "2 ×", "For runs over 120 lights"],
              ["20 ft PWR INJ Cable for Controller", "1 ×", "Connects controller to first run"],
              ["Robertson drill bit", "1 ×", "For the included soffit screws"],
              ["7.5 amp controller fuses", "2 ×", "Spare protection"]
            ].map(([part, qty, note]) => (
              <li key={part} className="grid grid-cols-[1.5fr_auto_2fr] items-center gap-4 px-5 py-3 text-sm">
                <span className="font-medium">{part}</span>
                <span className="text-right font-mono text-xs text-[var(--color-brand)]">{qty}</span>
                <span className="text-slate-500">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SmartControl() {
  return (
    <section className="bg-[var(--color-brand)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow text-[var(--color-gold)]">Step 3 — Smart control</p>
            <h2 className="font-display mt-2 text-3xl md:text-4xl">
              Every holiday, every color, from your phone.
            </h2>
            <p className="mt-4 text-emerald-50">
              The included WiFi controller pairs with our free Android &amp; iOS app. Change colors,
              schedule shows, dim sections, or trigger pre-built effects — from anywhere in the world.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-emerald-50">
              <li>✓ 16M colors (RGBW)</li>
              <li>✓ Pre-built holiday scenes</li>
              <li>✓ Schedule on/off + sunset triggers</li>
              <li>✓ Dim per-section</li>
              <li>✓ Voice control via Alexa / Google</li>
              <li>✓ Remote access worldwide</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
            <p className="font-display text-7xl text-[var(--color-gold)]">2850K</p>
            <p className="text-sm uppercase tracking-wide text-emerald-100">to 6500K</p>
            <p className="mt-2 text-xs text-emerald-200">Warm white → Daylight</p>
            <div className="mt-6 grid grid-cols-6 gap-2">
              {["#fff4d6", "#fffadc", "#ffffee", "#f3faff", "#e6f1ff", "#d8ebff"].map((c, i) => (
                <div key={i} className="h-6 rounded" style={{ background: c }} />
              ))}
            </div>
            <p className="mt-6 text-xs text-emerald-200">
              Plus every RGB color in the wheel for holidays + events
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Specs() {
  const specs = [
    { value: "46", unit: "lumens", label: "Per puck at max brightness" },
    { value: "0.3", unit: "W", label: "Per LED · ultra efficient" },
    { value: "50k", unit: "hours", label: "20+ years typical use" },
    { value: "−40°C", unit: "tested", label: "Built for Canadian winters" },
    { value: "IP68", unit: "rated", label: "Underwater-grade weatherproofing" },
    { value: "CSA", unit: "Class 2", label: "Low-voltage safety certified" }
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="eyebrow text-[var(--color-brand)]">The specs</p>
        <h2 className="font-display mt-2 text-3xl md:text-4xl">Built for serious lighting.</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {specs.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl text-[var(--color-brand)]">
                {s.value}
                <span className="ml-1 text-sm font-medium uppercase tracking-wide text-slate-500">
                  {s.unit}
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Warranty() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow text-[var(--color-brand)]">Backed by warranty</p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">
            5-year parts warranty.
          </h2>
          <p className="mt-3 text-slate-600">
            We&rsquo;ll repair or replace any kit component that fails due to a manufacturing defect within
            5 years of purchase. Warranty excludes damage from improper install, electrical surges, and
            normal wear &mdash; standard stuff.
          </p>
          <Link
            href="/warranty"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] hover:underline"
          >
            See the full warranty →
          </Link>
        </div>
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm border border-[var(--color-border)]">
          <p className="font-display text-8xl text-[var(--color-brand)]">5</p>
          <p className="eyebrow text-slate-500">years parts coverage</p>
          <div className="mt-6 h-px bg-[var(--color-border)]" />
          <p className="mt-6 text-sm text-slate-600">
            Local Canadian support &mdash; we ship from London, ON and answer phones from London, ON.
          </p>
        </div>
      </div>
    </section>
  );
}

function InstallerCTA() {
  return (
    <section className="bg-[var(--color-night)] text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-20 text-center">
        <p className="eyebrow text-[var(--color-gold)]">For pros &amp; municipalities</p>
        <h2 className="font-display max-w-3xl text-3xl md:text-5xl">
          Selling permanent lighting?<br />
          <span className="text-[var(--color-gold)]">Get installer pricing.</span>
        </h2>
        <p className="max-w-xl text-slate-300">
          Apply for the Pro Installer or Municipality program for tier pricing, priority fulfillment,
          and net-30 invoicing on bulk orders.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link href="/professional-installer" className="btn-gold">
            Apply as installer →
          </Link>
          <Link href=" /installers" className="btn-ghost-light">
            Municipality program →
          </Link>
        </div>
      </div>
    </section>
  );
}

const _formatCadUsed = formatCad; // keep formatter imported even if unused in this slice
export const _ = _formatCadUsed;
