import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Holiday Light Supplies collects and uses information from quote requests, newsletter signups and orders, and how to contact us about your data.",
  alternates: { canonical: `${SITE_URL}/privacy` }
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="2026-10-14"
      sections={[
        { h: "What we collect", p: ["When you request a quote, submit an inquiry, register an account or subscribe to our newsletter we collect the information you provide: name, organization, email, phone, delivery address and the details of your project. We also collect anonymous, cookie-free analytics about how the site is used."] },
        { h: "How we use it", p: ["To prepare and send quotes, process and ship orders, provide warranty support and, if you subscribed, send a few newsletter emails a season about products and pricing. We do not sell or rent your information."] },
        { h: "Who we share it with", p: ["Carriers and freight companies to deliver your order; our email and database providers to send and store messages; payment processors to take payment on approved quotes. Each is bound to use your information only to provide that service."] },
        { h: "Cookies and analytics", p: ["The site uses a cookie to keep your quote list between visits and a small amount of local storage to remember that you dismissed the newsletter prompt. Analytics are collected with a privacy-focused tool that does not use cookies or track you across sites."] },
        { h: "Retention", p: ["Quote and order records are kept for seven years for tax and warranty purposes. Newsletter subscriptions are kept until you unsubscribe."] },
        { h: "Your choices", p: ["You can unsubscribe from the newsletter from any email, and you can ask us to see, correct or delete the information we hold about you by emailing info@holidaylightsupplies.ca."] },
        { h: "Contact", p: ["Privacy questions: info@holidaylightsupplies.ca. Holiday Light Supplies, London, Ontario, Canada."] }
      ]}
    />
  );
}
