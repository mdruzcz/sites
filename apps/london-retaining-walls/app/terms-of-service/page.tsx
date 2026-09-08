import type { Metadata } from "next";
import { site } from "@/lib/site";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Terms of Service | London Retaining Walls",
  description: "Terms of service for using the London Retaining Walls website and requesting quotes for retaining wall installation and repair in Ontario.",
  alternates: { canonical: `${site.url}/terms-of-service` },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="container-x max-w-3xl py-16 prose-lrw [&_h1]:display [&_h1]:text-4xl [&_h1]:mb-6 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:mt-8 [&_h2]:mb-3 [&_a]:text-accent-2 [&_a]:underline">
      <h1>Terms of Service</h1>
      <p>Last updated: January 1, 2024</p>
      <p>By accessing this website you agree to these terms. {site.name} reserves the right to modify these terms at any time.</p>
      <h2>Services</h2>
      <p>All services are subject to a signed work order and deposit. Quotes are valid for 30 days. Final pricing may vary if conditions differ significantly from those described at time of quote.</p>
      <h2>Limitation of Liability</h2>
      <p>{site.name} is not liable for pre-existing structural issues, soil conditions that were not disclosed or visible at time of quote, or delays due to weather conditions outside our control.</p>
      <h2>Contact</h2>
      <p>Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>.</p>
    </div>
  );
}
