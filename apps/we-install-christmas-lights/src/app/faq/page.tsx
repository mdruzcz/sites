import type { Metadata } from "next";
import Script from "next/script";
import { FAQAccordion } from "@/components/FAQAccordion";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ — Christmas Light Installation Questions Answered",
  description:
    "Answers to the most-asked Christmas light installation questions: pricing, scheduling, takedown, storage, LED choices and more. London Ontario's #1 holiday lighting team.",
  alternates: { canonical: `${site.url}/faq` },
};

const FAQS = [
  {
    question: "How much does professional Christmas light installation cost?",
    answer:
      "Pricing depends on the size of your home, the linear footage of roofline, the number of trees/hedges, the type of lighting you choose, and any extras like inflatables or custom décor. Most residential installs range from $700 to $3,500 all-in (design, install, mid-season maintenance, takedown, and storage). Commercial projects are quoted on-site.",
  },
  {
    question: "How long does an installation take?",
    answer:
      "Most residential installs are completed in a single day. Larger estates and commercial properties may require two days. We'll give you a clear timeline in your quote.",
  },
  {
    question: "Do you provide the lights?",
    answer:
      "Yes — we supply premium commercial-grade LED lights, extension cords, clips and connectors. You only need to provide outdoor outlet access. We can also work with your existing lights if you prefer.",
  },
  {
    question: "What if a bulb burns out mid-season?",
    answer:
      "We handle it. Our Full Season Holiday Service includes free mid-season maintenance — call us and we'll be out to fix any issues at no extra cost.",
  },
  {
    question: "When do you start booking?",
    answer:
      "Bookings open in August and the calendar fills up fast — most years we're fully booked by mid-November. Book early to lock in your preferred install week.",
  },
  {
    question: "Do I need to be home during the install?",
    answer:
      "No. Our crew can complete the install while you're at work as long as we have outdoor outlet access. We'll text you photos when we're done.",
  },
  {
    question: "When do you take the lights down?",
    answer:
      "We schedule takedowns through January, weather permitting. You can unplug your timer any time after the holidays end — we'll get there as soon as conditions are safe.",
  },
  {
    question: "Do you offer storage?",
    answer:
      "Yes — storage starts at $100/season. We catalog each strand, inspect it before next install, and replace any damaged sections at no extra cost.",
  },
  {
    question: "Are your installers insured?",
    answer:
      "Fully — we carry liability insurance and our crew is WSIB-compliant. We also use professional fall-protection equipment for any work above one story.",
  },
  {
    question: "Do you decorate Christmas trees?",
    answer:
      "Yes — both indoor and outdoor. We've decorated 920+ trees for residential clients, plus dozens of large commercial trees for hotels, banks, malls, and casinos.",
  },
  {
    question: "Do you offer permanent (year-round) lighting like Govee or Eufy?",
    answer:
      "Yes — we're authorized installers for Govee and Eufy permanent outdoor lighting systems. Permanent LED systems give you holiday lights for Christmas, Halloween, sports teams, birthdays, and accent lighting year-round.",
  },
  {
    question: "Which cities do you serve?",
    answer:
      "London Ontario, Strathroy, Woodstock, Ingersoll, St. Thomas, Waterloo, Kitchener, Cambridge, Guelph, Milton, Oakville, Mississauga, Brampton, Burlington, Hamilton, Ancaster, Georgetown, Etobicoke, and surrounding areas.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <section className="bg-[color:var(--bg-soft)] border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <p className="eyebrow">Have a Question?</p>
          <h1 className="heading-display text-3xl sm:text-5xl mt-3">Christmas Light Installation FAQs</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[color:var(--ink-soft)]">
            Answers to the questions we hear most about pricing, scheduling, takedown, and storage.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={FAQS} />
        </div>
      </section>
    </>
  );
}
