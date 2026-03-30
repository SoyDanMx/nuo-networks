import { getDictionary } from "@/lib/i18n/dictionary";
import { getEshopIndexableKeywords } from "@/lib/eshop-seo-keywords";
import { isLocale, type Locale } from "@/lib/i18n/config";

const SITE = "https://nuo-networks.com";
const MAX_LIST_ITEMS = 350;

interface EshopJsonLdProps {
  locale: string;
}

export function EshopJsonLd({ locale }: EshopJsonLdProps): JSX.Element | null {
  if (!isLocale(locale)) {
    return null;
  }
  const L = locale as Locale;
  const m = getDictionary(L).eshopPage;
  const canonical = L === "es" ? `${SITE}/eshop` : `${SITE}/en/eshop`;
  const inLang = L === "es" ? "es-MX" : "en-US";
  const keywords = getEshopIndexableKeywords();
  const listed = keywords.slice(0, MAX_LIST_ITEMS);
  const itemListElement = listed.map((name, i) => ({
    "@type": "ListItem" as const,
    position: i + 1,
    name
  }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: L === "es" ? "Inicio" : "Home",
            item: L === "es" ? SITE : `${SITE}/en`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "E-Shop",
            item: canonical
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: m.metaTitle,
        headline: m.title,
        description: m.metaDescription,
        inLanguage: inLang,
        isPartOf: { "@id": `${SITE}/#website` },
        keywords: keywords.join(", "),
        about: {
          "@type": "ItemList",
          numberOfItems: itemListElement.length,
          itemListElement
        }
      }
    ]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
