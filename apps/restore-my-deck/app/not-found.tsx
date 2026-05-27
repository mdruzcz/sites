import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="text-6xl font-extrabold text-[var(--accent)] mb-4">404</div>
      <h1 className="text-2xl font-bold text-[var(--dark)] mb-3">Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.</p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link href="/" className="btn btn-accent">Back to Home</Link>
        <Link href="/contact-us" className="btn btn-outline">Contact Us</Link>
      </div>
    </div>
  );
}
