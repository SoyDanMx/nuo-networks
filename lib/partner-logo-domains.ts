/**
 * Dominios corporativos para resolver logos vía servicios públicos (Clearbit / Google favicons).
 * Ajusta si una marca no resuelve bien; no son logotipos oficiales incrustados en el repo.
 */
export const PARTNER_LOGO_DOMAIN_BY_ID: Record<string, string> = {
  cisco: "cisco.com",
  fortinet: "fortinet.com",
  ubiquiti: "ui.com",
  milestone: "milestonesys.com",
  "epcom-professional": "epcom.net",
  hikvision: "hikvision.com",
  grandstream: "grandstream.com",
  zkteco: "zkteco.com",
  idis: "idisglobal.com",
  mimosa: "mimosa.co",
  "western-digital": "westerndigital.com",
  commscope: "commscope.com",
  honeywell: "honeywell.com",
  "tp-link": "tp-link.com",
  akuvox: "akuvox.com",
  sycom: "sycom.com.mx",
  txpro: "txpro.com",
  icom: "icomamerica.com",
  witek: "wi-tek.com",
  "alta-labs": "altalabs.com"
};

export function logoUrlClearbit(domain: string): string {
  return `https://logo.clearbit.com/${domain}`;
}

/** Favicon de alta resolución vía Google (respaldo si Clearbit no sirve la marca). */
export function logoUrlGoogleFavicon(domain: string): string {
  const d = domain.startsWith("http") ? domain : `https://${domain}`;
  return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(d)}`;
}
