export const BRAND = "We Install Christmas Lights";

/** Append the brand only when the result still fits a 60-character title. */
export function pageTitle(base: string): string {
  const clean = base.replace(/\s*\|\s*We Install Christmas Lights.*$/i, "").trim();
  const withBrand = `${clean} | ${BRAND}`;
  return withBrand.length <= 60 ? withBrand : clean;
}
