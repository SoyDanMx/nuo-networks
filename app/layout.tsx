import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { HtmlLang } from "@/components/html-lang";
import { Providers } from "@/app/providers";
import { defaultOpenGraphImages, defaultRobots, SITE_NAME, SITE_URL } from "@/lib/seo/site";

import "./globals.css";

/**
 * NUO Networks — root shell (Vercel / App Router).
 * Brand: Premium cyber-industrial — Space Grotesk (headings), Inter (body), JetBrains Mono (data).
 * Tokens: nuo-base #020617, nuo-cyan #06b6d4, nuo-magenta #d946ef (see tailwind.config + globals.css).
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap"
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020617",
  colorScheme: "dark"
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    /** Child routes supply the full title string (already includes brand where needed). */
    template: "%s"
  },
  applicationName: SITE_NAME,
  description:
    "NUO Networks: Ciberseguridad industrial México, integrador de redes críticas, OT/IT, Zero Trust y desarrollo SaaS. México y Estados Unidos.",
  keywords: [
    "NUO Networks",
    "ciberseguridad industrial México",
    "integrador de redes",
    "infraestructura crítica",
    "SaaS development México",
    "OT/IT",
    "Zero Trust"
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  robots: defaultRobots,
  alternates: {
    canonical: SITE_URL,
    languages: {
      es: SITE_URL,
      en: `${SITE_URL}/en`,
      "x-default": SITE_URL
    }
  },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    url: SITE_URL,
    locale: "es_MX",
    alternateLocale: ["en_US"],
    images: defaultOpenGraphImages()
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Integrador de infraestructura crítica y ciberseguridad industrial. México y Estados Unidos."
  },
  icons: {
    /** 48px primero: muchas pestañas eligen un tamaño pequeño; el PNG es cuadrado con isotipo al ~90%. */
    icon: [
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" }
    ],
    shortcut: "/icon-48.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html
      lang="es-MX"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh min-w-0 max-w-full overflow-x-hidden bg-[#020617] font-sans antialiased">
        <HtmlLang />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
