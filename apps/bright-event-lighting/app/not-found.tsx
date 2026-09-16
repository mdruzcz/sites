import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-extrabold text-[var(--accent)] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Page Not Found</h2>
        <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary min-h-[44px]">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-ghost min-h-[44px]">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
