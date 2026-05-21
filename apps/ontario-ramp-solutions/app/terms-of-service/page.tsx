import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.name}.`,
  alternates: { canonical: `${site.url}/terms-of-service` },
  robots: { index: false, follow: false },
};

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <Link href="/" className="text-accent text-sm font-semibold hover:underline mb-8 block">← Back to Home</Link>
      <h1 className="h-display text-3xl sm:text-4xl text-gray-900 mb-8">Terms of Service</h1>
      <div className="prose-ors">
        <p>Last updated: May 2026</p>
        <h2>Services</h2>
        <p>Ontario Ramp Solutions provides wheelchair ramp installation, rental, and event accessibility services. All services are subject to written quotes and signed service agreements prior to commencement of work.</p>
        <h2>Rental Terms</h2>
        <p>Rental equipment remains the property of Ontario Ramp Solutions at all times. Renters are responsible for reasonable care of equipment during the rental period. Damaged equipment may be subject to repair or replacement charges.</p>
        <h2>Cancellation</h2>
        <p>Cancellations must be made at least 48 hours before scheduled delivery or installation to avoid cancellation fees. Event-based installations may require longer notice depending on project scope.</p>
        <h2>Warranty</h2>
        <p>Installation workmanship is guaranteed. Hardware warranties are as specified by the manufacturer. See your written service agreement for full warranty terms.</p>
        <h2>Contact</h2>
        <p>Questions? Email <a href={site.emailHref}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>.</p>
      </div>
    </div>
  );
}
