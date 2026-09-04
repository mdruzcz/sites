import Link from "next/link";

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-deep)] via-[var(--color-night)] to-[var(--color-brand-deep)] opacity-95" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
        <p className="eyebrow text-[var(--color-gold)]">Ready when you are</p>
        <h2 className="font-display max-w-3xl text-4xl leading-tight md:text-6xl">
          Light up the season.<br />
          <span className="italic text-[var(--color-gold)]">Shipped to your door.</span>
        </h2>
        <p className="max-w-xl text-lg text-white/80">
          Commercial-grade Christmas lights and décor, in stock and ready to ship from our Ontario
          warehouse. Free shipping over $150.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn-gold">
            Shop the catalog
          </Link>
          <Link href="/contact-us" className="btn-ghost-light">
            Talk to us first →
          </Link>
        </div>
      </div>
    </section>
  );
}
