import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import gallery from "@/content/gallery.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Installation Gallery — Govee Permanent LED Lighting Photos",
  description:
    "Browse real Govee permanent outdoor lighting installations by our team across Southwestern Ontario. See day and night results, colour options, and roofline fits.",
  openGraph: {
    title: "Gallery — Govee Permanent LED Lighting Installations Ontario",
    description:
      "Real Govee permanent outdoor lighting installations across Ontario — day and night photos.",
    images: [{ url: "/images/Night-scaled.webp" }],
    url: "https://weinstallgoveelights.ca/gallery",
  },
  twitter: {
    title: "Gallery — Govee Permanent LED Lighting Installations Ontario",
    description: "Real Govee permanent outdoor lighting installations across Ontario.",
  },
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-transparent to-[#06B6D4]/5 pointer-events-none" />
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
              Installation Gallery
            </span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Every photo below is a real installation by our team across Southwestern Ontario.
            See the difference professional Govee installation makes.
          </p>
        </div>
      </section>

      {/* Full gallery grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((img) => (
            <div key={img.src} className="relative rounded-2xl overflow-hidden group aspect-[4/3]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white font-semibold text-sm">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Large hero image */}
      <section className="container mx-auto px-4 pb-20">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/6]">
          <Image
            src="/images/Night-scaled.webp"
            alt="Full roofline Govee permanent LED lighting illuminating a home exterior at night - vibrant colour display Ontario"
            fill
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07071A]/90 via-[#07071A]/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-8 md:px-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 max-w-lg">
                Want Results Like These?
              </h2>
              <p className="text-gray-300 mb-6 max-w-md">
                Get a free quote and we'll show you exactly how your home would look with permanent Govee lighting.
              </p>
              <Link
                href="/contact"
                className="inline-block px-7 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold transition-all hover:scale-105"
              >
                Get a Free Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0E0E24] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Your Home Could Be Next
          </h2>
          <p className="text-gray-400 mb-8">
            Professional Govee installation from <strong className="text-white">$13/linear foot</strong>. Free quotes. 5-year warranty.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-lg transition-all hover:scale-105"
          >
            Book Your Free Estimate →
          </Link>
        </div>
      </section>
    </>
  );
}
