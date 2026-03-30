import type { Locale } from "@/lib/i18n/config";

/** Home / landing — bilingual technical focus */
const HOME_KEYWORDS: Record<Locale, string[]> = {
  es: [
    "NUO Networks",
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
