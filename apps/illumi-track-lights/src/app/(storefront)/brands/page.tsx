import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { listProducts } from "@/lib/catalog";
import { kitFromPrice, kitTopPrice, kitsWithLivePrices } from "@/lib/kits";
import { BRANDS, BRANDS_ALSO, BRANDS_CHECKED, BRAND_GROUPS, brandsCheckedLong, brandsIn, type Brand } from "@/lib/brands";
import { ARTICLES } from "@/lib/resources";
import { BRAND, SITE_URL, formatCad } from "@/lib/utils";

export const revalidate = 3600;

const URL = `${SITE_URL}/brands`;
const DESCRIPTION =
  "How Gemstone, Govee, Trimlight, Celebright, Forever Lights and Illumi compare on mounting, voltage, warranty and published price, from each maker's own pages.";

export const metadata: Metadata = {
  title: "Gemstone, Govee & Track Kits Compared",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { type: "article", title: "Permanent Lighting Brands Compared | Illumi Track Lights", description: DESCRIPTION, url: URL, images: ["/images/photos/home-example-warm-white.webp"] },
  twitter: { card: "summary_large_image", title: "Permanent Lighting Brands Compared", description: DESCRIPTION }
};

const FAQ: { q: string; a: string }[] = [
  { q: "Can I buy Gemstone Lights and install them myself?", a: "No. Gemstone states that it does not offer a DIY option for its track lighting system. It is sold and installed only through authorized dealers." },
  { q: "How much do Gemstone Lights cost per foot in Canada?", a: "Gemstone does not publish a price. You get a quote from your local dealer, and it depends on the house. If you want a number before anyone visits, the brands that publish prices are the ones that sell kits." },
  { q: "Which permanent lighting brands are Canadian?", a: "Gemstone Lights was founded in Calgary, Celebright is headquartered in Ottawa, Forever Lights is in Belmont, Ontario and Illumi Track Lights is in Woodstock, Ontario. Trimlight, Jellyfish, EverLights and Oelo are American." },
  { q: "Is Govee as good as a track system?", a: "It is a different product at a different price. A Govee string costs a few hundred dollars and sticks or clips to the fascia in an afternoon. A track system costs more, screws under the soffit, hides the wire and puts the lights about twice as close together. Govee's lights are not dimmer one for one; there are just fewer of them per foot." },
  { q: "Which brand has the longest warranty?", a: "On paper, Gemstone (lifetime on the track lights, 10 years on system parts) and Trimlight (a lifetime product warranty tied to dealer installation). Celebright offers 10 years, transferable. Kits you install yourself, including ours, are typically five years on parts. Govee is three years." },
  { q: "Do any of these need a monthly subscription?", a: "Gemstone says plainly that there are no monthly fees. None of the other makers we checked mentions a subscription. Our controllers run WLED with a free app and no account." }
];

const BRAND_ARTICLES = [
  "gemstone-lights-vs-diy-track-lighting-kits",
  "govee-permanent-outdoor-lights-vs-track-lighting",
  "track-lights-vs-string-lights-permanent-outdoor-lighting",
  "dealer-installed-permanent-lighting-brands-compared"
];

function Profile({ b, price }: { b: Brand; price: string }) {
  return (
    <article id={b.slug} className={`scroll-mt-28 border p-5 md:p-7 ${b.ours ? "border-[var(--color-ink)]" : "border-[var(--color-border)]"}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-[1.45rem]">{b.name}</h3>
        <p className="text-sm text-[var(--color-muted)]">{b.from}</p>
      </div>
      {b.ours && <p className="eyebrow mt-1 text-[var(--color-gold-text)]">That is us</p>}
      {b.sister && <p className="eyebrow mt-1 text-[var(--color-gold-text)]">Sister brand of this store</p>}
      <dl className="mt-4 grid gap-x-8 gap-y-3 text-[0.95rem] md:grid-cols-2">
        {[
          ["How it is sold", b.sold],
          ["How it mounts", b.mount],
          ["The light", b.light],
          ["Warranty", b.warranty],
          ["Published price", price]
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="eyebrow text-[var(--color-text-soft)]">{k}</dt>
            <dd className="mt-0.5 text-[var(--color-text)]">{v}</dd>
          </div>
        ))}
      </dl>
      <ul className="mt-5 ml-5 list-disc space-y-1.5 text-[0.95rem] text-[var(--color-text-soft)] marker:text-[var(--color-gold)]">
        {b.facts.map((f) => (
          <li key={f} className="pl-1">{f}</li>
        ))}
      </ul>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <p className="note text-[0.9rem]"><strong>A good fit if:</strong> {b.fit}</p>
        <p className="note note-amber text-[0.9rem]"><strong>Worth knowing:</strong> {b.watch}</p>
      </div>
      {b.sources.length > 0 && (
        <p className="mt-4 text-[0.8rem] text-[var(--color-muted)]">
          Source{b.sources.length > 1 ? "s" : ""}:{" "}
          {b.sources.map((s, i) => (
            <span key={s.url}>
              {i > 0 && ", "}
              <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-[var(--color-accent)]">{s.label}</a>
            </span>
          ))}
        </p>
      )}
      {b.ours && (
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/diy-kits" className="btn-primary">See the kits</Link>
          <Link href="/how-it-works" className="btn-secondary">How it goes together</Link>
        </div>
      )}
    </article>
  );
}

export default async function BrandsPage() {
  const products = await listProducts();
  const kits = kitsWithLivePrices(products);
  const ourPrice = `Kits ${formatCad(kitFromPrice(kits), 0)} (50 ft) to ${formatCad(kitTopPrice(kits), 0)} (250 ft), shipping included.`;
  const priceOf = (b: Brand) => (b.ours ? ourPrice : b.price);
  const checked = brandsCheckedLong();
  const articles = BRAND_ARTICLES.map((s) => ARTICLES.find((a) => a.slug === s)).filter((a): a is (typeof ARTICLES)[number] => !!a);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Permanent lighting brands compared: Gemstone, Govee, Forever Lights and the rest",
      description: DESCRIPTION,
      dateModified: BRANDS_CHECKED,
      datePublished: BRANDS_CHECKED,
      mainEntityOfPage: { "@type": "WebPage", "@id": URL },
      author: { "@type": "Organization", name: BRAND.name, url: SITE_URL },
      publisher: { "@type": "Organization", name: BRAND.name, url: SITE_URL },
      about: BRANDS.map((b) => ({ "@type": "Brand", name: b.name }))
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        compact
        photo="home-example-warm-white"
        eyebrow="Brands compared"
        title="Gemstone, Govee, Forever Lights and the rest, side by side."
        intro="What each permanent lighting brand sells, how it mounts, what the warranty says and what price it publishes. Taken from each maker's own pages."
        crumbs={[{ label: "Brands compared" }]}
      />

      <section>
        <div className="shell section">
          <div className="mx-auto max-w-3xl space-y-4 text-[1.0625rem] text-[var(--color-text-soft)]">
            <p>
              <strong className="text-[var(--color-text)]">Short answer:</strong> there are three kinds of permanent lighting, and the brand matters less than the kind. Dealer brands such as Gemstone, Celebright and Trimlight put a track on your house for a per-foot installed price. Retail strings such as Govee and eufy cost a few hundred dollars and stick to the fascia. In between are track kits you install yourself, which is what we sell.
            </p>
            <p>
              <strong className="text-[var(--color-text)]">Long answer:</strong> the table below lists what each maker publishes. Where a maker does not state something, we say so instead of guessing. We sell one of these, so read our row the way you would read any seller describing its own product, and check the sources.
            </p>
            <p className="text-sm text-[var(--color-muted)]">Checked {checked}. Retail prices were on Black Friday sale that day, so both the sale and the regular price are shown.</p>
          </div>

          <div className="mt-10 overflow-x-auto border border-[var(--color-border)]">
            <table className="table-clean min-w-[62rem]">
              <caption className="sr-only">Permanent lighting brands compared by how they are sold, how they mount, light type, warranty and published price</caption>
              <thead>
                <tr>
                  <th scope="col">Brand</th>
                  <th scope="col">How it is sold</th>
                  <th scope="col">How it mounts</th>
                  <th scope="col">The light</th>
                  <th scope="col">Warranty</th>
                  <th scope="col">Published price</th>
                </tr>
              </thead>
              {BRAND_GROUPS.map((g) => (
                <tbody key={g.key}>
                  <tr>
                    <th colSpan={6} scope="colgroup" className="!bg-[var(--color-ink)] !py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white">{g.name}</th>
                  </tr>
                  {brandsIn(g.key).map((b) => (
                    <tr key={b.slug} className={b.ours ? "!bg-[var(--color-gold-soft)]" : ""}>
                      <th scope="row" className="min-w-[10rem] font-semibold">
                        <a href={`#${b.slug}`} className="text-[var(--color-ink)] underline decoration-[var(--color-border-strong)] underline-offset-2 hover:decoration-current">{b.name}</a>
                        <span className="mt-0.5 block text-[0.8rem] font-normal text-[var(--color-muted)]">{b.ours ? "This store" : b.sister ? "Sister brand" : b.from}</span>
                      </th>
                      <td>{b.sold}</td>
                      <td>{b.mount}</td>
                      <td>{b.light}</td>
                      <td>{b.warranty}</td>
                      <td>{priceOf(b)}</td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <p className="mt-2 text-sm text-[var(--color-muted)] md:hidden">Slide the table sideways to see every column.</p>
        </div>
      </section>

      {BRAND_GROUPS.map((g) => (
        <section key={g.key} className="border-t border-[var(--color-border)]">
          <div className="shell section">
            <h2 className="font-display h2-fluid track-title">{g.name}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-[var(--color-text-soft)]">{g.summary}</p>
            <div className="mx-auto mt-9 max-w-4xl space-y-6">
              {brandsIn(g.key).map((b) => (
                <Profile key={b.slug} b={b} price={priceOf(b)} />
              ))}
            </div>
            {g.key === "string" && (
              <div className="mx-auto mt-6 max-w-4xl text-[0.95rem] text-[var(--color-text-soft)]">
                <p className="font-semibold text-[var(--color-text)]">Also on Canadian shelves</p>
                <ul className="mt-2 ml-5 list-disc space-y-1 marker:text-[var(--color-gold)]">
                  {BRANDS_ALSO.map((a) => (
                    <li key={a.name} className="pl-1">
                      <a href={a.url} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-[var(--color-accent)]">{a.name}</a>. {a.note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <h2 className="font-display h2-fluid track-title">How to choose</h2>
          <div className="mx-auto mt-8 grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              ["You want it done for you", "Call a dealer brand and get a quote. Ask what the labour warranty is, who services it in five years, and whether the price is per foot of lights or per foot of roofline."],
              ["You want it this weekend, cheaply", "A retail string will do it. Check the cold rating against your winters, measure the run against the maximum length, and expect to see the lights and wire by day."],
              ["You want track, and you own a drill", "A kit gets you the dealer style of hardware for the price of the parts. Measure every edge, round up to the next kit, and plan a full day for a single storey."]
            ].map(([t, b]) => (
              <div key={t}>
                <h3 className="font-display text-[1.2rem]">{t}</h3>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-[var(--color-text-soft)]">{b}</p>
              </div>
            ))}
          </div>
          {articles.length > 0 && (
            <div className="mx-auto mt-12 max-w-5xl">
              <p className="eyebrow text-[var(--color-gold-text)]">Go deeper</p>
              <ul className="mt-2 grid gap-x-8 md:grid-cols-2">
                {articles.map((a) => (
                  <li key={a.slug} className="border-t border-[var(--color-border-strong)] py-3">
                    <Link href={`/resources/${a.slug}`} className="group block">
                      <span className="font-display block text-[1.1rem] leading-snug group-hover:underline">{a.title}</span>
                      <span className="mt-1 line-clamp-2 block text-sm text-[var(--color-text-soft)]">{a.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="shell section">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display h2-fluid">Questions people ask</h2>
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

            <h2 className="font-display mt-12 text-[1.4rem]">How we put this together</h2>
            <div className="mt-3 space-y-3 text-[0.975rem] text-[var(--color-text-soft)]">
              <p>
                Every fact about another brand comes from that brand&rsquo;s own website or published guide, linked under its profile, and was checked on {checked}. We did not use one maker&rsquo;s comparison chart as evidence about another. Where a maker does not state a currency we say so, and where it does not publish a figure we write &ldquo;not published&rdquo;.
              </p>
              <p>
                Two things you should know about us: we sell track lighting kits, so we are not neutral, and Forever Lights is run by the same parent company as this store, Master Decker Inc.
              </p>
              <p>
                Products and prices change. If you work for one of these companies, or you spot something out of date, email <a href={`mailto:${BRAND.email}`} className="text-link">{BRAND.email}</a> and we will correct it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
