import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Chainlink Fencing in London, ON – Fast Free Quote",
  description: "A chain-link fence offers highly durable yet lightweight fencing from interwoven metal wires. Serving London, St Thomas, and Woodstock. Call for a free quote today!",
  openGraph: {
    title: "Chainlink Fencing | London Fence Installer",
    description: "Reliable chainlink fence installation in London, ON. Budget-friendly, durable, and versatile.",
    url: `${site.url}/chainlink-fencing`,
    images: [{ url: "/images/chainlink-fence.jpg" }],
  },
};

const advantages = [
  { title: "Longevity & Durability", body: "Galvanized steel construction withstands wear and tear, weather, and impacts." },
  { title: "Easy Maintenance", body: "Virtually non-existent maintenance, requiring only occasional cleaning." },
  { title: "Easy Repair", body: "Damaged sections can be easily replaced without replacing the entire fence." },
  { title: "Cost-Effectiveness", body: "Made from low-cost materials — a budget-friendly option with easy installation." },
  { title: "Security", body: "Sturdy steel wires deter trespassers and provide a secure perimeter." },
  { title: "Versatility", body: "Highly adaptable — can be modified for various utility and decorative requirements." },
];

export default function ChainlinkPage() {
  const service = serviceSchema("Chainlink Fencing", "Professional chain-link fence installation in London, St Thomas, and Woodstock, Ontario.", "/chainlink-fencing");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: "Chainlink Fencing", url: `${site.url}/chainlink-fencing` },
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
                <span>Chainlink Fencing</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Chainlink Fencing</h1>
              <p className="text-gray-200">Fast free quote on reliable chain-link fencing in London, St Thomas, and Woodstock.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-extrabold mb-4">Reliable Chain-Link Fencing Solutions</h2>
              <p className="text-[var(--muted)] mb-4 leading-relaxed">
                London Fence Installer offers a comprehensive range of reliable fencing solutions, including top-notch chain-link fences, serving London, St Thomas, and Woodstock. Our unwavering commitment to quality ensures that the chain-link fences we provide not only meet but exceed your individual requirements.
              </p>
              <h3 className="text-xl font-bold text-[var(--green)] mb-3">The Major Benefits of a Chainlink Fence</h3>
              <p className="text-[var(--muted)] mb-4 leading-relaxed">
                Chain-link fencing stands out as a versatile, durable, and cost-effective option. Its affordability becomes especially apparent when compared to alternatives that can be two or even three times the price.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                The material allows for a secure perimeter without obstructing visibility, maintaining an open and airy feel. Its durability provides resistance to various environmental elements and ensures longevity without the risk of chipping or cracking.
              </p>
            </div>
            <div>
              <Image
                src="/images/chainlink-fence.jpg"
                alt="Professional chainlink fence installation in London, Ontario"
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
          <h2 className="text-3xl font-extrabold text-center mb-4">What Sets Chain-Link Fences Apart?</h2>
          <p className="text-center text-[var(--muted)] max-w-2xl mx-auto mb-8">
            A chain-link fence, also known as a &apos;hurricane fence,&apos; is crafted from interwoven metal wires in a mesh design. Zinc-plated or galvanized wires contribute to strength and agility, making it one of the sturdiest options in the market.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {[
              { label: "Variety of Sizes", detail: "Industrial and commercial grades, offering flexibility to enhance the value and security of your property." },
              { label: "Tailored Solutions", detail: "We examine your budget, needs, and property to provide chain-link fences that align with your requirements." },
              { label: "Longevity & Durability", detail: "Crafted from galvanized steel, our fences withstand wear and tear and various weather conditions." },
            ].map((item) => (
              <div key={item.label} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-2">{item.label}</h3>
                <p className="text-sm text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-extrabold text-center mb-8">Advantages of Chain-Link Fences</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((a) => (
              <div key={a.title} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-2">{a.title}</h3>
                <p className="text-sm text-[var(--muted)]">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
