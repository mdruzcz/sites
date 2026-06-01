import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PageHead } from "@/components/PageHead";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DeckStain.ca collects, uses, and protects your personal information.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  const sections = [
    { h: "Information we collect", b: "When you submit a quote request we collect your name, phone number, email address, city, and any project details or photos you choose to share. We also collect standard, anonymized web-analytics data such as page views." },
    { h: "How we use it", b: "We use your information only to respond to your quote request, schedule and complete your project, send invoices, and improve our website. We never use it for advertising across other sites." },
    { h: "Information sharing", b: "We do not sell, trade, or rent your personal information. We share it only with trusted service providers (such as our email platform) strictly to operate our business and serve you." },
    { h: "Data security", b: "We use appropriate technical and organizational measures to protect your information. Form submissions are transmitted securely and stored with access controls." },
    { h: "Cookies", b: "Our site uses essential cookies to function and privacy-respecting analytics to understand how visitors use the site. We do not use advertising or cross-site tracking cookies." },
    { h: "Your rights", b: "You may request access to, correction of, or deletion of your personal information at any time by contacting us." },
  ];
  return (
    <>
      <PageHead eyebrow="Legal" title="Privacy Policy" crumbs={[{ name: "Home", href: "/" }, { name: "Privacy", href: "/privacy" }]} />
      <section className="sec bg-white">
        <div className="wrap max-w-3xl">
          <p className="text-[var(--ink-3)] text-sm mb-7">Last updated {new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</p>
          <div className="space-y-7">
            {sections.map((s, i) => (
              <section key={i}><h2 className="h text-xl text-[var(--ink)] mb-1.5">{i + 1}. {s.h}</h2><p className="muted leading-relaxed">{s.b}</p></section>
            ))}
            <section><h2 className="h text-xl text-[var(--ink)] mb-1.5">7. Contact</h2><p className="muted leading-relaxed">Questions about this policy? Call <a href={SITE.phoneHref} className="text-[var(--green)] font-semibold">{SITE.phone}</a> or reach us through our <a href="/contact" className="text-[var(--green)] font-semibold">quote form</a>.</p></section>
          </div>
        </div>
      </section>
    </>
  );
}
