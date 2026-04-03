import type { Locale } from "@/lib/i18n/config";

/** Home / landing — bilingual technical focus */
const HOME_KEYWORDS: Record<Locale, string[]> = {
  es: [
    "NUO Networks",
    "Ciberseguridad Industrial México",
    "integrador de redes",
    "desarrollo SaaS México",
    "Integrador de Ciberseguridad México",
    "Seguridad Electrónica Industrial",
    "Networking EPCOM CDMX",
    "ciberseguridad industrial",
    "infraestructura crítica",
    "OT/IT",
    "Zero Trust",
    "SD-WAN",
    "videovigilancia",
    "integración de seguridad",
    "México",
    "Estados Unidos",
    "redes industriales",
    "data center",
    "ciberdefensa",
    "security by design",
    "integrador de infraestructura"
  ],
  en: [
    "NUO Networks",
    "industrial cybersecurity integrator Mexico",
    "EPCOM networking Mexico City",
    "industrial electronic security",
    "industrial cybersecurity",
    "critical infrastructure",
    "OT/IT",
    "Zero Trust",
    "SD-WAN",
    "video surveillance integration",
    "physical security",
    "Mexico",
    "United States",
    "industrial networks",
    "data center security",
    "cyber defense",
    "security by design",
    "infrastructure integrator"
  ]
};

export function getHomeKeywords(locale: Locale): string[] {
  return HOME_KEYWORDS[locale];
}
