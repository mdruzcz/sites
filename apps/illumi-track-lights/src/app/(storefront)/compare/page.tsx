import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { kits, kitSaving } from "@/lib/kits";
import { SITE_URL, formatCad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kit vs Installed vs National Brands: What You Pay",
  description:
    "Compare a DIY Illumi soffit track kit, an Illumi crew install in Southwestern Ontario, a national installer at $25-40 per foot and an adhesive strip kit. Same hardware, different price, honest trade-offs.",
  alternates: { canonical: `${SITE_URL}/compare` },
  openGraph: { title: "Kit vs Installed vs National Brands | Illumi Track Lights", description: "What each option costs and what you actually get.", url: `${SITE_URL}/compare` }
};

const ROWS: [string, string, string, string, string][] = [
  ["Price per foot", "$12.60–25", "$20–33", "$25–40", "$2–4"],
  ["100 ft example", formatCad(1729.2, 2), `${formatCad(2129.2, 2)}–${formatCad(2555.04, 2)}`, "$2,500–4,000", "$200–400"],
  ["Hardware", "12V RGBW pucks in aluminum track", "Identical", "Pro track and pucks", "Adhesive LED strip"],
  ["Who installs", "You, in a weekend", "Illumi crew, one day", "Contractor crew", "You, an afternoon"],
  ["Measurement", "You measure, we check by email", "Free on-site", "On-site", "None"],
  ["Daytime look", "Track flush in soffit", "Track flush in soffit", "Track flush in soffit", "Visible strip"],
  ["White quality", "Dedicated warm white diode", "Dedicated warm white diode", "Varies by brand", "Mixed RGB"],
  ["App", "WLED, open, offline scenes", "WLED, set up for you", "Proprietary", "Brand cloud app"],
  ["Warranty", "5 yr parts", "5 yr parts + workmanship", "3–5 yr, service contract", "1–2 yr"],
  ["Repairs", "Swap a strand yourself", "We come back", "Call the installer", "Replace the strip"],
  ["Available", "Anywhere in Canada", "Southwestern Ontario", "Franchise territories", "Anywhere"]
];

export default function ComparePage() {
  return (
    <>
      <PageHero photo="home-wide" eyebrow="Honest comparison" title="Kit, installed by us, or a national brand?" intro="The hardware in our kit is the hardware our crew installs. The only variables are who climbs the ladder and how far you are from London, Ontario." crumbs={[{ label: "Compare" }]} />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-white">
            <table className="table-clean min-w-[900px]">
              <thead>
                <tr>
                  <th></th>
                  <th className="bg-[var(--color-gold-soft)]">Illumi DIY kit</th>
                  <th className="bg-[var(--color-gold-soft)]">Illumi installed</th>
                  <th>National installer</th>
                  <th>Strip kit</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r[0]}>
                    <td className="font-semibold">{r[0]}</td>
                    <td className="bg-[var(--color-gold-soft)]/60 font-medium">{r[1]}</td>
                    <td className="bg-[var(--color-gold-soft)]/60 font-medium">{r[2]}</td>
                    <td>{r[3]}</td>
                    <td>{r[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[var(--color-muted)]">National installer and strip kit figures are typical Canadian ranges, not quotes from any named company. Illumi figures are list prices; installed prices depend on storeys, corners and access.</p>
        </div>
      </section>
      <section className="bg-[var(--color-surface)]">
        <div className="shell section">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">By kit size</p>
            <h2 className="font-display h2-fluid mt-5">Kit price against our installed range.</h2>
          </div>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-white">
            <table className="table-clean min-w-[640px]">
              <thead><tr><th>Length</th><th>DIY kit</th><th>Installed by Illumi</th><th>Doing it yourself saves</th></tr></thead>
              <tbody>
                {kits.map((k) => (
                  <tr key={k.slug}>
                    <td className="font-semibold"><Link href={`/product/${k.slug}`} className="hover:underline">{k.feet} ft</Link></td>
                    <td>{formatCad(k.price, 2)}</td>
                    <td>{formatCad(k.installedLow, 2)} – {formatCad(k.installedHigh, 2)}</td>
                    <td className="font-semibold text-[var(--color-gold-text)]">{formatCad(kitSaving(k), 0)}+</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/diy-kits" className="btn-primary">Shop kits</Link>
            <Link href="/installation" className="btn-secondary">Book a free measurement</Link>
          </div>
        </div>
      </section>
      <section className="bg-[var(--color-bg-warm)]">
        <div className="shell section grid gap-10 md:grid-cols-2 md:items-center">
          <Photo name="track-day" ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="(max-width: 768px) 100vw, 560px" />
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Why not the cheap strip?</p>
            <h2 className="font-display h2-fluid mt-5">Adhesive lets go. Screws do not.</h2>
            <p className="mt-4 text-[var(--color-text-soft)]">Strip kits are cheap because they skip the track. In an Ontario freeze-thaw cycle the adhesive fails, the strip sags and the wire shows all summer. A screwed aluminum channel, painted to your soffit, is what every professional system uses, and it is what ships in an Illumi kit.</p>
            <Link href="/resources/permanent-lights-vs-christmas-lights" className="btn-secondary mt-6">Permanent vs seasonal lights</Link>
          </div>
        </div>
      </section>
    </>
  );
}
