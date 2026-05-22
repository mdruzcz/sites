import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Us — Free Concrete Forming Quotes in Brantford",
  description:
    "Contact Brantford Concrete Forming for a free estimate. Call 519-914-5697 or fill out our form. We respond within 1 business day. Serving Brantford, Paris, Burford & more.",
  openGraph: {
    title: "Contact Brantford Concrete Forming | Free Quotes",
    description: "Get a free concrete forming quote. Call 519-914-5697 or use our online form. 1 business day response.",
    images: [{ url: "/images/Concrete-Driveway-Installation-1.png", alt: "Contact Brantford Concrete Forming for a free quote" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ContactPage() {
  const jsonLd = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Contact", url: `${site.url}/contact` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="bg-[#1a2332] py-16">
        <div className="container-custom">
          <nav className="text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Get a Free Quote</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Ready to start your concrete project? Fill out the form below or give us a call. We respond within {site.responseTime}.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-xl font-bold text-[#1a2332] mb-6">Contact Information</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8751A]/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E8751A" className="w-5 h-5" aria-hidden="true">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a2332] text-sm">Phone</p>
                    <a href={site.phoneHref} className="text-[#E8751A] font-bold hover:underline">{site.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8751A]/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E8751A" className="w-5 h-5" aria-hidden="true">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a2332] text-sm">Email</p>
                    <a href={site.emailHref} className="text-[#E8751A] text-sm hover:underline break-all">{site.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8751A]/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E8751A" className="w-5 h-5" aria-hidden="true">
                      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.083 3.203-4.599 3.203-7.327C19.5 7.116 15.964 3.5 12 3.5 8.037 3.5 4.5 7.116 4.5 12c0 2.728 1.259 5.244 3.203 7.327a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a2332] text-sm">Location</p>
                    <p className="text-slate-600 text-sm">{site.addressLine}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8751A]/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E8751A" className="w-5 h-5" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a2332] text-sm">Hours</p>
                    <p className="text-slate-600 text-sm">{site.hours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-[#f8fafc] rounded-xl p-5">
                <h3 className="font-bold text-[#1a2332] mb-2">Service Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {site.serviceAreas.map((area) => (
                    <span key={area} className="text-xs bg-white border border-slate-200 rounded-full px-3 py-1 text-slate-600">{area}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-[#1a2332] mb-6">Send Us Your Project Details</h2>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
