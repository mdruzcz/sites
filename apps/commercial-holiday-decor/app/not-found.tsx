import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-[var(--color-surface)] py-24 md:py-40">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="eyebrow eyebrow-star justify-center text-[var(--color-gold-text)] mb-5">404 — Page Not Found</p>
        <h1 className="font-display h2-fluid text-[var(--color-text)] mb-5">
          Lights Out on This Page
        </h1>
        <p className="lead mx-auto max-w-xl text-[var(--color-text-soft)] mb-10">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Try navigating from the menu above, or contact us if you need help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-ember group">
            Go Home
            <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/contact" className="btn-secondary">Contact Us</Link>
          <a href={site.phoneHref} className="btn-secondary">{site.phone}</a>
        </div>
      </div>
    </section>
  );
}
