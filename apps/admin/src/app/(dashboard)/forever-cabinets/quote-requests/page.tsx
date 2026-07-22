import { QuoteRequestsList } from "@/components/quote-requests-list";

export const dynamic = "force-dynamic";

export default function ForeverCabinetsQuoteRequestsPage() {
  return (
    <QuoteRequestsList
      title="Forever Cabinets — Quote Requests"
      subtitle="Cart submissions from forevercabinets.ca."
      requestsTable="fc_quote_requests"
      itemsTable="fc_quote_request_items"
    />
  );
}
