import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "https://londonconcreteforming.ca/success" },
  title: "Thank You",
  description: "Thank you for contacting London Concrete Forming. We have received your quote request and will be in touch within 1 business day.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <section className="section bg-[#f8fafc] flex items-center min-h-[60vh]">
      <div className="container-custom text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-green-500" aria-hidden="true">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#333333] mb-4">Thank You!</h1>
        <p className="text-slate-600 text-lg mb-3">Your quote request has been received.</p>
        <p className="text-slate-600 mb-8">We will get back to you within <strong>{site.responseTime}</strong> to discuss your concrete project. If you need to reach us sooner, please call us at <a href={site.phoneHref} className="text-[#F7931E] font-semibold hover:underline">{site.phone}</a>.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary text-base">Back to Home</Link>
          <a href={site.phoneHref} className="btn btn-outline text-base">Call Us Now</a>
        </div>
      </div>
    </section>
  );
}
