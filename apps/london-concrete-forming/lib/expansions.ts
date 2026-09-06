import fs from "fs";
import path from "path";

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "callout"; text: string }
  | { type: "ul"; items: string[] };

export interface Expansion {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1?: string;
  intro: string;
  sectionTitle: string;
  blocks: Block[];
  faqs: { q: string; a: string }[];
}

export function getExpansion(slug: string): Expansion | null {
  const file = path.join(process.cwd(), "content/expansions", `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as Expansion;
}
