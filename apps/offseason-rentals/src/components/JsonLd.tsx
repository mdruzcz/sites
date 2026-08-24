/**
 * Renders a JSON-LD block. `JSON.stringify` output is escaped so a stray
 * "</script>" inside any content string cannot break out of the tag.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
