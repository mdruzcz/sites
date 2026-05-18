import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <p className="text-[var(--accent)] font-bold text-6xl mb-4">404</p>
        <h1 className="h-display text-3xl sm:text-4xl mb-4">Page Not Found</h1>
        <p className="text-slate-600 text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
