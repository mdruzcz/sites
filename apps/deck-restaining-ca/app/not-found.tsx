import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 text-center">
      <div className="max-w-md mx-auto px-4">
        <h1 className="h-display text-4xl text-stone-900 mb-4">Page Not Found</h1>
        <p className="text-stone-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
