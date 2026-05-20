import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${site.name} privacy policy — how we handle the information you share when requesting a concrete driveway quote.`,
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-cd">
        <p className="eyebrow">Legal</p>
        <h1 className="h-display text-4xl text-[var(--charcoal)] mb-6">Privacy Policy</h1>
        <p className="text-sm text-[var(--concrete)] mb-8">Last updated: {new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</p>

        <h2 className="text-xl font-bold text-[var(--charcoal)] mt-8 mb-3">Information We Collect</h2>
        <p>
          When you request a quote through this website, we collect your name, phone number, email address, project address, and any details you share about the concrete work. We use this information only to provide a quote and communicate with you about your project.
        </p>

        <h2 className="text-xl font-bold text-[var(--charcoal)] mt-8 mb-3">How We Use Your Information</h2>
        <p>
          We use the information you provide to:
        </p>
        <ul className="list-disc pl-6 my-3">
          <li>Respond to your quote request</li>
          <li>Schedule on-site visits</li>
          <li>Send written estimates and project updates</li>
          <li>Follow up after the project is complete</li>
        </ul>
        <p>
          We do not sell, rent, or share your information with third-party marketers.
        </p>

        <h2 className="text-xl font-bold text-[var(--charcoal)] mt-8 mb-3">Data Storage</h2>
        <p>
          Quote requests are stored securely in our customer database. We retain records as long as needed to fulfill the project and meet legal/accounting requirements under Canadian law.
        </p>

        <h2 className="text-xl font-bold text-[var(--charcoal)] mt-8 mb-3">Your Rights (PIPEDA)</h2>
        <p>
          Under the Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to access the personal information we hold about you and to request corrections. To exercise these rights, email <a href={site.emailHref} className="text-[var(--accent)] font-semibold">{site.email}</a>.
        </p>

        <h2 className="text-xl font-bold text-[var(--charcoal)] mt-8 mb-3">Contact</h2>
        <p>
          Questions about this policy? Contact {site.name} at <a href={site.emailHref} className="text-[var(--accent)] font-semibold">{site.email}</a> or call <a href={site.phoneHref} className="text-[var(--accent)] font-semibold">{site.phone}</a>.
        </p>
      </div>
    </section>
  );
}
