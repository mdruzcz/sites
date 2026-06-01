import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[68vh] flex items-center justify-center bg-white">
      <div className="wrap text-center">
        <p className="eyebrow mb-2">404</p>
        <h1 className="h-xl text-[2.4rem] md:text-[3.4rem] text-[var(--ink)] mb-3">This page took a vacation.</h1>
        <p className="muted text-lg max-w-md mx-auto mb-7">The page you&apos;re after may have moved. Let&apos;s get you back to something useful.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-green">Back to home</Link>
          <Link href="/contact" className="btn btn-out">Get a free quote</Link>
        </div>
      </div>
    </section>
  );
}
