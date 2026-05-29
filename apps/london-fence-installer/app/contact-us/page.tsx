import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Us – Get a Free Fence Quote in London, ON",
  description: "Reach out to London Fence Installer for wood, vinyl, chain-link & metal fencing across London, ON and surrounding areas. Fast quotes, 20 years' experience.",
  openGraph: {
    title: "Contact Us | London Fence Installer",
    description: "Get a free fence quote in London, ON. We respond within 48 hours.",
    url: `${site.url}/contact-us`,
  },
};

export default function ContactPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Contact Us", url: `${site.url}/contact-us` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="bg-green py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span>Contact Us</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">Contact Us</h1>
          <p className="text-lg text-gray-200">Get a free quote within 48 hours.</p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="card p-8">
              <QuoteForm
                title="Get a Free Quote"
                subtitle="Fill out the form and we'll be in touch within 48 hours."
              />
            </div>

            {/* Info */}
            <div>
              <h2 className="text-2xl font-extrabold mb-6">{site.name}</h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <span className="w-10 h-10 rounded-full bg-[var(--green)] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-bold">Address</p>
                    <p className="text-[var(--muted)] text-sm">{site.addressLine}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-10 h-10 rounded-full bg-[var(--green)] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-bold">Phone</p>
                    <a href={site.phoneHref} className="text-[var(--green)] font-semibold hover:underline">{site.phone}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-10 h-10 rounded-full bg-[var(--green)] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-bold">Email</p>
                    <a href={site.emailHref} className="text-[var(--green)] font-semibold hover:underline">{site.email}</a>
                  </div>
                </li>
              </ul>

              <div className="mt-8 p-5 bg-[var(--surface)] rounded-xl border border-[var(--border)]">
                <h3 className="font-bold text-[var(--green)] mb-2">Quick Quotes</h3>
                <p className="text-sm text-[var(--muted)]">We aim to send out all quotes within <strong>48 hours</strong>. We stand by a <strong>five-year limited warranty</strong> and have <strong>20 years of combined fencing experience</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
