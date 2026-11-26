import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { ogBase, twitterImages } from "@/lib/seo";
import { site } from "@/lib/site";

const description = `Terms for using ${site.domain}, including how quotes, layout drawings and court kit information on this site should be read.`;

export const metadata: Metadata = {
  title: "Terms of Use",
  description,
  alternates: { canonical: "/terms" },
  openGraph: { ...ogBase, title: `Terms of Use | ${site.name}`, description, url: "/terms" },
  twitter: { card: "summary", title: "Terms of Use", description, images: twitterImages },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="November 26, 2026">
      <p>By using {site.domain} you agree to these terms.</p>
      <h2>Information on this site</h2>
      <p>Kit sizes, drawings and colours shown on this site are examples to help you plan. Screen colours vary. The layout drawing and written quote we send you are what define your order.</p>
      <h2>Quotes</h2>
      <p>A quote request is not an order and does not commit you to buy. Quotes are valid for the period stated on them. Prices, freight and lead times are confirmed in writing before any order is accepted.</p>
      <h2>Your site and base</h2>
      <p>You are responsible for the base the court sits on, for confirming your space, and for any permits or approvals your municipality requires. Planning guidance on this site is general and is not engineering advice.</p>
      <h2>Safe use</h2>
      <p>Sport surfaces can be slippery when wet, icy or dirty. Use the court with care and supervise children.</p>
      <h2>Liability</h2>
      <p>This site is provided as is. To the extent the law allows, {site.name} is not liable for losses that come from relying on general information published here.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent through the <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
