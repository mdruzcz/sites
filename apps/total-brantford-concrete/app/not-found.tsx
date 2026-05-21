import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="text-center px-4">
        <p className="eyebrow">404</p>
        <h1 className="section-title mb-4">Page Not Found</h1>
        <p className="text-[var(--concrete)] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
