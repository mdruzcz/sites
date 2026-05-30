import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How Celebrate Lighting's 4-step process works — free consultation, custom design, professional installation, and app setup. Serving Southwestern Ontario.",
  alternates: { canonical: "/our-process" },
  openGraph: {
    title: "Our Process | How Celebrate Lighting Works",
    description: "How Celebrate Lighting installs permanent outdoor LED lighting — 4 simple steps, usually done in two days.",
    url: "https://celebratelighting.ca/our-process",
    images: [{ url: "/images/hero-main.jpg", alt: "How Celebrate Lighting installs permanent outdoor LED lighting" }],
  },
};

const steps = [
  {
    num: 1,
    title: "Free Consultation",
    desc: "A lighting specialist visits your property at no cost and no obligation. We walk your home's exterior, measure the roofline and soffit, discuss your vision for the space, and answer any questions. You&apos;ll receive a detailed, itemized quote before we leave.",
    details: ["On-site property walkthrough", "Detailed measurements", "Colour-match assessment", "Transparent itemized quote", "No obligation — no pressure"],
  },
  {
    num: 2,
    title: "Custom Design",
    desc: "Our team creates a lighting plan tailored specifically to your home's architecture. We select the track colour to match your soffit and fascia, plan cable routing for a clean hidden installation, and design the lighting layout to maximize visual impact.",
    details: ["Soffit and fascia colour matching", "Track and fixture selection", "Hidden cable routing plan", "Layout optimized for your home's architecture", "Design review with homeowner"],
  },
  {
    num: 3,
    title: "Professional Installation",
    desc: "On installation day, our certified technicians arrive on time and complete the work with minimal disruption. We install all tracks, LED modules, wiring, WiFi controller, and power supplies cleanly and securely. Most homes are completed in a single day.",
    details: ["Certified, insured technicians", "Non-penetrating mounting system", "Clean concealed wiring", "WiFi controller and power supply installation", "Full system test before we leave"],
  },
  {
    num: 4,
    title: "App Setup & Training",
    desc: "We&apos;re not done until you&apos;re confident using your new system. We connect your lighting to the mobile app, walk you through controls and colour selection, set up your initial favourite scenes and holiday schedules, and confirm everything is working perfectly.",
    details: ["App download and account setup", "WiFi pairing and configuration", "Colour and schedule demo", "Holiday theme setup", "24/7 support contact provided"],
  },
];

export default function OurProcessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Our Process", url: `${site.url}/our-process` },
      ])) }} />

      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <span>Our Process</span>
          </nav>
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">How It Works</p>
            <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight mb-4">Our Installation Process</h1>
            <p className="text-[var(--muted)] max-w-xl mx-auto">
              From the first phone call to your first holiday light show — here&apos;s exactly what to expect when you work with Celebrate Lighting.
            </p>
          </div>

          <div className="space-y-10">
            {steps.map((step) => (
              <div key={step.num} className="card p-8 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-lg" style={{ background: "var(--accent)" }} aria-hidden="true">
                  {step.num}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">{step.title}</h2>
                  <p className="text-[var(--muted)] leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: step.desc }} />
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                        <svg className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Ready to Get Started?</h2>
            <p className="text-[var(--muted)] mb-6">Book your free, no-obligation consultation today. Most installations are completed within 2 weeks of booking.</p>
            <Link href="/contact" className="btn btn-primary px-8">Book My Free Consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
