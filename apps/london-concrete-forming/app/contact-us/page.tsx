import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "https://londonconcreteforming.ca/contact-us" },
  title: "Contact Us",
  description: "Contact London Concrete Forming for a free concrete quote in London, Ontario. Call 519-914-1901 or fill out our online form. We respond within 1 business day.",
  openGraph: {
    title: "Contact Us",
    description: "Get a free concrete quote in London, Ontario. Call 519-914-1901 or fill out our form.",
  },
};

export default function ContactPage() {
  const jsonLd = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Contact Us", url: `${site.url}/contact-us` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-[#333333] py-16">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Contact Us</h1>
          <p className="text-slate-300 text-lg">Get a free quote for your concrete project in London, Ontario and surrounding area.</p>
        </div>
      </section>

      <section className="section bg-[#f8fafc]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-[#333333] mb-4">Get In Touch</h2>
                <p className="text-slate-600 leading-relaxed">Fill out the form and we will get back to you within {site.responseTime}. Or reach us directly:</p>
              </div>

              <div className="card p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F7931E]/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#F7931E]" aria-hidden="true"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#333333] mb-0.5">Phone</p>
                    <a href={site.phoneHref} className="text-slate-600 hover:text-[#F7931E] transition-colors">{site.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F7931E]/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#F7931E]" aria-hidden="true"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.083 3.203-4.599 3.203-7.327C19.5 7.116 15.964 3.5 12 3.5 8.037 3.5 4.5 7.116 4.5 12c0 2.728 1.259 5.244 3.203 7.327a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#333333] mb-0.5">Address</p>
                    <p className="text-slate-600">{site.addressLine}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F7931E]/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#F7931E]" aria-hidden="true"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#333333] mb-0.5">Hours</p>
                    <p className="text-slate-600">Mon–Sat 8:00am–6:00pm</p>
                    <p className="text-slate-600">Sunday Closed</p>
                  </div>
                </div>
              </div>

              {/* Google Maps embed */}
              <div className="rounded-xl overflow-hidden border border-slate-200 h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93740.42985440077!2d-81.34290978959984!3d42.98453978817978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ef20f41f21b03%3A0x97111a1a29e10b6!2sLondon%2C%20ON!5e0!3m2!1sen!2sca!4v1699999999999"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="London Concrete Forming service area map - London, Ontario"
                />
              </div>
            </div>

            {/* Quote form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                <h2 className="text-2xl font-extrabold text-[#333333] mb-2">Request a Free Quote</h2>
                <p className="text-slate-500 text-sm mb-6">We will get back to you within {site.responseTime}.</p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
