import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { buildOpenGraph, buildTwitter } from "@/lib/seo/open-graph";
import { defaultRobots, SITE_URL } from "@/lib/seo/site";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

const LiveCyberThreatMap = dynamic(() => import("@/components/LiveCyberThreatMap"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[100dvh] items-center justify-center bg-black font-mono text-sm text-zinc-500">
      Loading
    </div>
  )
});

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
  const m = getDictionary(L).liveThreatMap;
  const esUrl = `${SITE_URL}/threat-map`;
  const enUrl = `${SITE_URL}/en/threat-map`;
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
      path: "/threat-map"
    }),
    twitter: buildTwitter({
      title: m.metaTitle,
      description: m.metaDescription
    })
  };
}

export default function ThreatMapPage(): JSX.Element {
  return <LiveCyberThreatMap />;
}
