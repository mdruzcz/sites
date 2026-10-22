import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects the information you send through this website.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="wrap max-w-3xl">
        <Breadcrumbs items={[{ name: "Privacy Policy" }]} />
        <h1 className="font-display text-4xl text-ink mt-6 mb-6">Privacy Policy</h1>
        <div className="prose-dark">
          <p>Last updated: October 22, 2026. This policy explains what {site.name} (&ldquo;we&rdquo;) collects through {site.domain} and how it is used.</p>
          <h2>What we collect</h2>
          <p>When you send a quote request we collect the details you type: your name, company or property, phone, email, property type, address or city, what you are interested in and any message. Our hosting and security providers record standard technical data such as IP address, browser and pages visited.</p>
          <h2>How we use it</h2>
          <p>To reply to your request, schedule a site visit, prepare a quote and deliver the services you book. We do not sell or rent your information. Quote requests are emailed to our office and stored in our customer database so we can follow up.</p>
          <h2>Service providers</h2>
          <p>Form submissions are protected by Cloudflare Turnstile, delivered by email through Resend and stored with Supabase. The site is hosted on Vercel. Each provider processes data only to provide its service to us.</p>
          <h2>Retention and your rights</h2>
          <p>We keep quote records for as long as needed to serve you and meet legal obligations. Under Canada&rsquo;s Personal Information Protection and Electronic Documents Act (PIPEDA) you may ask to access, correct or delete your information. Call {site.phone} or use the <Link href="/contact" className="text-[var(--accent-ink)] hover:underline">contact form</Link>.</p>
          <h2>Cookies and analytics</h2>
          <p>We use privacy-respecting, cookie-free page analytics to understand which pages are useful. No advertising trackers are installed.</p>
        </div>
      </div>
    </section>
  );
}
