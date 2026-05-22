import Link from "next/link";

export default function CtaBand() {
  return (
    <section className="bg-orange-pale py-16">
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
        <h2 className="mb-4 font-display text-3xl font-bold text-navy md:text-4xl">
          Get A Free Quote Today!
        </h2>
        <p className="mb-8 text-lg text-slate-muted">
          Send us dimensions and a photo of your backyard for a free quote.
        </p>
        <Link
          href="/contact-us"
          className="inline-flex min-h-11 items-center rounded-full bg-orange px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-orange-dark"
        >
          Get A Quote
        </Link>
      </div>
    </section>
  );
}
