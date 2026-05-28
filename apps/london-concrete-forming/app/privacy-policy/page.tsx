import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | London Concrete Forming",
  description: "London Concrete Forming privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section bg-white">
      <div className="container-custom max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-3xl font-extrabold text-[#1a2332] mb-6">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-8">Last updated: January 1, 2025</p>

        <h2 className="text-xl font-bold text-[#1a2332] mt-8 mb-3">Information We Collect</h2>
        <p className="text-slate-600 leading-relaxed mb-4">When you fill out our contact or quote form, we collect your name, phone number, email address, and any project details you provide. This information is used solely to respond to your inquiry and provide you with a quote for concrete services.</p>

        <h2 className="text-xl font-bold text-[#1a2332] mt-8 mb-3">How We Use Your Information</h2>
        <p className="text-slate-600 leading-relaxed mb-4">We use the information you provide to:</p>
        <ul className="text-slate-600 leading-relaxed mb-4 list-disc list-inside space-y-1">
          <li>Respond to your quote request or inquiry</li>
          <li>Schedule and coordinate concrete services</li>
          <li>Send project updates and follow-up communications</li>
        </ul>
        <p className="text-slate-600 leading-relaxed mb-4">We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>

        <h2 className="text-xl font-bold text-[#1a2332] mt-8 mb-3">Data Security</h2>
        <p className="text-slate-600 leading-relaxed mb-4">We take reasonable measures to protect your personal information from unauthorized access, disclosure, or misuse. Form submissions are stored securely and transmitted over encrypted connections.</p>

        <h2 className="text-xl font-bold text-[#1a2332] mt-8 mb-3">Cookies</h2>
        <p className="text-slate-600 leading-relaxed mb-4">Our website may use cookies for analytics purposes to help us understand how visitors use our site. These cookies do not collect personally identifiable information.</p>

        <h2 className="text-xl font-bold text-[#1a2332] mt-8 mb-3">Contact Us</h2>
        <p className="text-slate-600 leading-relaxed mb-4">If you have any questions about this privacy policy or how we handle your personal information, please contact us at <a href={site.emailHref} className="text-[#F7931E] hover:underline">{site.email}</a> or by phone at <a href={site.phoneHref} className="text-[#F7931E] hover:underline">{site.phone}</a>.</p>
      </div>
    </section>
  );
}
