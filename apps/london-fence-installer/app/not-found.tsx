import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section min-h-[60vh] flex items-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-6xl font-extrabold text-[var(--green)] mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-[var(--muted)] mb-8">
          Sorry, we couldn&apos;t find the page you were looking for. It may have been moved or the URL might be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary">Go Home</Link>
          <Link href="/contact-us" className="btn btn-outline">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
