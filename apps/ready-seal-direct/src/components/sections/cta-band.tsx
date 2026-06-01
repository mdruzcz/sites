import Link from "next/link";

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-brand-deep)] text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-deep)] via-[var(--color-brand-dark)] to-[var(--color-brand-deep)] opacity-90" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center">
        <p className="eyebrow text-[var(--color-gold)]">Ready when you are</p>
        <h2 className="font-display max-w-3xl text-3xl leading-tight md:text-5xl">
          Stop fighting your stain.<br />
          <span className="text-[var(--color-gold)]">Start with Ready Seal.</span>
        </h2>
        <p className="max-w-xl text-orange-50/90">
          Nine rich colors, 1 &amp; 5 gallon pails, in stock and shipping across Ontario. First
          order? Save $15 with code <span className="font-bold text-white">SAVE15</span>.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn-gold">
            Shop all colors
          </Link>
          <Link href="/contact-us" className="btn-ghost-light">
            Talk to us first →
          </Link>
        </div>
      </div>
    </section>
  );
}
