import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import gallery from "@/content/gallery.json";
import testimonials from "@/content/testimonials.json";
import faq from "@/content/faq.json";
import serviceAreas from "@/content/service-areas.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Professional Govee Permanent Outdoor Lighting Ontario",
  description:
    "We install Govee permanent outdoor LED lighting across Southwestern Ontario. App-controlled, weatherproof, 5-year warranty. Starts at $28/linear foot. Free quotes.",
  openGraph: {
    title: "Professional Govee Permanent Outdoor Lighting Ontario",
    description:
      "We install Govee permanent outdoor LED lighting across Southwestern Ontario. App-controlled, weatherproof, 5-year warranty.",
    images: [{ url: "/images/Forever-Lights-Header.jpg" }],
    url: "https://weinstallgoveelights.ca",
  },
  twitter: {
    title: "Professional Govee Permanent Outdoor Lighting Ontario",
    description:
      "We install Govee permanent outdoor LED lighting across Southwestern Ontario. App-controlled, weatherproof, 5-year warranty.",
  },
};

const features = [
  {
    icon: "📱",
    title: "App Controlled",
    desc: "Change colours, set schedules, sync to music — all from the Govee app on your phone, anywhere in the world.",
  },
  {
    icon: "☁️",
    title: "All-Weather Durable",
    desc: "CSA-approved, weatherproof hardware built for Canadian winters, summers, and everything in between.",
  },
  {
    icon: "💡",
    title: "50,000+ Hour Lifespan",
    desc: "LED technology rated for over 20 years of use, so your investment pays for itself many times over.",
  },
  {
    icon: "🎨",
    title: "Millions of Colours",
    desc: "Preset holiday scenes or fully custom patterns — the same hardware works for Christmas, Canada Day, and every day.",
  },
  {
    icon: "🔒",
    title: "5-Year Warranty",
    desc: "Industry-leading 5-year parts warranty and 1-year labor warranty. We stand behind every installation.",
  },
  {
    icon: "🏠",
    title: "Clean, Custom Fit",
    desc: "Matched to your soffit and fascia colour for a seamless daytime look — only notice them when they're on.",
  },
];

const steps = [
  {
    num: "01",
    title: "Request a Free Quote",
    desc: "Fill out our form with your address and property details. We'll review and send you a detailed estimate within one business day.",
  },
  {
    num: "02",
    title: "Site Assessment",
    desc: "We measure your roofline and assess your soffit/fascia materials to ensure a perfect, custom-matched installation.",
  },
  {
    num: "03",
    title: "Professional Installation",
    desc: "Our trained team installs your Govee system in a single day, leaving your property clean and your lights perfectly tested.",
  },
  {
    num: "04",
    title: "Enjoy Forever",
    desc: "Open the Govee app and explore millions of colours and patterns — for every holiday, season, and mood. No more taking them down.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "We Install Govee Lights",
  description:
    "Professional Govee permanent outdoor LED light installation across Southwestern Ontario.",
  url: "https://weinstallgoveelights.ca",
  email: "info@weinstallgoveelights.ca",
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: {
    "@type": "State",
    name: "Ontario",
  },
  openingHours: "Mo-Fr 08:00-17:00",
  priceRange: "$$",
};

export default function HomePage() {
  const previewGallery = gallery.slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/Forever-Lights-Header.jpg"
          alt="Govee permanent LED lights illuminating a home at night in vibrant purple and blue - We Install Govee Lights Ontario"
          fill
          priority
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07071A]/80 via-[#07071A]/60 to-[#07071A]" />

        <div className="relative z-10 container mx-auto px-4 text-center pt-24">
          <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 rounded-full px-4 py-2 text-[#A78BFA] text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            Serving Southwestern Ontario
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 max-w-5xl mx-auto">
            Permanent Smart Lighting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
              Installed Once. Enjoyed Forever.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Professional Govee permanent outdoor LED installation across Ontario.
            Millions of colours, app-controlled, weatherproof — starting at{" "}
            <strong className="text-white">$28/linear foot</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-purple-900/40"
            >
              Get a Free Quote →
            </Link>
            <Link
              href="/gallery"
              className="px-8 py-4 rounded-xl border border-white/20 hover:border-white/50 text-white font-semibold text-lg transition-all hover:bg-white/5"
            >
              View Gallery
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><span className="text-[#8B5CF6]">✓</span> 5-Year Parts Warranty</span>
            <span className="flex items-center gap-1.5"><span className="text-[#8B5CF6]">✓</span> Fully Insured</span>
            <span className="flex items-center gap-1.5"><span className="text-[#8B5CF6]">✓</span> Free Quotes</span>
            <span className="flex items-center gap-1.5"><span className="text-[#8B5CF6]">✓</span> Financing Available</span>
          </div>
        </div>

        {/* Scroll arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ─── DAY/NIGHT SPLIT ─── */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hidden by Day. Stunning by Night.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Govee permanent lights mount flush to your soffit, completely invisible during the day.
            Come sundown, they transform your home.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
            <Image
              src="/images/Day-scaled.webp"
              alt="Govee permanent outdoor lights during daytime - clean and discreet soffit installation - London Ontario"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <span className="text-white font-semibold text-lg">☀️ Daytime — Completely Hidden</span>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
            <Image
              src="/images/Night-scaled.webp"
              alt="Govee permanent LED lights illuminating home exterior at night in vibrant colours - Southwestern Ontario"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <span className="text-white font-semibold text-lg">🌙 Nighttime — Absolutely Stunning</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="bg-[#0E0E24] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Govee Permanent Lighting?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              One install. Zero annual hassle. Infinite possibilities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-[#141430] border border-[#1E1E42] rounded-2xl p-6 hover:border-[#8B5CF6]/50 transition-colors group"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#A78BFA] transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY PREVIEW ─── */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See the Results
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Real installations by our team across Southwestern Ontario.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {previewGallery.map((img) => (
            <div key={img.src} className="relative aspect-square rounded-xl overflow-hidden group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                <span className="text-white text-xs font-medium p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#8B5CF6]/50 hover:border-[#8B5CF6] text-[#A78BFA] hover:text-white font-semibold transition-all"
          >
            View Full Gallery →
          </Link>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-[#0E0E24] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400">From quote to glowing in as little as one day.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <div key={s.num} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#8B5CF6]/50 to-transparent z-10" />
                )}
                <div className="bg-[#141430] border border-[#1E1E42] rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-[#8B5CF6] mb-3">{s.num}</div>
                  <h3 className="text-white font-bold mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IMAGE SHOWCASE ─── */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden aspect-[3/2]">
            <Image
              src="/images/Side-of-home-govee-lights-scaled.jpg"
              alt="Govee permanent outdoor lighting installed along the full perimeter of a home - professional installation Ontario"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Professional Results,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
                Every Time
              </span>
            </h2>
            <ul className="space-y-4 mb-8">
              {[
                "Certified Govee Elite & Pro installers",
                "Soffit/fascia colour-matched hardware",
                "Clean cable management — no visible wiring",
                "Alexa, Google, and smart home integration",
                "Programming included — we set up your first scenes",
                "Financing available over 6 months",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300">
                  <span className="mt-0.5 text-[#8B5CF6] font-bold shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-block px-7 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold transition-all hover:scale-105"
            >
              Get a Free Quote →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-[#0E0E24] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#141430] border border-[#1E1E42] rounded-2xl p-6">
                <div className="flex text-yellow-400 mb-3 text-sm">
                  {"★".repeat(t.rating)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREAS ─── */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            We Serve All of Southwestern Ontario
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From Windsor to Oshawa — and every city in between.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {serviceAreas.flatMap((r) => r.cities.slice(0, 2)).slice(0, 20).map((city) => (
            <div
              key={city}
              className="bg-[#141430] border border-[#1E1E42] rounded-xl px-4 py-3 text-center text-sm text-gray-300 hover:border-[#8B5CF6]/50 hover:text-white transition-colors"
            >
              {city}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 text-[#A78BFA] hover:text-white font-medium transition-colors"
          >
            View all service areas →
          </Link>
        </div>
      </section>

      {/* ─── FAQ PREVIEW ─── */}
      <section className="bg-[#0E0E24] py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faq.slice(0, 5).map((item) => (
              <div key={item.question} className="bg-[#141430] border border-[#1E1E42] rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2">{item.question}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-[#A78BFA] hover:text-white font-medium transition-colors"
            >
              View all {faq.length} FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="relative overflow-hidden py-24">
        <Image
          src="/images/Govee-Lighting-3.jpg"
          alt="Govee LED outdoor lighting installed on home - vibrant colours at night"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07071A]/95 via-[#07071A]/80 to-[#07071A]/60" />
        <div className="relative z-10 container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Ready to Transform Your Home?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Get a free, no-obligation quote today. We respond within one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-lg transition-all hover:scale-105"
            >
              Get a Free Quote →
            </Link>
            <a
              href="mailto:info@weinstallgoveelights.ca"
              className="px-8 py-4 rounded-xl border border-white/30 hover:border-white/60 text-white font-semibold text-lg transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
