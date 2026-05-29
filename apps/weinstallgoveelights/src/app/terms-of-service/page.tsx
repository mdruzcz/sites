import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for We Install Govee Lights.",
  robots: { index: false, follow: false },
};

export default function TermsOfService() {
  return (
    <section className="container mx-auto px-4 pt-36 pb-20 max-w-3xl">
      <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
      <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
        <p>By using this website and our services, you agree to the following terms.</p>
        <h2 className="text-white text-lg font-bold">Services</h2>
        <p>We Install Govee Lights provides professional Govee permanent outdoor lighting installation services across Southwestern Ontario. All installations are performed by trained technicians.</p>
        <h2 className="text-white text-lg font-bold">Quotes and Pricing</h2>
        <p>All quotes are non-binding until a formal written agreement is signed. Pricing may vary based on property size, complexity, and material requirements.</p>
        <h2 className="text-white text-lg font-bold">Warranty</h2>
        <p>Our warranty terms are detailed on our <a href="/warranty" className="text-[#A78BFA]">Warranty page</a>. All warranties are subject to the conditions described therein.</p>
        <h2 className="text-white text-lg font-bold">Contact</h2>
        <p>Questions? <a href="/contact" className="text-[#A78BFA]">Use our contact form</a> and we&apos;ll get back to you within one business day.</p>
      </div>
    </section>
  );
}
