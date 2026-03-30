/** If you change order or codes, update `LOCALE_SET` in `middleware.ts` (Edge cannot import this file). */
export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
