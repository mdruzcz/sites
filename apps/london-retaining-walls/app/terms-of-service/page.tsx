import type { Metadata } from "next";
import { site } from "@/lib/site";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for London Retaining Walls.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-gray">
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
