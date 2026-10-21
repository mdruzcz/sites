import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles the information you send through our quote form and website.`,
  alternates: { canonical: `${site.url}/privacy-policy` },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-24 bg-ink">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-rl">
        <p className="eyebrow">Legal</p>
        <h1 className="h-display text-4xl text-white mb-8">Privacy Policy</h1>
        <p>Last updated: October 2026.</p>
        <h2>What we collect</h2>
        <p>When you submit the quote form we collect the details you enter: name, business or organization, phone, email, project city, type of space, package of interest and your message. We also record the time of submission.</p>
        <h2>How we use it</h2>
        <p>We use this information only to respond to your enquiry and prepare a quote. Submissions are emailed to our service inbox and stored in a secure database so we can follow up. We do not sell or share your information with third parties for marketing.</p>
        <h2>Demo audio</h2>
        <p>The home-page demo can use your microphone if you press Start. The sound is analysed entirely in your browser to drive the simulation and is never recorded, stored or sent to us. The piano and drum sounds are synthesised in your browser.</p>
        <h2>Spam protection</h2>
        <p>The form is protected by Cloudflare Turnstile, which may process limited technical information about your browser to confirm you are not a bot.</p>
        <h2>Contact</h2>
        <p>Questions about your data? Email <a href={site.emailHref}>{site.email}</a> or call {site.phone}.</p>
      </div>
    </section>
  );
}
