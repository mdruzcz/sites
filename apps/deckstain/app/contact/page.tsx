import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import QuoteForm from "@/components/QuoteForm";
import StepProcess from "@/components/StepProcess";
import CtaBand from "@/components/CtaBand";
import SectionHeader from "@/components/SectionHeader";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Get a Free Deck Staining Quote | DeckStain.ca Ontario",
  description:
    "Get a free photo-based deck staining quote in Ontario. Fill out our form, send photos, and we'll respond within 2 business days. Serving 40+ cities.",
  openGraph: {
    title: "Free Deck Staining Quote | DeckStain.ca Ontario",
    description: "Photo-based quotes in 2 business days. No in-person visit needed.",
    images: ["/images/after-staining.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Quote | DeckStain.ca Ontario",
    description: "Get a free deck staining quote in 2 business days.",
  },
};

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

export default function ContactPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-[38vh] min-h-[260px] flex items-end pb-10">
        <Image
          src="/images/after-staining.jpg"
          alt="Contact DeckStain.ca for professional deck staining services in Ontario"
          fill
          className="object-cover object-top"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(35,31,27,0.90) 0%, rgba(35,31,27,0.55) 60%, rgba(35,31,27,0.20) 100%)" }} />
        <div className="container relative z-10">
          <p className="eyebrow text-[var(--accent)] mb-2">Free Photo Quote</p>
          <h1 className="h-display text-3xl md:text-4xl lg:text-5xl text-white">
            Get a Free Quote
          </h1>
        </div>
      </section>

      {/* ─── FORM + CONTACT INFO ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 xl:gap-12 items-start">
            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] overflow-hidden">
              <div className="bg-[var(--charcoal)] px-6 py-5">
                <p className="eyebrow text-[var(--accent)] mb-1">Request a Quote</p>
                <h2 className="h-display text-xl text-white">Tell Us About Your Project</h2>
                <p className="text-white/60 text-sm font-normal mt-1">
                  Fill out the form and we&apos;ll respond within 2 business days.
                </p>
              </div>
              <div className="p-6 md:p-8">
                <QuoteForm />
              </div>
            </div>

            {/* Contact info sidebar */}
            <div className="space-y-4">
              {/* Contact details */}
              <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="bg-[var(--accent)] px-5 py-4">
                  <h2 className="font-bold text-white text-base font-[var(--font-montserrat)]">
                    Contact Information
                  </h2>
                </div>
                <div className="p-5 space-y-4">
                  {[
                    {
                      icon: <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />,
                      fill: true,
                      label: "Phone",
                      content: <a href={site.phoneHref} className="font-semibold text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors text-sm">{site.phone}</a>,
                    },
                    {
                      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                      fill: false,
                      label: "Email",
                      content: <a href={site.emailHref} className="font-semibold text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors text-sm">{site.email}</a>,
                    },
                    {
                      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
                      fill: false,
                      label: "Hours",
                      content: <p className="text-[var(--charcoal)] text-sm font-semibold">{site.hours}</p>,
                    },
                    {
                      icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
                      fill: false,
                      label: "Service Area",
                      content: <p className="text-[var(--charcoal)] text-sm font-semibold">Southwestern Ontario — 40+ Cities</p>,
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[var(--accent)]" fill={item.fill ? "currentColor" : "none"} stroke={item.fill ? "none" : "currentColor"} viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--concrete)] mb-0.5">{item.label}</p>
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo tip box */}
              <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/25 rounded-2xl p-5">
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 bg-[var(--accent)] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--charcoal)] text-sm mb-2">Photo Quote Tips</h3>
                    <ul className="space-y-1 text-xs text-[var(--concrete)] font-normal">
                      <li className="flex items-start gap-1.5"><span className="text-[var(--accent)] shrink-0 mt-0.5">›</span> Full deck from multiple angles</li>
                      <li className="flex items-start gap-1.5"><span className="text-[var(--accent)] shrink-0 mt-0.5">›</span> Close-ups of any damaged boards</li>
                      <li className="flex items-start gap-1.5"><span className="text-[var(--accent)] shrink-0 mt-0.5">›</span> Show railings and stairs if applicable</li>
                      <li className="flex items-start gap-1.5"><span className="text-[var(--accent)] shrink-0 mt-0.5">›</span> Natural daylight photos work best</li>
                      <li className="flex items-start gap-1.5"><span className="text-[var(--accent)] shrink-0 mt-0.5">›</span> Reply to our confirmation email with photos</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Response guarantee */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-emerald-800 font-bold text-sm">2-Day Response Guarantee</p>
                  <p className="text-emerald-700 text-xs mt-0.5 font-normal">We respond to every quote request within 2 business days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container">
          <SectionHeader
            eyebrow="How It Works"
            title="Our Simple 3-Step Process"
          />
          <StepProcess />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
