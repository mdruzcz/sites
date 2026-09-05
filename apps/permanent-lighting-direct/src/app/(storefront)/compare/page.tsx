import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { kits, kitSaving } from "@/lib/kits";
import { SITE_URL, formatCad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "DIY Kit vs Professional Install vs Consumer Strips",
  description:
    "Honest comparison of permanent lighting options in Canada: professional installs at $25-40 per foot, our DIY 12V kits at $12.60-25 per foot, and $2-4 per foot consumer strip kits. Hardware, install, support and lifespan.",
  alternates: { canonical: `${SITE_URL}/compare` },
  openGraph: { title: "DIY Kit vs Professional Install | Permanent Lighting Direct", description: "What you get at each price point, side by side.", url: `${SITE_URL}/compare` }
};

const ROWS: [string, string, string, string][] = [
  ["Price per foot", "$25–40", "$12.60–25", "$2–4"],
  ["100 ft example", "$2,500–4,000", formatCad(1729.2, 2), "$200–400"],
  ["Light source", "RGBW pucks in aluminum track", "RGBW pucks in aluminum track", "Adhesive LED strip"],
  ["Daytime look", "Track hidden in soffit", "Track hidden in soffit", "Visible strip and wire"],
  ["White quality", "Dedicated warm white diode", "Dedicated warm white diode", "Mixed RGB, often pinkish"],
  ["Rated life", "50,000 h", "50,000 h", "15,000–25,000 h typical"],
  ["Weather rating", "IP67–68, −40 °C", "IP68, −40 °C tested", "IP65, adhesive fails in cold"],
  ["Installation", "Crew, 1 day", "You, a weekend", "You, an afternoon"],
  ["Electrician", "Sometimes", "No, plug-in GFCI", "No"],
  ["App control", "Proprietary app", "WLED, open, offline-capable", "Brand app, cloud-dependent"],
  ["Warranty", "3–5 yr with service contract", "5 yr parts", "1–2 yr"],
  ["Repairs", "Call the installer", "Swap a strand yourself, parts in stock", "Replace the strip"],
  ["Resale", "Adds value, stays with house", "Adds value, stays with house", "Usually removed"]
];

export default function ComparePage() {
  return (
    <>
      <PageHero photo="home-example-warm-white" eyebrow="Honest comparison" title="Pro install, our DIY kit, or a strip kit?" intro="Same category, three very different products. Here is what you actually get at each price, with our own installed pricing in the mix so nothing is hidden." crumbs={[{ label: "Compare" }]} />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-white">
            <table className="table-clean min-w-[820px]">
              <thead>
                <tr>
                  <th></th>
                  <th>Professional install</th>
                  <th className="bg-[var(--color-accent-soft)]">Permanent Lighting Direct kit</th>
                  <th>Consumer strip kit</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r[0]}>
                    <td className="font-semibold">{r[0]}</td>
                    <td>{r[1]}</td>
                    <td className="bg-[var(--color-accent-soft)] font-medium">{r[2]}</td>
                    <td>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[var(--color-muted)]">Professional and consumer figures are typical Canadian market ranges, not quotes from any specific company. Our kit prices are exact list prices.</p>
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="shell section">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Kit vs our installed price</p>
            <h2 className="font-display h2-fluid mt-5">What installing it yourself saves, by size.</h2>
            <p className="lead mt-4 text-[var(--color-text-soft)]">These are the same kits, same hardware. The difference is our crew's time.</p>
          </div>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-white">
            <table className="table-clean min-w-[640px]">
              <thead><tr><th>Kit</th><th>DIY kit price</th><th>Installed by us</th><th>You save</th></tr></thead>
              <tbody>
                {kits.map((k) => (
                  <tr key={k.slug}>
                    <td className="font-semibold"><Link href={`/product/${k.slug}`} className="hover:underline">{k.feet} ft</Link></td>
                    <td>{formatCad(k.price, 2)}</td>
                    <td>{formatCad(k.installedLow, 2)} – {formatCad(k.installedHigh, 2)}</td>
                    <td className="font-semibold text-[var(--color-accent-dark)]">{formatCad(kitSaving(k), 0)}+</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-warm)]">
        <div className="shell section grid gap-10 md:grid-cols-2 md:items-center">
          <Photo name="home-daytime-hidden" ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="(max-width: 768px) 100vw, 560px" />
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Why the track matters</p>
            <h2 className="font-display h2-fluid mt-5">The cheap kits are cheap because of the track they don't have.</h2>
            <p className="mt-4 text-[var(--color-text-soft)]">Strip kits stick a flexible LED strip to the fascia with adhesive. In a Canadian winter the adhesive lets go, the strip sags and the wire shows all day. Track systems screw a rigid aluminum channel into the soffit, colour-matched to the trim, with the pucks pointing down the face of the house. That is what the professional installers use, and it is exactly what is in our kits.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/diy-kits" className="btn-primary">See the kits</Link>
              <Link href="/resources/permanent-holiday-lighting-brands-compared" className="btn-secondary">Brand comparison guide</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
