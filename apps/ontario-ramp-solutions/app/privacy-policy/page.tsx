import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
  alternates: { canonical: `${site.url}/privacy-policy` },
  robots: { index: false, follow: false },
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <Link href="/" className="text-accent text-sm font-semibold hover:underline mb-8 block">← Back to Home</Link>
      <h1 className="h-display text-3xl sm:text-4xl text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose-ors">
        <p>Last updated: May 2026</p>
        <h2>Information We Collect</h2>
        <p>When you submit a quote request through our website, we collect your name, email address, phone number, city, and any project details you provide. We use this information solely to respond to your inquiry.</p>
        <h2>How We Use Your Information</h2>
        <p>Your contact information is used only to follow up on your quote request. We do not sell or share your information with third parties for marketing purposes.</p>
        <h2>Data Storage</h2>
        <p>Quote requests are stored securely in our database. We retain inquiry records for up to 2 years for business purposes.</p>
        <h2>Contact</h2>
        <p>Questions about this policy? Email us at <a href={site.emailHref}>{site.email}</a>.</p>
      </div>
    </div>
  );
}
