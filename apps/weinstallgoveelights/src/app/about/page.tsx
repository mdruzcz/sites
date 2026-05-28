import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us — Professional Govee Lighting Installers in Ontario",
  description:
    "Meet the team behind We Install Govee Lights — Southern Ontario's Govee permanent outdoor lighting specialists. Trained, insured, and passionate about smart LED lighting.",
  openGraph: {
    title: "About Us — Professional Govee Lighting Installers in Ontario",
    description:
      "Southern Ontario's Govee permanent outdoor lighting specialists. Trained, insured, passionate about smart LED.",
    images: [{ url: "/images/Side-of-home-govee-lights-scaled.jpg" }],
    url: "https://weinstallgoveelights.ca/about",
  },
  twitter: {
    title: "About Us — Professional Govee Lighting Installers in Ontario",
    description:
      "Southern Ontario's Govee permanent outdoor lighting specialists.",
  },
};

const values = [
  {
    icon: "🎯",
    title: "Precision Installation",
    desc: "We measure twice, mount once. Every track is aligned to your roofline and colour-matched to your soffit.",
  },
  {
    icon: "🤝",
    title: "Transparent Communication",
    desc: "No surprises. Clear quotes, honest timelines, and a customer portal to track your project from quote to completion.",
  },
  {
    icon: "🌿",
    title: "Local to Ontario",
    desc: "We're a local Ontario business, deeply connected to the communities we serve. Your neighbours are our neighbours.",
  },
  {
    icon: "🔧",
    title: "Ongoing Support",
    desc: "Our relationship doesn't end at installation. We're here for app setup, warranty claims, and any future adjustments.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-transparent to-[#06B6D4]/5 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
              We Install Govee Lights
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We're a Southern Ontario-based team of trained, fully insured permanent outdoor lighting
            specialists. Our mission is simple: deliver stunning, smart, and durable Govee lighting
            installations that homeowners and businesses love for years to come.
          </p>
        </div>
      </section>

      {/* Story + Image */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <Image
              src="/images/Forever-LIghts-Example-3.jpg"
              alt="Professional Govee permanent outdoor lighting installation on a home in Ontario - We Install Govee Lights team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07071A]/60 to-transparent" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-5">Our Story</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We Install Govee Lights was founded with a single goal: to bring professional-grade
                smart outdoor lighting to Ontario homeowners who were tired of wrestling with
                temporary Christmas lights every season.
              </p>
              <p>
                We recognized that Govee's permanent lighting technology was genuinely outstanding —
                weatherproof, vibrant, app-controlled — but that DIY installation too often delivered
                underwhelming results. Uneven mounting, connectivity issues, mismatched hardware,
                and safety risks left customers frustrated.
              </p>
              <p>
                So we built a team of trained installers who know Govee's Elite, Pro, and full
                permanent lineup inside-out. Today we serve 13+ regions across Southwestern Ontario,
                from Windsor to Oshawa, completing residential and commercial installs every week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#0E0E24] py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <blockquote className="text-xl md:text-2xl text-gray-200 italic leading-relaxed border-l-4 border-[#8B5CF6] pl-6 text-left max-w-3xl mx-auto">
            "To revolutionize outdoor lighting by providing customizable, durable, and energy-efficient
            solutions that enhance the aesthetics and safety of every space we touch — while making
            the experience effortless for our clients."
          </blockquote>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">What We Stand For</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((v) => (
            <div key={v.title} className="bg-[#141430] border border-[#1E1E42] rounded-2xl p-6 flex gap-5">
              <div className="text-3xl shrink-0">{v.icon}</div>
              <div>
                <h3 className="text-white font-bold mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image row */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto">
          {[
            { src: "/images/Forever-Lights-Example.jpg", alt: "Govee permanent LED lights on residential home - full colour display at night in Ontario" },
            { src: "/images/Govee-Lights-2-scaled.jpeg", alt: "Govee LED roofline lighting with gradient colour effect on Ontario home" },
            { src: "/images/Forever-LIghts-Example-5.jpg", alt: "Govee permanent outdoor lights in blue and white winter pattern" },
          ].map((img) => (
            <div key={img.src} className="relative aspect-square rounded-xl overflow-hidden">
              <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0E0E24] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Request your free quote today — no obligation, response within one business day.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-lg transition-all hover:scale-105"
          >
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </>
  );
}
