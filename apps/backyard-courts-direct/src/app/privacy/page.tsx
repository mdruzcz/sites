import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { ogBase, twitterImages } from "@/lib/seo";
import { site } from "@/lib/site";

const description = `How ${site.name} collects, uses and protects the information you send through our quote form and website, and how to ask for changes.`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { ...ogBase, title: `Privacy Policy | ${site.name}`, description, url: "/privacy" },
  twitter: { card: "summary", title: "Privacy Policy", description, images: twitterImages },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="November 26, 2026">
      <p>
        {site.name} ({site.domain}) respects your privacy. This page explains what we collect and why.
      </p>
      <h2>What we collect</h2>
      <p>When you request a quote we collect the details you enter: your name, email, phone number, postal code and the information you give us about your court project.</p>
      <p>We also collect basic, anonymous usage statistics such as pages viewed and the type of device used. These do not identify you personally.</p>
      <h2>How we use it</h2>
      <ul>
        <li>To prepare and send your quote and layout drawing.</li>
        <li>To answer your questions and arrange delivery if you order.</li>
        <li>To understand which pages are useful so we can improve the site.</li>
      </ul>
      <p>We do not sell your information. We share it only with the service providers needed to run this site and deliver your order, such as our email provider, our hosting provider and freight carriers.</p>
      <h2>Spam protection</h2>
      <p>Our forms use Cloudflare Turnstile to block automated submissions. Turnstile may process technical information about your browser to tell people from bots.</p>
      <h2>Keeping and deleting your information</h2>
      <p>
        We keep quote requests for as long as needed to serve you and to meet legal and accounting requirements. You can ask us to correct or delete your information at any time through the <Link href="/contact">contact page</Link>.
      </p>
      <h2>Changes</h2>
      <p>If this policy changes we will post the new version here with a new date.</p>
    </LegalPage>
  );
}
