import type { Metadata } from "next";

import BrandsPageContent from "@/components/BrandsPageContent";
import { BrandsJsonLd } from "@/components/seo/BrandsJsonLd";
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
  const m = getDictionary(L).brandsPage;
  const esUrl = `${SITE_URL}/marcas`;
  const enUrl = `${SITE_URL}/en/marcas`;
  const canonical = L === "es" ? esUrl : enUrl;
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    keywords: m.metaKeywords,
    robots: defaultRobots,
    alternates: {
      canonical,
      languages: { es: esUrl, en: enUrl, "x-default": esUrl }
    },
    openGraph: buildOpenGraph(L, {
      title: m.metaTitle,
      description: m.metaDescription,
      path: "/marcas"
    }),
    twitter: buildTwitter({
      title: m.metaTitle,
      description: m.metaDescription
    })
  };
}

interface MarcasRoutePageProps {
  params: { locale: string };
}

export default function MarcasRoutePage({ params }: MarcasRoutePageProps): JSX.Element {
  return (
    <>
      <BrandsJsonLd locale={params.locale} />
      <BrandsPageContent />
    </>
  );
}
