import type { Metadata } from "next";
import Image from "next/image";
import { getServices } from "@/lib/content";
import ServiceCard from "@/components/ServiceCard";
import StepProcess from "@/components/StepProcess";
import CtaBand from "@/components/CtaBand";
import SectionHeader from "@/components/SectionHeader";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Deck Staining, Sealing & Restoration Services | DeckStain.ca Ontario",
  description:
    "Professional deck staining, sealing, cleaning, restoration and refinishing services across Ontario. READY Seal® oil-based stains. Free photo quotes in 2 business days.",
  openGraph: {
    title: "Deck Staining, Sealing & Restoration Services | DeckStain.ca",
    description:
      "Professional deck and fence services using READY Seal® oil-based stains. Free photo quotes in 2 business days across Ontario.",
    images: ["/images/after-staining.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deck Services | DeckStain.ca Ontario",
    description: "Deck staining, sealing, cleaning, restoration and fence staining across Ontario.",
  },
};

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-[45vh] min-h-[360px] flex items-center">
        <Image
          src="/images/after-staining.jpg"
          alt="Professional deck staining services by DeckStain.ca Ontario"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10">
          <p className="eyebrow text-[var(--accent)] mb-3">What We Offer</p>
          <h1 className="h-display text-4xl md:text-5xl text-white mb-4">Our Services</h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed normal-case font-normal">
            Complete deck and fence care using READY Seal® premium oil-based stains and sealers.
          </p>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container max-w-3xl text-center">
          <p className="eyebrow mb-4">Why READY Seal®</p>
          <h2 className="h-display text-3xl text-[var(--charcoal)] mb-6">
            Premium Stains, Professional Results
          </h2>
          <p className="text-[var(--concrete)] leading-relaxed mb-4 normal-case font-normal text-lg">
            We chose READY Seal® oil-based stains because they genuinely outperform water-based
            alternatives. The oil base penetrates deep into the wood cells — not just coating the
            surface — for protection that won&apos;t peel, flake, or wash away after a season.
          </p>
          <p className="text-[var(--concrete)] leading-relaxed normal-case font-normal">
            Every service begins with thorough preparation: cleaning, sanding where needed, and a
            full inspection. We don&apos;t skip steps or rush jobs. The result is a lasting finish
            you can enjoy for 2–3 years before the next application.
          </p>
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Our Services"
            title="Everything Your Deck Needs"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── TWO BIG IMAGES ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <Image
                src="/images/project-01.jpg"
                alt="Natural cedar deck staining project by DeckStain.ca in London Ontario"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <Image
                src="/images/after-deck-cleaning-staining.jpg"
                alt="After deck cleaning and staining service by DeckStain.ca Ontario"
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

      {/* ─── PROCESS ─── */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="How It Works"
            title="Our Simple Quote Process"
            description="No in-person visits needed. Send us photos, get a quote in 2 days, book when ready."
          />
          <StepProcess />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
