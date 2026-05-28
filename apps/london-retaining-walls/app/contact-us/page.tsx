import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Contact Us | Get a Free Retaining Wall Quote in London, ON",
  description: "Contact London Retaining Walls for a free no-obligation quote on retaining wall installation or repair in London, Woodstock, Brantford, St. Thomas and surrounding areas.",
  openGraph: { title: "Contact Us | London Retaining Walls", url: `${site.url}/contact-us` },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Contact Us", href: "/contact-us" }])) }} />

      <PageHero
        title="Contact Us"
        subtitle="Get a free no-obligation quote on your retaining wall project. We'll respond within 24 hours."
        center
      />

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[var(--dark)] mb-6">Request a Free Quote</h2>
            <QuoteForm />
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[var(--dark)] mb-4">Get in Touch</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[var(--accent)]">📞</span>
                  <div><p className="text-xs text-gray-500">Phone</p><a href={site.phoneHref} className="font-semibold hover:text-[var(--accent)]">{site.phone}</a></div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[var(--accent)]">✉️</span>
                  <div><p className="text-xs text-gray-500">Email</p><a href={`mailto:${site.email}`} className="font-semibold hover:text-[var(--accent)]">{site.email}</a></div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[var(--accent)]">🕐</span>
                  <div><p className="text-xs text-gray-500">Hours</p><p className="font-semibold">{site.hours}</p></div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[var(--accent)]">📍</span>
                  <div><p className="text-xs text-gray-500">Service Area</p><p className="font-semibold">London, ON &amp; Southwestern Ontario</p></div>
                </li>
              </ul>
            </div>
            <div className="bg-[var(--accent)] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Describe Your Project</h3>
              <p className="text-white/90 text-sm leading-relaxed">Include details like wall height, approximate length, material preference (concrete, block, or wood), and any drainage concerns. The more detail you provide, the faster we can get you an accurate quote.</p>
            </div>
            <div className="bg-[var(--dark)] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Ontario Building Code</h3>
              <p className="text-white/90 text-sm leading-relaxed">Retaining walls over 1 metre typically require a permit in Ontario. We handle the compliance process — just let us know your wall height when you reach out.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
