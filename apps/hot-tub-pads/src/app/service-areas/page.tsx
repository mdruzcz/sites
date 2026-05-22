import type { Metadata } from "next";
import Link from "next/link";

import NavBar from "@/components/NavBar";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import QuoteFab from "@/components/QuoteFab";
import { site, cities } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hot Tub Pad Installation Service Areas | Ontario-Wide",
  description:
    "Professional hot tub pad installation serving Hamilton, London, Kitchener, Woodstock, Sarnia, and St. Thomas. Durable concrete and gravel pads across Ontario.",
  openGraph: {
    title: "Hot Tub Pad Installation Service Areas | Ontario-Wide",
    description:
      "Expert hot tub pad installation across Ontario. Serving Hamilton, London, Kitchener, Woodstock, Sarnia, and St. Thomas.",
    url: `${site.url}/service-areas`,
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1024,
        height: 683,
        alt: "Hot Tub Pads service areas across Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hot Tub Pad Installation Service Areas | Ontario-Wide",
    description:
      "Expert hot tub pad installation across Ontario. Serving Hamilton, London, Kitchener, Woodstock, Sarnia, and St. Thomas.",
    images: ["/images/hero-bg.jpg"],
  },
};

/* ─── Page Component ─── */

export default function ServiceAreasPage() {
  return (
    <>
      <NavBar />

      {/* ═══════════════ Page Hero ═══════════════ */}
      <section className="bg-navy pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h1 className="mb-4 font-display text-4xl font-bold text-white md:text-5xl">
            Service Areas
          </h1>
          <p className="text-lg text-white/70">
            Expert installation of long-lasting concrete pads for your spa.
          </p>
        </div>
      </section>

      {/* ═══════════════ City Grid ═══════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <div
                key={city.slug}
                className="group rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <h2 className="mb-3 font-display text-xl font-bold text-navy">
                  {city.name}
                </h2>
                <p className="mb-4 text-slate-muted">
                  {city.description.length > 150
                    ? `${city.description.slice(0, 150)}...`
                    : city.description}
                </p>
                <p className="mb-5 text-sm text-slate-muted">
                  <span className="font-semibold text-navy">
                    Neighbourhoods served:
                  </span>{" "}
                  {city.neighbourhoods.join(", ")}
                </p>
                <Link
                  href={`/${city.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-orange transition-colors hover:text-orange-dark"
                >
                  View Details
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <Footer />
      <QuoteFab />
    </>
  );
}
