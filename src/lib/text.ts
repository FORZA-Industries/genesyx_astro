// FAQ answers still awaiting real content are shown on the page but kept out of structured data,
// because FAQPage markup must match the visible text exactly.
export const hasPlaceholder = (s: string) => s.includes("[PLACEHOLDER");

export const faqForSchema = (items: { data: { question: string; answer: string } }[]) =>
  items
    .filter((i) => !hasPlaceholder(i.data.answer))
    .map((i) => ({ question: i.data.question, answer: i.data.answer }));
