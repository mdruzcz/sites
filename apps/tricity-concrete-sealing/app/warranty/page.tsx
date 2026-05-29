import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: `${site.warrantyYears}-Year Warranty | TriCity Concrete Sealing`,
  description: `TriCity Concrete Sealing backs every project with a ${site.warrantyYears}-year written warranty. Learn what's covered, how to make a claim, and why our warranty leads the industry.`,
};

export default function WarrantyPage() {
  return (
    <>
      <section className="bg-[var(--navy)] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow justify-center">Our Promise</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            {site.warrantyYears}-Year Written Warranty
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Every sealing project we complete is backed by our comprehensive {site.warrantyYears}-year
            written warranty — covering both materials and workmanship.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          <div className="card p-8">
            <h2 className="font-bold text-xl text-[var(--navy)] mb-4">What&apos;s Covered</h2>
            <ul className="space-y-3 text-[var(--concrete)]">
              {[
                "Peeling, flaking, or delamination of the applied sealer",
                "Uneven coverage or visible lap marks caused by our application",
                "Premature loss of sheen or finish under normal use conditions",
                "Defects in the sealer materials supplied and applied by TriCity",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-8">
            <h2 className="font-bold text-xl text-[var(--navy)] mb-4">Warranty Exclusions</h2>
            <ul className="space-y-3 text-[var(--concrete)]">
              {[
                "Damage caused by heavy equipment, sharp objects, or chemical spills not covered in our maintenance guide",
                "Wear from abnormally high traffic levels beyond what was disclosed at the time of quote",
                "Concrete structural issues (heaving, cracking) unrelated to the sealer application",
                "Surfaces that were resealed or treated by another party after our application",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-8">
            <h2 className="font-bold text-xl text-[var(--navy)] mb-4">How to Make a Claim</h2>
            <ol className="space-y-4 text-[var(--concrete)]">
              {[
                "Email us at service@tricityconcretesealing.ca with photos of the issue and your project date.",
                "We&apos;ll respond within 2 business days to schedule an inspection.",
                "If the issue falls within the warranty terms, we&apos;ll re-apply the affected area at no cost.",
                "We aim to complete all warranty work within 14 days of a confirmed claim.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-[var(--accent)] text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: step }} />
                </li>
              ))}
            </ol>
          </div>

          <div className="text-center">
            <Link href="/contact" className="btn btn-primary px-8 py-4">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
