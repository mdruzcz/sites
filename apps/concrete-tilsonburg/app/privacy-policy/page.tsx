import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name} — how we collect, use, and protect your personal information in accordance with PIPEDA.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <nav className="text-sm text-[var(--concrete)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
        <span className="mx-2">/</span>
        <span>Privacy Policy</span>
      </nav>

      <h1 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-2">Privacy Policy</h1>
      <p className="text-sm text-[var(--concrete)] mb-10">Last updated: May 2026</p>

      <div className="prose-cd space-y-8">
        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">1. Introduction</h2>
          <p>
            {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the personal information of our customers and website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information in accordance with Canada&apos;s Personal Information Protection and Electronic Documents Act (PIPEDA).
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">2. Information We Collect</h2>
          <p>We may collect the following personal information when you contact us or submit a quote request:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-[#475569]">
            <li>Name and contact information (phone number, email address)</li>
            <li>Project address or general location</li>
            <li>Details about your concrete project</li>
            <li>IP address and basic browser information (collected automatically)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-[#475569]">
            <li>Respond to your estimate requests and inquiries</li>
            <li>Schedule and complete concrete services</li>
            <li>Send you information relevant to your project</li>
            <li>Improve our website and services</li>
          </ul>
          <p className="mt-3">We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">4. Information Storage</h2>
          <p>
            Quote request submissions are stored securely in our database and transmitted via encrypted email. We retain customer information for as long as necessary to fulfill the purposes outlined in this policy or as required by law.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">5. Cookies</h2>
          <p>
            Our website may use cookies and similar tracking technologies to improve your browsing experience and analyze site usage. You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">6. Your Rights</h2>
          <p>Under PIPEDA, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-[#475569]">
            <li>Access the personal information we hold about you</li>
            <li>Request corrections to inaccurate information</li>
            <li>Withdraw consent for certain uses of your information</li>
            <li>File a complaint with the Office of the Privacy Commissioner of Canada</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-xl text-[var(--charcoal)] mb-3">7. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or how we handle your personal information, please contact us:
          </p>
          <div className="mt-3 space-y-1 text-[#475569]">
            <p>{site.name}</p>
            <p>Tillsonburg, ON</p>
            <p>
              Email:{" "}
              <a href={site.emailHref} className="text-[var(--accent)] hover:underline">
                {site.email}
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href={site.phoneHref} className="text-[var(--accent)] hover:underline">
                {site.phone}
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
