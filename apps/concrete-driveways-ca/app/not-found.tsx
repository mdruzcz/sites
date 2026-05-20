import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-xl">
        <p className="eyebrow">Page Not Found</p>
        <h1 className="h-display text-5xl sm:text-6xl text-[var(--charcoal)] mb-4">404</h1>
        <p className="text-lg text-[var(--concrete)] mb-8">
          That page doesn&apos;t exist — but our concrete driveways always do. Head back home or browse our services.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-primary">Back to Home</Link>
          <Link href="/services" className="btn btn-outline">View Services</Link>
          <a href={site.phoneHref} className="btn btn-ghost text-[var(--charcoal)] border-[var(--charcoal)]">Call {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
