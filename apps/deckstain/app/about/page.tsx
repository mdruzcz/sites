import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import CtaBand from "@/components/CtaBand";
import SectionHeader from "@/components/SectionHeader";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About DeckStain.ca | Ontario's Deck Staining Experts",
  description:
    "Meet the DeckStain.ca team — Ontario's professional deck staining specialists. 8+ years experience, 500+ projects completed, READY Seal® oil-based stains, free photo quotes.",
  openGraph: {
    title: "About DeckStain.ca | Ontario's Deck Staining Experts",
    description:
      "8+ years of professional deck staining in Ontario. READY Seal® certified. Free photo quotes in 2 business days.",
    images: ["/images/cedar-staining.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About DeckStain.ca | Ontario's Deck Staining Experts",
    description: "8+ years of professional deck staining across Ontario.",
  },
};

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <Image
          src="/images/cedar-staining.jpg"
          alt="Cedar deck staining by DeckStain.ca professionals in Ontario"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10">
          <p className="eyebrow text-[var(--accent)] mb-3">Our Story</p>
          <h1 className="h-display text-4xl md:text-5xl text-white mb-4">
            About DeckStain.ca
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed normal-case font-normal">
            Ontario&apos;s trusted team for professional deck staining, sealing, and restoration.
          </p>
        </div>
      </section>

      {/* ─── STORY ─── */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-4">Who We Are</p>
              <h2 className="h-display text-3xl md:text-4xl text-[var(--charcoal)] mb-6">
                Built on Quality & Honest Work
              </h2>
              <p className="text-[var(--concrete)] mb-4 leading-relaxed normal-case font-normal">
                DeckStain.ca started as a small London-area operation with a simple mission: give
                Ontario homeowners a better option for deck care — quality materials, honest
                pricing, and a hassle-free process.
              </p>
              <p className="text-[var(--concrete)] mb-4 leading-relaxed normal-case font-normal">
                Over 8 years we&apos;ve grown to serve more than 40 cities across Southwestern Ontario,
                completing 500+ projects from simple staining jobs to full structural restorations.
                Our team chose READY Seal® oil-based stains because they genuinely last longer and
                look better than the water-based alternatives most companies default to.
              </p>
              <p className="text-[var(--concrete)] leading-relaxed normal-case font-normal">
                Today our photo quote process means you never need to schedule an in-person
                estimate. Just send us a few photos, get a detailed quote within 2 business days,
                and book us when you&apos;re ready. Simple, transparent, no pressure.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <Image
                src="/images/project-01.jpg"
                alt="DeckStain.ca completed deck staining project - natural cedar finish in London Ontario"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container">
          <SectionHeader
            eyebrow="By the Numbers"
            title="Our Track Record"
            description="Every number reflects a real homeowner we helped protect and beautify their outdoor space."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "500+", label: "Projects Completed", icon: "🏡" },
              { value: "8+", label: "Years of Experience", icon: "📅" },
              { value: "40+", label: "Cities Served", icon: "📍" },
              { value: "100%", label: "Satisfaction Rate", icon: "⭐" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white border border-[var(--border)] rounded-2xl p-6 text-center">
                <span className="text-3xl mb-3 block">{stat.icon}</span>
                <p className="text-[var(--accent)] font-bold text-3xl font-[var(--font-montserrat)] mb-2">
                  {stat.value}
                </p>
                <p className="text-[var(--concrete)] text-sm normal-case font-normal">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <Image
                src="/images/before-after-cleaning.jpg"
                alt="Before and after deck cleaning and staining transformation by DeckStain.ca"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="eyebrow mb-4">Our Values</p>
              <h2 className="h-display text-3xl md:text-4xl text-[var(--charcoal)] mb-6">
                What Makes Us Different
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: "Premium Materials Only",
                    description:
                      "We only use READY Seal® oil-based stains — proven to outlast and outperform water-based alternatives by years.",
                  },
                  {
                    title: "Photo Quote Process",
                    description:
                      "Our photo-based quoting system means accurate quotes without wasting your time on in-person visits.",
                  },
                  {
                    title: "Transparent Pricing",
                    description:
                      "We quote exactly what you pay. No hidden fees, no surprise charges on invoice day.",
                  },
                  {
                    title: "100% Satisfaction Guarantee",
                    description:
                      "If you're not happy with the finished result, we come back and make it right. No questions asked.",
                  },
                ].map((value) => (
                  <div key={value.title} className="flex gap-4">
                    <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-bold text-[var(--charcoal)] mb-1">{value.title}</h3>
                      <p className="text-[var(--concrete)] text-sm leading-relaxed normal-case font-normal">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREA ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container text-center">
          <p className="eyebrow mb-4">Where We Work</p>
          <h2 className="h-display text-3xl md:text-4xl text-[var(--charcoal)] mb-6">
            Serving 40+ Cities Across Ontario
          </h2>
          <p className="text-[var(--concrete)] text-lg mb-8 max-w-2xl mx-auto normal-case font-normal leading-relaxed">
            Based in London, ON, we travel across Southwestern Ontario to bring the same quality
            workmanship to every community we serve.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {site.serviceAreas.map((area) => (
              <Link
                key={area}
                href={`/service-areas/${area.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}-on`}
                className="bg-white border border-[var(--border)] rounded-full px-4 py-2 text-sm font-semibold text-[var(--charcoal)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
