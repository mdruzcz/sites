import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getFaqs } from "@/lib/content";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ — Music-Reactive Pixel Lighting Kits & Installation",
  description:
    "Answers about Resonate Lighting kits: what is included, how music reactivity works, the Light Show app, E682 vs Kulp/FPP controllers, packages, Ontario installation and seasonal service.",
  alternates: { canonical: `${site.url}/faq` },
};

export default function FaqPage() {
  const faqs = getFaqs();
  const categories = Array.from(new Set(faqs.map((f) => f.category ?? "General")));
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "FAQ", url: `${site.url}/faq` }])} />
      <section className="bg-ink-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">FAQ</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">Questions, answered.</h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            Everything about the kit, the packages, installation across Ontario and the modes and themes. Still unsure? Call {site.phone}.
          </p>
        </div>
      </section>
      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {categories.map((cat) => (
            <div key={cat}>
              <h2 className="h-display text-2xl text-white mb-6">{cat}</h2>
              <FaqAccordion faqs={faqs.filter((f) => (f.category ?? "General") === cat)} defaultOpen={null} />
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
