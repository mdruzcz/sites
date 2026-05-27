import type { Metadata } from "next";
import { site } from "@/lib/site";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Restore My Deck.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-gray">
      <h1>Privacy Policy</h1>
      <p>Last updated: January 1, 2024</p>
      <p>{site.name} (&quot;we&quot;, &quot;us&quot;) is committed to protecting your privacy. This policy explains how we collect, use and protect your personal information.</p>
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly when you submit a quote request: name, email address, phone number and project details. We also collect standard web analytics data (page views, browser type).</p>
      <h2>How We Use Your Information</h2>
      <p>We use your information solely to respond to your quote request and communicate about our services. We do not sell or share your personal information with third parties for marketing purposes.</p>
      <h2>Data Security</h2>
      <p>We use industry-standard security measures to protect your data. Form submissions are encrypted in transit and stored securely.</p>
      <h2>Contact Us</h2>
      <p>Questions? Email us at <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </div>
  );
}
