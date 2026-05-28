import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for the weinstallchristmaslights.ca website.",
  alternates: { canonical: `${site.url}/disclaimer` },
};

export default function Disclaimer() {
  return (
    <section className="section">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose">
        <h1 className="heading-display text-3xl">Disclaimer</h1>
        <p className="mt-2 text-sm text-[color:var(--ink-soft)]">Last updated: 2026-05-28</p>
        <p>
          Information on this site is provided for general purposes only. Pricing, schedule, and product availability are subject to change without notice. For a binding price and schedule, request a written quote.
        </p>
        <p>
          Photographs may be representative — actual installations vary based on home size, style, and design package selected.
        </p>
        <p>
          For questions, email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </section>
  );
}
