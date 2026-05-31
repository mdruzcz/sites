import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Fence Staining Services in London, ON",
  description: "Professional fence staining in London, ON. Protect your wood fence from moisture, UV & frost. Cedar & pressure-treated pine. Free quote in 48 hrs.",
  alternates: { canonical: "https://londonfenceinstaller.ca/fence-staining" },
  openGraph: {
    title: "Fence Staining | London Fence Installer",
    description: "Expert fence staining in London, ON. Protect your wood fence from moisture, UV, and weathering.",
    url: `${site.url}/fence-staining`,
    images: [{ url: "/images/fence-staining.jpg", width: 1200, height: 630, alt: "Professional fence staining service in London, Ontario" }],
  },
};

const faqs = [
  { question: "How much does fence staining cost in London, Ontario?", answer: "Professional fence staining in London typically costs $1.50–$3.50 per linear foot, depending on fence height, condition, and whether two coats are needed. A standard 6-foot privacy fence around an average backyard runs approximately $400–$900 for professional staining. Contact us for a free quote tailored to your fence." },
  { question: "How often should I stain my fence?", answer: "Most wood fences in Ontario should be restained every 2–4 years, depending on sun and moisture exposure. South-facing fences that receive full sun may need attention more frequently. Cedar holds stain better than pressure-treated pine, often going 3–4 years between applications." },
  { question: "What type of stain is best for a wood fence in Ontario?", answer: "For Ontario's climate, we recommend a semi-transparent or solid exterior stain with UV inhibitors and water-repellent properties. The stain should be formulated for exterior wood and rated for freeze-thaw conditions. We use premium products from leading manufacturers designed specifically for the Canadian climate." },
  { question: "Can you stain a new pressure-treated pine fence right away?", answer: "Pressure-treated pine needs to dry out before staining — typically 3–6 months after installation. New PT wood is still saturated with preservative and moisture. Staining too early results in poor penetration and early peeling. Cedar can typically be stained sooner, within a few weeks of installation, as it dries faster." },
  { question: "Do I need to clean my fence before staining?", answer: "Yes. Proper cleaning is the most critical step in fence staining. We pressure wash the fence to remove dirt, mildew, and old stain, then allow 48–72 hours of drying time before applying the stain. Skipping this step leads to premature peeling and wasted product." },
];

export default function FenceStainingPage() {
  const service = serviceSchema("Fence Staining", "Professional fence staining services in London, Ontario.", "/fence-staining");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: "Fence Staining", url: `${site.url}/fence-staining` },
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
                <span>Fence Staining</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Fence Staining</h1>
              <p className="text-gray-200">Protect and beautify your wood fence with professional staining services in London, Ontario. We use premium products designed for Ontario&apos;s climate.</p>
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
                Regular staining is one of the most effective ways to protect your wood fence from London&apos;s harsh Ontario climate — freezing winters, wet springs, and hot summers put tremendous stress on bare wood. Our professional staining services apply high-quality exterior stains that enhance the natural grain, repel moisture, block UV rays, and significantly extend the life of your fence.
              </p>
              <p className="text-[var(--muted)] mb-4 leading-relaxed">
                Whether you have a cedar fence that needs refreshing or a pressure-treated pine fence requiring its first coat of protection, our team has the expertise to deliver a beautiful, long-lasting finish. We clean the surface first, allow proper drying time, and apply the product with the right technique for maximum penetration and adhesion.
              </p>
              <p className="text-[var(--muted)] mb-6 leading-relaxed">
                Our fence staining service covers London and surrounding communities including St. Thomas, Woodstock, Strathroy, Aylmer, and beyond. We respond to all quote requests within 48 hours.
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

      {/* Our Process */}
      <section className="section bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-8">Our Fence Staining Process</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: "1", title: "Assessment", body: "We inspect the fence for rot, damage, loose boards, and old stain that needs to be stripped before new product is applied." },
              { step: "2", title: "Cleaning", body: "We pressure wash the fence to remove dirt, mould, mildew, and old stain. This step is non-negotiable for a lasting result." },
              { step: "3", title: "Drying", body: "We allow 48–72 hours of drying time before stain application. Applying stain to damp wood is the most common cause of premature failure." },
              { step: "4", title: "Application", body: "We apply premium stain in thin, even coats using brushes or rollers. We back-brush sprayed areas to ensure the stain penetrates into the wood grain." },
            ].map((item) => (
              <div key={item.step} className="card p-5 text-center">
                <div className="w-10 h-10 rounded-full bg-[var(--green)] text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-8">Benefits of Professional Fence Staining</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Weather Protection", body: "Seals wood fibres against rain, snow, and frost — critical in Ontario's climate with 150+ frost days per year." },
              { title: "UV Protection", body: "Prevents the graying, cracking, and checking caused by London's summer sun exposure." },
              { title: "Enhanced Appearance", body: "Brings out the natural beauty of cedar or pine grain with rich, deep colour that lasts years." },
              { title: "Extended Lifespan", body: "A properly stained fence lasts significantly longer — adding years or even decades to the life of your investment." },
              { title: "Mould Prevention", body: "Creates a moisture barrier that prevents the mould and mildew growth common in Ontario's wet springs." },
              { title: "Increased Value", body: "A clean, well-stained fence improves curb appeal and adds perceived value to your home." },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Schedule */}
      <section className="section bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold mb-4">Fence Staining Maintenance Schedule</h2>
          <p className="text-[var(--muted)] mb-4 leading-relaxed">
            London&apos;s climate is tough on wood fences. Here&apos;s a general maintenance schedule to keep your fence in peak condition:
          </p>
          <div className="space-y-3">
            {[
              { timing: "Year 1 (cedar only)", detail: "Cedar can typically be stained 4–8 weeks after installation once the surface has dried. Pressure-treated pine should wait 3–6 months." },
              { timing: "Every 2–4 years", detail: "Restain the fence when water no longer beads on the surface or when you notice graying and fading. Cedar typically 3–4 years; PT pine 2–3 years." },
              { timing: "Every spring", detail: "Inspect the fence for loose boards, cracked posts, peeling stain, and signs of rot. Catch problems early." },
              { timing: "Every year", detail: "Clean the fence with a mild soap and water solution to remove mould and mildew before it penetrates the wood." },
            ].map((item) => (
              <div key={item.timing} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-[var(--border)]">
                <span className="text-[var(--green)] font-bold text-sm flex-shrink-0 w-32">{item.timing}</span>
                <p className="text-sm text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold mb-4">Fence Staining Cost in London</h2>
          <p className="text-[var(--muted)] mb-4 leading-relaxed">
            Professional fence staining in London typically costs <strong>$1.50–$3.50 per linear foot</strong>, depending on fence height, wood condition, and number of coats required. A standard 6-foot backyard privacy fence runs approximately $400–$900 for professional staining service.
          </p>
          <p className="text-[var(--muted)] text-sm mb-4">
            Fences that require extensive cleaning, stripping, or repairs before staining will be at the higher end of the range. We provide accurate quotes based on your specific fence condition and dimensions.
          </p>
          <Link href="/contact-us" className="btn btn-primary">Get a Free Staining Quote</Link>
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

      {/* Internal Links */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold mb-4">Fence Staining Near You</h2>
          <p className="text-[var(--muted)] mb-5 text-sm">We provide professional fence staining throughout Southwestern Ontario:</p>
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
