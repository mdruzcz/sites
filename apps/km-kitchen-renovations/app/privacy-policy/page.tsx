import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | K&M Kitchen Renovations",
  description: "Privacy policy for K&M Kitchen Renovations.",
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="h-display text-[var(--navy)] text-4xl mb-3">Privacy Policy</h1>
        <p className="text-[var(--slate-light)] text-sm mb-10">Last updated: {new Date().getFullYear()}</p>
        <div className="prose prose-slate max-w-none space-y-6 text-[var(--slate)] leading-relaxed">
          <p>K&M Kitchen Renovations (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains how we collect and use your personal information.</p>
          <h2 className="text-[var(--navy)] font-bold text-xl">Information We Collect</h2>
          <p>We collect information you provide directly, such as your name, email, phone number, and project details when you submit a quote request or contact us.</p>
          <h2 className="text-[var(--navy)] font-bold text-xl">How We Use Your Information</h2>
          <p>We use your information solely to respond to your inquiry and provide renovation services. We do not sell or share your personal information with third parties for marketing purposes.</p>
          <h2 className="text-[var(--navy)] font-bold text-xl">Contact</h2>
          <p>For privacy questions, contact us at <a href={`mailto:${SITE.email}`} className="text-[var(--gold)] underline">{SITE.email}</a>.</p>
        </div>
      </div>
    </div>
  );
}
