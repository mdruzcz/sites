import faqData from "@/content/faqs.json";

export type FAQItem = { q: string; a: string };

const base: FAQItem[] = (faqData as { question: string; answer: string }[]).map((f) => ({ q: f.question, a: f.answer }));

export const finishFaqs: FAQItem[] = [
  { q: "What is the difference between matte, semi-gloss and gloss finishes?", a: "All three use the same high-quality solvent-based sealer; the difference is the sheen. Matte keeps a natural look with no reflection, semi-gloss adds a satin sheen and strong colour enhancement, and gloss gives a wet look with the deepest colour. Semi-gloss is our most popular choice for stamped concrete." },
  { q: "Why do you use solvent-based sealers instead of water-based?", a: "Solvent-based acrylic sealers penetrate deeper, enhance colour more, and re-emulsify previous solvent-based coats so recoats bond seamlessly with no peeling layers. They also hold up better against road salt, UV and hot tires through Ontario winters and summers." },
  { q: "Can you make a sealed surface less slippery?", a: "Yes. We can add a non-slip additive to any finish, which is standard for pool decks, steps and sloped walkways. It does not change the look of the finish." },
];

export const homeFaqs: FAQItem[] = [...base.slice(0, 3), ...finishFaqs, ...base.slice(3)];
export const featuredFaqs: FAQItem[] = [...(faqData as { question: string; answer: string; featured?: boolean }[]).filter((f) => f.featured).slice(0, 3).map((f) => ({ q: f.question, a: f.answer })), ...finishFaqs];
