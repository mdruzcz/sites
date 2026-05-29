import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Warranty — 5-Year Parts & 1-Year Labor Coverage",
  description:
    "Our Govee permanent outdoor lighting installations come with a 5-year parts warranty and 1-year labor warranty. Learn what's covered and how to make a claim.",
  openGraph: {
    title: "Warranty — 5-Year Parts & 1-Year Labor Coverage",
    description: "5-year parts warranty and 1-year labor warranty on all Govee installations.",
    url: "https://weinstallgoveelights.ca/warranty",
  },
  twitter: {
    title: "Warranty — 5-Year Parts & 1-Year Labor Coverage",
    description: "5-year parts warranty and 1-year labor warranty on all Govee installations.",
  },
};

export default function WarrantyPage() {
  return (
    <section className="container mx-auto px-4 pt-36 pb-20 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Warranty{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
            Information
          </span>
        </h1>
        <p className="text-gray-400">
          Industry-leading protection for your Govee permanent outdoor lighting investment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-gradient-to-br from-[#8B5CF6]/20 to-[#8B5CF6]/5 border border-[#8B5CF6]/40 rounded-2xl p-6 text-center">
          <div className="text-5xl font-black text-[#A78BFA] mb-2">5</div>
          <div className="text-white font-bold text-lg">Year Parts Warranty</div>
          <p className="text-gray-400 text-sm mt-2">
            Covers LED lights, track systems, controllers, and cables
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#06B6D4]/20 to-[#06B6D4]/5 border border-[#06B6D4]/40 rounded-2xl p-6 text-center">
          <div className="text-5xl font-black text-[#67E8F9] mb-2">1</div>
          <div className="text-white font-bold text-lg">Year Labor Warranty</div>
          <p className="text-gray-400 text-sm mt-2">
            Covers installation-related issues, errors, and adjustments
          </p>
        </div>
      </div>

      <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
        <div className="bg-[#141430] border border-[#1E1E42] rounded-2xl p-6">
          <h2 className="text-white font-bold text-base mb-3">What's Covered</h2>
          <ul className="space-y-2">
            {[
              "LED light units, track systems, controllers, and cables — defects in materials and workmanship",
              "Installation-related issues including mounting errors and connection faults",
              "Professional inspection and repair or replacement at no extra cost",
              "The original purchaser of the lighting system",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[#8B5CF6] shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#141430] border border-[#1E1E42] rounded-2xl p-6">
          <h2 className="text-white font-bold text-base mb-3">What's Not Covered</h2>
          <ul className="space-y-2">
            {[
              "Damage from improper use, accidents, or unauthorized modifications",
              "Damage caused by natural disasters (floods, storms, earthquakes)",
              "Warranty is not transferable to subsequent owners",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#141430] border border-[#1E1E42] rounded-2xl p-6">
          <h2 className="text-white font-bold text-base mb-3">How to Make a Claim</h2>
          <ol className="space-y-2 list-decimal list-inside">
            <li>Use the contact form at <Link href="/contact" className="text-[#A78BFA] hover:text-white transition-colors">/contact</Link> to submit your claim</li>
            <li>Provide your proof of purchase and a description of the issue</li>
            <li>We'll schedule an inspection within a reasonable timeframe</li>
            <li>Repairs or replacements are completed at no additional charge to you</li>
          </ol>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/contact"
          className="inline-block px-7 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold transition-all hover:scale-105"
        >
          Contact Us About a Warranty Claim
        </Link>
      </div>
    </section>
  );
}
