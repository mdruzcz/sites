import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/projects` },
  title: "Project Gallery | Decks, Fences & Concrete — Master Decker",
  description: "Browse completed outdoor living projects by Master Decker Inc. — deck builds, deck staining, fence installation, concrete driveways, and more across London, ON.",
  openGraph: {
    title: "Project Gallery | Master Decker",
    description: "Completed outdoor living projects in London and Southwestern Ontario.",
    url: `${site.url}/projects`,
  },
};

const categories = ["All", "Deck Staining", "Deck Building", "Fence Installation", "Concrete", "Retaining Walls"];

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-[var(--surface)] section">
          <div className="container">
            <p className="eyebrow mb-2">Our Work</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Project Gallery</h1>
            <p className="text-lg text-[var(--ink)]/70 max-w-2xl">
              A showcase of completed decks, fences, concrete driveways, and outdoor spaces across London and Southwestern Ontario.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((c) => (
                <span key={c} className="text-xs font-semibold border border-[var(--border)] rounded-full px-3 py-1.5 cursor-default text-[var(--ink)]/60">{c}</span>
              ))}
            </div>

            {/* Placeholder grid — replace with real project images */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center justify-center text-[var(--ink)]/30 text-sm">
                  Project photo {i + 1}
                </div>
              ))}
            </div>

            <div className="mt-12 bg-[var(--surface)] rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">Want to see your project here?</h2>
              <p className="text-[var(--ink)]/60 mb-6">Get in touch for a free estimate on your deck, fence, or concrete project.</p>
              <Link href="/contact" className="btn-primary">Get a Free Estimate</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
