import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}. How we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto prose prose-invert prose-amber">
          <h1 className="text-3xl font-extrabold text-[var(--foreground)]">Privacy Policy</h1>
          <p className="text-[var(--muted)]">Last updated: May 2026</p>

          <h2 className="text-[var(--foreground)]">Information We Collect</h2>
          <p className="text-[var(--muted)]">
            When you submit a quote request through our website, we collect your name, email
            address, phone number, event date, venue name, and any additional details you
            provide. We use this information solely to respond to your inquiry and provide
            our services.
          </p>

          <h2 className="text-[var(--foreground)]">How We Use Your Information</h2>
          <p className="text-[var(--muted)]">
            Your information is used to respond to your inquiry, provide quotes, and
            communicate about our services. We do not sell, rent, or share your personal
            information with third parties for marketing purposes.
          </p>

          <h2 className="text-[var(--foreground)]">Data Storage</h2>
          <p className="text-[var(--muted)]">
            Your form submissions are stored securely in our database (hosted by Supabase
            in Canada) and used only for business communication. Email notifications are
            sent via Resend.
          </p>

          <h2 className="text-[var(--foreground)]">Cookies</h2>
          <p className="text-[var(--muted)]">
            We use essential cookies for website functionality and analytics cookies
            (via Google Tag Manager) to understand how visitors use our site. You can
            disable cookies in your browser settings.
          </p>

          <h2 className="text-[var(--foreground)]">Your Rights</h2>
          <p className="text-[var(--muted)]">
            Under PIPEDA (Personal Information Protection and Electronic Documents Act),
            you have the right to access, correct, or delete your personal information.
            Contact us at {site.email} to make a request.
          </p>

          <h2 className="text-[var(--foreground)]">Contact</h2>
          <p className="text-[var(--muted)]">
            Questions about this policy? Email us at {site.email} or call {site.phone}.
          </p>
        </div>
      </div>
    </section>
  );
}
