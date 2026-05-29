import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "London Fence Installer privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-[var(--muted)] mb-6">
          <Link href="/" className="hover:text-[var(--green)]">Home</Link>
          <span className="mx-2">›</span>
          <span>Privacy Policy</span>
        </nav>
        <h1 className="text-3xl font-extrabold mb-6">Privacy Policy</h1>
        <div className="prose max-w-none text-[var(--muted)] space-y-4 text-sm leading-relaxed">
          <p>Last updated: 2024</p>
          <p>
            {site.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website {site.url}. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
          </p>
          <h2 className="text-lg font-bold text-[var(--foreground)] mt-6">Information We Collect</h2>
          <p>We collect information you voluntarily provide through our contact and quote request forms, including your name, email address, and phone number. We also collect standard web analytics data (pages visited, referring websites, browser type) through analytics tools.</p>
          <h2 className="text-lg font-bold text-[var(--foreground)] mt-6">How We Use Your Information</h2>
          <p>We use your personal information to respond to your quote requests and inquiries, communicate about our fencing services, and improve our website and services. We do not sell or rent your personal information to third parties.</p>
          <h2 className="text-lg font-bold text-[var(--foreground)] mt-6">Contact Us</h2>
          <p>If you have questions about this privacy policy, contact us at <a href={site.emailHref} className="text-[var(--green)] hover:underline">{site.email}</a> or by phone at <a href={site.phoneHref} className="text-[var(--green)] hover:underline">{site.phone}</a>.</p>
        </div>
      </div>
    </section>
  );
}
