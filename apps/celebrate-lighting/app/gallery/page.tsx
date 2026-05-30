import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse Celebrate Lighting's permanent outdoor LED installations across Southwestern Ontario — real homes, real results from Brantford to London to Waterloo.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Project Gallery | Permanent LED Lighting — Celebrate Lighting",
    description: "See our permanent outdoor LED lighting installations across SW Ontario homes and businesses.",
    url: "https://celebratelighting.ca/gallery",
    images: [{ url: "/images/hero-main.jpg", alt: "Gallery of permanent outdoor LED lighting installs by Celebrate Lighting" }],
  },
};

export default function GalleryPage() {
  const projects = getProjects();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Gallery", url: `${site.url}/gallery` },
      ])) }} />

      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <span>Gallery</span>
          </nav>
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Our Work</p>
            <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight mb-4">Project Gallery</h1>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Every installation is custom-designed and professionally installed. Browse our portfolio of permanent outdoor LED lighting projects across Southwestern Ontario.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {projects.map((project) => (
              <div key={project.slug} className="break-inside-avoid rounded-xl overflow-hidden relative group">
                <Image
                  src={project.image}
                  alt={`${project.description} — Permanent LED lighting by Celebrate Lighting`}
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <div className="text-white font-semibold text-sm">{project.title}</div>
                    <div className="text-gray-300 text-xs">{project.city}, Ontario</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <p className="text-[var(--muted)] mb-6">Ready to add your home to our gallery?</p>
            <Link href="/contact" className="btn btn-primary px-8">Get Your Free Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
