import type { Metadata } from "next";
import Link from "next/link";
import ImageWithBlur from "@/components/ImageWithBlur";
import CtaBand from "@/components/CtaBand";
import { getProjects } from "@/lib/content";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Project Gallery — Concrete Work in Brantford, ON",
  description:
    "Browse our portfolio of completed concrete projects in Brantford and Brant County. Driveways, patios, stamped concrete & more — see our work before you hire.",
  openGraph: {
    title: "Project Gallery | Brantford Concrete Forming",
    description: "Completed concrete driveways, patios, and stamped concrete projects across Brantford and Brant County.",
    images: [{ url: "/images/Stamped-Concrete-in-Brantford.jpg", alt: "Stamped concrete gallery project in Brantford, ON" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function GalleryPage() {
  const projects = getProjects();
  const jsonLd = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Gallery", url: `${site.url}/gallery` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="bg-[#1a2332] py-16">
        <div className="container-custom">
          <nav className="text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Gallery</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Project Gallery</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            A showcase of our completed concrete work across Brantford and the surrounding communities.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div key={project.slug} className="relative rounded-xl overflow-hidden h-72 group cursor-pointer">
                <ImageWithBlur
                  src={project.image}
                  alt={`${project.title} by Brantford Concrete Forming in ${project.city}, ON`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-bold text-lg">{project.title}</p>
                  <p className="text-slate-300 text-sm">{project.city}, ON</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">Want to see your project here?</p>
            <Link href="/contact" className="btn btn-primary text-base">Get a Free Quote</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
