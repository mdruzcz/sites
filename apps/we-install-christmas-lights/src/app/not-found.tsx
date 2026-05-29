import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="eyebrow">404</p>
        <h1 className="heading-display text-4xl sm:text-5xl mt-3">Page not found</h1>
        <p className="mt-4 text-[color:var(--ink-soft)]">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved. Head back home or call us for a quote.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link href="/" className="btn btn-red">Home</Link>
          <Link href="/contact-us" className="btn btn-outline-green">Get a Free Quote</Link>
        </div>
      </div>
    </section>
  );
}
