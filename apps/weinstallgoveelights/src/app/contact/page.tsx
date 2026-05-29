import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Get a Free Quote — Govee Permanent Outdoor Lighting Ontario",
  description:
    "Request your free, no-obligation Govee permanent outdoor lighting quote today. We serve all of Southwestern Ontario. Response within 1 business day.",
  openGraph: {
    title: "Get a Free Quote — Govee Permanent Outdoor Lighting Ontario",
    description:
      "Free, no-obligation Govee permanent lighting quote. Serving Southwestern Ontario.",
    url: "https://weinstallgoveelights.ca/contact",
  },
  twitter: {
    title: "Get a Free Quote — Govee Permanent Outdoor Lighting Ontario",
    description:
      "Free, no-obligation Govee permanent lighting quote. Serving Southwestern Ontario.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-transparent to-[#06B6D4]/5 pointer-events-none" />
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Let's Light Up{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
              Your Space
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Fill out the form below for a free, no-obligation quote. We'll get back to you
            within one business day.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Form */}
          <div>
            <ContactForm />
          </div>

          {/* Info sidebar */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/Govee-Lights-2-scaled.jpeg"
                alt="Beautiful Govee permanent outdoor lighting installed on a home - We Install Govee Lights Ontario"
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-[#141430] border border-[#1E1E42] rounded-2xl p-6 space-y-5">
              <h2 className="text-white font-bold text-lg">Contact Information</h2>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#8B5CF6] text-base mt-0.5">💬</span>
                  <div>
                    <p className="font-medium text-white">How to Reach Us</p>
                    <p className="text-gray-400">Use the form on this page — we respond within one business day.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8B5CF6] text-base mt-0.5">🕐</span>
                  <div>
                    <p className="font-medium text-white">Business Hours</p>
                    <p>Monday – Friday, 8:00 AM – 5:00 PM</p>
                    <p className="text-gray-500 text-xs">Weekends closed</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8B5CF6] text-base mt-0.5">📍</span>
                  <div>
                    <p className="font-medium text-white">Service Area</p>
                    <p>London, Ontario &amp; all of Southwestern Ontario</p>
                    <p className="text-gray-500 text-xs">Windsor to Oshawa and everywhere in between</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🛡️", label: "Fully Insured" },
                { icon: "⭐", label: "5-Year Warranty" },
                { icon: "📱", label: "Free App Setup" },
                { icon: "💳", label: "Financing Available" },
              ].map((item) => (
                <div key={item.label} className="bg-[#141430] border border-[#1E1E42] rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="text-white text-xs font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
