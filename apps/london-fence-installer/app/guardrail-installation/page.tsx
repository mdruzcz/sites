import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Guardrail Installation in London, Ontario",
  description: "Ensure safety and compliance with professionally installed guardrails in London, ON. Durable, code-compliant solutions backed by 20 years of trusted fencing experience.",
  openGraph: {
    title: "Guardrail Installation | London Fence Installer",
    description: "Professional guardrail installation in London, Ontario. Code-compliant, durable solutions.",
    url: `${site.url}/guardrail-installation`,
  },
};

export default function GuardrailPage() {
  const service = serviceSchema("Guardrail Installation", "Professional guardrail installation for roads and highways in London, Ontario.", "/guardrail-installation");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: "Guardrail Installation", url: `${site.url}/guardrail-installation` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="bg-green py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="text-sm text-gray-300 mb-4">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/services" className="hover:text-white">Services</Link>
                <span className="mx-2">›</span>
                <span>Guardrail Installation</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Guardrail Installation</h1>
              <p className="text-gray-200">Ensure safety and compliance with professionally installed guardrails in London, Ontario. Durable, code-compliant solutions.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-extrabold mb-4">Professional Guardrail Installation</h2>
              <p className="text-[var(--muted)] mb-4 leading-relaxed">
                London Fence Installer extends its expertise to guardrail installation — a crucial component for safety on roads and highways. Our guardrails are designed to meet industry standards, providing effective protection and preventing accidents.
              </p>
              <p className="text-[var(--muted)] mb-6 leading-relaxed">
                Trust us to install guardrails that enhance road safety and withstand the test of time. Our team also installs custom property gates — designed for privacy and protection while being aesthetically pleasing. From automatic to motorized gates, we offer a seamless installation process.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Code Compliant", body: "All installations meet Ontario safety codes and provincial regulations." },
                { title: "Durable Materials", body: "Heavy-duty steel construction designed for long-term performance." },
                { title: "Custom Gates", body: "From automatic to motorized gates, we design solutions that don't compromise strength." },
                { title: "20 Years Experience", body: "Backed by two decades of fencing and safety barrier expertise." },
              ].map((item) => (
                <div key={item.title} className="card p-4">
                  <h3 className="font-bold text-[var(--green)] mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-[var(--muted)]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
