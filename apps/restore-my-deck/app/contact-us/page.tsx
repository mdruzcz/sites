import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Contact Us | Get a Free Deck & Fence Quote",
  description: "Contact Restore My Deck for a free no-obligation quote on deck or fence restoration, staining or repair in Kitchener, Waterloo, Cambridge, Guelph, Hamilton and area.",
  openGraph: { title: "Contact Us | Restore My Deck", url: `${site.url}/contact-us` },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Contact Us", href: "/contact-us" }])) }} />

      <div className="bg-[var(--dark)] py-16 px-4 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-[var(--font-montserrat)]">Contact Us</h1>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">Get a free no-obligation quote. We&apos;ll respond within 24 hours.</p>
        </div>
      </div>

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
                  <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[var(--accent)]">📞</span>
                  <div><p className="text-xs text-gray-500">Phone</p><a href={site.phoneHref} className="font-semibold hover:text-[var(--accent)]">{site.phone}</a></div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[var(--accent)]">✉️</span>
                  <div><p className="text-xs text-gray-500">Email</p><a href={`mailto:${site.email}`} className="font-semibold hover:text-[var(--accent)]">{site.email}</a></div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[var(--accent)]">🕐</span>
                  <div><p className="text-xs text-gray-500">Hours</p><p className="font-semibold">{site.hours}</p></div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[var(--accent)]">📍</span>
                  <div><p className="text-xs text-gray-500">Service Area</p><p className="font-semibold">Kitchener-Waterloo Region &amp; Surrounding Areas</p></div>
                </li>
              </ul>
            </div>
            <div className="bg-[var(--accent)] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Send Us Photos!</h3>
              <p className="text-white/90 text-sm leading-relaxed">Have photos of your deck or fence? Email them to <strong>{site.email}</strong> and we can often provide a quote faster without needing an on-site visit.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
