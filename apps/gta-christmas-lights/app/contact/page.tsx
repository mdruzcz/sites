import type { Metadata } from "next";
import { Phone, Mail, Clock, MapPin, CheckCircle } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Get a Free Quote | GTA Christmas Lights",
  description:
    "Request a free quote for professional Christmas light installation in the Greater Toronto Area. Custom design, professional-grade LED lights, full-service rental or purchase. Send us a photo of your home for a same-day quote.",
  openGraph: {
    title: "Get a Free Quote — GTA Christmas Lights",
    description:
      "Free, no-obligation Christmas light installation quote across the GTA.",
    url: `${site.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Contact", url: `${site.url}/contact` },
            ])
          ),
        }}
      />

      <section className="bg-[var(--dark-bg)] py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
            <div>
              <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                Get In Touch
              </p>
              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-5"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Request Your Free Quote
              </h1>
              <p className="text-white/75 text-lg leading-relaxed mb-8">
                Tell us a few details about your home or business. A designer
                will review your property and respond within 1 business day
                with a custom quote.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  "Free, no-obligation quote",
                  "Custom design for your property",
                  "Fully insured · WSIB covered",
                  "All-inclusive: install · maintain · take down · store",
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-3 text-sm text-white/85"
                  >
                    <CheckCircle className="h-5 w-5 text-[var(--accent-gold)]" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 text-white/75">
                  <Phone className="h-5 w-5 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold mb-1">Call Us</p>
                    <a
                      href={site.phoneHref}
                      className="block hover:text-white"
                    >
                      {site.phone}
                    </a>
                    <a
                      href={site.phoneAltHref}
                      className="block hover:text-white"
                    >
                      {site.phoneAlt}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-white/75">
                  <Mail className="h-5 w-5 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold mb-1">Email</p>
                    <a
                      href={site.emailHref}
                      className="hover:text-white break-all"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-white/75">
                  <Clock className="h-5 w-5 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold mb-1">Hours</p>
                    <p>{site.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-white/75">
                  <MapPin className="h-5 w-5 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold mb-1">
                      Service Area
                    </p>
                    <p>Greater Toronto Area · 20 cities served</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
              <QuoteForm heading="Tell Us About Your Home" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
