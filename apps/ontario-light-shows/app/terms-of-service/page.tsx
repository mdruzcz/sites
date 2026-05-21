import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.name}.`,
  alternates: { canonical: `${site.url}/terms-of-service` },
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-24 bg-midnight">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-ols">
        <h1 className="h-display text-4xl text-white mb-2">Terms of Service</h1>
        <p className="text-muted text-sm mb-8">Last updated: {new Date().getFullYear()}</p>

        <h2>Project quotes</h2>
        <p>
          Quotes provided through this site are estimates only and not a guarantee of final price. Final pricing is confirmed in writing after an on-site or detailed virtual consultation.
        </p>

        <h2>Site content</h2>
        <p>
          All content on {site.url} is the property of {site.name} unless otherwise noted. You may reference our work with attribution, but please do not republish or modify without written permission.
        </p>

        <h2>Liability</h2>
        <p>
          {site.name} provides this site &ldquo;as is.&rdquo; We make our best effort to ensure accuracy but assume no liability for content or links to third-party sites.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email <a href={site.emailHref}>{site.email}</a>.
        </p>
      </div>
    </section>
  );
}
