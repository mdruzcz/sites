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
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <Image
          src="/images/after-staining.jpg"
          alt="Contact DeckStain.ca for professional deck staining services in Ontario"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10">
          <p className="eyebrow text-[var(--accent)] mb-3">Free Photo Quote</p>
          <h1 className="h-display text-4xl md:text-5xl text-white mb-4">
            Get a Free Quote
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed normal-case font-normal">
            Tell us about your project. Send photos and we&apos;ll respond within 2 business days.
          </p>
        </div>
      </section>

      {/* ─── FORM + CONTACT INFO ─── */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div>
              <SectionHeader
                eyebrow="Request a Quote"
                title="Get Started"
                description="Fill out the form below. After submitting, reply to our confirmation email with photos of your deck or fence."
                centered={false}
              />
              <QuoteForm />
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
                <h2 className="font-bold text-[var(--charcoal)] text-lg mb-5 font-[var(--font-montserrat)]">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--concrete)] mb-0.5">Phone</p>
                      <a href={site.phoneHref} className="font-bold text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors">
                        {site.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--concrete)] mb-0.5">Email</p>
                      <a href={site.emailHref} className="font-bold text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors">
                        {site.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--concrete)] mb-0.5">Hours</p>
                      <p className="font-bold text-[var(--charcoal)] text-sm">{site.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--concrete)] mb-0.5">Service Area</p>
                      <p className="font-bold text-[var(--charcoal)] text-sm">Southwestern Ontario — 40+ Cities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo tip box */}
              <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-2xl p-6">
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">📷</span>
                  <div>
                    <h3 className="font-bold text-[var(--charcoal)] mb-2">Photo Quote Tips</h3>
                    <ul className="space-y-1.5 text-sm text-[var(--concrete)] normal-case font-normal">
                      <li>• Photograph the full deck from multiple angles</li>
                      <li>• Include close-ups of any damaged boards or areas</li>
                      <li>• Show the railing and stairs if applicable</li>
                      <li>• Natural daylight photos work best</li>
                      <li>• Reply to our confirmation email to attach photos</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Response time */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
                <p className="text-green-800 font-bold text-lg">2-Day Response Guarantee</p>
                <p className="text-green-700 text-sm mt-1 normal-case font-normal">
                  We respond to all quote requests within 2 business days.
                </p>
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
