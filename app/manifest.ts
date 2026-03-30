import type { MetadataRoute } from "next";

import { SITE_NAME } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "NUO",
    description:
      "Infraestructura crítica, ciberseguridad industrial OT/IT e integración cyber-física. México y Estados Unidos.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    lang: "es-MX",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/nuo-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "monochrome"
      }
    ]
  };
}
