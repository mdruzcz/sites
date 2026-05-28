import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-[var(--background)]">
      <div className="text-center px-4 max-w-lg">
        <p className="text-7xl font-bold text-[var(--accent)] mb-4" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
          404
        </p>
        <h1
          className="text-3xl font-bold text-[var(--foreground)] mb-4"
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          Page Not Found
        </h1>
        <p className="text-[var(--muted)] text-base leading-relaxed mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It may have moved, or the URL might be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary min-h-[48px] px-8">
            Go Home
          </Link>
          <Link href="/contact" className="btn btn-ghost-dark min-h-[48px] px-8">
            Get a Quote
          </Link>
        </div>
        <p className="mt-8 text-sm text-[var(--muted)]">
          Or call us directly:{" "}
          <a href={site.phoneHref} className="text-[var(--accent)] hover:underline font-medium">
            {site.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
