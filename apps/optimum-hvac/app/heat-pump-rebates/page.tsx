import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Heat Pump Rebates Ontario 2025 | Up to $40,000",
  description: "Ontario heat pump rebates in 2025: Canada Greener Homes Loan ($40k interest-free), Enbridge HER+ ($10k+), Save on Energy, and Oil-to-HP grants. Optimum HVAC handles all applications.",
};

export const revalidate = 3600;

const rebatePrograms = [
  {
    name: "Canada Greener Homes Loan",
    amount: "Up to $40,000",
    type: "Interest-Free Loan",
    repayment: "10 years, interest-free",
    highlight: true,
    details: [
      "Available to Canadian homeowners",
      "Covers heat pumps, insulation, windows, and more",
      "Must use a certified energy advisor",
      "We help with the pre- and post-retrofit evaluations",
    ],
  },
  {
    name: "Enbridge HER+ (Home Efficiency Rebate Plus)",
    amount: "Up to $10,000+",
    type: "Rebate",
    repayment: "No repayment required",
    highlight: true,
    details: [
      "Available to Enbridge Gas customers",
      "Higher rebates for switching from gas to heat pump",
      "Stackable with Canada Greener Homes",
      "We submit applications on your behalf",
    ],
  },
  {
    name: "Save on Energy",
    amount: "Varies by equipment",
    type: "Rebate",
    repayment: "No repayment required",
    highlight: false,
    details: [
      "Available to Ontario hydro customers",
      "Rebates for qualifying heat pumps and smart thermostats",
      "Can be combined with other programs",
      "We verify eligibility at no cost",
    ],
  },
  {
    name: "Oil-to-Heat-Pump",
    amount: "Up to $10,000",
    type: "Federal Grant",
    repayment: "No repayment required",
    highlight: false,
    details: [
      "For homes currently heated by oil, propane, or electric",
      "Additional funding on top of Greener Homes Loan",
      "Significant savings for rural Oxford County properties",
      "Ask us if you qualify",
    ],
  },
];

const rebateFaqs = [
  {
    question: "Can I stack multiple heat pump rebate programs?",
    answer: "Yes. Most Ontario homeowners can combine the Canada Greener Homes Loan, Enbridge HER+, and Save on Energy incentives. Total savings often reach $15,000–$25,000 depending on your situation.",
  },
  {
    question: "How long does the rebate process take?",
    answer: "The Canada Greener Homes process includes a pre-retrofit energy audit, the installation, and a post-retrofit audit. Total timelines are typically 8–12 weeks from start to receiving funds. We guide you through every step.",
  },
  {
    question: "Do I need to pay upfront and get reimbursed?",
    answer: "For the Greener Homes Loan, the funds come as a loan directly to you to cover costs. For rebate programs like Enbridge HER+, you typically pay for the installation and receive the rebate afterward, usually within 4–8 weeks.",
  },
  {
    question: "What type of heat pump qualifies for rebates?",
    answer: "Most air-source heat pumps with a minimum HSPF2 efficiency rating qualify. Cold-climate heat pumps get higher rebate amounts. We only install qualifying equipment so your rebate eligibility is guaranteed.",
  },
  {
    question: "Does Optimum HVAC handle the rebate paperwork?",
    answer: "Yes. We assist with all rebate and loan applications as part of our installation service. We coordinate the required energy audits and submit documentation on your behalf wherever possible.",
  },
];

export default function HeatPumpRebatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(rebateFaqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Heat Pump Rebates", url: `${site.url}/heat-pump-rebates` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="rebate-gradient text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow-cool">Government Rebates & Loans</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Up to $40,000 in
              <span className="block text-[var(--heat)]">Heat Pump Rebates</span>
              Available Now
            </h1>
            <p className="text-lg sm:text-xl text-white/75 mb-8 max-w-2xl">
              Ontario homeowners can access multiple government programs to offset the cost of switching to a heat pump. Optimum HVAC handles all applications — you just enjoy the savings.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary">
                See What You Qualify For
              </Link>
              <a href={site.phoneHref} className="btn btn-outline-white">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="eyebrow">Available Programs</p>
            <h2 className="text-3xl font-extrabold text-[var(--navy)] tracking-tight">
              Ontario Heat Pump Rebate Programs for 2025
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rebatePrograms.map((prog) => (
              <div
                key={prog.name}
                className={`card p-6 sm:p-8 ${prog.highlight ? "border-[var(--cool)] border-2" : ""}`}
              >
                {prog.highlight && (
                  <span className="inline-block mb-3 text-xs font-bold text-[var(--cool)] bg-[var(--cool)]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-extrabold text-[var(--navy)] mb-1">{prog.name}</h3>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-extrabold text-[var(--heat)]">{prog.amount}</span>
                  <span className="text-sm text-[var(--slate)]">{prog.type}</span>
                </div>
                <p className="text-sm text-[var(--cool)] font-semibold mb-4">{prog.repayment}</p>
                <ul className="space-y-2">
                  {prog.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-[var(--slate)]">
                      <svg className="w-4 h-4 text-[var(--cool)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eyebrow">How It Works</p>
            <h2 className="text-3xl font-extrabold text-[var(--navy)] tracking-tight">
              We Handle Everything
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Free Assessment", desc: "We assess your home, current system, and confirm which programs you qualify for — at no cost." },
              { step: "02", title: "Install the Right Equipment", desc: "We install a qualifying cold-climate heat pump that maximizes your rebate eligibility and long-term efficiency." },
              { step: "03", title: "We Submit Applications", desc: "Our team prepares and submits all rebate and loan applications, including coordinating the required energy audits." },
              { step: "04", title: "You Receive Funds", desc: "Rebates arrive within weeks. The Greener Homes Loan is interest-free for 10 years — like getting $40k to improve your home." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--navy)] text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-[var(--navy)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--slate)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form + FAQs */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-extrabold text-[var(--navy)] mb-6">
                Find Out What You Qualify For — Free
              </h2>
              <QuoteForm defaultService="Heat Pump Installation" formType="quote" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[var(--navy)] mb-6">Rebate FAQs</h2>
              <div className="space-y-4">
                {rebateFaqs.map((faq) => (
                  <div key={faq.question} className="card p-5 corner-accent">
                    <h3 className="font-bold text-[var(--navy)] text-sm mb-2">{faq.question}</h3>
                    <p className="text-[var(--slate)] text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
