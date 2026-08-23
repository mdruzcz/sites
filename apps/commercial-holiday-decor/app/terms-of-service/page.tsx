import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Commercial Holiday Decor's terms of service governing use of our website and services.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsPage() {
  return (
    <section className="bg-[var(--color-surface)] py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-x-1.5 text-xs text-[var(--color-muted)]">
          <Link href="/" className="transition hover:text-[var(--color-green-text)] hover:underline">Home</Link>
          <span aria-hidden className="text-[var(--color-border-strong)]">/</span>
          <span className="text-[var(--color-text)]" aria-current="page">Terms of Service</span>
        </nav>
        <h1 className="font-display h2-fluid text-[var(--color-text)] mb-6">Terms of Service</h1>
        <p className="text-sm text-[var(--color-muted)] mb-8">Last updated: May 2025</p>

        <div className="prose-clean max-w-none space-y-6">
          <section>
            <h2 className="font-display h3-fluid text-[var(--color-text)] mb-3">1. Acceptance of Terms</h2>
            <p>By using the Commercial Holiday Decor website and services, you agree to these terms. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="font-display h3-fluid text-[var(--color-text)] mb-3">2. Services</h2>
            <p>Commercial Holiday Decor provides permanent outdoor LED lighting installation, repair, maintenance, and consultation services in Southwestern Ontario. Specific terms for each engagement are set out in our service agreement provided at the time of booking.</p>
          </section>

          <section>
            <h2 className="font-display h3-fluid text-[var(--color-text)] mb-3">3. Quotes and Pricing</h2>
            <p>All quotes provided are estimates based on information available at the time. Final pricing is confirmed after an on-site assessment. We provide detailed, written quotes before any work begins.</p>
          </section>

          <section>
            <h2 className="font-display h3-fluid text-[var(--color-text)] mb-3">4. Warranty</h2>
            <p>Our lifetime warranty covers LED lights, mounting hardware, and installation workmanship as described in the warranty documentation provided at installation. The warranty is non-transferable and applies to residential installations only unless otherwise agreed in writing.</p>
          </section>

          <section>
            <h2 className="font-display h3-fluid text-[var(--color-text)] mb-3">5. Limitation of Liability</h2>
            <p>Commercial Holiday Decor&apos;s liability is limited to the value of the services provided. We are not responsible for indirect, incidental, or consequential damages.</p>
          </section>

          <section>
            <h2 className="font-display h3-fluid text-[var(--color-text)] mb-3">6. Contact</h2>
            <p>For questions about these terms, contact us at <a href={site.emailHref} className="text-[var(--color-ember-text)] hover:underline">{site.email}</a>.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
