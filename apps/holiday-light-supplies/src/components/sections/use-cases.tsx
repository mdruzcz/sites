import Link from "next/link";

export function UseCases() {
  return (
    <section className="bg-warm">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
        <div className="text-center">
          <p className="eyebrow text-[var(--color-accent)]">Who we supply</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl">From front porches to Main Street.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-3xl bg-[var(--color-night)] p-10 text-white">
            <p className="eyebrow text-[var(--color-gold)]">Homes &amp; cottages</p>
            <h3 className="font-display mt-3 text-3xl">Light your whole roofline.</h3>
            <p className="mt-4 max-w-md leading-relaxed text-white/80">
              C9 strawberry bulbs, G20 globes, 5mm mini strands and snowfall tubes — the same
              commercial-grade product the pros use, sold by the strand or the case. Mix, match and
              build the look you want.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-1 font-semibold text-[var(--color-gold)] hover:underline"
            >
              Shop residential lights →
            </Link>
          </article>
          <article className="overflow-hidden rounded-3xl bg-[var(--color-accent)] p-10 text-white">
            <p className="eyebrow text-white/80">Business &amp; municipal</p>
            <h3 className="font-display mt-3 text-3xl">Bulk pricing, fast shipping.</h3>
            <p className="mt-4 max-w-md leading-relaxed text-white/90">
              Pre-lit LED trees, oversized 3D displays, wreaths and pole-mount décor for storefronts,
              BIAs and downtown cores. Up to 40% off on case and contract orders, billed net-30.
            </p>
            <Link
              href="/professional-installer"
              className="mt-6 inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline"
            >
              Get a bulk quote →
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
