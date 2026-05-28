import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 text-center">
      <h1 className="text-6xl font-black text-[var(--navy)] mb-4">404</h1>
      <p className="text-[var(--concrete)] text-xl mb-8">Page not found.</p>
      <Link href="/" className="btn btn-primary px-7 py-3">
        Back to Home
      </Link>
    </section>
  );
}
