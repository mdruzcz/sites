import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-20 bg-[var(--background)]">
      <div className="max-w-lg mx-auto px-4 text-center">
        <p className="text-6xl font-black text-[var(--accent)] mb-4">404</p>
        <h1 className="text-2xl font-bold text-[var(--charcoal)] mb-3">Page Not Found</h1>
        <p className="text-[var(--concrete)] mb-8">
          This page doesn&apos;t exist. Try our homepage or contact us for a free deck staining estimate.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-primary">Back to Home</Link>
          <a href={site.phoneHref} className="btn btn-outline">{site.phone}</a>
        </div>
      </div>
    </section>
  );
}
