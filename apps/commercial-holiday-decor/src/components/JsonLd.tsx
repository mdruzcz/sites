/**
 * Renders a JSON-LD <script>. Keeps the dangerouslySetInnerHTML boilerplate in
 * one place so every page emits structured data the same way.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
