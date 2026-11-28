import Link from "next/link";
import { BRANDS, brandsCheckedLong } from "@/lib/brands";

/** Homepage summary of the brand comparison: the three kinds, one line each. */
export function BrandsTeaser() {
  const pick = (slug: string) => BRANDS.find((b) => b.slug === slug)!;
  const rows: { kind: string; who: string; how: string; price: string; slug: string }[] = [
    { kind: "Dealer-installed track", who: "Gemstone, Celebright, Trimlight", how: "A dealer measures, quotes and installs. No DIY option.", price: pick("gemstone-lights").price, slug: "gemstone-lights" },
    { kind: "Track kit you install", who: "Illumi, Forever Lights, Oelo", how: "The same style of track, boxed for you to put up with a drill.", price: "Published by the kit. Ours include shipping.", slug: "illumi" },
    { kind: "Retail light string", who: "Govee, eufy", how: "Each light sticks or clips to the fascia. No track.", price: "A few hundred dollars per 100 ft at retail.", slug: "govee" }
  ];
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-warm)]">
      <div className="shell section">
        <h2 className="font-display h2-fluid track-title">Gemstone, Govee or a track kit?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-soft)]">
          There are three kinds of permanent lighting, and the kind matters more than the brand. We read what each maker publishes and put it in one table.
        </p>
        <div className="mx-auto mt-9 max-w-5xl overflow-x-auto border border-[var(--color-border)] bg-white">
          <table className="table-clean min-w-[40rem]">
            <thead>
              <tr>
                <th scope="col">Kind</th>
                <th scope="col">Brands</th>
                <th scope="col">How it works</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.kind}>
                  <th scope="row" className="font-semibold text-[var(--color-ink)]">{r.kind}</th>
                  <td>{r.who}</td>
                  <td>{r.how}</td>
                  <td>{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-center text-sm text-[var(--color-muted)]">From each maker&rsquo;s own pages, checked {brandsCheckedLong()}.</p>
        <p className="mt-6 text-center">
          <Link href="/brands" className="btn-primary">Compare ten brands in full</Link>
        </p>
      </div>
    </section>
  );
}
