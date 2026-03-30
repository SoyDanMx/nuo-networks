"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/dictionary";

interface I18nContextValue {
  locale: Locale;
  messages: Messages;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}

export function I18nProvider({ locale, messages, children }: I18nProviderProps): JSX.Element {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}

export function useMessages(): Messages {
  return useI18n().messages;
}
