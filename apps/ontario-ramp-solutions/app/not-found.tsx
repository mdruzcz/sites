import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="eyebrow">404</p>
        <h1 className="h-display text-4xl sm:text-5xl text-gray-900 mb-4">Page not found</h1>
        <p className="text-muted-strong text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-primary">Back to Home</Link>
          <Link href="/contact" className="btn btn-ghost">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
