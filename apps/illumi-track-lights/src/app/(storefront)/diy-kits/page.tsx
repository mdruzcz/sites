import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { PermanentLightsConfigurator } from "@/components/permanent-lights-configurator";
import { listProducts, primaryImage } from "@/lib/catalog";
import { kits, kitBom, kitColours, kitLightCount, kitTrackFeet, kitSaving, kitPerFoot, kitComponents, getKitByFeet } from "@/lib/kits";
import { SITE_URL, formatCad } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Soffit Track Lighting Kits, 50 to 250 ft | 12V RGBW",
  description:
    "Complete soffit track lighting kits from $1,265: 12V RGBW pucks in aluminum track (black, white, wicker, brown), WiFi controller, power supplies and every connector. Ships from London, Ontario, free over $500.",
  alternates: { canonical: `${SITE_URL}/diy-kits` },
  openGraph: { title: "Soffit Track Lighting Kits, 50 to 250 ft | Illumi Track Lights", description: "Six complete 12V kits with app control, from $1,265. Ships from London, Ontario.", url: `${SITE_URL}/diy-kits`, images: ["/images/photos/home-blue-night.webp"] }
};

export default async function KitsPage() {
  const products = await listProducts();
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Permanent LED Lighting Kits",
    itemListElement: kits.map((k, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/product/${k.slug}`, name: `Permanent Lighting Kit – ${k.feet} ft` }))
  };

  const options = kits.map((k) => {
    const p = bySlug.get(k.slug);
    const variants = (p?.ecom_variants ?? []).filter((v) => v.is_active);
    return {
      slug: k.slug,
      name: `${k.feet} ft kit`,
      footage: k.feet,
      price: k.price,
      colors: kitColours.map((c) => c.label),
      variantIds: Object.fromEntries(variants.map((v) => [(v as { attribute_value?: string | null }).attribute_value ?? "", v.id])),
      image: p ? primaryImage(p)?.public_url ?? null : null,
      photo: k.photo,
      lights: kitLightCount(k),
      trackFeet: kitTrackFeet(k),
      suits: k.suits,
      saving: kitSaving(k)
    };
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        photo="home-blue-night"
        eyebrow="Soffit track kits"
        title="Six soffit track kits. Nothing left to source."
        intro="The exact 12V track-and-puck hardware our own crews install, boxed for your footage with the controller, power, connectors and colour-matched screws. Install it yourself, or have us do it in Southwestern Ontario."
        crumbs={[{ label: "Kits" }]}
      />

      <section className="bg-[var(--color-surface)]">
        <div className="shell section">
          <div className="max-w-3xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Step 1 · Pick your footage</p>
            <h2 className="font-display h2-fluid mt-5">Match the kit to your roofline.</h2>
            <p className="lead mt-4 text-[var(--color-text-soft)]">Add up every edge you want lit. Round up: a few extra feet of track is cheap, a second order is not. Not sure? <Link href="/resources/how-to-measure-your-roofline-for-permanent-lighting" className="link-underline">Read the measuring guide</Link> or <Link href="/contact-us" className="link-underline">send us a sketch</Link>.</p>
          </div>
          <PermanentLightsConfigurator options={options} />
        </div>
      </section>

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Side by side</p>
          <h2 className="font-display h2-fluid mt-5">Every kit, every part.</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-white">
            <table className="table-clean min-w-[860px]">
              <thead>
                <tr>
                  <th>Component</th>
                  {kits.map((k) => (
                    <th key={k.slug} className="text-center">{k.feet} ft</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[var(--color-accent-soft)]">
                  <td className="font-semibold">Kit price</td>
                  {kits.map((k) => <td key={k.slug} className="text-center font-semibold">{formatCad(k.price, 2)}</td>)}
                </tr>
                <tr>
                  <td>Per foot</td>
                  {kits.map((k) => <td key={k.slug} className="text-center">{formatCad(kitPerFoot(k), 2)}</td>)}
                </tr>
                <tr>
                  <td>Lights (pucks)</td>
                  {kits.map((k) => <td key={k.slug} className="text-center">{kitLightCount(k)}</td>)}
                </tr>
                <tr>
                  <td>Track supplied</td>
                  {kits.map((k) => <td key={k.slug} className="text-center">{kitTrackFeet(k)} ft</td>)}
                </tr>
                {kitComponents.map((c) => (
                  <tr key={c.key}>
                    <td>{c.name}</td>
                    {kits.map((k) => <td key={k.slug} className="text-center">{k.bom[c.key] ? `×${k.bom[c.key]}` : "—"}</td>)}
                  </tr>
                ))}
                <tr>
                  <td>Installed by us, from</td>
                  {kits.map((k) => <td key={k.slug} className="text-center text-[var(--color-muted)]">{formatCad(k.installedLow, 2)}</td>)}
                </tr>
                <tr>
                  <td className="font-semibold">You save by installing</td>
                  {kits.map((k) => <td key={k.slug} className="text-center font-semibold text-[var(--color-accent-dark)]">{formatCad(kitSaving(k), 0)}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[var(--color-muted)]">Prices in CAD before tax. Track is 42-inch pieces, so supplied length slightly exceeds the nominal kit size.</p>
        </div>
      </section>

      <section id="whats-included" className="bg-[var(--color-surface)]">
        <div className="shell section">
          <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Step 2 · What's in the box</p>
          <h2 className="font-display h2-fluid mt-5">The parts, and what each one does.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {kitComponents.map((c) => (
              <Link key={c.key} href={`/product/${c.productSlug}`} className="card card-lift group flex gap-4 p-4">
                <span className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
                  <Image src={c.image} alt={c.name} width={80} height={80} className="size-20 object-contain" />
                </span>
                <span>
                  <span className="block font-semibold transition group-hover:text-[var(--color-accent-dark)]">{c.name}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-[var(--color-text-soft)]">{c.blurb}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="smart-control" className="bg-[var(--color-ink)] text-white">
        <div className="shell section grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-gold)]">Step 3 · Smart control</p>
            <h2 className="font-display h2-fluid mt-5">Every holiday, every colour, from your phone.</h2>
            <p className="mt-4 text-white/75">The included WiFi controller runs WLED, the open lighting firmware used by installers worldwide. The free Android and iOS app handles colours, saved scenes, schedules, sunset triggers, zones and voice control through Alexa or Google Home. Scenes are stored on the controller, so a dusk-to-dawn routine keeps running even if your internet drops.</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/85">
              <li>16M colours + true warm white</li>
              <li>Pre-built holiday scenes</li>
              <li>Sunset and timer schedules</li>
              <li>Zones per elevation</li>
              <li>Alexa and Google Home</li>
              <li>Works offline once set</li>
            </ul>
            <Link href="/resources/wled-controller-setup-guide-for-permanent-lights" className="btn-gold mt-8">Controller setup guide</Link>
          </div>
          <Photo name="home-blue-app-control" ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="(max-width: 768px) 100vw, 560px" />
        </div>
      </section>

      <section className="bg-[var(--color-bg)]">
        <div className="shell section grid gap-10 md:grid-cols-2 md:items-center">
          <Photo name="detail-tracks" ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="(max-width: 768px) 100vw, 560px" />
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Track colours</p>
            <h2 className="font-display h2-fluid mt-5">Match the soffit, disappear by day.</h2>
            <p className="mt-4 text-[var(--color-text-soft)]">Black, white, wicker and brown cover almost every aluminum or vinyl soffit sold in Canada. The screws are colour-matched too. <Link href="/resources/choosing-a-track-colour-to-match-your-soffit" className="link-underline">Which colour is right for your trim?</Link></p>
            <div className="mt-6 flex flex-wrap gap-3">
              {kitColours.map((c) => (
                <span key={c.key} className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white px-3 py-1.5 text-sm">
                  <span className="size-4 rounded-full border border-black/15" style={{ background: c.hex }} />
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="shell section grid gap-8 md:grid-cols-3">
          {[
            ["5-year parts warranty", "We repair or replace any kit component that fails from a manufacturing defect within five years.", "/warranty", "Read the warranty"],
            ["Free shipping over $500", "Every kit qualifies. Orders leave London, Ontario within two business days.", "/shipping-returns", "Shipping details"],
            ["Prefer a pro?", "Our own crew installs across Southwestern Ontario, and partner installers cover the rest of Canada.", "/installation", "Professional installation"]
          ].map(([t, b, h, l]) => (
            <div key={t} className="card p-6">
              <h3 className="font-display text-xl">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-soft)]">{b}</p>
              <Link href={h} className="mt-4 inline-flex text-sm font-semibold text-[var(--color-accent-dark)] hover:underline">{l} →</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// keep helper referenced for the 100 ft example elsewhere
export const _example = getKitByFeet(100) && kitBom(getKitByFeet(100)!).length;
