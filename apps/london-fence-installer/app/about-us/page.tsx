import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us",
  description: "Locally owned fence contractors with 20 years of experience in London, ON. Wood, vinyl, metal & more. Fast quotes within 48 hrs, 5-year warranty. Fully insured.",
  alternates: { canonical: "https://londonfenceinstaller.ca/about-us" },
  openGraph: {
    title: "About Us | London Fence Installer",
    description: "Local, trusted fence contractors with 20 years experience serving London, ON and surrounding areas.",
    url: `${site.url}/about-us`,
    images: [{ url: "/images/hero-fence.jpg", width: 1200, height: 630, alt: "London Fence Installer – trusted local fence contractors" }],
  },
};

const highlights = [
  {
    title: "Locally Owned and Operated",
    body: "Being a locally owned and operated business, we understand the unique needs and preferences of our community. We take the time to connect with our clients, ensuring that every fencing project reflects the local aesthetics while meeting the highest standards of quality and craftsmanship.",
  },
  {
    title: "Expertise You Can Trust",
    body: "With over 20 years of hands-on experience, our team at London Fence Installer brings unparalleled expertise to every project. We have successfully transformed countless properties, offering not just functional fencing but also enhancing the overall appeal of homes and businesses.",
  },
  {
    title: "Service Areas",
    body: "London Fence Installer proudly serves London, St Thomas, Woodstock, and the surrounding areas. We are dedicated to contributing to the visual landscape of our community, one fence at a time.",
  },
  {
    title: "Our Commitment",
    body: "At London Fence Installer, we are committed to delivering fencing solutions that stand the test of time. From the initial consultation to the final installation, our attention to detail and customer-centric approach set us apart.",
  },
];

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "About Us", url: `${site.url}/about-us` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="bg-green py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="text-sm text-gray-300 mb-4">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2">›</span>
                <span>About Us</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About Us</h1>
              <p className="text-lg text-gray-200 leading-relaxed mb-4">
                We&apos;re a local fence contractor helping customers in London, St Thomas, Woodstock, and the surrounding areas.
              </p>
              <p className="text-gray-300 leading-relaxed">
                As a locally owned and operated company, we take great pride in serving our community with over 20 years of dedicated experience in the fencing industry.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get Quote" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/images/logo.png"
                alt="London Fence Installer – trusted local fence contractors"
                width={300}
                height={300}
                className="mx-auto lg:mx-0"
              />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[var(--foreground)] mb-4">Our Story</h2>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                Founded with a commitment to excellence, London Fence Installer has been a reliable choice for both residential and commercial clients seeking top-tier fence solutions. Our journey began over two decades ago, driven by the vision of creating beautiful and durable fencing that adds value to properties across London and its neighboring regions.
              </p>
              <Link href="/contact-us" className="btn btn-primary">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* More About Us */}
      <section className="section bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-10">More About Us!</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((h) => (
              <div key={h.title} className="card p-6">
                <h3 className="font-bold text-lg text-[var(--green)] mb-3">{h.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-8">Why Choose London Fence Installer?</h2>
          <ul className="space-y-4">
            {[
              { label: "Local Expertise", detail: "We understand the unique needs of the London community." },
              { label: "Quality Craftsmanship", detail: "Over two decades of experience delivering top-notch fencing solutions." },
              { label: "Customer-Centric Approach", detail: "Your satisfaction is our priority, and we work closely with you throughout the process." },
              { label: "Service Excellence", detail: "From the first call to project completion, expect professionalism and reliability." },
            ].map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[var(--green)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <span className="font-bold text-[var(--foreground)]">{item.label}:</span>{" "}
                  <span className="text-[var(--muted)]">{item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[var(--muted)] text-center">
            Whether you&apos;re looking to enhance the privacy of your residence or add a touch of elegance to your commercial property, London Fence Installer is here to bring your fencing dreams to life. <Link href="/contact-us" className="text-[var(--green)] font-semibold hover:underline">Contact us today.</Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
