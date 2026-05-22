import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Toronto Deck Stainers",
  description: "Privacy policy for Toronto Deck Stainers — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 sm:py-20 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 prose-cd">
        <h1>Privacy Policy</h1>
        <p><strong>Last updated: January 2025</strong></p>
        <p>
          Toronto Deck Stainers (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the website at{" "}
          <a href={site.url}>{site.url}</a>. This page informs you of our policies regarding the
          collection, use, and disclosure of personal information we receive from users of the site.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect information you voluntarily provide when you submit a quote request or contact form,
          including your name, email address, phone number, and project details. We do not collect any
          information automatically beyond standard server logs (IP address, browser type, pages visited)
          for analytics purposes.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use the information you provide solely to respond to your estimate request, schedule
          consultations, and provide services you&apos;ve requested. We do not sell, trade, or rent your
          personal information to third parties.
        </p>

        <h2>Email Communications</h2>
        <p>
          When you submit a quote request, we may send you a confirmation email and follow-up
          communications related to your project. You can opt out of marketing emails at any time by
          replying to any email we send.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain contact form submissions for up to 2 years for business record-keeping purposes.
          You may request deletion of your information at any time by contacting us at{" "}
          <a href={site.emailHref}>{site.email}</a>.
        </p>

        <h2>Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal
          information against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us at{" "}
          <a href={site.emailHref}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>.
        </p>
      </div>
    </section>
  );
}
