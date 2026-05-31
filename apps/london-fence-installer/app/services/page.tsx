import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Fencing Services in London, ON",
  description: "London Fence Installer offers wood, metal, vinyl, chain-link fences, fence repair, guardrail and noise wall services. Serving London, St Thomas, and Woodstock.",
  alternates: { canonical: "https://londonfenceinstaller.ca/services" },
  openGraph: {
    title: "Fencing Services | London Fence Installer",
    description: "Full range of residential and commercial fencing services in London, ON and surrounding areas.",
    url: `${site.url}/services`,
    images: [{ url: "/images/hero-fence.jpg", width: 1200, height: 630, alt: "Fencing services in London, Ontario" }],
  },
};

const services = [
  {
    title: "Wood Fences",
    href: "/wood-fencing-contractor",
    body: "Enhance the beauty and privacy of your property with our exquisite wood fences. Our skilled craftsmen meticulously design and install wood fences that not only provide security but also add a touch of natural elegance to your outdoor space. Choose from a variety of wood types and styles to complement your landscape.",
    icon: "🌲",
  },
  {
    title: "Metal Fences",
    href: "/metal-fence-installation",
    body: "London Fence Installer brings you durable and versatile metal fences designed to combine strength with sophistication. Whether you seek ornamental wrought iron fences or the sleek modernity of aluminum, our metal fences provide security without compromising aesthetics.",
    icon: "⚙️",
  },
  {
    title: "Vinyl Fences",
    href: "/vinyl-fence-installation",
    body: "Experience the perfect blend of style and functionality with our vinyl fences. Known for their low maintenance, durability, and resistance to the elements, our vinyl fences provide a sleek and polished appearance while ensuring privacy and security.",
    icon: "🏡",
  },
  {
    title: "Chain-Link Fences",
    href: "/chainlink-fencing",
    body: "For robust security and delineation, our chain-link fences are the ideal choice. Perfect for construction sites, parks, or residential properties — both cost-effective and reliable.",
    icon: "🔗",
  },
  {
    title: "Black Aluminum Fencing",
    href: "/black-aluminum-fencing",
    body: "Elegant, low-maintenance black aluminum fencing for pool enclosures, properties, and decorative applications. Powder-coated for lasting beauty and weather resistance.",
    icon: "🔲",
  },
  {
    title: "Fence Repair",
    href: "/fence-repair",
    body: "Is your existing fence showing signs of wear and tear? London Fence Installer provides professional fence repair services. From repairing damaged sections to reinforcing weakened areas, our skilled technicians are equipped to handle various repair needs.",
    icon: "🔧",
  },
  {
    title: "Guardrail Installation",
    href: "/guardrail-installation",
    body: "London Fence Installer extends its expertise to guardrail installation — a crucial component for safety on roads and highways. Our guardrails are designed to meet industry standards, providing effective protection.",
    icon: "🚧",
  },
  {
    title: "Noise Wall Installation",
    href: "/noise-wall-and-highway-fencing",
    body: "Combat noise pollution with our specialized noise wall installation services. We collaborate closely with leading manufacturers to bring you cutting-edge noise barrier walls that effectively minimize sound.",
    icon: "🔇",
  },
  {
    title: "Fence Staining",
    href: "/fence-staining",
    body: "Protect and beautify your wood fence with professional staining services. We apply high-quality stains that enhance the natural grain, protect against moisture, and extend the life of your fence.",
    icon: "🖌️",
  },
];

export default function ServicesPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="bg-green py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span>Services</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Services</h1>
          <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
            Welcome to London Fence Installer, where craftsmanship meets excellence. We provide a diverse range of fencing solutions tailored to your needs — the go-to fence installation experts in London and surrounding areas.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="card p-6 hover:shadow-lg transition-all group">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h2 className="text-xl font-bold text-[var(--green)] mb-3 group-hover:text-[var(--green-light)] transition-colors">
                  {s.title}
                </h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{s.body}</p>
                <span className="inline-block mt-4 text-[var(--green)] font-semibold text-sm group-hover:underline">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose LFI */}
      <section className="section bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Why Choose London Fence Installer?</h2>
          <ul className="text-left space-y-3">
            {[
              { label: "Expertise", detail: "With years of experience, we bring a wealth of knowledge and skill to every project." },
              { label: "Quality Assurance", detail: "Our commitment to quality is evident in the materials we use and the precision of every installation." },
              { label: "Customer Satisfaction", detail: "We work closely with you to understand your unique needs and deliver solutions that exceed expectations." },
              { label: "Comprehensive Services", detail: "From wood to metal, vinyl to chain-link, we offer fencing solutions to cater to every requirement." },
            ].map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[var(--green)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm text-[var(--muted)]">
                  <strong className="text-[var(--foreground)]">{item.label}:</strong> {item.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
