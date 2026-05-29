import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import serviceAreas from "@/content/service-areas.json";
import faq from "@/content/faq.json";

export const revalidate = 3600;

const cityImages: Record<string, string> = {
  "london-ontario": "/images/Night-scaled.webp",
  "woodstock-oxford-county": "/images/Forever-Lights-Header.jpg",
  "kitchener-waterloo": "/images/Forever-Lights-Example.jpg",
  "hamilton-niagara": "/images/Forever-LIghts-Example-3.jpg",
  "windsor-essex": "/images/Forever-LIghts-Example-5.jpg",
  "stratford-ontario": "/images/Forever-Lights-Example-2.jpg",
};

export async function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = serviceAreas.find((a) => a.slug === city);
  if (!area) return {};
  const mainCity = area.cities[0];

  return {
    title: `Govee Permanent Lighting in ${mainCity} | ${area.region}`,
    description: `Professional Govee permanent outdoor LED lighting installation in ${mainCity} and surrounding ${area.region}. App-controlled, weatherproof, 5-year warranty. Free quotes.`,
    openGraph: {
      title: `Govee Permanent Lighting in ${mainCity} | ${area.region}`,
      description: `Professional Govee permanent outdoor LED installation in ${mainCity}, ${area.region}. Free quotes.`,
      images: [{ url: cityImages[city] ?? "/images/Forever-Lights-Header.jpg" }],
      url: `https://weinstallgoveelights.ca/services/permanent-govee-lighting/${city}`,
    },
    twitter: {
      title: `Govee Permanent Lighting in ${mainCity} | ${area.region}`,
      description: `Professional Govee outdoor lighting in ${mainCity}. Free quotes. 5-year warranty.`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const area = serviceAreas.find((a) => a.slug === city);
  if (!area) notFound();

  const mainCity = area.cities[0];
  const heroImg = cityImages[city] ?? "/images/Forever-Lights-Header.jpg";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Govee Permanent Outdoor Lighting Installation in ${mainCity}`,
    description: `Professional Govee permanent outdoor LED light installation serving ${mainCity} and ${area.region}.`,
    provider: {
      "@type": "LocalBusiness",
      name: "We Install Govee Lights",
      url: "https://weinstallgoveelights.ca",
    },
    areaServed: area.cities.map((c) => ({
      "@type": "City",
      name: c,
      containedInPlace: { "@type": "AdministrativeArea", name: area.region },
    })),
  };

  const localFaq = faq.slice(0, 5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <Image
          src={heroImg}
          alt={`Govee permanent outdoor lighting installation in ${mainCity}, ${area.region} - We Install Govee Lights`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07071A]/80 via-[#07071A]/60 to-[#07071A]" />
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 rounded-full px-4 py-2 text-[#A78BFA] text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            {area.region}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            Govee Permanent Lighting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
              in {mainCity}
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
            Professional Govee permanent outdoor LED lighting installation serving{" "}
            {mainCity} and the surrounding {area.region}. App-controlled, weatherproof,
            starting at <strong className="text-white">$28/linear foot</strong>.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-purple-900/40"
          >
            Get a Free Quote in {mainCity} →
          </Link>
        </div>
      </section>

      {/* Cities served */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-6">
          Cities We Serve in {area.region}
        </h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {area.cities.map((c) => (
            <span
              key={c}
              className="bg-[#141430] border border-[#1E1E42] rounded-full px-4 py-2 text-sm text-gray-300 hover:border-[#8B5CF6]/50 hover:text-white transition-colors"
            >
              {c}
            </span>
          ))}
        </div>
        <p className="text-gray-400 text-sm">
          Not listed? Contact us — we likely cover your area too.
        </p>
      </section>

      {/* Content */}
      <section className="bg-[#0E0E24] py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                {mainCity}'s Govee Lighting Experts
              </h2>
              <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                <p>
                  We Install Govee Lights has been transforming homes and businesses across{" "}
                  {area.region} with professional permanent outdoor LED lighting systems. Our
                  trained installers understand {mainCity}'s architecture, climate, and soffit
                  styles — ensuring every install looks perfect and performs flawlessly.
                </p>
                <p>
                  Unlike DIY installations, we handle everything: precise measurements,
                  hardware colour matching to your fascia, low-voltage wiring, app configuration,
                  and post-install testing. You get a clean, seamless result backed by our
                  5-year parts warranty and 1-year labor warranty.
                </p>
                <p>
                  From Christmas and Canada Day to year-round roofline accents, the same
                  Govee system adapts to every occasion with a tap on your phone.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/Side-of-home-govee-lights-scaled.jpg"
                alt={`Govee permanent outdoor lighting installation on a home in ${mainCity}, ${area.region}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Why {mainCity} Homeowners Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: "✓", text: "Certified Govee Elite & Pro installers" },
            { icon: "✓", text: "Colour-matched hardware for clean daytime look" },
            { icon: "✓", text: "Professional cable management — no visible wiring" },
            { icon: "✓", text: "App setup and first scenes included" },
            { icon: "✓", text: "5-year parts + 1-year labor warranty" },
            { icon: "✓", text: "Financing over 6 months available" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 bg-[#141430] border border-[#1E1E42] rounded-xl p-4 text-sm text-gray-300">
              <span className="text-[#8B5CF6] font-bold shrink-0">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0E0E24] py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Common Questions in {mainCity}
          </h2>
          <div className="space-y-4">
            {localFaq.map((item) => (
              <div key={item.question} className="bg-[#141430] border border-[#1E1E42] rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2 text-sm">{item.question}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center max-w-2xl">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Light Up Your {mainCity} Home?
        </h2>
        <p className="text-gray-400 mb-8">
          Free quote. No obligation. We respond within one business day.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-lg transition-all hover:scale-105"
        >
          Get a Free Quote →
        </Link>
      </section>
    </>
  );
}
