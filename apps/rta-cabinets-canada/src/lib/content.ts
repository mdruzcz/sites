export type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "What does “ready-to-assemble” (RTA) mean?",
    a: "RTA cabinets ship flat-packed and are assembled on site with simple tools. You skip the cost and long lead times of pre-assembled cabinets without sacrificing quality — our boxes use cam-lock and screw hardware that most homeowners and contractors can put together in 10–15 minutes per cabinet.",
  },
  {
    q: "What are the cabinets made of?",
    a: "Our White Shaker cabinets feature solid hardwood face frames and doors, grade-A 3/4\" plywood boxes, soft-close concealed European hinges, and undermount full-extension soft-close drawer glides. They carry a limited lifetime warranty.",
  },
  {
    q: "Do you ship across Canada?",
    a: "Yes. We ship White Shaker RTA cabinets and complete kitchen packages to every province. Exact shipping cost is confirmed in your written quote based on your postal code and order size.",
  },
  {
    q: "How does the quote process work?",
    a: "Browse cabinets or start from a kitchen package, add what you need to your quote list, and submit your details. Our team reviews the list and emails a written quote — including taxes and shipping — usually within one business day. There is no obligation to buy.",
  },
  {
    q: "Can I order just a few cabinets instead of a whole kitchen?",
    a: "Absolutely. Add any combination of individual cabinets, accessories, and trim to your quote. Kitchen packages are simply a convenient starting point for common layouts.",
  },
  {
    q: "How long does delivery take?",
    a: "Most in-stock White Shaker cabinets ship within about one week of order confirmation. Your written quote confirms current lead times for your specific items and destination.",
  },
  {
    q: "Are the door colours and finishes consistent?",
    a: "Yes. Our finishing process keeps colour and texture consistent from door to door, so your kitchen looks cohesive with no visible variation between cabinets.",
  },
  {
    q: "What if I'm not sure which cabinets I need?",
    a: "Use our How to Measure guide to map your kitchen, then send us your rough list or measurements with your quote request. Our team double-checks everything and suggests adjustments before you commit.",
  },
];

export function getFaqs(): Faq[] {
  return FAQS;
}
