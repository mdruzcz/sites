import type { Metadata } from "next";
import { Footer } from "../_components/sections";
import { NavBar } from "../_components/sections-interactive";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How London Deck Builder collects, uses, stores and protects the personal information you share with us — fully compliant with Canada's PIPEDA.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    url: "/privacy",
    title: "Privacy Policy | London Deck Builder",
    description:
      "How London Deck Builder collects, uses and protects your personal information.",
  },
};

export const revalidate = 3600;

export default function PrivacyPage() {
  const updated = "May 26, 2026";
  return (
    <main>
      <NavBar homeHref="/" />

      <section className="pt-32 pb-10" style={{ backgroundColor: "var(--wood-dark)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>
            Legal
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-white/60">Last updated: {updated}</p>
        </div>
      </section>

      <article className="py-12 lg:py-16" style={{ backgroundColor: "var(--cream)" }}>
        <div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:lg:text-3xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-base [&_p]:lg:text-lg [&_p]:leading-relaxed [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2 [&_li]:text-base [&_li]:lg:text-lg [&_li]:leading-relaxed [&_a]:underline"
          style={{ color: "var(--wood)" }}
        >
          <p style={{ color: "var(--wood-dark)" }}>
            London Deck Builder (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy and is committed to handling your personal information responsibly. This Privacy Policy explains what we collect, why we collect it, how we use and store it, and the rights you have under Canadian privacy law — including the federal <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA).
          </p>

          <h2 style={{ color: "var(--wood-dark)" }}>1. Information we collect</h2>
          <p>We only collect information that you voluntarily provide or that is necessary for us to deliver our services. Specifically:</p>
          <ul>
            <li><strong>Quote form data:</strong> your name, email address, phone number, project address, city, project description, how you heard about us, and any photo you choose to attach.</li>
            <li><strong>Phone calls and emails:</strong> any contact information and project details you share when you call (519) 914-1663 or email us directly.</li>
            <li><strong>Analytics data:</strong> aggregate, anonymized website usage data collected through our self-hosted analytics tool (Umami) — pages visited, approximate region, device type, referring source. We do not use third-party advertising cookies. We do not sell your data.</li>
            <li><strong>Spam prevention:</strong> Google reCAPTCHA may be loaded on our quote form to detect automated submissions. reCAPTCHA is governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google&rsquo;s Privacy Policy</a>.</li>
          </ul>

          <h2 style={{ color: "var(--wood-dark)" }}>2. How we use your information</h2>
          <p>We use the information you provide to:</p>
          <ul>
            <li>Respond to your quote request and prepare a written estimate.</li>
            <li>Schedule on-site visits, design consultations, and deck builds.</li>
            <li>Send service updates, project timelines, invoices, and warranty information.</li>
            <li>Improve our website, services, and customer experience.</li>
            <li>Meet legal, regulatory, tax, and accounting obligations.</li>
          </ul>

          <h2 style={{ color: "var(--wood-dark)" }}>3. Lawful basis</h2>
          <p>We rely on two lawful bases under PIPEDA:</p>
          <ul>
            <li><strong>Consent</strong> — by submitting our quote form or contacting us, you consent to us using your information to respond.</li>
            <li><strong>Legitimate interest</strong> — basic, anonymized analytics that help us improve the site, and reasonable record-keeping after a project (warranty service, accounting).</li>
          </ul>

          <h2 style={{ color: "var(--wood-dark)" }}>4. Where your data is stored</h2>
          <p>Quote form submissions are stored in two systems:</p>
          <ul>
            <li><strong>Supabase</strong> — a database hosted in Canada (Toronto region). We use Supabase to retain quote requests for follow-up and for warranty records.</li>
            <li><strong>Resend</strong> — used to deliver the email notification of your quote request to our service inbox. Emails may transit through Resend&rsquo;s infrastructure (United States).</li>
          </ul>
          <p>Both providers are bound by contractual data-protection terms. We do not share your information with any other third parties for marketing purposes.</p>

          <h2 style={{ color: "var(--wood-dark)" }}>5. How long we keep your information</h2>
          <p>We retain quote requests for as long as is reasonably necessary to:</p>
          <ul>
            <li>Follow up on the quote (typically 6&ndash;12 months for unconverted leads).</li>
            <li>Service the project and the 5-year workmanship warranty (the duration of the warranty plus 12 months).</li>
            <li>Meet accounting and tax record-keeping requirements (currently 7 years under Canadian law).</li>
          </ul>
          <p>You can request earlier deletion at any time — see Section 7.</p>

          <h2 style={{ color: "var(--wood-dark)" }}>6. Cookies &amp; tracking</h2>
          <p>We use one strictly-necessary analytics cookie set by Umami for anonymous usage measurement. We do not use third-party advertising or social-media tracking cookies, and we do not run remarketing campaigns from this website.</p>

          <h2 style={{ color: "var(--wood-dark)" }}>7. Your rights</h2>
          <p>Under PIPEDA you have the right to:</p>
          <ul>
            <li>Request access to the personal information we hold about you.</li>
            <li>Correct inaccurate information.</li>
            <li>Withdraw consent and request deletion of your information (subject to legal record-keeping minimums).</li>
            <li>Receive a copy of your information in a portable format.</li>
            <li>File a complaint with the <a href="https://www.priv.gc.ca/" target="_blank" rel="noopener">Office of the Privacy Commissioner of Canada</a> if you believe we&rsquo;ve mishandled your information.</li>
          </ul>

          <h2 style={{ color: "var(--wood-dark)" }}>8. Contact for privacy inquiries</h2>
          <p>For privacy questions, access requests, or corrections, email us at <a href="mailto:service@masterdecker.com">service@masterdecker.com</a> with &ldquo;Privacy Inquiry&rdquo; in the subject line, or call <a href="tel:5199141663">(519) 914-1663</a>. We&rsquo;ll acknowledge within 5 business days and respond fully within 30 days.</p>

          <h2 style={{ color: "var(--wood-dark)" }}>9. Changes to this policy</h2>
          <p>We may update this policy when our practices change. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent version. Material changes will be highlighted on this page for at least 30 days.</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
