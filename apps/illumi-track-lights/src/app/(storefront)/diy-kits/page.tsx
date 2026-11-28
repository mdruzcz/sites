import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { PermanentLightsConfigurator } from "@/components/permanent-lights-configurator";
import { listProducts } from "@/lib/catalog";
import { kits as staticKits, kitColours, kitLightCount, kitTrackFeet, kitPerFoot, kitComponents, kitFromPrice, kitsWithLivePrices } from "@/lib/kits";
import { BRAND, SITE_URL, formatCad } from "@/lib/utils";

export const revalidate = 3600;

const URL = `${SITE_URL}/diy-kits`;
const DESCRIPTION = `Six complete 12V track lighting kits for 50 to 250 ft of roofline, from ${formatCad(kitFromPrice(staticKits), 0)}. Track, lights, controller and power included. Free shipping in Canada.`;

export const metadata: Metadata = {
  title: "Track Lighting Kits, 50 to 250 ft",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: "Track Lighting Kits, 50 to 250 ft | Illumi Track Lights", description: DESCRIPTION, url: URL, images: ["/images/photos/home-blue-night.webp"] },
  twitter: { card: "summary_large_image", title: "Track Lighting Kits, 50 to 250 ft", description: DESCRIPTION }
};

const FAQ: { q: string; a: string }[] = [
  { q: "How do I know which size to buy?", a: "Measure every edge you want lit, add them up and round up to the next kit. If you land between two sizes, take the larger one. Spare track and lights are useful; coming up six feet short is not." },
  { q: "What if my house needs more than 250 feet?", a: "Buy the largest kit and add track, lights and a power supply from the parts shelf, or send us your measurements and we will put the list together for you." },
  { q: "Is anything else needed to finish the job?", a: "A drill, a ladder and an outdoor GFCI outlet. The kit has the track, lights, controller, power supplies, connectors and screws. If your outlet is a long way from where the lights start, add a longer extension connector." },
  { q: "Can I change the colour of the track later?", a: "The colour is the finish on the aluminum, so choose it when you order. Black, white, wicker and brown are all the same price." },
  { q: "Does the kit price include shipping?", a: "Yes. Every order ships free to any address in Canada, and pickup in Woodstock, Ontario is free as well." }
];

export default async function KitsPage() {
  const products = await listProducts();
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const kits = kitsWithLivePrices(products);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Track lighting kits",
      itemListElement: kits.map((k, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/product/${k.slug}`, name: `Track Lighting Kit, ${k.feet} ft` }))
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
  ];

  const options = kits.map((k) => {
    const variants = (bySlug.get(k.slug)?.ecom_variants ?? []).filter((v) => v.is_active);
    const variantIds: Record<string, string> = {};
    for (const v of variants as { id: string; attribute_value?: string | null; name?: string }[]) {
      const label = v.attribute_value ?? v.name ?? "";
      if (label) variantIds[label] = v.id;
    }
    const colors = kitColours.map((c) => c.label).filter((label) => variantIds[label]);
    return { slug: k.slug, footage: k.feet, price: k.price, colors, variantIds, lights: kitLightCount(k), trackFeet: kitTrackFeet(k), supplies: k.bom.powerSupply ?? 1, suits: k.suits };
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        compact
        photo="home-blue-night"
        eyebrow="Track lighting kits"
        title="Six kits. Pick the one that fits your roofline."
        intro="Each kit is the full parts list for one length: track, lights, controller, power, connectors and screws. The price includes shipping."
        crumbs={[{ label: "Track lighting kits" }]}
      />

      <section>
        <div className="shell section">
          <h2 className="font-display h2-fluid track-title">Choose your kit</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-soft)]">
            Add up every edge you want lit and round up. Not sure? <Link href="/contact-us" className="text-link">Send us your measurements or a photo</Link> and we will size it for you.
          </p>
          <PermanentLightsConfigurator options={options} />
        </div>
      </section>

      <section className="border-t border-[var(--color-border)]">
        <div className="shell section">
          <h2 className="font-display h2-fluid track-title">Every kit, part by part</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-soft)]">
            The same hardware in different quantities. From 100 ft up, kits add a second or third power supply, a power injection T-connector and a data amplifier to keep a long run evenly bright.
          </p>
          <div className="mt-8 overflow-x-auto border border-[var(--color-border)]">
            <table className="table-clean min-w-[52rem]">
              <caption className="sr-only">Contents and price of each track lighting kit</caption>
              <thead>
                <tr>
                  <th scope="col">In the box</th>
                  {kits.map((k) => (
                    <th key={k.slug} scope="col" className="text-center">
                      <Link href={`/product/${k.slug}`} className="underline underline-offset-2">{k.feet} ft</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="font-semibold">Price, shipping included</th>
                  {kits.map((k) => <td key={k.slug} className="price text-center">{formatCad(k.price, 2)}</td>)}
                </tr>
                <tr>
                  <th scope="row" className="font-normal">Works out to, per foot</th>
                  {kits.map((k) => <td key={k.slug} className="text-center">{formatCad(kitPerFoot(k), 2)}</td>)}
                </tr>
                <tr>
                  <th scope="row" className="font-normal">Lights</th>
                  {kits.map((k) => <td key={k.slug} className="text-center">{kitLightCount(k)}</td>)}
                </tr>
                <tr>
                  <th scope="row" className="font-normal">Track supplied</th>
                  {kits.map((k) => <td key={k.slug} className="text-center">{kitTrackFeet(k)} ft</td>)}
                </tr>
                {kitComponents.map((c) => (
                  <tr key={c.key}>
                    <th scope="row" className="font-normal">{c.name}</th>
                    {kits.map((k) => <td key={k.slug} className="text-center">{k.bom[c.key] ? k.bom[c.key] : <span className="text-[var(--color-border-strong)]">–</span>}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Prices in Canadian dollars, before tax. Track comes in 42-inch pieces, so each kit supplies a little more than its nominal length.
            <span className="md:hidden"> Slide the table sideways to see every kit.</span>
          </p>
        </div>
      </section>

      <section id="whats-included" className="scroll-mt-28 border-t border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <h2 className="font-display h2-fluid track-title">What each part does</h2>
          <ul className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {kitComponents.map((c) => (
              <li key={c.key}>
                <Link href={`/product/${c.productSlug}`} className="group flex gap-4">
                  <span className="grid size-[72px] shrink-0 place-items-center overflow-hidden border border-[var(--color-border)] bg-white">
                    <Image src={c.image} alt={`${c.name} for 12V track lighting`} width={72} height={72} className="size-[72px] object-contain" />
                  </span>
                  <span>
                    <span className="block font-semibold text-[var(--color-ink)] group-hover:underline">{c.name}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-[var(--color-text-soft)]">{c.blurb}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="smart-control" className="scroll-mt-28">
        <div className="shell section grid gap-10 md:grid-cols-2 md:items-center">
          <Photo name="home-blue-app-control" ratio="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 560px" />
          <div>
            <p className="eyebrow text-[var(--color-gold-text)]">The controller</p>
            <h2 className="font-display h2-fluid mt-2">Set it from your phone. It keeps going without you.</h2>
            <div className="mt-4 space-y-4 text-[var(--color-text-soft)]">
              <p>The WiFi controller in every kit runs WLED, open lighting software with a free app for Android and iPhone. You pick colours, save scenes, set schedules and sunset timers, and split the house into zones.</p>
              <p>Scenes are stored on the controller, not in the cloud. If your internet drops, the dusk-to-midnight routine you set still runs. There is no account to create and no subscription.</p>
            </div>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[0.95rem] text-[var(--color-text-soft)]">
              {["16 million colours and a warm white", "Saved scenes for each holiday", "Sunset and timer schedules", "Zones for each side of the house", "Works with Alexa and Google Home", "Runs offline once it is set"].map((t) => (
                <li key={t} className="border-t border-[var(--color-border)] py-1.5">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)]">
        <div className="shell section grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow text-[var(--color-gold-text)]">Track colours</p>
            <h2 className="font-display h2-fluid mt-2">Match the soffit and it disappears by day.</h2>
            <p className="mt-4 text-[var(--color-text-soft)]">The track sits on the underside of the eave, so it is the soffit colour it needs to match. Black, white, wicker and brown cover the common ones, and the screws come in the same colour as the track.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {kitColours.map((c) => (
                <li key={c.key} className="inline-flex min-h-[40px] items-center gap-2 border border-[var(--color-border-strong)] px-3 text-sm">
                  <span aria-hidden className="size-4 rounded-full border border-black/20" style={{ background: c.hex }} />
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
          <Photo name="detail-tracks" ratio="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 560px" />
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display h2-fluid">Before you order</h2>
            <div className="mt-5 border-t border-[var(--color-border-strong)]">
              {FAQ.map((f) => (
                <details key={f.q} className="group border-b border-[var(--color-border-strong)]">
                  <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold text-[var(--color-ink)]">
                    {f.q}
                    <span aria-hidden className="text-xl leading-none text-[var(--color-muted)] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 pr-6 leading-relaxed text-[var(--color-text-soft)]">{f.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                ["Free shipping, or pickup", `Free to any address in Canada, or collect it at ${BRAND.street}, ${BRAND.city}.`, "/shipping-returns", "Shipping and pickup"],
                ["Five years on parts", "If a part fails from a defect inside five years, we replace it.", "/warranty", "Read the warranty"],
                ["Prefer it installed?", "Our crew installs across Southwestern Ontario.", "/installation", "Installation"]
              ].map(([t, b, h, l]) => (
                <div key={t}>
                  <h3 className="font-display text-[1.1rem]">{t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-soft)]">{b}</p>
                  <Link href={h} className="text-link mt-1 inline-flex min-h-[40px] items-center text-sm">{l}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
