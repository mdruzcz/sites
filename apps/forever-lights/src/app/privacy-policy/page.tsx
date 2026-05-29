import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${site.name} — how we collect, use, and protect your information.`,
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl prose prose-invert prose-slate">
        <h1 className="text-4xl font-black text-white mb-8">Privacy Policy</h1>
        <p className="text-slate-400">Last updated: May 2026</p>
        <p className="text-slate-300">{site.name} ("{site.domain}") is committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.</p>
        <h2 className="text-white">Information We Collect</h2>
        <p className="text-slate-300">We collect information you provide directly — including your name, email, phone number, and property address when you request a quote or contact us.</p>
        <h2 className="text-white">How We Use It</h2>
        <p className="text-slate-300">We use your information only to respond to your enquiry, schedule your free site visit, and provide the services you requested. We do not sell your information to third parties.</p>
        <h2 className="text-white">Contact</h2>
        <p className="text-slate-300">Questions? Email us at <a href={`mailto:${site.email}`} className="text-[#F5A623]">{site.email}</a> or call <a href={`tel:${site.phone.replace(/\D/g,'')}`} className="text-[#F5A623]">{site.phone}</a>.</p>
      </div>
    </div>
  );
}
