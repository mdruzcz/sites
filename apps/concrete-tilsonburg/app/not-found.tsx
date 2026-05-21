import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-7xl font-extrabold text-[var(--accent)] mb-4">404</p>
        <h1 className="h-display text-2xl sm:text-3xl text-[var(--charcoal)] mb-3">
          Page Not Found
        </h1>
        <p className="text-[var(--concrete)] mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Head back to one of these pages instead:
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
          <Link href="/" className="btn btn-primary text-base">
            Go Home
          </Link>
          <Link href="/services" className="btn btn-outline text-base">
            Our Services
          </Link>
          <Link href="/contact" className="btn btn-dark text-base">
            Contact Us
          </Link>
        </div>
        <p className="text-sm text-[var(--concrete)]">
          Or call us directly:{" "}
          <a href={site.phoneHref} className="text-[var(--accent)] font-semibold hover:underline">
            {site.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
