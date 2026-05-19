"use client";

import { useState } from "react";
import { ChevronDownIcon } from "./icons";

const faqs = [
  {
    q: "How much does a permanent lighting system cost?",
    a: "Pricing varies based on your home's size, complexity, and specific requirements. Most residential installations range from $2,500 to $8,000. We provide detailed, transparent quotes with no hidden fees during your free consultation.",
  },
  {
    q: "How long do the LED lights last?",
    a: "Our commercial-grade LED lights are rated for 50,000+ hours of use, which translates to decades of normal residential use. They're designed to withstand Canadian weather conditions including extreme cold, heat, and UV exposure.",
  },
  {
    q: "How do I control my lights?",
    a: "Your permanent lighting system comes with a user-friendly mobile app that allows you to control colors, brightness, patterns and schedules from anywhere. You can also set up automated schedules for holidays and special occasions.",
  },
  {
    q: "How do the lights perform in Canadian winters?",
    a: "Our lights are specifically chosen for Canadian climates and are rated to operate in temperatures as low as -40 °C. The LED technology actually performs better in cold weather, and the mounting system is designed to handle ice and snow loads.",
  },
  {
    q: "Will installation damage my roof or gutters?",
    a: "No. Our professional installation methods use specialized clips and tracks that don't penetrate your roof or damage gutters. Our experienced technicians are trained in safe practices that preserve your home's integrity.",
  },
  {
    q: "How long does the installation take?",
    a: "Most residential installations are completed in 1–2 days, depending on the size and complexity of your home. We'll provide a detailed timeline during your free consultation. Our team works efficiently while maintaining the highest quality standards.",
  },
  {
    q: "What's covered by the warranty?",
    a: "We provide a comprehensive lifetime warranty covering LED lights, mounting hardware and installation workmanship. This includes free repairs, replacements, and service calls for the life of your system.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes. We offer flexible financing options through several partners with competitive rates and terms that fit your budget. We'll go over the options during your free consultation.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(180deg, var(--night) 0%, var(--night-deep) 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--gold-bright)" }}
          >
            Got Questions?
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Frequently Asked{" "}
            <span className="text-gradient-gold">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border overflow-hidden"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                backgroundColor:
                  open === i ? "rgba(245,194,107,0.05)" : "rgba(255,255,255,0.025)",
              }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left transition-colors min-h-11"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-white pr-4">{faq.q}</span>
                <span
                  className={`flex-shrink-0 transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                  style={{ color: "var(--gold-bright)" }}
                >
                  <ChevronDownIcon />
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 pt-1">
                  <p className="text-sm text-white/65 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
