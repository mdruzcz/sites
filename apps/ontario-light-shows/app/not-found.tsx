import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-midnight min-h-[60vh] flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <p className="eyebrow">Error 404</p>
        <h1 className="h-display text-5xl sm:text-7xl gradient-text mb-4">Lights Out.</h1>
        <p className="text-muted-strong text-lg mb-8 leading-relaxed">
          We couldn&apos;t find that page. The fixture may have moved, or the link came in with the wrong colour code.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/contact" className="btn btn-ghost">Get a quote</Link>
        </div>
      </div>
    </section>
  );
}
