import { QuoteRequestsList } from "@/components/quote-requests-list";

export const dynamic = "force-dynamic";

export default function RtaQuoteRequestsPage() {
  return (
    <QuoteRequestsList
      title="RTA Cabinets — Quote Requests"
      subtitle="Cart submissions from rtacabinetscanada.ca/quote."
      requestsTable="rtacabinets_quote_requests"
      itemsTable="rtacabinets_quote_request_items"
    />
  );
}
