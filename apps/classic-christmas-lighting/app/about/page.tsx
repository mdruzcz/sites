import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us | Classic Christmas Lighting — Kitchener-Waterloo Holiday Lighting",
  description:
    "Meet the Classic Christmas Lighting team. Family-owned and operated since 2023 with 15 years of experience. Serving Kitchener-Waterloo, Guelph, Cambridge, Hamilton & Southern Ontario.",
  openGraph: {
    title: "About Classic Christmas Lighting — Family-Owned Holiday Lighting Specialists",
    description: "Family-owned with 15 years of experience. Serving homes and businesses across Kitchener-Waterloo and Southern Ontario.",
    images: [{ url: "/images/Home-About-Sec_2.jpg", alt: "Classic Christmas Lighting team — family-owned holiday lighting specialists" }],
  },
};

const values = [
  {
    title: "Quality Without Compromise",
    desc: "We use only commercial-grade, energy-efficient LED lights — not the bargain store-bought strands. Every display we create is built to last through the toughest Ontario winters.",
  },
  {
    title: "Personal Attention",
    desc: "As a family-owned business, we treat every client like a neighbour. We listen to your vision and work with you to create something you're genuinely proud of.",
  },
  {
    title: "Complete Service",
    desc: "We handle everything — consultation, design, installation, maintenance, and takedown. You never have to lift a finger or climb a ladder.",
  },
  {
    title: "Community Commitment",
    desc: "We're proud to serve our local communities across Kitchener-Waterloo and Southern Ontario, helping make the holiday season brighter for everyone.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "About", url: `${site.url}/about` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-[var(--dark-bg)] overflow-hidden">
        <Image
          src="/images/Classic-Christmas-Lighting.webp"
          alt="Classic Christmas Lighting team — professional Christmas light installation in Kitchener-Waterloo"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/60 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">About Us</span>
          </nav>
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase mb-4 font-medium">Our Story</p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-[1.1] max-w-3xl"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Bringing Holiday Magic to Southern Ontario
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">
            Family-owned and operated since 2023, Classic Christmas Lighting combines 15 years of personal industry experience with a genuine passion for making the holiday season beautiful.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/Home-About-Sec_2.jpg"
                alt="Ben Langstaff, founder of Classic Christmas Lighting, with his team installing holiday lights"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
                About Classic Christmas Lighting
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-6"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Founded on a Love for the Holiday Season
              </h2>
              <div className="space-y-4 text-[var(--muted)] text-sm leading-relaxed">
                <p>
                  Classic Christmas Lighting was founded in 2023 by Ben Langstaff — a Kitchener-Waterloo native with over 15 years of experience in the holiday lighting industry. Ben started the company with a simple goal: to make professional-quality Christmas lighting accessible to homeowners and businesses across Southern Ontario.
                </p>
                <p>
                  Whether it&apos;s a cozy home in Waterloo, a busy storefront in Guelph, or a community park in Stratford, we approach every project with the same level of care and craftsmanship. We love making places look beautiful with lights.
                </p>
                <p>
                  As a family-operated business, we build lasting relationships with our clients. Many of our customers have been with us since we opened, and we look forward to decorating their homes year after year.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-[var(--border)]">
                {[
                  { value: "2023", label: "Founded" },
                  { value: "15+", label: "Years Experience" },
                  { value: "250+", label: "Happy Clients" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p
                      className="text-3xl font-bold text-[var(--accent)]"
                      style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-[var(--muted)] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--dark-bg)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Our Values
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            What Makes Us Different
          </h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="bg-[var(--dark-surface)] rounded-xl p-7 border border-[var(--border-dark)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-full bg-[var(--accent)]/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-sans)" }}>
                    {v.title}
                  </h3>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do for who */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
                Who We Serve
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-8"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Homes, Businesses &amp; Communities
              </h2>
              <div className="space-y-5">
                {[
                  { title: "Homeowners", desc: "We turn your house into a winter fairy tale. Roofline lights, tree wrapping, wreaths, and garlands — customized to your style." },
                  { title: "Shops & Businesses", desc: "Attract holiday foot traffic and create a welcoming, festive atmosphere for your customers with professional commercial lighting." },
                  { title: "Parks & Public Spaces", desc: "We light up community spaces and public areas to help municipalities and BIAs spread holiday joy throughout the neighbourhood." },
                  { title: "Events & Parties", desc: "Add magical ambiance to weddings, corporate events, and private parties with custom event lighting." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="h-2 w-2 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                    <div>
                      <h3 className="font-bold text-[var(--foreground)] mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <Image
                  src="/images/Christmas-LIghting-For-Homes-Kitchener-Waterloo.jpg"
                  alt="Classic Christmas Lighting residential service — beautiful home Christmas lights in Kitchener-Waterloo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-col gap-3 mt-6">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="/images/Christmas-LIght-Installation-For-Businesses-Guelph.jpg"
                    alt="Classic Christmas Lighting commercial service — business Christmas lights in Guelph"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="/images/Christmas-Lighting-Guelph.jpg"
                    alt="Classic Christmas Lighting community holiday lighting in Guelph, Ontario"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--dark-surface)] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Ready to Light Up Your Holidays?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Book a free consultation and we&apos;ll create a custom lighting design for your property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary min-h-[52px] px-10 text-base">
              Get a Free Quote
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost min-h-[52px] px-10 text-base flex items-center gap-2 justify-center">
              <Phone className="h-5 w-5" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
