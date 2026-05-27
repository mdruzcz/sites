import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "London Fence Installer terms of service — the terms and conditions governing use of our website and fencing services.",
};

export default function TermsOfServicePage() {
  return (
    <section className="section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-[var(--muted)] mb-6">
          <Link href="/" className="hover:text-[var(--green)]">Home</Link>
          <span className="mx-2">›</span>
          <span>Terms of Service</span>
        </nav>
        <h1 className="text-3xl font-extrabold mb-6">Terms of Service</h1>
        <div className="prose max-w-none text-[var(--muted)] space-y-4 text-sm leading-relaxed">
          <p>Last updated: 2024</p>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. Please read these Terms of Service carefully before using {site.url}.
          </p>
          <h2 className="text-lg font-bold text-[var(--foreground)] mt-6">Use of Website</h2>
          <p>This website is provided for informational purposes about {site.name}&apos;s fencing services. You may use this website for personal, non-commercial purposes only. You must not use this website for any unlawful purpose.</p>
          <h2 className="text-lg font-bold text-[var(--foreground)] mt-6">Intellectual Property</h2>
          <p>All content on this website, including text, graphics, logos, and images, is the property of {site.name} and is protected by applicable copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
          <h2 className="text-lg font-bold text-[var(--foreground)] mt-6">Disclaimer</h2>
          <p>The information on this website is provided &quot;as is&quot; without any representations or warranties, express or implied. {site.name} makes no representations or warranties in relation to this website or the information and materials provided on this website.</p>
          <h2 className="text-lg font-bold text-[var(--foreground)] mt-6">Contact Us</h2>
          <p>If you have questions about these terms, contact us at <a href={site.emailHref} className="text-[var(--green)] hover:underline">{site.email}</a>.</p>
        </div>
      </div>
    </section>
  );
}
