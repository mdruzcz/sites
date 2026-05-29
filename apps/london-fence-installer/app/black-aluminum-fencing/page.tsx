import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Black Aluminum Fencing in London, ON",
  description: "Elegant, low-maintenance black aluminum fencing for pool enclosures, properties, and decorative applications in London, Ontario. Powder-coated for lasting beauty.",
  openGraph: {
    title: "Black Aluminum Fencing | London Fence Installer",
    description: "Beautiful black aluminum fence installation in London, ON. Perfect for pools and decorative applications.",
    url: `${site.url}/black-aluminum-fencing`,
  },
};

export default function BlackAluminumPage() {
  const service = serviceSchema("Black Aluminum Fencing", "Elegant black aluminum fence installation in London, Ontario.", "/black-aluminum-fencing");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: "Black Aluminum Fencing", url: `${site.url}/black-aluminum-fencing` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="bg-green py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="text-sm text-gray-300 mb-4">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/services" className="hover:text-white">Services</Link>
                <span className="mx-2">›</span>
                <span>Black Aluminum Fencing</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Black Aluminum Fencing</h1>
              <p className="text-gray-200">Elegant, low-maintenance black aluminum fencing for residential and commercial properties in London, Ontario.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl font-extrabold mb-4">Elegant Black Aluminum Fencing in London</h2>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              Black aluminum fencing combines the timeless elegance of wrought iron with the lightweight durability of modern aluminum. Powder-coated in classic black, these fences add sophistication and curb appeal to any property while requiring virtually no maintenance.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              London Fence Installer offers a range of black aluminum fence styles, from decorative residential designs to heavy-duty commercial options. Whether you need a pool enclosure, property boundary, or decorative accent, black aluminum fencing is an excellent choice.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Pool Safety", body: "Ideal for pool enclosures — meets Ontario Building Code requirements for pool fencing." },
              { title: "Low Maintenance", body: "Powder-coated finish resists rust, fading, and chipping — no painting required." },
              { title: "Elegant Design", body: "Classic black finish adds sophistication and value to any property." },
              { title: "Lightweight & Strong", body: "Aluminum is lighter than iron but equally strong and durable." },
              { title: "Custom Styles", body: "Multiple picket styles, heights, and decorative options available." },
              { title: "Mounts to Concrete", body: "Can be installed directly on existing concrete — perfect for pool decks and patios." },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
