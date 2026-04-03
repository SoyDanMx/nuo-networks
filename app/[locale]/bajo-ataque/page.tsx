import { redirect } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

interface PageProps {
  params: { locale: string };
}

export function generateStaticParams(): { locale: Locale }[] {
  return [{ locale: "es" }, { locale: "en" }];
}

/** Alias en español para `/sos` (misma landing de emergencia). */
export default function BajoAtaqueRedirect({ params }: PageProps): never {
  if (!isLocale(params.locale)) {
    redirect("/");
  }
  redirect(localizedPath(params.locale, "/sos"));
}
