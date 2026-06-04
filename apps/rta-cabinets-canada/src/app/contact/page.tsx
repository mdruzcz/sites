import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact RTA Cabinets Canada",
  description:
    "Contact RTA Cabinets Canada for White Shaker RTA cabinet quotes, shipping questions, and kitchen planning help. Call or request a quote online — Canada-wide.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact RTA Cabinets Canada",
    description:
      "Get in touch for White Shaker RTA cabinet quotes and kitchen planning help.",
  },
};

export default function ContactPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-ink-soft mb-8">
        Have a question about a cabinet, a kitchen package, or shipping? Reach out
        and we&apos;ll help you plan your kitchen.
      </p>
      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-border rounded-lg p-6">
          <h2 className="font-semibold mb-2">Phone</h2>
          <a href={site.phoneHref} className="text-accent text-lg font-medium">
            {site.phone}
          </a>
        </div>
        <div className="bg-white border border-border rounded-lg p-6">
          <h2 className="font-semibold mb-2">Email</h2>
          <a href={`mailto:${site.email}`} className="text-accent break-all">
            {site.email}
          </a>
        </div>
        <div className="bg-white border border-border rounded-lg p-6 sm:col-span-2">
          <h2 className="font-semibold mb-2">Service Area</h2>
          <p className="text-ink-soft">
            White Shaker RTA cabinets shipped across Canada.
          </p>
        </div>
      </div>
      <div className="bg-sand border border-border rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Ready for a quote?</h2>
        <p className="text-ink-soft mb-4">
          Build your cabinet list and request a written quote online.
        </p>
        <Link href="/request" className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-md font-medium inline-flex min-h-[48px] items-center">
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
