import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="eyebrow">404</p>
        <h1 className="h-display text-4xl text-[var(--charcoal)] mb-4">Page Not Found</h1>
        <p className="text-[var(--concrete)] mb-8 normal-case font-normal">
          We couldn&apos;t find that page. Try browsing our services or contact us for a free quote.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-primary">Back to Home</Link>
          <a href={site.phoneHref} className="btn btn-outline">Call Us Now</a>
        </div>
      </div>
    </div>
  );
}
