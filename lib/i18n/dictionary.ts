import type { Locale } from "@/lib/i18n/config";

import en from "@/messages/en.json";
import es from "@/messages/es.json";

export type Messages = typeof es;

const dictionaries: Record<Locale, Messages> = {
  es,
  en: en as Messages
};

export function getDictionary(locale: Locale): Messages {
  return dictionaries[locale] ?? dictionaries.es;
}
