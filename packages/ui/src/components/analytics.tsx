import Script from "next/script";

export function Analytics({ websiteId }: { websiteId: string }) {
  if (!websiteId) return null;

  return (
    <Script
      async
      src="https://analytics.masterdecker.com/script.js"
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}
