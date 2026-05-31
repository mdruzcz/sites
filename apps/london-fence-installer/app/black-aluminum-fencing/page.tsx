import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Black Aluminum Fencing in London, ON",
  description: "Elegant black aluminum fencing in London, ON. Pool code compliant, powder-coated, low maintenance. Perfect for pool enclosures & decorative use. Free quote today.",
  alternates: { canonical: "https://londonfenceinstaller.ca/black-aluminum-fencing" },
  openGraph: {
    title: "Black Aluminum Fencing | London Fence Installer",
    description: "Beautiful black aluminum fence installation in London, ON. Perfect for pools and decorative applications.",
    url: `${site.url}/black-aluminum-fencing`,
    images: [{ url: "/images/metal-fence.webp", width: 1200, height: 630, alt: "Black aluminum fence installation in London, Ontario" }],
  },
};

const styles = [
  { title: "Flat Top", body: "The most popular style — clean, modern lines with flat-top pickets. Suitable for all property types." },
  { title: "Spear Top", body: "Classic spear-tipped pickets add a traditional, formal appearance. Popular for heritage homes and estates." },
  { title: "Finial Top", body: "Decorative ball or fleur-de-lis finials add elegance to the fence line. A premium aesthetic choice." },
  { title: "Loop Top", body: "Rounded loop tops are the safest option for properties with children and are popular around pools." },
  { title: "3-Rail Commercial", body: "Heavier-gauge rails and pickets for commercial properties, municipalities, and high-security applications." },
];

const faqs = [
  { question: "Does black aluminum fencing meet Ontario pool fence requirements?", answer: "Yes. Properly specified black aluminum fencing meets Ontario Building Code Section 8.1 requirements for pool enclosures. The code requires pool fences to be a minimum of 1.2 metres (4 feet) high with picket spacing no greater than 100mm (4 inches) to prevent child access. We install pool enclosures that comply with these requirements and can advise you on gate latch specifications as well." },
  { question: "How much does black aluminum fencing cost in London?", answer: "Black aluminum fencing in London typically costs $40–$75 per linear foot installed, depending on the style, height, and grade. Residential-grade flat-top aluminum starts at the lower end of the range; commercial-grade and decorative spear-top styles are higher. Pool enclosures may have slightly higher costs due to the precision required for gate and latch compliance." },
  { question: "Does aluminum fencing rust?", answer: "No. Aluminum is a non-ferrous metal, meaning it does not rust or corrode. The powder-coated black finish further protects the aluminum from weathering and UV damage. Unlike wrought iron, aluminum fencing requires virtually no maintenance — just an occasional rinse with a garden hose." },
  { question: "What is the difference between aluminum and wrought iron fencing?", answer: "Both achieve a similar decorative look, but aluminum is lighter, more corrosion-resistant, and significantly easier to work with. Wrought iron is heavier, more expensive, and requires periodic painting to prevent rust. For most residential applications, aluminum provides the same aesthetic at a lower cost with far less maintenance." },
  { question: "Can aluminum fencing be installed on a slope?", answer: "Yes. Black aluminum fencing can be installed on sloped ground using two methods: racking (the fence follows the contour of the slope) or stepping (the fence descends in level sections). Our team will recommend the best approach based on your property's grade and the fence style you choose." },
];

export default function BlackAluminumPage() {
  const service = serviceSchema("Black Aluminum Fencing", "Elegant black aluminum fence installation in London, Ontario.", "/black-aluminum-fencing");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: "Black Aluminum Fencing", url: `${site.url}/black-aluminum-fencing` },
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
                <span>Black Aluminum Fencing</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Black Aluminum Fencing</h1>
              <p className="text-gray-200">Elegant, low-maintenance black aluminum fencing for residential and commercial properties in London, Ontario. Pool code compliant.</p>
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
              Black aluminum fencing combines the timeless elegance of traditional wrought iron with the lightweight, rust-proof durability of modern aluminum. Powder-coated in classic black, these fences add sophistication and curb appeal to any property while requiring virtually no maintenance — no painting, no sealing, no rust treatment. Just rinse occasionally and your fence looks like new.
            </p>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              London Fence Installer offers a complete range of black aluminum fence styles, from decorative residential designs with flat or spear-top pickets to heavy-duty commercial options. Whether you need a pool enclosure that meets Ontario Building Code requirements, a property boundary fence that complements your home&apos;s architecture, or a decorative accent fence for your garden, black aluminum is an excellent choice.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Unlike wood fences, aluminum never rots, warps, or absorbs moisture. Unlike vinyl, it maintains a sharp, refined appearance even decades after installation. And unlike wrought iron, it never needs repainting to prevent rust. Black aluminum fencing is a true low-maintenance, high-beauty fencing solution for London homeowners.
            </p>
          </div>

          {/* Styles */}
          <h2 className="text-2xl font-extrabold mb-6">Available Black Aluminum Fence Styles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {styles.map((item) => (
              <div key={item.title} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Pool Safety Compliant", body: "Meets Ontario Building Code Section 8.1 for pool enclosures. Minimum 1.2m height with compliant picket spacing and gate latches." },
              { title: "No Rust or Corrosion", body: "Aluminum is non-ferrous — it does not rust. Powder-coated black finish provides additional protection from UV and weathering." },
              { title: "Low Maintenance", body: "Powder-coated finish resists fading, chipping, and rust for decades. No painting, sealing, or staining ever required." },
              { title: "Elegant Design", body: "Classic black finish adds sophistication and increases perceived property value." },
              { title: "Lightweight & Strong", body: "Aluminum is lighter than iron but equally strong. Easier to install and put less stress on post footings." },
              { title: "Mounts to Concrete", body: "Can be installed directly on existing concrete pool decks and patios — no excavation required." },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pool Code Compliance */}
      <section className="section bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold mb-4">Pool Fence Compliance in Ontario</h2>
          <p className="text-[var(--muted)] mb-4 leading-relaxed">
            Ontario Building Code Section 8.1 requires that any outdoor pool (in-ground or above-ground) be enclosed by a fence with the following minimum specifications:
          </p>
          <ul className="space-y-2 mb-4 text-sm text-[var(--muted)]">
            {[
              "Minimum fence height of 1.2 metres (approximately 4 feet)",
              "Picket spacing not exceeding 100mm (4 inches) to prevent child access",
              "Self-closing, self-latching gates with latches positioned out of children's reach",
              "No horizontal rails or footholds that could allow children to climb",
              "A building permit is required for pool enclosures regardless of fence height",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[var(--green)] flex-shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[var(--muted)] text-sm">
            Our black aluminum pool fences are installed to meet or exceed these requirements. We obtain the necessary permits and ensure your pool enclosure passes inspection.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold mb-4">Black Aluminum Fence Cost in London</h2>
          <p className="text-[var(--muted)] mb-4 leading-relaxed">
            Black aluminum fencing in London typically costs <strong>$40–$75 per linear foot installed</strong>, depending on style, height, and grade:
          </p>
          <ul className="space-y-2 mb-4 text-sm text-[var(--muted)]">
            {[
              "Residential flat-top (4 feet): ~$40–$55/linear foot installed",
              "Residential spear-top / decorative (5 feet): ~$50–$65/linear foot installed",
              "Commercial grade / pool enclosure: ~$55–$75/linear foot installed",
              "Gates are priced separately depending on width and hardware",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[var(--green)] flex-shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[var(--muted)] text-sm mb-4">
            Prices include materials, labour, post footings, and concrete. For an exact quote based on your property and style preferences, <Link href="/contact-us" className="text-[var(--green)] font-semibold hover:underline">contact us</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[var(--surface)]">
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
      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold mb-4">Black Aluminum Fencing Near You</h2>
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
              <Link key={area.label} href={area.href} className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-full text-sm font-semibold hover:bg-[var(--green)] hover:text-white hover:border-[var(--green)] transition-colors">
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
