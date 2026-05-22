import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}. How we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm">
        <h1 className="section-title mb-8">Privacy Policy</h1>
        <p>Last updated: May 2026</p>
        <p>{site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website {site.url}. This page informs you of our policies regarding the collection, use, and disclosure of personal information.</p>

        <h2>Information We Collect</h2>
        <p>When you submit a quote request or contact form, we collect your name, email address, phone number, and any project details you provide. We use this information solely to respond to your inquiry and provide our services.</p>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To respond to your quote request or inquiry</li>
          <li>To provide our retaining wall services</li>
          <li>To send follow-up communications about your project</li>
        </ul>

        <h2>Data Storage</h2>
        <p>Your information is stored securely using industry-standard encryption. We do not sell, trade, or otherwise transfer your personal information to outside parties.</p>

        <h2>Contact</h2>
        <p>If you have questions about this privacy policy, contact us at <a href={site.emailHref}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>.</p>
      </div>
    </section>
  );
}
