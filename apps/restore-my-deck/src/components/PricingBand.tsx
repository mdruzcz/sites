import Link from "next/link";
import { site } from "@/lib/site";

export function PricingBand({ city }: { city?: string }) {
  return (
    <section className="bg-white">
      <div className="shell section">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow-pill gold">Transparent pricing</p>
          <h2 className="font-display h2-fluid mt-4">What most projects cost{city ? ` in ${city}` : ""}.</h2>
          <p className="lead mt-4 text-[var(--ink-soft)]">No hidden fees. Final pricing depends on square footage, wood condition and the stain you choose, so send photos for an exact quote.</p>
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-3">
          {site.pricing.map((p) => (
            <div key={p.service} className="card p-6 text-center">
              <p className="text-sm font-bold text-[var(--ink-soft)]">{p.service}</p>
              <p className="font-display my-3 text-3xl text-[var(--accent-deep)]">{p.price}</p>
              <p className="text-xs text-[var(--muted)]">{p.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center"><Link href="/how-much-does-deck-staining-cost-in-kitchener-waterloo" className="btn-outline">What goes into a deck staining quote</Link></div>
      </div>
    </section>
  );
}
