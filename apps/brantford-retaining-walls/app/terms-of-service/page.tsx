import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.name}. Terms and conditions for using our website and services.`,
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm">
        <h1 className="section-title mb-8">Terms of Service</h1>
        <p>Last updated: May 2026</p>
        <p>By accessing and using the {site.name} website ({site.url}), you agree to the following terms and conditions.</p>

        <h2>Services</h2>
        <p>We provide retaining wall installation, repair, and hardscaping services in Brantford, Ontario and surrounding areas. All quotes provided are estimates and final pricing may vary based on site conditions.</p>

        <h2>Estimates & Quotes</h2>
        <p>All estimates provided through our website are non-binding and subject to on-site verification. Final pricing will be confirmed in a written agreement before work begins.</p>

        <h2>Warranty</h2>
        <p>All installations include a written workmanship warranty. Specific warranty terms will be detailed in your project agreement.</p>

        <h2>Limitation of Liability</h2>
        <p>The information on this website is provided for general informational purposes. While we strive to keep information current and accurate, we make no representations or warranties about the completeness or accuracy of any information on this site.</p>

        <h2>Contact</h2>
        <p>For questions about these terms, contact us at <a href={site.emailHref}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>.</p>
      </div>
    </section>
  );
}
