import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | Toronto Deck Stainers",
  description: "Terms of service for Toronto Deck Stainers — the terms governing use of our website and services.",
};

export default function TermsOfServicePage() {
  return (
    <section className="py-16 sm:py-20 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 prose-cd">
        <h1>Terms of Service</h1>
        <p><strong>Last updated: January 2025</strong></p>
        <p>
          By accessing the Toronto Deck Stainers website at <a href={site.url}>{site.url}</a>, you agree
          to be bound by these terms of service. If you do not agree, please do not use our website.
        </p>

        <h2>Use of Website</h2>
        <p>
          This website is provided for informational purposes and to facilitate requests for deck staining,
          sealing, and restoration services in Toronto and the GTA. You may use this site only for lawful
          purposes and in accordance with these terms.
        </p>

        <h2>Service Estimates</h2>
        <p>
          Quote requests submitted through this website are not binding contracts. All estimates are
          subject to on-site assessment. Final pricing is provided in a written estimate following an
          in-person evaluation of your project.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on this website, including text, images, logos, and design, is the property of
          Toronto Deck Stainers and is protected by applicable copyright and intellectual property laws.
          You may not reproduce or distribute any content without our express written permission.
        </p>

        <h2>Disclaimer of Warranties</h2>
        <p>
          This website is provided on an &ldquo;as is&rdquo; basis. Toronto Deck Stainers makes no
          warranties, expressed or implied, regarding the accuracy or completeness of any information
          on this site.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Toronto Deck Stainers shall not be liable for any indirect, incidental, or consequential
          damages arising out of your use of this website.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be directed to <a href={site.emailHref}>{site.email}</a>.
        </p>
      </div>
    </section>
  );
}
