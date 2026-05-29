import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Fence Staining Services in London, ON",
  description: "Professional fence staining services in London, Ontario. Protect and beautify your wood fence with expert staining that extends its life and enhances appearance.",
  openGraph: {
    title: "Fence Staining | London Fence Installer",
    description: "Expert fence staining in London, ON. Protect your wood fence from moisture, UV, and weathering.",
    url: `${site.url}/fence-staining`,
    images: [{ url: "/images/fence-staining.jpg" }],
  },
};

export default function FenceStainingPage() {
  const service = serviceSchema("Fence Staining", "Professional fence staining services in London, Ontario.", "/fence-staining");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: "Fence Staining", url: `${site.url}/fence-staining` },
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
                <span>Fence Staining</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Fence Staining</h1>
              <p className="text-gray-200">Protect and beautify your wood fence with professional staining services in London, Ontario.</p>
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
              <h2 className="text-3xl font-extrabold mb-4">Professional Fence Staining in London</h2>
              <p className="text-[var(--muted)] mb-4 leading-relaxed">
                Regular staining is one of the best ways to protect your wood fence from the harsh Ontario climate. Our professional staining services apply high-quality stains that enhance the natural grain, protect against moisture and UV rays, and significantly extend the life of your fence.
              </p>
              <p className="text-[var(--muted)] mb-6 leading-relaxed">
                Whether you have a cedar fence that needs refreshing or a pressure-treated pine fence requiring its first coat of protection, our team has the expertise to deliver a beautiful, long-lasting finish.
              </p>
              <Link href="/contact-us" className="btn btn-primary">
                Get a Free Staining Quote
              </Link>
            </div>
            <div>
              <Image
                src="/images/fence-staining.jpg"
                alt="Professional fence staining service in London, Ontario"
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
          <h2 className="text-3xl font-extrabold text-center mb-8">Benefits of Professional Fence Staining</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Weather Protection", body: "Seals wood fibres against rain, snow, and frost — critical in the Ontario climate." },
              { title: "UV Protection", body: "Prevents graying and cracking caused by sun exposure." },
              { title: "Enhanced Appearance", body: "Brings out the natural beauty of the wood grain with rich, deep colour." },
              { title: "Extended Lifespan", body: "Properly stained fences last significantly longer than unstained wood." },
              { title: "Mould Prevention", body: "Creates a barrier against moisture that leads to mould and mildew growth." },
              { title: "Increased Value", body: "A well-maintained fence adds curb appeal and property value." },
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
