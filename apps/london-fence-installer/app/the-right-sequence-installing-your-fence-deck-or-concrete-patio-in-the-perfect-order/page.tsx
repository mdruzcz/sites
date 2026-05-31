import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { breadcrumbSchema, articleSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Right Order: Fence, Deck & Patio | London Fence Installer" },
  description: "What comes first — the fence, deck, or concrete patio? Learn the right sequence for outdoor projects to avoid costly mistakes and conflicts between contractors.",
  alternates: { canonical: "https://londonfenceinstaller.ca/the-right-sequence-installing-your-fence-deck-or-concrete-patio-in-the-perfect-order" },
  openGraph: {
    title: "Right Order: Fence, Deck & Patio | London Fence Installer",
    description: "Learn the right order to install your fence, deck, and concrete patio for a seamless outdoor build.",
    url: `${site.url}/the-right-sequence-installing-your-fence-deck-or-concrete-patio-in-the-perfect-order`,
    images: [{ url: "/images/hero-fence.jpg", width: 1200, height: 630, alt: "The right sequence for fence, deck and patio installation" }],
  },
};

export default function BlogSequencePage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "The Right Sequence", url: `${site.url}/the-right-sequence-installing-your-fence-deck-or-concrete-patio-in-the-perfect-order` },
  ]);
  const article = articleSchema({
    headline: "The Right Sequence: Installing Your Fence, Deck or Concrete Patio in the Perfect Order",
    description: "What comes first — the fence, deck, or concrete patio? Learn the right sequence for outdoor projects.",
    url: "/the-right-sequence-installing-your-fence-deck-or-concrete-patio-in-the-perfect-order",
    datePublished: "2025-10-15",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />

      <section className="bg-green py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span>Blog</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">The Right Sequence: Installing Your Fence, Deck or Concrete Patio in the Perfect Order</h1>
          <p className="text-gray-300 text-sm">By London Fence Installer | Expert Fencing Advice</p>
        </div>
      </section>

      <article className="section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--muted)] mb-6 leading-relaxed text-lg">
            Planning a backyard transformation that includes a fence, deck, and concrete patio? The order in which you complete these projects matters more than you might think. Getting the sequence wrong can lead to damaged work, frustrated contractors, and costly do-overs.
          </p>

          <h2 className="text-2xl font-extrabold text-[var(--green)] mb-3">The General Rule: Grade Work First</h2>
          <p className="text-[var(--muted)] mb-6 leading-relaxed">
            Always complete any grading, landscaping, or drainage work before installing permanent structures. Moving soil after a fence or patio is installed can undermine posts, crack concrete, and damage structures.
          </p>

          <h2 className="text-2xl font-extrabold text-[var(--green)] mb-3">Step 1: Utilities and Underground Work</h2>
          <p className="text-[var(--muted)] mb-6 leading-relaxed">
            Before anything else, call Ontario One Call (formerly Ontario Underground Infrastructure Notification System) to locate all underground utilities. This is legally required before any digging and prevents dangerous and expensive accidents.
          </p>

          <h2 className="text-2xl font-extrabold text-[var(--green)] mb-3">Step 2: Install the Fence First</h2>
          <p className="text-[var(--muted)] mb-6 leading-relaxed">
            The fence should generally go in before the deck or patio. Here&apos;s why:
          </p>
          <ul className="space-y-2 mb-6 text-[var(--muted)]">
            <li>• Fence posts need access for post-hole diggers and concrete pouring equipment</li>
            <li>• You can confirm your property lines before the patio makes adjustments impossible</li>
            <li>• Fence post locations can be adjusted more easily before concrete and decking are in place</li>
            <li>• Access for heavy equipment is easier without a deck or patio in the way</li>
          </ul>

          <h2 className="text-2xl font-extrabold text-[var(--green)] mb-3">Step 3: Deck or Concrete Patio?</h2>
          <p className="text-[var(--muted)] mb-6 leading-relaxed">
            If you&apos;re installing both a deck and a concrete patio, the deck typically goes in before concrete work. Deck footings are dug separately, and the deck structure can be used as a reference point for the patio&apos;s edge.
          </p>

          <h2 className="text-2xl font-extrabold text-[var(--green)] mb-3">The Recommended Order</h2>
          <div className="bg-[var(--surface)] rounded-xl p-6 mb-6">
            <ol className="space-y-3">
              {[
                "Underground utilities marked",
                "Grading and drainage completed",
                "Fence installation",
                "Deck installation",
                "Concrete patio / hardscaping",
                "Landscaping and finishing",
              ].map((step, i) => (
                <li key={step} className="flex items-center gap-3 text-[var(--muted)]">
                  <span className="w-7 h-7 rounded-full bg-[var(--green)] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <p className="text-[var(--muted)] leading-relaxed">
            Following this order helps each trade work efficiently without interference. It also ensures warranties remain valid, as many contractors won&apos;t warranty their work if subsequent trades damage it.
          </p>
        </div>
      </article>

      <CtaBand heading="Ready to Start Your Fence Project?" sub="Get a free quote from London Fence Installer" />
    </>
  );
}
