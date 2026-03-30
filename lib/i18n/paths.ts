import type { Locale } from "@/lib/i18n/config";

/** Public URL base: Spanish at /, English at /en (Sumee-style). */
export function localePrefix(locale: Locale): "" | "/en" {
  return locale === "en" ? "/en" : "";
}

export function localizedHash(locale: Locale, hash: string): string {
  const h = hash.startsWith("#") ? hash : `#${hash}`;
  const prefix = localePrefix(locale);
  return `${prefix || ""}${h}`;
}

export function localizedHome(locale: Locale): string {
  return locale === "en" ? "/en" : "/";
}

/** Rutas fuera del hash: ES en raíz, EN bajo `/en`. Ej. `/marcas` · `/en/marcas`. */
export function localizedPath(locale: Locale, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return locale === "en" ? `/en${p}` : p;
}
