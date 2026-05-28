import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
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
  { title: "Custom Gazebo", category: "Gazebos", image: "/images/gazebo.jpg", alt: "Custom restored gazebo by Master Decker in Southwestern Ontario" },
  { title: "Cedar Fence Build", category: "Fences", image: "/images/fence.jpg", alt: "Cedar fence installation by Master Decker in London Ontario" },
  { title: "Premium Pergola", category: "Pergolas", image: "/images/pergola.jpg", alt: "Premium pergola restoration by Master Decker" },
  { title: "Cedar Gazebo", category: "Gazebos", image: "/images/gazebo.jpg", alt: "Cedar gazebo restoration and staining by Master Decker" },
  { title: "Privacy Fence Install", category: "Fences", image: "/images/fence.jpg", alt: "Privacy fence installation by Master Decker" },
];

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-[var(--accent-dark)] text-white">
          <div className="container section text-center">
            <p className="eyebrow text-[var(--accent-light)] mb-3">Our Work</p>
            <h1 className="h-display text-4xl md:text-5xl mb-5">Project Examples</h1>
            <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed mb-8">
              Showcasing our completed decks, fences, pergolas, gazebos, and concrete works across Southwestern Ontario.
            </p>
            <Link href="/contact" className="btn-primary">Start Your Project</Link>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <article key={`${p.title}-${i}`} className="group">
                  <div className="relative aspect-[4/3] rounded overflow-hidden mb-4">
                    <Image src={p.image} alt={p.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute top-3 left-3 bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">{p.category}</div>
                  </div>
                  <h3 className="font-bold text-lg">{p.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[var(--accent-dark)] text-white text-center">
          <div className="container max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Ready to start yours?</h2>
            <p className="text-white/80 mb-8 text-lg">
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
