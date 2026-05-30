import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Permanent Lighting FAQ",
  description:
    "Answers to common permanent outdoor LED lighting questions: install time, cost, warranty, app control, and winter performance. Celebrate Lighting, SW Ontario.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Permanent Outdoor Lighting — Celebrate Lighting",
    description: "Everything you need to know about permanent outdoor LED lighting installation in Ontario.",
    url: "https://celebratelighting.ca/faq",
    images: [{ url: "/images/hero-main.jpg", alt: "Permanent outdoor LED lighting FAQ — Celebrate Lighting" }],
  },
};

const faqCategories = [
  {
    category: "Installation & Setup",
    faqs: [
      { question: "How long does the installation process take?", answer: "Most residential installations are completed in 1–2 days, depending on the size and complexity of your home. We'll provide you with a detailed timeline during your free consultation. Our team works efficiently while maintaining the highest quality standards." },
      { question: "Will the installation damage my roof or gutters?", answer: "No. Our professional installation methods are designed to protect your property. We use specialized clips and mounting systems that don't penetrate your roof or damage gutters. Our experienced technicians are trained in safe installation practices that preserve your home's integrity." },
      { question: "Do I need to be home during installation?", answer: "While it's not required, we recommend being available for the initial consultation and final walkthrough. Our team will coordinate with you to ensure the installation process is convenient and minimally disruptive to your daily routine." },
      { question: "What happens if there's bad weather during installation?", answer: "Safety is our top priority. If weather conditions are unsafe, we'll reschedule your installation at no additional cost. We monitor weather forecasts closely and will communicate any necessary changes to your installation schedule in advance." },
    ],
  },
  {
    category: "Technology & Features",
    faqs: [
      { question: "How do I control my lights?", answer: "Your permanent lighting system comes with a user-friendly mobile app that allows you to control colours, brightness, patterns, and schedules from anywhere. You can also set up automated schedules for holidays and special occasions." },
      { question: "How many colours can the lights display?", answer: "Our premium LED lights can display over 16 million colours and various lighting effects. You can create custom colour combinations, choose from pre-set holiday themes, or match your favourite sports team colours." },
      { question: "Can I set schedules for different holidays?", answer: "The app includes pre-programmed schedules for all major holidays, and you can create custom schedules for birthdays, anniversaries, or any special occasion. Set it once and your lights will automatically change throughout the year." },
      { question: "What if I lose my phone or the app stops working?", answer: "Your lighting system includes multiple control options. In addition to the mobile app, you can control your lights through a web portal or contact our support team for assistance. We also provide backup control methods during app updates." },
    ],
  },
  {
    category: "Maintenance & Durability",
    faqs: [
      { question: "How long do the LED lights last?", answer: "Our commercial-grade LED lights are rated for 50,000+ hours of use, which translates to decades of normal residential use. They're designed to withstand Canadian weather conditions including extreme cold, heat, and UV exposure." },
      { question: "What maintenance is required?", answer: "Minimal maintenance is required. We recommend an annual inspection and cleaning, which we can provide as part of our maintenance service. The LED lights and mounting system are designed to be virtually maintenance-free." },
      { question: "What happens if a light burns out?", answer: "Individual LED failures are rare, but if one occurs, it won't affect the rest of your lighting system. Our lifetime warranty covers LED replacements, and our service team can quickly replace any failed components." },
      { question: "How do the lights perform in Canadian winters?", answer: "Our lights are specifically chosen for Canadian climates and are rated to operate in temperatures as low as −40°C. The LED technology actually performs better in cold weather, and the mounting system is designed to handle ice and snow loads." },
    ],
  },
  {
    category: "Pricing & Warranty",
    faqs: [
      { question: "How much does a permanent lighting system cost?", answer: "Pricing varies based on your home's size, complexity, and specific requirements. Most residential installations range from $2,500 to $8,000. We provide detailed, transparent quotes with no hidden fees during your free consultation." },
      { question: "Do you offer financing options?", answer: "Yes, we offer flexible financing options to make your permanent lighting system affordable. We work with several financing partners to provide competitive rates and terms that fit your budget." },
      { question: "What does your warranty cover?", answer: "We provide a comprehensive lifetime warranty covering LED lights, mounting hardware, and installation workmanship. This includes free repairs, replacements, and service calls for the life of your system." },
      { question: "Are there any ongoing costs?", answer: "The only ongoing cost is electricity usage, which is minimal due to LED efficiency. Optional annual maintenance services are available but not required. There are no subscription fees or hidden charges." },
    ],
  },
  {
    category: "Service Areas & Scheduling",
    faqs: [
      { question: "What areas do you serve?", answer: "We proudly serve St. Thomas, London, Waterloo, Brantford, Stratford, Tillsonburg, Woodstock, and Guelph, Ontario, Canada. Contact us if you don't see your city listed — we may be able to accommodate." },
      { question: "How far in advance should I book?", answer: "We recommend booking 2–4 weeks in advance, especially during peak seasons (spring and fall). However, we often have availability for urgent requests and will do our best to accommodate your timeline." },
      { question: "Do you provide emergency service?", answer: "Yes, we offer 24/7 emergency support for existing customers. If your lighting system experiences issues, our support team is available to help troubleshoot remotely or schedule an emergency service call if needed." },
      { question: "Can you work around my schedule?", answer: "We offer flexible scheduling including evenings and weekends to accommodate your busy lifestyle. During booking, we'll work with you to find installation times that work best for your schedule." },
    ],
  },
];

const allFaqs = faqCategories.flatMap((c) => c.faqs);

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(allFaqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "FAQ", url: `${site.url}/faq` },
      ])) }} />

      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <span>FAQ</span>
          </nav>

          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Got Questions?</p>
            <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight mb-4">Frequently Asked Questions</h1>
            <p className="text-[var(--muted)] max-w-xl mx-auto">
              Everything you need to know about permanent outdoor LED lighting installations, technology, maintenance, and our services.
            </p>
          </div>

          <div className="space-y-10">
            {faqCategories.map((cat) => (
              <div key={cat.category}>
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-4 pb-2 border-b border-[var(--border)]">{cat.category}</h2>
                <div className="space-y-3">
                  {cat.faqs.map((faq) => (
                    <details key={faq.question} className="card p-5 group">
                      <summary className="flex items-center justify-between cursor-pointer font-semibold text-[var(--foreground)] list-none">
                        {faq.question}
                        <svg className="w-5 h-5 shrink-0 group-open:rotate-180 transition-transform" style={{ color: "var(--accent)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-[var(--muted)] mb-2">Still have questions?</p>
            <p className="text-sm text-[var(--muted)] mb-6">Our friendly team is here to help. Contact us and we&apos;ll provide personalized answers.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={site.phoneHref} className="btn btn-primary">{site.phone}</a>
              <Link href="/contact" className="btn btn-outline">Send Us a Message</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
