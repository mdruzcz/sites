import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { CheckIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Christmas Lighting Packages & Cost Estimator | We Install Christmas Lights",
  description:
    "Three all-inclusive Christmas lighting packages — Classic, Festive, and Griswold. Includes design, installation, maintenance, takedown, and storage.",
  alternates: { canonical: `${site.url}/lighting-packages` },
};

const PACKAGES = [
  {
    name: "Classic",
    priceFrom: "$700",
    summary: "Tasteful, elegant lighting for the front of your home",
    features: ["Front roofline LED lighting", "1–2 wreaths or accents", "1 tree or hedge", "Maintenance + takedown", "Free design + quote"],
    cta: "Best for townhomes and bungalows",
    color: "var(--brand-green)",
  },
  {
    name: "Festive",
    priceFrom: "$1,400",
    summary: "Full-perimeter lighting with trees, hedges, and walkway accents",
    features: ["Full-perimeter roofline LED", "3–5 trees or hedges", "Walkway and porch décor", "Mid-season maintenance", "Takedown and storage"],
    cta: "Our most popular package",
    color: "var(--brand-red)",
    featured: true,
  },
  {
    name: "Griswold",
    priceFrom: "$2,800",
    summary: "Full estate — roofline, trees, hedges, wrap effects, and statement décor",
    features: ["Every line and edge lit", "Multiple statement trees", "Custom-built features", "On-call maintenance", "White-glove takedown + storage"],
    cta: "For homes that want to win the street",
    color: "var(--brand-green)",
  },
];

export default function LightingPackagesPage() {
  return (
    <>
      <section className="bg-[color:var(--bg-soft)] border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <p className="eyebrow">Lighting Packages</p>
          <h1 className="heading-display text-3xl sm:text-5xl mt-3">Three All-Inclusive Packages</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[color:var(--ink-soft)]">
            Every package includes free design, installation, maintenance, takedown, and storage.
            Final price depends on the size of your home — request a free quote for an exact number.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PACKAGES.map((p) => (
              <article
                key={p.name}
                className={`card p-8 flex flex-col ${p.featured ? "ring-2 ring-[color:var(--brand-red)]" : ""}`}
              >
                {p.featured && (
                  <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--brand-red)] mb-2">Most Popular</div>
                )}
                <h2 className="heading-display text-2xl" style={{ color: p.color }}>{p.name}</h2>
                <p className="mt-2 text-sm text-[color:var(--ink-soft)]">{p.summary}</p>
                <div className="mt-4">
                  <span className="text-xs uppercase tracking-widest text-[color:var(--ink-soft)] font-bold">From</span>
                  <div className="heading-display text-4xl text-[color:var(--ink-strong)]">{p.priceFrom}</div>
                </div>
                <ul className="mt-6 space-y-2 text-sm flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 mt-0.5 text-[color:var(--brand-red)] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs uppercase tracking-widest text-[color:var(--ink-soft)]">{p.cta}</p>
                <Link href="/contact-us" className={`btn mt-4 ${p.featured ? "btn-red" : "btn-outline-green"}`}>
                  Get a Free Quote
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 card p-8 max-w-3xl mx-auto text-center">
            <h3 className="heading-display text-xl text-[color:var(--brand-green)]">Need something custom?</h3>
            <p className="mt-2 text-[color:var(--ink-soft)]">
              We design custom packages for large estates, commercial properties, and multi-location businesses.
            </p>
            <Link href="/contact-us" className="btn btn-red mt-5">Talk to a Designer</Link>
          </div>
        </div>
      </section>
    </>
  );
}
