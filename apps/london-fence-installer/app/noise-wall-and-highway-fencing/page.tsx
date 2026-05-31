import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Noise Wall & Highway Fencing in London, ON",
  description: "Noise barrier wall and highway fencing installation in London, ON. Sound reduction, highway delineation, and roadside fencing that meets provincial standards.",
  alternates: { canonical: "https://londonfenceinstaller.ca/noise-wall-and-highway-fencing" },
  openGraph: {
    title: "Noise Wall & Highway Fencing | London Fence Installer",
    description: "Professional noise barrier wall and highway fencing installation in London, Ontario.",
    url: `${site.url}/noise-wall-and-highway-fencing`,
    images: [{ url: "/images/hero-fence.jpg", width: 1200, height: 630, alt: "Noise wall and highway fencing installation in London, Ontario" }],
  },
};

export default function NoiseWallPage() {
  const service = serviceSchema("Noise Wall and Highway Fencing", "Noise barrier wall and highway fencing installation in London, Ontario.", "/noise-wall-and-highway-fencing");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: "Noise Wall & Highway Fencing", url: `${site.url}/noise-wall-and-highway-fencing` },
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
                <span>Noise Wall & Highway Fencing</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Noise Wall & Highway Fencing</h1>
              <p className="text-gray-200">High-quality chain link fences and noise barrier walls. Specializing in highway and roadside delineation in London, ON.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold mb-6">Noise Wall Installation Services</h2>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              Combat noise pollution with our specialized noise wall installation services. London Fence Installer collaborates closely with leading manufacturers to bring you cutting-edge noise barrier walls. From initial design to installation, our team ensures that your noise wall effectively minimizes sound, creating a more peaceful environment for your residential or commercial space.
            </p>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              We take pride in being your go-to destination for high-quality chain link fences and noise barrier walls. Specializing in highway and roadside delineation, we provide solutions that meet industry standards and regulatory requirements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {[
              { title: "Noise Reduction", body: "Advanced barrier wall systems that significantly reduce noise pollution from highways and commercial areas." },
              { title: "Highway Fencing", body: "Durable fencing solutions designed specifically for roadside and highway applications." },
              { title: "Custom Design", body: "From initial design to final installation, we create noise walls that meet your specifications." },
              { title: "Industry Standards", body: "All installations meet provincial and municipal safety and construction regulations." },
              { title: "Durable Materials", body: "Heavy-duty materials designed to withstand Ontario weather conditions and vehicle traffic." },
              { title: "Commercial Projects", body: "Experienced with large-scale commercial, municipal, and highway projects." },
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
