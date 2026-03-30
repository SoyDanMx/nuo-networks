"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HtmlLang(): null {
  const pathname = usePathname();
  useEffect(() => {
    const lang = pathname.startsWith("/en") ? "en" : "es";
    document.documentElement.lang = lang === "en" ? "en" : "es-MX";
  }, [pathname]);
  return null;
}
