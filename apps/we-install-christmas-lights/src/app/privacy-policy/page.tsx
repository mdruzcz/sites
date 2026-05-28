import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How We Install Christmas Lights collects, uses, and protects your information.",
  alternates: { canonical: `${site.url}/privacy-policy` },
};

export default function PrivacyPolicy() {
  return (
    <section className="section">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose">
        <h1 className="heading-display text-3xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[color:var(--ink-soft)]">Last updated: 2026-05-28</p>
        <p>
          We Install Christmas Lights (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what information we collect and how we use it.
        </p>
        <h2 className="heading-display text-lg mt-8">Information We Collect</h2>
        <p>
          We collect the information you give us through our contact form (name, email, phone, city, message). We also collect basic analytics (page views, referring pages) via privacy-respecting tools.
        </p>
        <h2 className="heading-display text-lg mt-6">How We Use It</h2>
        <p>
          We use your contact details to respond to your quote request and to follow up on service. We do not sell or rent your information.
        </p>
        <h2 className="heading-display text-lg mt-6">Cookies</h2>
        <p>
          Our analytics tools may set cookies for visitor measurement. You can disable cookies in your browser settings.
        </p>
        <h2 className="heading-display text-lg mt-6">Contact</h2>
        <p>
          Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </section>
  );
}
