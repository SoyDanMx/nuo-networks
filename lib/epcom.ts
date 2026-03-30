/** Public EPCOM endpoints (no API keys). Inventory/pricing live on EPCOM. */

export const EPCOM_BASE = "https://www.epcom.net";

export const EPCOM_URLS = {
  home: EPCOM_BASE,
  brands: `${EPCOM_BASE}/principal/brands`,
  superdeals: `${EPCOM_BASE}/superdeals`
} as const;

/**
 * Opens EPCOM search with the line label. Their site may hydrate results client-side.
 */
export function epcomSearchUrl(searchTerms: string): string {
  const q = searchTerms.trim();
  if (!q) return EPCOM_URLS.brands;
  return `${EPCOM_BASE}/principal/buscar?text=${encodeURIComponent(q)}`;
}
