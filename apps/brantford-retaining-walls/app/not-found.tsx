import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-6xl font-bold text-[var(--accent)] mb-4">404</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--charcoal)] mb-4">Page Not Found</h1>
        <p className="text-[var(--stone)] mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </section>
  );
}
