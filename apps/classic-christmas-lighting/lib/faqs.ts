import faqData from "@/content/faq.json";

export type FAQItem = { q: string; a: string };

export const homeFaqs: FAQItem[] = (faqData as { question: string; answer: string }[]).map((f) => ({ q: f.question, a: f.answer }));
export const featuredFaqs: FAQItem[] = (faqData as { question: string; answer: string; featured?: boolean }[]).filter((f) => f.featured).map((f) => ({ q: f.question, a: f.answer }));
