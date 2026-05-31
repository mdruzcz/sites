import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Vinyl Fence Installation in London, ON",
  description: "Low-maintenance vinyl fence installation in London, ON. EverGuard® vinyl systems. Privacy, picket & corral styles. Free quotes in 48 hrs. 5-year warranty.",
  alternates: { canonical: "https://londonfenceinstaller.ca/vinyl-fence-installation" },
  openGraph: {
    title: "Vinyl Fence Installation | London Fence Installer",
    description: "Low-maintenance vinyl fence installation in London, ON. EverGuard® systems. Free quotes within 48 hrs.",
    url: `${site.url}/vinyl-fence-installation`,
    images: [{ url: "/images/vinyl-fence-2.jpg", width: 1200, height: 630, alt: "Vinyl fence installation in London, Ontario" }],
  },
};

const faqs = [
  { question: "How much does vinyl fence installation cost in London?", answer: "Vinyl fence installation in London typically costs $40–$70 per linear foot installed, depending on the style and height. Privacy vinyl fences are at the higher end of the range, while picket styles are more affordable. EverGuard® systems carry a manufacturer warranty and offer excellent long-term value." },
  { question: "How does vinyl fencing compare to wood fencing?", answer: "Vinyl fencing costs more upfront than wood ($40–$70 vs $30–$60 per linear foot) but requires virtually no maintenance — no staining, painting, or sealing ever needed. Vinyl won't rot, splinter, or absorb moisture, giving it a lifespan of 25–40 years vs 10–30 years for wood. Over time, vinyl often proves the more economical choice." },
  { question: "Does vinyl fencing hold up in Ontario winters?", answer: "Yes, our EverGuard® vinyl systems are engineered for cold climates. The material is UV-stabilized and does not become brittle in winter conditions. We also install posts with deep concrete footings to prevent frost heave, ensuring your fence stays plumb and stable through Ontario's freeze-thaw cycles." },
  { question: "Can I get a gate with my vinyl fence?", answer: "Absolutely. We offer vinyl gate options to match your fence, including single swing gates and double driveway gates. All gates are built with heavy-duty hardware and self-closing hinges." },
  { question: "Do vinyl fences require a building permit in London?", answer: "Fences over 2 metres (about 6.5 feet) generally require a permit in London and surrounding municipalities. Pool enclosures require permits regardless of height. We can advise on the specific requirements for your property." },
];

const benefits = [
  { title: "Low Maintenance", body: "Easy upkeep with minimal cleaning requirements." },
  { title: "Durability", body: "Withstands harsh weather conditions season after season." },
  { title: "Aesthetics", body: "Various styles, colors, and textures available to match your home." },
  { title: "Privacy", body: "Solid panels for a completely secluded outdoor space." },
  { title: "Safety", body: "Smooth surfaces without splinters — perfect for families with children." },
  { title: "Environmentally Friendly", body: "Made from non-toxic materials and is recyclable." },
];

const styles = [
  "Privacy Vinyl Fence",
  "Privacy with Lattice Vinyl Fence",
  "Picket Vinyl Fence",
  "Corral Rail / Ranch Rail Vinyl Fence",
  "Residential White Vinyl Fence",
  "3 Rail White Vinyl Corral Fence",
  "Driveway White Vinyl Gate",
];

export default function VinylFencePage() {
  const service = serviceSchema("Vinyl Fence Installation", "Professional vinyl fence installation in London, St Thomas, and Woodstock using EverGuard® systems.", "/vinyl-fence-installation");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: "Vinyl Fence Installation", url: `${site.url}/vinyl-fence-installation` },
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
                <span>Vinyl Fence Installation</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Vinyl Fence Installation</h1>
              <p className="text-gray-200">Stylish, low-maintenance vinyl fencing for homes and businesses in London, St Thomas, and Woodstock.</p>
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
              <h2 className="text-3xl font-extrabold mb-4">Transform Your Property with Elegant Vinyl Fencing</h2>
              <p className="text-[var(--muted)] mb-4 leading-relaxed">
                London Fence Installer is the leading vinyl fence contractor in the London area. Our stylish and highly functional vinyl fence panels and gates are a perfect enhancement to any home or business. As a trusted fence company, we pride ourselves on helping you delineate your property lines with a gorgeous fencing solution.
              </p>
              <p className="text-[var(--muted)] mb-6 leading-relaxed">
                Our team of fence experts has years of experience working with homes and businesses throughout London. We&apos;re well-versed in a variety of fence styles and will assist you in crafting an aesthetically pleasing fence solution for your property.
              </p>
              <div className="bg-[var(--surface)] rounded-xl p-5">
                <h3 className="font-bold text-[var(--green)] mb-3">Available Vinyl Styles</h3>
                <ul className="space-y-2">
                  {styles.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                      <span className="text-[var(--green)]">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <Image
                src="/images/vinyl-fence-2.jpg"
                alt="Vinyl fence installation in London, Ontario by London Fence Installer"
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
          <h2 className="text-3xl font-extrabold text-center mb-4">Discover the Excellence of EverGuard® Vinyl Fence Systems</h2>
          <p className="text-center text-[var(--muted)] max-w-2xl mx-auto mb-8">
            Our high-performance EverGuard® vinyl fence systems are recognized for their long-lasting durability and beautiful design — the perfect blend of elegance, strength, and performance.
          </p>

          <h2 className="text-2xl font-extrabold text-center mb-6">Benefits of Vinyl Fencing</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-2">{b.title}</h3>
                <p className="text-sm text-[var(--muted)]">{b.body}</p>
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
          <h2 className="text-2xl font-extrabold mb-4">Vinyl Fence Installation Near You</h2>
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
