import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.name} — the terms and conditions governing use of our website and concrete services.`,
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <nav className="text-sm text-[var(--concrete)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
        <span className="mx-2">/</span>
        <span>Terms of Service</span>
      </nav>

      <h1 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-2">Terms of Service</h1>
      <p className="text-sm text-[var(--concrete)] mb-10">Last updated: May 2026</p>

      <div className="prose-cd space-y-8">
        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the {site.name} website ({site.url}), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">2. Website Use</h2>
          <p>
            This website is provided for informational purposes and to facilitate contact with {site.name} for concrete services. You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">3. Quote Requests</h2>
          <p>
            Submitting a quote request through our website does not constitute a binding contract or guarantee of service availability. All estimates are subject to on-site assessment. Final pricing is confirmed in writing before any work begins.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">4. Service Terms</h2>
          <p>
            Concrete services are governed by the written service agreement provided at the time of booking. Payment terms, warranty coverage, project scope, and timelines are outlined in that agreement. In the event of any conflict between these Terms of Service and a signed service agreement, the service agreement prevails.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">5. Intellectual Property</h2>
          <p>
            All content on this website — including text, images, logos, and design — is the property of {site.name} and is protected by applicable Canadian copyright laws. You may not reproduce, distribute, or use any content without our written permission.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">6. Limitation of Liability</h2>
          <p>
            {site.name} is not liable for any indirect, incidental, or consequential damages arising from the use of this website or our services beyond the scope covered by our written workmanship warranty. Our liability is limited to the value of services provided.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">7. Governing Law</h2>
          <p>
            These Terms of Service are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any disputes shall be resolved in the courts of Ontario.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">8. Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated date. Continued use of our website constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">9. Contact</h2>
          <p>Questions about these Terms of Service? Contact us:</p>
          <div className="mt-3 space-y-1 text-[#475569]">
            <p>{site.name} — Tillsonburg, ON</p>
            <p>
              <a href={site.emailHref} className="text-[var(--accent)] hover:underline">{site.email}</a>
            </p>
            <p>
              <a href={site.phoneHref} className="text-[var(--accent)] hover:underline">{site.phone}</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
