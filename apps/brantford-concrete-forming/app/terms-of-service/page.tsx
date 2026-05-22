import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | Brantford Concrete Forming",
  description: "Terms of service for Brantford Concrete Forming — the terms governing use of our website and concrete forming services.",
};

export default function TermsOfServicePage() {
  return (
    <section className="section bg-white">
      <div className="container-custom max-w-3xl">
        <nav className="text-slate-400 text-sm mb-6">
          <Link href="/" className="hover:text-[#E8751A] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">Terms of Service</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
          <p className="text-sm text-slate-500">Last updated: January 1, 2025</p>
          <p>By using the {site.name} website or engaging our services, you agree to these Terms of Service. Please read them carefully.</p>

          <h2 className="text-xl font-bold text-[#1a2332]">Use of Website</h2>
          <p>This website is provided for informational purposes and to facilitate contact with our concrete forming team. You agree not to use the website for any unlawful purpose or in any way that could damage or impair the website.</p>

          <h2 className="text-xl font-bold text-[#1a2332]">Service Quotes</h2>
          <p>Quote requests submitted through this website are not binding contracts. All quotes provided are estimates based on the information you provide. Final pricing is confirmed after a site assessment and written agreement between both parties.</p>

          <h2 className="text-xl font-bold text-[#1a2332]">Intellectual Property</h2>
          <p>All content on this website, including text, images, logos, and graphics, is the property of {site.name} and may not be reproduced without written permission.</p>

          <h2 className="text-xl font-bold text-[#1a2332]">Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, {site.name} shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or our services.</p>

          <h2 className="text-xl font-bold text-[#1a2332]">Governing Law</h2>
          <p>These terms are governed by the laws of the Province of Ontario, Canada. Any disputes shall be resolved in the courts of Ontario.</p>

          <h2 className="text-xl font-bold text-[#1a2332]">Contact</h2>
          <p>Questions about these terms? Contact us at <a href={site.emailHref} className="text-[#E8751A] hover:underline">{site.email}</a>.</p>
        </div>
      </div>
    </section>
  );
}
