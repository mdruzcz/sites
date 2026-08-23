import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Commercial Holiday Decor's privacy policy — how we collect, use, and protect your personal information in accordance with PIPEDA.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-[var(--color-surface)] py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-x-1.5 text-xs text-[var(--color-muted)]">
          <Link href="/" className="transition hover:text-[var(--color-green-text)] hover:underline">Home</Link>
          <span aria-hidden className="text-[var(--color-border-strong)]">/</span>
          <span className="text-[var(--color-text)]" aria-current="page">Privacy Policy</span>
        </nav>
        <h1 className="font-display h2-fluid text-[var(--color-text)] mb-6">Privacy Policy</h1>
        <p className="text-sm text-[var(--color-muted)] mb-8">Last updated: May 2025</p>

        <div className="prose-clean max-w-none space-y-6">
          <section>
            <h2 className="font-display h3-fluid text-[var(--color-text)] mb-3">1. Information We Collect</h2>
            <p>When you contact us through our website, we collect the information you provide, including your name, phone number, email address, home address, and project details. We also collect standard web analytics data (page views, device type, referring URL) to improve our website.</p>
          </section>

          <section>
            <h2 className="font-display h3-fluid text-[var(--color-text)] mb-3">2. How We Use Your Information</h2>
            <p>We use your information solely to respond to your quote requests, schedule consultations, deliver our services, and communicate with you about your project. We do not sell or rent your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-display h3-fluid text-[var(--color-text)] mb-3">3. Data Storage</h2>
            <p>Form submissions are stored securely in our database and are accessible only to Commercial Holiday Decor staff. We retain records for as long as necessary to provide our services and comply with applicable law.</p>
          </section>

          <section>
            <h2 className="font-display h3-fluid text-[var(--color-text)] mb-3">4. Cookies</h2>
            <p>Our website uses cookies for basic functionality and anonymous analytics. We do not use advertising cookies or cross-site tracking.</p>
          </section>

          <section>
            <h2 className="font-display h3-fluid text-[var(--color-text)] mb-3">5. Your Rights (PIPEDA)</h2>
            <p>Under Canada&apos;s Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to access, correct, and request deletion of your personal information. To exercise these rights, contact us at {site.email}.</p>
          </section>

          <section>
            <h2 className="font-display h3-fluid text-[var(--color-text)] mb-3">6. Contact</h2>
            <p>For privacy-related questions, contact us at <a href={site.emailHref} className="text-[var(--color-ember-text)] hover:underline">{site.email}</a> or call <a href={site.phoneHref} className="text-[var(--color-ember-text)] hover:underline">{site.phone}</a>.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
