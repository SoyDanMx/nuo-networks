import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Locale shell: i18n messages, CPA-10 lead modal, JSON-LD.
 * Page titles/descriptions are home-specific; keywords include industrial cybersecurity & integrator terms.
 */
import { Cpa10LeadModalProvider } from "@/components/Cpa10LeadModalProvider";
import { GlobalStructuredDataJsonLd } from "@/components/seo/GlobalStructuredDataJsonLd";
import { getHomeKeywords } from "@/lib/seo/keywords";
import { I18nProvider } from "@/lib/i18n/provider";
import { buildOpenGraph, buildTwitter } from "@/lib/seo/open-graph";
import { defaultRobots } from "@/lib/seo/site";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export function generateStaticParams(): { locale: Locale }[] {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const locale = params.locale;
  if (!isLocale(locale)) {
    return {};
  }
  if (locale === "en") {
    const title = "NUO Networks | Mission-Critical Protected Infrastructure & Industrial Cybersecurity";
    const description =
      "NUO Networks: Infrastructure integrator with a cybersecurity DNA. Secure industrial networks, data centers, CCTV, and Zero Trust in Mexico and the US.";
    const ogTitle = "NUO Networks | Protected Critical Infrastructure";
    const ogDescription = "Industrial networks with a cybersecurity DNA. Security by design for OT/IT environments.";
    return {
      title,
      description,
      keywords: getHomeKeywords("en"),
      robots: defaultRobots,
      alternates: {
        canonical: "https://nuo-networks.com/en",
        languages: {
          es: "https://nuo-networks.com/",
          en: "https://nuo-networks.com/en",
          "x-default": "https://nuo-networks.com/"
        }
      },
      openGraph: buildOpenGraph("en", {
        title: ogTitle,
        description: ogDescription,
        path: ""
      }),
      twitter: buildTwitter({ title: ogTitle, description: ogDescription })
    };
  }
  const title = "NUO Networks - Infraestructura Critica Protegida | Ciberseguridad Industrial Mexico";
  const description =
    "NUO Networks: Integrador de infraestructura con ADN de ciberseguridad. Redes industriales seguras, data centers, CCTV y proteccion Zero Trust en Mexico.";
  const ogTitle = "NUO Networks - Infraestructura Critica Protegida";
  const ogDescription = "Disenamos redes industriales con ADN de Ciberseguridad. Security by Design.";
  return {
    title,
    description,
    keywords: getHomeKeywords("es"),
    robots: defaultRobots,
    alternates: {
      canonical: "https://nuo-networks.com/",
      languages: {
        es: "https://nuo-networks.com/",
        en: "https://nuo-networks.com/en",
        "x-default": "https://nuo-networks.com/"
      }
    },
    openGraph: buildOpenGraph("es", {
      title: ogTitle,
      description: ogDescription,
      path: ""
    }),
    twitter: buildTwitter({ title: ogTitle, description: ogDescription })
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps): JSX.Element {
  if (!isLocale(params.locale)) {
    notFound();
  }
  const messages = getDictionary(params.locale);

  return (
    <>
      <GlobalStructuredDataJsonLd locale={params.locale} />
      <I18nProvider locale={params.locale} messages={messages}>
        <Cpa10LeadModalProvider>{children}</Cpa10LeadModalProvider>
      </I18nProvider>
    </>
  );
}
