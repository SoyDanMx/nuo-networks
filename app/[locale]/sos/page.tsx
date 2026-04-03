import type { Metadata } from "next";

import { SosLanding } from "@/components/SosLanding";
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
  const m = getDictionary(L).sosLanding;
  const esUrl = `${SITE_URL}/sos`;
  const enUrl = `${SITE_URL}/en/sos`;
  const canonical = L === "es" ? esUrl : enUrl;
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    robots: defaultRobots,
    alternates: {
      canonical,
      languages: { es: esUrl, en: enUrl, "x-default": esUrl }
    },
    openGraph: buildOpenGraph(L, {
      title: m.metaTitle,
      description: m.metaDescription,
      path: "/sos"
    }),
    twitter: buildTwitter({
      title: m.metaTitle,
      description: m.metaDescription
    })
  };
}

export default function SosPage(): JSX.Element {
  return <SosLanding />;
}
