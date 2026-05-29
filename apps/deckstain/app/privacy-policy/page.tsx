import type { Metadata } from "next";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Privacy Policy | DeckStain.ca",
  description: "Privacy policy for DeckStain.ca — how we collect, use, and protect your personal information.",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="section bg-white">
      <div className="container max-w-3xl">
        <h1 className="h-display text-4xl text-[var(--charcoal)] mb-4">Privacy Policy</h1>
        <p className="text-[var(--concrete)] mb-8 normal-case font-normal">
          Last updated: {new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[var(--charcoal)] mb-3">1. Information We Collect</h2>
            <p className="text-[var(--concrete)] leading-relaxed normal-case font-normal">
              When you submit a quote request through our website, we collect personal information
              including your name, phone number, email address, and any project details or photos
              you choose to share. We also collect standard web analytics data such as page views
              and general geographic location through our analytics provider.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--charcoal)] mb-3">2. How We Use Your Information</h2>
            <p className="text-[var(--concrete)] leading-relaxed normal-case font-normal mb-3">
              We use the information you provide to:
            </p>
            <ul className="list-disc list-inside text-[var(--concrete)] space-y-2 normal-case font-normal">
              <li>Respond to your quote requests and project inquiries</li>
              <li>Schedule and confirm service appointments</li>
              <li>Send invoices and payment confirmations</li>
              <li>Improve our services and website experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--charcoal)] mb-3">3. Information Sharing</h2>
            <p className="text-[var(--concrete)] leading-relaxed normal-case font-normal">
              We do not sell, trade, or rent your personal information to third parties. We may
              share information with trusted service providers (such as our email platform) solely
              for the purpose of operating our business and serving you. These providers are bound
              by confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--charcoal)] mb-3">4. Data Security</h2>
            <p className="text-[var(--concrete)] leading-relaxed normal-case font-normal">
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or
              destruction. Form submissions are encrypted and stored securely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--charcoal)] mb-3">5. Cookies</h2>
            <p className="text-[var(--concrete)] leading-relaxed normal-case font-normal">
              Our website uses essential cookies to function properly and analytics cookies to
              understand how visitors use our site. We do not use cookies for advertising or
              tracking across other websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--charcoal)] mb-3">6. Your Rights</h2>
            <p className="text-[var(--concrete)] leading-relaxed normal-case font-normal">
              You have the right to access, correct, or request deletion of your personal
              information at any time. To exercise these rights, please contact us at{" "}
              <a href={site.emailHref} className="text-[var(--accent)] hover:underline">
                {site.email}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--charcoal)] mb-3">7. Contact Us</h2>
            <p className="text-[var(--concrete)] leading-relaxed normal-case font-normal">
              If you have questions about this privacy policy or how we handle your data, please
              contact us:
            </p>
            <div className="mt-3 text-[var(--concrete)] normal-case font-normal">
              <p>
                <strong className="text-[var(--charcoal)]">{site.name}</strong>
              </p>
              <p>Phone: <a href={site.phoneHref} className="text-[var(--accent)]">{site.phone}</a></p>
              <p>Email: <a href={site.emailHref} className="text-[var(--accent)]">{site.email}</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
