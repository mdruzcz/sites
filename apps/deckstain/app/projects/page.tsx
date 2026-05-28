import type { Metadata } from "next";
import Image from "next/image";
import { getProjects } from "@/lib/content";
import ProjectGallery from "@/components/ProjectGallery";
import CtaBand from "@/components/CtaBand";
import SectionHeader from "@/components/SectionHeader";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Deck Staining Project Gallery | DeckStain.ca Ontario",
  description:
    "Browse our portfolio of professional deck staining, sealing, restoration, and fence staining projects across Ontario. See real before & after results.",
  openGraph: {
    title: "Deck Staining Project Gallery | DeckStain.ca Ontario",
    description:
      "Browse our portfolio of professional deck and fence staining projects across Ontario. Real before & after results.",
    images: ["/images/project-04.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Gallery | DeckStain.ca Ontario",
    description: "Our deck staining portfolio — real results from real Ontario homeowners.",
  },
};

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

export default function ProjectsPage() {
  const allProjects = getProjects();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-[45vh] min-h-[360px] flex items-center">
        <Image
          src="/images/project-04.jpg"
          alt="Professional deck refinishing project by DeckStain.ca in St. Thomas Ontario"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10">
          <p className="eyebrow text-[var(--accent)] mb-3">Our Work</p>
          <h1 className="h-display text-4xl md:text-5xl text-white mb-4">Project Gallery</h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed normal-case font-normal">
            Real results from real Ontario homeowners. Every project features READY Seal® oil-based stains.
          </p>
        </div>
      </section>

      {/* ─── ALL PROJECTS ─── */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Portfolio"
            title="Recent Projects — Real Results"
            description="From simple staining jobs to full restorations, here's a sample of our recent work across Southwestern Ontario."
          />
          <ProjectGallery projects={allProjects} />
        </div>
      </section>

      {/* ─── FEATURE IMAGES ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container">
          <SectionHeader
            eyebrow="Transformations"
            title="Before &amp; After"
            description="See the dramatic difference a professional clean and stain can make."
          />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <Image
                src="/images/before-after-cleaning.jpg"
                alt="Before and after deck cleaning and restoration by DeckStain.ca Ontario"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <p className="text-white font-bold">Before &amp; After Cleaning</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <Image
                src="/images/after-staining.jpg"
                alt="Professionally stained deck result using READY Seal oil-based stain in Ontario"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <p className="text-white font-bold">Final Stained Result</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
