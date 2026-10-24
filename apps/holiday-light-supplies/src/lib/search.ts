/**
 * Catalog search shared by the shop page (server) and the header search (browser).
 *
 * Every word of the query has to match somewhere in the product: name, SKU,
 * category, or description. Words are compared after folding plurals, accents
 * and common spellings ("snowmen" finds "Snowman", "raindeer" finds "Reindeer"),
 * and a word can match the start of a longer one ("orna" finds "Ornament").
 * When nothing matches every word, the products matching the most words are
 * returned instead and `loose` is set so the page can say so.
 */

export interface SearchDoc {
  name: string;
  slug: string;
  short_description?: string | null;
  skus?: string[];
  categories?: string[];
}

/** Spellings people type, mapped to the word the catalog uses. */
const ALIASES: Record<string, string> = {
  raindeer: "reindeer",
  reindear: "reindeer",
  rainder: "reindeer",
  snowmen: "snowman",
  snowmans: "snowman",
  claus: "santa",
  clause: "santa",
  xmas: "christmas",
  chrismas: "christmas",
  christmass: "christmas",
  photoop: "photo",
  selfie: "photo",
  present: "gift",
  presents: "gift",
  giftbox: "gift",
  bauble: "ornament",
  baubles: "ornament",
  ball: "ornament",
  colour: "color",
  colours: "color",
  multicolour: "multicolor",
  multi: "multicolor",
  rgb: "multicolor",
  ww: "warm",
  cw: "cool",
  cold: "cool",
  wreathe: "wreath",
  wreathes: "wreath",
  garlands: "garland",
  "2-d": "2d",
  "3-d": "3d",
  twodimensional: "2d",
  threedimensional: "3d",
  candycane: "candy",
  lamppost: "pole",
  lightpost: "pole",
  icicles: "icicle",
  snowflakes: "snowflake",
  stars: "star",
  trees: "tree",
  deers: "deer",
  bears: "bear",
  penguins: "penguin",
  angels: "angel",
  bows: "bow",
  bulbs: "bulb",
  lights: "light",
  lighting: "light",
  displays: "display",
  ornaments: "ornament",
  arches: "arch",
  archway: "arch",
  tunnel: "arch"
};

/** Words that carry no meaning in a catalog query. */
const STOP = new Set(["a", "an", "and", "the", "for", "of", "with", "w", "in", "on", "to", "led"]);

/** Lowercase, strip accents and punctuation; keeps digits and decimal points ("7.5"). */
export function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[′’'"″`]/g, "")
    .replace(/(\d)\s*(ft|foot|feet)\b/g, "$1")
    .replace(/[^a-z0-9.\s-]/g, " ")
    .replace(/(?<!\d)\.|\.(?!\d)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Folds a word to a common stem: plurals, a few irregulars, and the alias table. */
export function stem(w: string): string {
  const aliased = ALIASES[w];
  if (aliased) return aliased;
  if (/^\d/.test(w)) return w;
  if (w.length > 4 && w.endsWith("ies")) return w.slice(0, -3) + "y";
  if (w.length > 4 && /(ches|shes|xes|sses)$/.test(w)) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
  return w;
}

function tokens(s: string): string[] {
  return normalize(s)
    .split(/[\s-]+/)
    .filter(Boolean)
    .map(stem);
}

/** The query's meaningful words, stemmed and de-duplicated. */
export function queryTerms(q: string): string[] {
  const out: string[] = [];
  for (const t of tokens(q)) if (!STOP.has(t) && !out.includes(t)) out.push(t);
  return out;
}

/** One edit apart (insert, delete or substitute), for typos in longer words. */
function oneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

interface Field {
  words: string[];
  text: string;
  weight: number;
}

/** How well one query word matches one field: 0 for no match. */
function termScore(term: string, f: Field): number {
  if (f.words.includes(term)) return f.weight * 3;
  if (term.length >= 2 && f.words.some((w) => w.startsWith(term))) return f.weight * 2;
  if (term.length >= 4 && f.text.includes(term)) return f.weight;
  if (term.length >= 5 && f.words.some((w) => w.length >= 4 && oneEdit(term, w))) return f.weight;
  return 0;
}

function fieldsOf(doc: SearchDoc): Field[] {
  const f = (s: string, weight: number): Field => {
    const words = tokens(s);
    return { words, text: words.join(" "), weight };
  };
  return [
    f(doc.name, 10),
    f((doc.categories ?? []).join(" "), 5),
    f((doc.skus ?? []).join(" ") + " " + doc.slug.replace(/-/g, " "), 4),
    f(doc.short_description ?? "", 2)
  ];
}

export interface SearchResult<T> {
  items: T[];
  /** True when no product matched every word and these are the closest partial matches. */
  loose: boolean;
}

/** Ranks `items` against `q`. Items that do not match are dropped. */
export function searchCatalog<T>(items: T[], q: string, toDoc: (item: T) => SearchDoc): SearchResult<T> {
  const terms = queryTerms(q);
  if (!terms.length) return { items, loose: false };
  const phrase = normalize(q);

  const scored = items.map((item, index) => {
    const doc = toDoc(item);
    const fields = fieldsOf(doc);
    let score = 0;
    let matched = 0;
    for (const t of terms) {
      const best = Math.max(...fields.map((f) => termScore(t, f)));
      if (best > 0) matched++;
      score += best;
    }
    // The whole query as typed appearing in the name ranks above scattered words.
    if (terms.length > 1 && normalize(doc.name).includes(phrase)) score += 15;
    return { item, index, score, matched };
  });

  const exact = scored.filter((s) => s.matched === terms.length);
  const rank = (list: typeof scored) =>
    list.sort((a, b) => b.matched - a.matched || b.score - a.score || a.index - b.index).map((s) => s.item);

  if (exact.length || terms.length === 1) return { items: rank(exact), loose: false };
  return { items: rank(scored.filter((s) => s.matched > 0)), loose: true };
}
