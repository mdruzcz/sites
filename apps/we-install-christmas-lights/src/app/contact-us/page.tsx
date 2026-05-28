import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";
import { PhoneIcon, MailIcon, MapPinIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us | We Install Christmas Lights London Ontario",
  description:
    "Get a free Christmas lighting quote within 24 hours. Call (519) 266-6796 or fill out our contact form. Serving London Ontario, GTA, and Waterloo Region.",
  alternates: { canonical: `${site.url}/contact-us` },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[color:var(--bg-soft)] border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <p className="eyebrow">Online Quote</p>
          <h1 className="heading-display text-3xl sm:text-5xl mt-3">Get Your Free Quote in 24 Hours</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[color:var(--ink-soft)]">
            Tell us about your home or business. Include a photo if you can — we&rsquo;ll send you a detailed quote within one business day.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
          <aside className="lg:col-span-1 space-y-6">
            <div className="card p-6">
              <h3 className="heading-display text-base text-[color:var(--brand-green)]">Call</h3>
              <Link href={site.phoneHref} className="mt-3 flex items-center gap-2 text-[color:var(--ink-strong)] font-semibold">
                <PhoneIcon className="w-4 h-4 text-[color:var(--brand-red)]" /> {site.phone}
              </Link>
              <p className="mt-2 text-sm text-[color:var(--ink-soft)]">{site.hours}</p>
            </div>
            <div className="card p-6">
              <h3 className="heading-display text-base text-[color:var(--brand-green)]">Email</h3>
              <a href={`mailto:${site.email}`} className="mt-3 flex items-center gap-2 text-[color:var(--ink-strong)] font-semibold break-all">
                <MailIcon className="w-4 h-4 text-[color:var(--brand-red)]" /> {site.email}
              </a>
              <p className="mt-2 text-sm text-[color:var(--ink-soft)]">Replies within 24 hours, Mon–Fri.</p>
            </div>
            <div className="card p-6">
              <h3 className="heading-display text-base text-[color:var(--brand-green)]">Visit</h3>
              <p className="mt-3 flex items-start gap-2 text-[color:var(--ink-strong)] font-semibold">
                <MapPinIcon className="w-4 h-4 text-[color:var(--brand-red)] mt-0.5" /> {site.addressLine}
              </p>
              <p className="mt-2 text-sm text-[color:var(--ink-soft)]">By appointment only.</p>
            </div>
          </aside>
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
