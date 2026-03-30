import type { Locale } from "@/lib/i18n/config";

import { CONTACT_EMAIL, SITE_URL, absoluteUrl } from "@/lib/seo/site";

const DESCRIPTION: Record<Locale, string> = {
  es: "NUO Networks integra infraestructura crítica, ciberseguridad industrial OT/IT, seguridad cyber-física y laboratorio digital. Operación en México y Estados Unidos.",
  en: "NUO Networks integrates critical infrastructure, industrial OT/IT cybersecurity, cyber-physical security, and digital labs. Operations in Mexico and the United States."
};

interface GlobalStructuredDataJsonLdProps {
  locale: Locale;
}

/**
 * Site-wide Schema.org graph: Organization, WebSite, ProfessionalService.
 * Complements per-route JSON-LD (e.g. E-Shop CollectionPage).
 */
export function GlobalStructuredDataJsonLd({ locale }: GlobalStructuredDataJsonLdProps): JSX.Element {
  const homeUrl = locale === "en" ? `${SITE_URL}/en` : SITE_URL;
  const contactUrl = `${homeUrl}#contact`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Nuo Networks Inc.",
        alternateName: "NUO Networks",
        url: SITE_URL,
        logo: absoluteUrl("/nuo-mark.svg"),
        image: absoluteUrl("/nuo-mark.svg"),
        email: CONTACT_EMAIL,
        description: DESCRIPTION[locale],
        address: {
          "@type": "PostalAddress",
          streetAddress: "131 Continental Dr, Suite 305",
          addressLocality: "Newark",
          addressRegion: "DE",
          postalCode: "19713",
          addressCountry: "US"
        },
        areaServed: [
          { "@type": "Country", name: "Mexico" },
          { "@type": "Country", name: "United States" }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "NUO Networks",
        inLanguage: ["es-MX", "en-US"],
        publisher: { "@id": `${SITE_URL}/#organization` },
        description: DESCRIPTION[locale],
        potentialAction: {
          "@type": "ContactAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: contactUrl
          },
          name: locale === "es" ? "Contacto comercial" : "Business contact"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": `${homeUrl}#professional-service`,
        name: "NUO Networks",
        url: homeUrl,
        image: absoluteUrl("/nuo-mark.svg"),
        description: DESCRIPTION[locale],
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        address: {
          "@type": "PostalAddress",
          streetAddress: "131 Continental Dr, Suite 305",
          addressLocality: "Newark",
          addressRegion: "DE",
          postalCode: "19713",
          addressCountry: "US"
        },
        areaServed: [
          { "@type": "Country", name: "Mexico" },
          { "@type": "Country", name: "United States" }
        ],
        knowsAbout: [
          "Industrial cybersecurity",
          "Zero Trust",
          "OT/IT segmentation",
          "Critical infrastructure",
          "Physical security integration",
          "Video surveillance",
          "Structured cabling",
          "Access control"
        ]
      }
    ]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
