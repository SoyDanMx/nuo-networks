import type { Metadata } from "next";

import type { Locale } from "@/lib/i18n/config";

export const SITE_URL = "https://nuo-networks.com" as const;
export const SITE_NAME = "NUO Networks" as const;

/** Public asset used for Open Graph / Twitter when no route-specific image exists */
export const DEFAULT_OG_IMAGE_PATH = "/nuo-mark.svg" as const;

export const CONTACT_EMAIL = "contact@nuo-networks.com";

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

export function localeCanonicalPath(locale: Locale, path: string): string {
  const normalized = path.trim();
  if (normalized === "" || normalized === "/") {
    return locale === "en" ? `${SITE_URL}/en` : SITE_URL;
  }
  const p = normalized.startsWith("/") ? normalized : `/${normalized}`;
  return locale === "en" ? `${SITE_URL}/en${p}` : `${SITE_URL}${p}`;
}

export function defaultOpenGraphImages(): NonNullable<NonNullable<Metadata["openGraph"]>["images"]> {
  return [
    {
      url: DEFAULT_OG_IMAGE_PATH,
      width: 512,
      height: 512,
      alt: `${SITE_NAME} mark`
    }
  ];
}

export const defaultRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1
  }
};

export function openGraphLocales(locale: Locale): { locale: string; alternateLocale: string[] } {
  return locale === "es"
    ? { locale: "es_MX", alternateLocale: ["en_US"] }
    : { locale: "en_US", alternateLocale: ["es_MX"] };
}
