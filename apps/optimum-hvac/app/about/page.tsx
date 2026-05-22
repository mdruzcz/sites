import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "About Optimum HVAC | Burgessville, Oxford County",
  description: `Learn about ${site.name} — Oxford County's TSSA G2 certified, locally owned HVAC company serving Woodstock, Ingersoll, Tillsonburg, and beyond.`,
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <>
      <section className="bg-[var(--navy)] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow-cool">About Us</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Oxford County&apos;s HVAC Specialists
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Locally owned and operated in Burgessville. TSSA G2 certified. Committed to honest, professional heating and cooling service for our neighbours.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-[var(--navy)] mb-4">Our Story</h2>
                <p className="text-[var(--slate)] leading-relaxed mb-4">
                  Optimum HVAC was founded right here in Burgessville with a simple goal: provide Oxford County homeowners with the kind of honest, skilled HVAC service that big-city companies often don&apos;t deliver. We&apos;re your neighbours, and we treat your home like our own.
                </p>
                <p className="text-[var(--slate)] leading-relaxed mb-4">
                  Every technician on our team holds TSSA G2 certification — the license required by Ontario law for gas appliance installation. We also carry full WSIB coverage and commercial liability insurance, so you&apos;re protected on every job.
                </p>
                <p className="text-[var(--slate)] leading-relaxed">
                  As energy costs rise and the government rolls out heat pump incentive programs, we&apos;ve become Oxford County&apos;s go-to resource for navigating rebates. We stay current on every available program so we can maximize savings for our customers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-[var(--navy)] mb-4">Our Credentials</h2>
                <div className="grid grid-cols-2 gap-3">
                  {site.certifications.map((cert) => (
                    <div key={cert} className="card px-4 py-3 flex items-center gap-3">
                      <svg className="w-5 h-5 text-[var(--cool)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-bold text-[var(--navy)]">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-[var(--navy)] mb-4">Brands We Work With</h2>
                <div className="flex flex-wrap gap-2">
                  {site.brands.map((brand) => (
                    <span key={brand} className="px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm font-semibold text-[var(--slate)]">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <QuoteForm formType="contact" variant="card" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy)] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            Ready to Work with a Local HVAC Expert?
          </h2>
          <p className="text-white/70 mb-6">No-obligation estimates. Same-day service available across Oxford County.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-primary">Get a Free Quote</Link>
            <a href={site.phoneHref} className="btn btn-outline-white">{site.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
