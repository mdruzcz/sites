import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `${site.name} terms of service — the agreement covering use of this website.`,
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-cd">
        <p className="eyebrow">Legal</p>
        <h1 className="h-display text-4xl text-[var(--charcoal)] mb-6">Terms of Service</h1>
        <p className="text-sm text-[var(--concrete)] mb-8">Last updated: {new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</p>

        <h2 className="text-xl font-bold text-[var(--charcoal)] mt-8 mb-3">Website Use</h2>
        <p>
          By using {site.url}, you agree to these terms. We reserve the right to update them at any time. Continued use of the site after changes constitutes acceptance.
        </p>

        <h2 className="text-xl font-bold text-[var(--charcoal)] mt-8 mb-3">Quotes & Estimates</h2>
        <p>
          Quotes provided on this site or through follow-up communication are estimates based on the information you share. Final pricing is confirmed in a written, signed estimate after our on-site visit. Quotes are valid for 30 days unless otherwise noted.
        </p>

        <h2 className="text-xl font-bold text-[var(--charcoal)] mt-8 mb-3">Content</h2>
        <p>
          All photos, copy, and marks on this site are property of {site.name} or used with permission. Do not reproduce without written consent.
        </p>

        <h2 className="text-xl font-bold text-[var(--charcoal)] mt-8 mb-3">Limitation of Liability</h2>
        <p>
          The information on this site is provided as-is. {site.name} is not liable for indirect or consequential damages arising from use of this website. Work performed under a signed contract is governed by that contract and our written workmanship warranty.
        </p>

        <h2 className="text-xl font-bold text-[var(--charcoal)] mt-8 mb-3">Contact</h2>
        <p>
          Questions about these terms? Email <a href={site.emailHref} className="text-[var(--accent)] font-semibold">{site.email}</a>.
        </p>
      </div>
    </section>
  );
}
