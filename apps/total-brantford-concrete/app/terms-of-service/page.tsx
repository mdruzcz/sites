import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.name}.`,
};

export default function TermsOfServicePage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm">
        <h1>Terms of Service</h1>
        <p>Last updated: {new Date().getFullYear()}</p>
        <p>
          By accessing and using {site.url}, you agree to be bound by these terms. If you disagree with any part of these terms, please do not use our website.
        </p>
        <h2>Use of Website</h2>
        <p>This website is intended for informational purposes and to facilitate contact with {site.name} for concrete services in Brantford and surrounding areas.</p>
        <h2>Contact</h2>
        <p>Questions about these terms? Contact us at <a href={site.emailHref}>{site.email}</a>.</p>
      </div>
    </section>
  );
}
