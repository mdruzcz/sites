import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustBar } from "@/components/TrustBar";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Fence Installation London, ON | London Fence Installer" },
  description: "London's top fence contractor for wood, vinyl, chainlink & metal fences. Serving London, St. Thomas & Woodstock. Free quote within 48 hours. Call 519.914.1909.",
  alternates: { canonical: "https://londonfenceinstaller.ca" },
  openGraph: {
    title: "Fence Installation London, ON | London Fence Installer",
    description: "London's top fence contractor for wood, vinyl, chainlink & metal fences. Serving London, St. Thomas & Woodstock. Free quote within 48 hours.",
    url: site.url,
    images: [{ url: "/images/hero-fence.jpg", width: 1200, height: 630, alt: "Professional fence installation in London, Ontario" }],
  },
};

const fenceTypes = [
  {
    title: "Wooden Fences",
    href: "/wood-fencing-contractor",
    body: "Pressure Treated and Cedar fences are by far the most common fences in Ontario. We install wood fences at least 42\" below grade to avoid frost heave and add 30KG of quick setting concrete per post.",
    icon: "🌲",
  },
  {
    title: "Chainlink Fences",
    href: "/chainlink-fencing",
    body: "Chainlink fence installation is quicker than wood fences. The materials also cost less than a traditional wood fence, making chainlink the perfect fence on a budget.",
    icon: "🔗",
  },
  {
    title: "Vinyl Fences",
    href: "/vinyl-fence-installation",
    body: "Vinyl fences mimic the appearance of wood without any rot, repainting, or restaining required. More colours and patterns to choose from than ever before.",
    icon: "🏡",
  },
  {
    title: "Metal Fences",
    href: "/metal-fence-installation",
    body: "Ornamental metal fences add a touch of grandeur. Most metal fences are powder coated and come in black. Several designs available — the best choice for a pool fence.",
    icon: "⚙️",
  },
  {
    title: "Fence Repair",
    href: "/fence-repair",
    body: "Fences endure the elements and may require repairs over time. Our team excels in assessing each situation to provide the most feasible option for economical repairs.",
    icon: "🔧",
  },
  {
    title: "Gate Installation",
    href: "/guardrail-installation",
    body: "Enhance your property with a complementary gate. Our team installs custom gates with unique designs — from automatic to motorized gates, we offer seamless installation.",
    icon: "🚪",
  },
];

const reasons = [
  { title: "Enhanced Privacy", body: "Our selection of wooden and vinyl fences not only demarcates your space but also provides a sanctuary for you and your loved ones, ensuring peace of mind." },
  { title: "Unparalleled Security", body: "Our fences stand as formidable barriers against trespassers. Our high-rise fences are tailored to meet the unique security needs of your property." },
  { title: "Property Value Appreciation", body: "A fenced property commands a higher resale value. Investing in a well-designed and robust fence enhances your market value — a wise investment." },
];

const testimonial = {
  quote: "From quote to cleanup, Kyle and his team were quick, organized, and focused on my backyard fence. 5/5",
  name: "Jose Hernandez",
  city: "London, ON",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <Image
          src="/images/hero-fence.jpg"
          alt="Beautiful wood privacy fence installed in London, Ontario backyard"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                Fence Installation in London, Ontario
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-white/90 mb-8">
                We Can Help With Wood, Chainlink, Vinyl, Dog Fences, Pool Fences, and more!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact-us" className="btn btn-primary text-base font-bold">
                  Get a Free Quote
                </Link>
                <a href={site.phoneHref} className="btn btn-white text-base font-bold">
                  Call {site.phone}
                </a>
              </div>
            </div>

            {/* Right: inline form card */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
              <QuoteForm title="Get Your FREE Quote Today!" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <TrustBar />

      {/* We Build More Than Fences */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/images/vinyl-fence-2.jpg"
                alt="Professional fence installation in London, Ontario by London Fence Installer"
                width={600}
                height={450}
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-4">
                We Build More Than Fences
              </h2>
              <h3 className="text-xl font-bold text-[var(--green)] mb-4">
                We Help Create Safe and Private Spaces
              </h3>
              <p className="text-[var(--muted)] mb-6 leading-relaxed">
                Many homeowners struggle with finding reliable fencing contractors that combine quality, experience, and high quality materials. We can help by offering a range of fence options that will suit your landscape. We use our experience and high quality materials to build you a fence that will last.
              </p>
              <Link href="/contact-us" className="btn btn-primary">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Transform Your Space */}
      <section className="section bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Transform Your Space Today With Our Fencing Solutions
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              For both residential or commercial spaces, we have many fencing options to choose from. Whether you need a new fence installed or an old fence repaired, we&apos;ll be your go-to company for all fencing.
            </p>
          </div>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "⏱", title: "Quick Quotes", body: "We aim to send out all quotes within 48 hours" },
              { icon: "🛡", title: "Unbeatable Warranty", body: "We stand by a five-year limited warranty" },
              { icon: "🏆", title: "20 Years of Experience", body: "Our team has 20 years of combined fencing experience" },
            ].map((p) => (
              <div key={p.title} className="card p-6 text-center">
                <div className="text-4xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-lg text-[var(--green)] mb-2">{p.title}</h3>
                <p className="text-sm text-[var(--muted)]">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <blockquote className="bg-[var(--green)] text-white rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <p className="text-lg font-bold italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
            <footer>
              <p className="font-extrabold">{testimonial.name}</p>
              <p className="text-sm text-gray-300">{testimonial.city}</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Fence Types */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">We Install Many Types of Fences</h2>
            <p className="text-[var(--muted)]">
              Learn more about all the <Link href="/services" className="text-[var(--green)] font-semibold hover:underline">services</Link> we can help you with.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fenceTypes.map((f) => (
              <Link key={f.href} href={f.href} className="card p-6 hover:shadow-md transition-shadow group">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-lg text-[var(--green)] mb-2 group-hover:text-[var(--green-light)] transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{f.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Section */}
      <section className="section bg-[var(--green-dark)] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                We Also Provide Commercial Fence Installation Services
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                We have a history of installing commercial fences and gates for various clients, including business owners, city planners, construction managers, developers, and more. Whether it&apos;s security, privacy, or ornamental fencing, our team collaborates with you to determine the best design based on your budget and project requirements.
              </p>
              <Link href="/contact-us" className="btn btn-primary">
                Get a Commercial Quote
              </Link>
            </div>
            <div>
              <Image
                src="/images/chainlink-fence.jpg"
                alt="Commercial fence installation by London Fence Installer"
                width={600}
                height={400}
                className="rounded-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-3">We Are Near You</h2>
          <p className="text-[var(--muted)] mb-8">Areas We Serve</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "London, ON", href: null },
              { label: "St. Thomas", href: "/st-thomas-wood-fence" },
              { label: "Woodstock", href: "/woodstock-fence-builder" },
              { label: "Aylmer", href: "/wood-fence-alymer" },
              { label: "Strathroy", href: "/strathroy-fence-builder" },
              { label: "Tilsonburg", href: "/tilsonburg-fence-builder" },
              { label: "St. Marys", href: "/st-marys-fence-builder" },
              { label: "Ingersoll", href: "/ingersoll-wood-fence-builder" },
              { label: "Dorchester", href: null },
              { label: "Thamesford", href: null },
            ].map((area) =>
              area.href ? (
                <Link key={area.label} href={area.href} className="px-4 py-2 bg-white border border-[var(--border)] rounded-full text-sm font-semibold hover:bg-[var(--green)] hover:text-white hover:border-[var(--green)] transition-colors">
                  {area.label}
                </Link>
              ) : (
                <span key={area.label} className="px-4 py-2 bg-white border border-[var(--border)] rounded-full text-sm font-semibold">
                  {area.label}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Why Build a Fence */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10">Why Build A Fence?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reasons.map((r, i) => (
              <div key={r.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--green)] text-white flex items-center justify-center text-xl font-extrabold mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg text-[var(--green)] mb-3">{r.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[var(--muted)] mt-8 max-w-2xl mx-auto text-sm">
            Trust us for professional fence installation services tailored to meet the specific needs of your commercial or industrial property in London, St Thomas, and Woodstock areas.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
