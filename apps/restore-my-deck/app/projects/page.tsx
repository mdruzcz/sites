import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Projects | Deck & Fence Restoration Gallery",
  description: "Browse completed deck and fence restoration, staining and cleaning projects by Restore My Deck in Kitchener-Waterloo, Guelph, Cambridge, Hamilton and area.",
  openGraph: { title: "Projects | Restore My Deck", url: `${site.url}/projects` },
};

const projects = [
  { img: "/images/project-1.jpg", alt: "Cedar deck restoration in Kitchener before and after", title: "Cedar Deck Restoration", city: "Kitchener" },
  { img: "/images/project-2.jpg", alt: "Pressure washed and stained fence in Waterloo", title: "Fence Staining", city: "Waterloo" },
  { img: "/images/project-3.jpg", alt: "Full deck restoration with oil stain in Cambridge", title: "Full Deck Restoration", city: "Cambridge" },
  { img: "/images/project-4.jpg", alt: "Deck repair and staining in Guelph", title: "Deck Repair & Staining", city: "Guelph" },
  { img: "/images/project-5.jpg", alt: "Weathered deck cleaning and restoration in Hamilton", title: "Deck Cleaning & Restoration", city: "Hamilton" },
  { img: "/images/project-6.jpg", alt: "Fence cleaning and painting in Stratford", title: "Fence Cleaning & Painting", city: "Stratford" },
];

export default function ProjectsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }])) }} />

      <div className="bg-[var(--dark)] py-16 px-4 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-[var(--font-montserrat)]">Our Projects</h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Real results from real decks and fences across Kitchener-Waterloo and surrounding areas.</p>
        </div>
      </div>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.title + p.city} className="card overflow-hidden group">
                <div className="relative aspect-[4/3]">
                  <Image src={p.img} alt={p.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw, 33vw" />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">{p.city}</p>
                  <h2 className="text-lg font-bold text-[var(--dark)] mt-1">{p.title}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Ready to see what we can do for your deck or fence? Get a free quote today.</p>
            <Link href="/contact-us" className="btn btn-accent">Request a Free Quote</Link>
          </div>
        </div>
      </section>

      <CtaBand title="Your Deck Could Look Like This" />
    </>
  );
}
