import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-cd">
        <h1 className="h-display text-3xl text-[var(--charcoal)] mb-6">Privacy Policy</h1>
        <p className="text-[var(--concrete)] mb-4">Last updated: {new Date().getFullYear()}</p>
        <p>We collect only the information you voluntarily provide through our contact form (name, phone, email, service details). This information is used solely to respond to your quote request. We do not sell or share your information with third parties.</p>
        <p className="mt-4">Contact us at <a href={site.emailHref} className="text-[var(--accent)]">{site.email}</a> with any privacy questions.</p>
      </div>
    </section>
  );
}
