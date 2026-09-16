import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Our Process - Inquiry to Last Dance",
  description:
    "Here's exactly what to expect when you book Bright Event Lighting — from your first inquiry to the last dance. Simple, stress-free, professional.",
  alternates: { canonical: "/our-process" },
  openGraph: {
    title: "Our Process | Bright Event Lighting",
    description: "From inquiry to last dance — here's how working with us works.",
    url: `${site.url}/our-process`,
  },
};

const steps = [
  {
    number: "01",
    title: "Check Your Date",
    description:
      "Fill out our quick form with your event date, venue, and the vibe you're going for. No phone calls needed — we respond within 4 business hours.",
  },
  {
    number: "02",
    title: "Get Your Proposal",
    description:
      "We'll send a detailed proposal with package options, pricing, and a mock-up of how your venue could look. Everything is transparent — no surprise fees.",
  },
  {
    number: "03",
    title: "Lock In Your Date",
    description:
      "Choose your package, sign digitally, and pay a 25% deposit. Your date is now reserved and we start planning the details.",
  },
  {
    number: "04",
    title: "Planning & Coordination",
    description:
      "We coordinate with your DJ, planner, and venue on timeline, power, and logistics. You don't have to manage anything — we handle vendor communication.",
  },
  {
    number: "05",
    title: "Setup Day",
    description:
      "Our team arrives 90 minutes before guests. Wireless LED fixtures go down quickly and cleanly. Everything is tested and scene-programmed before cocktail hour.",
  },
  {
    number: "06",
    title: "The Event",
    description:
      "Your dedicated technician runs the lighting live all evening — dimming for speeches, going dramatic for the first dance, and bringing the energy for the party. Real-time, reactive, flawless.",
  },
  {
    number: "07",
    title: "Strike & Done",
    description:
      "At the end of the night, our team packs everything up in 30 minutes while your last guests are heading out. You never lift a finger.",
  },
];

export default function OurProcessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Our Process", url: `${site.url}/our-process` },
            ])
          ),
        }}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              as="h1"
              eyebrow="How It Works"
              headline="From Inquiry to Last Dance"
              description="Working with us is designed to be stress-free. Here's exactly what happens at each step."
            />

            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-6">
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-bold text-sm">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{step.title}</h3>
                    <p className="text-[var(--muted)] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/contact" className="btn btn-primary min-h-[48px] px-8">
                Start at Step 1
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
