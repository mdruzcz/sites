import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Metal Fence Installation in London, ON",
  description: "Custom metal & aluminum fences in London, ON. Ornamental wrought iron, pool enclosures, and security fencing. Free quote in 48 hrs, 5-year warranty.",
  alternates: { canonical: "https://londonfenceinstaller.ca/metal-fence-installation" },
  openGraph: {
    title: "Metal Fence Installation | London Fence Installer",
    description: "Custom metal fence installation in London, ON. Ornamental, security, and pool fencing solutions.",
    url: `${site.url}/metal-fence-installation`,
    images: [{ url: "/images/metal-fence.webp", width: 1200, height: 630, alt: "Metal fence installation in London, Ontario" }],
  },
};

const faqs = [
  { question: "How much does metal fence installation cost in London?", answer: "Metal fence installation in London typically costs $35–$65 per linear foot installed, depending on the material (aluminum vs. steel), height, and style. Ornamental aluminum is at the lower end of the range; heavy-gauge wrought iron and specialty designs are higher. Pool enclosures and commercial-grade installations may cost more." },
  { question: "What is the difference between aluminum and wrought iron fencing?", answer: "Aluminum is lighter, rust-proof, and requires virtually no maintenance. Wrought iron is heavier and more susceptible to rust without regular painting, but provides a more traditional look and greater weight. For most residential applications in London's climate, aluminum provides the same aesthetic as wrought iron at a lower cost with far less maintenance." },
  { question: "How long does a metal fence last?", answer: "A properly installed aluminum or powder-coated metal fence can last 30–50 years. The powder coating protects against UV, moisture, and weathering. Wrought iron requires periodic repainting to prevent rust, but when maintained properly also lasts for decades." },
  { question: "Can metal fencing be used for pool enclosures?", answer: "Yes. Metal and aluminum fencing is one of the most popular choices for pool enclosures in Ontario. It meets Ontario Building Code requirements when installed at the correct height (minimum 1.2m) with proper picket spacing and self-closing gates. We install pool enclosures to code and obtain the necessary building permits." },
];

export default function MetalFencePage() {
  const service = serviceSchema("Metal Fence Installation", "Custom metal fence installation in London, Ontario including ornamental and security fencing.", "/metal-fence-installation");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: "Metal Fence Installation", url: `${site.url}/metal-fence-installation` },
  ]);
  const faq = faqSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

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

      {/* Pricing */}
      <section className="section bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold mb-4">Metal Fence Installation Cost in London</h2>
          <p className="text-[var(--muted)] mb-4 leading-relaxed">
            Metal fence installation in London typically costs <strong>$35–$65 per linear foot installed</strong>. Ornamental aluminum starts at the lower end; heavy-gauge wrought iron and commercial-grade designs are higher. Pool enclosure installations may include additional costs for permit applications and compliant gate hardware.
          </p>
          <p className="text-[var(--muted)] text-sm">
            For an exact quote, <Link href="/contact-us" className="text-[var(--green)] font-semibold hover:underline">contact us</Link> — we respond within 48 hours.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.question} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-2">{f.question}</h3>
                <p className="text-sm text-[var(--muted)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold mb-4">Metal Fencing Near You</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "St. Thomas", href: "/st-thomas-wood-fence" },
              { label: "Woodstock", href: "/woodstock-fence-builder" },
              { label: "Aylmer", href: "/wood-fence-alymer" },
              { label: "Strathroy", href: "/strathroy-fence-builder" },
              { label: "Tillsonburg", href: "/tilsonburg-fence-builder" },
              { label: "St. Marys", href: "/st-marys-fence-builder" },
              { label: "Ingersoll", href: "/ingersoll-wood-fence-builder" },
            ].map((area) => (
              <Link key={area.label} href={area.href} className="px-4 py-2 bg-white border border-[var(--border)] rounded-full text-sm font-semibold hover:bg-[var(--green)] hover:text-white hover:border-[var(--green)] transition-colors">
                {area.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
