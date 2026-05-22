import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Brantford Concrete Forming",
  description: "Privacy policy for Brantford Concrete Forming — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section bg-white">
      <div className="container-custom max-w-3xl">
        <nav className="text-slate-400 text-sm mb-6">
          <Link href="/" className="hover:text-[#E8751A] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">Privacy Policy</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
          <p className="text-sm text-slate-500">Last updated: January 1, 2025</p>
          <p>This Privacy Policy describes how {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and shares information about you when you visit our website or contact us for services.</p>

          <h2 className="text-xl font-bold text-[#1a2332]">Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you fill out a contact or quote request form. This may include your name, phone number, email address, service address, and project details.</p>

          <h2 className="text-xl font-bold text-[#1a2332]">How We Use Your Information</h2>
          <ul className="space-y-1">
            <li>To respond to your quote requests and inquiries</li>
            <li>To schedule and perform concrete forming services</li>
            <li>To send follow-up communications related to your project</li>
            <li>To improve our website and services</li>
          </ul>

          <h2 className="text-xl font-bold text-[#1a2332]">Information Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.</p>

          <h2 className="text-xl font-bold text-[#1a2332]">Cookies and Tracking</h2>
          <p>Our website may use cookies and similar tracking technologies to improve your browsing experience and analyze site traffic. You can control cookies through your browser settings.</p>

          <h2 className="text-xl font-bold text-[#1a2332]">Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

          <h2 className="text-xl font-bold text-[#1a2332]">Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at <a href={site.emailHref} className="text-[#E8751A] hover:underline">{site.email}</a> or call <a href={site.phoneHref} className="text-[#E8751A] hover:underline">{site.phone}</a>.</p>
        </div>
      </div>
    </section>
  );
}
