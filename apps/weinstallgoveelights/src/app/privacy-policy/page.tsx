import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for We Install Govee Lights.",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicy() {
  return (
    <section className="container mx-auto px-4 pt-36 pb-20 max-w-3xl">
      <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
      <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
        <p>We Install Govee Lights ("we", "us") is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information.</p>
        <h2 className="text-white text-lg font-bold">Information We Collect</h2>
        <p>We collect information you provide directly, such as your name, email address, phone number, and city when you submit a quote request. We also collect standard web analytics data through our analytics provider.</p>
        <h2 className="text-white text-lg font-bold">How We Use Your Information</h2>
        <p>We use your information solely to respond to your quote request, provide our services, and communicate with you about your project. We do not sell or share your information with third parties for marketing purposes.</p>
        <h2 className="text-white text-lg font-bold">Contact</h2>
        <p>Questions about this policy? <a href="/contact" className="text-[#A78BFA]">Use our contact form</a> and we&apos;ll respond within one business day.</p>
      </div>
    </section>
  );
}
