import type { Metadata } from "next";

import EshopPageContent from "@/components/EshopPageContent";
import { EshopJsonLd } from "@/components/seo/EshopJsonLd";
import { getEshopKeywordsForMeta } from "@/lib/eshop-seo-keywords";
import { buildOpenGraph, buildTwitter } from "@/lib/seo/open-graph";
import { defaultRobots, SITE_URL } from "@/lib/seo/site";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

interface PageProps {
  params: { locale: string };
}

export function generateStaticParams(): { locale: Locale }[] {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isLocale(params.locale)) {
    return {};
  }
  const L = params.locale as Locale;
  const m = getDictionary(L).eshopPage;
  const esUrl = `${SITE_URL}/eshop`;
  const enUrl = `${SITE_URL}/en/eshop`;
  const canonical = L === "es" ? esUrl : enUrl;
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    keywords: getEshopKeywordsForMeta(),
    robots: defaultRobots,
    alternates: {
      canonical,
      languages: { es: esUrl, en: enUrl, "x-default": esUrl }
    },
    openGraph: buildOpenGraph(L, {
      title: m.metaTitle,
      description: m.metaDescription,
      path: "/eshop"
    }),
    twitter: buildTwitter({
      title: m.metaTitle,
      description: m.metaDescription
    })
  };
}

export default function EshopRoutePage({ params }: PageProps): JSX.Element {
  return (
    <>
      <EshopJsonLd locale={params.locale} />
      <EshopPageContent />
    </>
  );
}
