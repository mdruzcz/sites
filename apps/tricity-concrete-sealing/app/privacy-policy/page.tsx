import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | TriCity Concrete Sealing",
  description: "Privacy policy for TriCity Concrete Sealing.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-cd">
        <h1 className="h-display text-3xl sm:text-4xl text-[var(--navy)] mb-8">Privacy Policy</h1>
        <p className="text-[var(--concrete)] mb-4"><strong>Last updated:</strong> May 2026</p>

        <div className="space-y-6 text-[var(--concrete)] leading-relaxed">
          <p>
            {site.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your personal information.
            This privacy policy describes how we collect, use, and protect data submitted through our website.
          </p>

          <div>
            <h2 className="font-bold text-[var(--navy)] text-xl mb-3">Information We Collect</h2>
            <p>When you submit our contact or quote form, we collect your name, email address, phone number (optional), project address (optional), and service details. This information is used solely to respond to your inquiry.</p>
          </div>

          <div>
            <h2 className="font-bold text-[var(--navy)] text-xl mb-3">How We Use Your Information</h2>
            <p>We use your information to respond to quote requests, schedule site assessments, and communicate about your project. We do not sell or share your personal information with third parties for marketing purposes.</p>
          </div>

          <div>
            <h2 className="font-bold text-[var(--navy)] text-xl mb-3">Data Storage</h2>
            <p>Form submissions are stored securely using Supabase. Email notifications are sent via Resend. Both services maintain industry-standard security practices.</p>
          </div>

          <div>
            <h2 className="font-bold text-[var(--navy)] text-xl mb-3">Contact</h2>
            <p>If you have questions about this policy or your personal data, email us at <a href={site.emailHref} className="text-[var(--accent)] hover:underline">{site.email}</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
