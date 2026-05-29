import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | Celebrate Lighting",
  description: "Celebrate Lighting's terms of service governing use of our website and services.",
};

export default function TermsPage() {
  return (
    <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-[var(--muted)] mb-8">
          <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
          <span className="mx-2">/</span>
          <span>Terms of Service</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-[var(--foreground)] mb-6">Terms of Service</h1>
        <p className="text-sm text-[var(--muted)] mb-8">Last updated: May 2025</p>

        <div className="space-y-6 text-[var(--muted)]">
          <section>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">1. Acceptance of Terms</h2>
            <p>By using the Celebrate Lighting website and services, you agree to these terms. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">2. Services</h2>
            <p>Celebrate Lighting provides permanent outdoor LED lighting installation, repair, maintenance, and consultation services in Southwestern Ontario. Specific terms for each engagement are set out in our service agreement provided at the time of booking.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">3. Quotes and Pricing</h2>
            <p>All quotes provided are estimates based on information available at the time. Final pricing is confirmed after an on-site assessment. We provide detailed, written quotes before any work begins.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">4. Warranty</h2>
            <p>Our lifetime warranty covers LED lights, mounting hardware, and installation workmanship as described in the warranty documentation provided at installation. The warranty is non-transferable and applies to residential installations only unless otherwise agreed in writing.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">5. Limitation of Liability</h2>
            <p>Celebrate Lighting&apos;s liability is limited to the value of the services provided. We are not responsible for indirect, incidental, or consequential damages.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">6. Contact</h2>
            <p>For questions about these terms, contact us at <a href={site.emailHref} className="text-[var(--accent)] hover:underline">{site.email}</a>.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
