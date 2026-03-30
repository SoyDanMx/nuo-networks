import type { Metadata } from "next";

import type { Locale } from "@/lib/i18n/config";

import {
  absoluteUrl,
  DEFAULT_OG_IMAGE_PATH,
  defaultOpenGraphImages,
  openGraphLocales,
  SITE_NAME,
  localeCanonicalPath
} from "@/lib/seo/site";

export function buildOpenGraph(
  locale: Locale,
  opts: { title: string; description: string; path: string }
): Metadata["openGraph"] {
  const { locale: ogLocale, alternateLocale } = openGraphLocales(locale);
  const url = localeCanonicalPath(locale, opts.path);
  return {
    type: "website",
    siteName: SITE_NAME,
    locale: ogLocale,
    alternateLocale,
    url,
    title: opts.title,
    description: opts.description,
    images: defaultOpenGraphImages()
  };
}

export function buildTwitter(opts: { title: string; description: string }): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: opts.title,
    description: opts.description,
    images: [absoluteUrl(DEFAULT_OG_IMAGE_PATH)]
  };
}
