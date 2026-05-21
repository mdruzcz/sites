import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm">
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().getFullYear()}</p>
        <p>
          {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates {site.url}. This page informs you of our policies regarding the collection, use, and disclosure of personal information we receive from users of the site.
        </p>
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us when you submit a quote request form, including your name, phone number, email address, and project details.</p>
        <h2>How We Use Your Information</h2>
        <p>We use the information you provide to respond to your quote requests, contact you about your project, and improve our services.</p>
        <h2>Contact Us</h2>
        <p>If you have questions about this policy, contact us at <a href={site.emailHref}>{site.email}</a>.</p>
      </div>
    </section>
  );
}
