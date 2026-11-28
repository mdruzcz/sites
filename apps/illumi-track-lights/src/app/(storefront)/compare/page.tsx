import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { listProducts } from "@/lib/catalog";
import { kitFromPrice, kitPerFoot, kitSaving, kitTopPrice, kitsWithLivePrices } from "@/lib/kits";
import { photo } from "@/lib/photos";
import { BRAND, SITE_URL, formatCad } from "@/lib/utils";

export const revalidate = 3600;

const PAGE_URL = `${SITE_URL}/compare`;
const TITLE = "Kit vs Installed vs Dealer vs String";
const DESCRIPTION =
  "Compare four ways to get permanent lighting: a track lighting kit you install, the same kit installed by our crew, a dealer brand, or a retail light string.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", title: `${TITLE} | ${BRAND.name}`, description: DESCRIPTION, url: PAGE_URL, images: [photo("home-wide").src] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION }
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is the kit the same hardware your crew installs?",
    a: "Yes. The kit in the box and the kit on our truck are the same track, lights, controller and power supplies. What differs is who climbs the ladder and whether you live inside our installation area."
  },
  {
    q: "Why is there no price in the dealer column?",
    a: "Because a dealer quotes each house, and we would be guessing. Our brand comparison page lists which makers publish a price and which do not, with a link to each maker's own page."
  },
  {
    q: "Is a retail string a bad choice?",
    a: "No. It is a different product at a lower price. A string goes up in an afternoon and costs a few hundred dollars. A track costs more, screws under the soffit and hides the wire. Decide which of those matters more on your house."
  },
  {
    q: "What does the installed price include?",
    a: "The kit, a free measurement at the house, the mounting, sealed wiring and a walkthrough of the app before we leave. The parts carry the five-year warranty and our own installs are covered for workmanship."
  }
];

export default async function ComparePage() {
  const kits = kitsWithLivePrices(await listProducts());
  const low = kitFromPrice(kits);
  const high = kitTopPrice(kits);
  const perFoot = kits.map((k) => kitPerFoot(k));
  const installedPerFoot = kits.flatMap((k) => [k.installedLow / k.feet, k.installedHigh / k.feet]);
  const range = (list: number[]) => `${formatCad(Math.min(...list), 2)} to ${formatCad(Math.max(...list), 2)} a foot`;

  const ROWS: [string, string, string, string, string][] = [
    ["Price", `${formatCad(low, 0)} to ${formatCad(high, 0)} for the kit, shipping included. Works out to ${range(perFoot)}.`, `${range(installedPerFoot)}, kit included. See the table below.`, "Quoted for your house by a local dealer.", "A few hundred dollars a box."],
    ["What goes on the house", "12V RGBW lights in aluminum track", "The same kit", "An aluminum track system", "A string of lights, stuck or clipped on. No track."],
    ["Who installs it", "You, over a weekend", "Our crew, in one day", "The dealer's crew", "You, in an afternoon"],
    ["Who measures", "You do. We check your numbers by email.", "We do, on site, free", "The dealer", "You, against the length in the box"],
    ["By day", "Track under the soffit, in a matching colour", "Track under the soffit, in a matching colour", "A track. The details vary by brand.", "The lights and the wire are in view on the fascia"],
    ["White light", "A separate warm white in every light", "A separate warm white in every light", "Varies by brand", "Varies by brand"],
    ["App", "WLED. Free, no account, scenes run offline.", "WLED, set up for you before we leave", "The brand's own", "The brand's own"],
    ["Warranty", "5 years on parts", "5 years on parts, plus workmanship", "Varies by brand", "Varies by brand"],
    ["If a light fails", "You swap the strand", "We come back", "You call the dealer", "You deal with the maker"],
    ["Where you can get it", `Shipped free anywhere in Canada, or picked up in ${BRAND.city}`, "Southwestern Ontario", "Where the brand has a dealer", "Stores and online"]
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        compact
        photo="home-wide"
        eyebrow="Four ways to do it"
        title="A kit, our crew, a dealer brand or a retail string?"
        intro="What each one puts on the house, who does the work and what it costs, in one table."
        crumbs={[{ label: "Compare" }]}
      />

      <section>
        <div className="shell section">
          <div className="mx-auto max-w-3xl space-y-4 text-[1.0625rem] text-[var(--color-text-soft)]">
            <p>
              <strong className="text-[var(--color-text)]">Short answer:</strong> if you own a drill and do not mind a ladder, buy the kit. If you want track and no ladder, have it installed. If you want lights up this weekend for the least money, a retail string will do that.
            </p>
            <p>
              <strong className="text-[var(--color-text)]">Long answer:</strong> the first two columns are ours, so we can give real numbers. The last two describe a kind of product, not one company, and we have kept them general on purpose. For what Gemstone, Govee, Trimlight, Celebright and the others each publish, read <Link href="/brands" className="text-link">the brand comparison</Link>.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto border border-[var(--color-border)]">
            <table className="table-clean min-w-[58rem]">
              <caption className="sr-only">A track lighting kit, installation by our crew, a dealer brand and a retail light string compared</caption>
              <thead>
                <tr>
                  <td />
                  <th scope="col">Our kit, you install</th>
                  <th scope="col">Our kit, we install</th>
                  <th scope="col">A dealer brand</th>
                  <th scope="col">A retail string</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r[0]}>
                    <th scope="row" className="min-w-[9rem] font-semibold">{r[0]}</th>
                    <td className="!bg-[var(--color-gold-soft)]">{r[1]}</td>
                    <td className="!bg-[var(--color-gold-soft)]">{r[2]}</td>
                    <td>{r[3]}</td>
                    <td>{r[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-[var(--color-muted)] md:hidden">Slide the table sideways to see every column.</p>
          <p className="note mx-auto mt-6 max-w-3xl">
            <strong>About the last two columns.</strong> They are general descriptions, not quotes from any named company. We sell one of these options, so check <Link href="/brands" className="text-link">the sources on the brand page</Link> before you decide.
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <h2 className="font-display h2-fluid track-title">Kit price against installed price</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-soft)]">
            The same sizes, bought as a kit or put up by our crew. The installed figure includes the kit.
          </p>
          <div className="mx-auto mt-8 max-w-4xl overflow-x-auto border border-[var(--color-border)] bg-white">
            <table className="table-clean min-w-[40rem]">
              <caption className="sr-only">Kit price and installed price range for each kit size</caption>
              <thead>
                <tr>
                  <th scope="col">Length</th>
                  <th scope="col">Kit, shipping included</th>
                  <th scope="col">Installed by our crew</th>
                  <th scope="col">Difference, at least</th>
                </tr>
              </thead>
              <tbody>
                {kits.map((k) => {
                  const saving = kitSaving(k);
                  return (
                    <tr key={k.slug}>
                      <th scope="row" className="font-semibold">
                        <Link href={`/product/${k.slug}`} className="text-[var(--color-ink)] underline decoration-[var(--color-border-strong)] underline-offset-2 hover:decoration-current">{k.feet} ft</Link>
                      </th>
                      <td>{formatCad(k.price, 2)}</td>
                      <td>{formatCad(k.installedLow, 2)} to {formatCad(k.installedHigh, 2)}</td>
                      <td>{saving > 0 ? formatCad(saving, 0) : "Ask for a quote"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-3 max-w-4xl text-sm text-[var(--color-muted)]">
            Installed prices are a guide for our own crew. Storeys, corners and access move the number, and the quote after a site visit is the real one.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/diy-kits" className="btn-primary">Shop the kits</Link>
            <Link href="/installation" className="btn-secondary">Book a free measurement</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="shell section grid gap-10 md:grid-cols-2 md:items-start md:gap-14">
          <figure>
            <Photo name="track-day" ratio="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 560px" />
            <figcaption className="mt-2 text-sm text-[var(--color-text-soft)]">A track by day. The channel is the only part in view, which is why its colour is matched to the soffit.</figcaption>
          </figure>
          <div>
            <h2 className="font-display h2-fluid">How to choose</h2>
            <div className="mt-5 space-y-5">
              {[
                ["You want track and you own a drill", "Buy the kit. Measure every edge, go up to the next size and set aside a weekend."],
                ["You want track and no ladder", "If you are in Southwestern Ontario, have our crew do it. Elsewhere, ask us about an installer near you, or call a dealer brand for a quote."],
                ["You want it up this weekend for less", "A retail string does that. Check its cold rating against your winters and measure your run against the longest length it allows."]
              ].map(([t, b]) => (
                <div key={t} className="border-t border-[var(--color-border)] pt-4">
                  <h3 className="font-display text-[1.2rem]">{t}</h3>
                  <p className="mt-1.5 text-[0.975rem] leading-relaxed text-[var(--color-text-soft)]">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem]">
              <Link href="/brands" className="text-link inline-flex min-h-[44px] items-center">Brands compared</Link>
              <Link href="/installers" className="text-link inline-flex min-h-[44px] items-center">Find an installer</Link>
              <Link href="/resources/diy-vs-professional-permanent-lighting" className="text-link inline-flex min-h-[44px] items-center">DIY or professional: the guide</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)]">
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
          </div>
        </div>
      </section>
    </>
  );
}
