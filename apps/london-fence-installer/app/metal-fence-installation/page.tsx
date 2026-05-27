import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Metal Fence Installation in London, ON",
  description: "Secure, custom metal fences in London, ON — privacy panels, elegant gates, and robust security solutions backed by expert craftsmanship and tailored design.",
  openGraph: {
    title: "Metal Fence Installation | London Fence Installer",
    description: "Custom metal fence installation in London, ON. Ornamental, security, and pool fencing solutions.",
    url: `${site.url}/metal-fence-installation`,
    images: [{ url: "/images/metal-fence.webp" }],
  },
};

export default function MetalFencePage() {
  const service = serviceSchema("Metal Fence Installation", "Custom metal fence installation in London, Ontario including ornamental and security fencing.", "/metal-fence-installation");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: "Metal Fence Installation", url: `${site.url}/metal-fence-installation` },
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
                <span>Metal Fence Installation</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Metal Fence Installation</h1>
              <p className="text-gray-200">Secure, custom metal fences in London, ON — privacy panels, elegant gates, and robust security solutions.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold mb-4">Durable and Versatile Metal Fences</h2>
              <p className="text-[var(--muted)] mb-4 leading-relaxed">
                London Fence Installer brings you durable and versatile metal fences designed to combine strength with sophistication. Whether you seek ornamental wrought iron fences or the sleek modernity of aluminum, our metal fences provide security without compromising aesthetics.
              </p>
              <p className="text-[var(--muted)] mb-4 leading-relaxed">
                Ornamental metal fences add a touch of grandeur. Most metal fences are powder coated and come in black. There are several different designs available, and they can be mounted to existing concrete — making metal fences the best choice for a pool fence.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                Enjoy low maintenance and long-lasting durability with our expertly crafted metal fence solutions, backed by our five-year limited warranty.
              </p>
            </div>
            <div>
              <Image
                src="/images/metal-fence.webp"
                alt="Custom metal fence installation in London, Ontario by London Fence Installer"
                width={600}
                height={400}
                className="rounded-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-8">Why Choose Metal Fencing?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Security", body: "Provides a strong, tamper-resistant barrier for residential and commercial properties." },
              { title: "Aesthetic Appeal", body: "Ornamental designs add grandeur and elegance to any property." },
              { title: "Low Maintenance", body: "Powder-coated finishes resist rust and weathering for years of beauty." },
              { title: "Pool Ready", body: "The ideal fence choice for pool enclosures — can mount to existing concrete." },
              { title: "Custom Designs", body: "Multiple styles and patterns to match your property's unique character." },
              { title: "Long Lifespan", body: "Metal fences built to last decades with minimal upkeep required." },
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
