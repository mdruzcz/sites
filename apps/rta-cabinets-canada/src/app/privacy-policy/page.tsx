import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How RTA Cabinets Canada collects, uses and protects the personal information you share when you request a quote, sign up for deals or use the kitchen planner.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: { title: "Privacy Policy | RTA Cabinets Canada", description: "How we collect, use and protect your personal information." },
  twitter: { card: "summary", title: "Privacy Policy | RTA Cabinets Canada", description: "How we collect, use and protect your personal information." },
};

export default function PrivacyPage() {
  return <LegalPage doc="privacy" path="/privacy-policy" />;
}
