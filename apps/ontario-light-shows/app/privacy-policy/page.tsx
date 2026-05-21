import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
  alternates: { canonical: `${site.url}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 sm:py-24 bg-midnight">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-ols">
        <h1 className="h-display text-4xl text-white mb-2">Privacy Policy</h1>
        <p className="text-muted text-sm mb-8">Last updated: {new Date().getFullYear()}</p>

        <p>{site.name} respects your privacy. This page describes what we collect when you use this site and how it&apos;s used.</p>

        <h2>What we collect</h2>
        <ul>
          <li>Information you submit through the quote form (name, phone, email, project city, project type, project details).</li>
          <li>Anonymous web analytics (pages visited, referring source) via a self-hosted analytics tool. We don&apos;t use third-party advertising trackers.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To reply to your quote request and follow up about your project.</li>
          <li>To improve the site based on which pages people actually visit.</li>
        </ul>

        <h2>What we don&apos;t do</h2>
        <ul>
          <li>We don&apos;t sell, rent, or trade your information.</li>
          <li>We don&apos;t email you unless you&apos;ve asked us to.</li>
        </ul>

        <h2>Contact</h2>
        <p>
          Questions? Email <a href={site.emailHref}>{site.email}</a> or call {site.phone}.
        </p>
      </div>
    </section>
  );
}
