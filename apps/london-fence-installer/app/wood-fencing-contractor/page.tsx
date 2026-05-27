import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Wood Privacy Fence Installation in London, ON",
  description: "Quick and dependable wood fence installation services in London, St Thomas, and Woodstock. Pressure treated pine & cedar. Fully insured and warrantied. Call today!",
  openGraph: {
    title: "Wood Fence Contractor | London Fence Installer",
    description: "Expert wood fence installation in London, ON. Cedar and pressure treated pine. Free quotes within 48 hrs.",
    url: `${site.url}/wood-fencing-contractor`,
    images: [{ url: "/images/wood-fence.jpg" }],
  },
};

const woodStyles = [
  { title: "Wood Picket Fence", body: "Ideal for front yards, gardens, and pool enclosures, providing a barrier or deterrent with a pointed design." },
  { title: "Vertical Board Fence", body: "A common choice for backyard fencing, offering sturdiness and durability with vertically oriented boards." },
  { title: "Horizontal Fence", body: "A sleek and modern design that adds a contemporary touch to your landscape." },
  { title: "Lattice Fence", body: "Featuring a crisscross design, allowing air and light to pass through — perfect for gardens, decks, and patios." },
  { title: "Louver Fence", body: "Balancing privacy and airflow, a slanted design that offers substantial coverage from the elements." },
  { title: "Post and Rail Fence", body: "A cost-effective option, often used for enclosing larger spaces like farms, creating boundaries and barriers." },
];

const faqs = [
  { question: "What wood types do you use for fence installation?", answer: "We specialize in two primary wood types: Pressure Treated Pine and Cedar. Cedar is our recommended choice for its natural insect-repelling properties, low maintenance, and superior aesthetics." },
  { question: "How deep do you install fence posts?", answer: "We install wood fence posts at least 42 inches below grade to avoid frost heave. We also add 30KG of quick-setting concrete per post for maximum stability." },
  { question: "How long does a wood fence last?", answer: "A well-installed wooden fence can last anywhere from 10 to 30 years, depending on quality installation and maintenance." },
  { question: "Do you offer a warranty on wood fence installation?", answer: "Yes, we stand by a five-year limited warranty on all our fence installations." },
];

export default function WoodFencePage() {
  const service = serviceSchema("Wood Fence Installation", "Professional wood fence installation in London, ON using cedar and pressure-treated pine.", "/wood-fencing-contractor");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: "Wood Fence Contractor", url: `${site.url}/wood-fencing-contractor` },
  ]);
  const faq = faqSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      {/* Hero */}
      <section className="bg-green py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="text-sm text-gray-300 mb-4">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/services" className="hover:text-white">Services</Link>
                <span className="mx-2">›</span>
                <span>Wood Fence Contractor</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Wood Fence Contractor</h1>
              <p className="text-gray-200 leading-relaxed">
                Quick and dependable wood fence installation services in London, St Thomas, and Woodstock. Fully insured and warrantied.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get Quote" />
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--muted)] mb-8 max-w-2xl">
            When we install a fence for you, rest assured we use only the highest quality materials available in the market. We specialize in two primary wood types: Pressure Treated Pine and Cedar.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Pressure Treated Pine */}
            <div className="card p-6">
              <h2 className="text-2xl font-extrabold text-[var(--green)] mb-4">Pressure Treated Pine</h2>
              <ul className="space-y-3">
                {[
                  { label: "Cost-Effective", detail: "A budget-friendly option without compromising quality." },
                  { label: "Rot and Insect Resistance", detail: "Combat rot and insect infestation effectively." },
                  { label: "Ease of Maintenance", detail: "One of the more manageable materials to work with." },
                  { label: "Versatility", detail: "Ideal for various fence styles — a versatile choice for any property." },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-2 text-sm">
                    <span className="text-[var(--green)] font-bold flex-shrink-0">✓</span>
                    <span><strong>{item.label}:</strong> {item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cedar */}
            <div className="card p-6 border-[var(--green)] border-2">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-extrabold text-[var(--green)]">Cedar</h2>
                <span className="text-xs bg-[var(--accent)] text-black font-bold px-2 py-0.5 rounded-full">Recommended</span>
              </div>
              <ul className="space-y-3">
                {[
                  { label: "Low Maintenance", detail: "Cedar requires minimal maintenance, saving you time and effort." },
                  { label: "Natural Insect Repellent", detail: "Natural insect-repelling properties ensure longevity." },
                  { label: "Aesthetics", detail: "Pleasant scent and beautiful aesthetics enhance your property." },
                  { label: "Rot Resistance", detail: "Considered a rot-resistant wood with a long lifespan." },
                  { label: "Economical Choice", detail: "Despite a slightly higher upfront cost, cedar proves more economical over time." },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-2 text-sm">
                    <span className="text-[var(--green)] font-bold flex-shrink-0">✓</span>
                    <span><strong>{item.label}:</strong> {item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lifespan note */}
          <div className="bg-[var(--surface)] rounded-xl p-6 mb-12">
            <p className="text-[var(--muted)]">
              Regardless of the wood type you choose, a well-installed wooden fence can last anywhere from <strong>10 to 30 years</strong>, depending on quality installation and maintenance. London Fence Installer ensures that you understand the materials and maintenance plan for your chosen fence, minimizing the chances of future repairs.
            </p>
          </div>

          {/* Gallery images */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <Image
              src="/images/wood-fence.jpg"
              alt="Cedar wood privacy fence installed by London Fence Installer in London, Ontario"
              width={600}
              height={400}
              className="rounded-xl w-full h-64 object-cover"
            />
            <Image
              src="/images/hero-fence.jpg"
              alt="Pressure treated wood fence installation in London, Ontario backyard"
              width={600}
              height={400}
              className="rounded-xl w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Fence Styles */}
      <section className="section bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-8">Styles of Wooden Fences</h2>
          <p className="text-center text-[var(--muted)] mb-8">
            London Fence Installer offers a variety of popular styles to suit your preferences.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {woodStyles.map((s, i) => (
              <div key={s.title} className="card p-5">
                <div className="w-8 h-8 rounded-full bg-[var(--green)] text-white text-sm font-bold flex items-center justify-center mb-3">
                  {i + 1}
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--muted)]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-2">{faq.question}</h3>
                <p className="text-sm text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
