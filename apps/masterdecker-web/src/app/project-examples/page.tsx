import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { Hero } from "@/components/hero";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/project-examples` },
  title: "Project Examples | Master Decker | Decks, Fences & Concrete",
  description:
    "Browse Master Decker project examples — pergolas, gazebos, fences, decks, concrete patios and driveways built across London Ontario and Southwestern Ontario.",
};

const projects = [
  { title: "Premium Pergola with Swing", category: "Pergolas", image: "/images/pergola.jpg", alt: "Premium pergola with built-in swing — Master Decker, London Ontario" },
  { title: "Custom Cedar Fence", category: "Fences", image: "/images/fence.jpg", alt: "Custom cedar fence install by Master Decker" },
  { title: "Restored Gazebo", category: "Gazebos", image: "/images/gazebo.jpg", alt: "Restored gazebo by Master Decker in Southwestern Ontario" },
  { title: "Backyard Deck Build", category: "Decks", image: "/images/deck-bg.jpg", alt: "Backyard deck build by Master Decker" },
  { title: "Stamped Concrete Patio", category: "Concrete", image: "/images/stamped-bg.jpg", alt: "Stamped concrete patio install" },
  { title: "Pergola Restoration", category: "Pergolas", image: "/images/pergola-bg.jpg", alt: "Pergola restoration and re-stain" },
  { title: "Outdoor Living Deck", category: "Decks", image: "/images/outdoor-deck.jpg", alt: "Outdoor living deck space by Master Decker" },
  { title: "Concrete Driveway Pour", category: "Concrete", image: "/images/concrete-bg.jpg", alt: "Concrete driveway pour" },
  { title: "Garden Gazebo", category: "Gazebos", image: "/images/gazebo-bg.jpg", alt: "Custom garden gazebo build" },
];

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          eyebrow="Our Work"
          title="Project Examples"
          subtitle="Showcasing our completed decks, fences, pergolas, gazebos, and concrete works across Southwestern Ontario."
          background="/images/pergola-bg.jpg"
          primaryCta={{ label: "Start Your Project", href: "/contact" }}
        />

        <section className="section bg-white">
          <div className="container">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <article key={`${p.title}-${i}`} className="group gallery-item">
                  <Image src={p.image} alt={p.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute top-3 left-3 bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10">{p.category}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                  <h3 className="absolute bottom-3 left-3 right-3 font-bold text-lg text-white z-10">{p.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative section text-white text-center overflow-hidden bg-[var(--ink)]">
          <div className="absolute inset-0" style={{ backgroundImage: "url(/images/deck-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
          <div className="container relative max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Ready to start yours?</h2>
            <p className="text-white/85 mb-8 text-lg">
              Free estimates across London, Kitchener-Waterloo, Hamilton, and the GTA.
            </p>
            <Link href="/contact" className="btn-primary">Request Quote</Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFab />
    </>
  );
}
