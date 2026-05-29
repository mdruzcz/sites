import type { Metadata } from "next";
import Image from "next/image";
import { getStainColors } from "@/lib/content";
import StainColorCard from "@/components/StainColorCard";
import CtaBand from "@/components/CtaBand";
import SectionHeader from "@/components/SectionHeader";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "READY Seal® Stain Color Choices | DeckStain.ca Ontario",
  description:
    "Choose from 8 READY Seal® oil-based deck stain colors — Natural Cedar, Pecan, Dark Walnut, Mahogany and more. See all colors and find the perfect match for your home.",
  openGraph: {
    title: "READY Seal® Stain Color Choices | DeckStain.ca",
    description:
      "8 READY Seal® oil-based deck stain colors. Natural Cedar, Pecan, Dark Walnut, Mahogany and more. Free photo quotes in 2 days.",
    images: ["/images/project-01.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stain Colors | DeckStain.ca Ontario",
    description: "8 READY Seal® oil-based stain colors for your deck or fence.",
  },
};

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

export default function StainChoicesPage() {
  const colors = getStainColors();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-[45vh] min-h-[360px] flex items-center">
        <Image
          src="/images/project-01.jpg"
          alt="Natural cedar deck stain finish by DeckStain.ca - READY Seal color choice"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10">
          <p className="eyebrow text-[var(--accent)] mb-3">READY Seal® Collection</p>
          <h1 className="h-display text-4xl md:text-5xl text-white mb-4">Stain Color Choices</h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed normal-case font-normal">
            8 rich, oil-based stain colors to perfectly match your home and personal style.
          </p>
        </div>
      </section>

      {/* ─── BRAND INTRO ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container max-w-3xl text-center">
          <p className="eyebrow mb-4">Why READY Seal®</p>
          <h2 className="h-display text-3xl text-[var(--charcoal)] mb-6">
            The Premium Oil-Based Stain We Trust
          </h2>
          <p className="text-[var(--concrete)] mb-4 leading-relaxed normal-case font-normal text-lg">
            READY Seal® is a professional-grade oil-based stain and sealer in one. Unlike
            water-based stains that coat the surface and eventually peel, READY Seal® penetrates
            deep into the wood&apos;s cellular structure for lasting protection and rich, consistent color.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 mt-8">
            {[
              { title: "No Peeling", body: "Oil-based formula bonds to wood at the cellular level — never peels or flakes" },
              { title: "No Lap Marks", body: "Self-leveling formula means a perfect, streak-free finish every time" },
              { title: "2–3 Year Life", body: "Lasts 2–3 times longer than typical water-based stains" },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-[var(--border)] rounded-xl p-5">
                <h3 className="font-bold text-[var(--charcoal)] mb-2">{item.title}</h3>
                <p className="text-[var(--concrete)] text-sm normal-case font-normal">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COLOR GRID ─── */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="8 Colors Available"
            title="Find Your Perfect Color"
            description="Tell us your preferred color when requesting a quote and we'll bring samples to confirm before starting."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {colors.map((color) => (
              <StainColorCard key={color.slug} color={color} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW TO CHOOSE ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-4">Choosing a Color</p>
              <h2 className="h-display text-3xl text-[var(--charcoal)] mb-6">
                How to Pick the Right Stain
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: "Consider Your Home's Exterior",
                    body: "Match or complement your siding and trim colors. Lighter stains work well with lighter homes; darker stains suit charcoal, navy, or deep green exteriors.",
                  },
                  {
                    title: "Think About Wood Type",
                    body: "Pressure-treated pine absorbs darker stains well. Cedar has natural reddish tones that pair beautifully with Natural Cedar or Pecan.",
                  },
                  {
                    title: "Match Your Landscape Style",
                    body: "Natural, earthy tones blend with landscaping. Bold choices like Dark Walnut or Mission Brown make a striking statement.",
                  },
                  {
                    title: "Not Sure? We Can Help",
                    body: "Send us your photos and tell us what you're going for. We'll recommend the best match from our 8 READY Seal® options.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-bold text-[var(--charcoal)] mb-1">{item.title}</h3>
                      <p className="text-[var(--concrete)] text-sm normal-case font-normal">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <Image
                src="/images/project-01.jpg"
                alt="Natural cedar READY Seal stain on completed deck project in Ontario"
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

      <CtaBand />
    </>
  );
}
