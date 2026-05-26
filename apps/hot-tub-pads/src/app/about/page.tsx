import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import NavBar from "@/components/NavBar";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import QuoteFab from "@/components/QuoteFab";
import { site } from "@/lib/site";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "About", item: `${site.url}/about` },
  ],
};

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "About Hot Tub Pads | Ontario Concrete Pad Installers" },
  description:
    "Ontario's trusted hot tub pad installation experts. We deliver durable, level concrete foundations for hot tubs and swim spas with quality materials and precision craftsmanship.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Hot Tub Pads Installation Experts in Ontario",
    description:
      "Ontario's trusted hot tub pad installation experts. Quality materials, precision craftsmanship, and a 2-year warranty on every pad.",
    url: `${site.url}/about`,
    images: [
      {
        url: "/images/hot-tub-pad-sq.png",
        width: 1024,
        height: 1024,
        alt: "Hot tub pad installation by Hot Tub Pads in Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Hot Tub Pads Installation Experts in Ontario",
    description:
      "Ontario's trusted hot tub pad installation experts. Durable concrete foundations with a 2-year warranty.",
    images: ["/images/hot-tub-pad-sq.png"],
  },
};

/* ─── Page Component ─── */

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <NavBar />

      {/* ═══════════════ Page Hero ═══════════════ */}
      <section className="bg-navy pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h1 className="mb-4 font-display text-4xl font-bold text-white md:text-5xl">
            About Hot Tub Pads
          </h1>
          <p className="text-lg text-white/70">Quality and Expertise</p>
        </div>
      </section>

      {/* ═══════════════ About Content ═══════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text Column */}
            <div>
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-orange">
                Who We Are
              </span>
              <h2 className="mb-6 font-display text-3xl font-bold text-navy md:text-4xl">
                Ontario&apos;s Trusted Hot Tub Pad Installers
              </h2>
              <p className="mb-5 text-lg leading-relaxed text-slate-muted">
                At Hot Tub Pads, we deliver durable, level concrete pads
                specifically designed for hot tubs and swim spas. Our team
                focuses on quality and precision in every pour, ensuring your spa
                has the stable foundation it needs to perform safely for years.
              </p>
              <p className="mb-5 text-lg leading-relaxed text-slate-muted">
                We&apos;ve transformed countless outdoor spaces across Ontario,
                helping homeowners get the most out of their backyard
                investments. From initial site assessment to the final broom
                finish, we handle every detail with care and craftsmanship.
              </p>
              <p className="text-lg leading-relaxed text-slate-muted">
                Whether you need a reinforced concrete pad for a heavy swim spa
                or a budget-friendly gravel base for a standard hot tub, our
                experienced crew has the skills and equipment to get the job done
                right &mdash; typically in just two days.
              </p>
            </div>

            {/* Image Column */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/hot-tub-pad-sq.png"
                alt="Completed concrete hot tub pad installation by Hot Tub Pads in Ontario"
                width={1024}
                height={1024}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ Testimonial ═══════════════ */}
      <section className="bg-light-bg py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-orange">
            What Our Clients Say
          </span>
          <blockquote className="relative mx-auto max-w-2xl border-l-4 border-orange py-4 pl-8 text-left">
            <p className="mb-6 text-xl leading-relaxed text-navy italic md:text-2xl">
              &ldquo;Kyle and his team did a great job. It was hard to find
              someone to do a pad for us, but these guys came through. Highly
              recommend.&rdquo;
            </p>
            <footer className="text-base font-semibold text-slate-muted">
              &mdash; Rob Enzo
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ═══════════════ Stats / Features ═══════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-navy md:text-4xl">
              Why Homeowners Trust Us
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-muted">
              We stand behind every pad we pour with quality materials, expert
              craftsmanship, and fast turnaround.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* 2 Year Warranty */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-pale">
                <svg
                  className="h-8 w-8 text-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-display text-xl font-bold text-navy">
                2 Year Warranty
              </h3>
              <p className="mb-1 text-sm font-semibold text-orange">
                Built to Last
              </p>
              <p className="text-slate-muted">
                Our pads are built to handle Canadian weather &mdash;
                freeze-thaw cycles, heavy rain, and summer heat. Crack-resistant,
                durable, and backed by our warranty.
              </p>
            </div>

            {/* 32 MPA Concrete */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-pale">
                <svg
                  className="h-8 w-8 text-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17l-5.58-3.4a1.006 1.006 0 010-1.72l5.58-3.4a1 1 0 011.16 0l5.58 3.4a1.006 1.006 0 010 1.72l-5.58 3.4a1 1 0 01-1.16 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.84 11.77L11.42 15.17a1 1 0 001.16 0l5.58-3.4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.84 15.77l5.58 3.4a1 1 0 001.16 0l5.58-3.4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-display text-xl font-bold text-navy">
                32 MPA Concrete
              </h3>
              <p className="mb-1 text-sm font-semibold text-orange">
                Quality Materials
              </p>
              <p className="text-slate-muted">
                We pour with high-grade 32 MPA concrete reinforced with rebar and
                wire mesh. This is the same strength used in commercial
                construction &mdash; built to support your spa for decades.
              </p>
            </div>

            {/* 2 Day Completion */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-pale">
                <svg
                  className="h-8 w-8 text-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-display text-xl font-bold text-navy">
                2 Day Completion
              </h3>
              <p className="mb-1 text-sm font-semibold text-orange">
                Fast &amp; Reliable
              </p>
              <p className="text-slate-muted">
                We complete most hot tub pad installations in just two days.
                From excavation and gravel base to the final pour, we move
                quickly without cutting corners.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
      <Footer />
      <QuoteFab />
    </>
  );
}
