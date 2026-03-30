import { getDictionary } from "@/lib/i18n/dictionary";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/site";

interface BrandsJsonLdProps {
  locale: string;
}

/** ItemList of partner brand names for /marcas SEO. */
export function BrandsJsonLd({ locale }: BrandsJsonLdProps): JSX.Element | null {
  if (!isLocale(locale)) {
    return null;
  }
  const L = locale as Locale;
  const m = getDictionary(L).brandsPage;
  const brands = getDictionary(L).partners.brands;
  const canonical = L === "es" ? `${SITE_URL}/marcas` : `${SITE_URL}/en/marcas`;
  const itemListElement = brands.map((b, i) => ({
    "@type": "ListItem" as const,
    position: i + 1,
    name: b.label
  }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb-brands`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: L === "es" ? "Inicio" : "Home",
            item: L === "es" ? SITE_URL : `${SITE_URL}/en`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: L === "es" ? "Marcas" : "Brands",
            item: canonical
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: m.metaTitle,
        description: m.metaDescription,
        inLanguage: L === "es" ? "es-MX" : "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: itemListElement.length,
          itemListElement
        }
      }
    ]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
